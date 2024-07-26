import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from 'bcryptjs';

connect()

export async function POST(request: NextRequest) {
  try {
    const requestBody: SignupUser = await request.json()
    const {username, email, password} = requestBody

    console.log(requestBody)

    // check if user already exists
    const userExists = await User.findOne({email})

    if (userExists) {
      return NextResponse.json(
        {error: 'User already exists'},
        {status: 400}
      )
    }

    //  hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    // create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })

    const savedUser = await newUser.save()
    console.log(savedUser)

    return NextResponse.json({
        message: "User created successfully",
        success: true,
        savedUser
      }
    )

  }
  catch (error: any) {
    return NextResponse.json(
      {error: error.message},
      {status: 500}
    )
  }
}