import React from 'react'
import Image from 'next/image'
const CartProduct = ({product,removecartProduct,cartProductPrice,productIndex}) => {
  return (
    <div key={`${product._id}-${productIndex}`}> 
        <div className='flex items-center gap-4 border-b py-2' >
            <div>
                <Image src={'/pizza.png'} width={100} height={100} alt=""/>
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
                                product.extras.map( (extra) =>(
                                    <div key={extra.name}>- {extra.name} ${extra.price}</div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            {/* This is logic cart price */}
            {cartProductPrice && (
                 <div className='text-xl'>
                    ${cartProductPrice(product)}
                </div>
            )}
            {!!removecartProduct && (
                <div>
                    <button className='text-sm' onClick={()=>removecartProduct(productIndex)}>Remove </button>
                </div>
            )}
            
        </div>
    </div>
  )
}

export default CartProduct