const moongose=require("mongoose")
const bcrypt=require("bcrypt")

const userSchema=moongose.Schema(
    {

        name:{
            type:String,
            required:[true,"Please Enter the Name"]

        },
        email:{
            type:String,
            required:[true,"Please Enter the Email"],
            unique: true
        },
        password:{
            type:String,
            required:[true,"Please Enter the Password"]
        },
        phoneNumber:{
            type:Number,
            unique:true
        },
        street:{
            type:String,
            default:''
        },
        apartment:{
            type:String,
            default:''
        },
        city:{
            type:String,
            default:''
        },
        zip:{
            type:String,
            default:''
        },
        country:{
            type:String,
            default:''
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
   }
,{
    timeStamps:true
})

userSchema.pre("save",async function(next){
    const salt=await bcrypt.genSalt();

    this.password=await bcrypt.hash(this.password,salt);
})


const User=moongose.model("User",userSchema)


module.exports=User