'use client'
import { SessionProvider } from 'next-auth/react'
import React, { createContext,useEffect,useState } from 'react'
import toast from 'react-hot-toast';


export const CartContext = createContext()

export function cartProductPrice(cartProduct){
  let price =parseFloat(cartProduct.basePrice);
  if(cartProduct.size){
    price += parseFloat(cartProduct.size.price)
  }
  if(cartProduct.extras?.length >0){
    for (const extra of cartProduct.extras){
      price += parseFloat(extra.price)
    }
  }
  return price
}

const AppProvider = ({children}) => {
  const [cartProducts, setCartProducts] = useState([])

  const ls = typeof window !== 'undefined' ? window.localStorage : null

  function saveCartProductToLocalStorage(){
    if( ls ){
      ls.setItem('cart', JSON.stringify(cartProducts))
    }
  }

  function clearCart(){
    setCartProducts([])
    saveCartProductToLocalStorage([])
  }

  function removecartProduct(indexToRemove){
    setCartProducts(prevCartProduct => {
      const newCartProduct = prevCartProduct.filter( (v,index) => index!==indexToRemove )
      saveCartProductToLocalStorage(newCartProduct)
     
      return newCartProduct
    })
    toast.success('Product Remove')
  }

  useEffect( ()=>{
    if( ls && ls.getItem('cart') ){
      setCartProducts( JSON.parse(ls.getItem('cart')) )
    }
  },[] )

  function addToCart(product, size=null, extras =[]){
    setCartProducts( prevProduct =>{
      const cartProduct = {...product, size,extras}
      const newProduct = [...prevProduct,cartProduct]
      return newProduct
    })
  }
  return (
    <SessionProvider>
      <CartContext.Provider value={ { cartProducts,setCartProducts,addToCart,removecartProduct}}>
          {children}
      </CartContext.Provider>
      
    </SessionProvider>
  )
}

export default AppProvider