import { Schema } from 'redis-om';

export const vectorModel = new Schema('vectorModel', {
  vector: { type: 'number[]' },
  metadata: { type: 'text' }
});
