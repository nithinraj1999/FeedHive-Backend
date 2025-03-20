import { Request,Response,NextFunction } from "express"
import { AuthRequest } from "../../middlewares/authenticater";
import ArticleModel from "../../model/articleModel";
import { uploadArticleImage } from "../../services/cloudinary";
import { userModel } from "../../model/userModel";
import mongoose from "mongoose";

export const creteArticle = async(req:AuthRequest,res:Response,next:NextFunction)=>{
   try{
        const {userId,articleName,description,tags,category} = req.body
        const image = req.file?.buffer
        const tagsArray = tags.split(",");

        let imageUrl 
        if(image){
            const coudinaryUpload = await uploadArticleImage(image)
            imageUrl = coudinaryUpload.url            
        }
        const newArticle = new ArticleModel({ userId:userId,articleName,description,tags:tagsArray,category:category,image:imageUrl });
        await newArticle.save();
        res.json({success:true})
   }catch(error){
    next(error)
   }
}   

export const editArticle = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { articleId, articleName, description, tags, categoryId } = req.body;
        const image = req.file?.buffer
        console.log(req.file);
        
        if (!articleId) {
             res.status(400).json({ message: "Article ID is required" });
             return
        }
        let imageUrl 
        if(image){
            const coudinaryUpload = await uploadArticleImage(image)
            imageUrl = coudinaryUpload.url            
        }
        const updateFields: Partial<{ articleName: string; description: string; tags: string[]; categoryId: string,image:string }> = {};

        if (articleName) updateFields.articleName = articleName;
        if (description) updateFields.description = description;
        if (tags) updateFields.tags = tags.split(',');
        if (categoryId) updateFields.categoryId = categoryId;
        if(imageUrl) updateFields.image = imageUrl;
        // if(req.file)
        const updatedArticle = await ArticleModel.findByIdAndUpdate(
            articleId,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedArticle) {
             res.status(404).json({ message: "Article not found" });
             return
        }
        res.status(200).json({ success:true,message: "Article updated successfully", article: updatedArticle });
    } catch (error) {
        next(error);
    }
};



export const getAllArticles = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId);

        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        const preference = user.preferences || [];
        const blockedArticles = user.blockedArticles || []; 

        const preferenceObjectIds = preference.map(id => new mongoose.Types.ObjectId(id));


        const allArticles = await ArticleModel.find({
            _id: { $nin: blockedArticles },
            category: { $in: preferenceObjectIds } 
        });

        res.json({ success: true, allArticles });
    } catch (error) {
        next(error);
    }
};

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


export const viewAricle = async(req: AuthRequest, res: Response, next: NextFunction)=>{
    try{
        const {articleId} = req.body
        const article = await ArticleModel.findOne({_id:articleId})
        res.json({success:true,article:article})
    }catch(error){
        next(error)
    }
}

export const blockArticle = async (req: AuthRequest, res: Response, next: NextFunction)=>{
    try{
        const {userId,articleId} = req.body
        const blockArticle  =  await userModel.findByIdAndUpdate(userId, {
            $addToSet: { blockedArticles: articleId }
          });
          const incBlockedCount = await ArticleModel.findByIdAndUpdate(
            articleId,
            { $inc: { blockCount: 1 } }, 

          );
          res.json({success:true})
     }catch(error){
              next(next)
    }
}


export const likeArticle = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { userId, articleId } = req.body;

        if (!userId || !articleId) {
             res.status(400).json({ success: false, message: "User ID and Article ID are required" });
             return
        }

        const user = await userModel.findById(userId);

        if (!user) {
             res.status(404).json({ success: false, message: "User not found" });
             return
        }

        let updateUser, updateArticle;
        let likeIncrement = 0, dislikeIncrement = 0;

        if (user.likedArticle.includes(articleId)) {
            await userModel.updateOne({ _id: userId }, { $pull: { likedArticle: articleId } });
            likeIncrement = -1;
        } else {
            if (user.dislikedArticle.includes(articleId)) {
                await userModel.updateOne({ _id: userId }, { $pull: { dislikedArticle: articleId } });
                dislikeIncrement = -1;
            }
            await userModel.updateOne({ _id: userId }, { $addToSet: { likedArticle: articleId } });
            likeIncrement = 1;
        }

        updateArticle = await ArticleModel.findByIdAndUpdate(
            articleId,
            { $inc: { likes: likeIncrement, dislikes: dislikeIncrement } },
            { new: true }
        );
        const userData = await userModel.findOne({_id:userId})
        res.json({ success: true, updatedArticle: updateArticle,userData:userData });
    } catch (error) {
        next(error);
    }
};

export const dislikeArticle = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { userId, articleId } = req.body;

        if (!userId || !articleId) {
           res.status(400).json({ success: false, message: "User ID and Article ID are required" });
           return 
        }

        const user = await userModel.findById(userId);

        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return 
        }

        let updateUser, updateArticle;
        let likeIncrement = 0, dislikeIncrement = 0;

        if (user.dislikedArticle.includes(articleId)) {
            await userModel.updateOne({ _id: userId }, { $pull: { dislikedArticle: articleId } });
            dislikeIncrement = -1;
        } else {
            if (user.likedArticle.includes(articleId)) {
                await userModel.updateOne({ _id: userId }, { $pull: { likedArticle: articleId } });
                likeIncrement = -1;
            }
            await userModel.updateOne({ _id: userId }, { $addToSet: { dislikedArticle: articleId } });
            dislikeIncrement = 1;
        }

        updateArticle = await ArticleModel.findByIdAndUpdate(
            articleId,
            { $inc: { likes: likeIncrement, dislikes: dislikeIncrement } },
            { new: true }
        );
        const userData = await userModel.findOne({_id:userId})

        res.json({ success: true, updatedArticle: updateArticle,userData:userData });
    } catch (error) {
        next(error);
    }
};
