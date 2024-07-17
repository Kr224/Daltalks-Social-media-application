package com.group13.DalTalks.service.Implementations;

import com.group13.DalTalks.model.Group;
import com.group13.DalTalks.repository.GroupRepository;
import com.group13.DalTalks.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GroupServiceImpl implements GroupService {

  @Autowired
  private GroupRepository groupRepository;

  public Group createGroup(Group group) {
    return groupRepository.save(group);
  }
}
