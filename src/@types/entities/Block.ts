import { Transaction } from './Transaction';

export type Block = {
  number: Hex;
  hash: Hex;
  timestamp: SecondsTimestamp;
  tsxCount: number;
  transactions: Transaction[];
};
