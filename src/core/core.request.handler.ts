import * as stream from 'stream';
import {Request, RequestMiddleware} from './core.data.types';

class CoreRequestHandler extends stream.Transform {
  private middleware: RequestMiddleware[] = [];

  constructor() {
    super({
      objectMode: true,
    });
  }

  _transform(
    chunk: Request,
    encoding: BufferEncoding,
    callback: stream.TransformCallback
  ) {
    let errors: Error[] = [];
    (async () => {
      errors = await this._executeMiddleware(chunk);
    })();

    // const errors = this._executeMiddleware(chunk)
    if (errors.length > 0) {
      callback(errors.pop(), chunk);
      return;
    }
    // if no error, proceed with the request execution
    callback(null, chunk);
  }

  /*
   *  Execute middleware registered in the pipeline
   */
  private async _executeMiddleware(chunk: Request): Promise<Error[]> {
    for (const func of this.middleware) {
      const result = await func(chunk);
      if (result.error) {
        return result.error;
      }
    }

    return [];
  }

  registerMiddleware(middleware: RequestMiddleware) {
    this.middleware.push(middleware);
  }
}

export default CoreRequestHandler;
