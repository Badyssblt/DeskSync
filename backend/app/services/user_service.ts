import User from "#models/user";

export default class UserService {
  public async register(userData: { email: string, password: string, fullName: string }) {
    const user = await User.create(userData)
    return user
  }

  public async login(userData: { email: string, password: string }){

    const user = await User.verifyCredentials(userData.email, userData.password)

    return await User.accessTokens.create(user)
  }
}
