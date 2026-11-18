import { useEffect, useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { email, phone, phoneLink } from '../components/SiteShell.jsx';

function Field({ label, children }) { return <label className="form-field"><span>{label}</span>{children}</label>; }

export default function ContactPage() {
  const [initialSubject, setInitialSubject] = useState('Demande de service');
  const [state, setState] = useState('idle');
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('subject') === 'partnership') {
      setInitialSubject('Financement partenariat GARIANI × Finalcor');
    }
  }, []);
  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (import.meta.env.DEV) {
      setState('local');
      return;
    }
    const data = new URLSearchParams(new FormData(form)); data.set('form-name', 'contact');
    setState('sending');
    try {
      const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: data.toString() });
      if (!response.ok) throw new Error('Formulaire indisponible');
      form.reset(); setState('sent');
    } catch { setState('error'); }
  };
  return <section id="contact" className="homepage-section">
    <header className="page-hero" data-scroll-reveal="up"><div className="wrap"><p className="home-eyebrow"><span /> Parlons de votre projet</p><h1>Contactez-nous</h1><p>Notre équipe est à votre disposition pour répondre à vos questions.</p></div></header>
    <section className="contact-section standalone-contact"><div className="wrap contact-page-layout"><div className="contact-page-details" data-scroll-reveal="left"><h2>Parlons de votre projet</h2><a href="https://maps.google.com/?q=3817+Rue+Jean-Talon+Ouest%2C+Montreal%2C+Quebec+H3R+2G4%2C+CA" target="_blank" rel="noreferrer"><MapPin /><span><small>Adresse</small>3817 Rue Jean-Talon Ouest<br />Montréal, Québec H3R 2G4, Canada</span></a><a href={phoneLink}><Phone /><span><small>Téléphone</small>{phone}</span></a><a href={`mailto:${email}`}><Mail /><span><small>Courriel</small>{email}</span></a></div>
      <div className="contact-form-card" data-scroll-reveal="right"><h2>Envoyer un message</h2><form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit}><input type="hidden" name="form-name" value="contact" /><input className="honeypot" name="bot-field" tabIndex="-1" autoComplete="off" /><Field label="Nom complet"><input name="nom" autoComplete="name" required /></Field><div className="form-row"><Field label="Adresse e-mail"><input type="email" name="email" autoComplete="email" required /></Field><Field label="Téléphone"><input type="tel" name="telephone" autoComplete="tel" /></Field></div><Field label="Sujet"><select name="sujet" value={initialSubject} onChange={(event) => setInitialSubject(event.target.value)}><option>Demande de service</option><option>Réparation d’équipement</option><option>Achat d’équipement</option><option>Financement partenariat GARIANI × Finalcor</option><option>Distribution / Grossiste</option><option>Autre</option></select></Field><Field label="Message"><textarea name="message" rows="5" required /></Field><button className="button button-red form-submit" disabled={state === 'sending'}>{state === 'sending' ? 'Envoi en cours…' : 'Envoyer le message'}</button></form>{state === 'local' && <p className="form-feedback error" role="status">Le formulaire fonctionne sur le site déployé avec Netlify. En local, aucune demande n’est envoyée.</p>}{state === 'sent' && <p className="form-feedback success" role="status">Merci, votre demande a été envoyée.</p>}{state === 'error' && <p className="form-feedback error" role="alert">L’envoi n’a pas abouti. Vous pouvez nous joindre au <a href={phoneLink}>{phone}</a>.</p>}</div>
    </div></section>
  </section>;
}
