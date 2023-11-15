const router=require("express").Router()
const {getAllCategories,AddCategories,deleteCategorie,GetParticularCategory,UpdateCategory}=require("../controller/CategoryController")


router.get("/",getAllCategories);

router.get("/:id",GetParticularCategory);

router.put("/:id",UpdateCategory);


router.post("/",AddCategories);


router.delete("/:id",deleteCategorie)

module.exports=router