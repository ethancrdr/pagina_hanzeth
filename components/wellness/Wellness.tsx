type Product = {
  category: string;
  name: string;
  benefit: string;
  price: string;
  image: string;
};

const products: Product[] = [
  {
    category: 'Sistema inmunitario',
    name: '4Life Transfer Factor Plus',
    benefit: 'Apoya las defensas naturales de tu cuerpo cada día. La fórmula insignia de 4Life, con 20+ años de evidencia clínica.',
    price: '$59,95',
    image: 'https://picsum.photos/seed/4life-immune/960/720',
  },
  {
    category: 'Control de peso y fitness',
    name: 'PRO-TF Proteína',
    benefit: 'Masa muscular magra y recuperación con cada batido.',
    price: '$66,50',
    image: 'https://picsum.photos/seed/4life-fitness/640/640',
  },
  {
    category: 'Energía y rendimiento',
    name: 'Energy Go Stix',
    benefit: 'Energía limpia y enfoque para tu día más exigente.',
    price: '$42,00',
    image: 'https://picsum.photos/seed/4life-energy/640/640',
  },
  {
    category: 'Cuidado personal',
    name: 'enummi Cuidado de la piel',
    benefit: 'Rutina facial con Factor de Transferencia.',
    price: '$38,00',
    image: 'https://picsum.photos/seed/4life-skincare/640/640',
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
  const [featured, ...rest] = products;
  return (
    <section
      id="wellness"
      className="bg-bg py-20 md:py-32"
      aria-labelledby="wellness-title"
    >
      <div className="wrap">
        <div className="max-w-[680px] reveal">
          <h2 id="wellness-title" className="font-display text-h2 text-text">
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
              <h3 className="font-display text-h3 text-text">
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

        <div className="mt-16 md:mt-20 reveal">
          <div className="flex items-baseline justify-between mb-6 md:mb-8">
            <h3 className="font-display text-h3 text-text">Categorías</h3>
            <a
              href="#"
              className="font-mono text-mono text-text-muted hover:text-text transition-colors"
            >
              Ver todo →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            <FeaturedProduct product={featured} />
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 md:gap-5">
              {rest.map((p) => (
                <CompactProduct key={p.name} product={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProduct({ product }: { product: Product }) {
  return (
    <article className="rounded-lg border border-border bg-surface overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-bg">
        <img
          src={product.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover opacity-90"
        />
      </div>
      <div className="p-6 md:p-7 flex flex-col gap-4 flex-1">
        <CategoryTag label={product.category} />
        <h4 className="font-display text-h2 text-text leading-[1.1]">
          {product.name}
        </h4>
        <p className="text-text-muted text-body">
          {product.benefit}
        </p>
        <div className="mt-auto flex items-baseline justify-between pt-3">
          <span className="font-mono text-mono text-text">
            {product.price}
          </span>
          {/* TODO: FOURLIFE_STORE_URL_{country} */}
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-text hover:text-accent transition-colors text-small font-medium"
          >
            Ver producto
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

function CompactProduct({ product }: { product: Product }) {
  return (
    <article className="rounded-lg border border-border bg-surface overflow-hidden flex flex-row gap-4 p-4 transition-colors duration-200 hover:bg-surfaceHigh">
      <div className="relative w-[88px] h-[88px] flex-none rounded-md overflow-hidden bg-bg">
        <img
          src={product.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover opacity-90"
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <CategoryTag label={product.category} />
        <h4 className="font-sans font-medium text-body text-text leading-tight">
          {product.name}
        </h4>
        <div className="mt-auto flex items-baseline justify-between gap-3 pt-1">
          <span className="font-mono text-mono text-text-subtle">
            {product.price}
          </span>
          <a
            href="#"
            className="inline-flex items-center gap-1 text-text-muted hover:text-accent transition-colors text-small"
          >
            Ver
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
