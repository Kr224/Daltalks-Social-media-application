package com.group13.DalTalks.controller;

import com.group13.DalTalks.model.ProfilePage;
import com.group13.DalTalks.service.ProfilePageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profiles")
public class ProfilePageController {

  @Autowired
  private ProfilePageService profilePageService;

  @PostMapping("/profiles/save")
  public String createProfilePage(@RequestBody ProfilePage profilePage) {
    return profilePageService.createProfile(profilePage);
  }

  @GetMapping("/profiles/getById/{id}")
  public ProfilePage getProfilePageById(@PathVariable int id) {
    return profilePageService.getProfilePageById(id);
  }

  @PostMapping("/profiles/update/{id}")
  public String updateProfilePage(@PathVariable int id, @RequestBody ProfilePage profilePage){
    return profilePageService.updateProfilePage(id, profilePage);
  }

  @DeleteMapping("/profiles/delete/{id}")
  public String deleteProfilePage(@PathVariable int id){
    return profilePageService.deleteProfilePage(id);
  }

}
