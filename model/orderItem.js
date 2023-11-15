const mongoose=require("mongoose")

const orderItemsSchema=mongoose.Schema(
    {
     
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product',
            required:true
        },
        quantity:{
            type:Number,
            required:true
        }

   }
   ,
   {
    timeStamps:true
   }
)

const OrderItems=mongoose.model("OrderItems",orderItemsSchema);


module.exports=OrderItems