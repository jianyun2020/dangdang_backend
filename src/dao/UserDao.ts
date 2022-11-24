import { model } from "@/definemodel"

class UserDao {
  static addUser(userinfo: Userinfo) {
    return model.create(userinfo)
  }
}

export type Userinfo = {
  userid: number
  username: string
  psw: string
  address: string
  valid: number
}

export const { addUser } = UserDao
