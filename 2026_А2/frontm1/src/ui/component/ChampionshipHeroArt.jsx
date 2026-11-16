import React from 'react'

export default function ChampionshipHeroArt({ className = '', width = 360, height = 210 }) {
  return (
    <svg
      viewBox="0 0 360 210"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-300 ${className}`}
      role="img"
      aria-label="Professionals 2026 Championship Trophy & Consensus Voting Illustration"
    >
      <defs>
        {/* Glow Filters */}
        <filter id="champGoldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="champCobaltGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Gradients */}
        <linearGradient id="podiumGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="goldTrophyGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="cobaltGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="cardBgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E293B" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0B132B" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* Decorative Stadium Arena Track Rings */}
      <ellipse cx="180" cy="115" rx="140" ry="60" fill="none" stroke="#2563EB" strokeOpacity="0.15" strokeWidth="1.5" />
      <ellipse cx="180" cy="115" rx="110" ry="45" fill="none" stroke="#F59E0B" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="4 6" />

      {/* Championship Podium Base */}
      <g transform="translate(110, 105)">
        {/* Place 2 (Left) */}
        <path d="M0 40 L 40 30 L 40 70 L 0 70 Z" fill="url(#podiumGrad)" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
        <text x="20" y="55" fill="#94A3B8" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">2</text>

        {/* Place 1 (Center) */}
        <path d="M40 20 L 100 20 L 100 70 L 40 70 Z" fill="url(#podiumGrad)" stroke="#F59E0B" strokeWidth="1.5" />
        <rect x="40" y="20" width="60" height="4" fill="#F59E0B" />
        <text x="70" y="52" fill="#FDE68A" fontSize="18" fontWeight="900" textAnchor="middle" fontFamily="monospace">1</text>

        {/* Place 3 (Right) */}
        <path d="M100 30 L 140 40 L 140 70 L 100 70 Z" fill="url(#podiumGrad)" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
        <text x="120" y="58" fill="#94A3B8" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">3</text>
      </g>

      {/* Gold Champion Trophy on 1st Place */}
      <g transform="translate(180, 52)">
        {/* Trophy Base & Stem */}
        <rect x="-14" y="56" width="28" height="6" rx="2" fill="#78350F" stroke="#F59E0B" strokeWidth="1" />
        <rect x="-4" y="44" width="8" height="12" fill="url(#goldTrophyGrad)" />
        {/* Trophy Cup */}
        <path
          d="M-22 14 C -22 38, -12 44, 0 44 C 12 44, 22 38, 22 14 Z"
          fill="url(#goldTrophyGrad)"
          stroke="#FFFBEB"
          strokeWidth="1.2"
          filter="url(#champGoldGlow)"
        />
        {/* Handles */}
        <path d="M-22 18 C -32 18, -32 32, -18 34" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M22 18 C 32 18, 32 32, 18 34" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        {/* Star in Cup */}
        <path d="M0 20 L 2 25 L 7 26 L 3 29 L 4 34 L 0 31 L -4 34 L -3 29 L -7 26 L -2 25 Z" fill="#FFFBEB" />
      </g>

      {/* Floating Left Card: Competition Stopwatch & Module Timer */}
      <g transform="translate(24, 48)">
        <rect
          width="95"
          height="105"
          rx="14"
          fill="url(#cardBgGrad)"
          stroke="rgba(56, 189, 248, 0.35)"
          strokeWidth="1.2"
        />
        <text x="47" y="20" fill="#94A3B8" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ТАЙМЕР ЭТАПА</text>

        {/* Stopwatch Dial */}
        <circle cx="47" cy="48" r="18" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" filter="url(#champCobaltGlow)" />
        <line x1="47" y1="30" x2="47" y2="26" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
        <line x1="47" y1="48" x2="57" y2="40" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="47" cy="48" r="2.5" fill="#FFFFFF" />

        <text x="47" y="78" fill="#F8FAFC" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="monospace">03:45:12</text>
        <text x="47" y="90" fill="#38BDF8" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">МОДУЛЬ А2: ГОЛОСОВАНИЕ</text>
      </g>

      {/* Floating Right Card: Consensus & Proposal Metrics */}
      <g transform="translate(240, 48)">
        <rect
          width="95"
          height="105"
          rx="14"
          fill="url(#cardBgGrad)"
          stroke="rgba(245, 158, 11, 0.35)"
          strokeWidth="1.2"
        />
        <text x="47" y="20" fill="#94A3B8" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">КВОРУМ DAO</text>

        {/* Ballot Progress Gauge */}
        <circle cx="47" cy="50" r="18" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="3" />
        <circle
          cx="47"
          cy="50"
          r="18"
          fill="none"
          stroke="url(#cobaltGrad)"
          strokeWidth="3.5"
          strokeDasharray="113"
          strokeDashoffset="28"
          strokeLinecap="round"
          transform="rotate(-90 47 50)"
        />
        <text x="47" y="54" fill="#38BDF8" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">75%</text>

        <text x="47" y="78" fill="#10B981" fontSize="8" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">КВОРУМ ДОСТИГНУТ</text>
        <text x="47" y="90" fill="#94A3B8" fontSize="6" textAnchor="middle" fontFamily="monospace">ГОЛОСОВ: 24 / 32</text>
      </g>

      {/* Floating Gold Sparkles & Laurels */}
      <path d="M125 35 C 115 45, 115 65, 130 75" fill="none" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M235 35 C 245 45, 245 65, 230 75" fill="none" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="55" cy="28" r="2" fill="#38BDF8" opacity="0.8" />
      <circle cx="305" cy="30" r="2" fill="#F59E0B" opacity="0.8" />
      <circle cx="180" cy="188" r="2" fill="#10B981" opacity="0.7" />
    </svg>
  )
}
