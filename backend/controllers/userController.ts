import { NextFunction, Request, Response } from 'express';
import {userSchema} from '../models/userModel';

export const register = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const registerUser = req.body;
        console.log(registerUser);
    } catch (error) {

    }
}

// module.exports = {register}