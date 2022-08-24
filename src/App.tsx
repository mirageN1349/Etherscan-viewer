import React, { useEffect, useState } from 'react';
import { SingleValue } from 'react-select';
import { Block } from './@types/entities/Block';
import { getBlockByNumber, getBlockTsxCountByNumber, getLastBlockNumber } from './api/etherscan';
import { BlockList } from './components/BlockList/BlockList';
import { SelectOption } from './components/UI/Select/Select';
import { wait } from './utils/wait';

const options = [
  {
    value: 5,
    label: '5',
  },
  {
    value: 10,
    label: '10',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 100,
    label: '100',
  },
];

function App() {
  const REFRESH_RATE = 3000;
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(5);

  useEffect(() => {
    const getBlocks = async () => {
      setBlocks([]);
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
        const { data: tsxCountData } = await getBlockTsxCountByNumber(data.result.blockNumber);

        const block: Block = {
          ...data.result,
          tsxCount: +tsxCountData.result,
        };

        setBlocks(prev => [...prev, block]);
        await wait(200);
      }
      setIsLoading(false);
    };

    getBlocks();
  }, [value]);

  useEffect(() => {
    const refetchLastBlock = async () => {
      if (blocks.length < 1) return;
      const lastBLock = blocks.at(0) as Block;
      const nextBlockNumber = String(+lastBLock.blockNumber + 1);
      try {
        setIsLoading(true);
        const { data } = await getBlockByNumber(nextBlockNumber);
        if (data.status === 'error') return;

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
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const intervalId = setInterval(refetchLastBlock, REFRESH_RATE);
    return () => clearInterval(intervalId);
  }, [blocks]);

  const onSelect = (newOption: SingleValue<SelectOption<number>>) => {
    newOption && setValue(newOption.value);
  };

  return (
    <div className="App">
      <BlockList onChange={onSelect} value={value} options={options} isLoading={isLoading} blocks={blocks} />
    </div>
  );
}

export default App;
