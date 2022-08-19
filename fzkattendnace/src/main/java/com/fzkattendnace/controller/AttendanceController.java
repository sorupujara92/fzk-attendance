package com.fzkattendnace.controller;

import com.fzkattendnace.entity.Users;
import com.fzkattendnace.repository.AttendanceResponse;
import com.fzkattendnace.repository.CustomRepositories;
import com.fzkattendnace.repository.DepartmentResponse;
import com.fzkattendnace.repository.UsersRepository;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/attendance")
public class AttendanceController {

  @Autowired
  CustomRepositories customRepositories;

  @GetMapping
  public ResponseEntity<List<AttendanceResponse>> getAttendance(@RequestParam("department") String department) {

    return ResponseEntity.ok(customRepositories.getAttendance(department));
  }
}
