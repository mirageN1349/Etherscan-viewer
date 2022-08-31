import s from './Block.module.scss';
import ethIcon from '../../assets/block/eth_icon.svg';
import { useState } from 'react';
import classNames from 'classnames';

type Props = {
  hash: Hex;
  number: Hex;
  timeStamp: SecondsTimestamp;
  tsxCount: number;
  onBlockClick: (blockNumber: Hex) => void;
};

export function Block({ hash, timeStamp, tsxCount, onBlockClick, number }: Props) {
  const [isActive, setIsActive] = useState(false);
  const onClick = () => {
    setIsActive(true);
    onBlockClick(number);
  };

  return (
    <div
      className={classNames(s.block, {
        [s.active]: isActive,
      })}
      onClick={onClick}
    >
      <div className={s.header}>
        {/* TODO: добавить троеточие посередине */}
        <p className={s.hash}>{hash}</p>
        <p className={s.date}>{new Date(+timeStamp * 1000).toLocaleString()}</p>
      </div>

      <div className={s.img}>
        <img src={ethIcon} alt="eth" />
      </div>

      <div className={s.footer}>
        <p className={s.count}>txs count: {tsxCount}</p>
        <p className={s.gasSum}>gas sum: 50 </p>
        <p className={s.valueSum}>value sum: 100</p>
      </div>
    </div>
  );
}
