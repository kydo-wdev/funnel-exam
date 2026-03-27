import Link from 'next/link';
import CortisolLogo from '@/components/ui/CortisolLogo';

const footerLinks = {
  support: [
    { label: 'Help & Support', href: '/help' },
    { label: 'Access My Plan', href: '/access' },
    { label: 'Manage Your Subscription', href: '/subscription' },
  ],
  company: [
    { label: 'About us', href: '/about' },
    { label: 'Affiliate', href: '/affiliate' },
    { label: 'Reviews', href: '/reviews' },
  ],
  legal: [
    { label: 'General Conditions', href: '/terms' },
    { label: 'Data Protection Policy', href: '/privacy' },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <CortisolLogo variant="dark" />
              <span
                className="text-white font-black text-sm tracking-widest uppercase leading-tight"
                style={{ fontFamily: 'Poppins, system-ui, sans-serif', letterSpacing: '0.12em' }}
              >
                CORTISOL<br />CHALLENGE
              </span>
            </div>
            <p className="text-[#9CA3AF] text-xs leading-relaxed max-w-xs">
              DISCLAIMER: Cortisol Challenge website, app, services, and products are meant to
              support general health. Our products and services are not intended to diagnose,
              treat, cure, or prevent any disease. They should not be substituted for medical
              advice or medical intervention. Please consult a qualified healthcare provider when
              making medical decisions.
            </p>
            <p className="text-[#6B7280] text-xs mt-2">
              2026 © ALL RIGHTS RESERVED, UAB KILO GRUPE, VILNIUS, LITHUANIA
            </p>
          </div>

          {/* Support Links */}
          <div className="flex flex-col gap-4">
            {footerLinks.support.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white font-semibold text-sm hover:text-[#F5A623] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-4">
            {footerLinks.company.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white font-semibold text-sm hover:text-[#F5A623] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex flex-col gap-4">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white font-semibold text-sm hover:text-[#F5A623] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
