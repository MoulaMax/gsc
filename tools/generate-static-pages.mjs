import { readFile, writeFile } from 'node:fs/promises';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const domain = 'https://www.gsc-copronet.com';
const template = await readFile(new URL('service.html', root), 'utf8');
const routesSource = await readFile(new URL('service-routes.js', root), 'utf8');
const context = { window: {} };

vm.runInNewContext(routesSource, context);

const routes = context.window.GSC_SERVICE_ROUTES;
const escapeHtml = value => value
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

for (const [slug, route] of Object.entries(routes)) {
  const canonical = `${domain}/${route.path}`;
  const page = template
    .replace('<title>Service professionnel | GSC Copronet</title>', `<title>${escapeHtml(route.title)}</title>`)
    .replace(
      '<meta name="description" content="Découvrez les prestations de propreté et de maintenance proposées par GSC Copronet à Avignon et dans le Vaucluse." />',
      `<meta name="description" content="${escapeHtml(route.description)}" />\n  <link rel="canonical" href="${canonical}" />`
    )
    .replace('<body class="detail-page">', `<body class="detail-page" data-service-slug="${slug}">`)
    .replace('<h1 data-service-title>Service professionnel</h1>', `<h1 data-service-title>${escapeHtml(route.h1)}</h1>`);

  await writeFile(new URL(route.path, root), page, 'utf8');
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  `  <url><loc>${domain}/</loc></url>`,
  ...Object.values(routes).map(route => `  <url><loc>${domain}/${route.path}</loc></url>`),
  '</urlset>',
  ''
].join('\n');

await writeFile(new URL('sitemap.xml', root), sitemap, 'utf8');
await writeFile(new URL('robots.txt', root), `User-agent: *\nAllow: /\n\nSitemap: ${domain}/sitemap.xml\n`, 'utf8');

console.log(`Generated ${Object.keys(routes).length} static service pages.`);
