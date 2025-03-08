import { Request,Response,NextFunction } from "express"
import { userModel } from "../model/userModel";
import { AuthRequest } from "../middlewares/authenticater";

export const getprofileInfo = async (req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const {userId} = req.body
        const profileInfo = await userModel.findOne({_id:userId})
        if (profileInfo) {
            res.json({ success: true, data: profileInfo });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }

    }catch(error){
        next(error)
    }
}