package com.group13.DalTalks.controller;


import com.group13.DalTalks.model.GroupMembers;
import com.group13.DalTalks.service.GroupMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/group_members")
public class GroupMemberController {
  @Autowired
  private GroupMemberService groupMemberService;

  //here we could create calls for adding group members, deleting group members, and getting group members

  @PostMapping("/add-membership")
  public GroupMembers createGroupMembers(@RequestBody GroupMembers groupMembers) {
    return groupMemberService.saveGroupMember(groupMembers);
  }

  @DeleteMapping("/remove-membership")
  public GroupMembers removeGroupMembers(@RequestBody GroupMembers groupMembers) {
    return groupMemberService.removeGroupMember(groupMembers);
  }

  @GetMapping("/{id}")
  public List<GroupMembers> getAllGroupMembers(@PathVariable int id) {
    return groupMemberService.findAllGroupMembersByGroupId(id);
  }

}
