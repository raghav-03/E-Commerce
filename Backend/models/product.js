var mongoose=require("mongoose");

const productschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    },
    ratings:{
        type:Number,
        default:0
    },
    noofreviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String
            }
        }
    ],
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            public_url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:true
    }
},{ timestamps: true });

const Products=mongoose.model('Products',productschema);

module.exports=Products;