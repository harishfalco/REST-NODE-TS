import {Express , Request , Response} from 'express';
import { createUserHandler , createUserSessionHandler } from './controller/user.controller';
import validateRequest from "./middleware/validateRequest"
import  {createUserSchema , createUserSessionsSchema} from "./schema/user.schema"

export default function (app:Express){

    app.get("/check",(req:Request,res:Response)=>{
        res.sendStatus(200);
    })


    // * resgister user
    app.post("/api/users",validateRequest(createUserSchema),createUserHandler);
    
    app.post("/api/sessions",validateRequest(createUserSchema),createUserSessionHandler);

}