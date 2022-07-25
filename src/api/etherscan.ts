import { ApiResponse } from '../@types/api/ApiResponse';
import { Block } from '../@types/entities/Block';
import { Transaction } from '../@types/entities/Transaction';

import baseApi from './base';

export const getBlockByNumber = (blockNumber: UniqueString): ApiResponse<Block> => {
  return baseApi.get('', {
    params: {
      module: 'block',
      action: 'getblockreward',
      blockno: blockNumber,
    },
  });
};

export const getTransactionByHash = (hash: Hash): ApiResponse<Transaction> => {
  return baseApi.get('', {
    params: {
      //FIXME:
      module: 'tsx',
      //FIXME:
      action: 'gettsxbyhash',
      hash: hash,
    },
  });
};
