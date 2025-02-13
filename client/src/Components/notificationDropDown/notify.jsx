import { useState, useEffect } from "react";
import "./notify.css";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { message: "New task assigned to you", time: new Date().toLocaleTimeString() },
    { message: "Meeting scheduled at 3 PM", time: new Date().toLocaleTimeString() },
    { message: "Reminder: Project deadline tomorrow", time: new Date().toLocaleTimeString() },
  ]);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // Function to format time in HH:MM AM/PM format
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  // Simulate a new notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const newNotification = { message: "New system update available", time: getCurrentTime() };
      setNotifications((prev) => [...prev, newNotification]);
      setHasNewNotification(true);
      setShowMessage(true);

      // Hide the shaking message after 3 seconds
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleBellClick = () => {
    setIsOpen(!isOpen);
    setHasNewNotification(false);
  };

  return (
    <div className="notification-container">
      {showMessage && <div className="new-message shake">A new message has come</div>}

      <div className="notification-dropdown">
        <button className={`notification-btn ${hasNewNotification ? "shake" : ""}`} onClick={handleBellClick}>
          🔔
          {hasNewNotification && <span className="notification-badge"></span>}
        </button>

        {isOpen && (
          <div className="dropdown-menu">
            {notifications.length > 0 ? (
              notifications.map((note, index) => (
                <div key={index} className="dropdown-item">
                  <span className="notification-text">{note.message}</span>
                  <span className="notification-time">{note.time}</span>
                </div>
              ))
            ) : (
              <div className="dropdown-item">No new notifications</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
