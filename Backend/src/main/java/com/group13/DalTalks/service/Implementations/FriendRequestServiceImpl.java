package com.group13.DalTalks.service.implementations;
import com.group13.DalTalks.model.FriendRequest;
import com.group13.DalTalks.repository.FriendRequestRepository;
import com.group13.DalTalks.model.FriendRequest.Status;
import com.group13.DalTalks.service.FriendRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class FriendRequestServiceImpl implements FriendRequestService {
    @Autowired
    private FriendRequestRepository friendRequestRepository;

    @Override
    public FriendRequest acceptFriendRequest(Long requestId) {
        Optional<FriendRequest> optionalFriendRequest = friendRequestRepository.findById(requestId);
        if (optionalFriendRequest.isPresent()) {
            FriendRequest friendRequest = optionalFriendRequest.get();
            friendRequest.setStatus(Status.ACCEPTED);
            friendRequest.setUpdatedAt(new Date());
            return friendRequestRepository.save(friendRequest);
        }
        return null;
    }

    @Override
    public FriendRequest declineFriendRequest(Long requestId) {
        Optional<FriendRequest> optionalFriendRequest = friendRequestRepository.findById(requestId);
        if (optionalFriendRequest.isPresent()) {
            FriendRequest friendRequest = optionalFriendRequest.get();
            friendRequest.setStatus(Status.DECLINED);
            friendRequest.setUpdatedAt(new Date());
            return friendRequestRepository.save(friendRequest);
        }
        return null;
    }

    @Override
    public List<FriendRequest> findPendingRequests(Long requestId) {
        return friendRequestRepository.findByReceiverIdAndStatus(requestId, Status.PENDING);
    }
}

