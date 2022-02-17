const { Error } = require('mongoose');
const User=require('../models/user');
const jwt=require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const nodemailer=require('../utlis/nodemailer');
const Product=require("../models/product");
const Fetures = require("../utlis/features");
const cloudinary = require("cloudinary");

exports.getalluser=async (req,res)=>{
    try{
        let user=await User.find();
        res.status(200).json({
            success:true,
            users:user
        });
    }catch(e){
        res.status(401).json({
            success:false,
            message:e.message
        });
    }
}

exports.getoneuser=async (req,res)=>{
    try{
        let user=await User.findById(req.params.id);
        res.status(200).json({
            success:true,
            user:user
        });
    }catch(e){
       res.status(401).json({
            success:false,
            message:e.message
        });    
    }
}


exports.updaterole=async (req,res)=>{
    try{
        let user=await User.findById(req.params.id);
        user.role=req.body.role;
        await user.save();
        res.status(200).json({
            success:true,
        });
    }catch(e){
       res.status(401).json({
            success:false,
            message:e.message
        });    
    }
}

exports.deleteuser=async (req,res)=>{
    try{
        let user=await User.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success:true,
        });
    }catch(e){
       res.status(401).json({
            success:false,
            message:e.message
        });    
    }
}


exports.addproduct=async (req,res)=>{
    try{
        let images = [];
        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }
        const imagesLinks = [];
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {folder: "products",});
            imagesLinks.push({
                public_id: result.public_id,
                public_url: result.secure_url,
            });
        }
        req.body.images = imagesLinks;
        req.body.user = req.User.id;
        const product = await Product.create(req.body);
        res.status(200).json({
            success:true,
            product:product
        });
    }catch(e){
        res.status(401).json({
            success:false,
            message:e.message
        })
    }
}

exports.updateproduct=async (req,res)=>{
    try{
        let product=await Product.findById(req.params.id);
        if(!product){
            res.status(401).json(`Product Does Not Exists!!`);
        }
        
  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        public_url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

        let newproduct=await Product.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json({
            success:true,
        });
    }catch(e){
        res.status(401).json({
            success:false,
            message:e.message
        })
    }
}


exports.deleteproduct=async (req,res)=>{
    try{
        let product=await Product.findById(req.params.id);
        if(!product){
            return res.status(401).json({
                success:false,
                message:`Product Does Not Exists!!`
            });
        }
        // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }
        product.remove();
        res.status(200).json({
            success:true,
        });
    }catch(e){
        res.status(401).json({
            success:false,
            message:e.message
        })
    }
}


exports.deletereviews=async (req,res)=>{
    try{
        let productid=req.query.productid;
        let reviewid=req.query.reviewid;
        let product=await Product.findById(productid);
        if(!product){
            return res.status(401).json(`Product Does Not Exists!!`);
        }
        const newproductarray = product.reviews.filter(
            (rev) => rev.id.toString() !== reviewid.toString()
        );
        product.reviews=newproductarray;
        let avg=0;
        product.reviews.forEach(element=>{
            avg+=element.rating;
        })
        product.noofreviews=Number(product.noofreviews)-1;
        if(avg!==0){
            avg=avg/product.noofreviews;
        }
        product.ratings=avg;
        await product.save();
        res.status(200).json({
            success:true
        });
    }catch(e){
       res.status(401).json({
            success:false,
            message:e.message
        });    
    }
}

// Get All Product (Admin)
exports.getAdminProducts = async (req, res, ) => {
    try{
        const products = await Product.find();
        res.status(200).json({
          success: true,
          products,
        });
    }
    catch(e){
        res.status(401).json({
            success:false,
            message:e.message
        });   
    }
}
  