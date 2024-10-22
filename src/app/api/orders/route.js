import { NextResponse } from "next/server";
import {isAdmin} from "../../api/auth/[...nextauth]/route";
import {MenuItem} from "../../models/MenuItem";
import mongoose from "mongoose";
import { authOptions } from "../../../libs/authOptions";
import { UserInfo } from "../../models/UserInfo";
import { getServerSession } from "next-auth";
import { Order } from "../../models/Order";
export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL);
    const session = await getServerSession(authOptions)
    const userEmail = session?.user?.email
    let isAdmin = false
    console.log('useremail', userEmail)
    const url = new URL(req.url)
    const _id = url.searchParams.get('_id')
    if( _id ){
        return Response.json( await Order.findById(_id) )
    }

    if ( userEmail ){
        const userInfo = await UserInfo.findOne({email:userEmail})
        if ( userInfo ){
            isAdmin = userInfo.admin
        }
    }
    // console.log('is admin',isAdmin)
    if (  isAdmin ){
        return Response.json( await Order.find() )
    } 
    if ( userEmail){
        
        return Response.json( await Order.find({userEmail:userEmail}) )
    }
}