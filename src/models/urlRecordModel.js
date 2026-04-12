import  { DataTypes }  from 'sequelize';
import sequelize from '../utils/dbHelper.js';

const URLRecord = sequelize.define(
  'URLRecord',
  {
    // 定义数据库中表中的属性
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,  //定义为主键
    },
    // 原始链接
    originURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 生成的短链接
    shortURL: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //识别码
    urlCode:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    tableName: 'url_record' //表名
  },
);

export default URLRecord;