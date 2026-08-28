import './button.scss';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  style?: React.CSSProperties;
  hideBorder?: boolean;
};

export default function Button({
  children,
  onClick,
  style,
  hideBorder = false,
}: ButtonProps) {
  return (
    <button
      className={`button ${hideBorder ? 'hide-border' : ''}`}
      onClick={onClick}
      style={style ?? {}}
    >
      {children}
    </button>
  );
}
