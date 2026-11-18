import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { homeAssets } from '../data/home-assets.js';
import ServicesPage from './ServicesPage.jsx';
import BrandsPage from './BrandsPage.jsx';
import AboutPage from './AboutPage.jsx';
import ContactPage from './ContactPage.jsx';
import SEO from '../components/SEO.jsx';
import { PUBLIC_ROUTES } from '../seo/public-routes.js';

const slides = [
  { label: 'NOTRE ATELIER', first: 'Une équipe', second: 'à votre', accent: 'service', text: 'Des spécialistes et des équipements réunis sous un même toit à Montréal.', link: '#a-propos', image: '/images/hero-main/gariani_atelier_remplacement_4k.webp' },
  { label: 'VOTRE PARTENAIRE DE CONFIANCE', first: 'Qualité,', second: 'performance', accent: '& service garanti', text: 'Spécialistes en équipements extérieurs et matériel de jardinage depuis 2021.', link: '#services', image: '/images/hero-main/hero_gariani_equipements_4k.webp' },
  { label: 'NOTRE SALLE D’EXPOSITION', first: 'Des solutions', second: 'pour vos projets', accent: 'extérieurs', text: 'Découvrez notre expertise en équipements et en entretien des espaces verts.', link: '#services', image: '/images/hero-main/gariani_showroom_upscaled_4k.webp' },
  { label: 'ÉQUIPEMENTS ET OUTILS', first: 'Le bon équipement', second: 'pour chaque', accent: 'saison', text: 'Une sélection et des conseils adaptés aux besoins des particuliers et des professionnels.', link: '#marques', image: '/images/hero-main/Showroom%20Gariani%20%C3%89quipements%20et%20outils%20professionnels.png' },
  { label: 'DISTRIBUTION PROFESSIONNELLE', first: 'Un réseau', second: 'de partenaires', accent: 'à votre service', text: 'Nous accompagnons les détaillants et les professionnels partout au Québec.', link: '#services', image: '/images/hero-main/distribution_grossistes_revendeurs.webp' },
  { label: 'RAMASSAGE ET LIVRAISON', first: 'Un service', second: 'simple et', accent: 'rapide', text: 'Nous facilitons la prise en charge et le retour de vos équipements.', link: '#contact', image: '/images/hero-main/ramassage_livraison_gariani.webp' },
];

function Hero() {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [imageVisible, setImageVisible] = useState(true);
  useEffect(() => {
    const nextIndex = (active + 1) % slides.length;
    const preload = new window.Image();
    preload.src = slides[nextIndex].image;
    const timer = window.setTimeout(() => {
      setPrevious(active);
      setImageVisible(false);
      setActive(nextIndex);
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => setImageVisible(true)));
    }, 5200);
    return () => window.clearTimeout(timer);
  }, [active]);
  const slide = slides[active];
  return <section className={`reference-hero reference-hero-${active}`} id="accueil" role="region" aria-roledescription="carrousel" aria-label="Diaporama Équipements Gariani">
    <div className="hero-photo-placeholder" aria-hidden="true">{slides.map((item, index) => (index === active || index === previous) && <img key={index} className={`hero-background-image${index === active ? (imageVisible ? ' is-active' : ' is-entering') : ' is-previous'}`} src={item.image} alt="" loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === active ? 'high' : 'auto'} />)}</div>
    <div className="wrap reference-hero-inner"><div className="reference-hero-copy" data-scroll-reveal="up" key={active}>
      <p className="reference-eyebrow"><span />{slide.label}</p><h1>{slide.first}<br />{slide.second}<br /><em>{slide.accent}</em></h1><p className="reference-hero-lede">{slide.text}</p><a className="button button-red reference-hero-button" href={slide.link}>En savoir plus <ArrowRight size={16} /></a>
    </div><div className="reference-slider-controls"><div className="reference-pagination" role="group" aria-label="Choisir une diapositive">{slides.map((item, index) => <button key={item.label} aria-label={`Diapositive ${index + 1}`} aria-current={index === active ? 'true' : undefined} className={index === active ? 'current' : ''} onClick={() => { if (index === active) return; setPrevious(active); setImageVisible(false); setActive(index); window.requestAnimationFrame(() => window.requestAnimationFrame(() => setImageVisible(true))); }} />)}</div></div><a className="hero-scroll-cue" href="#services" aria-label="Défiler vers la rubrique des services"><span className="hero-scroll-mouse" aria-hidden="true"><span /></span><span className="hero-scroll-label">Défiler</span></a></div>
  </section>;
}

function Marquee() {
  const words = ['DISTRIBUTION', 'SERVICE', 'RÉPARATION', 'ACCOMPAGNEMENT'];
  return <div className="red-marquee" aria-label="Distribution, service, réparation et accompagnement"><div className="red-marquee-track" aria-hidden="true">{[0, 1, 2, 3, 4, 5].map((copy) => <div className="red-marquee-group" key={copy}>{words.map((word) => <span key={`${copy}-${word}`}>{word}</span>)}</div>)}</div></div>;
}

export default function HomePage() {
  const seo = PUBLIC_ROUTES[0];
  return <><SEO title={seo.title} description={seo.description} path={seo.path} /><main><Hero /><Marquee /><ServicesPage /><AboutPage /><BrandsPage /><ContactPage /></main></>;
}
