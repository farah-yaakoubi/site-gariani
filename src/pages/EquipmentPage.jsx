import { ArrowRight } from 'lucide-react';
import { agricutProducts } from '../data/agricut-products.js';
import { email } from '../components/SiteShell.jsx';

const categoryGroups = [
  { id: 'secateurs', title: 'Sécateurs', categories: ['Sécateurs'] },
  { id: 'batterie', title: 'Sécateurs à batterie', categories: ['Sécateurs à batterie'] },
  { id: 'cisailles', title: 'Cisailles à haies', categories: ['Cisailles à haies', 'Cisailles à haies télescopiques'] },
  { id: 'elagueurs', title: 'Élagueurs et émondoirs', categories: ['Élagueurs', 'Émondoirs'] },
  { id: 'rateaux', title: 'Râteaux à feuilles', categories: ['Râteaux à feuilles'] },
  { id: 'scies', title: 'Scies et émondoirs télescopiques', categories: ['Scies', 'Scies et émondoirs'] },
];
function PageHeading({ eyebrow, title, description }) {
  return <header className="page-hero"><div className="wrap"><p className="home-eyebrow"><span />{eyebrow}</p><h1>{title}</h1>{description && <p>{description}</p>}</div></header>;
}
export default function EquipmentPage() {
  return <main>
    <PageHeading eyebrow="Catalogue Agricut" title="Outils de coupe et de jardinage" description="Découvrez les références Agricut illustrées dans les dépliants fournis. Contactez-nous pour obtenir des renseignements sur un modèle." />
    <div className="agricut-catalog wrap">
      <div className="agricut-brand-heading"><img src="/images/logos/LOGO%20AGRICUT.png" alt="Agricut" /><p>{agricutProducts.length} produits Agricut</p></div>
      {categoryGroups.map((group) => {
        const groupProducts = agricutProducts.filter((product) => group.categories.includes(product.category));
        return <section className="agricut-category" id={group.id} key={group.id}>
          <div className="agricut-category-heading"><h2>{group.title}</h2><span>{groupProducts.length} références</span></div>
          <div className="product-grid agricut-product-grid">{groupProducts.map((product) => <article className="product-card agricut-product-card" key={product.model}>
            <div className="product-visual agricut-product-visual"><span className="product-brand">AGRICUT</span><img className="agricut-product-photo" src={encodeURI(`/images/agricut/${product.file}`)} alt={`${product.name} Agricut, modèle ${product.model}`} loading="lazy" decoding="async" /><span className="product-category">{product.category}</span></div>
            <div className="product-info"><p className="product-model">{product.model}</p><h3>{product.name}</h3><a className="product-link" href={`mailto:${email}?subject=${encodeURIComponent(`Renseignement Agricut ${product.model}`)}`}>Demander un renseignement <ArrowRight size={15} /></a></div>
          </article>)}</div>
        </section>;
      })}
    </div>
  </main>;
}
