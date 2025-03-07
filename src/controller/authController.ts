import { Request,Response,NextFunction } from "express"


 const signup = (req:Request,res:Response,next:NextFunction)=>{

    try{
        

    }catch(error){
        next(error)
    }
}



export default {signup}