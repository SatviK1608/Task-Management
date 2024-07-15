

const jwt = require('jsonwebtoken');
const jwtkey = process.env.jwt || "ghjklrttftfyuuygyugyyuggyugyu";


const genratetoken = (userid , res ,req)=>{
    console.log(jwtkey)

        const token = jwt.sign({userid},jwtkey,{
            expiresIn:"1d"
        })
        req.jwt  = token;

        res.cookie("jwt" ,token,{
            maxAge: 24*60*60*1000
        })


}

module.exports = genratetoken;