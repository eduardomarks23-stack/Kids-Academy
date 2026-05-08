// Kids Academy — Shared components
// Original mascot illustration ("DogBerg" placeholder), icons, helpers

// ---------- DogBerg mascot (original SVG illustration) ----------
// Replace this SVG with the official DogBerg sprite when available.
function DogBerg({ size = 200, expression = "happy", pose = "front", className = "" }) {
  // Simple stylized puppy made of basic shapes — friendly, expressive eyes.
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      className={className}
      aria-label="Mascote Kids Academy"
    >
      {/* tail (animated wag) */}
      <g style={{ transformOrigin: "180px 150px", animation: "wagTail 1.6s ease-in-out infinite" }}>
        <path d="M180 150 Q210 130 200 110 Q198 105 192 108 Q198 124 178 140 Z" fill="#C9A36A" />
      </g>

      {/* back leg */}
      <ellipse cx="78" cy="200" rx="22" ry="14" fill="#C9A36A" />
      <ellipse cx="78" cy="200" rx="22" ry="14" fill="#A57E4A" opacity="0.25" />

      {/* body */}
      <ellipse cx="120" cy="170" rx="62" ry="44" fill="#E6BE82" />
      {/* belly highlight */}
      <ellipse cx="120" cy="185" rx="40" ry="22" fill="#F8E2BE" />

      {/* front legs */}
      <rect x="92" y="190" width="22" height="36" rx="11" fill="#E6BE82" />
      <rect x="128" y="190" width="22" height="36" rx="11" fill="#E6BE82" />
      <ellipse cx="103" cy="226" rx="14" ry="6" fill="#3D2A1A" />
      <ellipse cx="139" cy="226" rx="14" ry="6" fill="#3D2A1A" />

      {/* head */}
      <ellipse cx="120" cy="105" rx="64" ry="58" fill="#E6BE82" />

      {/* left ear (floppy) */}
      <path d="M62 80 Q40 100 56 140 Q70 158 86 144 Q78 110 80 80 Z" fill="#8B5E34" />
      <path d="M70 92 Q60 110 70 132 Q78 142 84 134 Q78 116 80 96 Z" fill="#A57045" />

      {/* right ear */}
      <path d="M178 80 Q200 100 184 140 Q170 158 154 144 Q162 110 160 80 Z" fill="#8B5E34" />
      <path d="M170 92 Q180 110 170 132 Q162 142 156 134 Q162 116 160 96 Z" fill="#A57045" />

      {/* spot on head */}
      <ellipse cx="148" cy="80" rx="18" ry="14" fill="#8B5E34" opacity="0.55" />

      {/* eyes */}
      {expression === "happy" ? (
        <>
          <path d="M92 105 q10 -10 20 0" stroke="#2A1A0E" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M128 105 q10 -10 20 0" stroke="#2A1A0E" strokeWidth="5" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="102" cy="108" r="9" fill="#2A1A0E" />
          <circle cx="138" cy="108" r="9" fill="#2A1A0E" />
          <circle cx="105" cy="105" r="3" fill="#FFFFFF" />
          <circle cx="141" cy="105" r="3" fill="#FFFFFF" />
        </>
      )}

      {/* cheeks */}
      <circle cx="92" cy="128" r="8" fill="#F8AFA1" opacity="0.7" />
      <circle cx="148" cy="128" r="8" fill="#F8AFA1" opacity="0.7" />

      {/* snout */}
      <ellipse cx="120" cy="132" rx="22" ry="16" fill="#F8E2BE" />
      {/* nose */}
      <ellipse cx="120" cy="124" rx="8" ry="6" fill="#2A1A0E" />
      {/* mouth */}
      <path d="M120 134 Q120 142 112 144" stroke="#2A1A0E" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M120 134 Q120 142 128 144" stroke="#2A1A0E" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* tongue tip */}
      <path d="M116 144 q4 6 8 0 q-2 4 -4 4 q-2 0 -4 -4 z" fill="#F87171" />

      <style>{`
        @keyframes wagTail {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(14deg); }
        }
      `}</style>
    </svg>
  );
}

// ---------- Speech bubble ----------
function SpeechBubble({ children, side = "right", className = "" }) {
  return (
    <div className={`relative bg-white border-2 border-purple-200 rounded-3xl px-5 py-4 shadow-[0_8px_24px_-12px_rgba(107,70,193,0.25)] ${className}`}>
      {children}
      {side === "left" && (
        <span className="absolute -left-3 top-8 w-0 h-0 border-y-[10px] border-y-transparent border-r-[14px] border-r-white" />
      )}
      {side === "right" && (
        <span className="absolute -right-3 top-8 w-0 h-0 border-y-[10px] border-y-transparent border-l-[14px] border-l-white" />
      )}
    </div>
  );
}

// ---------- Logo ----------
function KidsAcademyLogo({ size = "lg" }) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-5xl",
  };
  return (
    <div className={`font-extrabold tracking-tight ${sizes[size]}`} style={{ fontFamily: "Nunito, sans-serif" }}>
      <span style={{ color: "#6B46C1" }}>Kids</span>
      <span style={{ color: "#FCD34D" }}>Academy</span>
    </div>
  );
}

// ---------- Tiny inline icons (line-style, original) ----------
const Icon = {
  Bell: (p) => (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10 21a2 2 0 0 0 4 0" />
    </svg>
  ),
  Home: (p) => (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" />
    </svg>
  ),
  Trophy: (p) => (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path d="M17 6h3v2a3 3 0 0 1-3 3M7 6H4v2a3 3 0 0 0 3 3" />
    </svg>
  ),
  Rank: (p) => (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="13" width="4" height="8" rx="1" />
      <rect x="10" y="8" width="4" height="13" rx="1" />
      <rect x="16" y="4" width="4" height="17" rx="1" />
    </svg>
  ),
  Shop: (p) => (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h18l-2 12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L3 7z" />
      <path d="M8 7V5a4 4 0 0 1 8 0v2" />
    </svg>
  ),
  Parent: (p) => (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M15 21v-1.5a3.5 3.5 0 0 1 3.5-3.5h.5a2.5 2.5 0 0 1 2.5 2.5V21" />
    </svg>
  ),
  ArrowLeft: (p) => (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 6l-6 6 6 6" />
    </svg>
  ),
  Lock: (p) => (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  ),
  Star: (p) => (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill={p.fill || "currentColor"} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M12 3l2.9 6 6.6.9-4.8 4.6 1.2 6.6L12 18.1 6.1 21.1l1.2-6.6L2.5 9.9 9.1 9z" />
    </svg>
  ),
  Check: (p) => (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5L20 7" />
    </svg>
  ),
  Play: (p) => (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 5l12 7-12 7z" />
    </svg>
  ),
  Pause: (p) => (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  ),
  Book: (p) => (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h7a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H4z" />
      <path d="M20 4h-7a3 3 0 0 0-3 3v13a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Calc: (p) => (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <rect x="8" y="6" width="8" height="3" rx="0.5" />
      <circle cx="9" cy="13" r="0.5" fill="currentColor" />
      <circle cx="12" cy="13" r="0.5" fill="currentColor" />
      <circle cx="15" cy="13" r="0.5" fill="currentColor" />
      <circle cx="9" cy="17" r="0.5" fill="currentColor" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" />
      <circle cx="15" cy="17" r="0.5" fill="currentColor" />
    </svg>
  ),
  Lupa: (p) => (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16l5 5" />
    </svg>
  ),
  Scroll: (p) => (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 5h11a3 3 0 0 1 3 3v9a2 2 0 0 0 2 2H8a3 3 0 0 1-3-3z" />
      <path d="M9 9h6M9 13h6" />
    </svg>
  ),
  Globe: (p) => (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  ),
  Speak: (p) => (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h16v11H9l-5 4z" />
      <path d="M8 10h8M8 13h5" />
    </svg>
  ),
  Clock: (p) => (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  Bolt: (p) => (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill={p.fill || "currentColor"} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M13 2L4 14h6l-1 8 9-12h-6z" />
    </svg>
  ),
  Sparkle: (p) => (
    <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
    </svg>
  ),
};

// ---------- Avatar (round, monogram + bg) ----------
function Avatar({ name = "L", color = "#6B46C1", size = 40 }) {
  const initials = name.slice(0, 1).toUpperCase();
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-extrabold shadow-md ring-2 ring-white"
      style={{ width: size, height: size, background: color, fontSize: size * 0.42 }}
    >
      {initials}
    </div>
  );
}

// ---------- Pizza fraction visual (used in jogo + quiz) ----------
function FractionPizza({ slices = 2, filled = 1, size = 110, color = "#FCD34D" }) {
  const cx = size / 2, cy = size / 2, r = size / 2 - 6;
  const wedges = [];
  for (let i = 0; i < slices; i++) {
    const start = (i / slices) * 2 * Math.PI - Math.PI / 2;
    const end = ((i + 1) / slices) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const largeArc = end - start > Math.PI ? 1 : 0;
    const d = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`;
    wedges.push(
      <path key={i} d={d} fill={i < filled ? color : "#FFFFFF"} stroke="#6B46C1" strokeWidth="2.5" />
    );
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* crust */}
      <circle cx={cx} cy={cy} r={r + 3} fill="#E0B080" />
      {wedges}
    </svg>
  );
}

// Square / circle fraction shapes for the game
function FractionSquare({ parts = 4, filled = 1, size = 110, color = "#10B981" }) {
  const cells = [];
  const cols = parts === 4 ? 2 : parts;
  const rows = parts === 4 ? 2 : 1;
  const w = (size - 12) / cols, h = (size - 12) / rows;
  let i = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push(
        <rect key={i} x={6 + c * w} y={6 + r * h} width={w} height={h} fill={i < filled ? color : "#FFFFFF"} stroke="#6B46C1" strokeWidth="2.5" />
      );
      i++;
    }
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect x="2" y="2" width={size - 4} height={size - 4} rx="10" fill="#F3F4F6" />
      {cells}
    </svg>
  );
}

function FractionCircle({ parts = 4, filled = 3, size = 110, color = "#3B82F6" }) {
  return <FractionPizza slices={parts} filled={filled} size={size} color={color} />;
}

// Expose globally for other Babel scripts
Object.assign(window, {
  DogBerg, SpeechBubble, KidsAcademyLogo, Icon, Avatar,
  FractionPizza, FractionSquare, FractionCircle,
});
