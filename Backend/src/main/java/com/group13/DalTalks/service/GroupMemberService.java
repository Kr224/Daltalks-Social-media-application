package com.group13.DalTalks.service;

import com.group13.DalTalks.model.GroupMembers;

import java.util.List;

public interface GroupMemberService {
  //here we can define the methods that the service needs
  //-> adding/removing group members, obtaining group members for a particular group

  GroupMembers saveGroupMember(GroupMembers groupMembers);

  GroupMembers removeGroupMember(GroupMembers groupMembers);

  List<GroupMembers> findAllGroupMembersByGroupId(int id);
}

