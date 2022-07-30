import {Express , Request , Response} from 'express';
export default function (app:Express){

    app.get("/check",(req:Request,res:Response)=>{
        res.sendStatus(200);
    })
}