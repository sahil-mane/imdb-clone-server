const jwt = require("jsonwebtoken");

const VerifyToken = async (req,res,next) =>{
    const token = req.header('authorization').split(" ")[1];
        
    if(!token)
    {
        return res.status(401).send({message:"Access denied. No token provided."})
    }

    try {
        await jwt.verify(token, process.env.JWT_SECRET_KEY,(err,user)=>{
            if(err)
                {
                    return res.status(401).send({message:"Access denied. Invalid token."})
                }
                req.user = user; 
                next();
        });               
      } catch (err) {
        res.status(403).json({ message: "Invalid or expired token" });
      }
}

module.exports = VerifyToken