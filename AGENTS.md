# Roadcast agents

Avant toute modification produit, charger `skills/htb-ticket-delivery/SKILL.md`.

Le projet HTB courant est `KAZERLELUTIN/ROADCAST`. Aucun changement produit ne commence sans une user story ; toute tâche d'implémentation est une `technical_task` enfant. Une PR doit lier les références HTB, ses scénarios Gherkin et les vérifications réellement exécutées.

Le code v2 est uniquement sous `src/`, par feature. Les vues `.view.tsx` sont dumb ; les effets, accès aux données et actions restent dans les `.ctrl.ts[x]` / `.actions.ts`. Ne pas modifier `legacy/v1` sauf pour une migration explicitement demandée.
