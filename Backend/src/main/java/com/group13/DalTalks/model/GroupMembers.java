package com.group13.DalTalks.model;

import jakarta.persistence.*;

@Entity
public class GroupMembers {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @ManyToOne
  @JoinColumn(name = "group_id")
  private GroupEntity groupEntity;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  private boolean isActive;

  public GroupMembers() {
  }

  public GroupMembers(GroupEntity groupEntity, User user, boolean isActive) {
    this.groupEntity = groupEntity;
    this.user = user;
    this.isActive = isActive;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }
  public GroupEntity getGroupEntity() {
    return groupEntity;
  }

  public void setGroupEntity(GroupEntity groupEntity) {
    this.groupEntity = groupEntity;
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
