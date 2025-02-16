import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./notify.css";

const socket = io("http://localhost:5000", {
    transports: ["websocket", "polling"], // Ensure compatibility
});

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // Function to format time in HH:MM AM/PM format
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  useEffect(() => {
    socket.on("connect", () => {
        console.log("Connected to Socket.io server:", socket.id);
    });

    socket.on("taskAdded", (data) => {
        console.log("New task notification received:", data);
        const newNotification = { message: data.message, time: getCurrentTime() };
        setNotifications((prev) => [...prev, newNotification]);
        setHasNewNotification(true);
        setShowMessage(true);

        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    });

    socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
    });

    return () => {
        socket.off("taskAdded");
    };
  }, []);

  const handleBellClick = () => {
    setIsOpen(!isOpen);
    setHasNewNotification(false);
  };

  return (
    <div className="notification-container">
      {showMessage && <div className="new-message shake">A new message has arrived</div>}

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
