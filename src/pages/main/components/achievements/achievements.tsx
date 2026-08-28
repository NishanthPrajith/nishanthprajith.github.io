import './achievements.scss';

export default function Achievements() {
  return (
    <div className="achievements">
      <p className="achievements-title">Achievements</p>
      <div className="achievement-list">
        <div className="achievement-item">
          <div
            className="achievement-item-image"
            style={{
              backgroundImage: 'url(/images/SkillsUSA-logo.png)',
            }}
          />
          <p>SkillsUSA New York State Champion (x2)</p>
        </div>
        <div className="achievement-item">
          <div
            className="achievement-item-image"
            style={{
              backgroundImage: 'url(/images/2018cgac-removebg-preview.png)',
            }}
          />
          <p>City Wide Graphic Arts Competition 3rd place</p>
        </div>
      </div>
    </div>
  );
}
