import { Context } from "koa"
import Router from "koa-router"

const router = new Router()

router.prefix("/usermodule")

router.get("/findUserinfo/:username", async (ctx: Context) => {
  const { username } = ctx.params
  ctx.body = `您好： ${username}`
})

router.post("/addUser", async (ctx: Context) => {
  const user = ctx.request.body
  ctx.body = `您好： ${user.username}, 年龄：${user.age}`
})

export default router
