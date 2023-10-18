import { createClient } from 'redis';

const redis = createClient({ url: process.env.REDIS_URL });
redis.on('error', (err) => console.log('Redis Client Error', err));

(async () => { return await redis.connect(); })();

export default redis;
