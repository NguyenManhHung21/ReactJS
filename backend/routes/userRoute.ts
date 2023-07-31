import express from 'express';
import {register, login, setAvatar, getAllUsers} from '../controllers/userController'
export const userRoute = express.Router();

userRoute.post('/register',register);
userRoute.post('/login',login);
userRoute.put('/:id',setAvatar);
userRoute.get('/all-users/:id',getAllUsers);
