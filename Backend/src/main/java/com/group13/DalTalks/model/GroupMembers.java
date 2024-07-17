package com.group13.DalTalks.model;

import jakarta.persistence.*;

@Entity
public class GroupMembers {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @ManyToOne
  @JoinColumn(name = "group_id")
  private Group group;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  private boolean isActive;

  public GroupMembers() {
  }

  public GroupMembers(Group group, User user, boolean isActive) {
    this.group = group;
    this.user = user;
    this.isActive = isActive;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public Group getGroup() {
    return group;
  }

  public void setGroup(Group group) {
    this.group = group;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public boolean isActive() {
    return isActive;
  }

  public void setActive(boolean active) {
    isActive = active;
  }
}
