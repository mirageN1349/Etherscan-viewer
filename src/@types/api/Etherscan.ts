import { ResponseStatus } from './ApiResponse';

export type EtherscanResult<T> = {
  message: string;
  status: ResponseStatus;
  result: T;
};

export type EtherscanStatus = '0' | '1';
