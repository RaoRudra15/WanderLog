import bcrypt from 'bcrypt';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app=express();
app.use(express.json());
app.use(cors({origin:"*"}));

app.get("/hello", async(req,res)=>{
    return res.status(200).json({message:"hello"})
})

app.listen(8000);
