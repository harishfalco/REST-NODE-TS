import { DocumentDefinition } from "mongoose";
import User , {userDocument} from "../models/user.models"

export async function createUser (input : DocumentDefinition<userDocument>){
    try{
        return await User.create(input);
    }catch(error:unknown){
        throw new Error(error as string );
    }
}

function findUser(){}