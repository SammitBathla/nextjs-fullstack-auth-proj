

import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken";


export const getDataFromToken = (Request: NextRequest) => {
    try{
        const token = Request.cookies.get("token")?.value || "";

        const decodedToken:any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
        return decodedToken.id;

    }catch(error:any) {
    
        throw new Error(error.message);

    }

}