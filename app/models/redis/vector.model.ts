import { Schema, Repository } from 'redis-om';
import redisClient from '../../../utils/redis.client';

const vectorSchema = new Schema('vector', {
  vector: { type: 'number[]' },
  metadata: { type: 'text' }
},{
  dataStructure: 'JSON'
});

export const vectorRepository = new Repository(vectorSchema, redisClient);
