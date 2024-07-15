const express = require('express');

//mongodb
const conn = require('./DB/Conn');
const cors = require("cors"); 
// Configure CORS with options allowing credentials and any origin
 
const authroute =require('./routes/authroute')
const protectRoute =require('./utils/protacted')
const taskroute =require('./routes/taskroute')
const app = express();

app.use(cors({
    credentials: true,
    origin: true
  })); 
app.use(express.json());

require('dotenv').config();
const cookie = require('cookie-parser')

app.use(cookie())

app.get('/' ,(req,res)=>{
    res.send("Hello this main route");
})

// ---- login  logout signup ----
app.use('/api/auth' , authroute);

app.use('/api/task' ,protectRoute, taskroute )


app.listen(3001, (err)=>{
    conn();
    if(err)console.log(err);
    else console.log("Server is working")
})
