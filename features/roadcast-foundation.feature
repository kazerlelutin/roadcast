Feature: Préparer une chronique Roadcast
  En tant que chroniqueur
  Je veux écrire, diffuser et partager une chronique depuis le même espace
  Afin de garder une présentation fluide et accessible.

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
