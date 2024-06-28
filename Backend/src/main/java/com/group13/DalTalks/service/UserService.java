package com.group13.DalTalks.service;

import com.group13.DalTalks.model.User;
import java.util.*;


public interface UserService {

    String createUser(User user);

    List<User> getAllUser();

    User login(String email, String password) throws IllegalArgumentException;

    User forgotPassword(String email, String securityAnswer) throws IllegalArgumentException;

    void resetPassword(String email, String newPassword);
}
