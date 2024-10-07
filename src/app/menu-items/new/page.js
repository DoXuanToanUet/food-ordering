'use client'
import React, { useState } from 'react'
import UserTabs from "../../../components/layout/UserTabs"
import useProfile from "../../../components/UseProfile"
import toast from 'react-hot-toast'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import MenuItemForm from "../../../components/layout/MenuItemForm"

const NewMenuItemsPage = () => {
    const { loading: profileLoading, data: profileData } = useProfile()
    const [menuItem, setMenuItem] = useState([])
    const [redirectToItems, setRedirectToItems] = useState(false)
   
    // const [errors, setErrors] = useState({
    //     name: '',
    //     description: '',
    //     basePrice: ''
    // });

  

    async function handleFormSubmit(ev,newData) {
        ev.preventDefault();
      
        // if (!validateForm()) {
        //     return; // Dừng gửi form nếu có lỗi
        // }

        const savingPromise = new Promise(async (resolve, reject) => {
           
            const response = await fetch('/api/menuitems', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData),
            });

            // setName('');
            // setDescription('');
            // setBasePrice('');

            if (response.ok)
                resolve();
            else
                reject();
        });

        await toast.promise(savingPromise, {
            loading: 'Creating your new menu...',
            success: 'Menu Item saved!',
            error: 'Error',
        });
        setRedirectToItems(true)
    }
    if (redirectToItems) {
        return redirect('/menu-items')
    }
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
            <Link href={'/menu-items/'} className='border text-center p-2  w-full block rounded-lg text-xl hover:text-primary'>Show All Menu Item </Link>
            <MenuItemForm menuItem={null} onSubmit={handleFormSubmit}/>
            </div>
        </section>
    );
}

export default NewMenuItemsPage;
