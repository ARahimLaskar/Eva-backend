const { Router } = require("express");
const { TaskModel } = require("../Model/TaskModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const taskController = Router();

taskController.get("/", async (req, res) => {
  const task = await TaskModel.find({ userId: req.body.userId });
  res.send(task);
});

taskController.post("/create", async (req, res) => {
  const { taskname, status, tag, userId } = req.body;
  const task = new TaskModel({
    taskname,
    status,
    tag,
    userId,
  });
  await task.save();
  res.send("task created");
});

taskController.get("/todos", async (req, res) => {
  const status = req.query.status;
  const tag = req.query.tag;
  if (status && tag) {
    const task = await TaskModel.find({
      userId: req.body.userId,
      status: status,
      tag: tag,
    });
    res.send(task);
  } else if (status) {
    const statusTask = await TaskModel.find({
      userId: req.body.userId,
      status: status,
    });
    res.send(statusTask);
  } else {
    const tasks = await TaskModel.find({ userId: req.body.userId });
    res.send(tasks);
  }
});

taskController.patch("/update/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const updateTask = await TaskModel.findOneAndUpdate(
    { _id: taskId, userId: req.body.userId },
    { ...req.body }
  );
  if (updateTask) {
    res.send("updated");
  } else {
    res.send("can't update");
  }
});

taskController.delete("/delete/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const updateTask = await TaskModel.findOneAndDelete({
    _id: taskId,
    userId: req.body.userId,
  });
  if (updateTask) {
    res.send("Deleted");
  } else {
    res.send("can't delete");
  }
});
taskController.get("/todos/:todoID", async (req, res) => {
  const { todoID } = req.params;
  const todo = await TaskModel.find({ _id: todoID, userId: req.body.userId });
  if (todo) {
    res.send(todo);
  } else {
    res.send("can't find");
  }
});

// taskController.get("/todos/:todoID", async (req, res) => {
//     const { todoID } = req.params;
//     const todo = await TaskModel.find({ _id: todoID, userId: req.body.userId });
//     if (todo) {
//       res.send(todo);
//     } else {
//       res.send("can't find");
//     }
//   });

module.exports = { taskController };
