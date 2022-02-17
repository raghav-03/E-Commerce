const Product=require("../models/product");
const Fetures = require("../utlis/features");

exports.getallproduct=async (req,res)=>{
    try{
        const productsCount = await Product.countDocuments();
        const perpageitem=4;
        const product=new Fetures(Product.find(),req.query).search().filter();
        let products=await product.query;
        let filteredproductcount=products.length
        product.pagination(perpageitem)
        products=await product.query.clone();
        res.status(200).json({
            success: true,
            products,
            perpageitem,
            productsCount,
            filteredproductcount
        });
    }catch(e){
        console.log(e);
        res.status(400).json({
            success:false,
            message:e.message
        });
    }
}

exports.getoneproduct=async (req,res)=>{
    try{
        let product=await Product.findById(req.params.id);
        if(!product){
            res.status(401).json(`Product Does Not Exists!!`);
        }
        res.status(200).json({
            success: true,
            product,
        });
    }catch(e){
        res.status(400).json({
            success:false,
            message:e.message
        });
    }
}


exports.getreviews=async (req,res)=>{
    try{
        let product=await Product.findById(req.params.id);
        if(!product){
            res.status(401).json(`Product Does Not Exists!!`);
        }
        res.status(200).json({
            success:true,
            reviews:product.reviews
        });
    }catch(e){
        res.status(401).json(`Error ${e}`)
    }
}
