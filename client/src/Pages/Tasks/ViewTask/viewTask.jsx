// ViewTask.js
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../Components/navbar/navBar";
import Sidebar from "../../../Components/sidebar/sideBar";
import "./viewtask.css";
import axios from "axios";
 
const ViewTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTaskById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5003/task/get/${id}`
        );
        setTask(response.data.Task);
        setEditedTask(response.data.Task);
        // console.log(response.data.Task);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTaskById();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      console.log(editedTask);
      await axios.put(`http://localhost:5003/task/update/${id}`, editedTask);
      setTask(editedTask);
      setIsEditing(false);
      alert("Task Updated");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`http://localhost:5003/task/delete/${id}`);
        console.log("Task deleted!");
        navigate('/tasks');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="view-task-container">
      <Navbar />
      <div className="view-task-content">
        <Sidebar />
        <Link className="back-btn" to="/tasks">
          Go Back
        </Link>
        <main className="task-main">
          {isEditing ? (
            <>
              <input
                type="text"
                className="edit-input title"
                name="TaskName" // Ensure name matches the property in the task object
                value={editedTask.TaskName || ""}
                onChange={handleEditChange}
              />

              <input
                type="text"
                className="edit-input assignee"
                name="AssigneeName"
                value={editedTask.AssigneeName || ""}
                onChange={handleEditChange}
              />

              <select
                className="edit-select"
                name="Status"
                value={editedTask.Status || ""}
                onChange={handleEditChange}
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Closed">Closed</option>
              </select>

              <input
                type="date"
                className="edit-input"
                name="Date"
                value={editedTask.Date || ""}
                onChange={handleEditChange}
              />
              <div className="button-group">
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="task-title">{task.TaskName}</h1>
              <h3 className="task-assignee">{task.AssigneeName}</h3>
              <div className="task-details">
                <p>
                  <strong>Status:</strong> {task.Status}
                </p>
                <p>
                  <strong>Submitted Date:</strong> {task.Date}
                </p>
              </div>
              <div className="button-group">
                <button className="edit-btn" onClick={handleEdit}>
                  Edit
                </button>
                <button className="delete-btn" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default ViewTask;
