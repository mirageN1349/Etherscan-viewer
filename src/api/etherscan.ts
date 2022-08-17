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

export const getBlockTsxCountByNumber = (blockNumber: UniqueString): ApiResponse<string> => {
  return baseApi.get('', {
    params: {
      module: 'proxy',
      action: 'eth_getBlockTransactionCountByNumber',
      tag: '0x' + parseInt(blockNumber, 10).toString(16),
    },
  });
};

export const getLastBlockNumber = (): ApiResponse<string> => {
  return baseApi.get('', {
    params: {
      module: 'block',
      action: 'getblocknobytime',
      closest: 'before',
      timestamp: Math.floor(Date.now() / 1000),
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
