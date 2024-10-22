'use client'
import React, { useState, useEffect, useContext } from 'react'
import { CartContext } from '../../../components/AppContext'
import { useParams } from 'next/navigation'
import AddressInput from '../../../components/layout/AddressInput'
import CartProduct from '../../../components/menu/CartProduct'

const ShowOrderPage = () => {
    const { clearCart } = useContext(CartContext)
    const { id } = useParams()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.href.includes('clear-cart=1')) {
            clearCart()
        }
    }, [clearCart])

    useEffect(() => {
        if (id) {
            fetch(`/api/orders?_id=${id}`)
            .then(res => res.json())
            .then(orderData => {
                setOrder(orderData)
                setLoading(false)
                
            })
            .catch(err => {
                setError('Failed to fetch order data')
                setLoading(false)
            })
            
        }
        
    }, [id])
    console.log("this is order", order)
    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <section className='max-w-2xl mx-auto '>
            <div className='text-center'>
                <h2 className='text-3xl font-bold'>Order</h2>
                <div className='my-4'>
                    <p className='text-2xl'>Thanks for your order</p>
                </div>
            </div>
          
            {order && (
                <div className='grid grid-cols-2'>
                    <div>
                        <div>Order details</div>
                        {order.cartProducts.map( product =>{
                            return <CartProduct product={product}/>
                        })}
                    </div>
                    
                    <div>
                        <div className='bg-gray-100 p-4 rounded-lg'>
                            {/* Render order details here */}
                            <AddressInput disabled={true} addressProps={...order} />
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default ShowOrderPage
