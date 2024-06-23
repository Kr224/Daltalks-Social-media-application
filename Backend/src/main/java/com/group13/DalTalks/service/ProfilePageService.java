package com.group13.DalTalks.service;

import com.group13.DalTalks.model.ProfilePage;

import java.util.List;

public interface ProfilePageService {
  String createProfile(ProfilePage page);

  ProfilePage getProfilePageById(int id);

  String updateProfilePage(int id, ProfilePage page);

  String deleteProfilePage(int id);
}
