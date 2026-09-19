import './button.scss';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  style?: React.CSSProperties;
};

export default function Button({ children, onClick, style }: ButtonProps) {
  return (
    <button className="button" onClick={onClick} style={style ?? {}}>
      {children}
    </button>
  );
}
