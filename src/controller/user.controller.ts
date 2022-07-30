import { Request,Response } from "express";
import {createUser} from "../services/user.services"
import { omit } from "lodash";


export async function createUserHandler(req:Request,res:Response){
    try{
        const user = await createUser(req.body);
        return res.send(omit(user.toJSON(),"password"))
    }catch(error:unknown){
        return res.status(400).send(error as string);
    }
}

