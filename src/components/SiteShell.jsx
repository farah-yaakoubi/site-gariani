import { useState } from 'react';
import { ArrowRight, MapPin, Menu, Package, Phone, Tractor, Wrench, X } from 'lucide-react';
import { homeAssets } from '../data/home-assets.js';

export const phone = '514-736-5555';
export const phoneLink = 'tel:5147365555';
export const email = 'info@equipementsgariani.ca';

export function Icon({ name, size = 20, strokeWidth = 1.8 }) {
  const icons = { arrow: ArrowRight, pin: MapPin, phone: Phone, wrench: Wrench, tractor: Tractor, box: Package, menu: Menu, close: X };
  const LucideIcon = icons[name];
  if (LucideIcon) return <LucideIcon aria-hidden="true" size={size} strokeWidth={strokeWidth} />;
  if (name === 'facebook') return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M13.4 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.2v3.2H10V21h3.4Z" /></svg>;
  if (name === 'instagram') return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none" /></svg>;
  if (name === 'tiktok') return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.2V2h-4.06v13.67a2.87 2.87 0 1 1-2.87-2.87c.3 0 .59.05.86.14V8.8a7 7 0 1 0 6.07 6.93V9.1a8.84 8.84 0 0 0 5.17 1.67V6.72a4.9 4.9 0 0 1-1.4-.03Z" /></svg>;
  if (name === 'linkedin') return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M5.2 8.4a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM3.5 10h3.4v10H3.5V10Zm5.5 0h3.3v1.4h.1a3.6 3.6 0 0 1 3.2-1.8c3.4 0 4 2.2 4 5.1V20h-3.4v-4.7c0-1.1 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5V20H9V10Z" /></svg>;
  return <Package aria-hidden="true" size={size} strokeWidth={strokeWidth} />;
}

const navigation = [
  { label: 'Services', path: '#services' },
  { label: 'Marques', path: '#marques' },
  { label: 'À propos', path: '#a-propos' },
  { label: 'Contact', path: '#contact' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const link = (item) => <a key={item.path} className="nav-link" href={item.path} onClick={() => setMenuOpen(false)}>{item.label}</a>;

  return <>
    <div className="topbar"><div className="topbar-inner">
      <a href="https://maps.google.com/?q=3817+Rue+Jean-Talon+Ouest%2C+Montreal%2C+Quebec+H3R+2G4%2C+CA" target="_blank" rel="noreferrer"><Icon name="pin" size={15} /> Montréal, Québec</a><span className="topbar-separator" />
      <a href={phoneLink}><Icon name="phone" size={15} /> {phone}</a>
      <div className="top-social" aria-label="Réseaux sociaux">
        <a href="https://www.facebook.com/people/les-%C3%A9quipements-ghariani/61576408641587/" target="_blank" rel="noreferrer" aria-label="Facebook"><Icon name="facebook" size={15} /></a>
        <a href="https://www.instagram.com/equipementsgariani/" target="_blank" rel="noreferrer" aria-label="Instagram"><Icon name="instagram" size={15} /></a>
        <a href="https://www.tiktok.com/@equipementsgariani" target="_blank" rel="noreferrer" aria-label="TikTok"><Icon name="tiktok" size={15} /></a>
        <a href="https://www.linkedin.com/company/%C3%A9quipements-gariani/?viewAsMember=true" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" size={15} /></a>
      </div>
    </div></div>
    <header className="site-header"><div className="header-inner">
      <a className="brand-lockup" href="#accueil" aria-label="Accueil Équipements Gariani"><img src={homeAssets.logo} alt="Équipements Gariani — Vente, service, distribution" /></a>
      <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Navigation principale">
        {navigation.map(link)}
      </nav>
      <a className="button button-red header-contact" href="#contact"><Icon name="wrench" size={15} /> Demander un service <Icon name="arrow" size={15} /></a>
      <button className="menu-toggle" aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} size={24} /></button>
    </div></header>
  </>;
}

export function Footer() {
  const [newsletterState, setNewsletterState] = useState('idle');
  const submitNewsletter = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new URLSearchParams(new FormData(form));
    data.set('form-name', 'newsletter');
    setNewsletterState('sending');
    try {
      const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: data.toString() });
      if (!response.ok) throw new Error('Newsletter unavailable');
      form.reset(); setNewsletterState('sent');
    } catch { setNewsletterState('error'); }
  };
  return <footer className="site-footer"><section className="footer-visual-banner" aria-label="Ensemble, cultivons la performance"><div className="wrap footer-visual-inner"><h2>Ensemble, cultivons<br /><em>la performance</em></h2><a className="button button-red" href="#contact">Contactez-nous <Icon name="arrow" size={15} /></a><div className="footer-visual-contact"><a href="https://maps.google.com/?q=3817+Rue+Jean-Talon+Ouest%2C+Montreal%2C+Quebec+H3R+2G4%2C+CA"><Icon name="pin" /> Montréal, Québec</a><a href={phoneLink}><Icon name="phone" /> {phone}</a><a href={`mailto:${email}`}>{email}</a></div></div></section><div className="wrap footer-main">
    <div className="footer-brand"><img src={homeAssets.logo} alt="Logo officiel Équipements Gariani" /><p>Vente · Service · Distribution</p><div className="footer-social-links">
      <a href="https://www.facebook.com/people/les-%C3%A9quipements-ghariani/61576408641587/" target="_blank" rel="noreferrer" aria-label="Facebook"><Icon name="facebook" /></a><a href="https://www.instagram.com/equipementsgariani/" target="_blank" rel="noreferrer" aria-label="Instagram"><Icon name="instagram" /></a><a href="https://www.tiktok.com/@equipementsgariani" target="_blank" rel="noreferrer" aria-label="TikTok"><Icon name="tiktok" /></a><a href="https://www.linkedin.com/company/%C3%A9quipements-gariani/?viewAsMember=true" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
    </div></div>
    <div className="footer-column"><h3>Liens utiles</h3>{navigation.map((item) => <a key={item.path} href={item.path}>{item.label}</a>)}</div>
    <div className="footer-column"><h3>Nos services</h3><a href="#services">Service & réparation</a><a href="#services">Distribution professionnelle</a><a href="#contact">Accompagnement professionnel</a></div>
    <div className="footer-column footer-newsletter"><h3>Abonnez-vous à notre infolettre</h3><form name="newsletter" method="POST" data-netlify="true" onSubmit={submitNewsletter}><input type="hidden" name="form-name" value="newsletter" /><label className="sr-only" htmlFor="newsletter-email">Votre courriel</label><input id="newsletter-email" type="email" name="email" placeholder="Votre courriel" required /><button type="submit" aria-label="S’abonner à l’infolettre" disabled={newsletterState === 'sending'}><Icon name="arrow" /></button></form>{newsletterState === 'sent' && <p className="newsletter-feedback">Merci, votre inscription a été reçue.</p>}{newsletterState === 'error' && <p className="newsletter-feedback">L’inscription n’a pas abouti. Réessayez plus tard.</p>}</div>
  </div><div className="footer-bottom"><div className="wrap"><span>© 2026 Équipements Gariani. Tous droits réservés.</span></div></div></footer>;
}
