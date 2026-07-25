import './achievements.css';

export default function Achievements() {
  return (
    <div className="achievements">
      <p className="achievements-title">Achievements</p>
      <div className="achievement-list">
        <div
          className="achievement-item"
          style={{
            backgroundImage: 'url(/SkillsUSA-logo.png)',
          }}
        >
          <p>SkillsUSA New York State Champion (x2)</p>
        </div>
        <div
          className="achievement-item"
          style={{
            backgroundImage: 'url(/2018cgac-removebg-preview.png)',
          }}
        >
          <p>City Wide Graphic Arts Competition 3rd place</p>
        </div>
      </div>
    </div>
  );
}
