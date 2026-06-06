type Product = {
  category: string;
  categoryTone: 'red' | 'blue' | 'green' | 'yellow';
  name: string;
  benefit: string;
  price: string;
};

const products: Product[] = [
  {
    category: 'Sistema inmunitario',
    categoryTone: 'blue',
    name: '4Life Transfer Factor Plus',
    benefit: 'Apoya las defensas naturales de tu cuerpo cada día.',
    price: '$59,95',
  },
  {
    category: 'Control de peso y fitness',
    categoryTone: 'red',
    name: 'PRO-TF Proteína',
    benefit: 'Masa muscular magra y recuperación con cada batido.',
    price: '$66,50',
  },
  {
    category: 'Energía y rendimiento',
    categoryTone: 'yellow',
    name: 'Energy Go Stix',
    benefit: 'Energía limpia y enfoque para tu día más exigente.',
    price: '$42,00',
  },
  {
    category: 'Cuidado personal',
    categoryTone: 'green',
    name: 'enummi Cuidado de la piel',
    benefit: 'Rutina facial con Factor de Transferencia.',
    price: '$38,00',
  },
];

function CategoryTag({ tone, label }: { tone: Product['categoryTone']; label: string }) {
  const toneClass = {
    red: 'bg-pastel-red-bg text-pastel-red-text',
    blue: 'bg-pastel-blue-bg text-pastel-blue-text',
    green: 'bg-pastel-green-bg text-pastel-green-text',
    yellow: 'bg-pastel-yellow-bg text-pastel-yellow-text',
  }[tone];
  return (
    <span
      className={`inline-flex items-center font-mono uppercase rounded-pill px-3 py-1 ${toneClass}`}
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

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-14 md:mt-20">
          <div className="md:col-span-3 md:row-span-2 rounded-lg border border-border bg-surface p-6 md:p-10 reveal">
            <span className="eyebrow">Ciencia</span>
            <h3 className="font-display text-h3 mt-3 text-text">
              Factor de Transferencia
            </h3>
            <p className="mt-4 text-text-muted text-body">
              Moléculas de origen natural que educan a tu sistema inmunitario. El mismo principio
              que pasa protección inmune de madre a hijo.
            </p>
            <div className="relative mt-6 aspect-video rounded-md overflow-hidden border border-border bg-bg">
              {/* TODO: VIMEO_WELLNESS_ID — explainer 16:9 (máx 2 min) */}
              <div className="absolute inset-0 flex items-center justify-center text-text-subtle text-small font-mono">
                Video · Ciencia 4Life
              </div>
            </div>
            <p className="mt-3 font-mono text-mono text-text-subtle">
              2:00 · Subtítulos disponibles
            </p>
          </div>

          {products.map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>

        <div className="mt-16 md:mt-20 reveal">
          <p className="font-mono text-mono text-text-muted text-center">
            20+ años de ciencia · 100+ países · Distribuidor independiente
          </p>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="rounded-lg border border-border bg-surface p-6 flex flex-col gap-3 transition-colors duration-200 hover:bg-surfaceHigh reveal">
      <CategoryTag tone={product.categoryTone} label={product.category} />
      <h3 className="font-sans font-medium text-h3 mt-1 text-text">
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
