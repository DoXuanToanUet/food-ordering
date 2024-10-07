import { NextResponse } from "next/server";
import {isAdmin} from "../../api/auth/[...nextauth]/route";
import {MenuItem} from "../../models/MenuItem";
import mongoose from "mongoose";


export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    // console.log('this is menutem')
    const data = await req.json();
    console.log(data,'this is data menuitem')
    // // if (await isAdmin()) {
      const MenuItemData = await MenuItem.create(data);
      return Response.json(MenuItemData);
    // return Response.json(true)
}
    //  else {
    //   return Response.json({});
    // }
//   }

export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
  
      return NextResponse.json(
        await MenuItem.find()
      );
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const {_id,...data} = await req.json()
//   const dataReq = await req.json()
//   console.log(dataReq,'this is data update menu item')
  await MenuItem.findByIdAndUpdate(_id,data)
    return Response.json(
      true
    );
}

export async function DELETE(req) {
  try {
    // Kết nối đến MongoDB
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGO_URL);
    }

    // Lấy _id từ query string
    const url = new URL(req.url)
    const id = url.searchParams.get('_id');
    console.log({id})
    if (!id) {
      return NextResponse.json({ error: 'ID not provided' }, { status: 400 });
    }

    // Kiểm tra xem menuItem có tồn tại không
    const menuItem = await MenuItem.findById(id);
    
    if (!menuItem) {
      return NextResponse.json({ error: 'menuItem not found' }, { status: 404 });
    }

    // Xóa menuItem
    await MenuItem.findByIdAndDelete(id);

    return NextResponse.json({ msg: 'menuItem Deleted' }, { status: 200 });

  } catch (error) {
    console.error('Error deleting menuItem:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}