import './logo.css';

export default function Logo({ className }: { className?: string }) {
  return (
    <p className={`logo ${className}`}>
      <span>
        <span className="largeText">N</span>
        <span className="mediumText">ISHANT</span>
        <span className="largeText">H</span>
      </span>
      <span className="subText">Prajith</span>
    </p>
  );
}
