import { Request,Response,NextFunction } from "express"
import { categoryModel } from "../../model/categoryModel"


export const addCategory = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {categoryName,description} = req.body
        const newUser = new categoryModel({ categoryName, description });
        await newUser.save();
        if(newUser){
            res.status(201).json({ message: "category saved" });
        }
    }catch(error){
        next(error)
    }
}


export const getAllCategories = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const allCategory = await categoryModel.find({})
        res.status(201).json({success:true,allCategory:allCategory})
    }catch(error){
        next(error)
    }
}