import type {Request, Response} from 'express';
import bcrypt from 'bcrypt';

import { registerValidator } from '../validators/authvalidator';
import { UserModel } from '../models/userModel';


export async function register (req: Request, res: Response) {

    // get data from request
    const body = req.body
    // validate data
    const {error, value} = registerValidator.validate(body)
    if (error) return res.status(400).json({message: error.message})
    // check if user exists

    // hash password
    const hash =  await bcrypt.hash(value.password, 10)

    //  save user to database
    await UserModel.create({email : value.email, username: value.username, password: hash})

    // send response
    return res.status(201).json({message: "Registering user"})
}