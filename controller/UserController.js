const User=require("../model/users")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")



function generateToken(id,isAdmin){

  return  jwt.sign({
    userId:id,
    Admin:isAdmin
  },
  process.env.SECREAT_KEY,
  {
    expiresIn:'10d'
  });

}

const GetAllUsers=async(req,res)=>{

    try {

        const users=await User.find().select(" name email phoneNumber")
        res.status(200).json(users)
        
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
}

const GetParticularUser=async(req,res)=>{


    try {

        const {id}=req.params

        const user= await User.findById({_id:id}).select(" name email phoneNumber")

        if(!user){
            return res.status(404).json({message:"user not found with the given id",success:false})
        }

        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
        
    }
}

const addUser=async(req,res)=>{

    try {

        const addedUser= await User.create(req.body)

        res.status(200).json(addedUser)
        
    } catch (error) {

        res.status(500).json({message:error.message,success:false})
        
    }

    
}


const deleteUser=async(req,res)=>{


    try {

        const {id}=req.params

        const user= await User.findByIdAndDelete({_id:id})

        if(!user){
            return res.status(404).json({message:"user not found with the given id",success:false})
        }

        res.status(200).json({message:"user deleted succesfully",success:true});
        
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
        
    }
}

const updateUser=async(req,res)=>{


    try {

        const {id}=req.params

        const user= await User.findByIdAndUpdate({_id:id},req.body)

        if(!user){
            return res.status(404).json({message:"user not found with the given id",success:false})
        }

        res.status(200).json({message:"user updated succesfully",success:true});
        
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
        
    }
}


const loginUser=async(req,res)=>{


    try {

        const user=await User.findOne({email:req.body.email})

        if(!user){
            return res.status(404).json({message:"user not found with the given email",success:false})
        }

        if(user && bcrypt.compareSync(req.body.password,user.password)){

           
            const token=generateToken(user._id,user.isAdmin)

            res.header('user-id', user._id);

            res.header('Authorization', `Bearer ${token}`);
           return  res.status(200).send({user:user.email,token})
        }


        res.status(400).send({message:"Password is not correct"})
        
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
}

const registerUser=async(req,res)=>{

    try {

        const addedUser= await User.create(req.body)

        res.status(200).json(addedUser)
        
    } catch (error) {

        res.status(500).json({message:error.message,success:false})
        
    }

    
}

module.exports={addUser,GetAllUsers,GetParticularUser,deleteUser,updateUser,loginUser,registerUser}