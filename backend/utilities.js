import jwt from 'jsonwebtoken';
import { ENV } from './env.js';

function authenticateToken(req,res,next){
    const authHeader=req.headers["authorization"];
    const token=authHeader && authHeader.split(" ")[1];

    if(!token) return res.sendStatus(401);

    jwt.verify(token,ENV.ACCESS_TOKEN_KEY,(err,user)=>{
        if(err){
            return res.sendStatus(400);
        }
        req.user=user;
        next();
    });
}

export default authenticateToken;