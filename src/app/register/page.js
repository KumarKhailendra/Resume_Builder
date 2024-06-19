'use client';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { register } from '@/redux/actions/authAction';


const Register = () => {
    const router = useRouter();
    const { auth } = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const initialState = { 
        fname: '', lname: '', username: '', email: '', password: '', cf_password: '',securitykey: '', securityans: '', mobile: '', gender: 'male'
    }
    const [userData, setUserData] = useState(initialState)
    const { fname, lname, username, email, password, cf_password, securitykey, securityans, mobile } = userData

    useEffect(() => {
        if(auth.token) {router.push('/');}
    }, [auth.token, router])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({...userData, [name]:value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(register(userData))
    }

  return (
    <div className='r-body'>
      <div className="login-box1">
      <Image src={"/images/profile2.PNG"} height={100} width={100} priority className="avatar" alt="profile2" />

    <h1 className='h1'>Register Here</h1>
    <form onSubmit={handleSubmit}>
        <div className="row1">
            <input type="text" name="fname" placeholder="Enter First Name *" onChange={handleChangeInput} value={fname} required />
            <input type="text" name="lname" placeholder="Enter Last Name *" onChange={handleChangeInput} value={lname} required />
        </div>
        <div className="row1">
            <input type="email" name="email" placeholder="Enter Email *" onChange={handleChangeInput} value={email} required />
            <input type="text" name="username" placeholder="Enter Username *" onChange={handleChangeInput} value={username} required />
        </div>
        <div className="row1">
            <input type="password" name="password" placeholder="Enter Password *" onChange={handleChangeInput} value={password} required />			
            <input type="password" name="cf_password" placeholder="Enter confirm Password *" onChange={handleChangeInput} value={cf_password} required />
        </div>
        <div className="row1">
            <select title="Please select your Sequrity Question" name='securitykey' onChange={handleChangeInput} value={securitykey || ""} required>
                <option value="" selected disabled>Please select your Sequrity Question</option>
                <option value="date">What is your Birthdate?</option>
                <option value="number">What is Your old Phone Number</option>
                <option value="text">What is your Pet Name?</option>
            </select>
            <input type="text" name="securityans" placeholder="Enter Your Answer *" onChange={handleChangeInput} value={securityans} required />
        </div>
        <div className="row1">
            <input type="text" minLength="10" maxLength="10" name="mobile" placeholder="Your Phone *" onChange={handleChangeInput} value={mobile} required />
            <div className="row1" style={{"width": "49%"}}>
                <label style={{display: "contents"}}>Gender:</label>
                <label style={{display: "contents"}}> 
                    <input type="radio" name="gender" value="male" onChange={handleChangeInput}  defaultChecked />
                    <span> Male </span> 
                </label>
                <label style={{display: "contents"}}> 
                    <input type="radio" name="gender" value="female" onChange={handleChangeInput} />
                    <span>Female </span> 
                </label>
            </div>
        </div>
        <label>
    <input type="checkbox" defaultChecked name="remember" style={{marginTop: "20px","width": "auto"}} /> <small style={{fontSize: "0.825em"}}>By clicking Submit, you agree to our Terms & Conditions, Visitor Agreement and Privacy Policy.</small>
  </label>
        <input type="submit" name="submit" value="Login" className="sign-up" required /><hr />
        
        <p>If you have already : <Link className="sign-in" href={"/login"}>Login</Link></p>
    </form>

</div>
    </div>
  )
}

export default Register
