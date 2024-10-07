'use client'
import React, { useState } from 'react'
import useProfile from "../../../components/UseProfile"
import UserTabs from "../../../components/layout/UserTabs"
import MenuItemForm from "../../../components/layout/MenuItemForm"
import UserForm from "../../../components/layout/UserForm"
import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'

const EditUser = () => {

    const {id} = useParams()
    //    console.log(id, 'id of edit users')
    const { loading: profileLoading, data: profileData } = useProfile()
    const [userItem, setuserItem] = useState(null)

    async function fetchUser() {
        const response = await fetch('/api/profile?_id='+id);
        const item = await response.json();
        setuserItem(item)
        // if (item._id === id) {
        //     setuserItem(item); // Nếu id khớp, cập nhật userItem
        // } else {
        //     console.error("User not found");
        // }
        
    }
    useEffect( ()=>{
        fetchUser()
        console.log(userItem, 'this is userItem of edit user')
    },[]) 

    async function handleUserInfoUpdate(ev,data){
        ev.preventDefault();
        // setSaved(false)
        // setIsSaving(true)
        // const dataPut = { ...data};
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            });
            if (response.ok)
              resolve()
            else
              reject();
          });
      
          await toast.promise(savingPromise, {
            loading: 'Userinfo Saving...',
            success: 'UserInfo saved!',
            error: 'Error',
          });
      
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
            <div className='block max-w-xs mx-auto py-6'>
                <Link href={'/menu-items/new'} className='border text-center p-2  w-full block rounded-lg text-xl hover:text-primary'>All Users</Link>
                <UserForm user={userItem} onSubmit={handleUserInfoUpdate}/>
                <button className='bg-red-600 text-white p-2 rounded mt-2' type='button' >Delete</button>
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
  )
}

export default EditUser