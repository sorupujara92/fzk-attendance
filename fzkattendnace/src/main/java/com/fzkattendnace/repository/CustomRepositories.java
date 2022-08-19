package com.fzkattendnace.repository;

import java.util.List;

public interface CustomRepositories {

  public List<AttendanceResponse> getAttendance(String department);

}
