import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { Request, Response } from "express";
import {db} from './db.js';
import jwt from 'jsonwebtoken';


const signUp = async (req : Request, res: Response) => {
    const {username, password} = req.body;
    const user = await db.oneOrNone(`SELECT * FROM users WHERE username=$1`, username)

    if(user){
        res.status(409).json({msg: "Sorry this username is already exist"})
    } else {
      const {id} = await db.one(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id`, [username, password])
      res.status(201).json({id, msg: "User created successfully"})
    }
    
}

export {signUp}