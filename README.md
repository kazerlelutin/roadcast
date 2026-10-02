# Roadcast v2

Roadcast est un espace de chronique collaboratif conçu pour le mode concentration : écriture, lecture, diffusion multi-slider et partage asynchrone depuis les mêmes contenus.

## Démarrage

```sh
cp .env.example .env
bun install
bun run db:generate
bun run db:migrate
bun run dev
```

L'application écoute sur `http://localhost:3000`. PostgreSQL est requis pour les données persistantes ; la page de démonstration reste accessible sans base configurée.

## Qualité

```sh
bun run check:types
bun run lint
bun test
bun run test:e2e
bun run test:a11y
```

Les comportements sont décrits dans `features/*.feature`. Les UI sont dumb (props et callbacks uniquement) ; les effets, actions serveur et accès aux données vivent dans les fichiers `.ctrl.ts` / `.actions.ts` des features.

## Déploiement CapRover

Le `Dockerfile` produit une image Bun/Nitro. Définir au minimum `DATABASE_URL`, `MEDIA_STORAGE=local` (ou `s3`) et, pour S3, `S3_BUCKET`, `S3_REGION`, `S3_ENDPOINT`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`.

Au démarrage du conteneur, les migrations Drizzle sont appliquées automatiquement avant le lancement du serveur. Un verrou consultatif PostgreSQL sérialise cette étape lorsqu’un déploiement démarre plusieurs conteneurs. En développement local, exécuter `bun run db:migrate` reste la commande explicite.

Le serveur lance aussi la purge des roadcasts Free inactifs depuis 45 jours au démarrage, puis toutes les 24 heures. Les suppressions en base utilisent les cascades PostgreSQL et les médias locaux ou S3 associés sont ensuite supprimés.

Les limites Free sont de 25 chroniques, 250 blocs par chronique, 100 médias et 1 Go ; Complete : 250 chroniques, 2 000 blocs, 2 000 médias et 25 Go. Les chiffres sont centralisés dans `src/features/billing/plan.const.ts`.
