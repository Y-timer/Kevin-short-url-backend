import express from 'express';
import cors from "cors";

import urlRecordRoute from './routes/urlRecordRoute.js';
import urlRedirectRouter from './routes/urlRedirectRoute.js';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with { type: "json"}; //明确声明导入的是JSON模块，让运行环境用JSON方式解析它
import ratelimiter from './utils/rateLimiter.js';
import { pinoHttpMiddleware } from './utils/loggerHelper.js';

const app = express();

//TODO: auth

app.use(express.json());
app.use(cors());
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 
app.use(ratelimiter);
app.use(pinoHttpMiddleware)

app.use('/v1', urlRecordRoute);
app.use('/v1',urlRedirectRouter);

//TODO: 错误响应

export default app;