# GSC Copronet - Variante commerciale et SEO

Nouvelle version du site GSC Copronet orientée acquisition locale et qualification
des demandes de devis à Avignon et dans le Vaucluse.

## Principes

- Les interventions techniques et les prestations à forte valeur apparaissent en premier.
- L'entretien régulier, les secteurs accompagnés et les multiservices disposent de blocs distincts.
- Les intitulés visibles ciblent les recherches locales utiles : fin de chantier, nettoyage
  industriel, médical, HACCP, vitrerie en hauteur et traitement des sols.
- Le formulaire demande la surface, la ville, la fréquence, le délai et permet l'ajout de photos.
- Chaque prestation dispose d'une page HTML statique avec un `title`, une description, un `h1`
  et une URL lisible propres.

## Structure

```text
gsc1/
|-- index.html
|-- service.html
|-- service-detail.js
|-- service-routes.js
|-- sitemap.xml
|-- robots.txt
|-- assets/
`-- tools/
    `-- generate-static-pages.mjs
```

`service.html` est le template partagé. `service-routes.js` centralise les URLs et
les métadonnées SEO. Les pages statiques sont générées à partir de ces deux fichiers.

## Régénérer les pages statiques

```powershell
node tools/generate-static-pages.mjs
```

## Tester en local

```powershell
python -m http.server 8766 --bind 127.0.0.1
```

Puis ouvrir `http://127.0.0.1:8766/index.html`.

## À brancher avant la mise en ligne

- Connecter le formulaire de devis à un endpoint réel.
- Définir l'adresse de réception des demandes.
- Vérifier le domaine final utilisé dans les balises canonical et dans `sitemap.xml`.
