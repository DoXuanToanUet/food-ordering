import { NextResponse } from "next/server";
import {isAdmin} from "../../api/auth/[...nextauth]/route";
import {Category} from "../../models/Category";
import mongoose from "mongoose";


export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const {name} = await req.json();
    // if (await isAdmin()) {
      const categoryDoc = await Category.create({name});
      return Response.json(categoryDoc);
}
    //  else {
    //   return Response.json({});
    // }
//   }

export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
  
      return NextResponse.json(
        await Category.find()
      );
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const {_id,name} = await req.json()
  await Category.updateOne({_id},{name})
    return NextResponse.json(
      true
    );
}

// export async function DELETE(req) {
//   mongoose.connect(process.env.MONGO_URL);
//   const id = await req.nextUrl.searchParams.get('_id')
//   const blog = await Category.findById(id)
//   await Category.findByIdAndDelete(id)
//     return NextResponse.json(
//       { msg:'Categories Deleted'}
//     );
// }

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

    // Kiểm tra xem category có tồn tại không
    const category = await Category.findById(id);
    
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // Xóa category
    await Category.findByIdAndDelete(id);

    return NextResponse.json({ msg: 'Category Deleted' }, { status: 200 });

  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}