const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
       
        required:[true,"Please enter a title"],
        maxlength:[100,"Title cannot exceed 100 characters"],
        minlength:[3,"Title should have more than 3 characters"],
        trim:true

    },
    description:{
        type:String,
        required:[true,"Please enter a description"],
        maxlength:[200,"Description cannot exceed 200 characters"]
    },
    done:{
        type:Boolean,
        default:false
    },
},{timestamps:true}

);
module.exports=mongoose.model("Todo",todoSchema);