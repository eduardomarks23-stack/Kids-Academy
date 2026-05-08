/**
 * Visualizações de frações (pizza, quadrado, círculo) usadas em
 * jogos e quizzes educacionais. Extraídos do protótipo.
 */

interface FractionShapeProps {
  parts?: number;
  filled?: number;
  size?: number;
  color?: string;
}

export function FractionPizza({
  parts = 2,
  filled = 1,
  size = 110,
  color = '#FCD34D',
}: FractionShapeProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 6;
  const wedges = [];

  for (let i = 0; i < parts; i++) {
    const start = (i / parts) * 2 * Math.PI - Math.PI / 2;
    const end = ((i + 1) / parts) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const largeArc = end - start > Math.PI ? 1 : 0;
    const d = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`;
    wedges.push(
      <path
        key={i}
        d={d}
        fill={i < filled ? color : '#FFFFFF'}
        stroke="#6B46C1"
        strokeWidth="2.5"
      />,
    );
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r + 3} fill="#E0B080" />
      {wedges}
    </svg>
  );
}

export function FractionSquare({
  parts = 4,
  filled = 1,
  size = 110,
  color = '#10B981',
}: FractionShapeProps) {
  const cells = [];
  const cols = parts === 4 ? 2 : parts;
  const rows = parts === 4 ? 2 : 1;
  const w = (size - 12) / cols;
  const h = (size - 12) / rows;
  let i = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push(
        <rect
          key={i}
          x={6 + c * w}
          y={6 + r * h}
          width={w}
          height={h}
          fill={i < filled ? color : '#FFFFFF'}
          stroke="#6B46C1"
          strokeWidth="2.5"
        />,
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

export function FractionCircle({
  parts = 4,
  filled = 3,
  size = 110,
  color = '#3B82F6',
}: FractionShapeProps) {
  return <FractionPizza parts={parts} filled={filled} size={size} color={color} />;
}
