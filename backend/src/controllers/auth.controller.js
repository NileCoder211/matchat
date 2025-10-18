import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res)=>{
   
    const {username, email, password} = req.body;

    try {
        if(!username || !email || !password){
            return res.status(400).json({message: "All fields are reuired"})
        }

        if(password.length < 8){
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

         const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
         if(!emailRegex.test(email)){
             return res.status(400).json({ message: "Invalid email format, please enter a valid email address.",  });
         }

         const existingUser  = await User.findOne({email})
            if (existingUser) {
                return res.status(400).json({message: "User with this email already exists"})
            }

            // hushing the passpord
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                username,
                email,
                password: hashedPassword
            })
            if(newUser){
                
                await newUser.save();
                generateToken(newUser._id, res);
                res.status(201).json({
                    _id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    profilePicture: newUser.profilePicture
                });
            }else{
            return res.status(400).json({message: "Invalid user data"})
            }

    } catch (error) { 
        console.log("Error in signup controller:", error);
     
    }
}