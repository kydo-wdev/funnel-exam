'use client';

interface ChartStepProps {
  title: string;
  body?: string;
  onContinue: () => void;
}

/**
 * Renders an SVG line chart comparing cortisol levels with vs without Cortisol Challenge.
 * The two curves are hardcoded to match the competitor's visual exactly.
 */
export default function ChartStep({ title, body, onContinue }: ChartStepProps) {
  // SVG dimensions
  const W = 360;
  const H = 160;
  const padL = 8;
  const padR = 8;
  const padT = 12;
  const padB = 24;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  // Helper: map x=[0..1], y=[0..1] to SVG coords (y=0 is TOP of chart area)
  const pt = (x: number, y: number) =>
    `${padL + x * innerW},${padT + (1 - y) * innerH}`;

  // Gold line (with Cortisol Challenge) — relatively flat, gently dips then rises
  const goldPoints = [
    [0.0, 0.52], [0.15, 0.48], [0.30, 0.38], [0.45, 0.35],
    [0.60, 0.38], [0.75, 0.42], [0.90, 0.44], [1.0, 0.45],
  ];

  // Red dashed line (without stress management) — large spikes
  const redPoints = [
    [0.0, 0.55], [0.08, 0.72], [0.20, 0.62], [0.30, 0.38],
    [0.40, 0.30], [0.52, 0.62], [0.62, 0.82], [0.72, 0.70],
    [0.82, 0.55], [0.92, 0.52], [1.0, 0.48],
  ];

  const toPath = (pts: number[][]) =>
    pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${pt(x, y)}`).join(' ');

  // Dashed path with gaps — simulate dashes by alternating short segments
  const toDashed = (pts: number[][], dashLen = 8, gapLen = 5) => {
    // Just use SVG strokeDasharray instead
    return toPath(pts);
  };

  return (
    <div className="animate-slide-left w-full max-w-xl mx-auto px-4 py-8 flex flex-col gap-5">
      {/* Title */}
      <h1
        className="text-[1.4rem] font-bold text-[#1A1A1A] text-center leading-snug"
        style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
      >
        {title}
      </h1>

      {/* Chart card */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden p-4">
        {/* Y-axis label */}
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
          Cortisol Level
        </p>

        {/* SVG Chart */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          style={{ display: 'block' }}
          aria-hidden="true"
        >
          {/* Horizontal grid lines */}
          {[0.25, 0.5, 0.75].map((y) => (
            <line
              key={y}
              x1={padL}
              y1={padT + (1 - y) * innerH}
              x2={W - padR}
              y2={padT + (1 - y) * innerH}
              stroke="#F3F4F6"
              strokeWidth="1"
            />
          ))}

          {/* Red dashed line — without stress management */}
          <path
            d={toPath(redPoints)}
            fill="none"
            stroke="#E05C6A"
            strokeWidth="2"
            strokeDasharray="6 4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Gold solid line — with Cortisol Challenge */}
          <path
            d={toPath(goldPoints)}
            fill="none"
            stroke="#D4980F"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* X-axis label */}
          <text
            x={W - padR}
            y={H - 4}
            textAnchor="end"
            fontSize="9"
            fill="#9CA3AF"
            fontFamily="system-ui"
          >
            TIME
          </text>
        </svg>

        {/* Legend */}
        <div className="flex flex-col gap-1.5 mt-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-[#D4980F] rounded-full flex-shrink-0" />
            <span className="text-xs text-[#374151]">Cortisol levels with Cortisol Challenge</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-6 flex-shrink-0"
              style={{
                height: '2px',
                background: 'repeating-linear-gradient(90deg, #E05C6A 0, #E05C6A 5px, transparent 5px, transparent 9px)',
              }}
            />
            <span className="text-xs text-[#374151]">Cortisol levels without stress management</span>
          </div>
        </div>
      </div>

      {/* Body text */}
      {body && (
        <p className="text-sm text-[#6B7280] text-center leading-relaxed px-2">{body}</p>
      )}

      {/* Continue */}
      <button
        onClick={() => onContinue()}
        className="w-full bg-[#1A1A1A] hover:bg-[#333333] active:scale-[0.98] text-white font-bold text-base py-4 rounded-2xl transition-all duration-150"
      >
        Continue
      </button>
    </div>
  );
}
