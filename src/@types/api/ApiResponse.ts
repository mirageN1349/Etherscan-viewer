import { AxiosResponse } from 'axios';
import { EtherscanResult } from './Etherscan';

export type ApiResponse<T> = Promise<AxiosResponse<EtherscanResult<T>>>;
export type ApiStatus = '0' | '1';
export type ResponseStatus = 'error' | 'success';
