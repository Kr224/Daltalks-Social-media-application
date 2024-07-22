package com.group13.DalTalks.service.Implementations;

import com.group13.DalTalks.model.GroupEntity;
import com.group13.DalTalks.model.GroupMembers;
import com.group13.DalTalks.model.User;
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
    groupMembers.setUser(new User());
    groupMembers.setGroup(new GroupEntity());

    when(groupMemberRepository.save(groupMembers)).thenReturn(groupMembers);

    GroupMembers returned = groupMemberService.saveGroupMember(groupMembers);

    assertEquals(groupMembers, returned, "Membership was not returned correctly.");
  }

  @Test
  public void saveGroupMember_nullGroup() {
    GroupMembers groupMembers = new GroupMembers();
    groupMembers.setGroup(null);

    GroupMembers returned = groupMemberService.saveGroupMember(groupMembers);

    assertNull(returned, "Group member with null group should return null.");
  }

  @Test
  public void saveGroupMember_nullUser() {
    GroupMembers groupMembers = new GroupMembers();
    groupMembers.setGroup(new GroupEntity());

    GroupMembers returned = groupMemberService.saveGroupMember(groupMembers);

    assertNull(returned, "Group member with null user should return null.");
  }

  @Test
  public void saveGroupMember_publicGroupActiveStatus() {
    GroupMembers groupMembers = new GroupMembers();
    groupMembers.setUser(new User());
    groupMembers.setGroup(new GroupEntity());
    groupMembers.getGroup().setPrivate(false);

    when(groupMemberRepository.save(groupMembers)).thenReturn(groupMembers);

    GroupMembers returned = groupMemberService.saveGroupMember(groupMembers);

    assertTrue(returned.isActive(), "This is a public group, the group member should be active!");
  }

  @Test
  public void removeGroupMembers() {
    GroupMembers groupMembers = new GroupMembers();
    groupMembers.setUser(new User());
    groupMembers.setGroup(new GroupEntity());

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

  @Test
  public void activateGroupMember() {
    GroupEntity group = new GroupEntity();
    group.setId(1);
    User user = new User();
    user.setId(1);

    GroupMembers groupMembers = new GroupMembers();
    groupMembers.setGroup(group);
    groupMembers.setUser(user);

    GroupMembers existingGroupMember = new GroupMembers();
    existingGroupMember.setGroup(group);
    existingGroupMember.setUser(user);

    when(groupMemberRepository.findByGroupIdAndUserId(group.getId(), user.getId())).thenReturn(existingGroupMember);

    GroupMembers returned = groupMemberService.activateGroupMember(groupMembers);

    assertTrue(returned.isActive(), "Group member should be activated.");
  }

  @Test
  public void activateGroupMember_nonExistingMember() {
    GroupEntity group = new GroupEntity();
    group.setId(1);
    User user = new User();
    user.setId(1);

    GroupMembers groupMembers = new GroupMembers();
    groupMembers.setGroup(group);
    groupMembers.setUser(user);

    when(groupMemberRepository.findByGroupIdAndUserId(group.getId(), user.getId())).thenReturn(null);

    GroupMembers returned = groupMemberService.activateGroupMember(groupMembers);

    assertNull(returned, "Group member that doesn't exist returns null.");
  }

  @Test
  public void activateGroupMember_nullMember() {

    GroupMembers groupMembers = null;

    GroupMembers returned = groupMemberService.activateGroupMember(groupMembers);

    assertNull(returned, "Group member should be null if no existing member is found.");
  }

}