import { model, models, Schema } from "mongoose";
import bcrypt from "bcrypt";

const OrderSchema = new Schema({
    userEmail:{ type:String },
    phone:{ type:String },
    streetAddress:{ type:String },
    postalCode:{ type:String },
    city:{ type:String },
    country:{ type:String },
    cartProducts: Object,
    paid: { type: Boolean , default: false}
    // :{type:String, require:true, unique: true},
    // password:{
    //     type:String, 
    //     require:true, 
    // },
    
    
},{timestamps:true})



export const Order = models?.Order || model('Order', OrderSchema)