type SignupUser = {
  email: string,
  password: string,
  username: string
}

type LoginUser = {
  email: string,
  password: string
}

type DecodedToken = {
  id: string,
  username: string,
  email: string,
  iat: number,
  exp: number
}

type MongoDbUser = {
  username: string,
  email: string,
  password: string,
  isVerified: boolean,
  isAdmin: boolean,
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String | undefined,
  verifyTokenExpiry: Date | undefined
  save()
}