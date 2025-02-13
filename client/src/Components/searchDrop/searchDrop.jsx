import { useState } from "react";
import "./searchdrop.css";

const SearchBarDrop = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Dummy data for search
  const suggestions = ["Dashboard", "Tasks", "Settings", "Profile", "Logout", "Users", "Reports", "Analytics", "Notifications"];

  // Filter suggestions based on search input
  const filteredSuggestions = suggestions.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="searchbar-dropdown">
      <input
        type="search"
        placeholder="Search..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Delay closing to allow clicking dropdown items
      />

      {isOpen && (
        <div className="search-dropdown-menu">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((item, index) => (
              <div key={index} className="dropdown-item">
                {item}
              </div>
            ))
          ) : (
            <div className="dropdown-no-data">No data found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBarDrop;
