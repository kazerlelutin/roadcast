Feature: Protéger les limites de l'offre
  Scenario: Appliquer l'expiration Free
    Given un Roadcast Free inactif depuis plus de 90 jours
    When aucune lecture ou écriture n'a lieu
    Then il est éligible à l'expiration

  Scenario: Préserver un Roadcast Complete
    Given un Roadcast Complete sans activité depuis plus de 90 jours
    Then il ne devient pas éligible à l'expiration
