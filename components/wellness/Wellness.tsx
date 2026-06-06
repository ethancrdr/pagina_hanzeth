type Product = {
  category: string;
  name: string;
  benefit: string;
  price: string;
};

const products: Product[] = [
  {
    category: 'Sistema inmunitario',
    name: '4Life Transfer Factor Plus',
    benefit: 'Apoya las defensas naturales de tu cuerpo cada día.',
    price: '$59,95',
  },
  {
    category: 'Control de peso y fitness',
    name: 'PRO-TF Proteína',
    benefit: 'Masa muscular magra y recuperación con cada batido.',
    price: '$66,50',
  },
  {
    category: 'Energía y rendimiento',
    name: 'Energy Go Stix',
    benefit: 'Energía limpia y enfoque para tu día más exigente.',
    price: '$42,00',
  },
  {
    category: 'Cuidado personal',
    name: 'enummi Cuidado de la piel',
    benefit: 'Rutina facial con Factor de Transferencia.',
    price: '$38,00',
  },
];

function CategoryTag({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center font-mono uppercase rounded-pill px-3 py-1 bg-tag-bg text-tag-text"
      style={{ fontSize: '11px', letterSpacing: '0.12em' }}
    >
      {label}
    </span>
  );
}

export function Wellness() {
  return (
    <section
      id="wellness"
      className="bg-bg py-20 md:py-32"
      aria-labelledby="wellness-title"
    >
      <div className="wrap">
        <div className="max-w-[680px] reveal">
          <span className="eyebrow">Bienestar · 4Life</span>
          <h2 id="wellness-title" className="font-display text-h2 mt-3 text-text">
            Bienestar, no suplementos.
          </h2>
          <p className="mt-4 max-w-[60ch] text-text-muted text-body">
            Productos formulados con Factor de Transferencia. Respaldados por 20+ años de ciencia,
            distribuidos en más de 100 países.
          </p>
        </div>

        <div className="mt-14 md:mt-20 reveal">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
            <div className="md:col-span-1">
              <span className="eyebrow">Ciencia</span>
              <h3 className="font-display text-h3 mt-3 text-text">
                Factor de Transferencia
              </h3>
              <p className="mt-4 text-text-muted text-body">
                Moléculas de origen natural que educan a tu sistema inmunitario. El mismo principio
                que pasa protección inmune de madre a hijo.
              </p>
              <p className="mt-4 font-mono text-mono text-text-subtle">
                20+ años · 100+ países
              </p>
            </div>
            <div className="md:col-span-2">
              <div className="relative aspect-video rounded-lg overflow-hidden border border-border bg-surface">
                {/* TODO: VIMEO_WELLNESS_ID — explainer 16:9 (máx 2 min) */}
                <div className="absolute inset-0 flex items-center justify-center text-text-subtle text-small font-mono">
                  Video · Ciencia 4Life
                </div>
              </div>
              <p className="mt-3 font-mono text-mono text-text-subtle">
                2:00 · Subtítulos disponibles
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-12 md:mt-16">
          {products.map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="rounded-lg border border-border bg-surface p-5 md:p-6 flex flex-col gap-3 transition-colors duration-200 hover:bg-surfaceHigh reveal">
      <CategoryTag label={product.category} />
      <h3 className="font-sans font-medium text-h3 mt-1 text-text leading-tight">
        {product.name}
      </h3>
      <p className="text-small text-text-muted flex-1">
        {product.benefit}
      </p>
      <p className="font-mono text-mono text-text mt-1">
        {product.price}
      </p>
      {/* TODO: FOURLIFE_STORE_URL_{country} — read from env by country, server-side */}
      <a
        href="#"
        className="mt-2 inline-flex items-center gap-1.5 text-text hover:text-accent transition-colors text-small font-medium"
      >
        Ver producto
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
    </article>
  );
}
