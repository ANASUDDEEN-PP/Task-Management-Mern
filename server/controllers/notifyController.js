const notificationModel = require('../models/notificationModel');

//nofication
exports.getAllNotify = async(req, res) => {
    try{
        const Notify = await notificationModel.find({}).sort({DateAndTime: -1});
        return res.status(200).json({
            message: "Notifications",
            Notify
        });
    } catch(err){
        console.log(err);
    }
};