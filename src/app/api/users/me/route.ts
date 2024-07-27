import { getToken } from "@/helpers/getToken";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

// connect to mongodb
connect()

export async function GET(request: NextRequest) {
  try {
    const userID = await getToken(request)
    const user = await User.findOne({_id: userID}).select('-password')

    return NextResponse.json({
      message: 'User Found',
      data: user
    })
  }
  catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 400})
  }
}