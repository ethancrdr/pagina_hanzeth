type Product = {
  category: string;
  categoryIcon: 'shield' | 'dumbbell' | 'lightning' | 'leaf';
  name: string;
  benefit: string;
  price: string;
};

const products: Product[] = [
  {
    category: 'Sistema inmunitario',
    categoryIcon: 'shield',
    name: '4Life Transfer Factor Plus',
    benefit: 'Apoya las defensas naturales de tu cuerpo cada día.',
    price: '$59,95',
  },
  {
    category: 'Control de peso y fitness',
    categoryIcon: 'dumbbell',
    name: 'PRO-TF Proteína',
    benefit: 'Masa muscular magra y recuperación con cada batido.',
    price: '$66,50',
  },
  {
    category: 'Energía y rendimiento',
    categoryIcon: 'lightning',
    name: 'Energy Go Stix',
    benefit: 'Energía limpia y enfoque para tu día más exigente.',
    price: '$42,00',
  },
  {
    category: 'Cuidado personal',
    categoryIcon: 'leaf',
    name: 'enummi Cuidado de la piel',
    benefit: 'Rutina facial con Factor de Transferencia.',
    price: '$38,00',
  },
];

function CategoryIcon({ name }: { name: Product['categoryIcon'] }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'w-[15px] h-[15px] stroke-accent',
  };
  if (name === 'shield') {
    return (
      <svg {...common}>
        <path d="M12 2 4 5v6c0 5 3.5 8 8 11 4.5-3 8-6 8-11V5l-8-3Z" />
      </svg>
    );
  }
  if (name === 'dumbbell') {
    return (
      <svg {...common}>
        <path d="M6.5 6.5 17.5 17.5M4 8v8M8 4v16M16 4v16M20 8v8M3 12h2M19 12h2" />
      </svg>
    );
  }
  if (name === 'lightning') {
    return (
      <svg {...common}>
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C16 5 17 4.5 19 2c1 2 2 4.18 2 8a7 7 0 0 1-7 7Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </svg>
  );
}

export function Wellness() {
  return (
    <section
      id="wellness"
      className="bg-bg py-16 md:py-24"
      aria-labelledby="wellness-title"
    >
      <div className="wrap">
        <div className="max-w-[680px] reveal">
          <p className="eyebrow">Bienestar · 4Life</p>
          <h2 id="wellness-title" className="mt-2.5 text-h2 md:text-[clamp(1.75rem,4.5vw,2.4rem)] text-balance">
            Ciencia que respalda tu bienestar
          </h2>
          <p className="mt-4 text-[1.05rem] text-text-muted text-pretty">
            Suplementos premium con Factor de Transferencia, formulados para tu sistema inmunitario,
            energía, peso y cuidado personal.
          </p>
        </div>

        <div className="max-w-[960px] mx-auto mt-10 reveal">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
            {/* TODO: VIMEO_WELLNESS_ID — lazy-mount 16:9 explainer (máx 2 min) */}
            <div className="ph absolute inset-0 rounded-none border-0">
              Poster del video explicativo · 4Life
              <br />
              (960×540) — Vimeo / Wistia
            </div>
            <button
              type="button"
              className="absolute inset-0 m-auto w-[76px] h-[76px] rounded-full bg-accent border-0 cursor-pointer flex items-center justify-center transition-transform duration-150 hover:scale-105 hover:bg-accent-press"
              style={{ boxShadow: '0 10px 30px rgba(27,80,229,0.42)' }}
              aria-label="Reproducir video explicativo de 4Life"
            >
              <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] fill-white ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
          <p className="mt-3 text-center text-[0.82rem] text-text-muted">
            Video explicativo · subtítulos disponibles · sin audio automático
          </p>
        </div>

        <div className="relative mt-10" role="region" aria-label="Categorías de productos 4Life">
          <div className="grid grid-flow-col auto-cols-[82%] gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-5 pb-6 -mx-5 md:grid md:grid-cols-2 md:auto-cols-auto md:overflow-visible md:mx-0 md:px-0 md:pb-0 md:gap-4 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.name} product={p} />
            ))}
          </div>
          <p className="md:hidden flex items-center gap-2 justify-center text-[0.8rem] text-text-muted">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 stroke-accent-soft"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
            Desliza para ver más categorías
          </p>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="snap-start bg-surface border border-border rounded-lg overflow-hidden flex flex-col shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-square bg-[#1B1E29]">
        <div className="ph absolute inset-0 rounded-none border-0">Imagen de producto 1:1</div>
        <span className="absolute top-3 left-3 inline-flex items-center gap-[7px] bg-white/[0.06] border border-border text-text-onBand px-3 py-1.5 rounded-pill text-[0.72rem] font-bold">
          <CategoryIcon name={product.categoryIcon} />
          {product.category}
        </span>
      </div>
      <div className="p-5 flex flex-col gap-1.5 flex-1">
        <p className="font-display font-semibold text-[1.0625rem]">{product.name}</p>
        <p className="text-[0.9rem] text-text-muted flex-1">{product.benefit}</p>
        <p className="font-display font-bold text-[1.25rem] text-text-onBand mt-0.5">
          {product.price}
        </p>
        {/* TODO: FOURLIFE_STORE_URL_{country} — read from env by country, server-side */}
        <a className="btn btn-accent btn-block mt-3 !min-h-12 !text-[0.95rem]" href="#">
          Ver en la tienda
        </a>
      </div>
    </article>
  );
}
