export default function ChampionshipHeroArt({className = '', width = 360, height = 210}) {
 return <svg viewBox="0 0 360 210" width={width} height={height} className={className} fill="none" aria-hidden="true">
 <rect x="64" y="32" width="232" height="150" rx="16" fill="var(--surface-2)" stroke="var(--field-border)"/>
 <path d="M88 62h184M88 150h184" stroke="var(--border)" strokeWidth="2"/>
 <rect x="96" y="82" width="36" height="36" rx="8" fill="var(--primary-soft)" stroke="var(--cyan-text)"/>
 <path d="m104 100 7 7 14-17M152 92h96M152 108h64" stroke="var(--cyan-text)" strokeWidth="4" strokeLinecap="round"/>
 <path d="M42 122v54a24 24 0 0 0 24 24h176" stroke="var(--cyan-text)" strokeWidth="2" strokeDasharray="6 6"/>
 </svg>;
}