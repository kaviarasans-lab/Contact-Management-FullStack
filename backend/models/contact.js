import mongoose, { Schema } from "mongoose";

const contactSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:String,
    Phone:String,
    Company:String,
    status:{
        type:String,
        enum : ["Interested", "Follow-Up", "Closed"],
        default: "Interested"
    },
    createdAt:{type:Date, default:Date.now()}
})

export default mongoose.model("Contact", contactSchema)
