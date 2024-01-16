const mongoose=require('mongoose');
const {Schema}=mongoose;
const usersSchema=new Schema({
    name:{
        type:String,
        required:true, 
    },
    location:{
        type:String,
        required:true, 
    },
    email:{
        type:String,
        required:true, 
    },
    password:{
        type:String,
        required:true, 
    },
    age:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model('theusers',usersSchema);