package com.group13.DalTalks.repository;

import com.group13.DalTalks.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
    Optional<User> findByEmail(String email);
    @Query("SELECT u FROM User u WHERE u.id <> :userID")
    List<User> findAllExceptUserID(@Param("userID") int userID);
}
