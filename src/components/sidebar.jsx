import React, { useState } from 'react';

const Sidebar = ({ data, onCompanySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter((item) =>
    item.index_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sidebar">
      <h2>Company Names</h2>
      <input
        type="text"
        placeholder="Search companies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <ul>
        {filteredData.map((item, index) => (
          <li key={index} onClick={() => onCompanySelect(item)}>
            {item.index_name?.replace(/['"]/g, '')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
