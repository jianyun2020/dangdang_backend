import { sequelize } from "@/dao/BaseDao"
import { DataTypes } from "sequelize"

class UserInfo {
  static createModel() {
    return sequelize.define(
      "userinfo",
      {
        userid: {
          type: DataTypes.INTEGER,
          field: "userid",
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING(30),
          field: "username",
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(20),
          field: "password",
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(50),
          field: "address",
          allowNull: true,
        },
        valid: {
          type: DataTypes.TINYINT,
          field: "valid",
          allowNull: true,
        },
      },
      {
        freezeTableName: true, // true表示使用给定的表名，false表示模型名后加s作为表名
        timestamps: false, // true表示给模型加上时间戳属性（createAt、updateAt）， false 表示不带时间戳属性
      }
    )
  }
}

export const model = UserInfo.createModel()
