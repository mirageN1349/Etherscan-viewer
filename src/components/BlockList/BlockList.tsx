import { Block as IBlock } from '../../@types/entities/Block';
import { Block } from '../Block/Block';
import s from './BlockList.module.scss';

type Props = {
  blocks: IBlock[];
};

export function BlockList({ blocks }: Props) {
  return (
    <div className={s.blocks}>
      <h4 className={s.title}>Blocks list</h4>
      <div className={s.blockList}>
        {!blocks.length && <p className={s.emptyMsg}>Блоков нет</p>}
        {blocks.map(block => (
          <div key={block.timeStamp} className={s.block}>
            <Block blockNumber={block.blockNumber} timeStamp={block.timeStamp} />
          </div>
        ))}
      </div>
    </div>
  );
}
