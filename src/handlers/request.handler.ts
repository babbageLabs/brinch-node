import * as s from 'stream';
import * as sp from 'stream/promises';
import CoreRequestHandler from '../core/core.request.handler';
import {validateRequest} from '../middleware/core.validate.request';
import {dbProcessRequest} from '../middleware/db.process.request';

const RequestHandler = async (dataStream: s.Readable): Promise<any> => {
  const preRequestHandler = new CoreRequestHandler();
  preRequestHandler.registerMiddleware(validateRequest);

  const requestHandler = new CoreRequestHandler();
  requestHandler.registerMiddleware(dbProcessRequest);

  const postRequestHandler = new CoreRequestHandler();
  postRequestHandler.registerMiddleware(validateRequest);

  return sp.pipeline<s.Readable, s.Transform, s.Transform, s.Transform>(
    dataStream,
    preRequestHandler,
    requestHandler,
    postRequestHandler
  );
};

export default RequestHandler;
