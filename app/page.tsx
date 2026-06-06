import { Hero } from '@/components/hero/Hero';
import { Wellness } from '@/components/wellness/Wellness';
import { Business } from '@/components/business/Business';
import { Quiz } from '@/components/quiz/Quiz';
import { Footer } from '@/components/footer/Footer';
import { CookieConsent } from '@/components/cookie-consent/CookieConsent';
import { WhatsAppFloat } from '@/components/whatsapp-float/WhatsAppFloat';
import { Analytics } from '@/components/analytics/Analytics';

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Wellness />
        <Business />
        <Quiz />
        <Footer />
      </main>
      <CookieConsent />
      <WhatsAppFloat />
      <Analytics />
    </>
  );
}
