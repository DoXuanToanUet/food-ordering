import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Order } from "../../models/Order";
const stripe = new Stripe(process.env.STRIPE_SK);

export async function POST(request) {
  const sig = request.headers.get('stripe-signature'); // sửa lại cách lấy header
  const endpointSecret = process.env.STRIPE_SIGN_SK;

  let event;

  try {
    // Đọc toàn bộ request body để tránh lỗi 'raw body' trong Stripe Webhooks
    const rawBody = await request.text(); 

    // Kiểm tra tính hợp lệ của sự kiện webhook
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (e) {
    console.error("Error during Stripe webhook:", e);
    return NextResponse.json({ error: 'Webhook error: ' + e.message }, { status: 400 });
  }

  // Xử lý sự kiện Stripe tại đây (ví dụ: thanh toán hoàn tất)
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session?.metadata.orderId
    const isPaid = session?.payment_status === 'paid' 
    if(isPaid){
        await Order.updateOne({_id:orderId}, {paid:true})
    }
    console.log('Payment successful for session:', session);
    // Xử lý logic thêm tại đây
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
