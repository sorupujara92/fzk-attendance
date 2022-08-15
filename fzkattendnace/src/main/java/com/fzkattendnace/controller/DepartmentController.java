package com.fzkattendnace.controller;


import com.fzkattendnace.entity.Users;
import com.fzkattendnace.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin
@RequestMapping("/department")
public class DepartmentController {

  @Autowired
  UsersRepository usersRepository;

  @GetMapping
  public ResponseEntity<Object> getDepartment() {
    Users users = (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return ResponseEntity.ok(users.getRole());
  }
}
