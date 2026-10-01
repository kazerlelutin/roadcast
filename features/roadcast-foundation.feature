Feature: Préparer une chronique Roadcast
  En tant que chroniqueur
  Je veux écrire, diffuser et partager une chronique depuis le même espace
  Afin de garder une présentation fluide et accessible.

  Scenario: Créer un roadcast depuis l'accueil
    Given la page d'accueil Roadcast
    When je saisis le titre de mon roadcast
    Then je peux accéder à son espace d'écriture

  Scenario: Choisir un contraste adapté depuis l'accueil
    Given la page d'accueil Roadcast est en mode sombre
    When je bascule vers le mode clair
    Then l'accueil reste lisible et le choix est conservé

  Scenario: Préparer une chronique avec le contraste choisi
    Given une chronique ouverte dans un roadcast
    When je choisis le mode clair ou sombre
    Then l'arbre, l'éditeur et l'aperçu restent lisibles

  Scenario: Ouvrir un lien direct vers un roadcast
    Given le lien de modification /mon-roadcast
    When je l'ouvre dans le navigateur
    Then l'arbre et l'éditeur de la chronique sont affichés

  Scenario: Estimer la durée pendant l'écriture
    Given une chronique ouverte en mode concentration
    When je modifie le texte de la chronique
    Then son estimation de temps est mise à jour

  Scenario: Envoyer un média vers un slider
    Given un média intégré à une chronique
    When je choisis le slider Bravo depuis sa fenêtre d'actions
    Then le slider Bravo affiche ce média en aperçu

  Scenario: Partager une lecture asynchrone
    Given le slider Alpha est interactif
    When une personne ajoute un élément à son résumé
    Then elle peut télécharger son résumé à la fin de la présentation

  Scenario: Partager le bon accès au roadcast
    Given un roadcast ouvert dans l’espace d’écriture
    When j’ouvre le partage et choisis Écrire, Lire ou Diffuser
    Then le lien correspondant est affiché et peut être copié

  Scenario: Garder un aperçu lisible sans diffusion
    Given aucun média n’est envoyé vers le slider Alpha
    When je consulte son aperçu
    Then un encart au ratio 16:9 indique qu’aucune diffusion n’est en cours et son lien peut être copié

  Scenario: Organiser les chroniques avec les chroniqueurs
    Given un roadcast contenant des chroniques de plusieurs auteurs
    When je crée ou sélectionne un chroniqueur et filtre les chroniques
    Then seules les chroniques correspondantes sont affichées et je peux en ajouter au-dessus ou en dessous de la chronique active
