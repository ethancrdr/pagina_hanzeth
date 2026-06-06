'use client';

import { useState, useEffect } from 'react';

type PillarData = {
  id: string;
  label: string;
  icon: 'chart' | 'globe' | 'edu';
  body: string;
};

const pillars: PillarData[] = [
  {
    id: 'pp1',
    label: 'Ingresos residuales',
    icon: 'chart',
    body: 'Un modelo de apalancamiento financiero donde tu esfuerzo de hoy sigue generando frutos a futuro.',
  },
  {
    id: 'pp2',
    label: 'Expansión internacional',
    icon: 'globe',
    body: 'Un negocio global que opera en más de 100 países, con la flexibilidad de construir tu red desde donde estés.',
  },
  {
    id: 'pp3',
    label: 'Sistema educativo (SEN)',
    icon: 'edu',
    body: 'Capacitación continua con la Guía del Éxito, audios, rallies y mentoría de líderes como el Dr. Herminio Nevárez. Un sistema de duplicación probado por más de 20 años.',
  },
];

function PillarIcon({ name }: { name: PillarData['icon'] }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'w-[22px] h-[22px] stroke-accent-soft',
  };
  if (name === 'chart') {
    return (
      <svg {...common}>
        <path d="M3 3v18h18" />
        <path d="m7 14 4-4 3 3 5-6" />
      </svg>
    );
  }
  if (name === 'globe') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3C9.5 5.7 9.5 18.3 12 21" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5" />
    </svg>
  );
}

export function Pillar({ data }: { data: PillarData }) {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    const onChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsDesktop('matches' in e ? e.matches : (e as MediaQueryList).matches);
    onChange(mql);
    mql.addEventListener('change', onChange as (e: Event) => void);
    return () => mql.removeEventListener('change', onChange as (e: Event) => void);
  }, []);

  const expanded = isDesktop || open;

  return (
    <div
      className="border border-border-onBand rounded-md overflow-hidden bg-white/[0.03]"
      aria-expanded={expanded}
    >
      <h3>
        <button
          type="button"
          className="w-full text-left bg-transparent border-0 cursor-pointer text-text-onBand flex items-center gap-4 p-5 font-display font-semibold text-[1.125rem]"
          aria-expanded={expanded}
          aria-controls={data.id}
          onClick={() => !isDesktop && setOpen((v) => !v)}
        >
          <span className="flex-none w-11 h-11 rounded-md bg-accent/20 flex items-center justify-center">
            <PillarIcon name={data.icon} />
          </span>
          <span className="flex-1">{data.label}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`flex-none w-[22px] h-[22px] text-text-mutedOnBand transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </h3>
      <div
        id={data.id}
        role="region"
        className="overflow-hidden transition-[max-height] duration-300 ease-out"
        style={{ maxHeight: expanded ? '240px' : '0px' }}
      >
        <p className="pl-[calc(1.25rem+44px+1rem)] pr-5 pb-5 text-text-mutedOnBand text-[1rem]">
          {data.body}
        </p>
      </div>
    </div>
  );
}

export function Business() {
  return (
    <section
      id="business"
      className="bg-band text-text-onBand py-16 md:py-24"
      aria-labelledby="business-title"
    >
      <div className="wrap">
        <div className="max-w-[680px] reveal">
          <p className="eyebrow">Oportunidad · SEN</p>
          <h2
            id="business-title"
            className="mt-2.5 text-h2 md:text-[clamp(1.75rem,4.5vw,2.4rem)] text-balance"
          >
            Construye un negocio global con propósito
          </h2>
          <p className="mt-4 text-[1.05rem] text-text-mutedOnBand text-pretty">
            Un modelo probado en más de 100 países, con ingresos residuales y un sistema de
            duplicación que te acompaña paso a paso.
          </p>
        </div>

        <div className="max-w-[960px] mx-auto mt-10 reveal">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
            {/* TODO: VIMEO_BUSINESS_ID — lazy-mount 16:9 oportunidad (máx 2 min) */}
            <div className="ph dark absolute inset-0 rounded-none border-0">
              Poster del video de oportunidad · SEN
              <br />
              (960×540) — Vimeo / Wistia
            </div>
            <button
              type="button"
              className="absolute inset-0 m-auto w-[76px] h-[76px] rounded-full bg-accent border-0 cursor-pointer flex items-center justify-center transition-transform duration-150 hover:scale-105 hover:bg-accent-press"
              style={{ boxShadow: '0 10px 30px rgba(27,80,229,0.42)' }}
              aria-label="Reproducir video de la oportunidad de negocio"
            >
              <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] fill-white ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
          <p className="mt-3 text-center text-[0.82rem] text-text-mutedOnBand">
            Video de oportunidad · subtítulos disponibles · sin audio automático
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 max-w-[840px]">
          {pillars.map((p) => (
            <Pillar key={p.id} data={p} />
          ))}
        </div>

        <div className="mt-10 reveal">
          <a className="btn btn-accent" href="#quiz" data-cta="business">
            Quiero saber si esto es para mí
          </a>
        </div>
      </div>
    </section>
  );
}
