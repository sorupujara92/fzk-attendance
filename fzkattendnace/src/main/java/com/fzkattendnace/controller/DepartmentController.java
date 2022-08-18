package com.fzkattendnace.controller;


import com.fzkattendnace.entity.Users;
import com.fzkattendnace.repository.DepartmentResponse;
import com.fzkattendnace.repository.UsersRepository;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
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
  public ResponseEntity<DepartmentResponse> getDepartment() {
    Users users = (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    DepartmentResponse departmentResponse = new DepartmentResponse();
    String role = users.getRole();
    if(role.toLowerCase().equals("admin")){
      List<String> roles = new ArrayList<>();
      roles.add("SECURITY");
      roles.add("TRAFFIC");
      departmentResponse.setDepartments(roles);
    }else {
      departmentResponse.setDepartments(Arrays.asList(users.getRole()));
    }
    return ResponseEntity.ok(departmentResponse);
  }
}
