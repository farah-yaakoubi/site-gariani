import BrandsCarousel from '../components/BrandsCarousel.jsx';
import { homeAssets } from '../data/home-assets.js';

const equipmentBrands = homeAssets.brands.filter(({ name }) => ['Agricut', 'STIHL', 'ECHO', 'Weibang', 'Earth Power'].includes(name));
const treatmentBrands = homeAssets.brands.filter(({ name }) => ['Fertivert', 'Pulvert'].includes(name));

export default function BrandsPage() {
  return <section id="marques" className="homepage-section">
    <header className="page-hero" data-scroll-reveal="up"><div className="wrap"><p className="home-eyebrow"><span /> Nos partenaires exclusifs</p><h2>Nos marques partenaires</h2><p>GARIANI travaille avec des marques reconnues au service des professionnels et des particuliers.</p></div></header>
    <BrandsCarousel compact brands={equipmentBrands} title="Équipements et matériel motorisé" />
    <section className="partner-static-section" aria-labelledby="treatments-heading" data-scroll-reveal="up">
      <div className="brands-marquee-heading"><span /> <h3 id="treatments-heading">Produits et traitements professionnels</h3> <span /></div>
      <div className="partner-static-logos">{treatmentBrands.map((brand) => <article className={`partner-static-logo partner-static-logo-${brand.name.toLowerCase()}`} key={brand.name}><img src={brand.src} alt={brand.name} loading="lazy" decoding="async" /></article>)}</div>
    </section>
  </section>;
}
