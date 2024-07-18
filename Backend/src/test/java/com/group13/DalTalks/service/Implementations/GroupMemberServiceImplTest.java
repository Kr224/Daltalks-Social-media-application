package com.group13.DalTalks.service.Implementations;

import com.group13.DalTalks.model.GroupEntity;
import com.group13.DalTalks.model.GroupMembers;
import com.group13.DalTalks.repository.GroupMemberRepository;
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
class GroupMemberServiceImplTest {
  @Mock
  private GroupMemberRepository groupMemberRepository;

  @InjectMocks
  private GroupMemberServiceImpl groupMemberService;

  @Test
  public void createNewGroupMembers() {
    GroupMembers groupMembers = new GroupMembers();

    when(groupMemberRepository.save(groupMembers)).thenReturn(groupMembers);

    GroupMembers returned = groupMemberService.saveGroupMember(groupMembers);

    assertEquals(groupMembers, returned, "Membership was not returned correctly.");
  }

  @Test
  public void removeGroupMembers() {
    GroupMembers groupMembers = new GroupMembers();

    GroupMembers returned = groupMemberService.removeGroupMember(groupMembers);

    assertEquals(groupMembers, returned, "Deleted group member not returned.");
  }

}