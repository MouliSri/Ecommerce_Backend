const moongose=require("mongoose")


const categorySchema=moongose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter the Category Name"]
    },
    colour:{
        type:String

    },
    icon:{
        type:String
    }
},
{
    timeStamps:true
})


const Category =moongose.model("Category",categorySchema)


module.exports=Category