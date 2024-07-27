import { getToken } from "@/helpers/getToken";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

// connect to mongodb
connect()

export async function GET(request: NextRequest) {
  try {
    const decodedToken = await getToken(request)

    if (decodedToken) {
      const userID = decodedToken.id
      const user = await User.findOne({_id: userID}).select('-password')

      console.log("ape me", user)

      return NextResponse.json({
        message: 'User Found',
        data: user
      })
    }

    return NextResponse.json({
      message: 'User Not Found'
    })

  }
  catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 400})
  }
}