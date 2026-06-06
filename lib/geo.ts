export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '10000000000';

function readFourLifeUrls(): Record<string, string | undefined> {
  return {
    US: process.env.NEXT_PUBLIC_FOURLIFE_URL_US,
    CO: process.env.NEXT_PUBLIC_FOURLIFE_URL_CO,
    ES: process.env.NEXT_PUBLIC_FOURLIFE_URL_ES,
    CR: process.env.NEXT_PUBLIC_FOURLIFE_URL_CR,
    DEFAULT: process.env.NEXT_PUBLIC_FOURLIFE_URL_DEFAULT,
  };
}

export function getFourLifeUrl(countryCode: string | null | undefined): string {
  const urls = readFourLifeUrls();
  if (!countryCode) return urls.DEFAULT ?? '#';
  return urls[countryCode] ?? urls.DEFAULT ?? '#';
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
