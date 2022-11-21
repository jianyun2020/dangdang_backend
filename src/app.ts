import Koa from "koa"
import body from "koa-body"
import json from "koa-json"
import Router from "koa-router"

import userRouter from "./router/user"

const app = new Koa()
const router = new Router()
router.prefix("/dang") // 为所有的路由访问添加路由前缀 /dang 来作为一级路由

router.use(json())
router.use(body())

router.use(userRouter.routes(), userRouter.allowedMethods())

// 加载路由到全局路由上
app.use(router.routes())
app.listen(3002)
console.log("server running on port 3002")
