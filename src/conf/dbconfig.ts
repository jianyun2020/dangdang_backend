interface DbConf {
  host: string
  user: string
  password: string
  port: number
  database: string
}

interface EnvConf {
  dev: DbConf
  prod: DbConf
}

class Conf {
  static conf: Conf = new Conf()
  env!: keyof EnvConf
  envConf!: EnvConf
  constructor() {
    this.env = process.env.NODE_ENV === "dev" ? "dev" : "prod"
    this.initConf()
  }

  initConf() {
    this.envConf = {
      dev: {
        host: "localhost",
        user: "root",
        password: "sjy230hxy",
        port: 3306,
        database: "dangdang",
      },
      prod: {
        host: "dangdang.jianyun.site",
        user: "root",
        password: "sjy230hxy",
        port: 3306,
        database: "dangdang",
      },
    }
  }

  // 重载
  getConf(): DbConf
  getConf(key: string): string
  getConf(key: any = ""): any {
    if (this.isDbConfKeys(key) && key.length > 0) {
      return this.envConf[this.env][key]
    } else {
      return this.envConf[this.env]
    }
  }

  isDbConfKeys(key: any): key is keyof DbConf {
    return key === "host" || key === "user" || key === "password" || key === "port" || key === "database"
  }
}

export default Conf.conf
