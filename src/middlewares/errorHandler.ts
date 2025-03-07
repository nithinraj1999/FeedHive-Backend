import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

const ErrorHandler = (err:CustomError, req:Request, res:Response,next:NextFunction) => {
    console.log("Middleware Error Hadnling");
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}

export default ErrorHandler
