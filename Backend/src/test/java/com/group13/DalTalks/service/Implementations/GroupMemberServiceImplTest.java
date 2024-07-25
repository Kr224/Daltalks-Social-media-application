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

    int signedInUserID = 1;

    when(groupMemberRepository.save(groupMembers)).thenReturn(groupMembers);

    GroupMembers returned = groupMemberService.saveGroupMember(groupMembers, signedInUserID);

    assertEquals(groupMembers, returned, "Membership was not returned correctly.");
  }

  @Test
  public void saveGroupMember_nullGroup() {
    GroupMembers groupMembers = new GroupMembers();
    groupMembers.setGroup(null);

    int signedInUserID = 1;

    GroupMembers returned = groupMemberService.saveGroupMember(groupMembers, signedInUserID);

    assertNull(returned, "Group member with null group should return null.");
  }

  @Test
  public void saveGroupMember_nullUser() {
    GroupMembers groupMembers = new GroupMembers();
    groupMembers.setGroup(new GroupEntity());

    int signedInUserID = 1;

    GroupMembers returned = groupMemberService.saveGroupMember(groupMembers, signedInUserID);

    assertNull(returned, "Group member with null user should return null.");
  }

  @Test
  public void saveGroupMember_publicGroupActiveStatus() {
    GroupMembers groupMembers = new GroupMembers();
    groupMembers.setUser(new User());
    groupMembers.setGroup(new GroupEntity());
    groupMembers.getGroup().setPrivate(false);

    int signedInUserID = 1;

    when(groupMemberRepository.save(groupMembers)).thenReturn(groupMembers);

    GroupMembers returned = groupMemberService.saveGroupMember(groupMembers, signedInUserID);

    assertTrue(returned.isActive(), "This is a public group, the group member should be active!");
  }

  @Test
  public void removeGroupMembers() {
    GroupMembers groupMembers = new GroupMembers();
    groupMembers.setUser(new User());
    groupMembers.setGroup(new GroupEntity());

    int signedInUserID = 1;

    GroupMembers returned = groupMemberService.removeGroupMember(groupMembers, signedInUserID);

    assertEquals(groupMembers, returned, "Deleted group member not returned.");
  }

  @Test
  public void getMembersFromGroup_oneMember() {
    int groupId = 1;

    GroupMembers member1 = new GroupMembers();
    GroupEntity group = new GroupEntity();
    group.setId(groupId);
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
    int groupId = 1;

    GroupEntity group = new GroupEntity();
    group.setId(groupId);


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
    int groupId = 1;

    GroupEntity group = new GroupEntity();
    group.setId(groupId);

    List<GroupMembers> allMembers = new ArrayList<>();

    when(groupMemberRepository.findByGroupId(group.getId())).thenReturn(allMembers);

    List<GroupMembers> returned = groupMemberService.findAllGroupMembersByGroupId(group.getId());

    assertTrue(allMembers.isEmpty(), "No members should have been returned.");
  }

  @Test
  public void activateGroupMember() {
    int groupId = 1;
    int userId = 1;

    GroupEntity group = new GroupEntity();
    group.setId(groupId);
    User user = new User();
    user.setId(userId);

    GroupMembers groupMembers = new GroupMembers();
    groupMembers.setGroup(group);
    groupMembers.setUser(user);

    GroupMembers existingGroupMember = new GroupMembers();
    existingGroupMember.setGroup(group);
    existingGroupMember.setUser(user);

    int signedInUserID = 1;

    when(groupMemberRepository.findByGroupIdAndUserId(group.getId(), user.getId())).thenReturn(existingGroupMember);

    GroupMembers returned = groupMemberService.activateGroupMember(groupMembers, signedInUserID);

    assertTrue(returned.isActive(), "Group member should be activated.");
  }

  @Test
  public void activateGroupMember_nonExistingMember() {
    int groupId = 1;
    int creatorId = 1;
    int userId = 1;

    GroupEntity group = new GroupEntity();
    group.setId(groupId);
    User user = new User();
    user.setId(userId);

    GroupMembers groupMembers = new GroupMembers();
    groupMembers.setGroup(group);
    groupMembers.setUser(user);

    int signedInUserID = 1;

    when(groupMemberRepository.findByGroupIdAndUserId(group.getId(), user.getId())).thenReturn(null);

    GroupMembers returned = groupMemberService.activateGroupMember(groupMembers, signedInUserID);

    assertNull(returned, "Group member that doesn't exist returns null.");
  }

  @Test
  public void activateGroupMember_nullMember() {
    int signedInUserID = 1;
    GroupMembers groupMembers = null;

    GroupMembers returned = groupMemberService.activateGroupMember(groupMembers, signedInUserID);

    assertNull(returned, "Group member should be null if no existing member is found.");
  }

  @Test
  public void getGroupsByUserId_userHasGroups() {
    int userId = 1;
    int group1_ID = 1;
    int group2_ID = 2;
    int expectedGroupCount = 2;

    User user = new User();
    user.setId(userId);

    GroupEntity group1 = new GroupEntity();
    group1.setId(group1_ID);
    GroupEntity group2 = new GroupEntity();
    group2.setId(group2_ID);

    GroupMembers member1 = new GroupMembers();
    member1.setUser(user);
    member1.setGroup(group1);

    GroupMembers member2 = new GroupMembers();
    member2.setUser(user);
    member2.setGroup(group2);

    List<GroupMembers> groupMembersList = new ArrayList<>();
    groupMembersList.add(member1);
    groupMembersList.add(member2);

    when(groupMemberRepository.findByUserId(userId)).thenReturn(groupMembersList);

    List<GroupMembers> returnedGroups = groupMemberService.findGroupsByUserId(userId);

    assertEquals(expectedGroupCount, returnedGroups.size(), "User should have 2 groups.");
    assertTrue(returnedGroups.stream().anyMatch(gm -> gm.getGroup().getId() == group1_ID), "Returned groups should contain group1.");
    assertTrue(returnedGroups.stream().anyMatch(gm -> gm.getGroup().getId() == group2_ID), "Returned groups should contain group2.");
  }

  @Test
  public void getGroupsByUserId_userHasNoGroups() {
    int userId = 1;
    when(groupMemberRepository.findByUserId(userId)).thenReturn(new ArrayList<>());
    List<GroupMembers> returnedGroups = groupMemberService.findGroupsByUserId(userId);
    assertTrue(returnedGroups.isEmpty(), "User should have no groups.");
  }

  @Test
  public void getGroupsByUserId_userIdNotFound() {
    int userId = 999;
    when(groupMemberRepository.findByUserId(userId)).thenReturn(new ArrayList<>());
    List<GroupMembers> returnedGroups = groupMemberService.findGroupsByUserId(userId);
    assertTrue(returnedGroups.isEmpty(), "Non-existent user ID should return an empty list.");
  }

  @Test
  public void getGroupsByUserId_nullUserId() {
    List<GroupMembers> returnedGroups = groupMemberService.findGroupsByUserId(0);
    assertTrue(returnedGroups.isEmpty(), "Null user ID should return an empty list.");
  }

  @Test
  public void createGroupMember_privateGroup_GroupCreatorAdding() {
    int groupId = 1;
    int creatorId = 1;
    int userId = 1;

    GroupEntity group = new GroupEntity();
    group.setId(groupId);
    group.setPrivate(true);
    group.setCreatorID(creatorId);
    User user = new User();
    user.setId(userId);

    int signedInUserID = 1;

    GroupMembers groupMembers = new GroupMembers();
    groupMembers.setGroup(group);
    groupMembers.setUser(user);

    when(groupMemberRepository.save(groupMembers)).thenReturn(groupMembers);

    try {
      GroupMembers returned = groupMemberService.saveGroupMember(groupMembers, signedInUserID);
      assertEquals(groupMembers, returned);
    } catch (RuntimeException e) {
      //no error should be passed -> the creator can add anyone to the group
      fail();
    }
  }

  @Test
  public void createGroupMember_privateGroup_GroupCreatorNotAdding() {
    int groupId = 1;
    int creatorId = 1;
    int userId = 1;

    GroupEntity group = new GroupEntity();
    group.setId(groupId);
    group.setPrivate(true);
    group.setCreatorID(creatorId);
    User user = new User();
    user.setId(userId);

    int signedInUserID = 5;

    GroupMembers groupMembers = new GroupMembers();
    groupMembers.setGroup(group);
    groupMembers.setUser(user);

    try {
      GroupMembers returned = groupMemberService.saveGroupMember(groupMembers, signedInUserID);
      //this test should fail here, as an error must be thrown if the group creator is not the one adding to a private group
      fail();
    } catch (RuntimeException e) {
      assertTrue(true);
    }
  }

  @Test
  public void createGroupMember_privateGroup_GroupCreatorRemoving() {
    int groupId = 1;
    int creatorId = 1;
    int userId = 1;

    GroupEntity group = new GroupEntity();
    group.setId(groupId);
    group.setPrivate(true);
    group.setCreatorID(creatorId);
    User user = new User();
    user.setId(userId);

    int signedInUserID = 1;

    GroupMembers groupMembers = new GroupMembers();
    groupMembers.setGroup(group);
    groupMembers.setUser(user);


    try {
      GroupMembers returned = groupMemberService.removeGroupMember(groupMembers, signedInUserID);
      assertEquals(groupMembers, returned);
    } catch (RuntimeException e) {
      //no error should be passed -> the creator can remove anyone to the group
      fail();
    }
  }


  @Test
  public void createGroupMember_privateGroup_NotGroupCreatorRemoving() {
    int groupId = 1;
    int creatorId = 1;
    int userId = 1;

    GroupEntity group = new GroupEntity();
    group.setId(groupId);
    group.setPrivate(true);
    group.setCreatorID(creatorId);
    User user = new User();
    user.setId(userId);

    int signedInUserID = 10;

    GroupMembers groupMembers = new GroupMembers();
    groupMembers.setGroup(group);
    groupMembers.setUser(user);


    try {
      GroupMembers returned = groupMemberService.removeGroupMember(groupMembers, signedInUserID);
      //an exception should be thrown if it's not the group creator removing someone
      fail();
    } catch (RuntimeException e) {
      assertTrue(true);
    }
  }

  @Test
  public void createGroupMember_privateGroup_GroupCreatorActivating() {
    int groupId = 1;
    int creatorId = 1;
    int userId = 1;

    GroupEntity group = new GroupEntity();
    group.setId(groupId);
    group.setPrivate(true);
    group.setCreatorID(creatorId);
    User user = new User();
    user.setId(userId);

    int signedInUserID = 1;

    GroupMembers groupMembers = new GroupMembers();
    groupMembers.setGroup(group);
    groupMembers.setUser(user);

    GroupMembers existingGroupMember = new GroupMembers();
    existingGroupMember.setGroup(group);
    existingGroupMember.setUser(user);

    when(groupMemberRepository.findByGroupIdAndUserId(group.getId(), user.getId())).thenReturn(existingGroupMember);

    try {
      GroupMembers returned = groupMemberService.activateGroupMember(groupMembers, signedInUserID);
      assertTrue(returned.isActive(), "User was not made active!");
    } catch (RuntimeException e) {
      //no error should be passed -> the creator can activate anyone in the group
      fail();
    }
  }

  @Test
  public void createGroupMember_privateGroup_NotGroupCreatorActivating() {
    int groupId = 1;
    int creatorId = 1;
    int userId = 1;

    GroupEntity group = new GroupEntity();
    group.setId(groupId);
    group.setPrivate(true);
    group.setCreatorID(creatorId);
    User user = new User();
    user.setId(userId);

    int signedInUserID = 10;

    GroupMembers groupMembers = new GroupMembers();
    groupMembers.setGroup(group);
    groupMembers.setUser(user);

    GroupMembers existingGroupMember = new GroupMembers();
    existingGroupMember.setGroup(group);
    existingGroupMember.setUser(user);

    try {
      GroupMembers returned = groupMemberService.activateGroupMember(groupMembers, signedInUserID);
      //this should fail -> only the creator should be able to activate the group member
      fail();
    } catch (RuntimeException e) {
      assertTrue(true);
    }
  }

}
