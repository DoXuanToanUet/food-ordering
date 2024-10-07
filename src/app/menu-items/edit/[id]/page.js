'use client'
import React, { useState } from 'react'
import UserTabs from "../../../../components/layout/UserTabs"
import useProfile from "../../../../components/UseProfile"
import MenuItemPriceProps from "../../../../components/layout/MenuItemPriceProps"
import MenuItemForm from "../../../../components/layout/MenuItemForm"
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { redirect } from 'next/navigation'

const EditMenuItemsPage = () => {
    const { loading: profileLoading, data: profileData } = useProfile()
    const [menuItem, setMenuItem] = useState([])
    
    const {id} = useParams()
    const [redirectToItems, setRedirectToItems] = useState(false)
   
    function fetchMenuItem(){
        fetch('/api/menuitems').then(response =>{
            response.json().then(items =>{
                const item = items.find( i => i._id === id)
                setMenuItem(item)
                // console.log(item , 'this item')
            })
        })
    }

    useEffect( ()=>{
        // console.log(id,'this is params')
       
        fetchMenuItem()
        // console.log(menuItem,'this is menuitem')
    },[])

    async function handleDelMenuItem(){
        const savingPromise = new Promise(async (resolve, reject) => {
          
            // console.log(data,'this is data menu item update')
            const response = await fetch('/api/menuitems/?_id='+id, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
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
            loading: 'Deleting menu item...',
            success: 'Menu Item deleted!',
            error: 'Error',
        });
        setRedirectToItems(true)
    }
    async function handleFormSubmit(ev,data) {
        ev.preventDefault();

        // if (!validateForm()) {
        //     return; // Dừng gửi form nếu có lỗi
        // }

        const savingPromise = new Promise(async (resolve, reject) => {
            const dataPut = { ...data,_id:id};
            // console.log(data,'this is data menu item update')
            const response = await fetch('/api/menuitems', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataPut),
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
            success: 'Menu Item updated!',
            error: 'Error',
        });
        // setRedirectToItems(true)
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
                <Link href={'/menu-items/new'} className='border text-center p-2  w-full block rounded-lg text-xl hover:text-primary'>Create new menu item </Link>
                <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit}/>
                <button className='bg-red-600 text-white p-2 rounded' type='button' onClick={handleDelMenuItem}>Delete</button>
                <div className='grid grid-cols-3 gap-2 my-4'>
                    {/* {
                        menuItem.length >0 &&  menuItem.map( item =>(
                            <Link href={'/menu-items/edit/'+item._id}>
                                <div className='border p-4 h-full' key={item._id}>{item.name}</div>
                            </Link>
                            
                        ))
                    } */}
                </div>
            </div>
        </section>
    );
}

export default EditMenuItemsPage;
