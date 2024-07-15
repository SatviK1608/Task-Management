
const user = require('../modal/User.js');
const bcrypt  = require('bcrypt');
const salt = 10;

const genratetoken = require('../utils/token.js');


const login = async(req,res)=>{
    try{

        const {email , password }  =req.body;
        const u = await user.findOne({email})
        if(u){
           
            const ans = await bcrypt.compare(password ,u.password);
            if(ans){
                console.log(u._id)
                genratetoken(u._id ,res,req);
                res.status(200).json({
                    token :req.jwt, 
                    id : u._id,
                    uname :u.username, 
                    ans : true,
                    error : "ok"
                })

            }else return res.status(200).json({error: "Incorrect  Username/password" ,ans:false}) 
        }else return res.status(200).json({error: "Incorrect  Username/password" , ans:false }) 

    }catch(error){
        console.log(error)
        res.status(500).json({error : "Internal Server Error"})
    }
}
const logout = async(req,res)=>{
    //   console.log("logout")
    try{
        res.cookie("jwt" , "" ,{maxAge:0});
        res.status(200).json({
            message:"logout",
            ans:true
        })
    }catch(error){
        res.status(500).json({error : "Internal Server Error"})
    }
}


const signup = async(req,res)=>{
     try{
        const {username , email , password , cpassword }=req.body;

        if(password !== cpassword)return res.status(200).json({error:"Password not matched" ,ans:false})

        const u = await user.findOne({email});
        if(u)return res.status(200).json({error:"User Name already exists",ans:false})
        
           const hpassword =  await bcrypt.hash(password , salt);

            const newuser = new user({
                username,email,password:hpassword
            })

             genratetoken(newuser._id , res,req);
            await newuser.save();
            res.status(201).json({
                token: req.jwt,
                uname :newuser.username,
                id : newuser._id,
                ans:true
            })

     }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal Server Error"});
     }
}

module.exports = {login , signup ,logout}