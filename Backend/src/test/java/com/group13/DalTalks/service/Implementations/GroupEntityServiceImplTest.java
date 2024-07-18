package com.group13.DalTalks.service.Implementations;

import com.group13.DalTalks.model.GroupEntity;
import com.group13.DalTalks.repository.GroupEntityRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GroupEntityServiceImplTest {

  @Mock
  private GroupEntityRepository groupRepository;

  @InjectMocks
  private GroupServiceImpl groupService;

  @Test
  public void createNewGroup() {
    GroupEntity group = new GroupEntity();

    when(groupRepository.save(group)).thenReturn(group);

    GroupEntity returned = groupService.createGroup(group);

    assertEquals(group, returned, "Group was not returned!");
  }

  @Test
  public void getAllGroups() {
    GroupEntity group = new GroupEntity();

    List<GroupEntity> allGroups = new ArrayList<>();
    allGroups.add(group);

    when(groupRepository.findAll()).thenReturn(allGroups);

    List<GroupEntity> returnGroups = groupService.getAllGroups();

    assertEquals(returnGroups.size(), allGroups.size(), "returned list is the wrong size");
  }
}