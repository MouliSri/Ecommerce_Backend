const Product=require("../model/product")
const Category=require("../model/category")

const mongoose=require("mongoose")

const getAllProducts=async(req,res)=>{


    try {

        let filter={}

        if(req.query.category){

            filter={category: req.query.category.split(',')} 
        }


        const Products=await Product.find(filter).populate('category');

        res.status(200).json(Products)
        
    } catch (error) {
        
        res.status(500).json({message:error.message,success:false})
    }
    
 }

 const getParticularProduct=async(req,res)=>{

    try {

        const {id}=req.params

        if(!mongoose.isValidObjectId(id)){
         
            return res.status(400).json({message:"Invalid Id"})
        }

        const product=await Product.findById({_id:id})
    
    
        if(!product){

            return res.status(404).json({message:"Product Id Not Found"})
    
        }
     
        res.status(200).json(product)
        
    } catch (error) {

        res.status(500).json({message:error.message,success:false})
        
    }
 

}

 const addProduct=async(req,res)=>{


    try {

        const categoryData=await Category.findById(req.body.category)
 
        if (!categoryData) {
            return res.status(400).json({message:"Invalid Category"})
        }

        const addedProduct=await Product.create(req.body);

        res.status(200).json(addedProduct)
        
    } catch (error) {
        
        res.status(500).json({message:error.message,success:false})
    }

   
}

const updateProduct=async(req,res)=>{

    try {

        const {id}=req.params
        if(!mongoose.isValidObjectId(id)){
         
           return  res.status(400).json({message:"Invalid Id"})
        }

        const categoryData=await Category.findById(req.body.category)
 
        if (!categoryData) {
            return res.status(400).json({message:"Invalid Category"})
        }

        
        const updatedProduct=await Product.findByIdAndUpdate({_id:id},req.body)
    
    
        if(!updatedProduct){

            return res.status(404).json({message:"Product Id Not Found"})
    
        }
     
        res.status(200).json({message:"Product Updated Successfully",success:true})
        
        
    } catch (error) {

        res.status(500).json({message:error.message,success:false})
        
    }
 

}

const deleteProduct=async(req,res)=>{

    try {

        const {id}=req.params


        if(!mongoose.isValidObjectId(id)){
         
           return  res.status(400).json({message:"Invalid Id"})
        }

        const deletedProduct=await Product.findByIdAndDelete({_id:id})
    
    
        if(!deletedProduct){

            return res.status(404).json({message:"Product Id Not Found"})
    
        }
     
        res.status(200).json({message:"Product deleted Successfully",success:true})
        
    } catch (error) {

        res.status(500).json({message:error.message,success:false})
        
    }

}



const GetCount=async(req,res)=>{


    try {
        const productCount=await Product.countDocuments()

        res.status(200).json({productCount:productCount})
        
    } catch (error) {
        
        res.status(500).json({message:error.message,success:false})
    }
    
 }


 const featuredProducts=async(req,res)=>{


    try {


        
        const products=await Product.find({isFeatured:true}).limit(3)

        res.status(200).json(products)
        
    } catch (error) {
        
        res.status(500).json({message:error.message,success:false})
    }
    
 }
module.exports={getAllProducts,addProduct,deleteProduct,updateProduct,getParticularProduct,GetCount,featuredProducts}