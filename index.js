const express=require("express")

const app=express()

const bodyParser=require("body-parser")

const morgan =require("morgan")

const mongoose= require("mongoose")

const cors=require("cors")


// To read the data from env file 

require("dotenv").config()


// before config the middleware we need confi the dotenv file
const authJwt=require("./helper/JwtAuth")


const errorHandler=require("./helper/errorHandler")

//routers

const productRouter=require("./routers/productRouter")

const userRouter=require("./routers/userRouter")

const categoryRouter=require("./routers/categoryRouter")

const orderRouter=require("./routers/orderRouter")






const port=process.env.PORT || 3000;

const api=process.env.PREFIX_URL;

const mongo_url=process.env.MONGO_URL;




// ->  middleware


 // Checking the api having the valid token 

 app.use(authJwt())

 app.use(errorHandler)

 // cross origin configuration

 app.use(cors({
    origin:"*"
 }))

 // accept the exchange of json format data over url
 app.use(bodyParser.json())

 //logging the information of url
 app.use(morgan("tiny"))


 //api calls passing to router

 app.use(`${api}/products`,productRouter)


 app.use(`${api}/users`,userRouter)


 app.use(`${api}/category`,categoryRouter)

 app.use(`${api}/orders`,orderRouter)



 // -> configuration of server


 mongoose.connect(mongo_url).then(()=>{

    console.log('connected to the database')

    app.listen(port ,()=>{

        console.log(`im running on the port ${port}`)
     })
    
    
 })
 .catch((error)=> console.log(error))




 