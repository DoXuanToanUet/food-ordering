'use client'
import React, { useState } from 'react'
import UserTabs from "../../components/layout/UserTabs"
import useProfile from "../../components/UseProfile"
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useEffect } from 'react'

const MenuItemsPage = () => {
    const { loading: profileLoading, data: profileData } = useProfile()
    // const [name, setName] = useState('')
    // const [description, setDescription] = useState('')
    const [menuItem, setmenuItem] = useState([])
    function fetchMenuItem(){
        fetch('/api/menuitems').then(response =>{
            response.json().then(menuitem=>{
                console.log(menuitem,'menu item ...')
                setmenuItem(menuitem)
            })
        })
    }

    useEffect( ()=>{
        fetchMenuItem()
    },[])

    // const [errors, setErrors] = useState({
    //     name: '',
    //     description: '',
    //     basePrice: ''
    // });

    // const validateForm = () => {
    //     const newErrors = { name: '', description: '', basePrice: '' };
    //     let isValid = true;

    //     if (name.trim() === '') {
    //         newErrors.name = 'Item name is required';
    //         isValid = false;
    //     }

    //     if (description.trim() === '') {
    //         newErrors.description = 'Description is required';
    //         isValid = false;
    //     }

    //     if (basePrice.trim() === '' || isNaN(basePrice)) {
    //         newErrors.basePrice = 'Base Price must be a valid number';
    //         isValid = false;
    //     }

    //     setErrors(newErrors);
    //     return isValid;
    // }

    // async function handleFormSubmit(ev) {
    //     ev.preventDefault();

    //     if (!validateForm()) {
    //         return; // Dừng gửi form nếu có lỗi
    //     }

    //     const savingPromise = new Promise(async (resolve, reject) => {
    //         const data = { name, description, basePrice };
    //         const response = await fetch('/api/menuitems', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(data),
    //         });

    //         setName('');
    //         setDescription('');
    //         setBasePrice('');

    //         if (response.ok)
    //             resolve();
    //         else
    //             reject();
    //     });

    //     await toast.promise(savingPromise, {
    //         loading: 'Creating your new menu...',
    //         success: 'Menu Item saved!',
    //         error: 'Error',
    //     });
    // }

    if (profileLoading) {
        return 'Loading user info...';
    }
    if (!profileData.admin) {
        return 'Not an admin';
    }

    return (
        <section className="m-4">
            <UserTabs isAdmin={true} />
            <div className='block max-w-sm mx-auto py-6'>
                <Link href={'/menu-items/new'} className='border text-center p-2  w-full block rounded-lg text-xl hover:text-primary'>Create new menu item </Link>
                {/* <form onSubmit={handleFormSubmit}>
                    <div className='mb-4'>
                        <input
                            type="text"
                            placeholder='Item name'
                            value={name}
                            onChange={ev => setName(ev.target.value)}
                            className={`border p-2 w-full ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.name && <span className="text-red-500">{errors.name}</span>}
                    </div>

                    <div className='mb-4'>
                        <input
                            type="text"
                            placeholder='Description'
                            value={description}
                            onChange={ev => setDescription(ev.target.value)}
                            className={`border p-2 w-full ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.description && <span className="text-red-500">{errors.description}</span>}
                    </div>

                    <div className='mb-4'>
                        <input
                            type="text"
                            placeholder='Base Price'
                            value={basePrice}
                            onChange={ev => setBasePrice(ev.target.value)}
                            className={`border p-2 w-full ${errors.basePrice ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.basePrice && <span className="text-red-500">{errors.basePrice}</span>}
                    </div>

                    <div>
                        <button type="submit" className='bg-blue-500 text-white p-2 rounded'>
                            Create
                        </button>
                    </div>
                </form> */}
                <div className='grid grid-cols-3 gap-2 my-4'>
                    {
                        menuItem.length >0 &&  menuItem.map( item =>(
                            <Link href={'/menu-items/edit/'+item._id} key={item._id}>
                                <div className='border p-4 h-full' >{item.name}</div>
                            </Link>
                            
                        ))
                    }
                </div>
            </div>
        </section>
    );
}

export default MenuItemsPage;
