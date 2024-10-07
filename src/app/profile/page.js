'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import InfoBox from "../../components/layout/InfoBox"
import SuccessBox from "../../components/layout/SuccessBox"
import UserTabs from "../../components/layout/UserTabs"
import toast from 'react-hot-toast'
import UserForm from "../../components/layout/UserForm"
import Link from 'next/link'

const ProfilePage = () => {
    const session = useSession()
    const status = session?.status
    // const user = session?.data?.user
    const email = session?.data?.user.email
    console.log(email,'this is email profile')
    // const [userName, setUserName] = useState('')
    // const [phone, setPhone] = useState(user?.phone || '');
    // const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    // const [postalCode, setPostalCode] = useState(user?.postalCode || '');
    // const [city, setCity] = useState(user?.city || '');
    // const [country, setCountry] = useState(user?.country || '');
    const [userData, setUserData] = useState('');
    const [isAdmin, setIsAdmin] = useState(false)
    const [saved, setSaved ] = useState(false)
    const [isSaving, setIsSaving ] = useState(false)

     async function fetchUser(){
        await fetch('/api/profile').then(response =>{
            response.json().then(items =>{
                // const item = items.find( i => i.email === email)k
                setUserData(items)
                console.log(items , 'this item')
            })
        })
    }
    
    async function handleProfileInfoUpdate(ev,data){
        ev.preventDefault();
        setSaved(false)
        setIsSaving(true)
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
            loading: 'Saving...',
            success: 'Profile saved!',
            error: 'Error',
          });
      
    }

    useEffect( ()=>{
        if(status === 'authenticated'){
            // setUserName(session.data.user.name)
            fetch('/api/profile').then(response =>{
                response.json().then(data=>{
                    console.log(data,'data get api')
                    // setPhone(data.phone)
                    // setStreetAddress(data.streetAddress)
                    // setCity(data.city)
                    // setPostalCode(data.postalCode)
                    // setCountry(data.country)
                    setIsAdmin(data.admin)
                    
                })
            })
            fetchUser()
            console.log(userData, 'this is user data profile')
            
        }
    },[session,status]) 

    if( status === 'loading' ){
        return 'Loading...'
    }

    if( status === 'unauthenticated' ){
        return  redirect('/login')
    }
    // console.log({status},'profile')
    const userImage = session.data.user.image
    const userEmail = session.data.user.email

  return (
    <section>
        <div className='m-6'>
            {/* <UserTabs isAdmin={isAdmin}></UserTabs> */}
            <UserTabs isAdmin={true}></UserTabs>
        </div>
        
        <h1 className='text-center text-primary text-4xl'> Profile</h1>
        <UserForm user={userData} onSubmit={handleProfileInfoUpdate} />
        <div className='max-w-xs mx-auto my-5'>
            {/* {saved && (
               <SuccessBox>Profile Saved</SuccessBox>
            )}
            {isSaving && (
                <InfoBox>Saving...</InfoBox>
            )} */}
        </div>
       
    </section>
  )
}

export default ProfilePage