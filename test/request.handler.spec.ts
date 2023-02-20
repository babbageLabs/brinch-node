import RequestHandler from '../src/handlers/request.handler';
import {requestEmitter} from '../src/core/core.data.emitter';
import {RequestRaw} from '../src/core/core.data.types';

describe('Request handler', () => {
  interface MsgType {
    msg: string;
  }

  const test: MsgType = {msg: 'test'};

  it('should handle the validation of a request, process it and validate the response', async () => {
    const msg: RequestRaw<MsgType> = {
      method: 'test.method.ts',
      message: test,
    };

    const requests = [msg, msg, msg];

    const readableStream = requestEmitter<MsgType>(requests);
    const response = await RequestHandler(readableStream);

    console.log(1111111111111111111, response);
  });
});
