import jwt from "jsonwebtoken";


export const generateToken = (userId, res)=>{
    const {JWT_SECRET} = process.env;
    if(!JWT_SECRET){
        throw new Error("JWT_TOKEN is not configured!")
    }
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("jwt", token,{
        maxAge: 7*24*60*60*1000,
        httpOnly: true, // prevent XSS attack: cross-site-scripting
        sameSite: "strict", // CSRF attact: cross-site-request-forgery
        secure: process.env.NODE_ENV === "development" ? false : true // only send cookies on https
    })
    return token;
}