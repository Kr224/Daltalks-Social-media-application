package com.group13.DalTalks.controller;
import com.group13.DalTalks.model.FriendRequest;
import com.group13.DalTalks.service.FriendRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friend-requests")
public class FriendController {
    @Autowired
    private FriendRequestService friendRequestService;

    @GetMapping
    public ResponseEntity<List<FriendRequest>> getPendingRequests(@RequestParam Long userId) {
        List<FriendRequest> pendingRequests = friendRequestService.findPendingRequests(userId);
        return ResponseEntity.ok(pendingRequests);
    }

    @PostMapping("/{requestId}/accept")
    public ResponseEntity<FriendRequest> acceptFriendRequest(@PathVariable Long requestId) {
        FriendRequest acceptedRequest = friendRequestService.acceptFriendRequest(requestId);
        if (acceptedRequest != null) {
            return ResponseEntity.ok(acceptedRequest);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{requestId}/reject")
    public ResponseEntity<FriendRequest> rejectFriendRequest(@PathVariable Long requestId) {
        FriendRequest rejectedRequest = friendRequestService.declineFriendRequest(requestId);
        if (rejectedRequest != null) {
            return ResponseEntity.ok(rejectedRequest);
        }
        return ResponseEntity.notFound().build();
    }
}