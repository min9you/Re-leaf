import React from 'react';

export function BaseballKeyringVisual({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 250 280" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`select-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] ${className}`}
    >
      <defs>
        {/* Metal gradients */}
        <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8E9094" />
          <stop offset="30%" stopColor="#B3B5B8" />
          <stop offset="50%" stopColor="#D1D3D4" />
          <stop offset="70%" stopColor="#7A7D80" />
          <stop offset="100%" stopColor="#414345" />
        </linearGradient>
        
        <linearGradient id="metalHole" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#555" />
          <stop offset="100%" stopColor="#aaa" />
        </linearGradient>

        {/* Leather Gradients */}
        <radialGradient id="leatherShade" cx="50%" cy="50%" r="50%" fx="35%" fy="35%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="85%" stopColor="#FCFAF8" />
          <stop offset="100%" stopColor="#E6DDD4" />
        </radialGradient>

        {/* Badge Circle Gradient */}
        <linearGradient id="badgeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#30445C" />
          <stop offset="100%" stopColor="#1B2636" />
        </linearGradient>

        {/* Glow behind logo */}
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000" floodOpacity="0.15" />
        </filter>
        <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* --- METAL HARDWARE CHAIN/CLASP (Background layers) --- */}
      {/* Carabiner Clasp Top */}
      <path 
        d="M 125 10 C 138 10, 149 18, 149 32 C 149 42, 141 52, 131 58 L 131 66 L 119 66 L 119 58 C 109 52, 101 42, 101 32 C 101 18, 112 10, 125 10 Z" 
        fill="url(#metalGrad)" 
        stroke="#5A5C5E" 
        strokeWidth="1"
      />
      {/* Clasp Inner Hole */}
      <path 
        d="M 125 16 C 132 16, 141 22, 141 32 C 141 38, 137 44, 131 48 L 131 54 C 136 50, 143 42, 143 32 C 143 14, 131 11, 125 11 Z" 
        fill="#333" 
        opacity="0.1"
      />
      {/* Clasp Gate Detail */}
      <path 
        d="M 116 28 L 119 46 L 114 47 Z" 
        fill="#6E7073"
      />
      {/* Swivel Connector Ring */}
      <circle cx="125" cy="72" r="10" fill="none" stroke="url(#metalGrad)" strokeWidth="4.5" filter="url(#shadow)" />
      
      {/* --- LEATHER BODY --- */}
      {/* Leather Loop Holding Ring */}
      <path 
        d="M 114 74 L 136 74 L 132 106 L 118 106 Z" 
        fill="url(#leatherShade)" 
        stroke="#E2DAD2" 
        strokeWidth="1"
        filter="url(#shadow)"
      />
      <circle cx="125" cy="85" r="3.5" fill="url(#metalHole)" stroke="#5A5C5E" strokeWidth="0.5" />

      {/* Main Round Leather Base */}
      <circle cx="125" cy="180" r="64" fill="url(#leatherShade)" stroke="#E2DAD2" strokeWidth="1" filter="url(#shadow)" />

      {/* Leather edge burnishing (aesthetic border) */}
      <circle cx="125" cy="180" r="61" fill="none" stroke="#D3C9BE" strokeWidth="0.75" opacity="0.6" />

      {/* --- RED BASEBALL STITCHING --- */}
      {/* Left Stitches (array of angled lines overlapping the seam to form precise baseball ticks) */}
      <g stroke="#C23B30" strokeWidth="2.2" strokeLinecap="round" opacity="0.95">
        <line x1="84" y1="130" x2="90" y2="134" />
        <line x1="80" y1="140" x2="87" y2="144" />
        <line x1="77" y1="151" x2="84" y2="155" />
        <line x1="75" y1="162" x2="82" y2="166" />
        <line x1="74" y1="173" x2="81" y2="177" />
        <line x1="75" y1="184" x2="82" y2="187" />
        <line x1="77" y1="195" x2="84" y2="198" />
        <line x1="81" y1="206" x2="88" y2="209" />
        <line x1="86" y1="217" x2="92" y2="219" />
        <line x1="91" y1="227" x2="97" y2="229" />
      </g>
      {/* Left Stitches - complementary pair for V-shape */}
      <g stroke="#9C1E15" strokeWidth="2.2" strokeLinecap="round" opacity="0.95">
        <line x1="89" y1="131" x2="84" y2="136" />
        <line x1="86" y1="141" x2="81" y2="146" />
        <line x1="83" y1="151" x2="78" y2="157" />
        <line x1="81" y1="162" x2="76" y2="168" />
        <line x1="80" y1="173" x2="75" y2="179" />
        <line x1="81" y1="184" x2="76" y2="190" />
        <line x1="83" y1="195" x2="78" y2="201" />
        <line x1="87" y1="206" x2="82" y2="212" />
        <line x1="91" y1="217" x2="86" y2="223" />
        <line x1="96" y1="227" x2="91" y2="233" />
      </g>

      {/* Right Stitches */}
      <g stroke="#C23B30" strokeWidth="2.2" strokeLinecap="round" opacity="0.95">
        <line x1="166" y1="130" x2="160" y2="134" />
        <line x1="170" y1="140" x2="163" y2="144" />
        <line x1="173" y1="151" x2="166" y2="155" />
        <line x1="175" y1="162" x2="168" y2="166" />
        <line x1="176" y1="173" x2="169" y2="177" />
        <line x1="175" y1="184" x2="168" y2="187" />
        <line x1="173" y1="195" x2="166" y2="198" />
        <line x1="169" y1="206" x2="162" y2="209" />
        <line x1="164" y1="217" x2="158" y2="219" />
        <line x1="159" y1="227" x2="153" y2="229" />
      </g>
      {/* Right Stitches - complementary pair for V-shape */}
      <g stroke="#9C1E15" strokeWidth="2.2" strokeLinecap="round" opacity="0.95">
        <line x1="161" y1="131" x2="166" y2="136" />
        <line x1="164" y1="141" x2="169" y2="146" />
        <line x1="167" y1="151" x2="172" y2="157" />
        <line x1="169" y1="162" x2="174" y2="168" />
        <line x1="170" y1="173" x2="175" y2="179" />
        <line x1="169" y1="184" x2="174" y2="190" />
        <line x1="167" y1="195" x2="172" y2="201" />
        <line x1="163" y1="206" x2="168" y2="212" />
        <line x1="159" y1="217" x2="164" y2="223" />
        <line x1="154" y1="227" x2="159" y2="233" />
      </g>

      {/* --- CENTRAL RE:LEAF BADGE --- */}
      {/* Dark Metallic Blue Circle Shield */}
      <circle cx="125" cy="180" r="32" fill="url(#badgeGrad)" stroke="#23354A" strokeWidth="1.5" filter="url(#badgeShadow)" />
      
      {/* Outer Circle Accent */}
      <circle cx="125" cy="180" r="28" fill="none" stroke="#486180" strokeWidth="1" opacity="0.6" />

      {/* Green Re:leaf double-leaf symbol */}
      <g filter="url(#shadow)" transform="translate(108, 161)">
        {/* Underlay Leaf Stem */}
        <path d="M 12 28 C 14 21, 20 17, 25 15" stroke="#46A073" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Main Leaf Left */}
        <path d="M 16 26 C 9 19, 9 10, 18 10 C 24 13, 22 21, 16 26 Z" fill="#1A5235" stroke="#56B984" strokeWidth="1.2" />
        <path d="M 16 26 C 13 18, 14 13, 18 10" fill="none" stroke="#56B984" strokeWidth="1" opacity="0.5" />
        
        {/* Second Leaf Right */}
        <path d="M 17 21 C 24 16, 28 8, 20 6 C 15 9, 14 16, 17 21 Z" fill="#24784A" stroke="#66CDAA" strokeWidth="1.2" />
        <path d="M 17 21 C 18 14, 17 9, 20 6" fill="none" stroke="#66CDAA" strokeWidth="1" opacity="0.5" />
      </g>

      {/* --- ASYMMETRICAL HANGING ENGRAVED METAL TAG (Right Side) --- */}
      {/* Hanging Chain Loop */}
      <path d="M 154 132 C 158 116, 168 114, 182 120" fill="none" stroke="url(#metalGrad)" strokeWidth="2" filter="url(#shadow)" />
      
      {/* Metal Tag Body - Angled hanging down */}
      <g transform="translate(162, 122) rotate(15)" filter="url(#shadow)">
        {/* Metallic Plate */}
        <rect x="0" y="0" width="22" height="65" rx="4" fill="url(#metalGrad)" stroke="#5A5C5E" strokeWidth="0.75" />
        {/* Metal Plate Inner Shadow / Bevel */}
        <rect x="1" y="1" width="20" height="63" rx="3" fill="none" stroke="#FFF" strokeWidth="0.75" opacity="0.4" />
        
        {/* Hanging Hole */}
        <circle cx="11" cy="8" r="2.5" fill="#3A3C3E" stroke="#7A7D80" strokeWidth="0.5" />
        
        {/* Engraved Vertical text: '수집소재: 투수공구 가죽' */}
        <g fill="#212224" fontFamily="system-ui, -apple-system, sans-serif" fontSize="4.1" fontWeight="900" letterSpacing="0.4">
          <text x="6.5" y="19">수</text>
          <text x="6.5" y="24.5">집</text>
          <text x="6.5" y="30">소</text>
          <text x="6.5" y="35.5">재</text>
          <text x="6.5" y="41">:</text>
          <text x="6.5" y="46.5">투</text>
          <text x="6.5" y="52">수</text>
          <text x="7.5" y="57.5" fontSize="3.6" fontWeight="700">공</text>
        </g>
      </g>
    </svg>
  );
}
