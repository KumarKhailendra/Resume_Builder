'use client';
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { login, refreshToken } from '@/redux/actions/authAction';


const Login = () => {
    const router = useRouter();
    const initialState = { email: '', password: '' }
    const [userData, setUserData] = useState(initialState)
    const { email, password } = userData

    const { auth } = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(refreshToken())
    },[dispatch])

    useEffect(() => {
      if(auth.token) {router.push('/');}
  }, [auth.token, router])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({...userData, [name]:value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(login(userData))
    }
  return (
    <div className='r-body'>

      <div className="login-box">
        <Image src={"/images/profile2.PNG"} height={100} width={100} priority className="avatar" alt="profile2" />
        <h1 className='h1'>Login Here</h1>
        <form onSubmit={handleSubmit}>
          <p className='p'>Email</p>
          <input type="email" name="email" placeholder="Enter email" onChange={handleChangeInput} value={email} />
          <p className='p'>Password</p>
          <input type="password" name="password" onChange={handleChangeInput} value={password} placeholder="Enter Password" />
          <input type="submit" name="submit" value="Login" />
          <Link className='a' href={"/forget"}>Forget Password</Link><br /><br />
          <Link className='a' href={"/register"}>Create New Account</Link>
        </form>
      </div>
    </div>
  )
}

export default Login
