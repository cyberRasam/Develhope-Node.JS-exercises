import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import { Request, Response } from "express";
import {db} from './db.js';
import jwt from 'jsonwebtoken'

const logOut = async (req : Request, res: Response) => {
    const user : any = req.user; 
    await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user?.id, null])
    res.status(200).json({mgs: "successfully logged out."})
}

export {logOut}