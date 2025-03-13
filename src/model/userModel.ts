import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  blockedArticles:Schema.Types.ObjectId[];
  likedArticle:Schema.Types.ObjectId[];
  dislikedArticle:Schema.Types.ObjectId[];
  dob: Date;
  role: "user" | "admin"; 
  preferences: string[]; 
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    blockedArticles: [{ type:Schema.Types.ObjectId, ref: "Article" }],
    likedArticle: [{ type:Schema.Types.ObjectId, ref: "Article" }],
    dislikedArticle: [{ type:Schema.Types.ObjectId, ref: "Article" }],
    dob: { type: Date, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }, 
    preferences: [{ type: String, required: true }], 
  },
  { timestamps: true }
);

UserSchema.pre("save",async function (next) {
  this.firstName = this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1).toLowerCase();
  this.lastName = this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1).toLowerCase();
  this.password =  await bcrypt.hash(this.password.toString(), 10);
  next();
});

export const userModel = model<IUser>("User", UserSchema);
