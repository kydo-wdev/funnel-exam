'use client';

interface OptionCardProps {
  emoji?: string;
  label: string;
  onClick: () => void;
  selected?: boolean;
}

export default function OptionCard({ emoji, label, onClick, selected }: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-4 px-5 py-4 rounded-2xl border bg-white
        text-left transition-all duration-150 group
        hover:border-[#F5A623] hover:shadow-sm active:scale-[0.98]
        ${selected
          ? 'border-[#F5A623] ring-2 ring-[#F5A623]/20'
          : 'border-gray-200'}
      `}
    >
      {/* Emoji */}
      <span className="text-2xl flex-shrink-0 w-9 text-center leading-none">{emoji ?? '•'}</span>

      {/* Label */}
      <span className="flex-1 text-[#1A1A1A] font-semibold text-base">{label}</span>

      {/* Arrow */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 text-gray-400 group-hover:text-[#F5A623] transition-colors duration-150"
      >
        <path
          d="M7 15L12 10L7 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
