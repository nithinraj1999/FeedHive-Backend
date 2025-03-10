import { Schema, model, Document } from "mongoose";

interface ICategory extends Document {
    categoryName: string;
    description:string;
    createdAt: Date;
    updatedAt: Date;
  }
  
const CategorySchema = new Schema<ICategory>(
    {
      categoryName: { type: String, required: true, unique: true },
      description: { type: String, required: true},
    },
    { timestamps: true }
  );
  
 export const categoryModel = model<ICategory>("Category", CategorySchema);
  