import mongoose, { Schema, Document } from "mongoose";

interface IArticle extends Document {
  userId:mongoose.Types.ObjectId,  
  articleName: string;
  description: string;
  image: string; 
  tags: string[];
  likes:number;
  dislikes:number;
  blockCount:number;
  isBlock:boolean;
  category: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    userId:{type:Schema.Types.ObjectId,ref:"User",required:true},
    articleName: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    likes:{ type: Number, default: 0},
    dislikes:{ type: Number, default: 0 },
    blockCount:{type: Number, default: 0 },
    image: { type: String,required:true },
    tags: [{ type: String }],
    category: { type: Schema.Types.ObjectId, ref:"Category",required: true },
  },
  { timestamps: true }
);

const ArticleModel = mongoose.model<IArticle>("Article", ArticleSchema);

export default ArticleModel;
