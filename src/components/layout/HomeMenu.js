'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import MenuItem from '../menu/MenuItem'

const HomeMenu = () => {
    const [bestSeller, setBestSeller] = useState([])
    useEffect(() => {
        const fetchMenuItems = async () => {
            const res = await fetch('/api/menuitems');
            const data = await res.json();
            setBestSeller(data);
            // setBestSeller(data.slice(-3));
            // console.log(data.slice(-3), 'this is data home menu');
        };
    
        fetchMenuItems();
    }, []);
  return (
    <section className='mt-10'>
        <div className='relative'>
            {/* <div className='h-48 absolute w-48 left-0 top-0'>
                <Image src={'/sallad1.png'} layout='fill' objectFit='contain'/>
            </div>
            <div className='h-48 absolute  w-48 right-0 top-0'>
                <Image src={'/sallad2.png'} layout='fill' objectFit='contain'/>
            </div> */}
        </div>
     
        <div className='text-center my-6'>
            <h3 className='uppercase text-gray-500 font-semibold'>Check out</h3>
            <h2 className='text-primary font-bold text-4xl'>Menu</h2>
        </div>

        <div className='grid grid-cols-2 xl:grid-cols-3 gap-4'>
            {bestSeller?.length >0 && bestSeller.map( item =>(
                <MenuItem key={item._id} {...item}/>
            ))}
            {/* <MenuItem/>
            <MenuItem/>
            <MenuItem/>
            <MenuItem/>
            <MenuItem/> */}
          
          
        </div>
    </section>
    
  )
}

export default HomeMenu