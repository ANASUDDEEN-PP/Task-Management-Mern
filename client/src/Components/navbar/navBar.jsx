import "./nav.css";
import NotificationDropdown from "../notificationDropDown/notify";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">TaskManage</h1>
      <NotificationDropdown />
    </nav>
  );
};

export default Navbar;