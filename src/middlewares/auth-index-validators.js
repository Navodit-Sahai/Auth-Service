const validateUserAuth=(req,res,next)=>{
    if(!req.body.email ||!req.body.password){
        return res.status(400).json({
            success:false,
            data:{},
            message:'something went wrong',
            err:'invalid credentials'
        })
    }
    next();
}


const validateisAdmin=(req,res,next)=>{
    if(!req.body.userId){
        returnres.status(400).json({
            success:false,
            data:{},
            message:'something went wrong',
            err:'no userId'
        }) 
    }
    next();
}

module.exports={
    validateUserAuth
}