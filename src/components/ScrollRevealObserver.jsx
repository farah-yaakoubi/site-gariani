import { useEffect } from 'react';

export default function ScrollRevealObserver() {
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return undefined;

    const root = document.documentElement;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

    root.classList.add('has-scroll-reveal');
    document.querySelectorAll('[data-scroll-reveal]').forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      root.classList.remove('has-scroll-reveal');
    };
  }, []);

  return null;
}
