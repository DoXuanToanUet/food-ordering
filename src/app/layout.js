import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/layout/Header";
import { SessionProvider } from "next-auth/react";
import AppProvider from "../components/AppContext"
import { Toaster } from "react-hot-toast";
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata = {
  title: "Order Delicious Food Online | Fast & Easy Delivery",
  description: "Order your favorite dishes from local restaurants and get them delivered fast. Discover delicious menus and enjoy easy food ordering from the comfort of your home.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className=""
      >
        <main className="max-w-4xl mx-auto  p-4 mt-[2rem]">
          <AppProvider>
            <Toaster></Toaster>
            <Header/>
            {children}
          
          </AppProvider>
           
          
        </main>
      </body>
    </html>
  );
}
