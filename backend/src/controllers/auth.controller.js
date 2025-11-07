import User from "../models/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";
import cloudinary from "../lib/cloudinary.js";

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
                
               const savedUser = await newUser.save();
                generateToken(newUser._id, res);
                res.status(201).json({
                    _id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    profilePicture: newUser.profilePicture
                });

                try {
                    await sendWelcomeEmail(savedUser.email, savedUser.username, ENV.CLIENT_URL);
                } catch (error) {
                       console.error("Failed to send welcome email");
               }
                


            }else{
            return res.status(400).json({message: "Invalid user data"})
            }

    } catch (error) { 
        console.log("Error in signup controller:", error);
     
    }
};

export const login = async (req, res)=>{
    const {email, password} = req.body;

    try {
        if(!email || !password){
            return res.status(400).json({message: "Email and password are required"})
        }
        const user= await User.findOne({email})
        if(!user) return res.status(400).json({message:"Invalid credentials!"});

        const isPasspordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasspordCorrect) return res.status(400).json({message:"Invalid credentials!"});

        generateToken(user._id, res)
         res.status(201).json({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    profilePicture: user.profilePicture
                });
    } catch (error) {
        console.error("Error in login controller:", error);
        res.status(500).json({message: "Internal server error",error})
    }
}

export const logout =  (_, res)=>{
   res.cookie("jwt", "",{maxAge:0})
   res.status(200).json({message: "Logged out successfully!"})
}

export const updateProfile = async(req, res)=>{
    try {
        const {profilePicture} = req.body;
        if(!profilePicture) return res.status(400).json({message: "Profile picture is required"})

        const userId = req.user._id;
        
        const uploadResponse = await cloudinary.uploader.upload(profilePicture);
        
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePicture:uploadResponse.secure_url}, {new:true});
        res.status(200).json(updatedUser)
    } catch (error) {
         console.error("Error in update profile:", error);
        res.status(500).json({message: "Internal server error",error})
    }
}