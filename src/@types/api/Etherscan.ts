export type EtherscanResult<T> = {
  message: string;
  status: number;
  result: T;
};
