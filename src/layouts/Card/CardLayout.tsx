import { CSSProperties, PropsWithChildren } from 'react';
import s from './CardLayout.module.scss';

type Props = PropsWithChildren<{
  sx?: CSSProperties;
}>;

export function CardLayout({ children, sx }: Props) {
  return (
    <div style={sx} className={s.layout}>
      {children}
    </div>
  );
}
