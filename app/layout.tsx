import type { Metadata, Viewport } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--font-sora',
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
  themeColor: '#0A0C12',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${sora.variable}`}>
      <body className={inter.className}>
        <a className="skip" href="#quiz">Saltar al cuestionario</a>
        {children}
      </body>
    </html>
  );
}
