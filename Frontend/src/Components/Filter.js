// src/Components/Filter.js
import React, { useState } from 'react';
import './Filter.css';

const Filter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [people, setPeople] = useState([
    { name: 'Alice' },
    { name: 'Bob' },
    { name: 'Charlie' }
  ]);
  const [groups, setGroups] = useState([
    { name: 'React Developers' },
    { name: 'JavaScript Enthusiasts' },
    { name: 'Frontend Masters' }
  ]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <PeopleList people={people} searchTerm={searchTerm} />
      <GroupsList groups={groups} searchTerm={searchTerm} />
    </div>
  );
};

const PeopleList = ({ people, searchTerm }) => {
  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>People</h2>
      <ul>
        {filteredPeople.map((person, index) => (
          <li key={index}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

const GroupsList = ({ groups, searchTerm }) => {
  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Groups</h2>
      <ul>
        {filteredGroups.map((group, index) => (
          <li key={index}>{group.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Filter;
