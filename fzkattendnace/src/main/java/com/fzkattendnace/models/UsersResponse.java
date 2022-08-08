package com.fzkattendnace.models;

import com.fzkattendnace.entity.Users;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsersResponse {

  String token;
  Users user;
}
