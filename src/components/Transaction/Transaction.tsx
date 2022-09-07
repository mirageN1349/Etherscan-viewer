import React from 'react';
import s from './Transaction.module.scss';

type Props = {
  hash: Hex;
  onTsxClick: (hash: Hash) => void;
};

export function Transaction({ hash, onTsxClick }: Props) {
  const onClick = () => onTsxClick(hash);
  return (
    <div onClick={onClick} className={s.transaction}>
      <p>Tx hash</p> <p className={s.hash}>{hash}</p>
    </div>
  );
}
