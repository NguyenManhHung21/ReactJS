import { Box, TextField, Typography } from '@mui/material';
import styled from 'styled-components';
import React, { useState } from 'react';
import Logo from '../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
const Container = styled(Box)`
  width: 100vw;
  height: 100vh;
  background-color: #131324;
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

interface ILogin {
  username: string;
  password: string;
}
const Login = () => {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState<ILogin>({
    username: '',
    password: '',
  });
  const toastOptions: ToastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };
  const handleChange = (e: any) => {
    setUserLogin((prev: ILogin) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLogin = async (e: any) => {
    e.preventDefault();
    const { username, password } = userLogin;
    const { data }: any = await axios.post(loginRoute, { username, password });
    if(data.status) {
      localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY as string, JSON.stringify(data.user));
      if(data.user.isAvatarImageSet) navigate('/')
      else navigate('/set-avatar')
    } else {
      toast.error(data.msg, toastOptions);
    }
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignContent="center"
        m="auto"
        sx={{ backgroundColor: '#00000076', borderRadius: '1rem' }}
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
        <form action="" onSubmit={handleLogin}>
          <input
            value={userLogin.username}
            name="username"
            onChange={handleChange}
            placeholder="Username"
            type="text"
          />
          <input
            value={userLogin.password}
            name="password"
            onChange={handleChange}
            placeholder="Password"
            type="password"
          />
          <button>Login</button>
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
          Do you have any account?
          <span className="login">
            <Link to="/register">Register</Link>
          </span>
        </Typography>
      </Box>
      <ToastContainer />

    </Container>
  );
};

export default Login;
