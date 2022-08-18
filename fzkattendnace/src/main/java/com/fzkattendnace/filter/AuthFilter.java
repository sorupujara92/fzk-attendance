package com.fzkattendnace.filter;

import com.fzkattendnace.entity.UserToken;
import com.fzkattendnace.entity.Users;
import com.fzkattendnace.repository.UsersRepository;
import com.fzkattendnace.repository.UsersTokenRepository;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;
import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;


@Slf4j
@Configuration
@AllArgsConstructor
public class AuthFilter extends OncePerRequestFilter {

  private static final String AUTHORIZATION_HEADER = "Authorization";
  private static MessageDigest digest;

  @Autowired
  UsersTokenRepository usersTokenRepository;

  @Autowired
  UsersRepository usersRepository;


  {
    try {
      digest = MessageDigest.getInstance("MD5");
    } catch (NoSuchAlgorithmException e) {
      log.error("NoSuchAlgorithmException while creating MessageDigest", e);
    }
  }

  /**
   * checks request should have cookie or bearer token and process accordingly, else will throw
   * exception.
   */
  @Override
  protected void doFilterInternal(
      HttpServletRequest req, HttpServletResponse res, FilterChain chain) {
    try {
      if(!req.getRequestURI().equals("/users") && ! req.getMethod().equals("POST") &&  ! req.getMethod().equals("OPTIONS")) {
        SecurityContextHolder.getContext().setAuthentication(null);
        if (StringUtils.isNotBlank(req.getHeader(AUTHORIZATION_HEADER))) {
          setcookiewithoauth(req);
        } else {
          throw new InsufficientAuthenticationException("Request has no auth data");
        }
      }
      chain.doFilter(req, res);
    } catch (Exception e) {
      throw new InsufficientAuthenticationException("Request can't be authenticated", e);
    }
  }


  /**
   * If request contains bearer token, checks if token is valid and after getting user id from token
   * set the user in security context.
   */
  private void setcookiewithoauth(HttpServletRequest req) {
    Optional<UserToken> authAccessToken =
        usersTokenRepository.findById(
            req.getHeader(AUTHORIZATION_HEADER).replace("Bearer ", ""));

    if (!authAccessToken.isPresent()) {
      throw new InsufficientAuthenticationException("Invalid access token");
    }

    try {
        SecurityContextHolder.getContext()
            .setAuthentication(getAuthentication(authAccessToken.get().getEmail()));
    } catch (Exception e) {
      throw new InsufficientAuthenticationException("Invalid access token", e);
    }
  }


  private UsernamePasswordAuthenticationToken getAuthentication(String userName) {
    Users users = usersRepository.findById(userName).get();
    users.setPassword("");
    return new UsernamePasswordAuthenticationToken(
        users,
        null,
        new ArrayList<>());
  }
}
