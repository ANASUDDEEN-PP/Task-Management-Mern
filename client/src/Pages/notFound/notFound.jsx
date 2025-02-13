import { Link } from "react-router-dom";
import Navbar from "../../Components/navbar/navBar";
import Sidebar from "../../Components/sidebar/sideBar";
import "./notfound.css";

const NotFound = () => {
  return (
    <div className="notfound-page">
      <Navbar />
      <div className="notfound-container">
        <Sidebar />
        <div className="notfound-content">
          <h1 className="glitch" data-text="404">
            404
          </h1>
          <p className="fade-in">Oops! The page you're looking for doesn't exist.</p>
          <Link to="/" className="home-button">
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
