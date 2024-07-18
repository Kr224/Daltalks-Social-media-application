package com.group13.DalTalks.controller;

import com.group13.DalTalks.model.GroupEntity;
import com.group13.DalTalks.service.GroupEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/groups")
public class GroupEntityController {
  @Autowired
  private GroupEntityService groupEntityService;

  @PostMapping("/create-group")
  public GroupEntity createGroup(@RequestBody GroupEntity group) {
    return groupEntityService.createGroup(group);
  }

  @GetMapping
  public List<GroupEntity> getAllGroups() { //api for getting all groups
    return groupEntityService.getAllGroups();
  }
}
