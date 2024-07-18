package com.group13.DalTalks.service.Implementations;

import com.group13.DalTalks.model.GroupEntity;
import com.group13.DalTalks.repository.GroupEntityRepository;
import com.group13.DalTalks.service.GroupEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupServiceImpl implements GroupEntityService {

  @Autowired
  private GroupEntityRepository groupRepository;

  public GroupEntity createGroup(GroupEntity group) {
    return groupRepository.save(group);
  }

  @Override
  public List<GroupEntity> getAllGroups() {
    return null;
  }
}
