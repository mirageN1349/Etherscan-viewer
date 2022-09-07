import { useEffect, useState } from 'react';
import { Block } from '../@types/entities/Block';
import { getBlockByNumber } from '../api/etherscan';
import { hexToDecimalNumber } from '../utils/toDecimalNumber';
import { useLoading } from './useLoading';

export const useRefetchLastBlock = (blocks: Block[]) => {
  const REFRESH_RATE = 3000;
  const { isLoading, setIsLoading } = useLoading();
  const [lastBlock, setLastBlock] = useState<Block | null>(null);

  useEffect(() => {
    const refetchLastBlock = async () => {
      if (blocks.length < 1) return;
      const lastBLock = blocks.at(0) as Block;
      const nextBlockNumber = String(hexToDecimalNumber(lastBLock.number) + 1);

      try {
        setIsLoading(true);
        const { data } = await getBlockByNumber(nextBlockNumber);
        if (data.status === 'error') return;

        const tsxCount = data.result.transactions.length;

        const block: Block = {
          ...data.result,
          tsxCount,
        };

        setLastBlock(block);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const intervalId = setInterval(refetchLastBlock, REFRESH_RATE);
    return () => clearInterval(intervalId);
  }, [blocks]);

  return {
    data: lastBlock,
    isLoading,
  };
};
