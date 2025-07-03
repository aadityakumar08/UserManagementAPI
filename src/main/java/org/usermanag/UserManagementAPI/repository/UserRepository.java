package org.usermanag.UserManagementAPI.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.usermanag.UserManagementAPI.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
} 