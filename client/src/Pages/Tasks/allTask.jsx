import { useState } from "react";
import Navbar from "../../Components/navbar/navBar";
import Sidebar from "../../Components/sidebar/sideBar";
import AddTaskPopup from "../../Components/addTask/addTask"; // Import the popup
import { Link, useNavigate } from "react-router-dom";
import SearchBar from '../../Components/searchDrop/searchDrop';
import "./alltask.css";

const TaskView = () => {
  const [tasks, setTasks] = useState([
    { id: 1, taskName: "Design Homepage", assignee: "Alice", status: "Pending" },
    { id: 2, taskName: "Develop API", assignee: "Bob", status: "In Progress" },
    { id: 3, taskName: "Test Features", assignee: "Charlie", status: "Completed" },
  ]);
  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
  };

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
                  <td>{task.taskName}</td>
                  <td>{task.assignee}</td>
                  <td className={getStatusClass(task.status)}>{task.status}</td>
                  <td>
                    <Link className="view-btn" to={`/tasks/${task.id}/viewTask`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isPopupOpen && (
            <AddTaskPopup
              onClose={() => setIsPopupOpen(false)}
              onSubmit={(newTask) => {
                handleAddTask(newTask);
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
