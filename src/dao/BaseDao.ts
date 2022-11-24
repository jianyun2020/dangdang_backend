import dbconfig from "@/conf/dbconfig"
import { Dialect, Sequelize } from "sequelize"

class BaseDao {
  static baseDaoOrm: BaseDao = new BaseDao()
  sequelize!: Sequelize
  constructor() {
    this.initSeqConf("mysql")
  }

  initSeqConf(dialect: Dialect) {
    const { host, user, password, database, port } = dbconfig.getConf()
    this.sequelize = new Sequelize(database, user, password, {
      host,
      port,
      dialect, // 方言，表示是何种数据库
      define: { timestamps: false, freezeTableName: true },
    })
  }
}

export const { sequelize } = BaseDao.baseDaoOrm
