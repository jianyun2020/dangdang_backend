import Koa from "koa"
import body from "koa-body"
import json from "koa-json"
import fs from "fs"
import Router from "koa-router"
import path from "path"

import globalException from "./GlobalException"

class AllRouterLoader {
  app!: Koa
  static allRouterLoader: AllRouterLoader = new AllRouterLoader()
  // 初始化方法
  init(app: Koa) {
    this.app = app
    const rootRouter = this.loadAllRouterWrapper()
    // 全局通用异常
    this.app.use(globalException)
    this.app.use(rootRouter.routes())
    // 4. 监听方法
    this.listen()
  }

  // 1. 加载所有路由文件数组
  getFiles(dir: string) {
    return fs.readdirSync(dir)
  }
  // 2. 加载所有路由文件绝对路径数组
  getAbsoluteFilePaths() {
    const dir = path.join(process.cwd(), "/src/router")
    const allFiles = this.getFiles(dir)
    const allFullFilePaths: string[] = []

    for (let file of allFiles) {
      const fullFilePath = dir + "\\" + file
      allFullFilePaths.push(fullFilePath)
    }
    return allFullFilePaths
  }
  // 3. 加载所有二级路由到一级路由中
  loadAllRouterWrapper() {
    // 3.0 获取一级路由
    const rootRouter = this.getRootRouter()
    // 3.1 调用获取绝对路径数组方法
    const allFullFilePaths = this.getAbsoluteFilePaths()
    // 3.2 调用加载所有一级路由到二级路由方法
    this.loadAllRouter(allFullFilePaths, rootRouter)
    return rootRouter
  }

  // 3.0 获取一级路由
  getRootRouter() {
    const rootRouter = new Router()
    rootRouter.prefix("/dang")
    this.app.use(json())
    this.app.use(body())
    return rootRouter
  }

  // 自定义守卫
  isRouter(data: any): data is Router {
    return data instanceof Router
  }

  loadAllRouter(allFullFilePaths: string[], rootRouter: Router) {
    for (let fullFilePath of allFullFilePaths) {
      const module = require(fullFilePath)
      if (this.isRouter(module)) {
        rootRouter.use(module.routes(), module.allowedMethods())
      }
    }
  }

  listen() {
    this.app.listen(3003)
    console.log("在端口3003监听")
  }
}

export default AllRouterLoader.allRouterLoader
