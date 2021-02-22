// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import '../../styles/global.css';

export function ExperienceBar() {
  return (
    <header className="experience-bar">
      <span>0 xp</span>
      <div>
        <div style={{ width: '50%' }} />

        <span className="current-experience" style={{ left: '50%' }}>
          {' '}
          300 xp
        </span>
      </div>
      <header>600 xp</header>
    </header>
  );
}
