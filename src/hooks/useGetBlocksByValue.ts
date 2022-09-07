import { useEffect, useState } from 'react';
import { Block } from '../@types/entities/Block';
import { getBlockByNumber, getLastBlockNumber } from '../api/etherscan';
import { wait } from '../utils/wait';
import { useLoading } from './useLoading';

export const useGetBlocksByValue = (value: number) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    const getBlocks = async () => {
      setIsLoading(true);
      const { data } = await getLastBlockNumber();
      const lastBlockNumber = data.result;

      const blocksIds = new Array(value)
        .fill('')
        .map((_, i) => i)
        .map(i => String(+lastBlockNumber - i));

      for (const n of blocksIds) {
        const { data } = await getBlockByNumber(n);

        if (data.status === 'error') continue;

        const tsxCount = data.result.transactions.length;

        const block: Block = {
          ...data.result,
          tsxCount,
        };

        setBlocks(prev => [...prev, block]);
        await wait(200);
      }
      setIsLoading(false);
    };

    getBlocks();
  }, [value]);

  return {
    isLoading,
    data: blocks,
  };
};
