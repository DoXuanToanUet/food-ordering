import mongoose from "mongoose"
import { User } from "../../models/User"
import { UserInfo } from "../../models/UserInfo"
import { getServerSession } from "next-auth"
import clientPromise from "../../../libs/mongoConnect"
import { authOptions } from "../auth/[...nextauth]/route"

export async function PUT(req){
    mongoose.connect(process.env.MONGO_URL)
    // const data = await req.json()
    // const session = await getServerSession(authOptions)
    // const email = session.user.email
    // const {name,...otherUserInfo} = data
    // console.log({session, data})
    // // if ('name' in data ){
    //     // update user
    //    await User.updateOne({email}, {name})
    //    await UserInfo.findOneAndUpdate({email}, otherUserInfo,{upsert:true})
    // // }
    // return Response.json(true)
    const data = await req.json()
    const {_id,name,...otherUserInfo} = data
    let filter ={}
    if(_id){
        filter = {_id}
    }else{
         const session = await getServerSession(authOptions)
         const email = session.user.email
         filter = {email}
    }
    await User.updateOne(filter, {name})
    await UserInfo.findOneAndUpdate(filter, otherUserInfo,{upsert:true})

    return Response.json(true)
}

export async function GET(req){
    mongoose.connect(process.env.MONGO_URL)
    // const data = await req.json()
    // const session = await getServerSession(authOptions)
    // const email = session.user.email
    // const user = await User.findOne({email}).lean()
    // const userInfo = await UserInfo.findOne({email}).lean()

     const url= new URL(req.url)
     const _id = url.searchParams.get('_id')   
     let filterUser={}
     if( _id ){
        filterUser = {_id}
     } else{
        const session = await getServerSession(authOptions)
        const email  = session?.user?.email
        filterUser = {email}
     }
   
     const user = await User.findOne(filterUser).lean()
    const userInfo = await UserInfo.findOne({email:user.email}).lean()
   
    return Response.json(
       {...user,...userInfo}
    )
}