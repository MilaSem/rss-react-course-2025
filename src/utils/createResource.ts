type Status = 'pending' | 'success' | 'error';

export const createResource = <T>(promise: Promise<T>) => {
  let status: Status = 'pending';
  let result: T | Error | null = null;

  const suspender = (async () => {
    try {
      const res = await promise;
      status = 'success';
      result = res;
    } catch (err: unknown) {
      status = 'error';
      if (err instanceof Error) {
        result = err;
      } else {
        result = new Error(String(err));
      }
    }
  })();

  return {
    read: (): T => {
      if (status === 'pending') {
        throw suspender;
      }
      if (status === 'success') {
        return result as T;
      }
      if (status === 'error') {
        if (result instanceof Error) {
          throw result;
        } else {
          throw new Error('Unknown error');
        }
      }
      throw new Error('Unexpected state');
    },
  };
};
