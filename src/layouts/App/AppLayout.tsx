import React, { useEffect, useState } from 'react';
import { SingleValue } from 'react-select';
import { Block } from '../../@types/entities/Block';
import { Transaction } from '../../@types/entities/Transaction';
import { BlockList } from '../../components/BlockList/BlockList';
import { TransactionInfo } from '../../components/TransactionInfo/TransactionInfo';
import { TransactionList } from '../../components/TransactionList/TransactionList';
import { SelectOption } from '../../components/UI/Select/Select';
import { options } from '../../constants/selectOptions';
import { useGetBlocksByValue } from '../../hooks/useGetBlocksByValue';
import { useRefetchLastBlock } from '../../hooks/useRefetchLastBlock';
import { hexToDecimalNumber } from '../../utils/toDecimalNumber';

import s from './AppLayout.module.scss';

export function AppLayout() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentTsx, setCurrentTsx] = useState<Transaction | null>(null);

  const [value, setValue] = useState(5);
  const [blocks, setBlocks] = useState<Block[]>([]);

  const { data: initialBlocks, isLoading: isBlocksLoading } = useGetBlocksByValue(value);
  const { data: lastBlock, isLoading: isLastBlockLoading } = useRefetchLastBlock(blocks);

  useEffect(() => {
    if (!initialBlocks.length) return;
    setBlocks(initialBlocks);
  }, [initialBlocks]);

  useEffect(() => {
    if (!lastBlock) return;
    setBlocks(prev => {
      const newBlocks = [lastBlock, ...prev];
      newBlocks.pop();
      return newBlocks;
    });
  }, [lastBlock]);

  const onSelect = (newOption: SingleValue<SelectOption<number>>) => {
    newOption && setValue(newOption.value);
  };

  const onBlockClick = (blockNumber: Hex) => {
    const tsx = blocks.find(b => b.number === blockNumber)?.transactions || [];
    setTransactions(tsx);
  };
  const onTsxClick = (hash: Hex) => {
    const tsx = transactions.find(t => t.hash === hash) || null;
    setCurrentTsx(tsx);
  };

  return (
    <div className="App">
      <BlockList
        onBlockClick={onBlockClick}
        onChange={onSelect}
        value={value}
        options={options}
        isLoading={isBlocksLoading || isLastBlockLoading}
        blocks={blocks}
      />
      <div className={s.wrapper}>
        <TransactionList onTsxClick={onTsxClick} transactions={transactions} />
        {currentTsx && (
          <TransactionInfo
            hash={currentTsx.hash}
            from={currentTsx.from}
            to={currentTsx.to}
            value={hexToDecimalNumber(currentTsx.value)}
          />
        )}
      </div>
    </div>
  );
}
