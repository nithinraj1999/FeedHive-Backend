import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  dob: Date;
  role: "user" | "admin"; 
  preferences: Schema.Types.ObjectId[]; 
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
    dob: { type: Date, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }, 
    preferences: [{ type: Schema.Types.ObjectId, ref: "Category" }], 
  },
  { timestamps: true }
);

export const UserModel = model<IUser>("User", UserSchema);
