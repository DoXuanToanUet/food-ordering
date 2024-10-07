'use client'
import React, { useContext, useState } from 'react'
import { CartContext ,cartProductPrice} from '../../components/AppContext'
import AddressInput from '../../components/layout/AddressInput'
import Image from 'next/image'

const CartPage = () => {
    const {cartProducts,removecartProduct} = useContext(CartContext)
    const [address, setAddress] = useState()
    console.log('this is cartproduct',cartProducts)
    let total = 0
    for( const p of cartProducts){
        // console.log('this is cart p',p)
        total += cartProductPrice(p)
    }
  return (
    <section>
        <div className='text-center text-2xl'> Cart</div>
        <div className='mt-4 grid gap-4 grid-cols-2'>
            <div>
                {cartProducts?.length === 0 && (
                    <div>No products in your shopping </div>
                )}
                {cartProducts?.length > 0 && cartProducts.map( (product,index) =>(
                    <div className='flex items-center gap-4 border-b py-2' key={index}>
                        <div>
                            <Image src={'/pizza.png'} width={100} height={100}/>
                        </div>
                        <div>
                            <h3 className='text-xl mb-2'>{product.name}  <span className='font-semibold'>${product.basePrice}</span> </h3>
                            {
                                product.size && (
                                    <div className='text-sm text-gray-500'> <b>Size: </b> <span>{product.size.name} ${product.size.price}</span></div>
                                )
                            }
                            {
                                product.extras?.length > 0 &&(
                                    <div className='text-sm text-gray-500'>
                                        <b >Extras</b>{
                                            product.extras.map( (extra,index) =>(
                                                <div key={index}>- {extra.name} ${extra.price}</div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                        {/* This is logic cart price */}
                        <div className='text-xl'>
                            ${cartProductPrice(product)}
                        </div>
                        <div>
                            <button className='text-sm' onClick={()=>removecartProduct(index)}>Remove</button>
                        </div>
                    </div>
                ))}
                <div className='text-xl p-4 text-right'>Total:  ${total}</div>
            </div>
            <div className='bg-gray-100 p-4 rounded-sm'>
                <h2>Checkout</h2>
                <form>
                    {/* <label>Address</label>
                    <input type="text" placeholder='Address' /> */}
                    {/* <AddressInput addressProps={address} setAddressProp={''} /> */}
                    <button type='submit'>Pay ${total}</button>
                </form>
            </div>
        </div>
    </section>
  )
}

export default CartPage