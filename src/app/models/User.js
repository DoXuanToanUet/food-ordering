import { model, models, Schema } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
    name:{ type:String },
    email:{type:String, require:true, unique: true},
    password:{
        type:String, 
        require:true, 
    },
    
    
},{timestamps:true})



export const User = models?.User || model('User', UserSchema)