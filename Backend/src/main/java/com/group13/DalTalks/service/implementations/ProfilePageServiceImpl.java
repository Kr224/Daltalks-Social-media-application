package com.group13.DalTalks.service.implementations;

import com.group13.DalTalks.model.ProfilePage;
import com.group13.DalTalks.repository.ProfilePageRepository;
import com.group13.DalTalks.service.ProfilePageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfilePageServiceImpl implements ProfilePageService {

  @Autowired
  private ProfilePageRepository profilePageRepository;

  @Override
  public String createProfile(ProfilePage page) {
    profilePageRepository.save(page);
    return "Profile Created";
  }

  @Override
  public ProfilePage getProfilePageById(int id) {
    return profilePageRepository.getReferenceById(id);
  }

  @Override
  public String updateProfilePage(int id, ProfilePage page) {
    Optional<ProfilePage> toUpdate = profilePageRepository.findById(id);

    ProfilePage update = toUpdate.get();

    update.setInterests(page.getInterests());
    update.setStatus(page.getStatus());
    update.setBirthday(page.getBirthday());
    update.setLocation(page.getLocation());
    update.setMajor(page.getMajor());

    profilePageRepository.save(update);

    return "Updated Profile";
  }

  @Override
  public String deleteProfilePage(int id) {
    profilePageRepository.deleteById(id);
    return "Profile Deleted";
  }
}
