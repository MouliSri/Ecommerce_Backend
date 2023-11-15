
const errorHandler=(err,req,res,next)=>{


    if(err.name === 'UnauthorizedError'){
       return res.status(401).json({message:"Un authorized Request"})
    }

    if(err.name === 'ValidationError'){
       return res.status(401).json({message:err})
    }

    res.status(500).json(err)
}


module.exports=errorHandler