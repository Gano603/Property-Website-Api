import {usermodel} from '../models/user.js'
import { respone } from '../utils/features.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { response } from 'express';


export const createNewUser = async (req,res)=>{
    const {name,email,contact,password} = req.body;

    const auth = await usermodel.findOne({email});

    if(auth){
        return respone(res,404,false,"User already exists")
    }

    const hashedpass = await bcrypt.hash(password,10).catch((err)=> console.log(err))
    const some = await usermodel.create({
        name,
        email,
        contact,
        password:hashedpass,
        registered:true
    }).catch((err)=> console.log(err));

    const token = jwt.sign({_id:some._id},process.env.DATA_KEY);

    respone(res,200,true,"User Created",token);
            
}

export const getUser = async (req,res)=>{
    const {Session} = req.cookies;

    if(Session){
        const {_id} = jwt.verify(Session,process.env.DATA_KEY);    
        const data = await usermodel.findById(_id);

        if(data){
             respone(res,200,true,"User Exists",Session,data)
        }
        else respone(res,404,false,"User does not Exist")
    }
    else{
        respone(res,404,false,"User is not Signed In",undefined)
    }
}

export const updateUser = async (req,res)=>{
    const {Session} = req.cookies;
    const {name,email,contact,password} = req.body;
    if(Session){
        const {_id} = jwt.verify(Session,process.env.DATA_KEY);
        const hashedpass = await bcrypt.hash(password,10).catch((err)=> console.log(err))    
        await usermodel.findByIdAndUpdate(_id,{name,email,contact,password:hashedpass,updatedat:Date.now()});
             respone(res,200,true,"User Updated",Session)
    }
    else{
        respone(res,404,false,"User is not Signed In",undefined)
    }
}

export const deleteUser = async (req,res)=>{
    const {Session} = req.cookies;
    if(Session){
        const {_id} = jwt.verify(Session,process.env.DATA_KEY);    
       const returned =  await usermodel.findByIdAndDelete(_id);
             respone(res,200,true,"User Deleted",undefined,returned)
    }
    else{
        respone(res,404,false,"User is not Signed In",undefined)
    }
}

export const Login = async (req,res)=>{
    let {Session} = req.cookies;
    if(Session){
        return respone(res,404,false,"User Already Logged In",Session)
    }
    else{
        const {email,password} = req.body;
        const auth = await usermodel.findOne({email});
        if(auth && auth.registered){
            const respond = await bcrypt.compare(password,auth.password);
            if(respond){
                const token = jwt.sign({_id:auth._id},process.env.DATA_KEY);
                respone(res,200,true,"Logged In Successfully",token)
            }
            else{
                respone(res,404,false,"Incorrect Password",undefined)
            }
        }
        else{
            respone(res,404,false,"Email does not Exist",undefined)
        }
    }
}

export const Logout = async (req,res)=>{
    const {Session} = req.cookies;
    if(Session){
             respone(res,200,true,"Logged Out Successfully",undefined)
    }
    else{
        respone(res,404,false,"User is not Signed In",undefined)
    }
}

// export const isLogIn = async (req,res) => {
//     const {Session} = req.cookies;
//     if(Session) response(res,200,true,"User is Signed In");
//     else response(res,404,false,"User is not Signed In")
// }


// {
//     "name":"Khawaaaar",
//     "email":"at203@gmail.com",
//     "address":"Somewhere",
//     "contact":"92"
// }