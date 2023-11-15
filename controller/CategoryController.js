const Category=require("../model/category")


const getAllCategories=async(req,res)=>{

    try {
        const categoryList=await Category.find();

        res.status(200).json(categoryList);
        
    } catch (error) {

        res.status(500).json({message:error.message,success:false})   
    }



}

const UpdateCategory=async(req,res)=>{

    try {

        const {id}=req.params;

        const category= await Category.findByIdAndUpdate({_id:id},req.body)


        if(!category){
            return res.status(404).json({
                success:false,
                message:"The Category Id Not Found"
            })
        }

        res.status(200).json({success:true,message:"updated Sucessfully"})
        
    } catch (error) {
      
        res.status(500).json({message:error.message,success:false})
         
    }

}

const GetParticularCategory=async(req,res)=>{

    try {

        const {id}=req.params

        const category=await Category.find({_id:id})

        if(!category){
           return res.status(404).json({success:false,message:"Category Not Found With Given Id"})
        }

     res.status(200).json(category)
      
    } 
    catch (error) {

        res.status(500).json({message:error.message,success:false})  
        
    }
}

const AddCategories=async(req,res)=>{

  try {

    const addCategory=await Category.create(req.body)

    res.status(201).json(addCategory)
    
  } catch (error) {
    res.status(500).json({message:error.message,success:false})   
  }


    
}

const deleteCategorie=async(req,res)=>{

    try {
        const {id}=req.params;

        const deletedProduct=await Category.findByIdAndDelete({_id:id})
    
        if(deletedProduct){
    
            res.status(200).json({success:true,message:"the category deleted succesfully"})
        }
        else{
            res.status(404).json({success:false,message:"the category id not found"})
        }
        
    } catch (error) {

        res.status(500).json({success:false,message:error.message})
        
    }

  
    
}

module.exports={getAllCategories,AddCategories,deleteCategorie,GetParticularCategory,UpdateCategory}