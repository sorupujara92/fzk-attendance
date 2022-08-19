package com.fzkattendnace.repository;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import org.springframework.stereotype.Repository;

@Repository
public class CustomRepositoriesImpl implements CustomRepositories{

  @PersistenceContext
  private EntityManager entityManager;

  @Override
  public List<AttendanceResponse> getAttendance(String department) {
    StringBuilder sql = new StringBuilder();
    sql.append("select a.InTime,a.OutTime,a.AttendanceDate,e.EmployeeName,d.DepartmentFname FROM attendance_data a\n"
        + "JOIN employees e\n"
        + "  ON e.EmployeeId = a.EmployeeId\n"
        + "JOIN departmnts d\n"
        + "  ON e.DepartmentId = d.DepartmentId where DepartmentFname=?");

    Query query = entityManager.createNativeQuery(sql.toString());
    query.setParameter(1, "\""+department+"\"");

    List<Object> object = query.getResultList();
    return getAttendanceResponse(object);
  }

  protected List<AttendanceResponse> getAttendanceResponse(List<Object> objects) {
    List<AttendanceResponse> attendanceResponses = new ArrayList<>();
    for (Object o : objects) {
      Object[] objArray = ((Object[]) o);
      AttendanceResponse attendanceResponse = new AttendanceResponse();
      attendanceResponse.setInTime(String.valueOf(objArray[0]));
      attendanceResponse.setOutTime(String.valueOf(objArray[1]));
      attendanceResponse.setAttendanceDate(String.valueOf(objArray[2]));
      attendanceResponse.setEmployeeName(String.valueOf(objArray[3]));
      attendanceResponse.setDepartmentFname(String.valueOf(objArray[4]));
      attendanceResponses.add(attendanceResponse);
    }

    return attendanceResponses;
  }
}
