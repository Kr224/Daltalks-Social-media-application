package com.group13.DalTalks.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Group {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String groupName;
  private boolean isPrivate;
  private int creatorID;
  private Date creation_date;

  @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonIgnore
  private Set<GroupMembers> members = new HashSet<>();

  public Group() {
  }

  public Group(String groupName, boolean isPrivate, int creatorID, Date creation_date) {
    this.groupName = groupName;
    this.isPrivate = isPrivate;
    this.creatorID = creatorID;
    this.creation_date = creation_date;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getGroup_name() {
    return groupName;
  }

  public void setGroup_name(String groupName) {
    this.groupName = groupName;
  }

  public boolean isPrivate() {
    return isPrivate;
  }

  public void setPrivate(boolean aPrivate) {
    isPrivate = aPrivate;
  }

  public int getCreatorID() {
    return creatorID;
  }

  public void setCreatorID(int creatorID) {
    this.creatorID = creatorID;
  }

  public Date getCreation_date() {
    return creation_date;
  }

  public void setCreation_date(Date creation_date) {
    this.creation_date = creation_date;
  }

  public Set<GroupMembers> getMembers() {
    return members;
  }

  public void setMembers(Set<GroupMembers> members) {
    this.members = members;
  }
}
