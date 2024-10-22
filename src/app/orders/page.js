'use client'
import React from 'react'
import UserTabs from '../../components/layout/UserTabs'
import useProfile from '../../components/UseProfile'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import dbTimeForHuman from '../../components/menu/datetime'
const OrderPage = () => {
    const { loading: profileLoading, data: profileData } = useProfile()
    const [orders, setOrders] = useState([])
    function fetchOrders(){
        fetch('/api/orders').then(response =>{
            response.json().then(order=>{
                console.log('this is order page',order)
                // setOrders(order.reverse())
                setOrders(order)
            })
        })
    }

    useEffect( ()=>{
        fetchOrders()
        console.log("order fetch ",orders)
    },[])

    // useEffect(() => {
    //     console.log("Updated orders: ", orders);  // Log mỗi khi orders thay đổi
    // }, [orders]);  // Theo dõi sự thay đổi của orders
        // if (profileLoading) {
    //     return 'Loading user info...';
    // }
    // if (!profileData.admin) {
    //     return 'Not an admin';
    // }
    return (
    <section className="m-4">
        <UserTabs isAdmin={true} />
        <div className='block max-w-xl mx-auto py-6'>
            {/* <Link href={'/menu-items/new'} className='border text-center p-2  w-full block rounded-lg text-xl hover:text-primary'>Create new menu item </Link> */}
            {/* {JSON.stringify()}/ */}
            {/* {orders.length} */}
            <div className='flex flex-col gap-2 my-4'>
                {
                    orders.length >0 &&  orders.map( order =>(
                        <Link href={'/orders/'+order._id} key={order._id} className='flex border  overflow-hidden justify-between bg-gray-300 rounded-lg'>
                            <div className={`${order.paid ? 'bg-green-500' : 'bg-red-500'} p-2 rounded-md text-white h-full m-2 text-[14px]`}>
                                {order.paid ? 'Paid' : 'Not paid'}
                            </div>
                            <div>
                                <div className=' p-4 h-full' >{order.userEmail??'No email'}</div>
                                <div></div>
                            </div>
                            
                           
                            <div className=' p-4 h-full' >{dbTimeForHuman(order.createdAt)}</div>
                        </Link>
                        
                    ))
                }
            </div>
        </div>
    </section>
    )
}

export default OrderPage