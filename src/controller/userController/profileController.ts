import { Request,Response,NextFunction } from "express"
import { userModel } from "../../model/userModel";
import { AuthRequest } from "../../middlewares/authenticater";
import { categoryModel } from "../../model/categoryModel";


export const getprofileInfo = async (req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const {userId} = req.body
        const profileInfo = await userModel.findOne({_id:userId}).populate("preferences")
        
        if (profileInfo) {
            res.json({ success: true, data: profileInfo });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    }catch(error){
        next(error)
    }
}
 
export const getAllCategories = async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const allCategories = await categoryModel.find({},{_id:1,categoryName:1})
        res.json({success:true,allCategories:allCategories})
    }catch(error){
        next(error)
    }
}

export const selectCategories = async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        
        const {userId,categoryId,categoryName} = req.body
        console.log(req.body);
        const updatedCategory = await userModel.findByIdAndUpdate(
            userId,
            { $addToSet: { preferences: { $each: categoryId } } },
            { new: true }
        );
        
        res.json({success:true})
    }catch(error){
        next(error)
    }
}

export const editProfile = async (req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const {userId,firstName,lastName,email,phone,password,confirmPassword,dob,preferences} = req.body

        const dataToUpdate: Partial<{ 
            firstName: string; 
            lastName: string; 
            email: string; 
            phone: string; 
            password: string; 
            dob: Date; 
            preferences: string[]; 
          }> = {};
      
          if (firstName) dataToUpdate.firstName = firstName;
    if (lastName) dataToUpdate.lastName = lastName;
    if (email) dataToUpdate.email = email;
    if (phone) dataToUpdate.phone = phone;
    if (dob) dataToUpdate.dob = new Date(dob);

    if (password) {
        if (password !== confirmPassword) {
          res.status(400).json({ success: false, message: "Passwords do not match" });
          return 
        }
        dataToUpdate.password =password
      }
  
      if (preferences && Array.isArray(preferences)) {
        dataToUpdate.preferences = preferences;
      }
  
      const updatedUser = await userModel.findByIdAndUpdate(userId, { $set: dataToUpdate }, { new: true });
  
      if (!updatedUser) {
        res.status(404).json({ success: false, message: "User not found" });
        return
      }
      res.json({ success: true, message: "Profile updated successfully", user: updatedUser });
    }catch(error){
        next(error)
    }
}

