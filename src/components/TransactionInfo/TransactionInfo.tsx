import React from 'react';
import { CardLayout } from '../../layouts/Card/CardLayout';

import s from './TransactionInfo.module.scss';

type Props = {
  from: Address;
  to: Address;
  value: number;
  hash: Hash;
};

export function TransactionInfo({ from, to, value, hash }: Props) {
  const options = [
    {
      name: 'H',
      value: hash,
    },
    {
      name: 'F',
      value: from,
    },
    {
      name: 'T',
      value: to,
    },
    {
      name: 'V',
      value,
    },
  ];
  return (
    <CardLayout sx={{ width: '410px' }}>
      <div>
        <div className={s.headerWrapper}>
          <div className={s.titleWrapper}>
            <h4 className={s.title}>Transaction Info</h4>
          </div>
        </div>
        <div className={s.ulWrapper}>
          {options.map(({ name, value }) => (
            <div className={s.item}>
              <div className={s.set}>{name}</div> <p>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </CardLayout>
  );
}
