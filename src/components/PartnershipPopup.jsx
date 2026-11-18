import { useCallback, useEffect, useRef, useState } from 'react';
import { Handshake, X } from 'lucide-react';
import './PartnershipPopup.css';

const DEFAULT_IMAGE = '/images/popup/partenariat-popup.webp';
const EXIT_DURATION = 260;

export default function PartnershipPopup({ imageSrc = DEFAULT_IMAGE, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef(null);
  const autoOpenedRef = useRef(false);
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const closeTimerRef = useRef(null);
  const internalNavigationKey = 'gariani-internal-navigation';

  const openPopup = useCallback(() => {
    if (visible) return;
    scrollPositionRef.current = window.scrollY;
    previousFocusRef.current = document.activeElement;
    setVisible(true);
    window.requestAnimationFrame(() => setOpen(true));
  }, [visible]);

  useEffect(() => {
    let showTimer;
    let preloadTimer;
    let skipAutoOpen = false;
    try {
      skipAutoOpen = window.sessionStorage.getItem(internalNavigationKey) === '1';
      window.sessionStorage.removeItem(internalNavigationKey);
    } catch { /* session storage may be disabled */ }

    const markInternalNavigation = (event) => {
      const anchor = event.target.closest?.('a[href]');
      if (!anchor || anchor.target === '_blank' || event.defaultPrevented) return;
      let destination;
      try { destination = new URL(anchor.href, window.location.href); } catch { return; }
      if (destination.origin !== window.location.origin) return;
      if (destination.pathname === window.location.pathname && destination.search === window.location.search) return;
      try { window.sessionStorage.setItem(internalNavigationKey, '1'); } catch { /* session storage may be disabled */ }
    };
    document.addEventListener('click', markInternalNavigation, true);

    preloadTimer = window.setTimeout(() => {
      const preload = new window.Image();
      preload.src = imageSrc;
    }, Math.max(0, delay - 900));

    if (skipAutoOpen) autoOpenedRef.current = true;
    else showTimer = window.setTimeout(() => {
      if (autoOpenedRef.current) return;
      autoOpenedRef.current = true;
      openPopup();
    }, delay);

    return () => {
      document.removeEventListener('click', markInternalNavigation, true);
      window.clearTimeout(showTimer);
      window.clearTimeout(preloadTimer);
      window.clearTimeout(closeTimerRef.current);
    };
  }, [delay, imageSrc, openPopup]);

  useEffect(() => {
    if (!visible) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [visible]);

  const dismiss = () => {
    if (!visible || !open) return;
    setOpen(false);
    const exitDuration = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 0 : EXIT_DURATION;
    closeTimerRef.current = window.setTimeout(() => {
      setVisible(false);
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
        window.scrollTo(0, scrollPositionRef.current);
        previousFocusRef.current?.focus?.({ preventScroll: true });
      }));
    }, exitDuration);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      dismiss();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = modalRef.current?.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])');
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return <>
    {!visible && <button className="partnership-reopen is-visible" type="button" aria-label="Découvrir le financement Finalcor" title="Financement Finalcor" onClick={openPopup}><Handshake size={24} strokeWidth={2} /></button>}
    {visible && <div className={`partnership-overlay${open ? ' is-open' : ''}`} onMouseDown={(event) => { if (event.target === event.currentTarget) dismiss(); }}>
      <div className="partnership-modal" ref={modalRef} role="dialog" aria-modal="true" aria-label="Partenariat GARIANI Équipements et Finalcor" onKeyDown={handleKeyDown}>
        <button ref={closeButtonRef} className="partnership-close" type="button" aria-label="Fermer l’annonce du partenariat" onClick={() => dismiss()}><X size={19} strokeWidth={2.2} /></button>
        <div className="partnership-image-frame">
          <a className="partnership-image-link" href="https://www.finalcor.ca/gariani/" target="_blank" rel="noopener noreferrer" aria-label="Visiter la page de financement GARIANI chez Finalcor">
            <img className="partnership-image" src={imageSrc} alt="GARIANI Équipements et Finalcor proposent des solutions de financement adaptées à l’acquisition de vos équipements. Financement flexible, approbation rapide, accompagnement personnalisé." fetchPriority="high" />
          </a>
          <a className="partnership-cta" href="https://www.finalcor.ca/gariani/" target="_blank" rel="noopener noreferrer"><span>Découvrir notre solution de financement</span><b aria-hidden="true">→</b></a>
        </div>
      </div>
    </div>}
  </>;
}
