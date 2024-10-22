import { NextResponse } from "next/server";
import {isAdmin} from "../../api/auth/[...nextauth]/route";
import {MenuItem} from "../../models/MenuItem";
import mongoose from "mongoose";
import { Order } from "../../models/Order";
import { getServerSession } from "next-auth";
// import authOptions from "../../../libs/authOptions";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import clientPromise from "../../../libs/mongoConnect";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { User } from "../../models/User";
const stripe = require('stripe')(process.env.STRIPE_SK);
const authOptions = {
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
  };
export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    // console.log('this is menutem')
    const {address, cartProducts} = await req.json();
    const session = await getServerSession(authOptions)
    const userEmail = session?.user?.email
    console.log('this userEmail', userEmail)
    console.log('this address', address)
    console.log('this cartProducts', cartProducts)

    const orderDoc = await Order.create({
        userEmail,
        ...address,
        cartProducts,
        paid:false
    })
    console.log('this orderDoc', orderDoc)
    const stripeLineItems = []
    for(const cartProduct of cartProducts){
        const productName = cartProduct.name
        const productInfo = await MenuItem.findById(cartProduct._id)
        // console.log("productInfo", productInfo)
        let productPrice = Number(productInfo.basePrice)
        // console.log("productPrice", productPrice)

        // Caculator of price each product
        if ( cartProduct.size){
            const size = productInfo.sizes.find(size => size._id.toString() === cartProduct.size._id.toString() )
            productPrice += size.price
        }
        console.log("productPrice size", productPrice)
        if ( cartProduct.extras?.length > 0){
            for(const cartProductExtraThing of cartProduct.extras){
                const extraThingInfo = productInfo.extraIngredientPrice.find( extra=> extra._id.toString() === cartProductExtraThing._id.toString() )
                productPrice += extraThingInfo.price
            }
        }
        stripeLineItems.push({
            quantity: 1,
            price_data: {
                currency: 'USD',
                product_data: {
                    name: productName
                },
                unit_amount: productPrice * 100
            }
        })
    }
    // console.log({stripeLineItems})
    const stripeSession = await stripe.checkout.sessions.create({
        line_items: stripeLineItems,
        mode: 'payment', // Chế độ: 'payment' cho thanh toán một lần, 'subscription' cho đăng ký
        customer_email: userEmail,
        success_url: process.env.NEXTAUTH_URL + 'orders/' + orderDoc._id.toString(), // URL sau khi thanh toán thành công
        cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1', // URL sau khi thanh toán bị hủy
        metadata: { orderId: orderDoc._id.toString() },
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: 'Delivery fee',
                    type: 'fixed_amount',
                    fixed_amount: { amount: 500, currency: 'USD'}
                }
            }
        ]
    })


    // console.log('checkout data',data)
    // // if (await isAdmin()) {
    // const MenuItemData = await MenuItem.create(data);
    return Response.json(stripeSession.url);
    // return Response.json(true)
}