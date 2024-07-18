package com.group13.DalTalks.controller;


import com.group13.DalTalks.repository.GroupMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/group_members")
public class GroupMemberController {
  @Autowired
  private GroupMemberRepository groupMemberRepository;

  //here we could create calls for adding group members, deleting group members, and getting group members
}
