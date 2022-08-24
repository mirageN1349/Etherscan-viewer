import axios, { AxiosResponse } from 'axios';
import { ApiStatus, ResponseStatus } from '../@types/api/ApiResponse';

if (!process.env.REACT_APP_ETHERSCAN_API_KEY) {
  throw new Error('Added to .env file REACT_APP_ETHERSCAN_API_KEY !!');
}

const baseApi = axios.create({
  baseURL: 'https://api.etherscan.io/api',
  params: {
    apikey: process.env.REACT_APP_ETHERSCAN_API_KEY,
  },
});

// request ----> server
// server response ({status: 0}) ---> browser -> interceptor ({status: 'error'}) -> dom
baseApi.interceptors.response.use((res: AxiosResponse<{ status: ApiStatus | ResponseStatus }>) => {
  switch (res.data.status) {
    case '0':
      res.data.status = 'error';
      break;
    case '1':
      res.data.status = 'success';
      break;
    default:
      break;
  }

  return res;
});

// не оптимальное решение
// baseApi.interceptors.request.use(req => {
//   req.url += '&apikey=MKKX3XXB8RQG2J6839IS1FGPW9TMRSKKQ8';
//   return req;
// });

export default baseApi;
