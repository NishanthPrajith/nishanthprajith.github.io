import './rich-text-section.scss';

import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  style?: React.CSSProperties & { '--width'?: string };
};

export default function RichTextSection({ children, style = {} }: Props) {
  return (
    <section className="text-section" style={style}>
      <div className="text-section-grid">
        <div className="text-section-content">{children}</div>
      </div>
    </section>
  );
}
