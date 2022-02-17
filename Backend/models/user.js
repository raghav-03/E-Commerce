const moongose=require('mongoose');
const validater=require('validator');
var bcrypt = require('bcryptjs');

const userschema=new moongose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Name"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Email"],
        unique:true,
        validate:[validater.isEmail]
    },
    password:{
        type:String,
        minlength:[8,"Password should be minimum of length 8"],
        required:[true,"Please Enter Password"]    
    },
    images:{
        public_id:{
            type:String,
            required:true
        },
        public_url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetpass:{
        type:String,
    },
    resetpasstime:{
        type:Date
    }
},{timestamps:true});

userschema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    } else {
        var hash = await bcrypt.hashSync(this.password, 10);
        this.password=hash;
        next();
    }
}); 
const User=moongose.model('User',userschema);

module.exports=User;