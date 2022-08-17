import React, { useEffect, useState } from 'react';
import { Block } from './@types/entities/Block';
import { getBlockByNumber, getBlockTsxCountByNumber, getLastBlockNumber } from './api/etherscan';
import { BlockList } from './components/BlockList/BlockList';
import { wait } from './utils/wait';

function App() {
  const BlOCKS_COUNT = 20;
  const REFRESH_RATE = 3000;
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    const getBlocks = async () => {
      const { data } = await getLastBlockNumber();
      const lastBlockNumber = data.result;

      const blocksIds = new Array(BlOCKS_COUNT)
        .fill('')
        .map((_, i) => i)
        .map(i => String(+lastBlockNumber - i));

      for (const n of blocksIds) {
        const { data } = await getBlockByNumber(n);
        const { data: tsxCountData } = await getBlockTsxCountByNumber(data.result.blockNumber);

        const block: Block = {
          ...data.result,
          tsxCount: +tsxCountData.result,
        };

        setBlocks(prev => [...prev, block]);
        await wait(200);
      }
    };

    getBlocks();
  }, []);

  useEffect(() => {
    const refetchLastBlock = async () => {
      if (blocks.length < 1) return;
      const lastBLock = blocks.at(0) as Block;
      const nextBlockNumber = String(+lastBLock.blockNumber + 1);
      const { data } = await getBlockByNumber(nextBlockNumber);

      if (data.status === '0') return;

      const { data: tsxCountData } = await getBlockTsxCountByNumber(data.result.blockNumber);

      const block: Block = {
        ...data.result,
        tsxCount: +tsxCountData.result,
      };

      setBlocks(prev => {
        const newBlocks = [block, ...prev];
        newBlocks.pop();
        return newBlocks;
      });
    };

    const intervalId = setInterval(refetchLastBlock, REFRESH_RATE);
    return () => clearInterval(intervalId);
  }, [blocks]);

  return (
    <div className="App">
      <BlockList blocks={blocks} />
    </div>
  );
}

export default App;

// 7 [7, 6, 1, 2] 3
