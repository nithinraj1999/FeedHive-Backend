
import 'dotenv/config';

import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET 

export const generateAccessToken = (payload: object): string | null => {
  if (!accessTokenSecret) {
    return null;
  }
  
  return jwt.sign(payload, accessTokenSecret, { expiresIn: "10d" });
  
};


  
export const verifyAccessToken = (token: string): object | null => {
  if (!accessTokenSecret) {
    throw new Error("Access token secret is not defined");
  }
  try {
    return jwt.verify(token, accessTokenSecret.toString()) as object;
  } catch (err) {
    return null; 
  }
};

