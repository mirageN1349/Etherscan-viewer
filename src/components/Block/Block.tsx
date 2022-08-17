import s from './Block.module.scss';
import ethIcon from '../../assets/block/eth_icon.svg';

type Props = {
  blockNumber: UniqueString;
  timeStamp: SecondsTimestamp;
};

export function Block({ blockNumber, timeStamp }: Props) {
  return (
    <div className={s.block}>
      <div className={s.header}>
        <p className={s.hash}>0xafb...as4fs</p>
        <p className={s.date}>28 авг</p>
      </div>

      <div className={s.img}>
        <img src={ethIcon} alt="eth" />
      </div>

      <div className={s.footer}>
        <p className={s.count}>txs count: 100</p>
        <p className={s.gasSum}>gas sum: 50 </p>
        <p className={s.valueSum}>value sum: 100</p>
      </div>
    </div>
  );
}
