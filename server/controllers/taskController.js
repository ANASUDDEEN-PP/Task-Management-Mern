//import DB
const taskModel = require('../models/taskModel');

//Task Create Route
exports.createTasks = async (req, res) => {
    const {TaskName, AssigneeName, Status, SubmitDate } = req.body;
    const taskData = {
        TaskName: TaskName,
        AssigneeName: AssigneeName,
        Status: Status,
        Date: SubmitDate
    };
    try{
        const data = await taskModel.create(taskData)
        .then(data=>{
            res.status(200).json({
                message: "Data Submitted",
                data
            })
        }).catch(err =>{
            res.status(400).json(err);
        })
    } catch(err){
        console.log(err);
    }
};

//Task Edit
exports.editTask = async (req, res) => {
    //Task editing
}

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
    
}

//Id by Task
exports.viewById = async (req, res) => {
    try{
        const { id } = req.params;
        console.log(id);
    } catch(err){
        console.log(err);
    }
}