var mongoose=require("mongoose");

const orderschema=new mongoose.Schema({
    shippinginfo:{
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        phoneNo:{
            type:Number,
            required:true
        },
        pinCode:{
            type:Number,
            required:true
        }
    },
    ordereditems:[
        {
            product:{
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true,
            },
            name:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
        }
    ],
    orderdetail:{
        orderstatus:{
            type:String,
            default:"Processing",
            required:true
        },
        ordered_at:{
            type:Date,
            default:Date.now()
        },
        totalprice:{
            type:Number,
            // required:true
        },
        delivered_at:{
            type:Date
        }
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },

},{ timestamps: true });

const Order=mongoose.model('Order',orderschema);

module.exports=Order;