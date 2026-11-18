import { useEffect } from 'react';
import { Header, Footer } from './components/SiteShell.jsx';
import PartnershipPopup from './components/PartnershipPopup.jsx';
import ScrollRevealObserver from './components/ScrollRevealObserver.jsx';
import HomePage from './pages/HomePage.jsx';

export default function App() {
  useEffect(() => {
    if (window.location.hash) {
      const sectionId = decodeURIComponent(window.location.hash.slice(1));
      window.requestAnimationFrame(() => document.getElementById(sectionId)?.scrollIntoView());
    } else window.scrollTo(0, 0);
  }, []);

  return <><Header /><HomePage /><Footer /><PartnershipPopup /><ScrollRevealObserver /></>;
}
