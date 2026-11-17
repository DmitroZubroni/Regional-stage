/* A proposal, its signatures and the connected voters; no illustrative data. */
export default function ChampionshipHeroArt({className = '', width = 360, height = 210}) {
 return <svg viewBox="0 0 360 210" width={width} height={height} className={className} fill="none" aria-hidden="true">
 <path d="M36 50h288M36 106h288M36 162h288M76 22v168M284 22v168" stroke="var(--border)" strokeDasharray="2 7"/>
 <path d="M55 62h58M55 62v104h58M286 62h22v104h-22" stroke="var(--cyan-text)" strokeWidth="1.5"/>
 <g className="ballot-sheet"><path d="M104 26h128l28 28v130H104z" fill="var(--surface)" stroke="var(--field-border)"/>
 <path d="M232 26v28h28" fill="var(--surface-2)" stroke="var(--field-border)"/>
 <path d="M121 45h45M121 52h28" stroke="var(--text-muted)" strokeWidth="2"/>
 <path d="M122 77h32v32h-32z" fill="var(--primary-soft)" stroke="var(--cyan-text)"/>
 <path d="m130 91 7 7 12-15M170 84h69M170 94h49M122 126h116M122 134h86" stroke="var(--cyan-text)" strokeWidth="2" strokeLinecap="round"/>
 <path d="m123 162 8-10 5 8 8-5 5 7h27" stroke="var(--text-muted)" strokeWidth="1.5"/>
 <path d="m214 146 14 8v16l-14 8-14-8v-16z" fill="var(--gold-soft)" stroke="var(--gold-text)"/>
 <path d="m207 162 5 5 9-11" stroke="var(--gold-text)" strokeWidth="2"/>
 </g>
 {[ [43,50],[43,154],[296,50],[296,154] ].map(([x,y])=><g key={`${x}-${y}`} transform={`translate(${x} ${y})`}><rect width="24" height="24" rx="5" fill="var(--surface-2)" stroke="var(--cyan-text)"/><path d="M9 8a3 3 0 1 0 6 0 3 3 0 0 0-6 0ZM6 20v-2a6 6 0 0 1 12 0v2" stroke="var(--cyan-text)" strokeWidth="1.5"/></g>)}
 </svg>;
}
