"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from 'react-hot-toast';

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [step, setStep] = useState(1); 

  const router = useRouter();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/forget_password`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email:email
        })
    });
    if(response.status === 200){
      toast.success("Please Chack your Mail");
      setStep(2);
    }else if(response.status === 400){
      toast.error("Please Enter your Registered Email Id!");
    }else{
     let res = await response.json();
     toast.success(res.msg);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/verify_otp`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        otp:otp,
        email:email
      })
  });
  if(response.status === 200){
    let res = await response.json();
    toast.success(res.msg);
    setStep(3);
  }else if(response.status === 400){
   let res = await response.json();
   toast.success(res.msg);
  }else{
   let res = await response.json();
   toast.success(res.msg);
  }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if(newPassword !== confirmNewPassword){
      toast.success("Password and Confirm Password are not match.");
    }else{
      const response = await fetch(`/api/reset_password`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email:email,
          password: newPassword
        })
      });
      if(response.status === 200){
        let res = await response.json();
        toast.success(res.msg);
        router.push('/')
      }else{
        let res = await response.json();
        toast.success(res.msg);
      }
    }
  };

  return (
    <div className='r-body'>
    <div className="login-box4">
      {step === 1 && (
        <>
          <Image src={"/images/profile2.PNG"} height={100} width={100} priority className="avatar" alt="profile2" />
          <h1>Forget Password Here</h1>
          <form onSubmit={handleEmailSubmit}>
            <p>Registered Email</p>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input type="submit" name="submit" value="Send OTP" />
          </form>
          <p>
            Back to{" "}
            <Link class="sign-in" href="/login">
              Login
            </Link>
          </p>
        </>
      )}
      {step === 2 && (
        <>
          <Image src={"/images/profile2.PNG"} height={100} width={100} priority className="avatar" alt="profile2" />
          <h1>Verify OTP Here</h1>
          <form onSubmit={handleOtpSubmit}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <input type="submit" name="submit" value="Verify OTP" />
          </form>
        </>
      )}
      {step === 3 && (
        <>
          <Image src={"/images/profile2.PNG"} height={100} width={100} priority className="avatar" alt="profile2" />
          <h1>Set Password Here</h1>
          <form onSubmit={handlePasswordReset}>
            <p>Password</p>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <p>Confirm Password</p>
            <input
              type="password"
              name="confirm_password"
              placeholder="Enter Confirm Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <input type="submit" name="submit" value="Reset Password" />
          </form>
        </>
      )}
    </div>
    </div>
  );
}

export default ForgetPassword;
