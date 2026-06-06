import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-instrument-serif',
});

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'Hanzeth Cordero · Transforma tu salud, construye tu libertad',
  description:
    'Únete a más de 900 000 personas en 100+ países que ya están construyendo una vida diferente con 4Life y SEN.',
  openGraph: {
    title: 'Hanzeth Cordero · Transforma tu salud, construye tu libertad',
    description:
      'Únete a más de 900 000 personas en 100+ países que ya están construyendo una vida diferente con 4Life y SEN.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0B0D10',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${instrumentSerif.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body className="font-sans">
        <a className="skip" href="#quiz">Saltar al cuestionario</a>
        {children}
      </body>
    </html>
  );
}
