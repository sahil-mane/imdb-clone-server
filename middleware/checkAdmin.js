const checkAdmin = async(req,res,next) =>{
    const role = req.user.role;
    if(role === 'admin'){
        next();
    }
    else{
        res.status(403).json({message:'You are not authorized to access this resource.'});
    }
}

module.exports = checkAdmin;