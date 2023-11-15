const router=require("express").Router()
const {getAllOrders,placeOrder, getParticularOrder,updateOrder,deleteOrder, getParticularUserOrders}=require("../controller/OrderController")


router.get("/",getAllOrders);

router.get("/:id",getParticularOrder)


router.get("/getorders/:id",getParticularUserOrders)


router.post("/placeorder",placeOrder)

router.put("/:id",updateOrder)

router.delete("/:id",deleteOrder)





module.exports=router