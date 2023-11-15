const router=require("express").Router();
const {addUser,GetAllUsers,GetParticularUser,deleteUser,updateUser,loginUser,registerUser}=require("../controller/UserController")


router.get("/",GetAllUsers)

router.get("/login",loginUser)


router.get("/:id",GetParticularUser)

router.post("/",addUser)

router.post("/register",registerUser)

router.delete("/:id",deleteUser)

router.put("/:id",updateUser)






module.exports=router


