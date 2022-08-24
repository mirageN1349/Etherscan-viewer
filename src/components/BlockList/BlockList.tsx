import { SingleValue } from 'react-select';
import { Block as IBlock } from '../../@types/entities/Block';
import { Block } from '../Block/Block';
import { Loader } from '../UI/Loader/Loader';
import { Select, SelectOption } from '../UI/Select/Select';
import s from './BlockList.module.scss';

type Props = {
  blocks: IBlock[];
  isLoading: boolean;
  options: SelectOption<number>[];
  value: number;
  onChange: (newValue: SingleValue<SelectOption<number>>) => void;
};

export function BlockList({ blocks, isLoading, options, value, onChange }: Props) {
  return (
    <div className={s.blocks}>
      <div className={s.headerWrapper}>
        <div className={s.titleWrapper}>
          <h4 className={s.title}>Blocks list</h4>
          {isLoading && <Loader />}
        </div>
        <Select onChange={onChange} value={value} options={options} />
      </div>
      <div className={s.blockList}>
        {!blocks.length && <p className={s.emptyMsg}>Блоков нет</p>}
        {blocks.map(block => (
          <div key={block.timeStamp} className={s.block}>
            <Block tsxCount={block.tsxCount} blockNumber={block.blockNumber} timeStamp={block.timeStamp} />
          </div>
        ))}
      </div>
    </div>
  );
}
