'use client';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { CartContext } from '../AppContext';
import { CiShoppingCart } from "react-icons/ci";
import { CiMenuBurger } from "react-icons/ci";
import { IoClose } from "react-icons/io5"; // Icon X
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { cartProducts } = useContext(CartContext);
  const session = useSession();
  const path = usePathname();
  const status = session?.status;
  const userData = session.data?.user;
  const userName = userData?.name || userData?.email;

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Quản lý trạng thái mở/đóng menu

  useEffect(() => {
    console.log('cartProduct data is', cartProducts);
  }, [cartProducts]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Đổi trạng thái menu
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-sm p-2 flex items-center justify-center z-20">
        <div className='flex xl:hidden justify-between items-center w-full p-4 xl:p-0'>
          <Link className="text-primary font-semibold" href={'/'}>
            <Image src={'/logo.jpg'} width={50} height={100} alt='Logo' />
          </Link>
          <div className='flex justify-between items-center gap-6'>
            {cartProducts?.length > 0 && (
              <Link href={'/cart'} className='text-nowrap relative'>
                <CiShoppingCart className='text-3xl' />
                <span className='absolute top-[-5px] right-[-16px] bg-primary w-[22px] h-[22px] rounded-full flex text-white justify-center items-center'>
                  {cartProducts.length}
                </span>
              </Link>
            )}
            {cartProducts?.length == 0 && (
               <Link href={'/cart'} className='text-nowrap relative'>
               <CiShoppingCart className='text-3xl' />
               <span className='absolute top-[-5px] right-[-16px] bg-primary w-[22px] h-[22px] rounded-full flex text-white justify-center items-center'>
                 0
               </span>
             </Link>
            )}
            <CiMenuBurger className='text-2xl cursor-pointer' onClick={toggleMenu} />
          </div>
        </div>

        {/* Menu trượt từ bên phải */}
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black opacity-50 z-10" onClick={closeMenu}></div>

            {/* Menu */}
            <div className={`fixed top-0 right-0 h-full w-[300px] bg-white shadow-lg p-4 transform transition-transform duration-500 ease-in-out z-20 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              <IoClose className="text-3xl cursor-pointer mb-4" onClick={closeMenu} /> {/* Nút X */}
              <nav className="flex flex-col gap-4">
                <Link href={'/'} onClick={closeMenu}>Home</Link>
                <Link href={'/menu'} onClick={closeMenu}>Menu</Link>
                <Link href={'/about'} onClick={closeMenu}>About</Link>
                <Link href={'/contact'} onClick={closeMenu}>Contact</Link>
                {status === 'authenticated' && (
                  <>
                    <Link href={'/profile'} onClick={closeMenu} className="text-black block text-nowrap">
                      Hi {userName}
                    </Link>
                    <button onClick={() => { signOut(); closeMenu(); }} className="bg-primary rounded-sm text-white px-4 py-2">
                      Logout
                    </button>
                  </>
                )}
                {status !== 'authenticated' && (
                  <>
                    <Link href={'/login'} onClick={closeMenu} className="bg-primary rounded-sm text-white px-4 py-2">
                      Login
                    </Link>
                    <Link href={'/register'} onClick={closeMenu} className="bg-primary rounded-sm text-white px-4 py-2">
                      Register
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </>
        )}

        <div className='hidden md:flex'>
          <div className='max-w-[1200px] w-[1200px] flex justify-between'>
            <Link className="text-primary font-semibold" href={'/'}>
              <Image src={'/logo.jpg'} width={50} height={100} alt='Logo' />
            </Link>
            <nav className="flex gap-4 items-center menu-items">
              <Link href={'/'} className={path === '/' ? 'active' : ''}>Home</Link>
              <Link href={'/menu'} className={path === '/menu' ? 'active' : ''}>Menu</Link>
              <Link href={'/about'} className={path === '/about' ? 'active' : ''}>About</Link>
              <Link href={'/contact'} className={path === '/contact' ? 'active' : ''}>Contact</Link>
            </nav>
            <nav className='flex items-center gap-4 text-gray-50'>
              {status === 'authenticated' && (
                <>
                  <Link href={'/profile'} className="text-black block text-nowrap">Hi {userName}</Link>
                  <button onClick={() => signOut()} className="bg-primary rounded-sm text-white px-4 py-2">Logout</button>
                </>
              )}
              {status !== 'authenticated' && (
                <div className='flex items-center gap-4 text-gray-50'>
                  <Link href={'/login'} className="bg-primary rounded-sm text-white px-4 py-2">Login</Link>
                  <Link href={'/register'} className="bg-primary rounded-sm text-white px-4 py-2">Register</Link>
                </div>
              )}
              {cartProducts?.length > 0 && (
                <Link href={'/cart'} className='text-nowrap relative'>
                  <CiShoppingCart className='text-3xl' />
                  <span className='absolute top-[-5px] right-[-16px] bg-primary w-[22px] h-[22px] rounded-full flex text-white justify-center items-center'>
                    {cartProducts.length}
                  </span>
                </Link>
              )}
              {cartProducts?.length == 0 && (
                <Link href={'/cart'} className='text-nowrap relative'>
                  <CiShoppingCart className='text-3xl' />
                  <span className='absolute top-[-5px] right-[-16px] bg-primary w-[22px] h-[22px] rounded-full flex text-white justify-center items-center'>
                    0
                  </span>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;
