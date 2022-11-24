import { success } from "@/common/ResResult"
import { addUser, Userinfo } from "@/dao/UserDao"
import { Context } from "koa"
import Router from "koa-router"

const router = new Router()

router.prefix("/usermodule")

router.get("/findUserinfo/:username", async (ctx: Context) => {
  const { username } = ctx.params
  ctx.body = `您好： ${username}`
})

router.post("/addUser", async (ctx: Context) => {
  const userinfo: Userinfo = ctx.request.body
  const dbUserinfo = await addUser(userinfo)
  ctx.body = success(dbUserinfo)
})

module.exports = router
