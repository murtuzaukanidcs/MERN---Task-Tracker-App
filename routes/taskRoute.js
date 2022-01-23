const express = require('express');
const router = express.Router();

const taskModel = require("../models/taskModel")

router.post("/", async(req, res) => {
    const taskData = req.body
    taskModel.create(taskData);
    res.send({ message: "Task inserted successfully" });
    console.log("Task inserted successfully");
})

router.get("/", async(req, res) => {
    taskModel.find((err, data) => {
        if (data) {
            console.log(data);
            res.send({ message: "Get data", task: data })
        } else {

            console.log("No data found!");
            res.send({ message: "No data", task: [] })
        }
    })
})

router.put("/:id", async(req, res) => {
    const id = req.params.id
    const updateData = req.body
    taskModel.findByIdAndUpdate({ _id: id }, { title: updateData.title, desc: updateData.desc }, (err, data) => {
        if (data) {
            res.send({ message: "Record update successfully" })
            console.log("Record update successfully");
        } else {
            res.send({ message: "Sorry! Record not found" })
            console.log("Sorry! Record not found");
        }
    })
})

router.delete("/:id", async(req, res) => {
    taskModel.findByIdAndDelete({ _id: req.params.id }, (err, data) => {
        if (!err) {
            res.send({ message: "Record deleted successfully" })
            console.log("Record deleted successfully");

        } else {
            res.send({ message: "Sorry! Record not found" })
            console.log("Sorry! Record not found");
        }
    })
})

module.exports = router