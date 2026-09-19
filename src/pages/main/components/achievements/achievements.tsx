import LeafIcon from './icons/leaf-icon';
import './achievements.scss';

export default function Achievements() {
  const color = 'var(--code-text-color)';

  return (
    <section className="achievements">
      <section className="achievements-item">
        <LeafIcon fill={color} />
        <p style={{ color: color }}>SkillsUSA New York State Champion 2017</p>
        <LeafIcon fill={color} />
      </section>
      <section className="achievements-item">
        <LeafIcon fill={color} />
        <p style={{ color: color }}>SkillsUSA New York State Champion 2018</p>
        <LeafIcon fill={color} />
      </section>
      <section className="achievements-item">
        <LeafIcon fill={color} />
        <p style={{ color: color }}>
          City Wide Graphic Arts Competition 3rd place 2018
        </p>
        <LeafIcon fill={color} />
      </section>
    </section>
  );
}
