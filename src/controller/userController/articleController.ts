import { Request,Response,NextFunction } from "express"
import { AuthRequest } from "../../middlewares/authenticater";
import ArticleModel from "../../model/articleModel";
import { uploadArticleImage } from "../../services/cloudinary";

export const creteArticle = async(req:AuthRequest,res:Response,next:NextFunction)=>{
   try{
        const {userId,articleName,description,tags,categoryId} = req.body
        const image = req.file?.buffer
        
        let imageUrl 
        if(image){
            const coudinaryUpload = await uploadArticleImage(image)
            imageUrl = coudinaryUpload.url            
        }
        const newArticle = new ArticleModel({ userId:userId,articleName,description,tags,category:categoryId,image:imageUrl });
        await newArticle.save();
        res.json({success:true})
   }catch(error){
    next(error)
   }
}   

export const editArticle = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { articleId, articleName, description, tags, categoryId } = req.body;

        if (!articleId) {
             res.status(400).json({ message: "Article ID is required" });
             return
        }

        const updateFields: Partial<{ articleName: string; description: string; tags: string[]; categoryId: string }> = {};

        if (articleName) updateFields.articleName = articleName;
        if (description) updateFields.description = description;
        if (tags) updateFields.tags = tags;
        if (categoryId) updateFields.categoryId = categoryId;

        const updatedArticle = await ArticleModel.findByIdAndUpdate(
            articleId,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedArticle) {
             res.status(404).json({ message: "Article not found" });
             return
        }
        res.status(200).json({ message: "Article updated successfully", article: updatedArticle });
    } catch (error) {
        next(error);
    }
};


export const getAllArticles = async(req: AuthRequest, res: Response, next: NextFunction)=>{
    try{
        const allArticles = await ArticleModel.find({})
        res.json({success:true,allArticles:allArticles})
    }catch(error){
        next(error)
    }
}


export const deleteArticle = async(req: AuthRequest, res: Response, next: NextFunction)=>{
    try{
        const {articleId} =req.body
        const deletedArticle = await ArticleModel.deleteOne({_id:articleId})
        res.json({success:true})
    }catch(error){
        next(error)
    }
}


export const getMyArticles = async(req: AuthRequest, res: Response, next: NextFunction)=>{
    try{
        const {userId} = req.body
        const myArticles = await ArticleModel.find({userId:userId})
        res.json({success:true,myArticles:myArticles})
    }catch(error){
        next(error)
    }
}