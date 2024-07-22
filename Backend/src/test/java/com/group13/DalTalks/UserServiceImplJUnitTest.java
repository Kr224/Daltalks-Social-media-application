package com.group13.DalTalks;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import java.util.*;

import com.group13.DalTalks.model.User;
import com.group13.DalTalks.repository.UserRepository;
import com.group13.DalTalks.service.Implementations.UserServiceImpl;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
class UserServiceImplJUnitTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserServiceImpl userService; // Use concrete implementation

    @Test
    void getAllUserExcept() {
        User user1 = new User("Alice@dal.ca", "Pending!123", "What is your mother's maiden name?", "Camille", null, "user");
        userRepository.save(user1);

        List<User> getAllUserExcept = userService.getAllUserExcept(user1.getId());

        assertEquals(0, getAllUserExcept.size());
    }

    @Test
    void getAllPendingUser() {
        User user1 = new User("Alice@dal.ca", "Pending!123", "What is your mother's maiden name?", "Camille", "pending", "user");
        userService.createUser(user1);

        List<User> getAllPendingUser = userService.getAllPendingUser();

        assertEquals(1, getAllPendingUser.size());
    }

    @Test
    void getAllUsers() {
        User user1 = new User("Alice@dal.ca", "pending!123", "What is your mother's maiden name?", "Camille", "pending", "user");
        userRepository.save(user1);
        List<User> getAllUser = userService.getAllUsers();

        assertFalse(getAllUser.isEmpty());
    }

    @Test
    void getEmailByUserID() {
        User user1 = new User("Alice@dal.ca", "pending!123", "What is your mother's maiden name?", "Camille", "pending", "user");
        userRepository.save(user1);

        String userEmail = userService.getEmailByUserID(user1.getId());

        assertEquals(user1.getEmail(), userEmail);
    }
}