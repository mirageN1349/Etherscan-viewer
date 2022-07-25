import axios from 'axios';

if (!process.env.REACT_APP_ETHERSCAN_API_KEY) {
  throw new Error('Added to .env file REACT_APP_ETHERSCAN_API_KEY !!');
}

const baseApi = axios.create({
  baseURL: 'https://api.etherscan.io/api',
  params: {
    apikey: process.env.REACT_APP_ETHERSCAN_API_KEY,
  },
});

// не оптимальное решение
// baseApi.interceptors.request.use(req => {
//   req.url += '&apikey=MKKX3XXB8RQG2J6839IS1FGPW9TMRSKKQ8';
//   return req;
// });

export default baseApi;
