import { Box, TextField, Typography } from '@mui/material';
import styled from 'styled-components';
import React, { useState } from 'react';
import Logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';
const Container = styled(Box)`
  width: 100vw;
  height: 100vh;
  background-color: #071952;
  display: flex;
  img {
    width: 3.5rem;
    height: 3.5rem;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 1rem;
    font-size: 1rem;
    width: 16rem;
    input {
      padding: 1rem;
      background: transparent;
      color: #fff;
      border-radius: 0.5rem;
      border: 0.1rem solid #6528f7;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #6528f7;
      padding: 1rem;
      border-radius: 0.5rem;
      border: none;
      color: #fff;
      font-weight: bold;
      text-transform: uppercase;
      &:hover {
        background-color: #8696fe;
      }
    }
  }
  .login {
    a {
      font-weight: bold;
      color: #525fe1;
      &:hover {
        color: #f5f5f5;
      }
    }
  }
`;
interface IRegister {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const Register = () => {
  const [registerUser, setRegisterUser] = useState<IRegister>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const toastOptions: ToastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };
  const handleChange = (e: any) => {
    setRegisterUser((prev: IRegister) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e: any) => {
    const { username, email, password, confirmPassword } = registerUser;
    e.preventDefault();
    if (username.length < 3) {
      toast.error('Required username greater than 8 characters!', toastOptions);
      return;
    }
    if (password.length < 5) {
      toast.error('Required password greater than 8 characters!', toastOptions);
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Password and Confirm Password should be same!', toastOptions);
      return;
    }
    if (email === '') {
      toast.error('Email is required!', toastOptions);
      return;
    }
    try {
      axios.post(registerRoute, {registerUser});
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignContent="center"
        m="auto"
        sx={{ backgroundColor: '#090580', borderRadius: '1rem' }}
        p="5rem 5rem"
      >
        <Box display="flex" justifyContent="center" gap={1}>
          <img src={Logo} alt="" />
          <Typography
            sx={{
              textTransform: 'uppercase',
              color: '#fff',
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
          >
            snappy
          </Typography>
        </Box>
        <form action="" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={registerUser.username}
            name="username"
            placeholder="Username"
            type="text"
          />
          <input
            onChange={handleChange}
            value={registerUser.email}
            name="email"
            placeholder="Email"
            type="email"
          />
          <input
            onChange={handleChange}
            value={registerUser.password}
            name="password"
            placeholder="Password"
            type="password"
          />
          <input
            onChange={handleChange}
            value={registerUser.confirmPassword}
            name="confirmPassword"
            placeholder="Confirm password"
            type="password"
          />
          <button>Create User</button>
        </form>
        <Typography
          sx={{
            mt: '1rem',
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.9rem',
          }}
        >
          Already have an account?{' '}
          <span className="login">
            <Link to="/login">Login</Link>
          </span>
        </Typography>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default Register;
