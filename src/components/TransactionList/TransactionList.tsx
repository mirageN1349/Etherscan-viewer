import React from 'react';
import { Transaction as ITransaction } from '../../@types/entities/Transaction';
import { CardLayout } from '../../layouts/Card/CardLayout';
import { Transaction } from '../Transaction/Transaction';

import s from './TransactionList.module.scss';

type Props = {
  transactions: ITransaction[];
  onTsxClick: (hash: Hash) => void;
};

export function TransactionList({ transactions, onTsxClick }: Props) {
  return (
    <CardLayout sx={{ width: '750px', overflowY: 'auto', height: '320px' }}>
      <div className={s.transactions}>
        <div className={s.headerWrapper}>
          <div className={s.titleWrapper}>
            <h4 className={s.title}>Transaction list</h4>
          </div>
        </div>
        {!transactions.length && <p className="emptyMsg">Транзакций нет</p>}
        {transactions.map(({ hash }) => (
          <Transaction onTsxClick={onTsxClick} hash={hash} />
        ))}
      </div>
    </CardLayout>
  );
}
