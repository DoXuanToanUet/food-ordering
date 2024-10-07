import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URL; // Địa chỉ kết nối đến MongoDB, ví dụ từ biến môi trường
const options = {};

let client;
let clientPromise;

if (!process.env.MONGO_URL) {
  throw new Error("Please add your Mongo URI to .env.local");
}

// Tạo kết nối chỉ một lần và sử dụng lại cho các request
if (process.env.NODE_ENV === "development") {
  // Trong môi trường phát triển, lưu kết nối MongoDB vào bộ nhớ tạm (global) để tái sử dụng
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Trong môi trường sản xuất, kết nối mỗi khi ứng dụng chạy
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
