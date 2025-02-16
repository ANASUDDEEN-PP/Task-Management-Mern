import { useEffect, useState } from "react";
import Navbar from "../../Components/navbar/navBar";
import Sidebar from "../../Components/sidebar/sideBar";
import AddTaskPopup from "../../Components/addTask/addTask";
import { Link } from "react-router-dom";
import SearchBarDrop from "../../Components/searchDrop/searchDrop";
import axios from "axios";
import "./alltask.css";

const TaskView = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5003/task/view");
        const fetchedTasks = response.data.allDatas;
        setTasks(fetchedTasks);
        setFilteredTasks(fetchedTasks); // Initialize filtered list
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "In Progress":
        return "status-in-progress";
      case "Completed":
        return "status-pending";
      default:
        return "status-completed";
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredTasks(tasks); // Reset to full list when search is empty
      return;
    }

    const filtered = tasks.filter(task =>
      task.TaskName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  const handleAddTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks); // Sync filtered list
  };

  return (
    <div className="task-view-container">
      <Navbar />
      <div className="task-view-content">
        <Sidebar />
        <main className="main-content">
          <div className="task-header">
            <h2>Task List</h2>
            <SearchBarDrop 
              data={tasks.map(task => task.TaskName)} 
              onSearch={handleSearch} 
            />
            <button className="add-task-btn" onClick={() => setIsPopupOpen(true)}>
              Add Task
            </button>
          </div>

          <table className="task-table">
            <thead>
              <tr>
                <th>SlNo</th>
                <th>Task Name</th>
                <th>Assignee</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task, index) => (
                  <tr key={task._id}>
                    <td>{index + 1}</td>
                    <td>{task.TaskName}</td>
                    <td>{task.AssigneeName}</td>
                    <td className={getStatusClass(task.Status)}>{task.Status}</td>
                    <td>
                      <Link className="view-btn" to={`/tasks/${task._id}/viewTask`}>View</Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-tasks">No tasks found</td>
                </tr>
              )}
            </tbody>
          </table>

          {isPopupOpen && (
            <AddTaskPopup
              onClose={() => setIsPopupOpen(false)}
              onSubmit={handleAddTask}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default TaskView;
