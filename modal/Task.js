const mongoose  = require('mongoose');
const taskSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
    },
    status: {
      type: String,
      enum: ['to-do', 'in-progress', 'completed'],
      default: 'to-do',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    historyLog: [
      {
        changeType: {
          type: String,
          enum: ['created', 'status changed', 'edited' ,'visted'],
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        details: {
          type: String,
        },
      },
    ],
  })

const Task = mongoose.model("Task" , taskSchema);
module.exports = Task;

