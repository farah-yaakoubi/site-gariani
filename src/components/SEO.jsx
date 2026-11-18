import { SITE_ORIGIN } from '../seo/public-routes.js';

function canonicalUrl(path = '/') {
  const normalizedPath = `/${String(path).replace(/^\/+|\/+$/g, '')}`;
  return `${SITE_ORIGIN}${normalizedPath === '/' ? '' : normalizedPath}`;
}

export default function SEO({ title, description, path = '/' }) {
  const url = canonicalUrl(path);

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
  </>;
}
