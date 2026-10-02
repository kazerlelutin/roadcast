Feature: Protéger les limites de l'offre
  Scenario: Appliquer l'expiration Free
    Given un Roadcast Free inactif depuis plus de 45 jours
    When la purge quotidienne s'exécute
    Then il est supprimé avec ses chroniques, ses versions, ses liens et ses médias

  Scenario: Préserver un Roadcast Complete
    Given un Roadcast Complete sans activité depuis plus de 45 jours
    Then il ne devient pas éligible à l'expiration
