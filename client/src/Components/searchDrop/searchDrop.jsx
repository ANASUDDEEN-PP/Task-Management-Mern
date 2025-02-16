import { useState } from "react";
import "./searchdrop.css";

const SearchBarDrop = ({ data, onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter suggestions based on input
  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Pass search term to parent component
    setIsOpen(true);
  };

  return (
    <div className="searchbar-dropdown">
      <div className="inp-div">
        <input
          type="search"
          placeholder="Search Task..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
      </div>
      {isOpen && searchTerm && (
        <div className="search-dropdown-menu">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <div key={index} className="dropdown-item">
                {item}
              </div>
            ))
          ) : (
            <div className="dropdown-no-data">No matching tasks</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBarDrop;
