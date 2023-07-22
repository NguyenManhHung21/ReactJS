import { Box, TextField, Typography } from '@mui/material';
import styled from 'styled-components';
import React from 'react';
import Logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
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
        color: #525FE1;
        &:hover {
            color: #F5F5F5;
        }
    }
  }
`;

const Login = () => {
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
        <form action="">
          <input placeholder="Username" type="text" />
          <input placeholder="Password" type="password" />
          <button>Login</button>
        </form>
        <Typography sx={{ mt: '1rem', color: '#fff', display:'flex', justifyContent:'space-between', fontSize: '0.9rem'}}>
          Do you have any account?
          <span className='login'>
            <Link to="/">Register</Link>
          </span>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
