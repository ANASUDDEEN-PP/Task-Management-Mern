import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // Assuming you're using React Router
import Navbar from "../../../Components/navbar/navBar";
import Sidebar from "../../../Components/sidebar/sideBar";
import "./viewtask.css";
import axios from "axios";

const ViewTask = () => {
  const { id } = useParams();
  console.log(id);
  const [task, setTask] = useState({
    taskName: "Design Homepage",
    assignee: "Alice",
    status: "In Progress",
    date: "2024-02-15",
  });

  useEffect(()=>{
    const taskDataById = async () => {
      try{
        const responce = await axios.get(`http://localhost:5003/get/${id}`);
      } catch(err){
        console.log(err);
      }
    }
    taskDataById();
  },[]);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setTask(editedTask);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      console.log("Task deleted!");
    } else {
      console.log("Action canceled.");
    }
  };
  


  const handleClose = () => {
    setIsEditing(false);
  }

  return (
    <div className="view-task-container">
      <Navbar />
      <div className="view-task-content">
        <Sidebar />
        <Link className="back-btn" to='/tasks'>Goto Back</Link>
        <main className="task-main">
          {isEditing ? (
            <>
              <input
                type="text"
                className="edit-input title"
                value={editedTask.taskName}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, taskName: e.target.value })
                }
              />
              <input
                type="text"
                className="edit-input assignee"
                value={editedTask.assignee}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, assignee: e.target.value })
                }
              />
              <div className="row">
                <select
                  className="edit-select"
                  value={editedTask.status}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, status: e.target.value })
                  }
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
                <input
                  type="date"
                  className="edit-input"
                  value={editedTask.date}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, date: e.target.value })
                  }
                />
              </div>
              <div className="button-group">
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
                <button className="delete-btn" onClick={handleClose}>
                  Close
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="task-title">{task.taskName}</h1>
              <h3 className="task-assignee">{task.assignee}</h3>
              <div className="task-details">
                <p>
                  <strong>Status:</strong> <span className={task.status.toLowerCase()}>{task.status}</span>
                </p>
                <p>
                  <strong>Submitted Date:</strong> {task.date}
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
