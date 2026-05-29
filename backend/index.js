import {ENV} from './env.js';
import mongoose from 'mongoose';

import bcrypt from 'bcrypt';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import {User} from './models/user.model.js';
import authenticateToken from './utilities.js';

mongoose.connect(ENV.DB_URL).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error connecting to MongoDB", err);
});


const app=express();
app.use(express.json());
app.use(cors({origin:"*"}));

app.post("/create-account", async (req,res)=>{
    const {fullname,email,password}=req.body;

    if(!fullname || !email || !password){
        return res.status(400).json({error:true, message:"All Fields are Required"});
    }

    const isUser=await User.findOne({email});

    if(isUser){
        return res.status(400).json({error:true, message:"User already Exists"});
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const user=new User({
        fullname,
        email,
        password:hashedPassword
    });

    await user.save();

    const accessToken=jwt.sign(
        {
            userId:user._id
        },
        ENV.ACCESS_TOKEN_KEY,
        {
            expiresIn:"72h"
        }
    );

    return res.status(201).json({
        error:false,
        user:{fullname:user.fullname,
        email:user.email},
        accessToken,
        message:"Registration Successfull"
    });
});

app.post("/login",async (req,res)=>{
    const {email,password} =req.body;

    if(!email || !password){
        return res.status(400).json({error:true,message:"Email & Password both are required"});
    }

    const user=await User.findOne({email});

    if(!user){
        return res.status(400).json({error:true,message:"No User Found"});
    }

    const isPassword=await bcrypt.compare(password,user.password);

    if(!isPassword){
        return res.status(400).json({error:true,message:"Wrong Password"});
    }

    const accessToken=jwt.sign(
        {userId:User._id},
        ENV.ACCESS_TOKEN_KEY,
        {
            expiresIn:"72hr"
        }
    );

    return res.json({
        error:false,
        user:{username:User.fullname,email:User.email},
        accessToken,
        message:"Login Successfull"
    });
});

app.get("/get-user", authenticateToken, async (req,res)=>{
    
    const {userId} =req.user;

    const isUser = await User.findOne({_id:userId});

    if(!isUser) return res.sendStatus(401);

    return res.json({
        user:isUser,
        message:""
    });
})

app.listen(ENV.PORT);
