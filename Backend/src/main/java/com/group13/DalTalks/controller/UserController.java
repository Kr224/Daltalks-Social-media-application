package com.group13.DalTalks.controller;


import com.group13.DalTalks.model.Post;
import com.group13.DalTalks.model.User;
import com.group13.DalTalks.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/create")
    public void createUser(@RequestBody User user) {
        userService.createUser(user);
    }

    @GetMapping("/getAllUser")
    public List<User> getAllUsers(){
        return userService.getAllUser();
    }


}
