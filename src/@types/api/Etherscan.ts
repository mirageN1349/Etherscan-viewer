export type EtherscanResult<T> = {
  message: string;
  status: string;
  result: T;
};
