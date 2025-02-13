//import DB
const taskModel = require('../models/taskModel');

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
}