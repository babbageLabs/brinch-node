import {z} from 'zod';

/** ********* Core ********* */
export enum SchemaType {
  Request = 'request',
  Response = 'response',
}

export type AppEndpoint = {
  description: string;
  name: string;
  [SchemaType.Request]: z.Schema;
  [SchemaType.Response]: z.Schema;
};

export type SchemaConfig = {
  path: string;
};

export type AppConfiguration = {
  schema: SchemaConfig;
};

/** ********* Requests ********* */
type RequestsMeta = {
  requestSchema: z.Schema;
  responseSchema: z.Schema;
};

type RequestsMessage = {};

export type Request = {
  meta: RequestsMeta;
  message: string; // json encoded ut58
};
