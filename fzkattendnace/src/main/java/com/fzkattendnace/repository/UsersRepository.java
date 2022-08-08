package com.fzkattendnace.repository;

import com.fzkattendnace.entity.Users;
import org.springframework.data.repository.CrudRepository;

/**
 * the UsersRepository.
 */
public interface UsersRepository extends
    CrudRepository<Users, String> {


}