import './code-content.scss';

export default function CodeContent({ code }: { code: React.ReactNode }) {
  return (
    <div className="code-content project-dynamic-content">
      <pre>{code}</pre>
    </div>
  );
}
