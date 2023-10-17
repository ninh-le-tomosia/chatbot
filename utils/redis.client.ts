import { createClient } from 'redis'

const redis = createClient()
redis.on('error', (err) => console.log('Redis Client Error', err));

(async () => { return await redis.connect(); })();

export default redis;
