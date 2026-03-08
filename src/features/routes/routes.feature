@routes
Feature: Routes
  As a user
  I want to navigate through the application
  So that I can access different pages with proper state management

  Scenario: Basic navigation with template rendering
    When I visit the home page
    Then I should see the home page content
    And the page title should be "Accueil"
    And the URL should be "/"
    And the home template should be rendered

  Scenario: Navigation to page with script
    When I click on the "About" link
    Then I should see the About page content
    And the page title should be "À propos"
