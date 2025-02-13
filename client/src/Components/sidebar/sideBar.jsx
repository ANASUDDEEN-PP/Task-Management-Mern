import { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <nav className="sidebar">
        <ul>
          <li><a href="/">Dashboard</a></li>
          <li><a href="/tasks">Tasks</a></li>
          <li><a href="#">Logout</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;