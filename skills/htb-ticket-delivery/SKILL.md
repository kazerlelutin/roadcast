---
name: htb-ticket-delivery
description: Deliver a Roadcast product change through its HTB user story, child technical tasks, tests, and pull request. Use for Roadcast implementation, fixes, and refactors; not for read-only questions.
---

# HTB ticket delivery for Roadcast

Use project `KAZERLELUTIN/ROADCAST`.

1. Find the user story in HTB. If absent, create it with observable acceptance criteria. Create one child `technical_task` per implementation concern before coding.
2. Keep the change inside `src/features/<feature>/`. UI `.view.tsx` files receive data and callbacks only; effects and server work belong in `.ctrl.ts[x]` / `.actions.ts`.
3. Update the relevant `.feature` scenario and execute the proportionate unit, integration, security, accessibility and E2E checks. Record only checks that actually passed.
4. Create a focused branch, commit and PR. The PR body includes HTB references, acceptance criteria, tests, security/accessibility checks, migration/rollback notes and remaining risks.
5. Move a task to `review` only after its code and checks are ready. Comment the parent user story with the PR URL. Do not mark the story done until all its child tasks are done.

For payment, e-mail, storage and collaboration, keep provider SDKs behind feature ports; choosing or connecting a provider needs explicit authorization.
