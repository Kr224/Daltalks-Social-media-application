package com.group13.DalTalks.controller;

import com.group13.DalTalks.model.ProfilePage;
import com.group13.DalTalks.service.ProfilePageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/profiles")
public class ProfilePageController {

  @Autowired
  private ProfilePageService profilePageService;

  @PostMapping("/save")
  public ProfilePage createProfilePage(@RequestBody ProfilePage profilePage) {
    return profilePageService.createProfile(profilePage);
  }

  @GetMapping("/getById/{id}")
  public ProfilePage getProfilePageById(@PathVariable int id) {
    return profilePageService.getProfilePageById(id);
  }

  @PostMapping("/update/{id}")
  public ProfilePage updateProfilePage(@PathVariable int id, @RequestBody ProfilePage profilePage){
    return profilePageService.updateProfilePage(id, profilePage);
  }

  @DeleteMapping("/delete/{id}")
  public ProfilePage deleteProfilePage(@PathVariable int id){
    return profilePageService.deleteProfilePage(id);
  }

}
