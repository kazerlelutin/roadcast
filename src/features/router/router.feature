@router
Feature: Front-end Router
  As a user
  I want to navigate through the application
  So that I can access different pages with proper state management

  Background:
    Given the application is loaded
    And the router is initialized
    And the templates are available

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
    And the URL should be "/about"
    And the about template should be rendered
    And the about page script should be initialized
    And the previous page cleanup should be executed

  Scenario: Navigation with dynamic parameters
    When I visit the page "/users/123"
    Then I should see the user profile for 123
    And the page title should be "User Profile"
    And the URL should be "/users/123"
    And the user template should be rendered

  Scenario: Navigation with query parameters
    When I visit the page "/search?q=test"
    Then I should see search results for "test"
    And the URL should be "/search?q=test"
    And the search template should be rendered

  Scenario: Page not found
    When I visit a non-existent page
    Then I should see the 404 page
    And the page title should be "Page Not Found"
    And the URL should remain unchanged
    And the 404 template should be rendered

  Scenario: Navigation with authentication
    Given I am not logged in
    When I try to access a protected page
    Then I should be redirected to the login page
    And the URL should be "/login"
    And the login template should be rendered

  Scenario: Navigation with transition and cleanup
    Given I am on a page with active scripts
    When I navigate to a new page
    Then the previous page cleanup should be executed
    And the new page script should be initialized
    And the content should be updated after the transition

  Scenario: Link handling with internal navigation
    When I click on an internal link
    Then the navigation should be handled by the router
    And the page should not be reloaded
    And the browser history should be updated

  Scenario: Back button handling
    Given I am on the "/about" page
    When I click the back button
    Then I should go back to the previous page
    And the URL should be updated
    And the content should be updated
    And the page cleanup should be executed

  Scenario: External link handling
    When I click on an external link
    Then the navigation should be handled by the browser
    And the page should be reloaded

  Scenario: Template rendering with state management
    When I visit a page with reactive state
    Then the template should be rendered
    And the page script should be initialized
    And the reactive state should be set up
    And the UI should respond to state changes

  Scenario: Script cleanup on navigation
    Given I am on a page with active event listeners
    When I navigate to another page
    Then the previous page event listeners should be removed
    And the previous page timers should be cleared
    And the previous page state should be cleaned up
    And the new page should be properly initialized

  Scenario: Multiple rapid navigation
    When I navigate quickly between multiple pages
    Then each page should render correctly
    And each page cleanup should execute properly
    And no memory leaks should occur
    And the final page should be active

  Scenario: Browser refresh handling
    Given I am on a specific page
    When I refresh the browser
    Then the current page should be rendered correctly
    And the page script should be initialized
    And the URL should remain the same
