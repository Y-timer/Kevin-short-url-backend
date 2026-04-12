//数据库配置项
import { Sequelize } from 'sequelize';
import { logger } from './loggerHelper.js';

//从.env中获取相关信息
const dbconfig ={
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  databaseUrl: process.env.DATBASE_URL
}

const sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password,dbconfig.databaseUrl, {
  host: dbconfig.host,
  dialect: 'postgres',
  port: dbconfig.port,
  logging: (...msg) => logger.info(msg),
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

//测试数据库连接
try {
  await sequelize.authenticate();
  logger.info('Connection has been established successfully.');
} catch (error) {
  logger.error('Unable to connect to the database:', error);
}

export default sequelize;

