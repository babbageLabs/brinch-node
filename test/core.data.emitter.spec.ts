import {expect} from 'chai';
import {
  getSchema,
  prepareRequest,
  requestEmitter,
} from '../src/core/core.data.emitter';
import {RequestRaw, SchemaType} from '../src/core/core.data.types';

import * as path from 'path';
import {Readable} from 'stream';
import * as process from 'process';

describe('Data Emmit', () => {
  interface MsgType {
    msg: string;
  }

  const test: MsgType = {msg: 'test'};

  it('should get schemas if a valid path is provided', () => {
    const method = 'test.method.ts';

    const schema = getSchema(method, SchemaType.Request, {
      path: path.join(process.cwd(), 'test', 'testData'),
    });
    expect(schema).to.be.an('object');
  });

  it('should throw an exception if schemas are not found', () => {
    const method = 'test.method.tss';

    const schema = () =>
      getSchema(method, SchemaType.Request, {
        path: path.join(process.cwd(), 'test', 'testData'),
      });
    expect(schema).to.throw();
  });

  it('should prepare a valid request given a method the right args', () => {
    const request = prepareRequest<MsgType>('test.method.ts', test, {
      schema: {
        path: path.join(process.cwd(), 'test', 'testData'),
      },
    });

    expect(request).to.be.an('object');
    expect(request.meta).to.be.an('object');
    expect(request.message).to.be.a('string');
    expect(request.message).to.be.equal(JSON.stringify(test));
  });

  it('should emit a valid request readable stream', () => {
    const msg: RequestRaw<MsgType> = {
      method: 'test.method.ts',
      message: test,
    };

    const requests = [msg, msg, msg];

    const readableStream = requestEmitter<MsgType>(requests);

    expect(readableStream).to.be.an('object');
    expect(readableStream).to.be.an.instanceOf(Readable);
  });
});
