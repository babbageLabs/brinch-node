import {z} from 'zod';

/** ********* Core ********* */
export interface Result<DataType> {
  data: DataType;
  error: Error[];
}

export enum SchemaType {
  Request = 'request',
  Response = 'response',
}

export enum RequestStatus {
  Pending = 'pending',
  Success = 'success',
  Error = 'error',
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
  method?: string;
  status?: RequestStatus;
};

export type Request = {
  id: string;
  meta: RequestsMeta;
  message: string; // json encoded ut58
};

export interface RequestRaw<MsgType> {
  method: string;
  message: MsgType;
}

export interface RequestMiddleware {
  (request: Request): Promise<Result<Request>>;
}
