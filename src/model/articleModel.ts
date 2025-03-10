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
    likes:{ type: Number, required: true },
    dislikes:{ type: Number, required: true },
    blockCount:{type: Number, required: true },
    isBlock:{type: Boolean, default:false},
    image: { type: String,required:true },
    tags: [{ type: String }],
    category: { type: Schema.Types.ObjectId, ref:"Category", required: true },
  },
  { timestamps: true }
);

const ArticleModel = mongoose.model<IArticle>("Article", ArticleSchema);

export default ArticleModel;
