package com.group13.DalTalks.service.Implementations;

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
  public ProfilePage createProfile(ProfilePage page) {
    return profilePageRepository.save(page);
  }

  @Override
  public ProfilePage getProfilePageById(int id) {
    Optional<ProfilePage> returned = profilePageRepository.findById(id);

    if (returned.isPresent()) {
      return returned.get();
    }

    return null;
  }

  @Override
  public ProfilePage updateProfilePage(int id, ProfilePage page) {
    Optional<ProfilePage> toUpdate = profilePageRepository.findById(id);

    if (toUpdate.isPresent()) {
      ProfilePage update = toUpdate.get();

      update.setInterests(page.getInterests());
      update.setStatus(page.getStatus());
      update.setBirthday(page.getBirthday());
      update.setLocation(page.getLocation());
      update.setMajor(page.getMajor());

      return profilePageRepository.save(update);
    }

    return null;
  }

  @Override
  public ProfilePage deleteProfilePage(int id) {
    Optional<ProfilePage> found = profilePageRepository.findById(id);

    if (found.isPresent()){
      profilePageRepository.deleteById(id);
      return found.get();
    }

    return null;
  }
}
