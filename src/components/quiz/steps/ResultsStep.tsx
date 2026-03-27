'use client';

import type { QuizAnswers } from '@/hooks/useQuiz';

interface ResultsStepProps {
  answers: QuizAnswers;
  onContinue: () => void;
}

export default function ResultsStep({ answers, onContinue }: ResultsStepProps) {
  // Extract numeric values (stored as "100lbs" or "100kg", etc.)
  const currentWeightRaw = String(answers['current-weight'] || '').replace(/[^\d.]/g, '');
  const desiredWeightRaw = String(answers['desired-weight'] || '').replace(/[^\d.]/g, '');
  
  const currentWeight = Number(currentWeightRaw) || 0;
  const desiredWeight = Number(desiredWeightRaw) || 0;
  const weightDiff = currentWeight - desiredWeight;

  // Projection: 30 days to reach goal with Cortisol Challenge
  const projectionDate = new Date();
  projectionDate.setDate(projectionDate.getDate() + 30);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dateStr = `${monthNames[projectionDate.getMonth()]} ${projectionDate.getDate()}, ${projectionDate.getFullYear()}`;

  // Chart dimensions
  const chartWidth = 320;
  const chartHeight = 180;
  const padding = 40;
  const graphWidth = chartWidth - padding * 2;
  const graphHeight = chartHeight - padding * 2;

  // Data points (0 to 1 scale for X, weight values for Y)
  const points = [
    { x: 0, weight: currentWeight, label: `Now: ${currentWeight} lbs` },
    { x: 0.5, weight: currentWeight - (weightDiff * 0.4) },
    { x: 1, weight: desiredWeight, label: `Goal: ${desiredWeight} lbs` },
  ];

  // Convert to pixel coordinates
  const minWeight = desiredWeight - 10;
  const maxWeight = currentWeight + 10;
  const weightRange = maxWeight - minWeight;

  const toPixelX = (x: number) => padding + x * graphWidth;
  const toPixelY = (weight: number) => padding + graphHeight - ((weight - minWeight) / weightRange) * graphHeight;

  // Generate SVG path
  let pathData = `M ${toPixelX(points[0].x)} ${toPixelY(points[0].weight)}`;
  for (let i = 1; i < points.length; i++) {
    pathData += ` L ${toPixelX(points[i].x)} ${toPixelY(points[i].weight)}`;
  }

  // Dashed line for usual journey (baseline)
  let dashedPath = `M ${toPixelX(0)} ${toPixelY(currentWeight - 2)}`;
  dashedPath += ` L ${toPixelX(1)} ${toPixelY(currentWeight - 8)}`;

  return (
    <div className="animate-slide-left w-full max-w-xl mx-auto px-4 py-8 flex flex-col gap-5">
      <div className="text-center">
        <h1 className="text-xl font-bold text-[#1A1A1A] mb-2">
          With Cortisol Challenge, you will reach your desired weight of
        </h1>
        <p className="text-3xl font-extrabold text-[#E6B800] mb-1">
          {desiredWeight} lbs
        </p>
        <p className="text-lg font-semibold text-[#666]">
          by {dateStr}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <p className="text-xs text-gray-400 uppercase mb-3">Weight</p>

        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto mb-3">
          {/* Grid lines */}
          <line x1={padding} y1={padding} x2={padding} y2={chartHeight - padding} stroke="#E5E7EB" strokeWidth="1" />
          <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#E5E7EB" strokeWidth="1" />

          {/* Usual journey (dashed) */}
          <path
            d={dashedPath}
            fill="none"
            stroke="#DC2626"
            strokeWidth="2"
            strokeDasharray="5,5"
          />

          {/* With Cortisol Challenge (solid) */}
          <path
            d={pathData}
            fill="none"
            stroke="#FACC15"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data point markers */}
          <circle cx={toPixelX(points[0].x)} cy={toPixelY(points[0].weight)} r="4" fill="#FACC15" />
          <circle cx={toPixelX(points[2].x)} cy={toPixelY(points[2].weight)} r="4" fill="#FACC15" />

          {/* Labels */}
          <foreignObject x={toPixelX(points[0].x) - 30} y={toPixelY(points[0].weight) - 20} width="60" height="20">
            <div className="text-xs bg-[#FACC15] text-black px-2 py-1 rounded text-center font-semibold whitespace-nowrap">
              Now: {currentWeight} lbs
            </div>
          </foreignObject>

          <foreignObject x={toPixelX(points[2].x) - 35} y={toPixelY(points[2].weight) + 15} width="70" height="20">
            <div className="text-xs bg-[#FACC15] text-black px-2 py-1 rounded text-center font-semibold whitespace-nowrap">
              Goal: {desiredWeight} lbs
            </div>
          </foreignObject>

          {/* Axis labels */}
          <text x={padding - 10} y={chartHeight - padding + 20} fontSize="12" fill="#999" textAnchor="end">
            TIME
          </text>
        </svg>

        <div className="flex justify-start gap-6 text-sm mt-4 px-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-[#FACC15]" />
            <span className="text-gray-700">With Cortisol Challenge</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-[#DC2626]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #DC2626, #DC2626 5px, transparent 5px, transparent 10px)' }} />
            <span className="text-gray-700">Usual weight loss journey</span>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-600 text-center">
          By following the personalized plan, you can expect significant progress within the next 30 days.
        </p>
      </div>

      <button
        onClick={() => onContinue()}
        className="w-full bg-[#111111] hover:bg-[#2A2A2A] active:scale-[0.98] text-white font-bold text-base py-4 rounded-2xl transition-all duration-150"
      >
        Continue
      </button>
    </div>
  );
}
