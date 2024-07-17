package com.group13.DalTalks.service.Implementations;

import com.group13.DalTalks.model.Group;
import com.group13.DalTalks.repository.GroupRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GroupServiceImplTest {

  @Mock
  private GroupRepository groupRepository;

  @InjectMocks
  private GroupServiceImpl groupService;

  @Test
  public void createNewGroup() {
    Group group = new Group();

    when(groupRepository.save(group)).thenReturn(group);

    Group returned = groupService.createGroup(group);

    assertEquals(group, returned, "Group was not returned!");
  }
}