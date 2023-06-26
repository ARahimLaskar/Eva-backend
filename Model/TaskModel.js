const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskname: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["pending", "done"],
    default: "pending",
  },
  tag: {
    type: String,
    required: true,
    enum: ["personal", "official", "family"],
    default: "personal",
  },
  userId: { type: String, required: true },
});

const TaskModel = mongoose.model("task", taskSchema);

module.exports = { TaskModel };
