"use client"
import { refreshToken } from '@/redux/actions/authAction';
import { updateProfileUser } from '@/redux/actions/profileAction';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 50%;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;


const Button = styled.button`
  padding: 10px;
  background: #0080FF;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: #0000FF;
  }
`;

const Profile = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.auth)

  useEffect(() => {
    dispatch(refreshToken())
  },[dispatch])

  const [formData, setFormData] = useState({
    userId: user?._id,
    first_name: user?.fname || "",
    last_name: user?.lname || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileUser(formData));
  };

  return (
    <Container>
      <Title>My Profile</Title>
      <Form id="profileForm" onSubmit={handleSubmit}>
        <Input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
        <Input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required />
        <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <Input type="text" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required />
        <Button type="submit">Save Profile</Button>
      </Form>
    </Container>
  );
};

export default Profile;

