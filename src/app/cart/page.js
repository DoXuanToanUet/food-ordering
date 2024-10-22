'use client'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext ,cartProductPrice} from '../../components/AppContext'
import AddressInput from '../../components/layout/AddressInput'
import Image from 'next/image'
import useProfile from '../../components/UseProfile'
import toast from 'react-hot-toast'
import CartProduct from "../../components/menu/CartProduct";
const CartPage = () => {
    const {cartProducts,removecartProduct} = useContext(CartContext)
    const [address, setAddress] = useState({})
    const {data:profileData} = useProfile()
    console.log('this is cartproduct',cartProducts)
    let subtotal = 0
    for( const p of cartProducts){
        // console.log('this is cart p',p)
        subtotal += cartProductPrice(p)
    }
    function handleAddressChange(propName,value){
        setAddress(prevAddress =>({...prevAddress, [propName]:value}))
    }
    async function procedToCheckout(ev){
        // address and shopping cart products
        // redirect to stripe
        ev.preventDefault()
        const savingPromise = new Promise(async (resolve, reject) => {
            
            // console.log(data,'this is data menu item update')
            const response = await fetch('/api/checkout', {
                method: 'POST',
                body: JSON.stringify({address, cartProducts}),
                headers: { "Content-Type": "application/json" }
              })
    
            // setName('');
            // setDescription('');
            // setBasePrice('');
    
            if (response.ok){
                resolve();
                const link = await response.json()
                // console.log('link', link)
                window.location = link
            }   
            else
                reject();
        });
    
        await toast.promise(savingPromise, {
            loading: 'Directing ...',
            success: 'Direct Successs',
            error: 'Error',
        });
          
    }
    
    useEffect( ()=>{
        if(profileData?.city){
            const {phone, streetAddress, postalCode, city, country} = profileData;
            const addressFromProfile={phone, streetAddress, postalCode, city, country}
            setAddress(addressFromProfile)
        }
    },[profileData] )

    if ( cartProducts?.length ===0 ){
        return (
            <section className='text-center'>
                <p className='text-2xl'>Your shopping cart is empty</p>
            </section>
        )
    }
  return (
    <section>
        <div className='text-center text-2xl'> Cart</div>
        <div className='mt-4 grid gap-4 xl:grid-cols-2 grid-cols-1'>
            <div>
                {cartProducts?.length === 0 && (
                    <div>No products in your shopping </div>
                )}
                {cartProducts?.length > 0 && cartProducts.map( (product,index) =>(
                    <CartProduct   key={`${product._id}-${index}`} product={product} removecartProduct={removecartProduct}  cartProductPrice={cartProductPrice}  />
                ))}
                <div className='text-xl p-4 text-right'>Total:  ${subtotal}</div>
            </div>
            <div className='bg-gray-100 p-4 rounded-sm'>
                <h2>Checkout</h2>
                <form>
                    {/* <label>Address</label>
                    <input type="text" placeholder='Address' /> */}
                    <AddressInput addressProps={address} setAddressProp={()=> handleAddressChange()} />
                    <button type='submit' onClick={ (e)=>procedToCheckout(e) }>Pay ${subtotal}</button>
                </form>
            </div>
        </div>
    </section>
  )
}

export default CartPage