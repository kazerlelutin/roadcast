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

Les limites Free sont de 25 chroniques, 250 blocs par chronique, 100 médias et 1 Go ; Complete : 250 chroniques, 2 000 blocs, 2 000 médias et 25 Go. Les chiffres sont centralisés dans `src/features/billing/plan.const.ts`.
