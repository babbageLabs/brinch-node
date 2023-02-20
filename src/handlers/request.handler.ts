import {Readable, Transform, pipeline} from 'stream';
import CoreRequestHandler from '../core/core.request.handler';
import {validateRequest} from '../middleware/core.validate.request';
import {dbProcessRequest} from '../middleware/db.process.request';

const RequestHandler = async (dataStream: Readable): Promise<any> => {
  const preRequestHandler = new CoreRequestHandler();
  preRequestHandler.registerMiddleware(validateRequest);

  const requestHandler = new CoreRequestHandler();
  requestHandler.registerMiddleware(dbProcessRequest);

  const postRequestHandler = new CoreRequestHandler();
  postRequestHandler.registerMiddleware(validateRequest);

  return pipeline<Readable, Transform, Transform, Transform>(
    dataStream,
    preRequestHandler,
    requestHandler,
    postRequestHandler
  );
};

export default RequestHandler;
