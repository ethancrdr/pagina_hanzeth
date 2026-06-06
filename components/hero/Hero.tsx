import { HeroCTA } from './HeroCTA';

export function Hero() {
  return (
    <header className="relative min-h-screen flex items-center text-text-onBand overflow-hidden">
      {/* TODO: VIMEO_HERO_ID — replace poster div with iframe Vimeo/Wistia, autoplay muted loop; poster is the LCP element */}
      <div
        className="absolute inset-0 z-[-2] bg-[#0B0E16]"
        role="img"
        aria-label="Persona disfrutando de una mañana saludable en casa con luz natural cálida"
        style={{
          backgroundImage:
            'radial-gradient(100% 78% at 72% 16%, rgba(46,99,245,0.26), transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,9,14,0.52) 0%, rgba(7,9,14,0.62) 45%, rgba(7,9,14,0.88) 100%)',
        }}
      />

      <div className="absolute top-5 right-5 z-10 inline-flex items-center gap-2 bg-[rgba(11,14,22,0.45)] backdrop-blur-md border border-white/25 text-text-onBand px-3.5 py-2 rounded-pill text-[0.78rem] font-semibold">
        <span
          className="w-2 h-2 rounded-full bg-accent"
          style={{ boxShadow: '0 0 0 4px rgba(27,80,229,0.25)' }}
        />
        Video
      </div>

      <div className="wrap">
        <div className="text-center pt-24 pb-16 max-w-[780px] mx-auto">
          <p className="eyebrow" style={{ color: '#8FB0FF' }}>
            4Life Research · Social Economic Networkers
          </p>
          <h1 className="mt-3.5 text-[clamp(2.25rem,7.5vw,3.6rem)] text-balance">
            Transforma tu salud. Construye tu libertad financiera.
          </h1>
          <p className="mt-5 mx-auto max-w-[560px] text-[1.0625rem] text-white/86 text-pretty">
            Respaldado por la ciencia y un equipo global. Únete a más de{' '}
            <b className="text-accent-soft font-bold">900&nbsp;000</b> personas en{' '}
            <b className="text-accent-soft font-bold">100+ países</b> que ya están construyendo una
            vida diferente con 4Life y SEN.
          </p>

          <div className="flex flex-col gap-3 mt-8 md:flex-row md:justify-center">
            <HeroCTA intent="health" className="btn btn-accent md:w-auto md:min-w-[248px]">
              Quiero mejorar mi salud
            </HeroCTA>
            <HeroCTA
              intent="business"
              className="btn btn-ghost-on-band md:w-auto md:min-w-[248px]"
            >
              Quiero emprender con un equipo
            </HeroCTA>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-[18px] gap-y-2 justify-center text-[0.85rem] text-white/80 items-center">
            <span className="inline-flex items-center gap-[7px]">
              <ShieldIcon /> 20+ años de ciencia
            </span>
            <span className="w-1 h-1 rounded-full bg-accent-soft" aria-hidden="true" />
            <span className="inline-flex items-center gap-[7px]">
              <GlobeIcon /> 100+ países
            </span>
            <span className="w-1 h-1 rounded-full bg-accent-soft" aria-hidden="true" />
            <span className="inline-flex items-center gap-[7px]">
              <UsersIcon /> Líderes globales
            </span>
          </div>
        </div>
      </div>

      <a
        className="absolute bottom-[18px] left-1/2 -translate-x-1/2 z-10 text-white/60 text-[0.72rem] uppercase tracking-[0.12em] flex flex-col items-center gap-1.5"
        href="#wellness"
        aria-label="Desplázate para conocer más"
      >
        Descubre
        <svg
          viewBox="0 0 24 24"
          className="w-[18px] h-[18px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </a>
    </header>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 stroke-accent-soft"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2 4 5v6c0 5 3.5 8 8 11 4.5-3 8-6 8-11V5l-8-3Z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 stroke-accent-soft"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3C9.5 5.7 9.5 18.3 12 21" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 stroke-accent-soft"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11" />
    </svg>
  );
}
