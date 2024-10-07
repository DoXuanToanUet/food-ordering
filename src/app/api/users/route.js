import { NextResponse } from "next/server";
import {isAdmin} from "../../api/auth/[...nextauth]/route";
import {User} from "../../models/User";
import mongoose from "mongoose";


export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
  
    return NextResponse.json(
        await User.find()
      );
}