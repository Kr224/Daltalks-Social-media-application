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

  @Test
  public void getMembersFromGroup_oneMember() {
    GroupMembers member1 = new GroupMembers();
    GroupEntity group = new GroupEntity();
    group.setId(1);
    member1.setActive(true);
    member1.setGroup(group);

    List<GroupMembers> allMembers = new ArrayList<>();
    allMembers.add(member1);

    when(groupMemberRepository.findByGroupId(group.getId())).thenReturn(allMembers);

    List<GroupMembers> returned = groupMemberService.findAllGroupMembersByGroupId(group.getId());

    assertEquals(allMembers.size(), returned.size(), "Group members not returned correctly.");
  }


  @Test
  public void getMembersFromGroup_twoMembers() {
    GroupEntity group = new GroupEntity();
    group.setId(1);


    GroupMembers member1 = new GroupMembers();
    member1.setActive(true);
    member1.setGroup(group);
    GroupMembers member2 = new GroupMembers();
    member2.setActive(true);
    member2.setGroup(group);

    List<GroupMembers> allMembers = new ArrayList<>();
    allMembers.add(member1);
    allMembers.add(member2);

    when(groupMemberRepository.findByGroupId(group.getId())).thenReturn(allMembers);

    List<GroupMembers> returned = groupMemberService.findAllGroupMembersByGroupId(group.getId());

    assertEquals(allMembers.size(), returned.size(), "Group members not returned correctly.");
  }

  @Test
  public void getMembersFromGroup_noMembers() {
    GroupEntity group = new GroupEntity();
    group.setId(1);

    List<GroupMembers> allMembers = new ArrayList<>();

    when(groupMemberRepository.findByGroupId(group.getId())).thenReturn(allMembers);

    List<GroupMembers> returned = groupMemberService.findAllGroupMembersByGroupId(group.getId());

    assertTrue(allMembers.isEmpty(), "No members should have been returned.");
  }

}