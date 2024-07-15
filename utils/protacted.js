const jwt = require('jsonwebtoken');
const user = require('../modal/User')


const protectRoute = async(req,res,next)=>{
    try{
        // const authHeader = req.headers['authorization'];
        // console.log(authHeader);
        // // const token = authHeader && authHeader.split(' ')[1];
        // const token =  authHeader && authHeader.split(' ')[1] || req.cookies.jwt ;

        // const bearerHeader = req.headers["authorization"];
        // const bearer = bearerHeader.split(" ");
        // const token = bearer[1];

        console.log(req.headers.authorization.split(" ")[1]);
        const token =req.headers.authorization.split(" ")[1];
        console.log(token)

        // cons/ole.log(req.headers[authorization]);
        if(!token)return res.status(201).json({error:"Unauthorized No Token" ,ans:false});
        const decoder = jwt.verify(token,"ghjklrttftfyuuygyugyyuggyugyu")

        if(!decoder)return res.status(201).json({error:"Unauthorized Invaild Token" ,ans:false});
        // console.log(decoder);

        const u = await user.findById(decoder.userid).select("-password")
        // console.log(u);
        if(!u)return res.status(200).json({error:"User not Found" ,ans:false});
        req.user = u;
        // console.log(req.user)

        next();
    }catch(err){
        console.log(err)
       return res.status(500).json({error:"Internal Server Error kokokkokokokokokokokokokokok"});
    }
}
module.exports  = protectRoute;
