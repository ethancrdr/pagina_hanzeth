type Pillar = {
  number: string;
  label: string;
  body: string;
};

const pillars: Pillar[] = [
  {
    number: '01',
    label: 'Ingresos residuales',
    body: 'Un modelo de apalancamiento financiero donde tu esfuerzo de hoy sigue generando frutos a futuro.',
  },
  {
    number: '02',
    label: 'Expansión internacional',
    body: 'Un negocio global que opera en más de 100 países, con la flexibilidad de construir tu red desde donde estés.',
  },
  {
    number: '03',
    label: 'Sistema educativo SEN',
    body: 'Capacitación continua con la Guía del Éxito, audios, rallies y mentoría de líderes como el Dr. Herminio Nevárez. Un sistema de duplicación probado por más de 20 años.',
  },
];

const faq = [
  {
    q: '¿Cuánto capital necesito para empezar?',
    a: 'No hay un capital mínimo obligatorio. La inversión inicial es la compra de tu primer pack de productos 4Life para uso personal, que también te acredita como distribuidor.',
  },
  {
    q: '¿Necesito experiencia previa en ventas?',
    a: 'No. SEN está diseñado para duplicarse. El sistema de capacitación te enseña paso a paso lo que necesitas saber.',
  },
  {
    q: '¿Cuánto tiempo toma ver resultados?',
    a: 'Depende de tu nivel de compromiso. Algunas personas ven sus primeras comisiones en el primer mes, otras construyen en seis. La constancia es la variable que más pesa.',
  },
  {
    q: '¿Es un multinivel tradicional?',
    a: '4Life es un network marketing con un sistema de compensación claro. SEN aporta la capa educativa y de comunidad. No es un esquema piramidal: hay producto real y consumo real.',
  },
];

export function Business() {
  return (
    <section
      id="business"
      className="bg-surface py-20 md:py-32"
      aria-labelledby="business-title"
    >
      <div className="wrap">
        <div className="max-w-[680px] reveal">
          <h2 id="business-title" className="font-display text-h2 text-text">
            Un sistema, no una idea.
          </h2>
          <p className="mt-4 max-w-[60ch] text-text-muted text-body">
            Un negocio global con tres pilares claros y un sistema de duplicación probado por más de 20 años.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mt-16 md:mt-20">
          {pillars.map((p) => (
            <div key={p.number} className="relative reveal">
              <span
                className="font-display text-text select-none absolute -top-6 -left-1"
                style={{ fontSize: '5.5rem', lineHeight: '1', opacity: 0.12, letterSpacing: '-0.04em' }}
                aria-hidden="true"
              >
                {p.number}
              </span>
              <h3 className="relative font-sans font-medium text-h3 text-text mt-2">
                {p.label}
              </h3>
              <p className="mt-3 text-text-muted text-body">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mt-20 md:mt-28 items-start">
          <div className="reveal">
            <div className="relative aspect-video rounded-lg overflow-hidden border border-border bg-bg">
              {/* TODO: VIMEO_BUSINESS_ID — oportunidad 16:9 (máx 2 min) */}
              <div className="absolute inset-0 flex items-center justify-center text-text-subtle text-small font-mono">
                Video · Oportunidad SEN
              </div>
            </div>
            <p className="mt-3 font-mono text-mono text-text-subtle">
              1:45 · Subtítulos disponibles
            </p>
          </div>

          <div className="reveal">
            <h3 className="font-display text-h3 text-text">
              Preguntas frecuentes
            </h3>
            <div className="mt-5 divide-y divide-border">
              {faq.map((item, i) => (
                <details
                  key={item.q}
                  className="group py-5"
                  open={i === 0}
                >
                  <summary className="flex justify-between items-center cursor-pointer list-none font-sans font-medium text-text">
                    <span>{item.q}</span>
                    <span
                      className="ml-4 flex-none w-5 h-5 inline-flex items-center justify-center text-text-muted transition-transform duration-200 group-open:rotate-45"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3 text-text-muted text-small pr-8">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>

            <p className="mt-8 font-mono text-mono text-text-muted">
              Capacitación · <a href="https://sen.team" className="underline underline-offset-4 hover:text-text">sen.team</a>
              <span className="mx-2 text-text-subtle">·</span>
              Mentoría · Dr. Herminio Nevárez
            </p>
          </div>
        </div>

        <div className="mt-16 reveal">
          <a className="btn btn-primary" href="#quiz" data-cta="business">
            Quiero saber si esto es para mí
          </a>
        </div>
      </div>
    </section>
  );
}
