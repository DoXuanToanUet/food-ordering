import mongoose from "mongoose"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "../app/models/User"
import { UserInfo } from "../app/models/UserInfo"
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./mongoConnect"
import { getServerSession } from "next-auth"

export const authOptions = {
    secret: process.env.SECRET,
    adapter: MongoDBAdapter(clientPromise),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      CredentialsProvider({
        name: 'Credentials',
        id: 'credentials',
        credentials: {
          username: { label: "Email", type: "email", placeholder: "test@example.com" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          const email = credentials?.email;
          const password = credentials?.password;
  
          mongoose.connect(process.env.MONGO_URL);
          const user = await User.findOne({email});
          const passwordOk = user && bcrypt.compareSync(password, user.password);
  
          if (passwordOk) {
            return user;
          }
  
          return null
        }
      })
    ],
}

// export default NextAuth(authOptions)
