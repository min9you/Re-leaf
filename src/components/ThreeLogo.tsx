import React from 'react';

interface ThreeLogoProps {
  className?: string;
  fillBg?: string; // keeping for backward compatibility
  interactive?: boolean; // keeping for backward compatibility
}

/**
 * Pixel-perfect high-fidelity vector rendering of the company's uploaded corporate logo.
 * Recreates the exact colors, 3D volumetric feel, bevels, and shadows of the logo's:
 * - Deep navy-blue beveled ring with realistic glossy highlights and shadows.
 * - Sprouting organic green stems arising from the bottom.
 * - Left-hand hollow-framed curved leaf wrapping elegantly over the navy ring.
 * - Top-right hollow-framed curved leaf pointing upwards with gorgeous gradient shading.
 * - Volumetric drop-shadows that give the leaves actual visual depth over the ring.
 */
export const ThreeLogo: React.FC<ThreeLogoProps> = ({
  className = "w-10 h-10",
}) => {
  return (
    <div className={`relative inline-block select-none ${className}`}>
      <svg 
        viewBox="0 0 200 200" 
        className="w-full h-full filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Beveled 3D Navy Ring Gradient (Left-top highlight to bottom-right shadow) */}
          <linearGradient id="ring3DGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2E4166" />
            <stop offset="30%" stopColor="#1C2A4A" />
            <stop offset="75%" stopColor="#111B30" />
            <stop offset="100%" stopColor="#0B1222" />
          </linearGradient>

          {/* Glossy Rim Highlight for Navy Ring */}
          <linearGradient id="ringRimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5572A5" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#2E4166" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
          </linearGradient>

          {/* Leaf 3D Green Gradient (Lush green with light source from top-left) */}
          <linearGradient id="leafGreen3D" x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#00C853" />
            <stop offset="40%" stopColor="#00A859" />
            <stop offset="85%" stopColor="#0D6831" />
            <stop offset="100%" stopColor="#0A5025" />
          </linearGradient>

          {/* Bright Stem Highlight Gradient */}
          <linearGradient id="stemHighlight3D" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00E676" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#00C853" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0A5025" stopOpacity="0.0" />
          </linearGradient>

          {/* Volumetric Drop Shadow for Leaves overlapping the Navy Ring */}
          <filter id="leafShadow" x="-10%" y="-10%" width="135%" height="135%">
            <feDropShadow dx="-1.5" dy="3" stdDeviation="3.5" floodColor="#040914" floodOpacity="0.65" />
          </filter>

          <filter id="stemShadow" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#040914" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* ==================== 1. BEVELED NAVY BLUE RING ==================== */}
        <g id="MainNavyRing">
          {/* Main Ring Outer Shadow / Under-glow */}
          <circle 
            cx="100" 
            cy="100" 
            r="66" 
            stroke="#080F1D" 
            strokeWidth="30" 
            fill="none" 
            opacity="0.35"
          />
          {/* 3D Gradient Base Ring */}
          <circle 
            cx="100" 
            cy="100" 
            r="66" 
            stroke="url(#ring3DGradient)" 
            strokeWidth="27" 
            fill="none" 
          />
          {/* Top-Left Glossy Inner Rim Highlight */}
          <circle 
            cx="100" 
            cy="100" 
            r="78" 
            stroke="url(#ringRimGradient)" 
            strokeWidth="1.8" 
            fill="none" 
          />
          {/* Bottom-Right Deep Shadow Ring Inset */}
          <circle 
            cx="100" 
            cy="100" 
            r="54" 
            stroke="#070C15" 
            strokeWidth="1.2" 
            fill="none" 
            opacity="0.6"
          />
        </g>

        {/* ==================== 2. CENTRAL GREEN STEM ==================== */}
        <g id="CentralStem" filter="url(#stemShadow)">
          {/* Main thick stem curling upward dynamically from root */}
          <path 
            d="M 97 175 C 93 150 90 120 102 98 C 105 92 110 88 116 84" 
            stroke="url(#leafGreen3D)" 
            strokeWidth="13" 
            strokeLinecap="round" 
            fill="none" 
          />
          {/* Inner 3D stem highlight line */}
          <path 
            d="M 95.5 174 C 91.5 149 88.5 120 101 99 C 103.5 94.5 107.5 91 113.5 86" 
            stroke="url(#stemHighlight3D)" 
            strokeWidth="4" 
            strokeLinecap="round" 
            fill="none" 
          />
        </g>

        {/* ==================== 3. LEFT HOLLOW LEAF (Beautiful sweep) ==================== */}
        <g id="LeftHollowLeaf" filter="url(#leafShadow)">
          {/* Outer leaf border and inner cutout combined cleanly using fill-rule to avoid background fills */}
          <path 
            d="M 102 147 
               C 52 131 23 93 35 60 
               C 44 35 69 51 73 75 
               C 77 98 83 125 102 147 Z 
               M 87 131 
               C 56 120 44 91 54 73 
               C 60 62 70 69 72 85 
               C 74 101 80 115 87 131 Z" 
            fill="url(#leafGreen3D)" 
            fillRule="evenodd"
          />
          
          {/* 3D Spine & Radial Light Highlight along the leaf curve */}
          <path 
            d="M 101 144 C 77 125 58 100 50 78" 
            stroke="#fffff" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            fill="none" 
            opacity="0.25"
          />
          <path 
            d="M 39 63 C 48 50 63 56 68 74" 
            stroke="#00E676" 
            strokeWidth="2.5" 
            fill="none" 
            opacity="0.6"
          />
        </g>

        {/* ==================== 4. TOP-RIGHT HOLLOW LEAF (Sprout) ==================== */}
        <g id="TopRightHollowLeaf" filter="url(#leafShadow)">
          {/* Organic double curve outline with exact evenodd hollow cutout */}
          <path 
            d="M 103 103 
               C 94 62 121 26 155 31 
               C 182 35 174 68 154 90 
               C 135 111 116 110 103 103 Z 
               M 115 94 
               C 111 68 131 43 147 45 
               C 161 47 156 68 143 82 
               C 130 96 122 98 115 94 Z" 
            fill="url(#leafGreen3D)" 
            fillRule="evenodd"
          />
          
          {/* 3D Chiseled spine & volumetric edge lining */}
          <path 
            d="M 104 100 C 111 74 130 52 146 46" 
            stroke="#ffffff" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            fill="none" 
            opacity="0.25"
          />
          <path 
            d="M 100 68 C 110 42 135 34 151 34" 
            stroke="#00E676" 
            strokeWidth="2.5" 
            fill="none" 
            opacity="0.5"
          />
        </g>

        {/* ==================== 5. MINOR ACCENT INTERNAL LEAF STEM ==================== */}
        <g id="AccentStem" filter="url(#stemShadow)">
          {/* Additional overlapping green leaf branch at the center inside of the ring */}
          <path 
            d="M 102 112 C 116 103 140 98 138 80 C 124 81 112 95 102 112 Z" 
            fill="url(#leafGreen3D)" 
          />
        </g>
      </svg>
    </div>
  );
};
