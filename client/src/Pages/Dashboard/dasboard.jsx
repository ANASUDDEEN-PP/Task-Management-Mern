import Navbar from "../../Components/navbar/navBar";
import Sidebar from "../../Components/sidebar/sideBar";
import "./dash.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <h1>Hi UserName</h1>
          <p>Welcome back...!</p>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
