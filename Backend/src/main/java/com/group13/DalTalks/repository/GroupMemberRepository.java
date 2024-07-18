package com.group13.DalTalks.repository;

import com.group13.DalTalks.model.GroupMembers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupMemberRepository extends JpaRepository<GroupMembers, Integer> {

  //this allows us to interact with the group members table
  //-> ie we could define a method to search for a particular group, inactive/active members, etc..
}
