'use client';
import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { CartContext } from '../AppContext';
const Header = () => {
  const {cartProducts} =  useContext(CartContext)
  const session = useSession()
  const status = session?.status
  // console.log('session is ',session)
  const userData = session.data?.user 
  const userName = userData?.name || userData?.email
 
  useEffect( () =>{
    console.log('cartProduct data is',cartProducts)
  })

  return (
    <>
        <header className="fixed top-0 left-0 w-full bg-white shadow-sm p-2 flex items-center justify-between mb-10">
            <Link className="text-primary font-semibold" href={'/'}>Food Order</Link>
            <nav className="flex gap-4 items-center">
            <Link href={'/'}>Home</Link>
            <Link href={'/menu'}>Menu</Link>
            <Link href={'/'}>About</Link>
            <Link href={'/'}>Contact</Link>
            
            </nav>
            <nav className='flex items-center gap-4 text-gray-50'>
              {status === 'authenticated' && (
                <>
                  <Link href={'/profile'} className="text-black block text-nowrap"> Hi {userName}</Link>
                  <button onClick={()=>signOut()} className="bg-primary rounded-sm text-white px-4 py-2">Logout</button>
                </>
                

              )}
              {status !== 'authenticated' && (
                <div className='flex items-center gap-4 text-gray-50'>
                  <Link href={'/login'} className="bg-primary rounded-sm text-white px-4 py-2">Login</Link>
                  <Link href={'/register'} className="bg-primary rounded-sm text-white px-4 py-2">Register</Link>
                </div>
                
              )}
              {cartProducts?.length >0 && (
                <Link href={'/cart'}> Cart ({cartProducts.length})</Link>
              )}
              {/* <Link href={'/login'} className="bg-primary rounded-sm text-white px-4 py-2">Login</Link>
              <Link href={'/register'} className="bg-primary rounded-sm text-white px-4 py-2">Register</Link> */}
            </nav>
        </header>
    </>
  )
}

export default Header