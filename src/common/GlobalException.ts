import Koa, { Context } from "koa"
import { fail } from "./ResResult"

const globalException = async (ctx: Context, next: Koa.Next) => {
  console.log("进入到通用异常")
  try {
    await next()
  } catch (err: any) {
    const errrslt = err as { message: string }
    ctx.body = fail(`服务器错误：${errrslt.message}`)
  }
}

export default globalException
