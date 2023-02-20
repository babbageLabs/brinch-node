import {
  Request,
  RequestMiddleware,
  RequestStatus,
  Result,
} from '../core/core.data.types';

export const validateRequest: RequestMiddleware = async (
  req: Request
): Promise<Result<Request>> => {
  const errors: Error[] = [];
  let method: Function;
  if (req.meta.status === RequestStatus.Pending) {
    method = req.meta.requestSchema.parse;
  } else {
    method = req.meta.responseSchema.parse;
  }

  try {
    method(req.message);
  } catch (e) {
    errors.push(e as Error);
  }

  return {error: errors, data: req};
};
