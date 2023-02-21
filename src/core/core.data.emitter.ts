import {Readable} from 'stream';
import {
  AppConfiguration,
  AppEndpoint,
  Request,
  RequestRaw,
  RequestStatus,
  SchemaConfig,
  SchemaType,
} from './core.data.types';
import {z} from 'zod';
import {v4 as uuidv4} from 'uuid';
import {getAppConfig} from './core.app.configuration';
import * as path from 'path';

/*
 * Resolve the schema for a given method
 * */
export const getSchema = (
  method: string,
  schemaType: SchemaType,
  config: SchemaConfig
): z.Schema => {
  const endpoint: AppEndpoint = require(path.join(config.path, method));
  return endpoint[schemaType];
};

/*
 * Prepare a request given a method, a message and application configuration
 */
export const prepareRequest = <MsgType>(
  method: string,
  msg: MsgType,
  config: AppConfiguration
): Request => {
  return {
    meta: {
      requestSchema: getSchema(method, SchemaType.Request, config.schema),
      responseSchema: getSchema(method, SchemaType.Response, config.schema),
      status: RequestStatus.Pending,
    },
    message: JSON.stringify(msg),
    id: uuidv4(),
  };
};

/*
 * Generate valid request objects from a list of raw requests
 */
export async function* requestGenerator(data: RequestRaw<any>[]) {
  const config = getAppConfig();
  for (const req of data) {
    yield await new Promise((resolve, reject) => {
      try {
        resolve(prepareRequest(req.method, req.message, config));
      } catch (e) {
        reject(e as Error);
      }
    });
  }
}

export const requestEmitter = <MsgType>(
  data: RequestRaw<MsgType>[]
): Readable => Readable.from(requestGenerator(data));
