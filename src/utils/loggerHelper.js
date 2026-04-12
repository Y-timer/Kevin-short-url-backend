import pino from 'pino';
import pinoHttp from 'pino-http';

const transport = pino.transport({
  targets:[
    {
      target: 'pino/file',
      level: 'info',
      options: {
        destination: './src/logs/all-logs.log',
        mkdir: true
      },
    },
    {
      //只单独存放日志文件
      target: 'pino/file',
      level: 'error',
      options:{
        destination: './src/logs/errors.log',
        mkdir: true,
      },
    },
    {
      target: 'pino-pretty',
      level: 'info',
      options:{
        colorize: true
      },
    },
  ],
});

export const logger = pino(transport);

//创建http中间件，用于自动记录请求日志
export const pinoHttpMiddleware = pinoHttp({
  logger,
});
