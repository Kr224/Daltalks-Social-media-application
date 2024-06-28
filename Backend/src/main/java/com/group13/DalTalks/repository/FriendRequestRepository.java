package com.group13.DalTalks.repository;
import com.group13.DalTalks.model.FriendRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {
    List<FriendRequest> findByReceiverIdAndStatus(Long receiverId, FriendRequest.Status status);
}
