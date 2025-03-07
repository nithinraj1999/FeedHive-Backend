import { Schema, model, Document } from "mongoose";

interface ICategory extends Document {
    name: string;
    description:string;
    createdAt: Date;
    updatedAt: Date;
  }
  
const CategorySchema = new Schema<ICategory>(
    {
      name: { type: String, required: true, unique: true },
      description: { type: String, required: true},
    },
    { timestamps: true }
  );
  
 export const CategoryModel = model<ICategory>("Category", CategorySchema);
  