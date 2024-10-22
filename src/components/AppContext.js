'use client'
import { SessionProvider } from 'next-auth/react'
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export const CartContext = createContext();

export function cartProductPrice(cartProduct) {
  let price = parseFloat(cartProduct.basePrice);
  if (cartProduct.size) {
    price += parseFloat(cartProduct.size.price);
  }
  if (cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras) {
      price += parseFloat(extra.price);
    }
  }
  return price;
}

const AppProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  function saveCartProductToLocalStorage() {
    if (ls) {
      if (cartProducts.length > 0) {
        ls.setItem('cart', JSON.stringify(cartProducts));
      } else {
        ls.removeItem('cart'); // Xóa giỏ hàng khỏi localStorage khi giỏ hàng trống
      }
    }
  }

  function clearCart() {
    setCartProducts([]);
    saveCartProductToLocalStorage();
  }

  function removecartProduct(indexToRemove) {
    setCartProducts(prevCartProduct => {
      const newCartProduct = prevCartProduct.filter((v, index) => index !== indexToRemove);
  
      // Nếu giỏ hàng trống sau khi xóa
      if (newCartProduct.length === 0) {
        localStorage.removeItem('cart'); // Xóa giỏ hàng khỏi localStorage
      } else {
        localStorage.setItem('cart', JSON.stringify(newCartProduct)); // Cập nhật localStorage nếu vẫn còn sản phẩm
      }
  
      return newCartProduct;
    });
  
    toast.success('Product removed');
  }
  

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  }, []);

  useEffect(() => {
    if (cartProducts.length > 0) {
      saveCartProductToLocalStorage();
    }
  }, [cartProducts]);

  function addToCart(product, size = null, extras = []) {
    setCartProducts(prevProducts => {
      const cartProduct = { ...product, size, extras };
      const newProduct = [...prevProducts, cartProduct];
      return newProduct;
    });
  }

  return (
    <SessionProvider>
      <CartContext.Provider value={{ cartProducts, setCartProducts, addToCart, removecartProduct, clearCart }}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
};

export default AppProvider;
