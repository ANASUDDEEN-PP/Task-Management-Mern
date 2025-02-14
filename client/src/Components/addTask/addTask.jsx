import { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../../url";
import "./addtask.css";

const AddTaskPopup = ({ onClose, onSubmit }) => {
  const [taskName, setTaskName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("In Progress");
  const [date, setDate] = useState("");
  const [assignees, setAssignees] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" }
  ]);

  useEffect(() => {
    // Simulated API call to fetch assignee names
    setTimeout(() => {
      setAssignees([
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Alice Johnson" }
      ]);
    }, 500);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({ taskName, assignee, status, date });
    const taskData = {
        TaskName: taskName,
        AssigneeName: assignee,
        Status: status,
        SubmitDate: date
    };
    try{
        const responce = await axios.post(`http://localhost:5000/task/create`, taskData)
        .then(res=>{
            console.log(responce);
        });
    } catch(err){
        console.log(err)
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <label>Task Name:</label>
          <input 
            type="text" 
            value={taskName} 
            onChange={(e) => setTaskName(e.target.value)}
            required
          />

          <label>Assignee Name:</label>
          <select value={assignee} onChange={(e) => setAssignee(e.target.value)} required>
            <option value="">Select Assignee</option>
            {assignees.map((user) => (
              <option key={user.id} value={user.name}>{user.name}</option>
            ))}
          </select>

          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Closed">Closed</option>
          </select>

          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

          <div className="popup-buttons">
            <button type="submit">Add Task</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskPopup;
