import { useEffect, useState } from "react";
import Navbar from "../../Components/navbar/navBar";
import Sidebar from "../../Components/sidebar/sideBar";
import AddTaskPopup from "../../Components/addTask/addTask"; // Import the popup
import { Link } from "react-router-dom";
import SearchBar from '../../Components/searchDrop/searchDrop';
import axios from "axios";
import "./alltask.css";

const TaskView = () => {
  const [tasks, setTasks] = useState([]); // Initialize with an empty array
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchContentData = async () => {
      try {
        const response = await axios.get("http://localhost:5003/task/view");
        console.log(response.data.allDatas);
        setTasks(response.data.allDatas); // Update state with fetched tasks
      } catch (err) {
        console.log(err);
      }
    };
    fetchContentData();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "In Progress":
        return "status-in-progress"; // Orange
      case "Pending":
        return "status-pending"; // Green
      default:
        return "status-completed"; // Red
    }
  };

  return (
    <div className="task-view-container">
      <Navbar />
      <div className="task-view-content">
        <Sidebar />
        <main className="main-content">
          <div className="task-header">
            <h2>Task List</h2>
            <SearchBar className="ser-bar" />
            <button className="add-task-btn" onClick={() => setIsPopupOpen(true)}>
              Add Task
            </button>
          </div>

          <table className="task-table">
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Task Name</th>
                <th>Assignee Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.TaskName}</td>
                  <td>{task.AssigneeName}</td>
                  <td className={getStatusClass(task.status)}>{task.Status}</td>
                  <td>
                    <Link className="view-btn" to={`/tasks/${task._id}/viewTask`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isPopupOpen && (
            <AddTaskPopup
              onClose={() => setIsPopupOpen(false)}
              onSubmit={(newTask) => {
                // handleAddTask(newTask);
                setIsPopupOpen(false);
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default TaskView;
