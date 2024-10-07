'use client'
import Link from 'next/link'
import React, { useState } from 'react'

const RegisterPage = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [creatingUser,setCreatingUser] = useState(false)
  const [userCreated,setUserCreated] = useState(false)
  const [error,seError] = useState(false)

  async function handleFormSubmit(ev){
    ev.preventDefault();
    setCreatingUser(true)
    seError(false)
    setUserCreated(false)
    const respose =  await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: { "Content-Type": "application/json" }
      })
    console.log(respose)
    if (respose.ok){
      setUserCreated(true)
    }else{
      seError(true)
    }
    setCreatingUser(false); // Reset trạng thái sau khi hoàn thành yêu cầu
  }
  return (
    <section>
        <h1 className='text-center text-primary text-4xl'> Register</h1>
        {userCreated && (
            <div className='my-4 text-center'>
              User Created. Now you can <Link href={'/login'} className='underline'>Login</Link>
            </div>
          )}
          {error && (
            <div className='my-4 text-center'>
              Error. Please try again later
            </div>
          )}
        <form className="block max-w-sm mx-auto" onSubmit={handleFormSubmit}>
            <input type="email" placeholder='email' value={email} onChange={ev => setEmail(ev.target.value)} disabled={creatingUser}/>
            <input type="password" placeholder='password' value={password}  onChange={ev => setPassword(ev.target.value)}  disabled={creatingUser}/>
            <button type='submit'  disabled={creatingUser}> Register</button>
            <div className='my-4 text-center'>or login with provider</div>
            <button>Login with Google</button>
            <div className='text-center mt-5'>
              Existing account ? <Link href={'/login'}>Login</Link>
            </div>
        </form>
    </section>
    
  )
}

export default RegisterPage