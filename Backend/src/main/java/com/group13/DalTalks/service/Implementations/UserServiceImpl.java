package com.group13.DalTalks.service.implementations;

import com.group13.DalTalks.model.User;
import com.group13.DalTalks.repository.UserRepository;
import com.group13.DalTalks.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public String createUser(User user) {
        validateEmail(user.getEmail());
        validatePassword(user.getPassword());

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

    @Override
    public User login(String email, String password) throws IllegalArgumentException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email address!"));

        if (!user.getPassword().equals(password)) {
            throw new IllegalArgumentException("Invalid password!");
        }

        return user;
    }
}