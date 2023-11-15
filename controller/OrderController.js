const OrderItems=require("../model/orderItem")
const Orders=require("../model/order")



const getAllOrders=async(req,res)=>{

    try {

        const orders=await Orders.find().populate('user','name')
        .populate(
            {path:"orderItems",
            populate:{path:"product",
            populate:"category"}})
        .sort('dateOrdered');

        if(!orders){
            res.status(400).json({message:"Orders Not Found",success:false})
        }

        res.status(200).json(orders)
        
    } catch (error) {

        res.status(500).json({message:error.message,success:false})
        
    }

}

const getParticularOrder=async(req,res)=>{

    try {

        const {id}=req.params
        const order=await Orders.findById({_id:id}).populate('user','name').populate(
            {path:"orderItems",
            populate:{path:"product",
            populate:"category"}});

        if(!order){
            res.status(404).json({message:"Order Not Found with given id",success:false})
        }

        res.status(200).json(order)
        
    } catch (error) {

        res.status(500).json({message:error.message,success:false})
        
    }

}


const getParticularUserOrders=async(req,res)=>{


  try {
    const userId = req.headers['user-id'];

    console.log(userId)
     
     if (!userId) {
      return res.status(400).json({ message: "User ID not provided in headers", success: false });
    }

    const {id}=req.params


    const orders= await Orders.find({user:userId}).populate('user','name').populate(
        {path:"orderItems",
        populate:{path:"product",
        populate:"category"}});

   
       
    if(!orders){
        res.status(404).json({message:"Orders Not Found with given  user id",success:false})
    }

    res.status(200).json(orders)
    
  } catch (error) {
    res.status(500).json({message:error.message,success:false})
  }



}

const placeOrder=async(req,res)=>{


    try {

        const userId = req.headers['user-id'];

        
         const Items=await OrderItems.insertMany(req.body.orderItems);

        
          const TotalPrices = await Promise.all(Items.map(async (item)=>{

            const productItem= await OrderItems.findById({_id:item._id}).populate('product','price')

            const totalPrice=productItem.product.price * item.quantity;


            return totalPrice;
          }))

          let price=0
           for (let index = 0; index < TotalPrices.length; index++) {
           
            price+=TotalPrices[index]
              
           }


    


         if(!Items){
            return res.status(400).json({message:"order items not stored",success:false})
         }

         const orderItemsIds=await Items.map(x=> x._id)

          req.body.orderItems=orderItemsIds

          req.body.totalPrice=price

          req.body.user=userId
          
         const storedOrder=await Orders.create(req.body)

         if(!storedOrder){
            return res.status(400).json({message:"order not placed",success:false})
         }


         res.status(200).send(storedOrder)
        
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
    
}

const updateOrder=async(req,res)=>{

    try {

        const {id}=req.params

        const updatedOrder=await Orders.findByIdAndUpdate({_id:id},{status:req.body.status},{new:true})

        console.log(updatedOrder)

        if(!updatedOrder){
            return res.status(400).json({message:"Order Not Updated",success:false})
        }

        res.status(200).send("updated successfully")
        
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
}

const deleteOrder=async(req,res)=>{

   
    try {

        const {id}=req.params

    
        const order=await Orders.findById({_id:id}).select("orderItems -_id")

       


        const deletedOrder=await Orders.findByIdAndDelete({_id:id})

         
        if(!deletedOrder ){
            return res.status(400).json({message:"Order Not deleted",success:false})
        }

         
        await order.orderItems.map(async (item)=>{
    
         await OrderItems.findByIdAndDelete({_id:item})
        })

        res.status(200).send("deleted successfully")
        
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
}

module.exports={getAllOrders,placeOrder,getParticularOrder,updateOrder,deleteOrder,getParticularUserOrders}