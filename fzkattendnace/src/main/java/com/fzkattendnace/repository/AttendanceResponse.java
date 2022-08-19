package com.fzkattendnace.repository;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttendanceResponse {

  String InTime;
  String OutTime;
  String AttendanceDate;
  String EmployeeName;
  String DepartmentFname;
}
