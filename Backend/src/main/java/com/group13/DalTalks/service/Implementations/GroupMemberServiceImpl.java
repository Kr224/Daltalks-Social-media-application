package com.group13.DalTalks.service.Implementations;

import com.group13.DalTalks.model.GroupEntity;
import com.group13.DalTalks.model.GroupMembers;
import com.group13.DalTalks.repository.GroupMemberRepository;
import com.group13.DalTalks.repository.GroupEntityRepository;
import com.group13.DalTalks.service.GroupMemberService;
import jakarta.persistence.Access;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
    groupMemberRepository.deleteById(groupMembers.getId());

    return groupMembers;
  }
}
