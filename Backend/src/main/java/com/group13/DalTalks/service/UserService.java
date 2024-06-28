package com.group13.DalTalks.service;

import com.group13.DalTalks.model.User;

public interface UserService {

    String createUser(User user);

    User login(String email, String password) throws IllegalArgumentException;

    User forgotPassword(String email, String securityAnswer) throws IllegalArgumentException;
}
