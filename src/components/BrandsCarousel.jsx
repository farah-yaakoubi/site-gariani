import { homeAssets } from '../data/home-assets.js';

export default function BrandsCarousel({ compact = false, brands = homeAssets.brands, title = 'NOS MARQUES' }) {
  const renderBrand = (brand, index, duplicate = false) => {
    const slug = brand.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return <div className={`brand-marquee-item brand-marquee-item-${slug}`} key={`${duplicate ? 'copy-' : ''}${brand.name}-${index}`}>
    <img src={brand.src} alt={duplicate ? '' : brand.name} loading={index < 3 ? 'eager' : 'lazy'} />
  </div>;
  };

  return <section className={`brands-marquee-section${compact ? ' brands-marquee-compact' : ''}`} aria-label="Nos marques partenaires" data-scroll-reveal="up">
    <div className="wrap">
      <div className="brands-marquee-heading"><span /> <h2>{title}</h2> <span /></div>
    </div>
    <div className="brands-marquee-window" role="region" aria-label="Carrousel des marques partenaires" tabIndex="0">
      <div className="brands-marquee-track">
        {[0, 1, 2, 3].map((copy) => <div className="brands-marquee-group" key={`group-${copy}`} aria-hidden={copy > 0 ? 'true' : undefined}>{brands.map((brand, index) => renderBrand(brand, index, copy > 0))}</div>)}
      </div>
    </div>
  </section>;
}
