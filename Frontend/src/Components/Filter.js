import React from 'react';
import '../css/Filter.css';

const FilterModal = ({ filteredResults, handleResultClick }) => {
  return (
    <div className="filter-modal">
      <h2>Filtered Results</h2>
      <div>
        <h3>People</h3>
        {filteredResults
          .filter(result => result.type === 'person')
          .map(result => (
            <div key={result.id} onClick={() => handleResultClick(result.id, result.type)}>
              {result.name}
            </div>
          ))
        }
      </div>
      <div>
        <h3>Groups</h3>
        {filteredResults
          .filter(result => result.type === 'group')
          .map(result => (
            <div key={result.id} onClick={() => handleResultClick(result.id, result.type)}>
              {result.name}
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default FilterModal;
