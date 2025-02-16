//import DB
const taskModel = require('../models/taskModel');
const NotificationModel = require('../models/notificationModel');
const { io } = require('../config/socket');

//Task Create Route
exports.createTasks = async (req, res) => {
    const { TaskName, AssigneeName, Status, SubmitDate } = req.body;
    const taskData = {
        TaskName,
        AssigneeName,
        Status,
        Date: SubmitDate
    };

    try {
        const data = await taskModel.create(taskData);
        
        const notifyMessage = `New task: ${TaskName} assigned to ${AssigneeName}`;
        // Emit taskAdded event when task is created
        const socketOkey = io.emit("taskAdded", { message: notifyMessage });
        if(socketOkey){
            const nofityAdded = await NotificationModel.create({
                NotificationType: "Task Added",
                NotificationMessage: notifyMessage,
                UserId: '',
            });
            console.log(`Task Added Notification Added`);
        } else {
            return res.status(404).json({
                message : "Have an issue on Socket"
            })
        }

        res.status(200).json({
            message: "Data Submitted",
            data
        });
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
};

//Task Edit
exports.editTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = {
            TaskName: req.body.TaskName,
            AssigneeName: req.body.AssigneeName,
            Status: req.body.Status,
            Date: req.body.Date
        };

        if (!id) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const updatedTask = await taskModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task updated successfully", updatedTask });

    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


//View all Tasks
exports.viewAllTasks = async (req, res) => {
    try{
        const allDatas = await taskModel.find({})
        .then(allDatas => {
            res.status(200).json({
                message: "All Datas Fetched",
                allDatas
            })
        }) .catch(err=>{
            console.log(err);
        })
    } catch (err) {
        console.log(err);
    }
}

//Delete Tasks
exports.deleteTasks = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const deletedTask = await taskModel.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });

    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


//Id by Task
exports.viewById = async (req, res) => {
    try{
        const { id } = req.params;
        if(id){
            const Task = await taskModel.findOne({_id: id})
            .then(Task=>{
                res.status(200).json({
                    Task
                })
            }) .catch(err => {
                res.status(404).json({
                    message:"No data available"
                })
            })
        } else {
            console.log("No Id Founded....");
            res.status(500).json({
                message: "Invalid id..."
            })
        }
    } catch(err){
        console.log(err);
    }
}