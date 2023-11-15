const router=require("express").Router();
const {getAllProducts,addProduct, updateProduct,deleteProduct,getParticularProduct,GetCount,featuredProducts}=require("../controller/ProductContoller")


router.get("/",getAllProducts)

router.get("/:id",getParticularProduct)


router.get("/get/count",GetCount)

 router.post("/",addProduct)

 router.delete("/:id",deleteProduct)

 router.put("/:id",updateProduct)

 router.get("/get/featured",featuredProducts)

module.exports=router
