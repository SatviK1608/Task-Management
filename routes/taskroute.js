const express =  require('express');
const router  = express.Router();
const {createTask , getTasks, getTask ,updateTask, deleteTask,changeTaskStatus,exportTasks,getTaskHistory} = require("../Controller/taskcontr")


router.post('/' , createTask);
router.get('/list' , getTasks  )
router.get('/list/:id' ,getTask )
router.post('/update/:id' ,updateTask )

router.get('/del/:id' ,deleteTask )

router.post('/change/:id' ,changeTaskStatus )

router.post('/export' ,exportTasks )

router.get('/history/:id' ,getTaskHistory )


module.exports = router;