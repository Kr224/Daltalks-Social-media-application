package com.group13.DalTalks.service;

import com.group13.DalTalks.model.FriendRequest;
import java.util.List;

public interface FriendRequestService {
    FriendRequest acceptFriendRequest(Long requestId);
    FriendRequest declineFriendRequest(Long requestId);
    List<FriendRequest> findPendingRequests(Long requestId);
}


