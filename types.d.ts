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