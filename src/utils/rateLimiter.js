import ratelimit from 'express-rate-limit';

//接口限流
const ratelimiter = ratelimit({
  //一分钟限制在15次
  windowMs: 60 * 1000,

  limit: 15,

  standardHeaders: 'draft-8',
});

export default ratelimiter;