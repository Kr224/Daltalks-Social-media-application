package com.group13.DalTalks.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ProfilePage {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String interests;
  private String status;
  private String birthday;
  private String major;
  private String location;

  public ProfilePage() {
  }

  public ProfilePage(int id, String interests, String status, String birthday, String major, String location) {
    this.id = id;
    this.interests = interests;
    this.status = status;
    this.birthday = birthday;
    this.major = major;
    this.location = location;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getInterests() {
    return interests;
  }

  public void setInterests(String interests) {
    this.interests = interests;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getBirthday() {
    return birthday;
  }

  public void setBirthday(String birthday) {
    this.birthday = birthday;
  }

  public String getMajor() {
    return major;
  }

  public void setMajor(String major) {
    this.major = major;
  }

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }
}
