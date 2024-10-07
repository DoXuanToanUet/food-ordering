'use client'
import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import {signIn} from "next-auth/react";

const LoginPage = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    async function handleFormSubmit(ev){
        ev.preventDefault();

        await signIn('credentials', {email, password, callbackUrl:'/'});

    }
    return (
        <section>
            <h1 className='text-center text-primary text-4xl'> Login</h1>
            <form className="block max-w-sm mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" name='email' placeholder='email' value={email} onChange={ev => setEmail(ev.target.value)} />
                <input type="password"  name="password" placeholder='password' value={password}  onChange={ev => setPassword(ev.target.value)}  />
                <button type='submit'  > Login</button>
                <div className='my-4 text-center'>or login with provider</div>
                <button type="button" onClick={()=> signIn('google')}>Login with Google</button>
                <div className='text-center mt-5'>
                Existing account ? <Link href={'/login'}>Login</Link>
                </div>
            </form>
        </section>
    )
}

export default LoginPage