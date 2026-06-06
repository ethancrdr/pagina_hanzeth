import { HeroCTA } from './HeroCTA';

export function Hero() {
  return (
    <header className="bg-bg pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="wrap">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-end">
          <div className="md:col-span-7 reveal">
            <span className="eyebrow">4Life · SEN · Hanzeth Cordero</span>
            <h1 className="font-display italic text-h1-mobile md:text-h1 mt-5 text-text">
              Transforma tu salud.
              <br />
              Construye tu libertad.
            </h1>
            <p className="mt-6 max-w-[55ch] text-text-muted text-body">
              Ciencia de los Factores de Transferencia de 4Life y un sistema de negocio probado en más de 100 países.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <HeroCTA intent="health" className="btn btn-primary">
                Quiero mejorar mi salud
              </HeroCTA>
              <HeroCTA intent="business" className="btn btn-ghost">
                Quiero emprender
              </HeroCTA>
            </div>
          </div>

          <div className="md:col-span-5 reveal">
            <div className="relative aspect-[4/5] md:aspect-[4/5] rounded-lg overflow-hidden border border-border bg-surface">
              {/* TODO: VIMEO_HERO_ID — replace this div with lazy-mounted Vimeo/Wistia iframe */}
              <div className="absolute inset-0 flex items-center justify-center text-text-subtle text-small font-mono">
                Video · 4Life + SEN
              </div>
            </div>
            <p className="mt-3 font-mono text-mono text-text-subtle">
              0:30 · Sin audio automático
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
