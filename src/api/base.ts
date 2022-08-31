import axios, { AxiosResponse } from 'axios';
import { ResponseStatus } from '../@types/api/ApiResponse';
import { EtherscanStatus } from '../@types/api/Etherscan';
import { Block } from '../@types/entities/Block';
import { Transaction } from '../@types/entities/Transaction';

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
baseApi.interceptors.response.use(
  (res: AxiosResponse<{ status: EtherscanStatus | ResponseStatus; result: Block | Transaction }>) => {
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

    // if(res.data.result.number) {
    //   res.data.result.number
    // }

    return res;
  }
);

// не оптимальное решение
// baseApi.interceptors.request.use(req => {
//   req.url += '&apikey=MKKX3XXB8RQG2J6839IS1FGPW9TMRSKKQ8';
//   return req;
// });

export default baseApi;
