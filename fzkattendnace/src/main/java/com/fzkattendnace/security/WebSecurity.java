package com.fzkattendnace.security;


import com.fzkattendnace.filter.AuthFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/** WebSecurity file which calls CookieAndTokenFilter to process request. */
@EnableWebSecurity
@Configuration
public class WebSecurity extends WebSecurityConfigurerAdapter {

  @Autowired
  AuthFilter authFilter;

  @Override
  protected void configure(HttpSecurity http) throws Exception {

    http.csrf().disable().authorizeRequests().anyRequest().permitAll();
    http.addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class);
  }
}
