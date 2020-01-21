import Request from './request';
import * as middlewares from './middlewares';

const inst = new Request(
  {
    baseUrl: process.env.REACT_APP_API_BASE,
    type: 'json',
  },
  [middlewares.timeout, middlewares.http, middlewares.json, middlewares.baseUrl, middlewares.params, middlewares.type],
);

export default inst;
export { Request, middlewares };
