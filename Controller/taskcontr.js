const Task = require('../modal/Task');


const addHistoryLog = (task, changeType, details) => {
  task.historyLog.push({
    changeType,
    timestamp: new Date(),
    details,
  });
};

const createTask = async (req, res) => {
    const { title, description, dueDate, priority } = req.body;
    // const } = req.user;
    // console.log(uid._id);
    // console.log(req.user._id)
    try {
      const task = new Task({ title, description, dueDate, priority, user_id :req.user._id});
      addHistoryLog(task, 'created', `Task created with title: ${title}`);
      await task.save();
      res.status(201).send({task,ans:true});
    } catch (error) {
      res.status(200).send({ error: error.message ,ans:false });
    }
  };


  const getTask = async (req, res) => {
    try {
      
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).send({ message: 'Task not found' ,ans:false});
      }
      addHistoryLog(task, 'visted', `Task visted `);
      await task.save();
      res.status(200).send({task,ans:true});
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };



  const getTasks = async (req, res) => {
    try {
      // console.log(req)
      const tasks = await Task.find({user_id:req.user._id});
      res.status(200).send({tasks,ans:true});
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };


  const updateTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

      console.log(task);
      if (!task) {
        return res.status(404).send({ message: 'Task not found' ,ans:false});
      }
      addHistoryLog(task,'edited', `Task updated with new details: ${JSON.stringify(req.body)}`);
     await task.save();

     console.log("after === >>> "  . task)
      res.status(200).send({task ,ans:true});
    } catch (error) {
      res.status(400).send({ error: error.message ,ans:false });
    }
  };

  const deleteTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) {
        return res.status(200).send({ message: 'Task not found',ans:false });
      }
      res.status(200).send({ message: 'Task deleted successfully',ans:true });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

  const changeTaskStatus = async (req, res) => {
    const { status } = req.body;
  
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(204).send({ message: 'Task not found' ,ans:false});
      }
      if(!status)res.status(202).send({error: 'status not found' ,ans:false})
      task.status = status;
      addHistoryLog(task,'status changed', `Status changed  to ${status}`);
      await task.save();
      res.status(200).send({task,ans:true});
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };

  const exportTasks = async (req, res) => {
    
  };
  
  
  const getTaskHistory = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).send({ message: 'Task not found' });
      }
      res.status(200).send(task.historyLog);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };


module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
    changeTaskStatus,
    exportTasks,
    getTaskHistory,
  };