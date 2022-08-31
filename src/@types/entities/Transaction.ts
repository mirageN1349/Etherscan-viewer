export type Transaction = {
  blockHash: Hash;
  blockNumber: Hex;
  from: Address;
  to: Address;
  gas: Hex;
  value: Hex;
  hash: Hex;
};
