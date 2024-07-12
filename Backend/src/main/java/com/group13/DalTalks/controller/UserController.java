package com.group13.DalTalks.controller;

import com.group13.DalTalks.model.User;
import com.group13.DalTalks.model.Post;
import com.group13.DalTalks.model.Friendship;

import com.group13.DalTalks.service.UserService;
import com.group13.DalTalks.service.FriendshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    private FriendshipService friendshipService;

    @GetMapping("/friends/{userId}")     //method for fetching the users friends
    public ResponseEntity<List<User>> getFriends(@PathVariable int userId) {
        List<User> friends = friendshipService.getFriends(userId);
        return ResponseEntity.ok(friends);
    }

    @GetMapping("/getFriendRequests") // Endpoint to get friend requests for a user
    public ResponseEntity<List<Object>> getFriendRequests(@RequestParam int userID) {
        List<Object> friendRequests = friendshipService.getFriendRequests(userID);
        return ResponseEntity.ok(friendRequests);
    }

    @PostMapping("/sendFriendRequest") //Endpoint to send a friend request
    public ResponseEntity<?> sendFriendRequest(@RequestParam int senderId, @RequestParam int receiverId) {
        friendshipService.sendFriendRequest(senderId, receiverId);
        return ResponseEntity.ok("Friend request sent successfully");
    }

    @PostMapping("/acceptFriendRequest") //Endpoint to accept a friend request
    public ResponseEntity<?> acceptFriendRequest(@RequestParam int requestId) {
        friendshipService.acceptFriendRequest(requestId);
        return ResponseEntity.ok("Friend request accepted successfully");
    }

    @PostMapping("/rejectFriendRequest") //Endpoint to reject a friend request
    public ResponseEntity<?> rejectFriendRequest(@RequestParam int requestId) {
        friendshipService.rejectFriendRequest(requestId);
        return ResponseEntity.ok("Friend request rejected successfully");
    }


    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            String result = userService.createUser(user);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        try {
            User user = userService.login(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PostMapping("/forgotPassword")
    public ResponseEntity<?> forgotPassword(@RequestBody User forgotPasswordRequest) {
        try {
            User user = userService.forgotPassword(forgotPasswordRequest.getEmail(), forgotPasswordRequest.getSecurityAnswer());
            return ResponseEntity.ok(user);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> resetRequest) {
        try {
            String email = resetRequest.get("email");
            String newPassword = resetRequest.get("newPassword");
            userService.resetPassword(email, newPassword);
            return ResponseEntity.ok("Password reset successful!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping("/getAllUser/{id}")
    public List<User> getAllUsers(@PathVariable int id){
        return userService.getAllUserExcept(id);
    }

}
