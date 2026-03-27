import Link from 'next/link';
import CortisolLogo from '@/components/ui/CortisolLogo';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
            <CortisolLogo />
            <span
              className="text-[#1A1A1A] font-black text-sm tracking-widest uppercase leading-tight"
              style={{ fontFamily: 'Poppins, system-ui, sans-serif', letterSpacing: '0.12em' }}
            >
              CORTISOL<br />CHALLENGE
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
