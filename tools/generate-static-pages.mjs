import { mkdir, readFile, writeFile } from 'node:fs/promises';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const domain = 'https://www.gsc-copronet.com';
const serviceTemplate = await readFile(new URL('service.html', root), 'utf8');
const articleTemplate = await readFile(new URL('tools/blog-article.html', root), 'utf8');
const routesSource = await readFile(new URL('service-routes.js', root), 'utf8');
const blogSource = await readFile(new URL('blog-posts.js', root), 'utf8');
const context = { window: {} };

vm.runInNewContext(routesSource, context);
vm.runInNewContext(blogSource, context);

const routes = context.window.GSC_SERVICE_ROUTES;
const posts = context.window.GSC_BLOG_POSTS || [];
const faqByPath = context.window.GSC_BLOG_FAQ || {};

const escapeHtml = value => String(value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const escapeText = value => escapeHtml(value).replaceAll('&quot;', '"');
const formatDate = value => new Intl.DateTimeFormat('fr-FR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric'
}).format(new Date(value));

const buildServiceSchema = (route, canonical) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: route.h1 || route.title,
    description: route.description,
    serviceType: route.kind === 'sector' ? 'Secteur accompagné' : 'Prestation de propreté professionnelle',
    url: canonical,
    areaServed: { '@type': 'AdministrativeArea', name: 'Vaucluse', containedInPlace: { '@type': 'Country', name: 'France' } },
    provider: {
      '@type': 'ProfessionalService',
      name: 'GSC Copronet',
      legalName: 'Arnaud Propreté',
      telephone: '+33490800505',
      email: 'a.arnaud@gsc-copronet.com',
      url: `${domain}/`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: "13 avenue de l'Orme Fourchu",
        postalCode: '84000',
        addressLocality: 'Avignon',
        addressRegion: 'Vaucluse',
        addressCountry: 'FR'
      }
    }
  };
  return `<script type="application/ld+json">\n  ${JSON.stringify(schema, null, 2)}\n  </script>`;
};

for (const [slug, route] of Object.entries(routes)) {
  const canonical = `${domain}/${route.path}`;
  const page = serviceTemplate
    .replace('<title>Service professionnel | GSC Copronet</title>', `<title>${escapeHtml(route.title)}</title>`)
    .replace(
      '<meta name="description" content="Découvrez les prestations de propreté et de maintenance proposées par GSC Copronet à Avignon et dans le Vaucluse." />\n  <link rel="canonical" href="https://www.gsc-copronet.com/service.html" />',
      `<meta name="description" content="${escapeHtml(route.description)}" />\n  <link rel="canonical" href="${canonical}" />`
    )
    .replace('<meta property="og:title" content="Service professionnel | GSC Copronet" />', `<meta property="og:title" content="${escapeHtml(route.title)}" />`)
    .replace('<meta property="og:description" content="Découvrez les prestations de propreté et de maintenance proposées par GSC Copronet à Avignon et dans le Vaucluse." />', `<meta property="og:description" content="${escapeHtml(route.description)}" />`)
    .replace('<meta property="og:url" content="https://www.gsc-copronet.com/service.html" />', `<meta property="og:url" content="${canonical}" />`)
    .replace('<meta name="twitter:title" content="Service professionnel | GSC Copronet" />', `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`)
    .replace('<meta name="twitter:description" content="Découvrez les prestations de propreté et de maintenance proposées par GSC Copronet à Avignon et dans le Vaucluse." />', `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`)
    .replace('<!-- SERVICE_SCHEMA -->', buildServiceSchema(route, canonical))
    .replace('<body class="detail-page">', `<body class="detail-page" data-service-slug="${slug}">`)
    .replace('<h1 data-service-title>Service professionnel</h1>', `<h1 data-service-title>${escapeHtml(route.h1)}</h1>`);

  await writeFile(new URL(route.path, root), page, 'utf8');
}

await mkdir(new URL('conseils/', root), { recursive: true });

const renderArticleContent = post => post.sections.map(section => `
          <section>
            <h2>${escapeText(section.heading)}</h2>
            ${section.paragraphs.map(paragraph => `<p>${escapeText(paragraph)}</p>`).join('\n            ')}
          </section>`).join('\n');

const renderFaqBlock = faq => {
  if (!faq || !faq.length) return '';
  const items = faq.map(({ q, a }) => `
            <details class="faq-item">
              <summary>${escapeText(q)}</summary>
              <p>${escapeText(a)}</p>
            </details>`).join('');
  return `
        <section class="article-faq" aria-labelledby="faq-title">
          <h2 id="faq-title">Questions liées</h2>${items}
        </section>`;
};

for (const post of posts) {
  const canonical = `${domain}/${post.path}`;
  const imageUrl = `${domain}/${post.image}`;
  const faq = faqByPath[post.path];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'GSC Copronet'
    },
    publisher: {
      '@type': 'Organization',
      name: 'GSC Copronet',
      logo: {
        '@type': 'ImageObject',
        url: `${domain}/assets/favicon.svg`
      }
    },
    mainEntityOfPage: canonical
  };
  const schemaScripts = [
    `<script type="application/ld+json">\n  ${JSON.stringify(schema, null, 2)}\n  </script>`
  ];
  if (faq && faq.length) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a }
      }))
    };
    schemaScripts.push(`<script type="application/ld+json">\n  ${JSON.stringify(faqSchema, null, 2)}\n  </script>`);
  }

  const page = articleTemplate
    .replace('<title>Article conseil | GSC Copronet</title>', `<title>${escapeHtml(post.title)} | GSC Copronet</title>`)
    .replace(
      '<meta name="description" content="Conseil GSC Copronet pour organiser vos prestations de nettoyage professionnel à Avignon et dans le Vaucluse." />\n  <link rel="canonical" href="https://www.gsc-copronet.com/conseils/article.html" />',
      `<meta name="description" content="${escapeHtml(post.description)}" />\n  <link rel="canonical" href="${canonical}" />`
    )
    .replace('<meta property="og:title" content="Article conseil | GSC Copronet" />', `<meta property="og:title" content="${escapeHtml(post.title)} | GSC Copronet" />`)
    .replace('<meta property="og:description" content="Conseil GSC Copronet pour organiser vos prestations de nettoyage professionnel." />', `<meta property="og:description" content="${escapeHtml(post.description)}" />`)
    .replace('<meta property="og:url" content="https://www.gsc-copronet.com/conseils/" />', `<meta property="og:url" content="${canonical}" />`)
    .replace('<meta property="og:image" content="https://www.gsc-copronet.com/assets/og-image.svg" />', `<meta property="og:image" content="${imageUrl}" />`)
    .replace('<meta name="twitter:title" content="Article conseil | GSC Copronet" />', `<meta name="twitter:title" content="${escapeHtml(post.title)} | GSC Copronet" />`)
    .replace('<meta name="twitter:description" content="Conseil GSC Copronet pour organiser vos prestations de nettoyage professionnel." />', `<meta name="twitter:description" content="${escapeHtml(post.description)}" />`)
    .replace('<meta name="twitter:image" content="https://www.gsc-copronet.com/assets/og-image.svg" />', `<meta name="twitter:image" content="${imageUrl}" />`)
    .replace('<!-- ARTICLE_SCHEMA -->', schemaScripts.join('\n  '))
    .replace('<!-- ARTICLE_H1 -->', escapeText(post.h1))
    .replace('<!-- ARTICLE_EXCERPT -->', escapeText(post.excerpt))
    .replace('<!-- ARTICLE_CATEGORY -->', escapeText(post.category))
    .replace('<!-- ARTICLE_DATE -->', formatDate(post.date))
    .replace('<!-- ARTICLE_READING_TIME -->', escapeText(post.readingTime))
    .replace('<img src="../assets/og-image.svg" alt="" width="900" height="560" loading="lazy" decoding="async" />', `<picture><source srcset="../${escapeHtml(post.image.replace(/\.jpg$/, '.webp'))}" type="image/webp"><img src="../${escapeHtml(post.image)}" alt="${escapeHtml(post.alt)}" width="900" height="560" loading="lazy" decoding="async" /></picture>`)
    .replace('          <!-- ARTICLE_CONTENT -->', renderArticleContent(post) + renderFaqBlock(faq));

  await writeFile(new URL(post.path, root), page, 'utf8');
}

const renderPostCards = postList => postList.map(post => `
          <article class="advice-card" data-reveal>
            <a href="${escapeHtml(post.path)}">
              <span class="advice-card__meta">${escapeText(post.category)} · ${escapeText(post.readingTime)}</span>
              <h3>${escapeText(post.title)}</h3>
              <p>${escapeText(post.excerpt)}</p>
              <b>Lire le conseil →</b>
            </a>
          </article>`).join('\n');

const blogIndex = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Conseils nettoyage professionnel à Avignon | GSC Copronet</title>
  <meta name="description" content="Conseils GSC Copronet pour organiser vos prestations de nettoyage professionnel, entretien de copropriété, remise en état et hygiène HACCP à Avignon." />
  <link rel="canonical" href="${domain}/conseils.html" />
  <meta name="theme-color" content="#0E2A20" />
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml" />
  <link rel="manifest" href="site.webmanifest" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="fr_FR" />
  <meta property="og:site_name" content="GSC Copronet" />
  <meta property="og:title" content="Conseils nettoyage professionnel à Avignon | GSC Copronet" />
  <meta property="og:description" content="Repères pratiques pour préparer vos demandes de nettoyage professionnel dans le Vaucluse." />
  <meta property="og:url" content="${domain}/conseils.html" />
  <meta property="og:image" content="${domain}/assets/og-image.svg" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="stylesheet" href="styles.css?v=20260605-8" />
</head>
<body class="detail-page">
  <header class="nav is-scrolled" data-nav>
    <div class="container nav__inner">
      <a href="index.html" class="nav__logo" aria-label="GSC Copronet — Accueil">
        <span class="nav__logo-mark" aria-hidden="true">
          <svg viewBox="0 0 156 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 44 C54 56 116 53 152 12 C124 35 70 43 6 44 Z" fill="#F4C20E"/>
            <text x="0" y="37" font-family="'Inter Tight','Inter',sans-serif" font-size="40" font-weight="800" letter-spacing="-2.5" fill="currentColor">GSC</text>
          </svg>
        </span>
        <span class="nav__logo-text">Copronet</span>
      </a>
      <nav class="nav__menu" aria-label="Navigation principale">
        <a href="index.html#prestations">Interventions techniques</a>
        <a href="index.html#entretien-regulier">Prestations régulières</a>
        <a href="index.html#multiservices">Multiservices</a>
        <a href="index.html#secteurs">Secteurs</a>
        <a href="index.html#qui-sommes-nous">Qui sommes-nous</a>
        <a href="index.html#faq">FAQ</a>
        <a href="conseils.html">Conseils</a>
      </nav>
      <div class="nav__actions">
        <a href="tel:+33490800505" class="nav__phone" aria-label="Téléphone">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>04 90 80 05 05</span>
        </a>
        <a href="index.html#devis" class="btn btn--primary nav__cta">Devis gratuit</a>
        <button class="nav__toggle" type="button" aria-label="Ouvrir le menu" data-menu-toggle><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>
  <main>
    <section class="blog-hero">
      <div class="container blog-hero__inner">
        <span class="eyebrow">Conseils</span>
        <h1>Conseils nettoyage professionnel à Avignon.</h1>
        <p>Des repères pratiques pour préparer vos demandes, mieux cadrer vos prestations et choisir les bonnes fréquences d'intervention.</p>
      </div>
    </section>
    <section class="blog-list">
      <div class="container blog-list__grid">
${renderPostCards(posts)}
      </div>
    </section>
  </main>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <a href="index.html" class="nav__logo nav__logo--light"><span class="nav__logo-mark" aria-hidden="true"><svg viewBox="0 0 156 54" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 44 C54 56 116 53 152 12 C124 35 70 43 6 44 Z" fill="#F4C20E"/><text x="0" y="37" font-family="'Inter Tight','Inter',sans-serif" font-size="40" font-weight="800" letter-spacing="-2.5" fill="currentColor">GSC</text></svg></span><span class="nav__logo-text">Copronet</span></a>
        <p class="footer__tagline">La propreté professionnelle, pensée comme un service de proximité, partout dans le Vaucluse.</p>
      </div>
      <div class="footer__col">
        <h4>Navigation</h4>
        <ul>
          <li><a href="index.html#prestations">Interventions techniques</a></li>
          <li><a href="index.html#entretien-regulier">Prestations régulières</a></li>
          <li><a href="index.html#multiservices">Multiservices</a></li>
          <li><a href="index.html#secteurs">Secteurs</a></li>
          <li><a href="index.html#qui-sommes-nous">Qui sommes-nous</a></li>
          <li><a href="index.html#faq">FAQ</a>
        <a href="conseils.html">Conseils</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4>Contact</h4>
        <ul>
          <li>13 av. de l'Orme Fourchu<br />84000 Avignon</li>
          <li><a href="tel:+33490800505">04 90 80 05 05</a></li>
          <li>Lun–Ven · 8h–12h, 14h–18h</li>
        </ul>
      </div>
    </div>
    <div class="container footer__bottom">
      <p>© <span data-year>2026</span> GSC Copronet — Arnaud Propreté. Tous droits réservés.</p>
      <nav class="footer__links" aria-label="Liens légaux"><a href="mentions-legales.html">Mentions légales</a><a href="confidentialite.html">Confidentialité</a></nav>
      <p class="footer__legal">SIRET 421 475 211 00056 · RCS Avignon</p>
    </div>
  </footer>
  <script src="script.js?v=20260605-3" defer></script>
  <aside class="cookie-notice" role="status" aria-label="Information cookies" data-cookie-notice>
    <span class="cookie-notice__icon" aria-hidden="true">🍪</span>
    <p>Ce site <strong>ne dépose aucun cookie</strong>. <a href="confidentialite.html">En savoir plus</a></p>
    <button type="button" class="cookie-notice__close" aria-label="Fermer ce message" data-cookie-notice-close>×</button>
  </aside>
</body>
</html>
`;

await writeFile(new URL('conseils.html', root), blogIndex, 'utf8');

// Sitemap enrichi : lastmod (date du jour) + changefreq + priority
const today = new Date().toISOString().slice(0, 10);
const url = (loc, opts = {}) => {
  const lastmod = opts.lastmod || today;
  const changefreq = opts.changefreq || 'monthly';
  const priority = opts.priority || '0.7';
  return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
};

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  url(`${domain}/`, { changefreq: 'weekly', priority: '1.0' }),
  url(`${domain}/conseils.html`, { changefreq: 'weekly', priority: '0.8' }),
  url(`${domain}/mentions-legales.html`, { changefreq: 'yearly', priority: '0.3' }),
  url(`${domain}/confidentialite.html`, { changefreq: 'yearly', priority: '0.3' }),
  ...posts.map(post => url(`${domain}/${post.path}`, { lastmod: post.date, changefreq: 'monthly', priority: '0.7' })),
  ...Object.values(routes).map(route => url(`${domain}/${route.path}`, { changefreq: 'monthly', priority: '0.8' })),
  '</urlset>',
  ''
].join('\n');

await writeFile(new URL('sitemap.xml', root), sitemap, 'utf8');
await writeFile(new URL('robots.txt', root), `User-agent: *\nAllow: /\n\nSitemap: ${domain}/sitemap.xml\n`, 'utf8');

console.log(`Generated ${Object.keys(routes).length} service pages, ${posts.length} article pages and conseils.html.`);
