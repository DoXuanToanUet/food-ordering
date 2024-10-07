'use client'
import React, { useDeferredValue, useEffect, useState } from 'react'
import UserTabs from "../../components/layout/UserTabs"
import useProfile from "../../components/UseProfile"
import toast from 'react-hot-toast'
import Link from 'next/link'

const UserPage = () => {
  const {loading:profileLoading, data:profileData}= useProfile()
  const [isAdmin, setIsAdmin] = useState(false)
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const users = await response.json();
    // console.log(categories, 'cate is ..');
    setUsers(users);
};

  useEffect( ()=>{
    fetchUsers()
  },[])

  if (profileLoading) {
      return 'Loading user info...';
  }
  if (!profileData.admin) {
      return 'Not an admin';
  }
  return (
    <section>
        <div className='m-6'>
            <UserTabs isAdmin={true}></UserTabs>
        </div>
        
        {/* <h1 className='text-center text-primary text-2xl mb-4'> Users</h1> */}
        {
            users?.length>0 && users.map( user =>(
                <div className='bg-gray-200 flex p-2 mb-2'  key={user._id} >
                      <div 

                        className=' grow p-3 mb-2 rounded-xl text-sm flex gap-3'>
                        <span className=' min-w-[150px]'>{user.name || 'No name'}</span>
                        <span >{user.email || 'No name'}</span>
                    </div>
                    <div className='flex gap-1'>
                        <Link href={'/users/'+user._id}
                        
                        className='have-border bg-green-600  text-white p-3 text-[12px]'>Edit</Link>
                        <button type='button' 
                              onClick={ ()=> {}  }
                            className='have-border bg-red-600 text-white  p-3 text-[12px]'>
                            Delete
                        </button>
                        
                    </div>
                  
                </div>
                
                
            ))
        }
    </section>
  )
}

export default UserPage