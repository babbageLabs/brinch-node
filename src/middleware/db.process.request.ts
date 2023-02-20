/*
 * We use this module to process all db requests
 * the method refers to the stored procedure name
 * the params are the parameters to be passed to the
 * stored procedure are the request payload
 */

import {Request, RequestMiddleware, Result} from '../core/core.data.types';

export const dbProcessRequest: RequestMiddleware = async (
  req: Request
): Promise<Result<Request>> => {
  return new Promise(resolve => {
    resolve({error: [], data: req});
  });
};
