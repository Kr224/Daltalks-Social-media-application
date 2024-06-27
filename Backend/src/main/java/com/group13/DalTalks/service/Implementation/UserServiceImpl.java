package com.group13.DalTalks.service.Implementation;

import com.group13.DalTalks.model.User;
import com.group13.DalTalks.repository.UserRepository;
import com.group13.DalTalks.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Pattern;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;

    @Override
    public String createUser(User user){
        //Check registration info
        validateEmail(user.getEmail());
        validatePassword(user.getPassword());

        userRepository.save(user);
        return "User created successfully";
    }

    @Override
    public List<User> getAllUser(){
        return (List<User>)
                userRepository.findAll();
    }

    @Override
    public String getEmailByUserID(Integer userID) {
        Optional<User> userOptional = userRepository.findById(userID);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getEmail();
        } else {
            return ("User not found with ID: " + userID);
        }
    }

    private void validateEmail(String email){
        if (!email.endsWith("@dal.ca")){
            throw new IllegalArgumentException("Invalid email domain.");
        }
    }

    private void validatePassword(String password){
        String regex = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).{8,}$";
        if (!Pattern.compile(regex).matcher(password).matches()) {
            throw new IllegalArgumentException("Password must be at least 8 characters long, " +
                    "contain at least one uppercase letter, one lowercase letter, one number, " +
                    "and one special character.");
        }
    }
}
