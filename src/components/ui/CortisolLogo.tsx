interface CortisolLogoProps {
  size?: number;
  variant?: 'light' | 'dark';
}

/**
 * The Cortisol Challenge brand icon — yellow rounded square with a relaxed smiley face.
 * Used in both Header (light bg) and Footer (dark bg).
 */
export default function CortisolLogo({ size = 40, variant = 'light' }: CortisolLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Cortisol Challenge logo"
    >
      {/* Rounded yellow background */}
      <rect width="40" height="40" rx="10" fill="#F5A623" />

      {/* Closed/relaxed eyes — two curved lines */}
      {/* Left eye */}
      <path
        d="M13 17 Q14.5 15.5 16 17"
        stroke="#1A1A1A"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right eye */}
      <path
        d="M24 17 Q25.5 15.5 27 17"
        stroke="#1A1A1A"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />

      {/* Smile */}
      <path
        d="M13.5 24 Q20 30 26.5 24"
        stroke="#1A1A1A"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
