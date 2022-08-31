import React from 'react';
import s from './Transaction.module.scss';

type Props = {
  hash: Hex;
};

export function Transaction({ hash }: Props) {
  return (
    <div className={s.transaction}>
      <p>Tx hash</p> <p className={s.hash}>{hash}</p>
    </div>
  );
}
