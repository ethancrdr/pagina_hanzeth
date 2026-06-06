export function Footer() {
  return (
    <footer className="bg-band text-text-onBand py-12 md:py-12">
      <div className="wrap">
        <div className="flex flex-col gap-5 items-center text-center md:flex-row md:justify-between md:text-left">
          <p className="text-[0.85rem] text-text-mutedOnBand">
            © 2026 Hanzeth Cordero. Todos los derechos reservados.
          </p>
          <nav
            className="flex gap-5 flex-wrap justify-center"
            aria-label="Enlaces legales"
          >
            <a href="#" className="text-text-mutedOnBand no-underline text-[0.9rem] hover:text-text-onBand">
              Política de privacidad
            </a>
            <a href="#" className="text-text-mutedOnBand no-underline text-[0.9rem] hover:text-text-onBand">
              Términos
            </a>
          </nav>
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="w-[42px] h-[42px] rounded-full border border-border-onBand flex items-center justify-center text-text-mutedOnBand transition-all duration-150 hover:text-text-onBand hover:border-text-onBand hover:bg-white/[0.06]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-[19px] h-[19px]"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="w-[42px] h-[42px] rounded-full border border-border-onBand flex items-center justify-center text-text-mutedOnBand transition-all duration-150 hover:text-text-onBand hover:border-text-onBand hover:bg-white/[0.06]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-[19px] h-[19px]"
              >
                <path d="M14 9V7a2 2 0 0 1 2-2h2V2h-3a4 4 0 0 0-4 4v3H8v3h3v9h3v-9h3l1-3h-4Z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="w-[42px] h-[42px] rounded-full border border-border-onBand flex items-center justify-center text-text-mutedOnBand transition-all duration-150 hover:text-text-onBand hover:border-text-onBand hover:bg-white/[0.06]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-[19px] h-[19px]"
              >
                <rect x="2" y="5" width="20" height="14" rx="4" />
                <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
        <p className="mt-6 pt-5 border-t border-border-onBand text-[0.72rem] leading-relaxed text-[rgba(157,176,196,0.7)] max-w-[760px] mx-auto text-center">
          Los resultados pueden variar. Los testimonios no representan garantías. Este sitio no es
          parte de Facebook, Google, Meta o 4Life Research.
        </p>
      </div>
    </footer>
  );
}
