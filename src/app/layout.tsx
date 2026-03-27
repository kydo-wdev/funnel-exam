import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cortisol Challenge — Science-Backed Cortisol Reset for Effective Weight Loss',
  description:
    'Take the Cortisol Challenge quiz and get a personalized plan to reset your cortisol levels and lose weight effectively.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
