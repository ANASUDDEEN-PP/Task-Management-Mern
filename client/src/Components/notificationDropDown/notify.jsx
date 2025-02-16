import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./notify.css";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      transports: ["websocket", "polling"],
    });

    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:5003/notify");
        if (response.data.Notify && Array.isArray(response.data.Notify)) {
          const fetchedNotifications = response.data.Notify.map((item) => ({
            message: item.message,
            time: formatDateTime(item.DateAndTime),
          }));
          setNotifications(fetchedNotifications);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    // Function to convert ISO date string to readable format
    const formatDateTime = (isoString) => {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };

    socket.on("connect", () => {
      console.log("Connected to Socket.io server:", socket.id);
    });

    socket.on("taskAdded", (data) => {
      console.log("New task notification received:", data);

      if (data && data.message) {
        const newNotification = {
          message: data.message,
          time: getCurrentTime(),
        };
        setNotifications((prev) => [newNotification, ...prev]);
        setHasNewNotification(true);
        setShowMessage(true);

        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      } else {
        console.error("Received invalid taskAdded data:", data);
      }
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    fetchNotifications();

    return () => {
      socket.off("taskAdded");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, []);

  const handleBellClick = () => {
    setIsOpen(!isOpen);
    setHasNewNotification(false);
  };

  return (
    <div className="notification-container">
      {showMessage && (
        <div className="new-message shake">A new message has arrived</div>
      )}

      <div className="notification-dropdown">
        <button
          className={`notification-btn ${hasNewNotification ? "shake" : ""}`}
          onClick={handleBellClick}
        >
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
