import {ENV} from './env.js';
import mongoose from 'mongoose';

import bcrypt from 'bcrypt';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';


mongoose.connect(ENV.DB_URL).then((=>{
    console.log("Connected to MongoDB");
})).catch((err)=>{
    console.log("Error connecting to MongoDB", err);
});


const app=express();
app.use(express.json());
app.use(cors({origin:"*"}));

app.get("/create-account", async(req,res)=>{
    
})

app.listen(ENV.PORT);
