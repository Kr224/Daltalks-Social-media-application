package com.group13.DalTalks.service.Implementations;

import com.group13.DalTalks.model.GroupMembers;
import com.group13.DalTalks.repository.GroupMemberRepository;
import com.group13.DalTalks.service.GroupMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupMemberServiceImpl implements GroupMemberService {
  //here we implement the interface methods

  @Autowired
  private GroupMemberRepository groupMemberRepository;

  @Override
  public GroupMembers saveGroupMember(GroupMembers groupMembers) {
    return groupMemberRepository.save(groupMembers);
  }

  @Override
  public GroupMembers removeGroupMember(GroupMembers groupMembers) {
    int groupID = groupMembers.getGroup().getId();
    int userID = (groupMembers.getUser().getId());
    groupMemberRepository.deleteGroupMembersByGroupIdAndUserId(groupID, userID);

    return groupMembers;
  }

  @Override
  public List<GroupMembers> findAllGroupMembersByGroupId(int id) {
    return groupMemberRepository.findByGroupId(id);
  }

  @Override
  public GroupMembers activateGroupMember(GroupMembers groupMembers) {
    return null;
  }
}

