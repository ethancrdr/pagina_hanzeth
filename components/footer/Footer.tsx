import { buildWhatsAppUrl } from '@/lib/geo';

const WA_MESSAGE = 'Hola Hanzeth, vengo de tu web.';

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="wrap py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          <div>
            <p className="font-display italic text-h3 text-text">
              Hanzeth Cordero
            </p>
            <p className="mt-2 text-small text-text-muted max-w-[28ch]">
              Distribuidor independiente 4Life · Sistema SEN.
            </p>
          </div>

          <div>
            <p className="font-mono text-mono uppercase text-text-muted mb-4">
              Contacto
            </p>
            <a
              href={buildWhatsAppUrl(WA_MESSAGE)}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-text hover:text-accent transition-colors text-small"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              WhatsApp directo
            </a>
          </div>

          <div>
            <p className="font-mono text-mono uppercase text-text-muted mb-4">
              Legal
            </p>
            <nav className="flex flex-col gap-2" aria-label="Enlaces legales">
              <a href="#" className="text-small text-text-muted hover:text-text transition-colors w-fit">
                Política de privacidad
              </a>
              <a href="#" className="text-small text-text-muted hover:text-text transition-colors w-fit">
                Términos
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border">
          <p className="font-mono text-mono text-text-subtle">
            © 2026 Hanzeth Cordero · Todos los derechos reservados
          </p>
          <p className="mt-3 text-small text-text-muted max-w-[65ch]">
            Los resultados pueden variar. Los testimonios no representan garantías. Este sitio no es parte de Facebook, Google, Meta o 4Life Research.
          </p>
        </div>
      </div>
    </footer>
  );
}
