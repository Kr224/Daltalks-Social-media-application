package com.group13.DalTalks.service;

import com.group13.DalTalks.model.User;

import java.util.List;

public interface UserService {

    public String createUser(User user);

    List<User> getAllUser();

    String getEmailByUserID(Integer userID);
}
