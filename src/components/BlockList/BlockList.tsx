import { SingleValue } from 'react-select';
import { Block as IBlock } from '../../@types/entities/Block';
import { CardLayout } from '../../layouts/CardLayout';
import { Block } from '../Block/Block';
import { Loader } from '../UI/Loader/Loader';
import { Select, SelectOption } from '../UI/Select/Select';
import s from './BlockList.module.scss';

type Props = {
  blocks: IBlock[];
  isLoading: boolean;
  options: SelectOption<number>[];
  value: number;
  onBlockClick: (blockNumber: Hex) => void;
  onChange: (newValue: SingleValue<SelectOption<number>>) => void;
};

export function BlockList({ blocks, isLoading, options, value, onChange, onBlockClick }: Props) {
  return (
    <CardLayout sx={{ width: '1200px' }}>
      <div className={s.blocks}>
        <div className={s.headerWrapper}>
          <div className={s.titleWrapper}>
            <h4 className={s.title}>Blocks list</h4>
            {isLoading && <Loader />}
          </div>
          <Select onChange={onChange} value={value} options={options} />
        </div>
        <div className={s.blockList}>
          {!blocks.length && <p className="emptyMsg">Блоков нет</p>}
          {blocks.map(block => (
            <div key={block.timestamp} className={s.block}>
              <Block
                number={block.number}
                onBlockClick={onBlockClick}
                tsxCount={block.tsxCount}
                hash={block.hash}
                timeStamp={block.timestamp}
              />
            </div>
          ))}
        </div>
      </div>
    </CardLayout>
  );
}
