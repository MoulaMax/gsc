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
- La rubrique `Conseils` dispose d'une page index et d'articles générés depuis `blog-posts.js`.
- Le formulaire de devis est branché à Static Forms avec upload multipart, honeypot, consentement RGPD et Altcha.
- Les polices et le script Altcha sont servis localement ; Google Maps, Instagram et LinkedIn restent de simples liens externes.
- Aucun outil d'audience, cookie publicitaire ou traceur n'est chargé par défaut, donc aucun bandeau cookie n'est nécessaire à ce stade.

## Structure

```text
gsc1/
|-- index.html
|-- service.html
|-- service-detail.js
|-- service-routes.js
|-- blog-posts.js
|-- conseils.html
|-- conseils/
|-- sitemap.xml
|-- robots.txt
|-- assets/
`-- tools/
    `-- generate-static-pages.mjs
```

`service.html` est le template partagé des pages prestations. `service-routes.js`
centralise les URLs et les métadonnées SEO. `tools/blog-article.html` et
`blog-posts.js` servent à générer la page `conseils.html` et les articles.

## Régénérer les pages statiques

```powershell
node tools/generate-static-pages.mjs
```

Cette commande met aussi à jour `sitemap.xml` et `robots.txt`.

## Tester en local

```powershell
python -m http.server 8766 --bind 127.0.0.1
```

Puis ouvrir `http://127.0.0.1:8766/index.html`.

## À vérifier avant la mise en ligne

- Remplacer les placeholders visibles des blocs confiance : logos certifications, témoignages, références, photos équipe/chantiers.
- Valider le contenu des articles conseils ou le remplacer par les contenus réels du propriétaire.
- Vérifier le domaine final utilisé dans les balises canonical, `redirectTo` Static Forms et `sitemap.xml`.
- Compléter ou confirmer les informations légales sensibles avant production : hébergeur, direction de publication, forme juridique, capital et TVA.
