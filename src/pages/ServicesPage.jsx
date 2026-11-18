import { useState } from 'react';
import { ArrowRight, Handshake, Leaf, Package, Truck, Wrench } from 'lucide-react';
import { homeAssets } from '../data/home-assets.js';

const services = [
  { title: 'Solutions espaces verts', description: 'Des solutions professionnelles pour vos espaces verts, gazons et aménagements extérieurs.', icon: Leaf, image: '/images/outils-jardinage.png', position: 'center 42%' },
  { title: 'Vente d’équipements', description: 'Un accompagnement pour trouver l’équipement adapté à vos besoins.', icon: Package, image: homeAssets.heroSlides[0], position: 'center' },
  { title: 'Service et réparation', description: 'Des techniciens formés pour l’entretien et la réparation de vos équipements motorisés.', icon: Wrench, image: homeAssets.serviceTechnician || homeAssets.heroSlides[2], position: 'center 38%' },
  { title: 'Distribution professionnelle', description: 'Un service de distribution dédié aux détaillants et aux professionnels.', icon: Handshake, image: '/images/services/distribution_grossistes_revendeurs.webp', position: 'center' },
  { title: 'Ramassage et livraison', description: 'Un service pratique pour la prise en charge et le retour de vos équipements.', icon: Truck, image: '/images/services/ramassage_livraison_gariani.webp', position: 'center' },
];

function ServiceCard({ service }) {
  const [flipped, setFlipped] = useState(false);
  const { title, description, icon: Icon, image, position } = service;

  return <article className={`showcase-service-card${flipped ? ' is-flipped' : ''}`}>
    <div className="showcase-service-inner">
      <div className="showcase-service-face showcase-service-front">
        <div className="showcase-service-photo"><img src={image} alt="" loading="lazy" decoding="async" style={{ objectPosition: position }} /></div>
        <div className="showcase-service-body"><span className="showcase-service-icon" aria-hidden="true"><Icon size={25} strokeWidth={2.2} /></span><h3>{title}</h3><span className="showcase-service-rule" aria-hidden="true" /></div>
        <button className="showcase-service-flip" type="button" aria-label={`Afficher les détails : ${title}`} aria-expanded={flipped} onClick={() => setFlipped((value) => !value)} />
      </div>
      <div className="showcase-service-face showcase-service-back">
        <h3>{title}</h3><p>{description}</p>
        <a className="showcase-service-contact" href="#contact">Nous contacter <ArrowRight size={17} /></a>
        <button className="showcase-service-return" type="button" onClick={() => setFlipped(false)}>Retour à l’image</button>
      </div>
    </div>
  </article>;
}

export default function ServicesPage() {
  return <section className="reference-solutions homepage-section services-showcase" id="services">
    <div className="wrap services-showcase-inner">
      <div className="reference-section-heading services-showcase-heading" data-scroll-reveal="up">
        <p className="reference-eyebrow heading-eyebrow"><span /> CE QUE NOUS OFFRONS <span /></p>
        <h2>Nos <em>services</em></h2>
        <p className="services-showcase-subtitle">Un accompagnement complet pour tous vos besoins</p>
        <span className="services-showcase-underline" />
      </div>
      <div className="services-showcase-grid" aria-label="Nos services">
          {services.map((service) => <ServiceCard service={service} key={service.title} />)}
      </div>
      <a className="button button-red services-showcase-cta" href="#contact">Découvrir tous nos services <ArrowRight size={17} /></a>
    </div>
  </section>;
}
