# GSC Copronet — Refonte 2026

Refonte complète du site web de [gsc-copronet.com](https://www.gsc-copronet.com/) — entreprise familiale de propreté et multiservices basée à Avignon.

## Aperçu

Site statique en HTML / CSS / JavaScript **vanilla** (aucune dépendance, aucun build) :
ouvrez `index.html` dans un navigateur, c'est prêt.

## Structure

```
site-refonte/
├── index.html      # Page unique, structurée en sections
├── styles.css      # Design system complet (palette, typo, composants)
├── script.js       # Sticky nav, menu mobile, reveal au scroll
└── README.md
```

## Direction artistique

- **Palette** : blanc pur + grays froids, vert forêt en couleur principale (`#2F6E54`),
  sections sombres en vert profond (`#0E2A20`). Co-accents repris du logo GSC :
  bleu royal (`#2B3A8E`) et jaune doré (`#F4C20E`).
- **Typographie** : Inter Tight (titres) + Inter (texte) — registre suisse, sobre
- **Style** : épuré, aéré, animations discrètes, micro-interactions soignées
- **Inspirations** : sites de marques contemporaines (Stripe / Linear / Vercel / studios design FR)

## Sections

1. **Hero** — titre éditorial, stats clés, carte coordonnées, marquee des secteurs
2. **Histoire** — récit familial Agnès & Yvon Arnaud
3. **Services** — grille de 6 cartes + bloc multi-services sur fond sombre
4. **Secteurs** — 6 univers d'intervention (grille interactive)
5. **Engagements** — 4 valeurs sur fond sombre
6. **Témoignage** — citation éditoriale
7. **Contact** — coordonnées + formulaire de devis
8. **Footer** — liens, mentions, SIRET

## Déploiement

Le site fonctionne en local en double-cliquant `index.html`.
Pour mise en ligne : déposer le dossier sur n'importe quel hébergeur statique
(Netlify, Vercel, GitHub Pages, OVH, etc.).

## Pistes d'évolution

- Remplacer les visuels CSS abstraits du hero/multi-services par des photos pros des équipes & chantiers
- Ajouter une vraie carte interactive dans la section Contact
- Brancher le formulaire à un endpoint (Formspree, Netlify Forms, backend perso)
- Décliner en pages dédiées par secteur si le SEO le justifie
