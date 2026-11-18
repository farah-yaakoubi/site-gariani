import { useEffect, useRef, useState } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { homeAssets } from '../data/home-assets.js';

function CountUp({ value }) {
  const nodeRef = useRef(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let frame;
    let startedAt;
    let observer;
    const animate = (timestamp) => {
      if (startedAt === undefined) startedAt = timestamp;
      const progress = Math.min((timestamp - startedAt) / 1400, 1);
      setCurrent(Math.round(value * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = window.requestAnimationFrame(animate);
    };
    const start = () => { frame = window.requestAnimationFrame(animate); };

    if ('IntersectionObserver' in window && nodeRef.current) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { observer.disconnect(); start(); }
      }, { threshold: 0.5 });
      observer.observe(nodeRef.current);
    } else start();

    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [value]);

  return <strong ref={nodeRef}>{current}</strong>;
}

export default function AboutPage() {
  return <section id="a-propos" className="homepage-section">
    <header className="page-hero" data-scroll-reveal="up"><div className="wrap"><p className="home-eyebrow"><span /> Depuis 2021</p><h1>À propos d’Équipements Gariani</h1><p>Une entreprise montréalaise au service des particuliers et des professionnels.</p></div></header>
    <section className="about-page-section"><div className="wrap about-page-layout"><div className="about-page-image" data-scroll-reveal="left"><img src={homeAssets.footerBanner} alt="Équipements motorisés dans le showroom GARIANI" loading="lazy" decoding="async" /></div><div className="about-page-copy" data-scroll-reveal="right"><p className="home-eyebrow"><span /> Qui sommes-nous ?</p><h2>L’expertise GARIANI au service de vos projets</h2><p>Équipements Gariani est une entreprise spécialisée dans la distribution d’équipements motorisés extérieurs et d’intrants connexes. Conçue comme un guichet unique, elle accompagne les particuliers, les professionnels, les entrepreneurs paysagistes et les municipalités depuis 2021.</p><p>Grâce à son réseau de détaillants, pépiniéristes et quincailleries, GARIANI développe des solutions adaptées aux besoins de ses clients et partenaires au Québec.</p><a className="about-address" href="https://maps.google.com/?q=3817+Rue+Jean-Talon+Ouest%2C+Montreal%2C+Quebec+H3R+2G4%2C+CA" target="_blank" rel="noreferrer"><MapPin size={19} /> Montréal, Québec</a><a className="button button-red about-page-button" href="#contact">Contactez-nous <ArrowRight size={16} /></a></div></div>
      <div className="wrap about-stats scroll-stagger" aria-label="Équipements Gariani en chiffres"><div data-scroll-reveal="up"><CountUp value={2021} /><span>Année de fondation</span></div><div data-scroll-reveal="up"><strong>QC</strong><span>Montréal et Québec</span></div><div data-scroll-reveal="up"><CountUp value={5} /><span>Marques partenaires</span></div><div data-scroll-reveal="up"><strong>✓</strong><span>Techniciens certifiés</span></div></div>
    </section>
  </section>;
}
