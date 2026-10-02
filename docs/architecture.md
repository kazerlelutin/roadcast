# Architecture Roadcast v2

Chaque feature possède son contrôleur (`.ctrl.ts[x]`), sa vue dumb (`.view.tsx`), ses styles CSS Module et, si elle modifie des données, ses actions SolidStart (`.actions.ts`). Une vue ne connaît ni Drizzle, ni le réseau, ni une variable d'environnement.

`roadcast` est l'agrégat : il porte le plan, l'activité et le slider interactif. Les liens sont scindés en trois droits minimaux : `edit`, `read`, `slider`. Les médias sont identifiés par clé ; YouTube ne stocke qu'une URL, local et S3 implémentent la même interface.

La collaboration temps réel et l'e-mail sont des ports à connecter : le modèle ne dépend pas d'un fournisseur. Le paiement est également un port : seul le changement de plan vers `complete` est métier. Aucun prestataire n'est choisi prématurément.
