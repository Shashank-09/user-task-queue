const Redis = require('ioredis');
const redisClient = new Redis();

const RATE_LIMIT_PER_SECOND = 1;
const RATE_LIMIT_PER_MINUTE = 20;

const canProcessTask = async (user_id) => {
  const now = Math.floor(Date.now() / 1000);
  const minuteKey = `minute:${user_id}:${now}`;
  const secondKey = `second:${user_id}:${now}`;

  const minuteCount = await redisClient.incr(minuteKey);
  const secondCount = await redisClient.incr(secondKey);

  if (minuteCount === 1) await redisClient.expire(minuteKey, 60);
  if (secondCount === 1) await redisClient.expire(secondKey, 1);

  return minuteCount <= RATE_LIMIT_PER_MINUTE && secondCount <= RATE_LIMIT_PER_SECOND;
};

module.exports = { canProcessTask };
