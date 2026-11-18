import { SITE_ORIGIN } from '../seo/public-routes.js';

function canonicalUrl(path = '/') {
  const normalizedPath = `/${String(path).replace(/^\/+|\/+$/g, '')}`;
  return `${SITE_ORIGIN}${normalizedPath === '/' ? '' : normalizedPath}`;
}

export default function SEO({ title, description, path = '/' }) {
  const url = canonicalUrl(path);
  const image = `${SITE_ORIGIN}/images/hero-main/hero_gariani_equipements_4k.webp`;
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Équipements Gariani',
    url: SITE_ORIGIN,
    image,
    telephone: '+1-514-736-5555',
    email: 'info@equipementsgariani.ca',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3817 Rue Jean-Talon Ouest',
      addressLocality: 'Montréal',
      addressRegion: 'QC',
      postalCode: 'H3R 2L7',
      addressCountry: 'CA',
    },
    areaServed: [
      { '@type': 'City', name: 'Montréal' },
      { '@type': 'AdministrativeArea', name: 'Québec' },
    ],
    description,
  };

  // React 19 hoists title, meta, and link metadata into <head> on the client and during SSR.
  return <>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={url} />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="fr_CA" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={image} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    <script type="application/ld+json">{JSON.stringify(localBusiness).replace(/</g, '\\u003c')}</script>
  </>;
}
