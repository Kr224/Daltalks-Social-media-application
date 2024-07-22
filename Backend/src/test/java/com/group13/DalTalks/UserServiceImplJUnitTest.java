package com.group13.DalTalks;

import jakarta.transaction.Transactional;

import com.group13.DalTalks.repository.UserRepository;
import com.group13.DalTalks.service.Implementations.UserServiceImpl; // Import concrete implementation
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
class UserServiceImplJUnitTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserServiceImpl userService; // Use concrete implementation



}