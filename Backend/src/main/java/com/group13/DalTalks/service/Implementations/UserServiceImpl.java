package com.group13.DalTalks.service.Implementations;

import com.group13.DalTalks.model.User;
import com.group13.DalTalks.repository.UserRepository;
import com.group13.DalTalks.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;

import java.util.regex.Pattern;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public String createUser(User user) {
        validateEmail(user.getEmail());
        validatePassword(user.getPassword());
        checkDuplicateEmail(user.getEmail());

        userRepository.save(user);
        return "User created successfully";
    }

    private void validateEmail(String email) {
        if (!email.endsWith("@dal.ca")) {
            throw new IllegalArgumentException("The email address used is invalid. This application is only targeted for employees and students who are currently enrolled in Dalhousie.");
        }
    }

    private void validatePassword(String password) {
        String regex = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).{8,}$";
        if (!Pattern.compile(regex).matcher(password).matches()) {
            throw new IllegalArgumentException("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
        }
    }

    private void checkDuplicateEmail(String email) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("An account with this email already exists.");
        }
    }

    @Override
    public User login(String email, String password) throws IllegalArgumentException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email address!"));

        if (!user.getPassword().equals(password)) {
            throw new IllegalArgumentException("Invalid password!");
        }

        return user;
    }

    @Override
    public User forgotPassword(String email, String securityAnswer) throws IllegalArgumentException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email address!"));

        if (!user.getSecurityAnswer().equals(securityAnswer)) {
            throw new IllegalArgumentException("Security answer is incorrect!");
        }

        return user;
    }

    @Override
    public void resetPassword(String email, String newPassword) throws IllegalArgumentException {
        validatePassword(newPassword);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email address!"));
        user.setPassword(newPassword);
        userRepository.save(user);
    }
    
    public List<User> getAllUserExcept(int userID) {
        return this.userRepository.findAll()
                                   .stream()
                                   .filter(user -> user.getId() != userID)
                                   .collect(Collectors.toList());
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
}