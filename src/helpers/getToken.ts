import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";



export const getToken = (request: NextRequest): DecodedToken | null => {
  try{ 
    const token = request.cookies.get('token')?.value || ''

    if (token === '') {
      return null
    }

    const  decodedToken:DecodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken

    return decodedToken
  }
  catch (error: any){
    throw new Error(error.message)
  }
}