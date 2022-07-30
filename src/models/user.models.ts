import mongoose from "mongoose";
import bcrypt from "bcrypt"
import config from "config"


export interface userDocument extends mongoose.Document{
    email:string;
    name:string;
    password:string;
    createdAt:Date;
    updatedAt:Date;
    comparePassword(candidatePassword:string) : Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
}, {
    timestamps:true
});

UserSchema.pre("save",async function (next){

    let user  = this as userDocument

    if(!user.isModified("password")){
        return next();
    }

    const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));
    const hash = await bcrypt.hash(user.password,salt)

    user.password = hash;

    return next();
})

UserSchema.methods.comparePassword = async function(
    candidatePassword:string
){
    const user = this as userDocument;
    return bcrypt.compare(candidatePassword , user.password).catch((e)=>false)
};

const User = mongoose.model<userDocument>("user",UserSchema);

export default User;