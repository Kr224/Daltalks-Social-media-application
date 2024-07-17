package com.group13.DalTalks.controller;

import com.group13.DalTalks.model.Group;
import com.group13.DalTalks.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/groups")
public class GroupController {
  @Autowired
  private GroupService groupService;

  @PostMapping("/create-group")
  public Group createGroup(@RequestBody Group group) {
    return groupService.createGroup(group);
  }
}
