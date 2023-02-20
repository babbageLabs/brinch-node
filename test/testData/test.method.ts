import {z} from 'zod';
import {AppEndpoint} from '../../src/core/core.data.types';

const endpoint: AppEndpoint = {
  description: 'Test method',
  name: 'test.method',
  request: z.object({
    msg: z.string(),
  }),
  response: z.object({
    msg: z.string(),
  }),
};
module.exports = endpoint;
