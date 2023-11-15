const mongoose= require("mongoose")


const productSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please Enter the name"]
        },
        description:
        {
            type:String,
            required:[true,"Please Enter the description"]

        },
        highLightText:{

            type:String,
            default:''

        },
        image:{
            type:String,
            default:''
        },
        images:[{
            type:String,
        }],
        brand:{
            type:String,
            default:''
        },
        price:
        {
            type:Number,
            required:[true,"please enter the price"],
            default:0
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Category',
            required:true
        },
        stock:{
            type:Number,
            required:true,
            min:0,
            max:255
        },
        rating:{
            type:Number,
            default:0
        },
        noOfReviews:{
            type:Number,
            default:0
        },
        isFeatured:{
            type:Boolean,
            default:false
        },
        dateCreated:{
            type:Date,
            default:Date.now
        }

    },
    {
        timeStamps:true
    }
);


const Product=mongoose.model("Product",productSchema);



module.exports=Product