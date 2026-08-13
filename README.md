# DDSL Audio — site vitrine

Site de présentation et de demande de devis pour DDSL Audio (Bordeaux, Gironde).
Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4.

**Ce site n'est pas une boutique.** Aucun paiement, aucune réservation ferme.
Tout aboutit à une demande de devis envoyée par e-mail.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production
npm start       # sert le build
```

---

## 1. Ce qu'il reste à renseigner

Le site a été construit **sans inventer aucune donnée**. Les informations non
confirmées sont à `null` dans les fichiers de données, et l'interface masque
automatiquement ce qui est vide. Il suffit de remplir la valeur pour qu'elle
apparaisse partout où elle est utilisée.

### Coordonnées — `src/data/site.ts`

Tout est dans l'objet `contact`. Chaque champ rempli s'affiche automatiquement
dans le pied de page, la page contact, les mentions légales et les données
structurées Google.

| Champ                 | Effet une fois rempli                                          |
| --------------------- | -------------------------------------------------------------- |
| `phone`               | Affiche le numéro **et fait apparaître le bouton « Appeler »** de la barre mobile |
| `phoneHref`           | Format international pour le lien `tel:` — ex. `"+33556000000"` |
| `whatsapp`            | Lien WhatsApp                                                   |
| `email`               | Affiche l'adresse et sert de recours si l'envoi du formulaire échoue |
| `address`, `postalCode` | Adresse dans les mentions légales et le JSON-LD `LocalBusiness` |
| `openingHours`        | Horaires affichés et transmis à Google                          |
| `siret`, `legalForm`, `vatNumber`, `publicationDirector`, `hostingProvider` | Mentions légales (obligation légale — à compléter avant mise en ligne) |

L'objet `social` (`instagram`, `facebook`, `youtube`) fonctionne pareil : les
icônes n'apparaissent que pour les réseaux renseignés.

> ⚠️ **Avant la mise en ligne**, les mentions légales sont incomplètes tant que
> `siret`, `legalForm`, `publicationDirector` et `hostingProvider` sont `null`.

### Domaine

`site.baseUrl` vaut `https://www.ddsl-audio.fr` par défaut. Il sert au
`sitemap.xml`, aux URL canoniques et aux partages sociaux. Pour le changer sans
toucher au code, définir la variable d'environnement :

```
NEXT_PUBLIC_SITE_URL=https://le-vrai-domaine.fr
```

---

## 2. Réception des demandes de devis

Les trois formulaires (devis matériel, DJ, contact) envoient vers
`/api/devis` (`src/app/api/devis/route.ts`).

**Tant que rien n'est configuré**, la demande n'est pas perdue : elle est écrite
intégralement dans les logs du serveur, et l'internaute reçoit quand même sa
confirmation. Mais personne n'est prévenu — il faut donc configurer l'envoi.

Créer un fichier `.env.local` (jamais versionné) :

```
RESEND_API_KEY=re_xxxxxxxxxxxx
DEVIS_TO_EMAIL=contact@ddsl-audio.fr
DEVIS_FROM_EMAIL=site@ddsl-audio.fr
```

- `RESEND_API_KEY` — clé API [Resend](https://resend.com). Aucune dépendance
  npm à installer : l'API HTTP est appelée directement.
- `DEVIS_TO_EMAIL` — l'adresse qui reçoit les demandes.
- `DEVIS_FROM_EMAIL` — expéditeur, sur un **domaine vérifié chez Resend**.
  Sinon l'envoi est refusé.

Les trois variables doivent être présentes, sinon on reste en mode journalisation.
Sur Vercel : Project Settings → Environment Variables, puis redéployer.

---

## 3. Ajouter du matériel

Tout le catalogue est dans **`src/data/catalog.ts`** — jamais dans les composants.
Ajouter une entrée au tableau `products` suffit : la fiche produit, la page de
catégorie, le méga-menu, le panier de devis et le sitemap se mettent à jour seuls.

Règles à respecter :

- **Ne rien inventer.** Un champ inconnu se laisse à `null` ou `[]` : il ne
  s'affichera pas. Une puissance approximative ou une marque supposée est pire
  qu'un champ vide.
- `availableQuantity: null` = quantité non communiquée. Le sélecteur de quantité
  n'est alors pas plafonné. Avec un nombre, l'internaute ne peut pas dépasser le
  parc et voit « Parc complet ».
- `specifications: {}` = aucune caractéristique publiée. Ne remplir qu'avec des
  valeurs réelles (relevées sur le matériel ou sur la fiche constructeur).
- `ref` doit rester unique : c'est ce que DDSL Audio lit dans l'e-mail de demande.
- `options` : cases à cocher proposées sur la fiche (installation, opérateur…).
- `featured: true` fait remonter le produit sur la page d'accueil.

### Photos produits

Déposer les fichiers dans `public/materiel/`, puis renseigner le tableau
`images` du produit :

```ts
images: ["/materiel/cdj-2000-nexus.jpg"],
```

Format conseillé : JPEG ou WebP, ~1600 px de large, cadrage horizontal.
Sans image, la fiche affiche un motif technique — c'est prévu, rien ne casse.

---

## 4. Publier des réalisations

`src/data/realisations.ts` contient un tableau **vide** et un exemple commenté
de la structure attendue.

Dès qu'une entrée est ajoutée, la page `/realisations` bascule automatiquement
de l'état « galerie en préparation » à la grille, et la mise en page alterne les
formats pour éviter l'effet catalogue.

Photos dans `public/realisations/`. `equipment` accepte les `id` du catalogue,
ce qui permet de relier un événement au matériel utilisé.

**Penser à obtenir l'accord des organisateurs** avant de publier des photos
d'événements privés (mariages en particulier).

---

## 5. Pages locales (SEO)

La zone d'intervention est traitée comme « Bordeaux → Gironde », sans liste
artificielle de communes. Si des pages locales sont créées plus tard
(ex. `/location-sonorisation-arcachon`), le sitemap (`src/app/sitemap.ts`) et le
composant `BreadcrumbJsonLd` sont déjà en place pour les accueillir.

---

## 6. Organisation du code

```
src/
  app/                    routes (App Router) + sitemap.ts, robots.ts
    api/devis/route.ts    réception des trois formulaires
  components/
    layout/               header, méga-menu, footer, barre d'action mobile
    quote/                panier de devis « Ma demande » (contexte + tiroir + page)
    guide/                parcours « Je ne sais pas quoi choisir »
    dj/, contact/         formulaires dédiés
    seo/                  JSON-LD
    ui/                   éléments graphiques (led, vumètre, glyphes, reveal)
  data/
    site.ts               coordonnées, mentions légales, listes de choix
    catalog.ts            catalogue complet
    realisations.ts       réalisations (vide)
```

Le panier est conservé dans le `localStorage` sous la clé `ddsl-demande-v1`,
les réponses du parcours guidé sous `ddsl-brief-v1`. Changer ces clés remet à
zéro les demandes en cours chez les visiteurs.

---

## 7. Points de vigilance

- **Ne jamais introduire de vocabulaire e-commerce.** Le bouton doit rester
  « Ajouter à ma demande » — pas « panier », pas « commander », pas de prix.
- **Ne jamais afficher de prix.** Le tarif se discute au devis.
- **Ne pas ajouter de chiffres non vérifiés** (nombre d'événements, années
  d'expérience, taux de satisfaction, logos de partenaires). Le site a été écrit
  pour tenir sans, et Google pénalise les allégations invérifiables.
- Les animations respectent `prefers-reduced-motion` : toute nouvelle animation
  doit faire de même (voir `src/app/globals.css`).
- **Le site est clair par défaut.** Les blocs noirs sont explicites : classe
  `stage` sur la `<section>`. À l'intérieur, `--surface`, `--text`, `--line` et
  `--accent` sont redéfinis, donc `.btn`, `.panel`, `.field`, `.choice`, le
  logo et le vumètre s'adaptent seuls — inutile de passer des variantes de
  couleur. Ne jamais imbriquer un `stage` dans un `stage` : pour une carte à
  l'intérieur d'un bloc noir, utiliser `bg-ink-900`.
- Le monospace (`tech-sm`) est réservé aux références, codes et quantités.
  Toute phrase se compose en sans (`Instrument Sans`) — c'est ce qui évite
  l'effet « terminal » sur du texte courant.
