import { Request,Response,NextFunction } from "express"
import { userModel } from "../../model/userModel";
import { generateAccessToken } from "../../services/jwt";
import bcrypt from "bcrypt";


export const signup = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {firstName,lastName,email,phone,dateOfBirth,password,confirmPassword} = req.body
        if(password !== confirmPassword){
            res.status(400).json({ message: "Passwords do not match" });
            return
        }
        const isAlreadyExist  = await userModel.findOne({$or: [{ email: email }, { phone: phone }]})
        if (isAlreadyExist) {
            res.status(400).json({ success: false, message: "Email or phone number already registered." });
            return
        }
        
        const newUser = new userModel({ firstName, lastName, email, phone, password, dob:dateOfBirth });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    }catch(error){
        next(error)
    }
}


export const signin = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email,password} = req.body
        const user = await userModel.findOne({email:email})
        if(!user){
            res.status(400).json({ success: false, message: "Invalid email or password" });
            return 
        }
        const isMatch = await bcrypt.compare(password.toString(), user.password);
        if (!isMatch) {
           res.status(400).json({ success: false, message: "Invalid email or password" });
           return 
        }
        const payload ={email:user.email,userId:user._id,role:user.role}
        const accessToken = generateAccessToken(payload)

        res.cookie("accessToken", accessToken, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", 
            maxAge: 10 * 24 * 60 * 60 * 1000, 
          });
        res.status(200).json({ success: true, message: "Login successful!", userData:user });
    }catch(error){
        next(error)
    }
}



