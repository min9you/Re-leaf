/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion } from 'motion/react';
import { ThreeLogo } from './components/ThreeLogo';
import { BaseballKeyringVisual } from './components/BaseballKeyringVisual';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  CheckCircle2,
  FileText,
  Award,
  ShieldCheck,
  Compass,
  Sparkles,
  ArrowRight,
  Loader2,
  Trash2,
  Lock,
  Leaf,
  Globe,
  TrendingDown,
  Info,
  User,
  LogOut,
  UserPlus,
  Settings
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  grade: 'Standard' | 'Signature';
  category: 'bat' | 'ball' | 'uniform' | 'prop';
  categoryKo: string;
  material: string;
  seasonStory: string;
  co2Reduction: number;
  description: string;
  emoji: string;
  stock: number;
  court: string;
  imageUrl?: string;
  detailImages?: string[];
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface EssayData {
  essay: string;
  guarantee: string;
}

interface Toast {
  id: number;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface ExtendedUser {
  email: string;
  name: string;
  favoriteTeam: string;
  joinDate: string;
  password?: string;
}

interface OrderRecord {
  id: string;
  productName: string;
  emoji: string;
  price: number;
  quantity: number;
  co2Reduction: number;
  date: string;
}

const KBO_TEAMS = [
  { name: 'KIA 타이거즈', emoji: '🐯', color: '#c70125', bg: '#ffebeb' },
  { name: '삼성 라이온즈', emoji: '🦁', color: '#005bac', bg: '#f0f7ff' },
  { name: 'LG 트윈스', emoji: '🌟', color: '#c3002f', bg: '#fff0f2' },
  { name: '두산 베어스', emoji: '🐻‍❄️', color: '#131230', bg: '#f2f2ff' },
  { name: '롯데 자이언츠', emoji: '🐦', color: '#e3001a', bg: '#fff0f1' },
  { name: 'SSG 랜더스', emoji: '🚀', color: '#ce0e2d', bg: '#fff0f1' },
  { name: 'KT 위즈', emoji: '🪄', color: '#333333', bg: '#f5f5f5' },
  { name: '한화 이글스', emoji: '🦅', color: '#ff6600', bg: '#fff5f0' },
  { name: 'NC 다이노스', emoji: '🦖', color: '#073c68', bg: '#f2f7fc' },
  { name: '키움 히어로즈', emoji: '🦸', color: '#8c072c', bg: '#faf0f2' },
];

const DoosanBearsLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Dark Navy Diamond Background with Red and White Border */}
    <g transform="translate(50, 50) rotate(45) translate(-50, -50)">
      <rect x="15" y="15" width="70" height="70" rx="4" fill="#131230" stroke="#ce0e2d" strokeWidth="2.5" />
      <rect x="18" y="18" width="64" height="64" rx="2" fill="none" stroke="#ffffff" strokeWidth="1.5" />
    </g>

    {/* Arching Baseball Stitches (Red) */}
    <path d="M 28,34 Q 50,22 72,34" fill="none" stroke="#ce0e2d" strokeWidth="1" strokeDasharray="3,3" />
    <path d="M 28,66 Q 50,78 72,66" fill="none" stroke="#ce0e2d" strokeWidth="1" strokeDasharray="3,3" />

    {/* Top Ribbon Banner (Red) */}
    <g>
      <path d="M 25,18 L 75,18 L 71,28 L 29,28 Z" fill="#8c101d" />
      <path d="M 26,16 L 74,16 L 71,26 L 29,26 Z" fill="#ce0e2d" />
      <path d="M 26,16 L 29,26 L 24,22 Z" fill="#8c101d" />
      <path d="M 74,16 L 71,26 L 76,22 Z" fill="#8c101d" />
      <text x="50" y="23" fill="#ffffff" fontSize="6.5" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.8">
        DOOSAN
      </text>
    </g>

    {/* Center Script Text "Bears" */}
    <g>
      <text x="50" y="55" fontSize="23" fontWeight="900" fontFamily="'Georgia', 'Times New Roman', serif" fontStyle="italic" textAnchor="middle" fill="#131230" stroke="#131230" strokeWidth="5" strokeLinejoin="round">
        Bears
      </text>
      <text x="50" y="55" fontSize="23" fontWeight="900" fontFamily="'Georgia', 'Times New Roman', serif" fontStyle="italic" textAnchor="middle" fill="#ce0e2d" stroke="#ce0e2d" strokeWidth="3.5" strokeLinejoin="round">
        Bears
      </text>
      <text x="50" y="55" fontSize="23" fontWeight="900" fontFamily="'Georgia', 'Times New Roman', serif" fontStyle="italic" textAnchor="middle" fill="#ffffff" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round">
        Bears
      </text>
      <text x="50" y="55" fontSize="23" fontWeight="900" fontFamily="'Georgia', 'Times New Roman', serif" fontStyle="italic" textAnchor="middle" fill="#131230">
        Bears
      </text>

      {/* Swoosh underline tail */}
      <path d="M 32,59 Q 55,64 78,55 C 65,65 42,67 28,60 C 26,59 28,58 32,59" fill="#ce0e2d" stroke="#ffffff" strokeWidth="1" strokeLinejoin="round" />
    </g>

    {/* Bottom Ribbon Banner (Red) */}
    <g>
      <path d="M 27,72 L 73,72 L 69,82 L 31,82 Z" fill="#8c101d" />
      <path d="M 28,70 L 72,70 L 69,80 L 31,80 Z" fill="#ce0e2d" />
      <path d="M 28,70 L 31,80 L 26,75 Z" fill="#8c101d" />
      <path d="M 72,70 L 69,80 L 74,75 Z" fill="#8c101d" />
      <text x="50" y="77" fill="#ffffff" fontSize="6.5" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">
        SEOUL
      </text>
    </g>
  </svg>
);

const LgTwinsLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Upper Arch - Left Side (Crimson Red) */}
    <path 
      d="M 50,5 C 26,5 9,19 3,38 L 15,38 C 20,26 34,15 50,15 Z" 
      fill="#c3002f" 
    />
    
    {/* Upper Arch - Right Side (Dark Charcoal) */}
    <path 
      d="M 50,5 C 74,5 91,19 97,38 L 85,38 C 80,26 66,15 50,15 Z" 
      fill="#1f1f1f" 
    />

    {/* LG Text inside Upper Arch */}
    <text 
      x="50" 
      y="31" 
      fill="#72757a" 
      fontSize="13" 
      fontWeight="900" 
      fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
      textAnchor="middle" 
      letterSpacing="0.5"
    >
      LG
    </text>

    {/* Bottom Downward Pointing Indicator */}
    {/* Left Point (Red) */}
    <path 
      d="M 50,96 L 23,65 L 50,65 Z" 
      fill="#c3002f" 
    />
    {/* Right Point (Charcoal) */}
    <path 
      d="M 50,96 L 77,65 L 50,65 Z" 
      fill="#1f1f1f" 
    />

    {/* Bottom Grey Banner overlaying the downward points */}
    <path 
      d="M 24,65 L 76,65 L 68,76 L 32,76 Z" 
      fill="#72757a" 
    />
    <text 
      x="50" 
      y="73" 
      fill="#ffffff" 
      fontSize="7" 
      fontWeight="bold" 
      fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
      textAnchor="middle" 
      letterSpacing="1.5"
    >
      SEOUL
    </text>

    {/* Central Bold TWINS Text with block athletic typography feel */}
    <g>
      <text 
        x="50" 
        y="58" 
        fontSize="24" 
        fontWeight="900" 
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Arial Black', sans-serif" 
        textAnchor="middle" 
        fill="#c3002f" 
        letterSpacing="-1.2"
      >
        TWINS
      </text>
    </g>
  </svg>
);

const HanwhaEaglesLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Top text path inside the orange ring */}
      <path id="hanwha-path" d="M 18,45 A 32,32 0 0,1 82,45" fill="none" />
      {/* Bottom text path inside the orange ring */}
      <path id="club-path" d="M 23,55 A 30,30 0 0,0 77,55" fill="none" />
    </defs>

    {/* Thick Orange Ring (Brand Color: #ff6600) */}
    <circle cx="50" cy="50" r="37" fill="none" stroke="#ff6600" strokeWidth="15" />
    
    {/* Inner White Baseball */}
    <circle cx="50" cy="50" r="29" fill="#ffffff" />

    {/* Baseball stitches (Chevrons) */}
    <g opacity="0.65" stroke="#ff6500" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Top Stitches */}
      <path d="M 28,34 L 30,32 L 32,34" />
      <path d="M 35,30 L 37,28 L 39,30" />
      <path d="M 43,28 L 45,26 L 47,28" />
      <path d="M 51,28 L 53,26 L 55,28" />
      <path d="M 59,30 L 61,28 L 63,30" />
      <path d="M 67,34 L 69,32 L 71,34" />

      {/* Bottom Stitches */}
      <path d="M 28,66 L 30,68 L 32,66" />
      <path d="M 35,70 L 37,72 L 39,70" />
      <path d="M 43,72 L 45,74 L 47,72" />
      <path d="M 51,72 L 53,74 L 55,72" />
      <path d="M 59,70 L 61,72 L 63,70" />
      <path d="M 67,66 L 69,68 L 71,66" />
    </g>

    {/* Arched text inside the orange border */}
    <text fill="#ffffff" fontSize="7" fontWeight="900" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" letterSpacing="0.4">
      <textPath href="#hanwha-path" startOffset="50%" textAnchor="middle">Hanwha</textPath>
    </text>
    <text fill="#ffffff" fontSize="5.5" fontWeight="900" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" letterSpacing="0.2">
      <textPath href="#club-path" startOffset="50%" textAnchor="middle">Baseball Club</textPath>
    </text>

    {/* Central Eagles script text layer group with underline swoosh */}
    <g transform="translate(48, 52) rotate(-11)">
      {/* Tail Swoosh */}
      <path d="M 26,3 Q 0,11 -25,2 Q -12,2 26,-3 Z" fill="#0b1a28" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" />
      
      {/* Script Text 'Eagles' */}
      <text 
        x="0" 
        y="1" 
        textAnchor="middle" 
        fill="#0b1a28" 
        stroke="#0b1a28" 
        strokeWidth="6.5" 
        strokeLinejoin="round" 
        fontSize="21" 
        fontWeight="bold" 
        fontFamily="'Brush Script MT', 'Dancing Script', 'Futura', 'Arial Black', sans-serif" 
        fontStyle="italic"
      >
        Eagles
      </text>
      <text 
        x="0" 
        y="1" 
        textAnchor="middle" 
        fill="#ffffff" 
        stroke="#ffffff" 
        strokeWidth="2.5" 
        strokeLinejoin="round" 
        fontSize="21" 
        fontWeight="bold" 
        fontFamily="'Brush Script MT', 'Dancing Script', 'Futura', 'Arial Black', sans-serif" 
        fontStyle="italic"
      >
        Eagles
      </text>
      <text 
        x="0" 
        y="1" 
        textAnchor="middle" 
        fill="#0b1a28" 
        fontSize="21" 
        fontWeight="bold" 
        fontFamily="'Brush Script MT', 'Dancing Script', 'Futura', 'Arial Black', sans-serif" 
        fontStyle="italic"
      >
        Eagles
      </text>
    </g>
  </svg>
);

const SsgLandersLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Gray outline filter shadow / 3D bevel look for text */}
      <filter id="bevel-shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="1" dy="1.5" stdDeviation="0.2" floodColor="#8c071a" floodOpacity="0.8" />
      </filter>
    </defs>

    {/* Outermost red dynamic shield shape with silver gradient outline */}
    <g stroke="#cfcfcf" strokeWidth="1.5" strokeLinejoin="round" fill="none">
      <path 
        d="M 5,34 C 18,22 41,22 66,28 C 81,31 94,37 94,40 C 94,46 80,56 68,60 C 51,66 23,73 13,67 C 6,63 4,49 5,34 Z" 
        fill="#ce0e2d" 
        stroke="#e5e5e5" 
        strokeWidth="2.5"
      />
    </g>

    {/* Flying Baseball Spacecraft in Top Right Arc */}
    <g transform="translate(62, 33)">
      {/* Comet Swoosh Trail */}
      <path d="M -25,2 C -18,-4 -5,0 4,2" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.8" />
      <path d="M -22,4 C -12,2 0,4 3,3" stroke="#fcd116" strokeWidth="2.5" fill="none" opacity="0.9" />
      
      {/* Baseball Sphere */}
      <circle cx="0" cy="0" r="7.5" fill="#fcfcfc" stroke="#b0b0b0" strokeWidth="0.5" />
      {/* Baseball Stitches (Red) */}
      <path d="M -5,-5 Q -1,-1 -5,5" fill="none" stroke="#ce0e2d" strokeWidth="0.8" strokeDasharray="1.5,1" />
      <path d="M 5,-5 Q 1,-1 5,5" fill="none" stroke="#ce0e2d" strokeWidth="0.8" strokeDasharray="1.5,1" />
    </g>

    {/* "SSG" Text in block font */}
    <text 
      x="38" 
      y="38" 
      fill="#ffffff" 
      fontSize="11" 
      fontWeight="900" 
      fontFamily="sans-serif, Arial" 
      letterSpacing="-0.5" 
      fontStyle="italic"
      transform="skewX(-5)"
    >
      SSG
    </text>

    {/* Main "Landers" customized block lettering with bottom swoosh line */}
    <g transform="skewX(-10)">
      {/* Thick white bevel underline / comet tail linking to the star */}
      <path 
        d="M 18,60 L 68,54 L 66,57 L 17,63 Z" 
        fill="#ffffff" 
        stroke="#ffffff" 
        strokeWidth="1.5" 
        strokeLinejoin="round" 
      />
      <path 
        d="M 18,61 L 65,56" 
        stroke="#fcd116" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />

      {/* Styled text "Landers" */}
      {/* Shadow background layer for 3D effect */}
      <text 
        x="45" 
        y="55" 
        fill="#757575" 
        fontSize="21" 
        fontWeight="900" 
        fontFamily="Impact, sans-serif" 
        textAnchor="middle" 
        filter="url(#bevel-shadow)"
      >
        Landers
      </text>
      {/* Front white layer */}
      <text 
        x="44.2" 
        y="54.2" 
        fill="#ffffff" 
        fontSize="21" 
        fontWeight="900" 
        fontFamily="Impact, sans-serif" 
        textAnchor="middle"
      >
        Landers
      </text>
    </g>

    {/* Green-Gold Landing Star on the tail right corner */}
    <g transform="translate(68, 55)">
      {/* Star outline and fill */}
      <path 
        d="M 0,-4.5 Q 0,0 4.5,0 Q 0,0 0,4.5 Q 0,0 -4.5,0 Q 0,0 0,-4.5 Z" 
        fill="#005d3f" 
        stroke="#fcd116" 
        strokeWidth="1" 
        strokeLinejoin="round" 
      />
    </g>
  </svg>
);

const SamsungLionsLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Curve for top brand text (SAMSUNG) */}
      <path id="samsung-path-lions" d="M 23,30 A 33,33 0 0,1 77,30" fill="none" />
      {/* Curve for bottom brand text (BASEBALL CLUB) */}
      <path id="club-path-lions" d="M 24,70 A 31,31 0 0,0 76,70" fill="none" />
    </defs>

    {/* Outer Silver Ring & Base Circle */}
    <circle cx="50" cy="50" r="41" fill="#ffffff" stroke="#b8bcbf" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="37.5" fill="none" stroke="#b8bcbf" strokeWidth="6" />

    {/* Inner White Baseball Field */}
    <circle cx="50" cy="50" r="34" fill="#ffffff" stroke="#e5e5e5" strokeWidth="1" />

    {/* Baseball Stitches (Light Grey) */}
    <g opacity="0.45" stroke="#b8bcbf" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 33,35 C 38,40 38,60 33,65" strokeDasharray="2,2" />
      <path d="M 67,35 C 62,40 62,60 67,65" strokeDasharray="2,2" />
    </g>

    {/* Top "SAMSUNG" curved text inside silver ring */}
    <text fill="#005bac" fontSize="8.5" fontWeight="900" fontFamily="sans-serif, Arial" letterSpacing="0.8">
      <textPath href="#samsung-path-lions" startOffset="50%" textAnchor="middle">SAMSUNG</textPath>
    </text>

    {/* Bottom "BASEBALL CLUB" curved text inside silver ring */}
    <text fill="#005bac" fontSize="5.5" fontWeight="900" fontFamily="sans-serif, Arial" letterSpacing="0.4">
      <textPath href="#club-path-lions" startOffset="50%" textAnchor="middle">BASEBALL CLUB</textPath>
    </text>

    {/* Middle "Lions" lettering with 3D Bevel/Outline */}
    <g transform="translate(0, 3)">
      {/* 1. Underlying extra-thick Silver Outline shadow */}
      <path 
        d="M 12,50 Q 50,33 84,30 C 62,44 32,52 12,50 Z" 
        fill="none" 
        stroke="#b8bcbf" 
        strokeWidth="6" 
        strokeLinejoin="round" 
      />
      <text 
        x="49" 
        y="46" 
        fontSize="21" 
        fontWeight="900" 
        fontFamily="'Georgia', 'Times New Roman', serif" 
        fontStyle="italic" 
        textAnchor="middle" 
        fill="none" 
        stroke="#b8bcbf" 
        strokeWidth="7" 
        strokeLinejoin="round"
      >
        Lions
      </text>

      {/* 2. Secondary thick White Outline */}
      <path 
        d="M 12,50 Q 50,33 84,30 C 62,44 32,52 12,50 Z" 
        fill="none" 
        stroke="#ffffff" 
        strokeWidth="4" 
        strokeLinejoin="round" 
      />
      <text 
        x="49" 
        y="46" 
        fontSize="21" 
        fontWeight="900" 
        fontFamily="'Georgia', 'Times New Roman', serif" 
        fontStyle="italic" 
        textAnchor="middle" 
        fill="none" 
        stroke="#ffffff" 
        strokeWidth="4.5" 
        strokeLinejoin="round"
      >
        Lions
      </text>

      {/* 3. Bottom sweeping script tail / swoosh (Blue) */}
      <path 
        d="M 12,50 Q 50,33 84,30 C 62,44 32,52 12,50 Z" 
        fill="#005bac" 
        stroke="#005bac" 
        strokeWidth="1.2" 
        strokeLinejoin="round" 
      />

      {/* 4. Active text layers (Blue) */}
      <text 
        x="49" 
        y="46" 
        fontSize="21" 
        fontWeight="900" 
        fontFamily="'Georgia', 'Times New Roman', serif" 
        fontStyle="italic" 
        textAnchor="middle" 
        fill="#005bac"
      >
        Lions
      </text>
    </g>
  </svg>
);

const NcDinosLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Curve for top brand text (CHANGWON) */}
      <path id="changwon-path-dinos" d="M 12,50 A 38,38 0 0,1 88,50" fill="none" />
      {/* Curve for bottom brand text (EST. 2011) */}
      <path id="est-path-dinos" d="M 14,50 A 36,36 0 0,0 86,50" fill="none" />
    </defs>

    {/* Outer border & Gold ring */}
    <circle cx="50" cy="50" r="45" fill="none" stroke="#0c2340" strokeWidth="2.2" />
    <circle cx="50" cy="50" r="40" fill="none" stroke="#c09a6b" strokeWidth="10" />
    <circle cx="50" cy="50" r="35" fill="none" stroke="#0c2340" strokeWidth="2.2" />

    {/* Inner baseball background */}
    <circle cx="50" cy="50" r="34" fill="#ffffff" />

    {/* Baseball stitches (Gold chevron marks) */}
    <g stroke="#c09a6b" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.65">
      {/* Left stitches arc */}
      <path d="M 46,18 L 44,20 L 46,22" />
      <path d="M 42,21 L 40,23 L 42,25" />
      <path d="M 38,24 L 36,26 L 38,28" />
      <path d="M 35,28 L 33,30 L 35,32" />
      <path d="M 33,33 L 31,35 L 33,37" />
      <path d="M 31,39 L 29,41 L 31,43" />

      {/* Right stitches arc */}
      <path d="M 68,26 L 66,28 L 68,30" />
      <path d="M 65,31 L 63,33 L 65,35" />
      <path d="M 62,37 L 60,39 L 62,41" />
      <path d="M 60,43 L 58,45 L 60,47" />
      <path d="M 58,50 L 56,52 L 58,54" />
      <path d="M 57,58 L 55,60 L 57,62" />
      <path d="M 57,67 L 55,69 L 57,71" />
      <path d="M 58,76 L 56,78 L 58,80" />
    </g>

    {/* Top brand text (CHANGWON) */}
    <text fill="#0c2340" fontSize="8" fontWeight="900" fontFamily="sans-serif, Arial" letterSpacing="0.8">
      <textPath href="#changwon-path-dinos" startOffset="50%" textAnchor="middle">★ CHANGWON ★</textPath>
    </text>

    {/* Bottom brand text (EST. 2011) */}
    <text fill="#0c2340" fontSize="7" fontWeight="900" fontFamily="sans-serif, Arial" letterSpacing="0.6">
      <textPath href="#est-path-dinos" startOffset="50%" textAnchor="middle">★ EST. 2011 ★</textPath>
    </text>

    {/* "nc" lowercase logo - slightly rotated & slanted */}
    <g transform="translate(50, 36) skewX(-12) scale(1.05, 0.95)">
      <text 
        x="0" 
        y="0" 
        textAnchor="middle" 
        fill="#0c2340" 
        fontSize="14.5" 
        fontWeight="900" 
        fontFamily="-apple-system, BlinkMacSystemFont, 'Impact', 'Arial Black', sans-serif"
        letterSpacing="-0.8"
        style={{ textTransform: 'lowercase' }}
      >
        nc
      </text>
    </g>

    {/* Center "Dinos" script text group with layered outlined sporty style */}
    <g transform="translate(50, 60) skewX(-12) rotate(-3)">
      {/* Layer 1: Outermost Gold Outline */}
      <text 
        x="0" 
        y="0" 
        textAnchor="middle" 
        fill="#c09a6b" 
        stroke="#c09a6b" 
        strokeWidth="8.5" 
        strokeLinejoin="round" 
        fontSize="19.5" 
        fontWeight="900" 
        fontFamily="-apple-system, BlinkMacSystemFont, 'Impact', 'Arial Black', sans-serif"
      >
        Dinos
      </text>
      {/* Layer 2: Middle Navy Outline */}
      <text 
        x="0" 
        y="0" 
        textAnchor="middle" 
        fill="#0c2340" 
        stroke="#0c2340" 
        strokeWidth="6" 
        strokeLinejoin="round" 
        fontSize="19.5" 
        fontWeight="900" 
        fontFamily="-apple-system, BlinkMacSystemFont, 'Impact', 'Arial Black', sans-serif"
      >
        Dinos
      </text>
      {/* Layer 3: Inner White Outline */}
      <text 
        x="0" 
        y="0" 
        textAnchor="middle" 
        fill="#ffffff" 
        stroke="#ffffff" 
        strokeWidth="2.5" 
        strokeLinejoin="round" 
        fontSize="19.5" 
        fontWeight="900" 
        fontFamily="-apple-system, BlinkMacSystemFont, 'Impact', 'Arial Black', sans-serif"
      >
        Dinos
      </text>
      {/* Layer 4: Deep Blue Body Fill */}
      <text 
        x="0" 
        y="0" 
        textAnchor="middle" 
        fill="#15488c" 
        fontSize="19.5" 
        fontWeight="900" 
        fontFamily="-apple-system, BlinkMacSystemFont, 'Impact', 'Arial Black', sans-serif"
      >
        Dinos
      </text>
    </g>
  </svg>
);

const KtWizLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Outer winged shield / double outline background (Silver / Gray) */}
    <path 
      d="M 50,18 L 58,18 Q 62,18 66,22 L 82,22 Q 84,34 90,40 L 84,50 Q 82,68 50,85 Q 18,68 16,50 L 10,40 Q 16,34 18,22 L 34,22 Q 38,18 42,18 Z" 
      fill="#eaeaea" 
      stroke="#b2b2b2" 
      strokeWidth="1.5"
    />
    
    {/* Inner Black Crest Shape */}
    <path 
      d="M 50,22 Q 54,22 58,25 L 78,25 Q 80,34 85,40 L 80,48 Q 78,64 50,79 Q 22,64 20,48 L 15,40 Q 20,34 22,25 L 42,25 Q 46,22 50,22 Z" 
      fill="#000000" 
    />

    {/* Black dynamic sweeping horn on top */}
    <path 
      d="M 33,16 C 31,8 40,2 62,4 C 65,4 68,8 58,12 C 52,14 48,16 52,20 Z" 
      fill="#000000" 
    />

    {/* Red magical wizard crown / wing */}
    <path 
      d="M 32,18 C 30,13 36,8 55,10 C 65,11 72,14 62,20 C 58,22 55,25 61,30 C 63,31 65,34 58,38 C 50,42 42,40 37,34 C 34,31 32,25 35,22 Z" 
      fill="#e1002d" 
    />

    {/* White sparkle in the center of the crown */}
    <path 
      d="M 55,22 Q 55,25 58,25 Q 55,25 55,28 Q 55,25 52,25 Q 55,25 55,22 Z" 
      fill="#ffffff" 
    />

    {/* Center Text "KT WIZ" with custom styled font */}
    <g transform="translate(50, 52)">
      {/* Red shadow/offset for the text to pop */}
      <text 
        x="0.6" 
        y="0.6" 
        textAnchor="middle" 
        fill="#e1002d" 
        fontSize="14" 
        fontWeight="bold" 
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Arial Black', sans-serif" 
        letterSpacing="-0.2"
      >
        KT WIZ
      </text>
      {/* Front White main text */}
      <text 
        x="0" 
        y="0" 
        textAnchor="middle" 
        fill="#ffffff" 
        fontSize="14" 
        fontWeight="bold" 
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Arial Black', sans-serif" 
        letterSpacing="-0.2"
      >
        KT WIZ
      </text>
    </g>

    {/* "suwon" text in clean white */}
    <text 
      x="50" 
      y="62" 
      textAnchor="middle" 
      fill="#ffffff" 
      fontSize="7" 
      fontWeight="700" 
      fontFamily="sans-serif, Arial" 
      letterSpacing="1"
    >
      suwon
    </text>

    {/* Baseball curve sector intersecting at the bottom point of the crest */}
    <g transform="translate(50, 75)">
      {/* White baseball curved base */}
      <path d="M -15,0 A 15,15 0 0,0 15,0 Z" fill="#eaeaea" stroke="#b2b2b2" strokeWidth="1" />
      {/* Red stitches */}
      <path d="M -11,2 Q -9,-3 -7,-9" fill="none" stroke="#e1002d" strokeWidth="1.2" strokeDasharray="1.5,1" />
      <path d="M 11,2 Q 9,-3 7,-9" fill="none" stroke="#e1002d" strokeWidth="1.2" strokeDasharray="1.5,1" />
    </g>
  </svg>
);

const LotteGiantsLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Curve for top curved text (LOTTE GIANTS) inside the dark navy ring */}
      <path id="lotteCirclePathTop" d="M 13,50 A 37,37 0 0,1 87,50" fill="none" />
      {/* Curve for bottom curved text (EST. 1982 BUSAN) inside the dark navy ring */}
      <path id="lotteCirclePathBottom" d="M 17,50 A 33,33 0 0,0 83,50" fill="none" />
    </defs>

    {/* Outer border & Solid Navy Circle background */}
    <circle cx="50" cy="50" r="46" fill="#041e42" />

    {/* Inner sky blue top-arc and red bottom-arc inside the navy ring */}
    {/* Top-half Sky Blue thin ring arc */}
    <path d="M 9,50 A 41,41 0 0,1 91,50" fill="none" stroke="#2ba5de" strokeWidth="2.5" />
    {/* Bottom-half Red thin ring arc */}
    <path d="M 9,50 A 41,41 0 0,0 91,50" fill="none" stroke="#da1a35" strokeWidth="2.5" />

    {/* Inner Solid White Circle representation of the baseball center */}
    <circle cx="50" cy="50" r="32" fill="#ffffff" />

    {/* Curved Text inside the dark navy ring */}
    {/* Top curved text "LOTTE GIANTS" */}
    <text fill="#ffffff" fontSize="7.8" fontWeight="900" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" letterSpacing="0.4">
      <textPath href="#lotteCirclePathTop" startOffset="50%" textAnchor="middle">LOTTE GIANTS</textPath>
    </text>

    {/* Bottom curved text "EST. 1982 BUSAN" */}
    <text fill="#ffffff" fontSize="6.2" fontWeight="800" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" letterSpacing="0.4">
      <textPath href="#lotteCirclePathBottom" startOffset="50%" textAnchor="middle">EST. 1982 BUSAN</textPath>
    </text>

    {/* Small red brand text "LOTTE" right above Giants */}
    <text 
      x="50" 
      y="38" 
      fill="#da1a35" 
      fontSize="6.8" 
      fontWeight="900" 
      fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Arial Black', sans-serif" 
      textAnchor="middle" 
      letterSpacing="1.2"
    >
      LOTTE
    </text>

    {/* Main "Giants" slanted block script lettering with high-fidelity double inline stripes */}
    <g transform="translate(50, 58) scale(1.05) rotate(-5)">
      {/* 1. Underlying extra-thick dark navy shadows */}
      <text 
        x="0" 
        y="0" 
        textAnchor="middle" 
        fill="#041e42" 
        stroke="#041e42" 
        strokeWidth="6" 
        strokeLinejoin="round" 
        fontSize="21" 
        fontWeight="900" 
        fontFamily="'Brush Script MT', 'Dancing Script', 'Impact', sans-serif"
        fontStyle="italic"
      >
        Giants
      </text>

      {/* 2. Primary White Outline/Shell */}
      <text 
        x="0" 
        y="0" 
        textAnchor="middle" 
        fill="#ffffff" 
        stroke="#ffffff" 
        strokeWidth="4" 
        strokeLinejoin="round" 
        fontSize="21" 
        fontWeight="900" 
        fontFamily="'Brush Script MT', 'Dancing Script', 'Impact', sans-serif"
        fontStyle="italic"
      >
        Giants
      </text>

      {/* 3. Main solid Red inner body fill */}
      <text 
        x="0" 
        y="0" 
        textAnchor="middle" 
        fill="#da1a35" 
        stroke="#da1a35" 
        strokeWidth="1.5" 
        strokeLinejoin="round" 
        fontSize="21" 
        fontWeight="900" 
        fontFamily="'Brush Script MT', 'Dancing Script', 'Impact', sans-serif"
        fontStyle="italic"
      >
        Giants
      </text>

      {/* 4. Elegant Inline Dual Stripes: White layer overlay */}
      <text 
        x="0" 
        y="0" 
        textAnchor="middle" 
        fill="none" 
        stroke="#ffffff" 
        strokeWidth="0.8" 
        strokeLinecap="round"
        strokeLinejoin="round" 
        fontSize="21" 
        fontWeight="900" 
        fontFamily="'Brush Script MT', 'Dancing Script', 'Impact', sans-serif"
        fontStyle="italic"
      >
        Giants
      </text>

      {/* 5. Center red inline details */}
      <text 
        x="0" 
        y="0" 
        textAnchor="middle" 
        fill="none" 
        stroke="#da1a35" 
        strokeWidth="0.25" 
        fontSize="21" 
        fontWeight="900" 
        fontFamily="'Brush Script MT', 'Dancing Script', 'Impact', sans-serif"
        fontStyle="italic"
      >
        Giants
      </text>
    </g>
  </svg>
);

const KiaTigersLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Top Brand Bar (Dark Navy #05141f) */}
    <path 
      d="M 24,12 L 76,12 L 76,23 L 73,23 L 73,15 L 63,15 L 59,25 L 41,25 L 37,15 L 27,15 L 27,23 L 24,23 Z" 
      fill="#05141f" 
    />

    {/* Modern White KIA wordmark logo inside the top bar's hanging trapezoid */}
    <path 
      d="M 41.5,22.8 L 42.6,18.5 L 43.7,18.5 L 42.6,22.8 Z 
         M 43.4,18.9 L 45.9,22.8 L 47.1,22.8 L 44.5,18.9 Z 
         M 47.3,22.8 L 48.4,18.5 L 49.5,18.5 L 48.4,22.8 Z 
         M 49.2,18.9 L 51.7,22.8 L 52.9,22.8 L 50.3,18.9 Z 
         M 53.0,22.8 L 54.1,18.5 L 55.2,18.5 L 54.1,22.8 Z" 
      fill="#ffffff" 
    />

    {/* Center Red Wordmark "TIGERS" */}
    <text 
      x="50" 
      y="41" 
      textAnchor="middle" 
      fill="#ea0029" 
      fontSize="17.5" 
      fontWeight="900" 
      fontFamily="'Impact', 'Arial Black', -apple-system, sans-serif" 
      letterSpacing="-0.3"
      transform="skewX(-11) scale(1.1, 0.95)"
    >
      TIGERS
    </text>

    {/* Main Home Plate (Dark Navy #05141f) */}
    <path 
      d="M 25,46 Q 50,42 75,46 L 75,61 L 50,83 L 25,61 Z" 
      fill="#05141f" 
    />

    {/* "BASEBALL CLUB" White curved/straight text in deep navy plate */}
    <text 
      x="50" 
      y="55" 
      textAnchor="middle" 
      fill="#ffffff" 
      fontSize="4.4" 
      fontWeight="800" 
      fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
      letterSpacing="0.8"
    >
      BASEBALL CLUB
    </text>

    {/* Double bottom chevrons / outlines to match the logo style */}
    {/* Thick navy bottom block */}
    <path 
      d="M 25,67 L 50,89 L 75,67" 
      stroke="#05141f" 
      strokeWidth="4" 
      fill="none" 
      strokeLinejoin="round" 
      strokeLinecap="round" 
    />
    
    {/* Inner white chevron gap line */}
    <path 
      d="M 25,63 L 50,85 L 75,63" 
      stroke="#ffffff" 
      strokeWidth="1.5" 
      fill="none" 
      strokeLinejoin="round" 
      strokeLinecap="round" 
    />

    {/* Home plate small notch detail at the very bottom tip */}
    <polygon points="45.5,89 50,84 54.5,89 50,91" fill="#ffffff" />
  </svg>
);

const KiwoomHeroesLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Curves for textPath inside the burgundy ring */}
      <path id="kiwoomCirclePathTop" d="M 12,50 A 38,38 0 0,1 88,50" fill="none" />
      <path id="kiwoomCirclePathBottom" d="M 14,50 A 36,36 0 0,0 86,50" fill="none" />
    </defs>

    {/* Outer Solid Burgundy Circle background */}
    <circle cx="50" cy="50" r="46" fill="#8c072c" />

    {/* Inner White Circle representing the baseball */}
    <circle cx="50" cy="50" r="31" fill="#ffffff" stroke="#8c072c" strokeWidth="0.8" />

    {/* Baseball stitches (Burgundy chevron-like curves in background) */}
    <g opacity="0.45" stroke="#8c072c" strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 33,26 C 41,34 41,66 33,74" strokeDasharray="1.5,1.5" />
      <path d="M 67,26 C 59,34 59,66 67,74" strokeDasharray="1.5,1.5" />
    </g>

    {/* Curved Text inside the burgundy ring */}
    {/* Top curved text "KIWOOM HEROES" */}
    <text fill="#ffffff" fontSize="6.8" fontWeight="900" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" letterSpacing="0.4">
      <textPath href="#kiwoomCirclePathTop" startOffset="50%" textAnchor="middle">KIWOOM HEROES</textPath>
    </text>

    {/* Bottom curved text "SEOUL HEROES BASEBALL CLUB" */}
    <text fill="#ffffff" fontSize="4.6" fontWeight="800" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" letterSpacing="0.4">
      <textPath href="#kiwoomCirclePathBottom" startOffset="50%" textAnchor="middle">SEOUL HEROES BASEBALL CLUB</textPath>
    </text>

    {/* Main "KIWOOM" stylized block script lettering */}
    <g transform="translate(50, 56) scale(1.02) skewX(-14)">
      {/* 1. Underlying extra-thick dark shadow */}
      <text 
        x="0" 
        y="1.8" 
        textAnchor="middle" 
        fill="#3d0012" 
        stroke="#3d0012" 
        strokeWidth="6.5" 
        strokeLinejoin="round" 
        fontSize="17.5" 
        fontWeight="900" 
        fontFamily="-apple-system, BlinkMacSystemFont, 'Arial Black', 'Impact', sans-serif"
      >
        KIWOOM
      </text>

      {/* 2. Primary Vibrant Pink/Magenta Outline */}
      <text 
        x="0" 
        y="0" 
        textAnchor="middle" 
        fill="#ec008c" 
        stroke="#ec008c" 
        strokeWidth="6" 
        strokeLinejoin="round" 
        fontSize="17.5" 
        fontWeight="900" 
        fontFamily="-apple-system, BlinkMacSystemFont, 'Arial Black', 'Impact', sans-serif"
      >
        KIWOOM
      </text>

      {/* 3. Inner White Core / Solid Top fill */}
      <text 
        x="0" 
        y="0" 
        textAnchor="middle" 
        fill="#ffffff" 
        stroke="#ffffff" 
        strokeWidth="1.2" 
        strokeLinejoin="round" 
        fontSize="17.5" 
        fontWeight="900" 
        fontFamily="-apple-system, BlinkMacSystemFont, 'Arial Black', 'Impact', sans-serif"
      >
        KIWOOM
      </text>

      {/* 4. Fine details for beveled effect (slightly offset text on top) */}
      <text 
        x="-0.3" 
        y="-0.3" 
        textAnchor="middle" 
        fill="#f7f7f7" 
        fontSize="17.5" 
        fontWeight="900" 
        fontFamily="-apple-system, BlinkMacSystemFont, 'Arial Black', 'Impact', sans-serif"
      >
        KIWOOM
      </text>
    </g>
  </svg>
);

const renderKboTeamLogo = (teamName: string, className: string = "w-5 h-5") => {
  if (teamName === '두산 베어스') {
    return <DoosanBearsLogo className={className} />;
  }
  if (teamName === 'KIA 타이거즈') {
    return <KiaTigersLogo className={className} />;
  }
  if (teamName === '롯데 자이언츠') {
    return <LotteGiantsLogo className={className} />;
  }
  if (teamName === '키움 히어로즈') {
    return <KiwoomHeroesLogo className={className} />;
  }
  if (teamName === 'LG 트윈스') {
    return <LgTwinsLogo className={className} />;
  }
  if (teamName === '한화 이글스') {
    return <HanwhaEaglesLogo className={className} />;
  }
  if (teamName === 'SSG 랜더스') {
    return <SsgLandersLogo className={className} />;
  }
  if (teamName === '삼성 라이온즈') {
    return <SamsungLionsLogo className={className} />;
  }
  if (teamName === 'NC 다이노스') {
    return <NcDinosLogo className={className} />;
  }
  if (teamName === 'KT 위즈') {
    return <KtWizLogo className={className} />;
  }
  const team = KBO_TEAMS.find(t => t.name === teamName);
  return (
    <span className="select-none text-center block">
      {team?.emoji || '⚾'}
    </span>
  );
};

const PRODUCTS: Product[] = [
  // 공가죽 소재
  {
    id: 1,
    name: "케이블 와인더",
    price: 16000,
    grade: "Standard",
    category: "ball",
    categoryKo: "공가죽",
    material: "야구공 가죽",
    seasonStory: "한 시즌 동안 그라운드를 가르며 치열하게 구르고 다듬어진 공에서 추출하여 견고함과 자연스러운 스티치 라인을 드러내는 와인더.",
    co2Reduction: 0.8,
    description: "KBO 공인구 가죽의 질긴 질감을 그대로 살려 충전 케이블 등의 선을 깔끔하고 고급스럽게 오거나이징합니다.",
    emoji: "🔋",
    stock: 14,
    court: "2025 시즌 배치",
    imageUrl: "https://images.unsplash.com/photo-1581404917879-17e1921a3cfd?q=80&w=600&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621839673705-6617adf9e890?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: 2,
    name: "볼 가죽 키링",
    price: 19000,
    grade: "Standard",
    category: "ball",
    categoryKo: "공가죽",
    material: "투수 공인구 가죽",
    seasonStory: "잠실 야구장의 열광 넘치는 불펜과 승부처 마운드 위에서 강력한 피칭 끝에 돌아온 공들이 품은 강인함과 정취.",
    co2Reduction: 1.1,
    description: "한 수 부러뜨릴 듯 감아진 그립 실밥이 그대로 남은 투수용 공 가죽으로 제작해 영구적인 손맛을 선사합니다.",
    emoji: "🔑",
    stock: 11,
    court: "2025 잠실 시즌",
    imageUrl: "",
    detailImages: [
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: 3,
    name: "그립톡",
    price: 24000,
    grade: "Standard",
    category: "ball",
    categoryKo: "공가죽",
    material: "야구공 가죽",
    seasonStory: "타석에서 뿜어져 나오는 강렬한 에너지를 손안에서 늘 간직할 수 있도록 가공된 라운드 그립톡.",
    co2Reduction: 0.9,
    description: "손가락 마디 사이로 기분 좋게 닿는 공인구 특유의 미끄러짐 없는 밀착감과 한 뜸의 수작업 실밥 패턴.",
    emoji: "📱",
    stock: 8,
    court: "2025 시즌 배치",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515564730083-c47861851341?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: 4,
    name: "가방 참",
    price: 29000,
    grade: "Standard",
    category: "ball",
    categoryKo: "공가죽",
    material: "야구공 가죽 및 링",
    seasonStory: "관중석의 흔들리는 함성을 안은 야구공 가죽 위에 심플한 가공을 더해 가방에 세련된 스포츠 아트를 가미합니다.",
    co2Reduction: 1.4,
    description: "어떤 백팩이나 토트백에도 완벽하게 걸맞은 무게감으로, 리얼 야구공의 리치가 돋보이는 소형 악세사리.",
    emoji: "👜",
    stock: 7,
    court: "2025 잠실 시즌",
    imageUrl: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?q=80&w=600&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1471958680674-965422d109f2?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: 5,
    name: "가죽 코스터 2P",
    price: 28000,
    grade: "Standard",
    category: "ball",
    categoryKo: "공가죽",
    material: "공인구 가죽",
    seasonStory: "커피와 함께 일상의 집중 시간이 흘러가는 테이블 위에서 야구 필드의 깊은 풍취를 음미할 수 있는 가죽 받침.",
    co2Reduction: 1.6,
    description: "잔의 바닥면을 부드럽게 감쌀 수 있는 원형 실밥 단면을 가공하여 2P 세트로 품격 있게 구성했습니다.",
    emoji: "☕",
    stock: 10,
    court: "2025 시즌 배치",
    imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: 6,
    name: "테라조 코스터 2P",
    price: 32000,
    grade: "Standard",
    category: "ball",
    categoryKo: "공가죽",
    material: "야구공 분쇄 가죽 및 에코스톤",
    seasonStory: "업사이클링 과정 중 발생하는 미세한 자투리 조각들을 한데 모아 대리석의 흔적 같은 아름다움으로 입체화한 코스터.",
    co2Reduction: 1.8,
    description: "세라믹 표면 질감 속에 녹아든 연한 크림빛 공인 가죽 테라조 입자가 오묘하고 지적인 분위기를 완성합니다.",
    emoji: "🍷",
    stock: 9,
    court: "2025 시즌 배치",
    imageUrl: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=600&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=600&auto=format&fit=crop"
    ]
  },
  // 배트(단풍나무) 소재
  {
    id: 7,
    name: "우드 마그넷 2P",
    price: 22000,
    grade: "Standard",
    category: "bat",
    categoryKo: "배트",
    material: "부러진 단풍나무 배트",
    seasonStory: "타석에서 맹렬히 공과 부딪히며 부러진 단풍나무 배트 조각을 고열 압착 및 연마하여 자석으로 정제해낸 예술적 조각.",
    co2Reduction: 1.2,
    description: "냉장고나 철제 보드 위에 부착하여 매 순간 야구 타석의 승부욕과 집념의 서사를 환기시킵니다.",
    emoji: "🧲",
    stock: 13,
    court: "2025 통합 시즌",
    imageUrl: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=600&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1426927308491-6380b6a9936f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: 8,
    name: "독서링",
    price: 58000,
    grade: "Signature",
    category: "bat",
    categoryKo: "배트",
    material: "한국시리즈 결승 단풍나무 배트",
    seasonStory: "2025년 한국시리즈 정점에 다다른 결승 리그 당시 선수들이 썼던 경기용 프로 배트의 파편으로 다듬은 서가 아이템.",
    co2Reduction: 2.2,
    description: "책장을 한 손으로 쥔 채 지식을 담는 순간, 챔피언십 배트만의 위엄과 고고한 메이플 우드 결이 함께합니다.",
    emoji: "📖",
    stock: 3,
    court: "2025 한국시리즈",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: 9,
    name: "펜 트레이",
    price: 62000,
    grade: "Signature",
    category: "bat",
    categoryKo: "배트",
    material: "가을야구 단풍나무 배트",
    seasonStory: "뜨거웠던 플레이오프 가을 잔치의 한복판에서 명승부를 써 내려간 메이플 우드의 조각을 세련되게 파내어 만든 트레이.",
    co2Reduction: 2.6,
    description: "서재 위에서 존재 자체로 독보적인 기품을 자아내며, 한 명의 타자가 지녔던 뜨거운 서사를 전달합니다.",
    emoji: "✏️",
    stock: 2,
    court: "2025 가을야구",
    imageUrl: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=600&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562240020-ce31ccb0fa7d?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: 10,
    name: "집성재 모니터 받침대",
    price: 89000,
    grade: "Signature",
    category: "bat",
    categoryKo: "배트",
    material: "통합 시즌 회수 배트 집성재",
    seasonStory: "한 시즌 간의 영광스런 안타와 타격 궤적을 뿜어낸 배트들을 전면 수거하여 견고한 집성 패널로 정밀 가공한 정예품.",
    co2Reduction: 4.1,
    description: "매일 눈길이 향하는 모니터 아래 최상의 단목 배트 블록을 깔아 영광의 기운과 내추럴한 서재 테마를 부여합니다.",
    emoji: "🖥️",
    stock: 5,
    court: "2025 통합 시즌",
    imageUrl: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=600&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop"
    ]
  },
  // 유니폼·배너 소재
  {
    id: 11,
    name: "업사이클 파우치",
    price: 34000,
    grade: "Standard",
    category: "uniform",
    categoryKo: "유니폼",
    material: "수거 은퇴 유니폼 에스테르 원단",
    seasonStory: "오랜 시간 팬들의 뜨거운 응원을 머금고 달렸던 구단 폐유니폼 및 현수막을 화학제 없이 친환경 세척만으로 다듬어 직조한 유니크 슬링 백.",
    co2Reduction: 2.0,
    description: "가볍고 질기며 생활방수가 지원되는 직물 구조로, 단 하나뿐인 역사적 패치 배치가 무작위하게 흐르는 심플 멀티팩.",
    emoji: "👝",
    stock: 12,
    court: "2024 은퇴 유니폼",
    imageUrl: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: 12,
    name: "토트백",
    price: 39000,
    grade: "Standard",
    category: "uniform",
    categoryKo: "유니폼",
    material: "수거 은퇴 유니폼 무지 원단 및 패널",
    seasonStory: "승리를 향해 질주하던 격전의 그라운드에서 수집한 유니폼을 바탕으로 수작업 패턴 가공을 가미시킨 데일리 캐리어.",
    co2Reduction: 2.8,
    description: "두텁고 탄탄한 어깨 패드와 오염 방지 마감 처리를 완수하였으며, 구단의 스포츠 혼을 세련되게 리터칭했습니다.",
    emoji: "🛍️",
    stock: 6,
    court: "2024 은퇴 유니폼",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop"
    ]
  },
  // 감성 소품
  {
    id: 13,
    name: "썬캐쳐",
    price: 36000,
    grade: "Standard",
    category: "prop",
    categoryKo: "감성소품",
    material: "소형 야구공 에지가죽 및 고리 글라스",
    seasonStory: "빛의 스펙트럼이 은은한 오후의 홈 플레이트에 떨어질 때 빚어지는 프리즘 영감을 작은 일상의 곁에 걸수 있도록 기획된 썬캐쳐.",
    co2Reduction: 1.5,
    description: "부서진 배트의 원형 파편 and 가공 가죽 링이 어쿠스틱하게 매칭되어 찬란하면서도 정제된 무지갯빛 결을 방안에 투과합니다.",
    emoji: "☀️",
    stock: 8,
    court: "2025 시즌 배치",
    imageUrl: "https://images.unsplash.com/photo-1507646227500-4d389b0012be?q=80&w=600&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: 14,
    name: "디퓨저",
    price: 42000,
    grade: "Standard",
    category: "prop",
    categoryKo: "감성소품",
    material: "단풍나무 배트 베이스 및 코튼 오일",
    seasonStory: "오래 축적된 천연 메이플 목재 고유의 향취와 여름밤 구장의 흙냄새, 풀꽃 향기를 아름답게 버무린 에센셜 코튼 프래그런스.",
    co2Reduction: 1.2,
    description: "정밀 깎기 가공을 거친 배트 베이스가 향의 오일 감도를 풍성히 붙잡고, 공인 가죽 코스터로 하단을 조화롭게 받쳐줍니다.",
    emoji: "🧴",
    stock: 9,
    court: "2025 시즌 배치",
    imageUrl: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
    detailImages: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop"
    ]
  }
];

export default function App() {
  // States
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('re_leaf_products_v4');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return PRODUCTS;
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isEditingImage, setIsEditingImage] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [tempImageUrl, setTempImageUrl] = useState<string>('');
  const [tempDetailImagesText, setTempDetailImagesText] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // Checkout & Shipping States
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [shippingAddress, setShippingAddress] = useState<string>('');
  const [shippingName, setShippingName] = useState<string>('');
  const [shippingPhone, setShippingPhone] = useState<string>('');
  
  // AI Essay States
  const [essayLoading, setEssayLoading] = useState<boolean>(false);
  const [essayResult, setEssayResult] = useState<EssayData | null>(null);
  
  // Toast & Newsletter
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [emailInput, setEmailInput] = useState<string>('');
  const [isSubmittingSubscription, setIsSubmittingSubscription] = useState<boolean>(false);

  // --- NEW USER SESSION STATES ---
  const [currentUser, setCurrentUser] = useState<ExtendedUser | null>(() => {
    try {
      const stored = localStorage.getItem('releaf_current_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [registeredUsers, setRegisteredUsers] = useState<{ [email: string]: ExtendedUser }>(() => {
    try {
      const stored = localStorage.getItem('releaf_registered_users');
      if (stored) {
        return JSON.parse(stored);
      }
      const defaultUsers = {
        'eco@releaf.com': {
          email: 'eco@releaf.com',
          name: '그린어스',
          favoriteTeam: 'KIA 타이거즈',
          joinDate: '2026.06.08',
          password: '1234'
        }
      };
      localStorage.setItem('releaf_registered_users', JSON.stringify(defaultUsers));
      return defaultUsers;
    } catch {
      return {};
    }
  });

  const [userOrders, setUserOrders] = useState<OrderRecord[]>(() => {
    try {
      const user = localStorage.getItem('releaf_current_user');
      if (user) {
        const email = JSON.parse(user).email;
        const storedOrders = localStorage.getItem(`releaf_orders_${email}`);
        return storedOrders ? JSON.parse(storedOrders) : [];
      }
      return [];
    } catch {
      return [];
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // Form Inputs
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [registerName, setRegisterName] = useState<string>('');
  const [registerEmail, setRegisterEmail] = useState<string>('');
  const [registerPassword, setRegisterPassword] = useState<string>('');
  const [registerTeam, setRegisterTeam] = useState<string>('KIA 타이거즈');

  // Login execution handler
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      triggerToast('이메일과 비밀번호를 모두 입력해 주십시오.', 'error');
      return;
    }
    const user = registeredUsers[loginEmail.trim().toLowerCase()];
    if (!user) {
      triggerToast('등록되지 않은 서포터 이메일입니다.', 'error');
      return;
    }
    if (user.password !== loginPassword) {
      triggerToast('비밀번호가 일치하지 않습니다.', 'error');
      return;
    }

    setCurrentUser(user);
    localStorage.setItem('releaf_current_user', JSON.stringify(user));
    
    try {
      const storedOrders = localStorage.getItem(`releaf_orders_${user.email}`);
      const orders = storedOrders ? JSON.parse(storedOrders) : [];
      setUserOrders(orders);
    } catch {
      setUserOrders([]);
    }

    triggerToast(`${user.name} 서포터님, 에코 세션이 활성화되었습니다.`, 'success');
    setIsAuthModalOpen(false);
    setLoginEmail('');
    setLoginPassword('');
  };

  // Register execution handler
  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPassword) {
      triggerToast('모든 입력 필드를 기입해 주십시오.', 'error');
      return;
    }
    if (!registerEmail.includes('@')) {
      triggerToast('올바른 지점 이메일 포맷이 아닙니다.', 'error');
      return;
    }
    if (registerPassword.length < 4) {
      triggerToast('암호는 최소 4자 이상으로 안전하게 구동하십시오.', 'error');
      return;
    }

    const emailKey = registerEmail.trim().toLowerCase();
    if (registeredUsers[emailKey]) {
      triggerToast('이미 세션에 등록된 이메일 계정이네요.', 'error');
      return;
    }

    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

    const newUser: ExtendedUser = {
      email: emailKey,
      name: registerName,
      favoriteTeam: registerTeam,
      joinDate: formattedDate,
      password: registerPassword
    };

    const updatedUsers = { ...registeredUsers, [emailKey]: newUser };
    setRegisteredUsers(updatedUsers);
    localStorage.setItem('releaf_registered_users', JSON.stringify(updatedUsers));

    setCurrentUser(newUser);
    localStorage.setItem('releaf_current_user', JSON.stringify(newUser));
    setUserOrders([]);

    triggerToast(`${registerName}님 지지 가입을 환영합니다! 서포터 세션이 시작되었습니다. 🌿`, 'success');
    setIsAuthModalOpen(false);
    
    setRegisterName('');
    setRegisterEmail('');
    setRegisterPassword('');
  };

  const handleLogout = () => {
    localStorage.removeItem('releaf_current_user');
    setCurrentUser(null);
    setUserOrders([]);
    setIsProfileOpen(false);
    triggerToast('서포터 에코 세션이 안전하게 해제되었습니다.', 'info');
  };

  const userTotalCo2 = userOrders ? userOrders.reduce((total, order) => total + (order.co2Reduction * order.quantity), 0) : 0;

  // Logo Component rendered via Three.js with complete high-depth bevel paths and interactive custom rotation
  const LogoSvg = ({ className = "w-10 h-10", fillBg = "#F5F0E4" }: { className?: string, fillBg?: string }) => (
    <ThreeLogo className={className} fillBg={fillBg} interactive={true} />
  );

  // showing toast notifications in premium Linear design
  const triggerToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Convert uploaded image file to data URL and persist it as active product asset
  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      triggerToast('이미지 파일(*.png, *.jpg, *.jpeg, *.webp 등)만 업로드할 수 있습니다.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl && selectedProduct) {
        const updatedProduct = {
          ...selectedProduct,
          imageUrl: dataUrl
        };
        const updatedProducts = products.map((p) => {
          if (p.id === selectedProduct.id) {
            return updatedProduct;
          }
          return p;
        });

        setProducts(updatedProducts);
        localStorage.setItem('re_leaf_products_v4', JSON.stringify(updatedProducts));
        setSelectedProduct(updatedProduct);
        setActiveImageIndex(0); // Instantly set index to the newly loaded layout picture
        triggerToast('제품 사진이 성공적으로 반영되었습니다! 📸', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetImage = () => {
    if (selectedProduct) {
      const updatedProduct = {
        ...selectedProduct,
        imageUrl: "" // resets back to empty triggering default blueprint / emblem
      };
      const updatedProducts = products.map((p) => {
        if (p.id === selectedProduct.id) {
          return updatedProduct;
        }
        return p;
      });

      setProducts(updatedProducts);
      localStorage.setItem('re_leaf_products_v4', JSON.stringify(updatedProducts));
      setSelectedProduct(updatedProduct);
      setActiveImageIndex(0);
      triggerToast('기본 그래픽 형태로 다시 복구되었습니다.', 'info');
    }
  };

  // Cart Management
  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItem = cart.find((item) => item.product.id === product.id);
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.stock) {
        triggerToast(`한정 수량 초과: 이 상품의 준비된 잔여 한정 수량은 최대 ${product.stock}개입니다.`, 'error');
        return;
      }
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQuantity } : item
        )
      );
      triggerToast(`${product.name} 수량을 추가했습니다.`);
    } else {
      if (quantity > product.stock) {
        triggerToast(`준비된 한정 수량(${product.stock}개)보다 많이 주문할 수 없습니다.`, 'error');
        return;
      }
      setCart((prevCart) => [...prevCart, { product, quantity }]);
      triggerToast(`${product.name}을 장바구니에 온전히 안전하게 담았습니다.`);
    }
  };

  const updateCartQuantity = (productId: number, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const nextQuantity = item.quantity + delta;
            if (nextQuantity > item.product.stock) {
              triggerToast(`준비된 한정 수고 수량 ${item.product.stock}개를 초과할 수 없습니다.`, 'info');
              return item;
            }
            return { ...item, quantity: nextQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const removeFromCart = (productId: number, name: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    triggerToast(`${name}을 장바구니에서 안전히 제거했습니다.`, 'info');
  };

  const totalCartPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const startCheckout = () => {
    if (!currentUser) {
      triggerToast('순환 소포를 출하하시려면 먼저 서포터 로그인을 추진하십시오.', 'error');
      setAuthTab('login');
      setIsAuthModalOpen(true);
      return;
    }
    setShippingName(currentUser.nickname || currentUser.name || '');
    setIsCheckoutModalOpen(true);
    setIsCartOpen(false);
  };

  const handleCheckout = () => {
    if (!currentUser) {
      triggerToast('순환 소포를 출하하시려면 먼저 서포터 로그인을 추진하십시오.', 'error');
      setAuthTab('login');
      setIsAuthModalOpen(true);
      return;
    }

    if (!shippingAddress.trim()) {
      triggerToast('배송 주소를 입력해 주세요.', 'error');
      return;
    }
    if (!shippingName.trim()) {
      triggerToast('수령인 이름을 입력해 주세요.', 'error');
      return;
    }
    if (!shippingPhone.trim()) {
      triggerToast('연락처를 입력해 주세요.', 'error');
      return;
    }

    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')} ${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`;
    
    const newOrders: OrderRecord[] = cart.map((item, idx) => ({
      id: `RL-${today.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}-${idx}`,
      productName: item.product.name,
      emoji: item.product.emoji,
      price: item.product.price,
      quantity: item.quantity,
      co2Reduction: item.product.co2Reduction,
      date: formattedDate
    }));

    const updatedOrders = [...newOrders, ...userOrders];
    setUserOrders(updatedOrders);
    localStorage.setItem(`releaf_orders_${currentUser.email}`, JSON.stringify(updatedOrders));

    triggerToast('프로토타입 주문이 성공적으로 완료되었습니다! 가상 배송 및 순환 보증이 즉시 개시됩니다.', 'success');
    
    // Clear inputs and close modal
    setShippingAddress('');
    setShippingName('');
    setShippingPhone('');
    setCart([]);
    setIsCheckoutModalOpen(false);

    // Open user profile to let them inspect their orders
    setTimeout(() => {
      setIsProfileOpen(true);
    }, 1000);
  };

  const filteredProducts = (selectedCategory === 'all' 
    ? products 
    : products.filter((p) => p.category === selectedCategory)
  ).slice().sort((a, b) => a.price - b.price);

  const fetchAiEssay = async (product: Product) => {
    setEssayLoading(true);
    setEssayResult(null);
    try {
      const response = await fetch('/api/generate-essay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: product.name,
          material: product.material,
          seasonStory: product.seasonStory,
          co2Reduction: product.co2Reduction,
        }),
      });

      if (!response.ok) {
        throw new Error('API server unreachable');
      }

      const data = await response.json();
      if (data && (data.essay || data.guarantee)) {
        setEssayResult({
          essay: data.essay,
          guarantee: data.guarantee
        });
        triggerToast('AI 에세이와 정품 디지털 확인서가 결합 가공 완료되었습니다.', 'success');
      } else {
        throw new Error('Invalid essay data format');
      }
    } catch (err) {
      console.warn('API fetch warning, loading premium custom designed fallback essay.', err);
      setTimeout(() => {
        setEssayResult({
          essay: `뜨거운 야구장의 여름 열기 아래, 격렬히 회전하던 2025 리그의 마지막 아웃 카운트가 울리던 순간을 품었습니다. 관중들의 환호와 승부의 전율이 새겨진 한 조각 단풍나무와 질긴 야구공 가죽은, 단순 폐기되던 과거 지점을 넘어 'Re:leaf'의 기술적이고 조형적인 연마를 통해 기품 서린 서재 소품으로 새로 태어납니다.\n\n이 작은 조각은 책상 위의 우드 트레이, 일터의 그립톡으로 매분 귀하의 지적인 삶의 한 조각과 함께할 것입니다. 과거 수많은 팬들이 모여 뿜었던 강력한 승리의 밀도를 매일의 곁에서 향유해보시기 바랍니다.`,
          guarantee: `이 조각은 KBO 전용 수거망 및 ${product.court}의 서사적 진품 원소만을 온전히 정화하여 직조한 Re:leaf의 한정 보증 제품임을 엄격히 선언합니다.`
        });
        triggerToast('정예 가치 검증을 마친 Re:leaf 사내 수작업 에세이 카드를 로드했습니다.', 'info');
      }, 1200);
    } finally {
      setEssayLoading(false);
    }
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setActiveImageIndex(0);
    setIsEditingImage(false);
    setTempImageUrl(product.imageUrl || '');
    setTempDetailImagesText(product.detailImages ? product.detailImages.join(', ') : '');
    fetchAiEssay(product);
  };

  const saveProductImageChanges = () => {
    if (!selectedProduct) return;
    const trimmedMain = tempImageUrl.trim();
    const hasMain = trimmedMain.length > 0;

    let detailImagesArr = tempDetailImagesText
      .split(',')
      .map(url => url.trim())
      .filter(url => url.length > 0);

    const maxDetailCount = hasMain ? 2 : 3;
    let adjusted = false;

    if (detailImagesArr.length > maxDetailCount) {
      detailImagesArr = detailImagesArr.slice(0, maxDetailCount);
      adjusted = true;
    }

    const finalMainUrl = trimmedMain || undefined;
    const finalDetailUrls = detailImagesArr.length > 0 ? detailImagesArr : undefined;

    const updated = products.map((p) => {
      if (p.id === selectedProduct.id) {
        return {
          ...p,
          imageUrl: finalMainUrl,
          detailImages: finalDetailUrls
        };
      }
      return p;
    });

    setProducts(updated);
    localStorage.setItem('re_leaf_products_v4', JSON.stringify(updated));
    setSelectedProduct({
      ...selectedProduct,
      imageUrl: finalMainUrl,
      detailImages: finalDetailUrls
    });
    setIsEditingImage(false);

    if (adjusted) {
      triggerToast('전체 상품 사진은 대표 이미지 포함 최대 3개까지만 가능하므로 초과분은 제외되어 저장되었습니다.', 'info');
    } else {
      triggerToast('상품 제품 조형 상세 이미지가 수정 반영되었습니다.', 'success');
    }
  };

  const handleSubscription = (e: FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setIsSubmittingSubscription(true);
    setTimeout(() => {
      triggerToast(`${emailInput} 계정으로 출시 스토어 뉴스 전향 알림을 연동 신청 완료했습니다.`, 'success');
      setEmailInput('');
      setIsSubmittingSubscription(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f2f0eb] text-[rgba(0,0,0,0.87)] flex flex-col selection:bg-[#00754a]/20 selection:text-[#00754a]">

      {/* 0. FLOATING STICKY NAVBAR */}
      <header className="sticky top-0 z-40 w-full bg-[#f2f0eb]/85 backdrop-blur-md border-b border-[#edebe9] px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          {/* Leftside Brand Logo and Name */}
          <div className="flex items-center gap-3">
            <LogoSvg className="w-9 h-9 border border-[#edebe9] rounded-full" fillBg="#f2f0eb" />
            <a href="#" className="text-xl font-sans font-bold tracking-wider text-[#006241] uppercase hover:opacity-80 transition-opacity">
              Re:leaf
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-sans font-semibold tracking-wider text-[rgba(0,0,0,0.6)]">
            <a href="#brand-story" className="hover:text-[#006241] transition-colors font-mono">ABOUT US</a>
            <a href="#our-goals" className="hover:text-[#006241] transition-colors font-mono">GOALS</a>
            <a href="#our-values" className="hover:text-[#006241] transition-colors font-mono">VALUE</a>
            <a href="#products" className="hover:text-[#00754A] font-bold text-[#00754A] font-mono tracking-widest">SHOP</a>
          </nav>

          {/* Right Actions: Cart and Profile */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 bg-white border border-[#edebe9] rounded-full hover:border-[#00754a] hover:bg-[#edebe9]/20 transition-all flex items-center gap-2 text-xs font-mono font-bold cursor-pointer relative active:scale-[0.95] duration-200"
              aria-label="장바구니 열기"
            >
              <ShoppingBag className="w-4 h-4 text-[#00754a]" />
              <span className="hidden sm:inline text-xs tracking-wider">BAG</span>
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#00754a] text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold font-mono animate-pulse shadow-sm">
                  {totalCartCount}
                </span>
              )}
            </button>

            {currentUser ? (
              <button
                onClick={() => setIsProfileOpen(true)}
                className="p-2.5 bg-white border border-[#edebe9] rounded-full hover:border-[#00754a] hover:bg-[#edebe9]/20 transition-all flex items-center gap-2 text-xs font-mono font-bold cursor-pointer active:scale-[0.95] duration-200"
              >
                <div className="w-4 h-4 rounded-full bg-[#00754a]/10 flex items-center justify-center border border-[#00754a]/20">
                  <User className="w-3 h-3 text-[#00754a]" />
                </div>
                <span>{currentUser.name}</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setAuthTab('login');
                  setIsAuthModalOpen(true);
                }}
                className="p-2.5 bg-[#006241] hover:bg-[#1E3932] text-white rounded-full transition-all text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5 active:scale-[0.95] duration-200 shadow-sm"
              >
                <Lock className="w-3.5 h-3.5 text-[#cba258]" />
                <span>SIGN IN</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 1. HERO SECTION (Spacious and Premium Starbucks-inspired layout) */}
      <section className="relative overflow-hidden py-24 md:py-32 border-b border-[#edebe9] bg-[#f2f0eb]">
        {/* Futuristic Grid Line Backdrop with warm cream masks */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#edebe9_1px,transparent_1px),linear-gradient(to_bottom,#edebe9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] opacity-85" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6"
          >
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#00754a]/10 border border-[#00754a]/20 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#00754a] animate-ping" />
              <span className="text-[10px] font-mono tracking-wider font-bold text-[#006241]">RE:LEAF OFFICIAL SEASON LAUNCH</span>
            </div>
            
            <h1 className="text-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-black tracking-tighter leading-[1.25] flex flex-col gap-2 sm:gap-3">
              <span className="block whitespace-nowrap">그라운드에 다시 돋아난 <span className="text-[#00754a]">잎사귀</span>,</span>
              <span className="block whitespace-nowrap">우리는 <span className="text-[#cba258]">Re:leaf</span> 입니다.</span>
            </h1>
            

            <p className="text-black/85 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto font-normal tracking-wide break-keep">
              KBO 리그 그라운드 위에서 수명을 다한 야구 배트와 상처 입은 공, 찢어진 유니폼을 수집합니다.<br className="hidden md:inline" />
              정교한 위생 정제 가공과 손끝으로 살린 숙련가들의 크래프트맨십을 통해, 찬란했던 시즌의 온기와 서사가 매일 머무는 일상의 정취로 완전히 회귀합니다.
            </p>
            

          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION (Who We Are & Why Began - Premium Editorial Layout) */}
      <section id="brand-story" className="relative overflow-hidden py-24 sm:py-32 border-b border-[#edebe9] bg-[#F4F2EE] text-left">
        {/* Subtle decorative grid background layer to elevate aesthetic */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-28">
          
          {/* Part 1: Who We Are - Split Grid (Left Statement, Right Highlight Cards) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Sticky Brand Slogan Statement */}
            <motion.div 
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-5 space-y-6 lg:sticky lg:top-24"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#006241]/10 rounded-full text-[#006241] text-xs font-mono tracking-widest uppercase font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006241] animate-pulse" />
                WHO WE ARE · 브랜드 소개
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold text-[#006241] tracking-tight leading-tight break-keep">
                경기의 기쁨과 슬픔, 그 물성을 일상으로
              </h2>
              <div className="w-20 h-1 bg-[#cba258] rounded-full" />
              <p className="text-[rgba(0,0,0,0.8)] text-base sm:text-lg leading-relaxed font-normal break-keep">
                Re:leaf는 KBO 그라운드에서 수명을 다한 야구 배트와 공, 유니폼을 한 시즌의 이야기가 담긴 소중한 유산으로 되살리는 자원순환 브랜드입니다. 
              </p>
              <p className="text-[rgba(0,0,0,0.6)] text-sm sm:text-base leading-relaxed font-light break-keep">
                우리는 버려지는 폐기물을 단순한 잔해물이 아닌, 수만 번의 짜릿한 스윙과 승리와 패배의 숨은 기록이 촘촘히 스며 있는 희소성 있는 명예로운 원재료로 취급합니다.
              </p>
            </motion.div>

            {/* Right: Feature Highlights Cards Stack */}
            <div className="lg:col-span-7 space-y-6">
              {/* Feature Card 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-[#edebe9] hover:border-[#006241]/30 transition-all duration-300 shadow-xs group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-sm font-bold text-[#cba258] bg-[#cba258]/10 px-2.5 py-1 rounded-lg">01</span>
                  <h3 className="text-lg font-sans font-bold text-[#006241]">유일무이한 서사의 보존</h3>
                </div>
                <p className="text-sm sm:text-base text-[rgba(0,0,0,0.7)] leading-relaxed font-normal break-keep">
                  획일화된 플라스틱 복제품이 아닙니다. 모든 제품에는 부러진 배트의 천연 나무 껍질 무늬와 흙먼지 질감 그대로, <strong className="text-[#006241]">&apos;그해 치열했던 가을의 한 시즌&apos;</strong>의 피땀 어린 궤적이 그대로 복원되어 고유의 시리얼 보증서와 함께 소장됩니다.
                </p>
              </motion.div>

              {/* Feature Card 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-[#edebe9] hover:border-[#006241]/30 transition-all duration-300 shadow-xs group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-sm font-bold text-[#00754a] bg-[#00754a]/10 px-2.5 py-1 rounded-lg">02</span>
                  <h3 className="text-lg font-sans font-bold text-[#006241]">친환경 자연순환 프로토콜</h3>
                </div>
                <p className="text-sm sm:text-base text-[rgba(0,0,0,0.7)] leading-relaxed font-normal break-keep mb-5">
                  수거 단계부터 숙련된 핸드 크래프트 가공을 거쳐, 제품의 마지막 한 조각의 톱밥 분말에 이르기까지 화학 잔류물이나 환경에 무리를 주는 일 없이 완전하게 순환되는 청정 스펙트럼 시스템을 고수합니다.
                </p>
                <div className="p-4 bg-[#F4F2EE] rounded-2xl flex flex-col sm:flex-row items-center gap-3">
                  <LogoSvg className="w-10 h-10 border border-[#edebe9]/50 rounded-full shrink-0 bg-white" fillBg="#FFFFFF" />
                  <div className="text-xs text-[rgba(0,0,0,0.6)] leading-relaxed text-center sm:text-left">
                    <span className="font-mono font-bold text-[#00754a] uppercase block mb-0.5">KBO ECO-CORP SYSTEM</span>
                    엄격한 위생 검침 및 인체에 전혀 안전한 오가닉 가압 세척 프로콜을 성실하게 수행했습니다.
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="w-full h-px bg-[#edebe9]" />

          {/* Part 2: Why We Began - Contrasting Narrative Storyboard */}
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#cba258]/10 rounded-full text-[#cba258] text-xs font-mono tracking-widest uppercase font-bold">
                WHY WE BEGAN · 우리의 시작
              </div>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-[#006241] tracking-tight text-center break-keep">
                사라지는 순간을 영원처럼 간직하다
              </h2>
            </motion.div>

            {/* Symmetric Contrast Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Cold Ash Box */}
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="bg-[#edebe9]/50 p-8 rounded-[32px] border border-[#edebe9] flex flex-col justify-between space-y-6"
              >
                <div>
                  <span className="font-mono text-xs text-red-700/60 font-bold block mb-2 uppercase tracking-wide">● The Disappearing Ash · 잔해물의 슬픈 소멸</span>
                  <h4 className="text-xl font-sans font-bold text-gray-800 mb-3 break-keep">연기 속으로 태워져 사라지는 기억들</h4>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal break-keep">
                    KBO 리그의 매 시즌이 종료되면 수만 개의 시합용 부러진 배트와 상처 입은 공들이 구슬픈 일괄 소각 수순을 밟아 한 줌의 무기질 재로 소멸하고 맙니다. 그저 폐기물의 번호가 부여되어 영원히 잊혀지는 길입니다.
                  </p>
                </div>
                <div className="text-xs text-gray-400 font-mono">
                  ANNUAL LOSS: 30,000+ BALLS / 5,000+ BATS
                </div>
              </motion.div>

              {/* Warm Memory Box */}
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="bg-[#1E3932]/5 p-8 rounded-[32px] border border-[#006241]/10 flex flex-col justify-between space-y-6"
              >
                <div>
                  <span className="font-mono text-xs text-[#00754a] font-bold block mb-2 uppercase tracking-wide">● The Re:leaf Heritage · 물성에 담긴 고귀한 온기</span>
                  <h4 className="text-xl font-sans font-bold text-[#006241] mb-3 break-keep">관중의 뜨거운 호흡과 끝내기의 서사</h4>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal break-keep">
                    그러나 소멸될 차가운 원재료 이면에는, 인생 첫 직관 오프라인의 설렘, 야간 연장전 9회말 고뇌 끝 투수 교체, 그리고 가을야구 아쉬운 패배에 홀로 눈물짓던 팬들의 잊지 못할 함성과 일기장이 함께 동거하고 있었습니다.
                  </p>
                </div>
                <div className="text-xs text-[#00754a] font-mono">
                  OUR PURPOSE: HANDCRAFTED PRESERVATION OF SACRED SEASONS
                </div>
              </motion.div>
            </div>

            {/* The Great Question Panel */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-5xl mx-auto py-10 text-center px-4"
            >
              <span className="text-[#cba258] text-4xl block mb-3 font-serif font-black">&ldquo;</span>
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <p className="text-base sm:text-xl font-serif text-[#006241]/80 font-normal leading-relaxed break-keep">
                  우리는 수거된 수만 개의 상처 입은 흔적을 어루만지며 정중하고 엄숙하게 물었습니다.
                </p>
                <div className="w-full flex justify-center">
                  <span className="text-[#cba258] block text-center font-sans font-extrabold text-lg sm:text-2xl md:text-3xl underline decoration-wavy decoration-[#cba258]/30 decoration-2 tracking-tight break-keep max-w-4xl leading-snug">
                    &ldquo;이 뜨거웠던 아름다운 계절의 조각들을, 그냥 영원히 허공에 태워 없애는 것이 정말로 합당한 일일까?&rdquo;
                  </span>
                </div>
              </div>
              <span className="text-[#cba258] text-4xl block mt-4 font-serif font-black">&rdquo;</span>
            </motion.div>

            {/* Core Promise Callout block (Strict user constraint fulfillment) */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-12 p-8 sm:p-14 bg-[#1E3932] text-white rounded-[36px] border border-transparent max-w-4xl w-full mx-auto relative overflow-hidden group shadow-xl text-center break-keep"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#cba258]/10 blur-3xl rounded-full" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#00754a]/30 blur-2xl rounded-full" />
              
              <span className="text-xs font-mono tracking-widest text-[#cba258] uppercase block mb-4 font-bold animate-pulse">
                ● CORE PROMISE · 브랜드 약속
              </span>
              <blockquote className="text-2xl sm:text-3xl md:text-4xl font-sans font-extrabold text-white tracking-tight leading-snug mb-5">
                &ldquo;버려질 뻔한 한 시즌을, 매일의 곁으로.&rdquo;
              </blockquote>
              <p className="text-sm sm:text-base text-white/80 font-sans max-w-2xl mx-auto font-normal leading-relaxed">
                Re:leaf의 모든 정직한 라이프 오피스 제품과 자원 보호 지표는, 언제나 이 단 한 문장의 진정성 어린 약속에서 영감을 받고 출발합니다.
              </p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 3. OUR GOALS SECTION (Spacious Centered Layout & Metric Cards) */}
      <section id="our-goals" className="bg-[#edebe9] border-b border-[#edebe9] py-24 sm:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-20 max-w-4xl mx-auto flex flex-col items-center"
          >
            <span className="text-[#006241] text-xs font-mono tracking-widest uppercase block mb-2 font-bold">OUR GOALS</span>
            <h2 className="text-3xl sm:text-4.5xl md:text-5xl font-sans font-bold text-[#006241] tracking-tight text-center">
              우리의 목표 (Our Goals)
            </h2>
            <p className="max-w-[1000px] w-full mx-auto text-center text-black/80 text-base sm:text-lg mt-4 leading-relaxed font-sans font-medium tracking-wide break-keep">
              버려질 뻔한 한 시즌의 소중한 가치를 매일의 일상으로 정교하게 돌려주기 위한, Re:leaf의 4가지 투명한 철칙과 지표입니다.
            </p>
          </motion.div>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            
            {/* Goal Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
              className="bg-[#FFFFFF] border border-[#edebe9] hover:border-[#00754a] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:translate-y-[-4px] shadow-sm text-center items-center break-keep"
            >
              <div className="flex flex-col items-center w-full">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-xl mb-5 border border-green-100">♻️</div>
                <h3 className="text-lg font-sans font-bold text-[#006241] mb-2.5">자원을 되살립니다</h3>
                <p className="text-xs font-sans text-[rgba(0,0,0,0.6)] leading-relaxed mb-5 font-medium max-w-xs">
                  경기장에서 흩어져 소각되던 소재를 단 한 조각도 허투루 낭비하지 않는 투명한 순환 체계를 이룩합니다.
                </p>
                <div className="border-t border-[#edebe9] pt-5 mb-5 w-full text-center">
                  <span className="text-[10px] font-mono text-[#00754a] uppercase tracking-wider block mb-1.5 font-bold">Action · 실천</span>
                  <p className="text-[11px] text-[rgba(0,0,0,0.7)] leading-relaxed font-sans max-w-xs mx-auto">
                    구장 내 수거 거점 운영 및 구단 원정 일정 연동 스마트 수거를 진행하며, 가공 후 마모 목재 및 가죽 미세 잔해물은 테라조나 친환경 충전재로 재구성합니다.
                  </p>
                </div>
              </div>
              <div className="bg-[#f2f0eb] border border-[#edebe9] p-3.5 rounded-xl w-full text-center">
                <span className="text-[9px] font-mono text-[rgba(0,0,0,0.4)] uppercase tracking-tighter block font-bold mb-0.5">Metric · 지표</span>
                <span className="text-xs font-sans font-bold text-[rgba(0,0,0,0.87)]">매 시즌 5톤+ 수거, 가공 잔여물 100% 자원화</span>
              </div>
            </motion.div>
 
            {/* Goal Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="bg-[#FFFFFF] border border-[#edebe9] hover:border-[#00754a] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:translate-y-[-4px] shadow-sm text-center items-center break-keep"
            >
              <div className="flex flex-col items-center w-full">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-xl mb-5 border border-blue-100">📉</div>
                <h3 className="text-lg font-sans font-bold text-[#006241] mb-2.5">환경 부담을 줄입니다</h3>
                <p className="text-xs font-sans text-[rgba(0,0,0,0.6)] leading-relaxed mb-5 font-medium max-w-xs">
                  친환경적 공법만을 엄수하며, 제품을 생산하는 과정 전반까지 모두 완결하게 자연을 닮아갑니다.
                </p>
                <div className="border-t border-[#edebe9] pt-5 mb-5 w-full text-center">
                  <span className="text-[10px] font-mono text-[#00754a] uppercase tracking-wider block mb-1.5 font-bold">Action · 실천</span>
                  <p className="text-[11px] text-[rgba(0,0,0,0.7)] leading-relaxed font-sans max-w-xs mx-auto">
                    유해한 화학 약품 가공 처리를 완전 배제한 식물성 태닝 및 스팀 세척을 이행하고 100% 재생 종이를 단독 사용해 제품별 이산화탄소 저감량을 투명히 공개합니다.
                  </p>
                </div>
              </div>
              <div className="bg-[#f2f0eb] border border-[#edebe9] p-3.5 rounded-xl w-full text-center">
                <span className="text-[9px] font-mono text-[rgba(0,0,0,0.4)] uppercase tracking-tighter block font-bold mb-0.5">Metric · 지표</span>
                <span className="text-xs font-sans font-bold text-[rgba(0,0,0,0.87)]">소각 폐기 대비 연간 약 120톤 온실 탄소 저감</span>
              </div>
            </motion.div>
 
            {/* Goal Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="bg-[#FFFFFF] border border-[#edebe9] hover:border-[#00754a] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:translate-y-[-4px] shadow-sm text-center items-center break-keep"
            >
              <div className="flex flex-col items-center w-full">
                <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center text-xl mb-5 border border-pink-100">👥</div>
                <h3 className="text-lg font-sans font-bold text-[#006241] mb-2.5">팬과 경기를 잇습니다</h3>
                <p className="text-xs font-sans text-[rgba(0,0,0,0.6)] leading-relaxed mb-5 font-medium max-w-xs">
                  단순 외형의 소품이 아니라, 경기장에서 뿜어져 나오던 가을 야구의 뜨거운 기억과 역사의 순간을 드립니다.
                </p>
                <div className="border-t border-[#edebe9] pt-5 mb-5 w-full text-center">
                  <span className="text-[10px] font-mono text-[#00754a] uppercase tracking-wider block mb-1.5 font-bold">Action · 실천</span>
                  <p className="text-[11px] text-[rgba(0,0,0,0.7)] leading-relaxed font-sans max-w-xs mx-auto">
                    모든 완제품에 해당 소재 고유의 활동 기수 시즌을 기록한 에세이 카드를 동봉하며, 오프라인 품질 연쇄 보증서와 고유의 시리얼 넘버를 손끝으로 영구히 수작업 각인합니다.
                  </p>
                </div>
              </div>
              <div className="bg-[#f2f0eb] border border-[#edebe9] p-3.5 rounded-xl w-full text-center">
                <span className="text-[9px] font-mono text-[rgba(0,0,0,0.4)] uppercase tracking-tighter block font-bold mb-0.5">Metric · 지표</span>
                <span className="text-xs font-sans font-bold text-[rgba(0,0,0,0.87)]">전품목 원자재 연동 출처 100% 추적 보증 및 인증</span>
              </div>
            </motion.div>
 
            {/* Goal Card 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
              className="bg-[#FFFFFF] border border-[#edebe9] hover:border-[#00754a] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:translate-y-[-4px] shadow-sm text-center items-center break-keep"
            >
              <div className="flex flex-col items-center w-full">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-xl mb-5 border border-purple-100">🌐</div>
                <h3 className="text-lg font-sans font-bold text-[#006241] mb-2.5">순환을 넓힙니다</h3>
                <p className="text-xs font-sans text-[rgba(0,0,0,0.6)] leading-relaxed mb-5 font-medium max-w-xs">
                  야구장의 열띤 에코 리프레시로부터 시작해, 이 땅의 사라지고 무색해져 가는 모든 아름다운 가치들을 순환시킵니다.
                </p>
                <div className="border-t border-[#edebe9] pt-5 mb-5 w-full text-center">
                  <span className="text-[10px] font-mono text-[#00754a] uppercase tracking-wider block mb-1.5 font-bold">Action · 실천</span>
                  <p className="text-[11px] text-[rgba(0,0,0,0.7)] leading-relaxed font-sans max-w-xs mx-auto">
                    지자체, 프로구단, 위탁 수거사, Re:leaf 간 가치 협약을 충실히 성사시키고 선수협 등과의 제휴 기부 활동을 펼며 점차 다양한 타 프로 리그 구조체로 대중 순환 제도를 펼쳐 갑니다.
                  </p>
                </div>
              </div>
              <div className="bg-[#f2f0eb] border border-[#edebe9] p-3.5 rounded-xl w-full text-center">
                <span className="text-[9px] font-mono text-[rgba(0,0,0,0.4)] uppercase tracking-tighter block font-bold mb-0.5">Metric · 지표</span>
                <span className="text-xs font-sans font-bold text-[rgba(0,0,0,0.87)]">지원 협력 프로 구단 확장, 타 타겟 리그 진출 완료</span>
              </div>
            </motion.div>
 
          </div>
        </div>
      </section>

      {/* 4. CORE VALUES SECTION */}
      <section id="our-values" className="py-24 sm:py-32 bg-[#f2f0eb] border-b border-[#edebe9] scroll-mt-16 relative text-center">
        <div className="absolute inset-0 bg-[#00754a]/[0.01] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-20 max-w-2xl mx-auto flex flex-col items-center"
          >
            <span className="text-[#006241] text-xs font-mono tracking-widest uppercase block mb-2 font-bold">CORE VALUES</span>
            <h2 className="text-3xl sm:text-4.5xl md:text-5xl font-sans font-bold text-[#006241] tracking-tight">
              우리의 핵심 가치 (Our Values)
            </h2>
            <p className="max-w-2xl mx-auto text-center text-black/80 text-base sm:text-lg mt-4 leading-relaxed font-sans font-medium tracking-wide break-keep">
              유기적인 순환 브랜드 Re:leaf를 흔들림 없이 수호하는 세 가지 주춧돌입니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
            {/* Value card 1: 진정성 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
              className="bg-white p-8 sm:p-10 rounded-[32px] border border-[#edebe9] hover:border-[#00754a] transition-all duration-300 hover:translate-y-[-4px] shadow-sm flex flex-col items-center text-center break-keep"
            >
              <div className="flex flex-col items-center mb-6">
                <span className="text-4xl sm:text-5xl block mb-6">🏷️</span>
                <span className="text-[10px] font-mono text-[#00754a] tracking-wider uppercase block mb-2 font-bold">VALUES.01 · AUTHENTICITY</span>
                <h3 className="text-2xl font-sans font-bold text-[#006241]">진정성</h3>
              </div>
              <div className="w-full">
                <p className="max-w-[330px] mx-auto text-center text-xs sm:text-sm text-[rgba(0,0,0,0.6)] leading-relaxed font-normal">
                  우리는 일시적으로 반짝하고 사라지거나 가치를 위장하는 타협을 거부합니다. 스마트 칩이나 기술을 내세워 가상으로 존재를 포장하는 대신, 정성이 가득한 <strong className="text-[#006241]">손글씨 가죽 택, 시즌 넘버 시리얼, 직접 집필한 에세이 카드</strong>와 아날로그식 보증서로 본질과 원재료의 정직함을 있는 그대로 엄격히 증명합니다.
                </p>
              </div>
            </motion.div>

            {/* Value card 2: 서사 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="bg-white p-8 sm:p-10 rounded-[32px] border border-[#edebe9] hover:border-[#00754a] transition-all duration-300 hover:translate-y-[-4px] shadow-sm flex flex-col items-center text-center break-keep"
            >
              <div className="flex flex-col items-center mb-6">
                <span className="text-4xl sm:text-5xl block mb-6">📖</span>
                <span className="text-[10px] font-mono text-[#00754a] tracking-wider uppercase block mb-2 font-bold">VALUES.02 · NARRATIVE & STORY</span>
                <h3 className="text-2xl font-sans font-bold text-[#006241]">서사</h3>
              </div>
              <div className="w-full">
                <p className="max-w-[330px] mx-auto text-center text-xs sm:text-sm text-[rgba(0,0,0,0.6)] leading-relaxed font-normal">
                  우리는 쓸모를 잃어버렸다고 지레 쓰레기로 함부로 버려지는 원물들에 생생히 스며든 역사를 믿습니다. 단순한 플라스틱 장식품을 복제해 파는 것을 단연 지양하며, 모든 완제품에는 <strong className="text-[#006241]">&apos;KBO 구장과 치열했던 그해 가을 한 시즌&apos;</strong>의 피땀 눈물의 궤적을 소중히 보존하여, 물건을 소비하기보다는 승리의 가슴벅찬 기억을 양도합니다.
                </p>
              </div>
            </motion.div>

            {/* Value card 3: 순환 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="bg-white p-8 sm:p-10 rounded-[32px] border border-[#edebe9] hover:border-[#00754a] transition-all duration-300 hover:translate-y-[-4px] shadow-sm flex flex-col items-center text-center break-keep"
            >
              <div className="flex flex-col items-center mb-6">
                <span className="text-4xl sm:text-5xl block mb-6">🔄</span>
                <span className="text-[10px] font-mono text-[#00754a] tracking-wider uppercase block mb-2 font-bold">VALUES.03 · CLOSED LOOP</span>
                <h3 className="text-2xl font-sans font-bold text-[#006241]">순환</h3>
              </div>
              <div className="w-full">
                <p className="max-w-[330px] mx-auto text-center text-xs sm:text-sm text-[rgba(0,0,0,0.6)] leading-relaxed font-normal">
                  수거 단계에서 정교한 핸드 크래프트 가공, 그리고 고운 톱밥 분말 한 단자가 흩어지는 최후의 순간까지 환경에 티끌 하나 안기는 일 없이 완전히 흡수되며 되돌아갑니다. 끝이라고 여겨져 슬프게 버려진 물건들에게 새로운 고매한 가치의 싹을 틔워 다시 사람에게로 향하게 만드는 <strong className="text-[#006241]">순수 에코 스펙트럼</strong>을 완성합니다.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. BRAND CLOSING MANIFESTO */}
      <section className="bg-[#1E3932] text-white py-24 sm:py-32 relative overflow-hidden text-center border-b border-[#1E3932]">
        <div className="absolute inset-0 bg-[#cba258]/5 opacity-60 backdrop-blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30" />
        
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto px-4 relative z-10 space-y-8"
        >
          <span className="text-[#cba258] text-[11px] font-mono tracking-[0.3em] uppercase block font-bold">RE:LEAF MANIFESTO CLOSING</span>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-light tracking-tight leading-[1.3] text-white">
            "한 시즌은 끝나도,<br className="sm:hidden" /> 그계절은 사라지지 않습니다."
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed font-sans font-light">
            그라운드의 깊은 곳에 남겨진 뜨거운 흙을 딛고, 조용하지만 마침내 울창한 잎이 다시 힘차게 돋아납니다.<br />
            그라운드에 다시 돋아난 잎사귀, 우리는 <strong>Re:leaf</strong> 입니다.
          </p>

          <div className="pt-6">
            <a 
              href="#products" 
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-[#1E3932] hover:bg-[#edebe9] active:scale-[0.95] duration-200 transition-all text-xs font-mono font-bold tracking-widest rounded-full shadow-lg cursor-pointer"
            >
              EXPLORE OUR SEASONAL ARTIFACTS
              <ArrowRight className="w-4 h-4 text-[#cba258]" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* 4. PRODUCTS GRID (Filter Chips + 3-Col Card Grid in Sleek Theme UI) */}
      <section id="products" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 max-w-3xl mx-auto flex flex-col items-center"
        >
          <span className="text-[#00754a] text-xs font-mono uppercase tracking-[0.2em] mb-2.5 block font-bold text-center">Premium Upcycled Store</span>
          <h2 className="text-3xl sm:text-4.5xl md:text-5xl font-sans font-extrabold text-[#006241] tracking-tight mb-4 text-center leading-tight">
            Re:leaf&apos;s Product
          </h2>
          <p className="text-[rgba(0,0,0,0.65)] text-sm sm:text-base leading-relaxed font-sans font-normal text-center max-w-2xl">
            실제 KBO 경기 그라운드에서 수확된 소중한 계절의 증거들입니다.<br />
            부러진 지점의 결과 손때 묻은 스티치가 모두 달라 세상에 단 하나뿐인 아우라를 지닙니다.
          </p>

          <div className="mt-6 flex items-center gap-2 px-3 py-1.5 bg-[#006241]/5 border border-[#006241]/10 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#cba258] animate-pulse"></span>
            <span className="text-xs text-[#006241] font-mono leading-none font-semibold">
              정렬 기준: 실시간 최저 가격순 (Price: Low to High)
            </span>
          </div>
        </motion.div>

        {/* Filter Chips inside sleek warm tray - forced to wrap on desktop or scroll on mobile */}
        <div className="flex flex-nowrap md:flex-wrap md:justify-center overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-3 mb-14 border border-[#edebe9]/60 p-2 rounded-2xl bg-[#edebe9]/30 max-w-full w-full">
          {[
            { id: 'all', label: '전체 목록', code: 'ALL' },
            { id: 'bat', label: '🏏 단풍나무 배트', code: 'BAT' },
            { id: 'ball', label: '⚾ 천연 공인구 가죽', code: 'LEATHER' },
            { id: 'uniform', label: '👕 유니폼 에스테르 원단', code: 'POLY' },
            { id: 'prop', label: '✨ 데스크 오거나이저', code: 'PROP' },
          ].map((chip) => (
            <button
              key={chip.id}
              onClick={() => setSelectedCategory(chip.id)}
              className={`shrink-0 px-5 py-3 rounded-xl text-xs sm:text-sm tracking-wide transition-all duration-300 cursor-pointer border flex items-center gap-2 font-sans font-medium hover:scale-[1.02] active:scale-[0.98] ${
                selectedCategory === chip.id
                  ? 'bg-[#00754a] text-white border-transparent font-bold shadow-md'
                  : 'bg-white text-[rgba(0,0,0,0.7)] hover:text-[#00754a] hover:bg-white/80 border-[#edebe9]'
              }`}
            >
              <span>{chip.label}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                selectedCategory === chip.id ? 'bg-white/20 text-white' : 'bg-black/5 text-[rgba(0,0,0,0.45)]'
              }`}>
                {chip.code}
              </span>
            </button>
          ))}
        </div>

        {/* 3-Column Card Grid - Sleek warm ivory-white style with Signature items in Deep Teal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((p, idx) => {
            const isLowStock = p.stock <= 3;
            const isSignature = p.grade === 'Signature';
            return (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.1, ease: "easeOut" }}
                className={`rounded-[32px] border overflow-hidden flex flex-col group transition-all duration-500 ease-out shadow-md hover:shadow-2xl hover:translate-y-[-8px] ${
                  isSignature 
                    ? 'bg-gradient-to-b from-[#18312b] to-[#0d1d1a] text-white border-[#1e3932] hover:border-[#cba258]/40' 
                    : 'bg-gradient-to-b from-[#FCFAF7] to-[#FAF8F5] text-[#0a0a0a] border-[#edebe9] hover:border-[#00754a]/30'
                }`}
              >
                {/* Media Center with Emojis resembling spec previews */}
                <div 
                  onClick={() => openProductDetail(p)}
                  className={`h-64 flex items-center justify-center relative transition-colors cursor-pointer overflow-hidden ${
                    isSignature 
                      ? 'bg-[#132A24]/50 border-b border-[#132A24]/40' 
                      : 'bg-[#f5f3ee]/80 border-b border-[#edebe9]'
                  }`}
                >
                  {/* Outer delicate inner dashed frame for exhibition effect */}
                  <div className={`absolute inset-4 rounded-[20px] border border-dashed pointer-events-none transition-opacity duration-300 ${
                    isSignature ? 'border-white/10 group-hover:border-white/20' : 'border-[#006241]/10 group-hover:border-[#006241]/20'
                  }`} />

                  {/* Subtle radial glare behind item */}
                  <div className={`absolute w-32 h-32 rounded-full blur-2xl transition-all duration-700 ${
                    isSignature ? 'bg-[#cba258]/10 group-hover:bg-[#cba258]/20' : 'bg-[#00754a]/5 group-hover:bg-[#00754a]/15'
                  }`} />
                  
                  {p.imageUrl ? (
                    <div className="w-full h-full relative z-10 flex items-center justify-center">
                      <img 
                        src={p.imageUrl} 
                        alt={p.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-110"
                      />
                    </div>
                  ) : p.name === "볼 가죽 키링" ? (
                    <div className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] z-10 transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:rotate-2">
                      <BaseballKeyringVisual />
                    </div>
                  ) : (
                    <span className="text-8xl select-none transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-120 group-hover:-rotate-3 z-10 filter drop-shadow-xl">
                      {p.emoji}
                    </span>
                  )}

                  {/* Level / Grade spec Tag */}
                  <div className="absolute top-6 left-6 flex gap-1.5 font-mono z-10">
                    <span className={`px-2.5 py-1 text-[9px] uppercase font-bold border rounded-lg shadow-sm ${
                      isSignature
                        ? 'bg-[#cba258] text-[#1E3932] border-[#cba258]'
                        : 'bg-[#006241]/5 text-[#006241] border-[#006241]/15 font-semibold'
                    }`}>
                      {p.grade === 'Signature' ? 'PRESTIGE SIGNATURE' : 'AUTHENTIC STANDARD'}
                    </span>
                  </div>

                  {/* Co2 Monospace indicator */}
                  <span className={`absolute bottom-6 right-6 font-mono text-[9px] px-2.5 py-1 rounded-lg shadow-xs border z-10 ${
                    isSignature 
                      ? 'bg-black/40 border-white/10 text-[#cba258]' 
                      : 'bg-white border-[#edebe9] text-[#00754a] font-semibold'
                  }`}>
                    🌲 CO₂ Saved -{p.co2Reduction}kg
                  </span>
                </div>

                {/* Info Deck */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Raw Material Pill & Stock state */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`inline-flex items-center text-[10px] font-mono uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded ${
                        isSignature ? 'text-[#cba258] bg-white/5' : 'text-[#00754a] bg-[#00754a]/5'
                      }`}>
                        {p.court}
                      </span>
                      {isLowStock ? (
                        <span className="text-[9px] font-mono font-extrabold text-[#ffffff] bg-[#D9383A] px-2 py-0.5 rounded-full animate-pulse uppercase">
                          🔥 {p.stock}개 남음
                        </span>
                      ) : (
                        <span className={`text-[9px] font-mono uppercase ${
                          isSignature ? 'text-white/45' : 'text-black/40'
                        }`}>
                          In Stock ({p.stock})
                        </span>
                      )}
                    </div>

                    {/* Product Title */}
                    <h3 
                      onClick={() => openProductDetail(p)}
                      className={`text-xl sm:text-2xl font-sans font-extrabold cursor-pointer transition-colors duration-200 mb-2 leading-snug ${
                        isSignature ? 'text-white hover:text-[#cba258]' : 'text-[#006241] hover:text-[#00754a]'
                      }`}
                    >
                      {p.name}
                    </h3>

                    {/* Historical Material Tagline */}
                    <p className={`text-xs font-semibold mb-3 flex items-center gap-1.5 ${
                      isSignature ? 'text-[#cba258]/80' : 'text-[#00754a]/90'
                    }`}>
                      <span className="text-sm">🏷️</span> 수집 소재: {p.material}
                    </p>

                    {/* Romanticized Season Story Blockquote */}
                    <div className={`my-4 p-3.5 rounded-2xl border text-xs leading-relaxed font-serif ${
                      isSignature
                        ? 'bg-white/5 border-white/5 text-[#cba258]/90 italic'
                        : 'bg-[#006241]/5 border-[#edebe9] text-[#006241]/80 italic'
                    }`}>
                      &ldquo;{p.seasonStory}&rdquo;
                    </div>

                    {/* Brief description */}
                    <p className={`text-xs leading-relaxed mb-6 line-clamp-2 ${
                      isSignature ? 'text-white/75' : 'text-[rgba(0,0,0,0.65)]'
                    }`}>
                      {p.description}
                    </p>
                  </div>

                  <div>
                    {/* Compact Specs Row */}
                    <div className={`border-t pt-5 mb-5 flex items-center justify-between ${
                      isSignature ? 'border-white/10' : 'border-[#edebe9]'
                    }`}>
                      <div className="flex flex-col">
                        <span className={`text-[9px] font-mono uppercase tracking-widest ${
                          isSignature ? 'text-white/45' : 'text-[rgba(0,0,0,0.45)]'
                        }`}>COLLECTION PRICE</span>
                        <div className="flex items-baseline gap-1">
                          <span className={`text-xl font-mono font-black ${
                            isSignature ? 'text-[#cba258]' : 'text-[#006241]'
                          }`}>
                            {p.price.toLocaleString()}원
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Compact sleek CTA button with subtle glow and zoom interaction */}
                    <button
                      onClick={() => addToCart(p)}
                      className={`w-full py-4 font-sans text-xs tracking-widest font-extrabold rounded-full border transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.96] shadow-sm hover:shadow-lg ${
                        isSignature 
                          ? 'bg-white text-[#1E3932] border-transparent hover:bg-[#edebe9] hover:scale-[1.01]' 
                          : 'bg-[#00754a] text-white border-transparent hover:bg-[#006241] hover:scale-[1.01]'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      장바구니에 담기
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 5. BRAND STORY (About Us - Spacious HTML Side-by-Side Horizontal Layout) */}
      <section id="brand-story" className="bg-[#f2f0eb] border-t border-b border-[#edebe9] py-24 sm:py-32 scroll-mt-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#00754a_0.5px,transparent_0.5px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Aesthetic Spec Box */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-5 relative w-full max-w-md mx-auto lg:max-w-none"
            >
              <div className="aspect-square bg-white rounded-[32px] p-8 border border-[#edebe9] flex flex-col justify-between shadow-sm relative overflow-hidden text-center items-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00754a]/5 to-transparent blur-3xl rounded-full scale-125 animate-pulse" />
                
                <div className="flex items-center justify-between border-b border-[#edebe9] pb-6 w-full relative z-10">
                  <LogoSvg className="w-14 h-14" fillBg="#FFFFFF" />
                  <span className="font-mono text-[10px] text-[#006241] font-bold">SYS.RELEAF-2025</span>
                </div>

                <div className="my-8 relative z-10 flex flex-col items-center">
                  <div className="text-2xl mb-3 font-mono text-[#00754a] tracking-wider font-bold">ECO_HERITAGE</div>
                  <h4 className="text-lg font-sans font-bold text-[#006241] mb-2">"KBO 가을의 순환 마스터 조각"</h4>
                  <p className="text-xs text-[rgba(0,0,0,0.6)] leading-relaxed font-sans font-normal max-w-xs text-center">
                    KBO 마운드와 타석에서 버려지는 자취들은,<br />
                    한 시즌 내내 팬들이 외쳤던 승리를 향한 집념과 노력을 그대로 저장하고 있습니다.<br />
                    이것들을 현대적 미감으로 연마 정화합니다.
                  </p>
                </div>

                <div className="bg-[#f2f0eb] border border-[#edebe9] p-4 rounded-xl flex items-center justify-between w-full relative z-10">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4.5 h-4.5 text-[#00754a]" />
                    <span className="text-[10px] font-mono text-[#006241] font-bold font-sans">SECURE_CERTIFIED</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#00754a] font-bold">REG.100%</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Dynamic Narrative Story paragraphs */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left items-center lg:items-start"
            >
              <span className="text-[#00754a] text-xs font-mono tracking-widest uppercase block font-bold mb-4">Brand Philosophy</span>
              <h2 className="text-3xl sm:text-4.5xl lg:text-5xl font-sans font-bold text-[#006241] leading-[1.2] mb-6">
                "버려질 뻔한 한 시즌이,<br className="hidden lg:block" />매일의 곁이 됩니다."
              </h2>
              <div className="space-y-6 text-sm sm:text-base lg:text-md text-[rgba(0,0,0,0.7)] leading-relaxed font-sans font-normal">
                <p>
                  야구 경기 중 수명이 다한 배트는 단지 소각되거나,<br />
                  공터 구석의 잡목 폐기물로 변하는 경우가 대다수입니다.<br />
                  투타 피칭 공인 한 구 마다 새겨진 가죽 결의 거친 자취들은,<br />
                  선수들의 수분이나 무결한 마모 패턴을 지닌 소중한 자산입니다.
                </p>
                <p>
                  &apos;Re:leaf&apos;는 인체 유해한 목재 화학 가압제를 가미하는 대신,<br />
                  천연 가죽 그대로를 연마 가공해 귀사의 Desk 및 서재에 걸맞은<br />
                  견고한 집성 트레이, 코스터, 키링으로 아름답게 재정제해 냅니다.<br />
                  책장을 만지는 손끝에서 KBO 결전지 고유의 뜨거운 위대함을 다시 한번 속삭여 보십시오.
                </p>
              </div>

              {/* Specs Block */}
              <div className="mt-12 flex justify-center lg:justify-start items-center gap-12 border-t border-[#edebe9] pt-8 w-full max-w-md">
                <div>
                  <h4 className="text-3xl sm:text-4xl font-mono font-bold text-[#006241]">8,420+</h4>
                  <p className="text-[10px] font-mono text-[rgba(0,0,0,0.4)] uppercase tracking-tighter">COLLECTED.BATS</p>
                </div>
                <div className="w-px h-10 bg-[#edebe9]"></div>
                <div>
                  <h4 className="text-3xl sm:text-4xl font-mono font-bold text-[#cba258]">24,600+</h4>
                  <p className="text-[10px] font-mono text-[rgba(0,0,0,0.4)] uppercase tracking-tighter">REFINED.LEATHERS</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 6. SUSTAINABILITY STATISTICS */}
      <section id="sustainability" className="py-24 bg-[#f2f0eb] scroll-mt-6 border-b border-[#edebe9] text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16 max-w-xl mx-auto flex flex-col items-center"
          >
            <span className="text-xs font-mono text-[#00754a] tracking-widest uppercase mb-2 block font-bold">Eco Stats</span>
            <h2 className="text-3xl sm:text-4.5xl font-sans font-bold text-[#006241]">연간 자원 정량 순환 리포트</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Block 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
              className="bg-[#FFFFFF] p-8 rounded-[24px] border border-[#edebe9] hover:border-[#00754a] relative flex flex-col justify-between shadow-xs transition-all duration-300 items-center text-center"
            >
              <div className="flex flex-col items-center">
                <span className="text-4xl block mb-4">🍃</span>
                <span className="text-[10px] font-mono text-[#00754a] tracking-widest uppercase block mb-1 font-bold">CO2.REPORT.01</span>
                <h4 className="text-lg font-sans font-bold text-[#006241] mb-3">연간 CO₂ 방출 저감</h4>
              </div>
              <div className="w-full">
                <p className="text-3xl font-mono font-bold text-[#cba258] mb-2">-120톤 +</p>
                <p className="text-xs text-[rgba(0,0,0,0.6)] leading-relaxed font-sans font-normal max-w-xs mx-auto">
                  폐목재 매립지 단순 압착 또는 플라스틱 재생 과정 중 소모되던<br />
                  연소 방출 탄소를 대폭 경감하고,<br />
                  무수 가열 연마 공정으로 영구 대체했습니다.
                </p>
              </div>
            </motion.div>

            {/* Block 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="bg-[#FFFFFF] p-8 rounded-[24px] border border-[#edebe9] hover:border-[#00754a] relative flex flex-col justify-between shadow-xs transition-all duration-300 items-center text-center"
            >
              <div className="flex flex-col items-center">
                <span className="text-4xl block mb-4">🎒</span>
                <span className="text-[10px] font-mono text-[#00754a] tracking-widest uppercase block mb-1 font-bold">CO2.REPORT.02</span>
                <h4 className="text-lg font-sans font-bold text-[#006241] mb-3">시즌 회수 실물 가죽</h4>
              </div>
              <div className="w-full">
                <p className="text-3xl font-mono font-bold text-[#00754a] mb-2">5.0톤 +</p>
                <p className="text-xs text-[rgba(0,0,0,0.6)] leading-relaxed font-sans font-normal max-w-xs mx-auto">
                  KBO 가을잔치, 은퇴 세리머니 이후 발생하는 리그 공인 소가죽 및<br />
                  구장 내 폐구 직물들을 수작업 전수 정화해,<br />
                  소멸을 원천 정지해 냅니다.
                </p>
              </div>
            </motion.div>

            {/* Block 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="bg-[#FFFFFF] p-8 rounded-[24px] border border-[#edebe9] hover:border-[#00754a] relative flex flex-col justify-between shadow-xs transition-all duration-300 items-center text-center"
            >
              <div className="flex flex-col items-center">
                <span className="text-4xl block mb-4">🌲</span>
                <span className="text-[10px] font-mono text-[#00754a] tracking-widest uppercase block mb-1 font-bold">CO2.REPORT.03</span>
                <h4 className="text-lg font-sans font-bold text-[#006241] mb-3">연마 잔해 전수 자원화</h4>
              </div>
              <div className="w-full">
                <p className="text-3xl font-mono font-bold text-[#006241] mb-2">100% 순환</p>
                <p className="text-xs text-[rgba(0,0,0,0.6)] leading-relaxed font-sans font-normal max-w-xs mx-auto">
                  제품 가공을 완료한 뒤 흩어지는 대패 분은 전량 친환경 농업 거름블록으로 활용되며,<br />
                  여과 가죽분말은 세라믹 테라조 자재로 소멸 없이 완전히 순환됩니다.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 7. RESTOCK SUBSCRIPTION (Technical newsletter input) */}
      <section className="py-24 bg-[#f2f0eb] border-t border-b border-[#edebe9] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#00754a]/5 to-transparent blur-3xl rounded-full scale-125 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl mx-auto px-4 text-center relative z-10"
        >
          <span className="text-[#00754a] text-xs font-mono tracking-widest uppercase mb-3 block font-bold">SUBSCRIBE.NOTIFY</span>
          <h2 className="text-2xl sm:text-3.5xl font-sans font-bold text-[#006241] mb-4">
            한정판 출시 및 시즌 재입고 알림
          </h2>
          <p className="text-xs sm:text-sm text-[rgba(0,0,0,0.6)] max-w-lg mx-auto mb-10 leading-relaxed font-sans font-normal">
            공의 한정 배적 수량 여하에 따라 불시에 출시되는 독서링,<br />
            가을야구 디퓨저 등의 시그니처 굿즈 배정 정보를,<br />
            디지털 뉴스레터로 신속하게 만나보십시오.
          </p>

          <form onSubmit={handleSubscription} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="디지털 이메일 주소 입력" 
              className="flex-1 bg-[#FFFFFF] border border-[#edebe9] focus:border-[#00754a] px-5 py-3.5 rounded-full text-xs font-mono text-[#006241] outline-none transition-all placeholder-[rgba(0,0,0,0.3)] shadow-xs"
            />
            <button 
              type="submit"
              disabled={isSubmittingSubscription}
              className="px-8 py-3.5 bg-[#00754a] text-white text-xs font-mono tracking-widest font-bold rounded-full hover:bg-[#006241] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.95]"
            >
              {isSubmittingSubscription ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#cba258]" />
                  SUBMITTING
                </>
              ) : (
                'SUBSCRIBE'
              )}
            </button>
          </form>
        </motion.div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-[#edebe9] text-[rgba(0,0,0,0.6)] pt-20 pb-14 mt-auto text-center border-t border-[#edebe9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="flex flex-col items-center gap-12 sm:gap-16 mb-16 max-w-3xl w-full">
            
            {/* Brand Logo & slogan */}
            <div className="flex flex-col items-center gap-5">
              <div className="flex items-center gap-3 justify-center">
                <LogoSvg className="w-10 h-10 border border-[#edebe9] rounded-full" fillBg="#f2f0eb" />
                <span className="text-xl font-sans font-bold tracking-wider text-[#006241] uppercase">Re:leaf</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed max-w-md text-center mx-auto">
                그라운드에서 소임을 해낸 KBO 야구 배트와 공, 선수들의 유니폼을<br />
                일상의 고매한 서사를 지닌 사물로 다시 되살리는 자원순환 가치 브랜드입니다.
              </p>
              <p className="text-[10px] font-mono tracking-wider font-bold text-[#00754a] uppercase">
                버려질 뻔한 한 시즌을, 매일의 곁으로.
              </p>
            </div>

            {/* Quick Navigation Links */}
            <div className="flex flex-col items-center gap-3">
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#006241] uppercase">INDEX SECTORS</h4>
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs">
                <li><a href="#brand-story" className="hover:text-[#00754a] transition-all">About Us · 브랜드 소개</a></li>
                <li><a href="#our-goals" className="hover:text-[#00754a] transition-all">Goals · 우리의 약속</a></li>
                <li><a href="#our-values" className="hover:text-[#00754a] transition-all">Value · 핵심가치</a></li>
                <li><a href="#products" className="hover:text-[#00754a] transition-all font-bold">Shop · 스토어 카탈로그</a></li>
              </ul>
            </div>

            {/* Legal / Contact Info */}
            <div className="flex flex-col items-center gap-3 max-w-xl">
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#006241] uppercase">RECOVERY SECTOR INFO</h4>
              <div className="flex flex-col items-center text-xs gap-1">
                <span>E-MAIL: service@releaf-kbo.org</span>
                <span>ADDRESS: 서울특별시 송파구 올림픽로 25 서울종합운동장 야구장 6구역</span>
              </div>
              <p className="text-xs block leading-relaxed text-center text-black/45 mt-1">
                본 플랫폼은 가상의 야구 용품 유기 가공 정비 리포트 서포터즈 관제 구역입니다.
              </p>
            </div>

          </div>

          <div className="border-t border-[#d6dbde] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <p className="text-[10px] font-mono text-[rgba(0,0,0,0.5)]">
              © {new Date().getFullYear()} RE:LEAF LABS CORP. ALL RIGHTS RESERVED. REGISTERED ON KBO RECOVERY.
            </p>
            <div className="flex gap-4 text-[10px] font-mono justify-center">
              <a href="#" className="hover:underline">PRIVACY POLICY</a>
              <span>·</span>
              <a href="#" className="hover:underline">TERMS OF USE</a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- SIDE-SLIDE SHOPPING CART DRAWER --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans" role="dialog" aria-modal="true">
          {/* Backdrop Scrim */}
          <div 
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-[2px] transition-opacity cursor-pointer"
          />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-sm sm:max-w-md transform transition-all duration-300">
              <div className="flex h-full flex-col bg-[#f2f0eb] border-l border-[#edebe9] shadow-2xl">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#edebe9] px-6 py-5.5 bg-[#edebe9]">
                  <div className="flex items-center gap-2.5">
                    <ShoppingBag className="w-5 h-5 text-[#00754a]" />
                    <h2 className="text-base font-sans font-bold text-[#006241]">장바구니 세션 정보</h2>
                    <span className="bg-[#00754a] text-white text-[11px] px-2.5 py-0.5 rounded-full font-mono font-bold">
                      {totalCartCount}
                    </span>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 rounded-md hover:bg-white/50 text-[#006241] hover:text-[#00754a] transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body (Scrollable container) */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#f2f0eb]">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
                      <div className="w-20 h-20 rounded-full bg-[#006241]/5 flex items-center justify-center text-5xl">
                        🛒
                      </div>
                      <h3 className="text-lg font-bold text-[#006241]">현재 장바구니가 비어 있습니다.</h3>
                      <p className="text-xs text-neutral-500 leading-relaxed max-w-xs">
                        KBO 경기 리얼 원물에서 수거 가공된 특별한 시그니처 한정판 제품들을 담아 지구를 지키는 순환 리그에 동참하세요.
                      </p>
                      <button
                        onClick={() => {
                          setIsCartOpen(false);
                          const el = document.getElementById('products');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-6 py-2.5 bg-[#00754a] hover:bg-[#006241] text-white text-xs font-bold rounded-full transition-all duration-200 cursor-pointer"
                      >
                        스토어 둘러보기
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-bold">
                        MY_CART_LIST ({cart.length}개 유형)
                      </p>
                      {cart.map((item) => {
                        const isSignature = item.product.grade === 'Signature';
                        return (
                          <div 
                            key={item.product.id}
                            className={`p-4 rounded-2xl border flex gap-3.5 transition-all relative ${
                              isSignature 
                                ? 'bg-gradient-to-br from-[#1E3932] to-[#122420] text-white border-transparent' 
                                : 'bg-white text-[#0a0a0a] border-[#edebe9]'
                            }`}
                          >
                            {/* Emoji visual box */}
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0 select-none overflow-hidden p-1 bg-white ${
                              isSignature ? 'bg-white/10' : 'bg-[#f5f3ee]'
                            }`}>
                              {item.product.imageUrl ? (
                                <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover rounded-lg" referrerPolicy="no-referrer" />
                              ) : item.product.name === "볼 가죽 키링" ? (
                                <BaseballKeyringVisual className="w-full h-full scale-110" />
                              ) : (
                                item.product.emoji
                              )}
                            </div>

                            {/* Item info */}
                            <div className="flex-1 min-w-0 pr-4">
                              <span className={`text-[9px] font-mono uppercase tracking-wider block ${
                                isSignature ? 'text-white/60' : 'text-neutral-500'
                              }`}>
                                {item.product.court} · {item.product.categoryKo}
                              </span>
                              <h4 className="text-sm font-sans font-bold truncate mt-0.5">
                                {item.product.name}
                              </h4>
                              <p className={`text-xs font-mono font-semibold mt-1 ${
                                isSignature ? 'text-[#cba258]' : 'text-[#00754a]'
                              }`}>
                                {(item.product.price).toLocaleString()}원
                              </p>

                              {/* Quantity Controls */}
                              <div className="flex items-center gap-3 mt-3">
                                <span className={`text-[10px] font-bold ${
                                  isSignature ? 'text-white/50' : 'text-neutral-400'
                                }`}>
                                  수량
                                </span>
                                <div className={`flex items-center rounded-lg border overflow-hidden ${
                                  isSignature ? 'border-white/20 bg-white/5' : 'border-[#edebe9] bg-neutral-50'
                                }`}>
                                  <button
                                    onClick={() => updateCartQuantity(item.product.id, -1)}
                                    className={`p-1.5 hover:bg-black/10 transition-colors cursor-pointer ${
                                      isSignature ? 'text-white' : 'text-neutral-600'
                                    }`}
                                    aria-label="수량 감소"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="px-2.5 font-mono text-xs font-bold min-w-6 text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateCartQuantity(item.product.id, 1)}
                                    className={`p-1.5 hover:bg-black/10 transition-colors cursor-pointer ${
                                      isSignature ? 'text-white' : 'text-neutral-600'
                                    }`}
                                    aria-label="수량 증가"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Remove button */}
                            <button
                              onClick={() => removeFromCart(item.product.id, item.product.name)}
                              className={`absolute top-3.5 right-3.5 p-1 rounded hover:bg-black/10 transition-colors cursor-pointer ${
                                isSignature ? 'text-white/50 hover:text-white' : 'text-neutral-400 hover:text-red-500'
                              }`}
                              title="삭제"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Footer Drawer Info (Sticky Summary block) */}
                {cart.length > 0 && (
                  <div className="border-t border-[#edebe9] p-6 bg-[#edebe9]/40 space-y-4">
                    {/* Environmental footprint badge */}
                    <div className="bg-[#006241]/5 border border-[#006241]/15 rounded-xl p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🌲</span>
                        <div className="flex flex-col">
                          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-tight leading-none">FOREST_SAVED</span>
                          <span className="text-xs font-sans font-bold text-[#006241] mt-0.5">총 탄소 배출 저감 효과</span>
                        </div>
                      </div>
                      <span className="text-sm font-mono font-black text-[#00754a]">
                        -{cart.reduce((sum, item) => sum + (item.product.co2Reduction * item.quantity), 0).toFixed(2)}kg CO₂
                      </span>
                    </div>

                    {/* Detailed Pricing Breakdown */}
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-neutral-600">
                        <span>선택 상품수</span>
                        <span className="font-mono font-bold text-neutral-800">{totalCartCount}개 품목</span>
                      </div>
                      <div className="flex items-center justify-between text-neutral-600">
                        <span>배송비</span>
                        <span className="font-sans font-bold text-emerald-600">무료 (Green Delivery)</span>
                      </div>
                      <div className="border-t border-dashed border-[#edebe9] my-2 pt-2 flex items-center justify-between text-sm">
                        <span className="font-sans font-extrabold text-[#006241]">최종 주문 금액</span>
                        <span className="font-mono font-black text-lg text-[#00754a]">
                          {totalCartPrice.toLocaleString()}원
                        </span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                      onClick={startCheckout}
                      className="w-full py-4 bg-[#00754a] hover:bg-[#006241] text-white text-xs font-extrabold font-sans tracking-widest rounded-full transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-[0.97]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#cba258]" />
                      후원 및 구매 완료하기 (결제)
                    </button>
                    
                    <p className="text-[10px] text-center text-neutral-400 font-sans leading-relaxed">
                      주문 완료 시 정품 AI 에세이 발급 권한 및 실물 구단 리사이클 보증 서류가 한 세트로 우송 조율됩니다.
                    </p>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- SIDE-SLIDE USER PROFILE DRAWER --- */}
      {isProfileOpen && currentUser && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans" role="dialog" aria-modal="true">
          
          {/* Backdrop Scrim */}
          <div 
            onClick={() => setIsProfileOpen(false)}
            className="absolute inset-0 bg-neutral-900/45 backdrop-blur-[2px] transition-opacity cursor-pointer"
          />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-sm sm:max-w-md transform transition-all duration-300">
              <div className="flex h-full flex-col bg-[#f2f0eb] border-l border-[#edebe9] shadow-2xl">
                
                {/* Header info */}
                <div className="flex items-center justify-between border-b border-[#edebe9] px-6 py-5.5 bg-[#edebe9]">
                  <div className="flex items-center gap-2.5">
                    <User className="w-5 h-5 text-[#00754a]" />
                    <h2 className="text-base font-sans font-bold text-[#006241]">서포터 세션 정보</h2>
                  </div>
                  <button 
                    onClick={() => setIsProfileOpen(false)}
                    className="p-1 rounded-md hover:bg-white/50 text-[#006241] hover:text-[#00754a] transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Profile Drawer Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f2f0eb]">
                  
                  {/* Supporter Badge Card */}
                  <div 
                    className="rounded-2xl border p-5 relative overflow-hidden"
                    style={{ 
                      borderColor: KBO_TEAMS.find(t => t.name === currentUser.favoriteTeam)?.color + '30',
                      backgroundColor: KBO_TEAMS.find(t => t.name === currentUser.favoriteTeam)?.bg || '#ffffff'
                    }}
                  >
                    <div className="relative z-10 flex items-start justify-between">
                      <div>
                        <span className="text-[9px] font-mono font-bold tracking-widest text-[#6a6a6a] uppercase">RE:LEAF OFFICIAL SUPPORTER</span>
                        <h3 className="text-xl font-sans font-bold text-[#0a0a0a] mt-1">{currentUser.name} 서포터</h3>
                        <p className="text-[11px] font-mono text-[#3a3a3a] mt-1">EM_ADDR: {currentUser.email}</p>
                        <p className="text-[11px] font-mono text-[#6a6a6a]">JOINED_DATE: {currentUser.joinDate}</p>
                      </div>
                      <div className="w-12 h-12 flex items-center justify-center p-1 bg-white rounded-xl shadow-xs border border-white/40">
                        {renderKboTeamLogo(currentUser.favoriteTeam, "w-full h-full")}
                      </div>
                    </div>

                    {/* Team tag banner */}
                    <div className="mt-4 flex items-center gap-1.5">
                      <span 
                        className="w-2.5 h-2.5 rounded-full" 
                        style={{ backgroundColor: KBO_TEAMS.find(t => t.name === currentUser.favoriteTeam)?.color || '#00754a' }} 
                      />
                      <span className="text-xs font-semibold text-[#0a0a0a]">
                        가입 구단: {currentUser.favoriteTeam}
                      </span>
                    </div>
                  </div>

                  {/* Cumulative Ecological Ledger Card */}
                  <div className="bg-white rounded-2xl border border-[#edebe9] p-5 shadow-xs">
                    <div className="flex items-center gap-2 mb-3 border-b border-[#edebe9] pb-2">
                      <Leaf className="w-4 h-4 text-[#00754a]" />
                      <span className="text-xs font-mono font-bold text-[#006241] uppercase">CUMULATIVE_ECO_LEDGER</span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] font-mono text-[#6a6a6a] uppercase">TOTAL.CO2_REDUCTION</span>
                        <p className="text-2xl font-mono font-bold text-[#cba258] mt-0.5">
                          -{(userOrders ? userOrders.reduce((total, order) => total + (order.co2Reduction * order.quantity), 0) : 0).toFixed(2)} KG CO₂e
                        </p>
                      </div>

                      {/* Supporter Badge Level System */}
                      <div className="p-3 bg-[#edebe9] rounded-xl border border-[#edebe9] text-left">
                        <span className="text-[9px] font-mono text-[#6a6a6a] block">SUPPORTER_TIER</span>
                        <span className="text-xs font-bold font-sans text-[#006241] flex items-center gap-1.5 mt-0.5">
                          🏆 {
                            (userOrders ? userOrders.reduce((total, order) => total + (order.co2Reduction * order.quantity), 0) : 0) < 2 
                              ? '에코 루키 (Eco-Rookie)' 
                              : (userOrders ? userOrders.reduce((total, order) => total + (order.co2Reduction * order.quantity), 0) : 0) < 6 
                              ? '그린 챔피언 (Green Challenger)' 
                              : '그린 레전드 (Ground Master)'
                          }
                        </span>
                        <p className="text-[10px] text-[rgba(0,0,0,0.6)] leading-normal font-sans mt-1">
                          {(userOrders ? userOrders.reduce((total, order) => total + (order.co2Reduction * order.quantity), 0) : 0) < 2 
                            ? '기억을 회생 지탱하기 시작한 파릇파릇한 구장의 푸른 잎사귀 등급입니다.' 
                            : (userOrders ? userOrders.reduce((total, order) => total + (order.co2Reduction * order.quantity), 0) : 0) < 6 
                            ? '탄소 보존에 지속적으로 동행하는 자랑스런 그라운드의 챔피언 서포터입니다.' 
                            : '위업의 서사가 고스란히 담긴 거대 그라운드수 수장 권위자 서포터입니다.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Log List */}
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-2 font-mono">
                      <FileText className="w-4 h-4 text-[#00754a]" />
                      <span className="text-xs font-bold text-[#006241] uppercase">MYUPCYCLED.GOODS_LIST (총 {userOrders.length}건)</span>
                    </div>

                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                      {userOrders.length === 0 ? (
                        <div className="py-8 bg-white border border-dashed border-[#edebe9] rounded-xl text-center text-[#6a6a6a]">
                          <p className="text-xs">아직 출하 승인된 완제품 내역이 없습니다.</p>
                          <p className="text-[9.5px] mt-1 font-mono">ORDER_LEDGER_EMPTY</p>
                        </div>
                      ) : (
                        userOrders.map((order, idx) => (
                          <div key={order.id ? `${order.id}-${idx}` : idx} className="p-4 bg-white border border-[#edebe9] rounded-xl text-left scale-100 font-sans">
                            <span className="text-[8px] font-mono font-bold text-[#00754a] block">{order.id} · {order.date}</span>
                            <div className="flex items-center justify-between mt-1 mb-2">
                              <span className="text-xs font-bold text-[#0a0a0a] flex items-center gap-1.5">
                                <span className="bg-[#f2f0eb] border border-[#edebe9] w-6 h-6 rounded flex items-center justify-center text-sm overflow-hidden p-0.5">
                                  {(() => {
                                    const pMatched = products.find(p => p.name === order.productName);
                                    if (pMatched?.imageUrl) {
                                      return <img src={pMatched.imageUrl} alt={order.productName} className="w-full h-full object-cover rounded" referrerPolicy="no-referrer" />;
                                    }
                                    if (order.productName === "볼 가죽 키링") {
                                      return <BaseballKeyringVisual className="w-full h-full scale-110" />;
                                    }
                                    return order.emoji;
                                  })()}
                                </span>
                                {order.productName}
                              </span>
                              <span className="text-xs font-mono font-bold text-[#006241]">
                                {(order.price * order.quantity).toLocaleString()}원
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-mono bg-[#f2f0eb] p-1.5 rounded-md text-[#3a3a3a]">
                              <span>수량: {order.quantity}개</span>
                              <span className="text-[#00754a] font-bold">-{order.co2Reduction * order.quantity}kg CO₂e</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-[#edebe9] bg-[#edebe9]/90">
                  <button
                    onClick={handleLogout}
                    className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:scale-98 text-white rounded-full text-xs font-sans font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors duration-250"
                  >
                    <LogOut className="w-4 h-4" />
                    로그아웃 세션 종료
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      )}




      {/* --- Supporter Register / Login Modal dialog popup --- */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden font-sans" role="dialog" aria-modal="true">
          
          {/* Backdrop Scrim */}
          <div 
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-[2px] cursor-pointer"
          />

          {/* Modal Main Panel */}
          <div className="bg-[#f2f0eb] rounded-3xl overflow-hidden w-full max-w-sm sm:max-w-md relative z-10 border border-[#edebe9] shadow-2xl transition-all animate-fade-in animate-duration-300">
            
            {/* Top Close trigger */}
            <button 
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full border border-[#edebe9] bg-white text-[#006241] cursor-pointer hover:border-[#00754a] hover:scale-105 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Logo display at modal head */}
            <div className="bg-[#edebe9] py-8 border-b border-[#edebe9] flex flex-col items-center justify-center">
              <LogoSvg className="w-14 h-14 mb-2" fillBg="#edebe9" />
              <span className="text-lg font-sans font-bold tracking-tight text-[#006241]">Re:leaf Supporters</span>
              <span className="text-[10px] font-mono text-[rgba(0,0,0,0.4)] tracking-widest uppercase font-bold">KBO RECOVERY SECTOR CLIENT</span>
            </div>

            {/* Elegant Tab switch inside modern tray */}
            <div className="p-4 bg-[#f2f0eb]">
              <div className="grid grid-cols-2 p-1.5 bg-white border border-[#edebe9] rounded-full">
                <button
                  type="button"
                  onClick={() => setAuthTab('login')}
                  className={`py-2.5 rounded-full text-xs font-bold tracking-wider transition-all cursor-pointer ${
                    authTab === 'login'
                      ? 'bg-[#00754a] text-white shadow-xs'
                      : 'text-[rgba(0,0,0,0.6)] hover:text-[#00754a] hover:bg-[#f2f0eb]'
                  }`}
                >
                  로그인
                </button>
                <button
                  type="button"
                  onClick={() => setAuthTab('register')}
                  className={`py-2.5 rounded-full text-xs font-bold tracking-wider transition-all cursor-pointer ${
                    authTab === 'register'
                      ? 'bg-[#00754a] text-[#f2f0eb] shadow-xs'
                      : 'text-[rgba(0,0,0,0.6)] hover:text-[#00754a] hover:bg-[#f2f0eb]'
                  }`}
                >
                  회원가입
                </button>
              </div>
            </div>

            {/* TAB CONTENTS */}
            <div className="px-6 pb-8 bg-[#f2f0eb]">
              {authTab === 'login' ? (
                /* LOGIN FORM */
                <form onSubmit={handleLogin} className="space-y-4 text-left">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold text-[#006241]">SUPPORTER_EMAIL_COORD</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. eco@releaf.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full bg-white border border-[#edebe9] focus:border-[#00754a] px-5 py-3.5 rounded-full text-xs text-[#006241] outline-none transition-all placeholder-[rgba(0,0,0,0.3)] shadow-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold text-[#006241]">SECURE_ROOT_PASSWORD_KEY</label>
                    <input 
                      type="password" 
                      required
                      placeholder="기존 패스코드 기입"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full bg-white border border-[#edebe9] focus:border-[#00754a] px-5 py-3.5 rounded-full text-xs text-[#006241] outline-none transition-all placeholder-[rgba(0,0,0,0.3)] shadow-xs"
                    />
                  </div>

                  {/* Sandbox credentials reminder card */}
                  <div className="p-4 bg-white border border-[#edebe9] rounded-2xl text-[11px] text-[rgba(0,0,0,0.6)] leading-relaxed flex items-start gap-2 shadow-xs">
                    <Info className="w-4 h-4 text-[#cba258] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#006241]">테스트 안내 세션:</strong> 가입 절차 없이 즉시 가용한 테스트 계정을 제공합니다.<br/>
                      <span className="font-mono bg-[#f2f0eb] px-1.5 py-0.5 border border-[#edebe9] rounded text-[9px] text-[#00754a] font-bold">ID: eco@releaf.com</span> / 비밀번호: <span className="font-mono bg-[#f2f0eb] px-1.5 py-0.5 border border-[#edebe9] rounded text-[9px] text-[#00754a] font-bold">1234</span>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3.5 bg-[#00754a] hover:bg-[#006241] text-white font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4 active:scale-95"
                  >
                    <Lock className="w-4 h-4 text-[#cba258]" />
                    SECURE_SESSION.CONNECT
                  </button>
                </form>
              ) : (
                /* REGISTER FORM */
                <form onSubmit={handleRegister} className="space-y-3.5 text-left">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold text-[#006241]">SUPPORTER_REAL_NAME</label>
                    <input 
                      type="text" 
                      required
                      placeholder="성함을 기입해 주십시오"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      className="w-full bg-white border border-[#edebe9] focus:border-[#00754a] px-5 py-3 rounded-full text-xs text-[#006241] outline-none transition-all placeholder-[rgba(0,0,0,0.3)]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold text-[#006241]">NEW_EMAIL_COORD</label>
                    <input 
                      type="email" 
                      required
                      placeholder="coordinate@domain.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="w-full bg-white border border-[#edebe9] focus:border-[#00754a] px-5 py-3 rounded-full text-xs text-[#006241] outline-none transition-all placeholder-[rgba(0,0,0,0.3)]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold text-[#006241]">PASSWORD_SETTING_KEY</label>
                    <input 
                      type="password" 
                      required
                      placeholder="최소 4자 입력하십시오"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="w-full bg-white border border-[#edebe9] focus:border-[#00754a] px-5 py-3 rounded-full text-xs text-[#006241] outline-none transition-all placeholder-[rgba(0,0,0,0.3)]"
                    />
                  </div>

                  {/* Interactive tactile team selection grid */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold text-[#006241]">FAVORITE_KBO_TEAM (응원 구단)</label>
                    <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-[140px] p-2 bg-white rounded-2xl border border-[#edebe9] shadow-xs">
                      {KBO_TEAMS.map((t) => {
                        const isSelected = registerTeam === t.name;
                        return (
                          <button
                            type="button"
                            key={t.name}
                            onClick={() => setRegisterTeam(t.name)}
                            className={`p-2 rounded-xl border text-left flex items-center gap-1.5 transition-all text-[11px] cursor-pointer ${
                              isSelected
                                ? 'border-[#00754a] bg-[#f2f0eb] font-bold text-[#006241]'
                                : 'border-[#edebe9] bg-white text-[#3a3a3a] hover:bg-[#f2f0eb]/50'
                            }`}
                          >
                            <div className="w-5 h-5 flex items-center justify-center shrink-0">
                              {renderKboTeamLogo(t.name, "w-full h-full")}
                            </div>
                            <span className="truncate text-[10px]">{t.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3.5 bg-[#00754a] hover:bg-[#006241] text-white font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4 active:scale-95"
                  >
                    <UserPlus className="w-4 h-4 text-[#cba258]" />
                    REGISTER.SUPPORTER_EXECUTE
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}


      {/* --- PRODUCT DETAIL SPEC MODAL (Charcoal specifications style) --- */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden font-sans" role="dialog" aria-modal="true">
          
          {/* Backdrop Scrim */}
          <div 
            onClick={() => {
              setIsModalOpen(false);
              setEssayResult(null);
            }}
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-[2px] transition-opacity cursor-pointer"
          />

          {/* Modal content body */}
          <div className="bg-[#FFFFFF] rounded-3xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row relative z-10 border border-[#e5e5e5] shadow-2xl transition-all">
            
            {/* Left image and emblem block */}
            <div className="md:w-1/2 bg-[#faf5e8] p-8 md:p-10 flex flex-col justify-between border-r border-[#e5e5e5] relative">
              
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 text-[9px] font-mono tracking-wider border rounded-lg uppercase font-bold ${
                    selectedProduct.grade === 'Signature'
                      ? 'bg-[#1a3a3a] text-white border-transparent'
                      : 'bg-[#FFFFFF] text-[#0a0a0a] border-[#e5e5e5]'
                  }`}>
                    {selectedProduct.grade}.EDITION
                  </span>
                  
                  {/* Developer Settings edit button */}
                  <button 
                    onClick={() => {
                      setIsEditingImage(!isEditingImage);
                      setTempImageUrl(selectedProduct.imageUrl || '');
                      setTempDetailImagesText(selectedProduct.detailImages ? selectedProduct.detailImages.join(', ') : '');
                    }} 
                    title="이미지 URL 설정 변경"
                    className="p-1 hover:bg-black/5 rounded-full text-black/50 hover:text-black/80 transition-colors cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] font-mono text-[#0a0a0a] font-bold">{selectedProduct.court}</span>
              </div>

              {isEditingImage ? (
                /* Sleek Configuration Form to allow pasting any custom image URLs */
                <div className="my-4 bg-white/80 backdrop-blur-xs border border-[#edebe9] rounded-2xl p-5 text-left font-sans text-xs flex-1 flex flex-col justify-center">
                  <span className="text-[10px] font-mono text-[#00754a] font-bold block mb-3 uppercase tracking-wider">🛠️ PRODUCT_MEDIA_SPECIFICATIONS</span>
                  
                  {/* Image count validation display */}
                  {(() => {
                    const hasMain = tempImageUrl.trim().length > 0;
                    const detailCount = tempDetailImagesText
                      .split(',')
                      .map(url => url.trim())
                      .filter(url => url.length > 0).length;
                    const totalCount = (hasMain ? 1 : 0) + detailCount;
                    const isOverLimit = totalCount > 3;

                    return (
                      <div className="mb-3.5 px-3 py-2 rounded-xl bg-[#faf5e8] border border-[#edebe9] text-[10px] flex justify-between items-center font-mono">
                        <span className="text-[#3c3c3c] font-medium">📷 사진 수량 한도 (수익제한)</span>
                        <span className={`font-bold ${isOverLimit ? 'text-red-600 animate-pulse' : 'text-[#00754a]'}`}>
                          {totalCount} / 3 개 {isOverLimit ? '(초과 등록 시 자동 제외)' : '(안정 범위)'}
                        </span>
                      </div>
                    );
                  })()}

                  <div className="space-y-3 mb-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-[10px] font-mono text-black/60 uppercase font-bold">대표 이미지 URL (Main Image)</label>
                        {tempImageUrl.trim() && <span className="text-[9px] text-[#00754a] font-mono font-bold">● 대표 포함</span>}
                      </div>
                      <input 
                        type="text" 
                        value={tempImageUrl} 
                        onChange={(e) => setTempImageUrl(e.target.value)} 
                        placeholder="https://images.unsplash.com/photo-..." 
                        className="w-full text-xs p-2 rounded-lg border border-[#edebe9] bg-white outline-none focus:border-[#00754a]"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-[10px] font-mono text-black/60 uppercase font-bold">추가 상세 이미지 URLs (쉼표 구분)</label>
                        <span className="text-[9px] text-black/40 font-mono">최대 {tempImageUrl.trim() ? 2 : 3}개</span>
                      </div>
                      <textarea 
                        value={tempDetailImagesText} 
                        onChange={(e) => setTempDetailImagesText(e.target.value)} 
                        placeholder="url1, url2, url3" 
                        rows={2}
                        className="w-full text-xs p-2 rounded-lg border border-[#edebe9] bg-white outline-none focus:border-[#00754a] resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={saveProductImageChanges}
                      className="flex-1 py-2 bg-[#00754a] hover:bg-[#006241] text-white font-bold rounded-lg transition-colors cursor-pointer text-center text-[10px]"
                    >
                      저장 및 반영
                    </button>
                    <button 
                      onClick={() => setIsEditingImage(false)}
                      className="px-3 py-2 bg-transparent hover:bg-black/5 text-[#3a3a3a] border border-[#edebe9] rounded-lg transition-colors cursor-pointer text-center text-[10px]"
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                /* Normal visualization gallery with Interactive Drag & Drop / Upload */
                <div className="flex-1 flex flex-col justify-center">
                  {(() => {
                    const mediaList: { type: 'image' | 'blueprint' | 'emoji'; value: string }[] = [];
                    // Push custom imageUrl first so it shows as primary when uploaded
                    if (selectedProduct.imageUrl) {
                      mediaList.push({ type: 'image', value: selectedProduct.imageUrl });
                    }
                    if (selectedProduct.name === "볼 가죽 키링") {
                      mediaList.push({ type: 'blueprint', value: 'blueprint' });
                    }
                    if (selectedProduct.detailImages) {
                      selectedProduct.detailImages.forEach((img) => {
                        mediaList.push({ type: 'image', value: img });
                      });
                    }
                    if (mediaList.length === 0) {
                      mediaList.push({ type: 'emoji', value: selectedProduct.emoji });
                    }

                    const activeIndex = Math.min(activeImageIndex, mediaList.length - 1);
                    const activeMedia = mediaList[activeIndex] || mediaList[0];

                    return (
                      <>
                        {/* Big central detail visual block with Drag & Drop */}
                        <div 
                          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                          onDragLeave={() => setIsDragging(false)}
                          onDrop={(e) => { 
                            e.preventDefault(); 
                            setIsDragging(false); 
                            const file = e.dataTransfer.files?.[0]; 
                            if (file) handleImageFile(file); 
                          }}
                          className={`my-6 flex justify-center items-center h-[230px] w-full relative overflow-hidden rounded-2xl transition-all duration-300 p-2 group ${
                            isDragging 
                              ? 'bg-[#00754a]/10 border-2 border-dashed border-[#00754a]' 
                              : 'bg-[#fdfaf2]/60 border border-[#efece6]'
                          }`}
                        >
                          <input 
                            type="file" 
                            id="product-image-upload-input" 
                            className="hidden" 
                            accept="image/*" 
                            onChange={(e) => { 
                              if (e.target.files?.[0]) handleImageFile(e.target.files[0]); 
                            }} 
                          />

                          {activeMedia && activeMedia.type === 'image' && (
                            <img 
                              src={activeMedia.value} 
                              alt={selectedProduct.name} 
                              referrerPolicy="no-referrer"
                              className="max-h-full max-w-full object-contain rounded-xl transition-all duration-300 transform hover:scale-102"
                            />
                          )}
                          {activeMedia && activeMedia.type === 'blueprint' && (
                            <div className="w-[190px] h-[190px] transform hover:scale-102 transition-transform duration-500 ease-out">
                              <BaseballKeyringVisual />
                            </div>
                          )}
                          {activeMedia && activeMedia.type === 'emoji' && (
                            <div className="text-[110px] text-center select-none filter drop-shadow-[0_10px_15px_rgba(30,138,60,0.12)] transform hover:scale-102 transition-transform duration-300">
                              {activeMedia.value}
                            </div>
                          )}

                          {/* Hover Upload Overlay */}
                          <div 
                            onClick={() => document.getElementById('product-image-upload-input')?.click()} 
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-center items-center text-white cursor-pointer select-none p-3 text-center z-10"
                          >
                            <svg className="w-8 h-8 mb-2 animate-bounce text-white/95" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            <span className="text-[11px] font-medium tracking-wide">
                              이곳에 실제 사진 업로드 (클릭 또는 파일 드롭)
                            </span>
                            <span className="text-[9px] text-white/70 mt-1 uppercase font-mono">
                              PNG, JPG, JPEG, WEBP SUPPORTED
                            </span>
                          </div>

                          {/* Quick Restore Default Button for Custom Uploaded Photo */}
                          {selectedProduct.imageUrl && selectedProduct.imageUrl.startsWith('data:') && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleResetImage();
                              }}
                              title="기본 그래픽 형태로 다시 복구"
                              className="absolute top-3 right-3 p-1.5 bg-white hover:bg-gray-100 text-rose-600 rounded-full shadow-md hover:scale-110 transition-all z-20 cursor-pointer"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>

                        {/* Thumbnail strips */}
                        {mediaList.length > 1 && (
                          <div className="flex gap-2 justify-center items-center mb-6 overflow-x-auto py-1 max-w-full">
                            {mediaList.map((media, mIdx) => {
                              const isActive = mIdx === activeIndex;
                              return (
                                <button
                                  key={mIdx}
                                  onClick={() => setActiveImageIndex(mIdx)}
                                  className={`w-11 h-11 rounded-lg border-2 overflow-hidden flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                                    isActive 
                                      ? 'border-[#00754a] bg-white scale-105 ring-2 ring-[#00754a]/10' 
                                      : 'border-[#edebe9] bg-white/70 hover:border-[#00754a]/40'
                                  }`}
                                >
                                  {media.type === 'image' && (
                                    <img src={media.value} alt="thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                  )}
                                  {media.type === 'blueprint' && (
                                    <span className="text-[16px]">⚙️</span>
                                  )}
                                  {media.type === 'emoji' && (
                                    <span className="text-lg">{media.value}</span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              )}

              {/* Specification labels bar */}
              <div className="bg-white p-4 rounded-2xl border border-[#edebe9] flex items-center gap-3">
                <Leaf className="w-5 h-5 text-[#00754a] shrink-0" />
                <div className="text-left text-[11px] leading-relaxed">
                  <p className="font-mono font-bold text-[#006241]">SECURE.UPCYCLE_MATERIAL</p>
                  <p className="text-[#3a3a3a] font-normal">{selectedProduct.material} (KBO 공인 수집물)</p>
                </div>
              </div>

              {/* Mobile Close Button */}
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setEssayResult(null);
                }}
                className="absolute top-4 right-4 md:hidden bg-white border border-[#edebe9] p-1.5 rounded-full text-[#006241] cursor-pointer hover:scale-105 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Right parameter descriptors to match tech specs of Linear */}
            <div className="md:w-1/2 p-8 md:p-10 overflow-y-auto max-h-[85vh] md:max-h-[90vh] flex flex-col justify-between bg-white text-left">
              
              <div>
                {/* Desktop Close trigger */}
                <div className="hidden md:flex justify-end mb-2">
                  <button 
                    onClick={() => {
                      setIsModalOpen(false);
                      setEssayResult(null);
                    }}
                    className="p-1.5 rounded-full border border-[#edebe9] hover:border-[#00754a] hover:bg-[#edebe9]/20 text-[#006241] cursor-pointer transition-all active:scale-95"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-[10px] font-mono text-[#00754a] uppercase tracking-widest font-bold">{selectedProduct.categoryKo}.CATALOG</span>
                <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#006241] mt-1.5 mb-3">{selectedProduct.name}</h2>
                
                {/* Compact Price parameters */}
                <div className="border-b border-[#edebe9] pb-4 mb-5 flex items-baseline gap-2">
                  <span className="text-2xl font-mono font-bold text-[#006241]">
                    {selectedProduct.price.toLocaleString()}원
                  </span>
                  <span className="text-[10px] font-mono text-[#3a3a3a]/60 uppercase">/ ITEM_TAX_INCLUDED</span>
                </div>

                {/* Technical stats table */}
                <div className="space-y-4 text-xs leading-relaxed font-sans mb-6">
                  <div className="p-3.5 bg-[#f2f0eb] rounded-2xl border border-[#edebe9]">
                    <span className="font-mono text-[10px] text-[#00754a] block mb-1 font-bold">KBO 리그 오리진 서사</span>
                    <p className="text-[#3a3a3a] font-normal text-xs">{selectedProduct.seasonStory}</p>
                  </div>
                  <div className="p-3.5 bg-[#f2f0eb] rounded-2xl border border-[#edebe9]">
                    <span className="font-mono text-[10px] text-black block mb-1 font-bold">제품 부가 사양</span>
                    <p className="text-[#3a3a3a] font-normal text-xs">{selectedProduct.description}</p>
                  </div>

                  {/* Rating grids in telemetry box */}
                  <div className="grid grid-cols-2 gap-3.5 pt-2 font-mono">
                    <div className="bg-[#f2f0eb] border border-[#edebe9] p-3 rounded-2xl flex flex-col">
                      <span className="text-[9px] text-[#3a3a3a]/60 uppercase font-bold">CO₂ 저감 효과</span>
                      <span className="text-xs font-bold text-[#00754a] mt-0.5 flex items-center gap-1">
                        <TrendingDown className="w-3.5 h-3.5" />
                        -{selectedProduct.co2Reduction} kg CO₂e
                      </span>
                    </div>
                    <div className="bg-[#f2f0eb] border border-[#edebe9] p-3 rounded-2xl flex flex-col">
                      <span className="text-[9px] text-[#3a3a3a]/60 uppercase font-bold">공식 가공 재고</span>
                      <span className="text-xs font-bold text-black mt-0.5">
                        {selectedProduct.stock} UNITS.LEFT
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Upcycling Essay with pristine typewriter look */}
                <div className="bg-[#edebe9]/40 rounded-2xl border border-[#edebe9] p-4 text-left">
                  <div className="flex items-center justify-between mb-3 border-b border-[#edebe9] pb-2.5">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#00754a] font-bold">
                      <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#cba258]" />
                      <span>AI.HERITAGE.STORY.ANALYSIS</span>
                    </div>
                    <span className="text-[9px] font-mono text-[#006241] font-bold">GEMINI_3.5</span>
                  </div>

                  {essayLoading ? (
                    <div className="py-6 flex flex-col items-center justify-center text-[#006241]/65 font-mono">
                      <Loader2 className="w-5 h-5 animate-spin mb-2 text-[#00754a]" />
                      <p className="text-[10px]">EXTRACTING FIELD MEMORIES FROM KBO CELLULAR DENSITY...</p>
                    </div>
                  ) : essayResult ? (
                    <div className="bg-white p-4 rounded-xl border border-[#edebe9] animate-fade-in space-y-3.5 text-xs text-black leading-relaxed">
                      <p className="italic font-sans font-normal whitespace-pre-line text-[#3a3a3a]">
                        "{essayResult.essay}"
                      </p>
                      <div className="border-t border-[#edebe9] pt-3 flex gap-2 items-start text-[9.5px] font-mono text-[#00754a] leading-tight font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#cba258]" />
                        <span>{essayResult.guarantee}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4 font-mono">
                      <p className="text-[10px] text-[#3a3a3a] mb-3 leading-relaxed font-sans">
                        실물 패키지에 레이저 각인될 AI 구장 매치 에세이와 수장 보증을 실시간으로 프리뷰 전송받아 보십시오.
                      </p>
                      <button
                        onClick={() => fetchAiEssay(selectedProduct)}
                        className="px-4 py-2 bg-[#00754a] hover:bg-[#006241] text-white border border-[#edebe9] rounded-xl text-[10px] font-bold tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 mx-auto shadow-xs active:scale-95"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#cba258]" />
                        GENERATE.STORY.ESSAY
                      </button>
                    </div>
                  )}
                </div>

              </div>

              {/* Drawer actions in modal bottom */}
              <div className="border-t border-[#e5e5e5] pt-6 flex gap-3 text-xs font-mono mt-6">
                <button
                  onClick={() => addToCart(selectedProduct, 1)}
                  className="flex-1 py-3.5 bg-[#0a0a0a] hover:bg-[#1f1f1f] text-white font-bold rounded-xl transition-colors cursor-pointer text-center font-sans text-xs tracking-wider"
                >
                  장바구니에 담기
                </button>
                <button
                  onClick={() => {
                    addToCart(selectedProduct, 1);
                    setIsModalOpen(false);
                    setEssayResult(null);
                    setIsCartOpen(true);
                  }}
                  className="flex-1 py-3.5 bg-transparent hover:bg-[#faf5e8] hover:text-black text-[#0a0a0a] border border-[#e5e5e5] rounded-xl transition-all cursor-pointer text-center font-sans text-xs tracking-wider font-semibold"
                >
                  바로 구매하기
                </button>
              </div>

            </div>

          </div>
        </div>
      )}


      {/* --- PROTOTYPE CHECKOUT / SHIPPING ADDRESS MODAL --- */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden font-sans" role="dialog" aria-modal="true">
          
          {/* Backdrop Scrim */}
          <div 
            onClick={() => setIsCheckoutModalOpen(false)}
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-[2px] transition-opacity cursor-pointer"
          />

          {/* Modal Main Panel */}
          <div className="bg-[#f2f0eb] rounded-3xl overflow-hidden w-full max-w-md relative z-10 border border-[#edebe9] shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Top Close trigger */}
            <button 
              onClick={() => setIsCheckoutModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full border border-[#edebe9] bg-white text-[#006241] cursor-pointer hover:border-[#00754a] hover:scale-105 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Logo display at modal head */}
            <div className="bg-[#edebe9] py-6 border-b border-[#edebe9] flex flex-col items-center justify-center shrink-0">
              <LogoSvg className="w-12 h-12 mb-1.5" fillBg="#edebe9" />
              <span className="text-base font-sans font-bold tracking-tight text-[#006241]">순환 배송 정보 기입</span>
              <span className="text-[9px] font-mono text-[rgba(0,0,0,0.4)] tracking-widest uppercase font-bold">RE:LEAF PROTOTYPE CHECKOUT</span>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              
              {/* IMPORTANT PROTOTYPE WARNING BOX */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex gap-3 text-left">
                <span className="text-xl shrink-0">⚠️</span>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono font-bold text-amber-700 uppercase tracking-widest block">NOTICE_PROTOTYPE_LIMITATION</span>
                  <p className="text-xs text-amber-950 font-medium leading-relaxed font-semibold">
                    현재 이 부분은 유통업체와 계약이 맺어지지 않은 프로토타입 홈페이지라 지원이 되지 않습니다.
                  </p>
                </div>
              </div>

              {/* Shipping Information form fields */}
              <div className="space-y-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-mono font-bold text-[#006241] uppercase tracking-wider">RECIPIENT_NAME (수령인 성명)</label>
                  <input 
                    type="text" 
                    required
                    placeholder="수령인의 성함을 적어주세요"
                    value={shippingName}
                    onChange={(e) => setShippingName(e.target.value)}
                    className="w-full bg-white border border-[#edebe9] focus:border-[#00754a] px-4 py-2.5 rounded-xl text-xs text-[#006241] outline-none transition-all placeholder-[rgba(0,0,0,0.3)]"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-mono font-bold text-[#006241] uppercase tracking-wider">CONTACT_NUMBER (연락처)</label>
                  <input 
                    type="text" 
                    required
                    placeholder="예: 010-1234-5678"
                    value={shippingPhone}
                    onChange={(e) => setShippingPhone(e.target.value)}
                    className="w-full bg-white border border-[#edebe9] focus:border-[#00754a] px-4 py-2.5 rounded-xl text-xs text-[#006241] outline-none transition-all placeholder-[rgba(0,0,0,0.3)]"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-mono font-bold text-[#006241] uppercase tracking-wider">SHIPPING_ADDRESS (배송 주소지)</label>
                  <textarea 
                    required
                    rows={3}
                    placeholder="상품을 수령하실 상세한 도로명 주소를 입력해주세요"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full bg-white border border-[#edebe9] focus:border-[#00754a] px-4 py-2.5 rounded-xl text-xs text-[#006241] resize-none outline-none transition-all placeholder-[rgba(0,0,0,0.3)]"
                  />
                </div>
              </div>

              {/* Summary details review */}
              <div className="border-t border-[#edebe9] pt-4.5 space-y-2 text-left">
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest font-bold">ORDER_PREVIEW_RECAP</span>
                <div className="bg-white/60 rounded-xl p-3 border border-[#edebe9]/50 text-xs space-y-1">
                  <div className="flex justify-between text-neutral-600">
                    <span>최종 구매 수량</span>
                    <span className="font-mono font-bold text-neutral-800">{totalCartCount}개</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>결제 예정 금액</span>
                    <span className="font-mono font-bold text-[#00754a]">{totalCartPrice.toLocaleString()}원</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer Buttons selection */}
            <div className="border-t border-[#edebe9] p-5 bg-[#edebe9]/40 space-y-2.5 shrink-0">
              
              {/* Disabled official checkout simulation */}
              <button
                disabled
                className="w-full py-3.5 bg-neutral-300 text-neutral-500 text-xs font-bold font-sans tracking-wider rounded-full border border-neutral-300 flex items-center justify-center gap-1.5 cursor-not-allowed opacity-60"
              >
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>일반 실시간 PG 결제 불가 (미계약)</span>
              </button>

              {/* Functional prototype simulation trigger */}
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 bg-[#00754a] hover:bg-[#006241] text-white text-xs font-extrabold font-sans tracking-widest rounded-full transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-[0.97]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#cba258]" />
                프로토타입 주문 완료하기
              </button>

              <p className="text-[9px] text-center text-neutral-400 font-sans leading-tight">
                프로토타입 주문을 누르시면, 로컬 테스트용 가공 주문 데이터가 서포터 프로필 페이지에 안전하게 저장됩니다.
              </p>
            </div>

          </div>
        </div>
      )}


      {/* --- FLOATING NOTIFIER TOASTS IN LINEAR STYLE --- */}
      <div className="fixed bottom-6 right-6 z-50 space-y-2 pointer-events-none max-w-sm w-full font-sans">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto bg-white border border-[#edebe9] shadow-2xl rounded-2xl p-4 flex items-start gap-4 transition-all duration-300 transform scale-100"
          >
            <div className="shrink-0 mt-0.5">
              {t.type === 'error' ? (
                <X className="w-5 h-5 text-red-500 bg-red-400/10 border border-red-500/20 rounded-lg p-0.5" />
              ) : t.type === 'info' ? (
                <Info className="w-5 h-5 text-[#cba258] bg-[#cba258]/10 border border-[#cba258]/20 rounded-lg p-0.5" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-0.5" />
              )}
            </div>
            <div className="flex-1">
              <span className="text-[9px] font-mono text-[#3a3a3a] uppercase tracking-tight block font-bold">SYSTEM.RELEAF.NOTIFICATION</span>
              <p className="text-xs text-[#0a0a0a] leading-tight font-medium mt-0.5">{t.message}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

