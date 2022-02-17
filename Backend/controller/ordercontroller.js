    const { Error } = require('mongoose');
    const User=require('../models/user');
    const jwt=require('jsonwebtoken');
    const bcryptjs = require('bcryptjs');
    const nodemailer=require('../utlis/nodemailer');
    const Product=require("../models/product");
    const Fetures = require("../utlis/features");
    const Order=require('../models/order');

    module.exports.addorder=async (req,res)=>{
        try{
            const {shippinginfo,ordereditem} = req.body;
            let totalprice=0;
            ordereditem.forEach(element => {
                let temp=Number(element.price)*Number(element.quantity);
                totalprice+=temp;
            });
            let orderdetail={
                totalprice:totalprice
            }
            let neworder=await Order.create({
                shippinginfo:shippinginfo,
                ordereditems:ordereditem,
                user:req.User.id,
                orderdetail:orderdetail
            })
            res.status(200).json({
                success:true,
                order:neworder
            })
        }catch(e){
            res.status(401).json({
                success:false,
                message:e.message
            })
        }
    }

    module.exports.seeoneorder=async (req,res)=>{
        try{
            let neworder=await Order.findById(req.params.id).populate(
                "user",
                "name email"
            );
            if(!neworder){
                res.status(401).json(`Order Does Not Exists!!`);
            }
            res.status(200).json({
                success:true,
                order:neworder
            })
        }catch(e){
                res.status(401).json({
                success:false,
                message:e.message
            })
        }
    }


    module.exports.getallorder=async (req,res)=>{
        try{
            let neworder=await Order.find();
            if(!neworder){
                res.status(401).json(`No Order Exists!!`);
            }
            res.status(200).json({
                success:true,
                orders:neworder
            });
        }catch(e){
                res.status(401).json({
                success:false,
                message:e.message
            })
        }
    }


    module.exports.updatestatus=async (req,res)=>{
        try{
            let neworder=await Order.findById(req.params.id);
            if(!neworder){
                return res.status(401).json({
                    success:false,
                    message:`Order Does'nt Exist`
                });
            }
            if(neworder.orderdetail.orderstatus==="Delivered"){
                res.status(401).json(`You cannot change its status as it already Delivered !!`);
            }
            if(req.body.status==="Delivered"){
                neworder.ordereditems.forEach(async (element)=>{
                    let newproduct=await Product.findById(element.product);
                    newproduct.quantity-=Number(element.quantity);
                    await newproduct.save();
                })
            }
            neworder.orderdetail.orderstatus=req.body.status;
            neworder.save();
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

    // see myorder
    module.exports.myorder=async (req,res)=>{
        try{
            console.log(req.User._id);
            const orders = await Order.find({ user: req.User._id });
            res.status(200).json({
            success: true,
            orders,
            });
        }catch(e){
                res.status(401).json({
                success:false,
                message:e.message
            })
        }
    }



    module.exports.deleteorder=async (req,res)=>{
        try{
            await Order.findByIdAndDelete(req.params.id);
            res.status(201).json({
                success:true
            });
        }catch(e){
            res.status(401).json({
                success:false,
                message:e.message
            })
        }
    }


    module.exports.cancelorder=async (req,res)=>{
        try{
            let order=await Order.findById(req.params.id).populate('user','id');
            if(order.user.id===req.User.id)
                res.status(201).json("Order Cancelled Successfully!!");
            else
            res.status(401).json("Order Doesnt Belongs to you!!");
        }catch(e){
                    res.status(401).json({
                success:false,
                message:e.message
            })
        }
    }
