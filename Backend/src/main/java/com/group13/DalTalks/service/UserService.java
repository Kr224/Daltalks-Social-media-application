package com.group13.DalTalks.service;

import com.group13.DalTalks.model.User;
import java.util.*;


public interface UserService {

    String createUser(User user);


    User login(String email, String password) throws IllegalArgumentException;

    User forgotPassword(String email, String securityAnswer) throws IllegalArgumentException;

    void resetPassword(String email, String newPassword);

    String getEmailByUserID(Integer userID);

    List<User> getAllUserExcept(int userID);

    List<User> getAllPendingUser();
    
    List<User> getAllUsers();

    String acceptUser(int userID);

    void deleteUser(int userID);
}
