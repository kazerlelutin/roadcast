Feature: Application version management
  As a bento generator user
  I want to see the current application version
  So that I can track updates and report issues accurately

  Background:
    Given the application is initialized
    And the version system is active

  Scenario: Version display initialization
    Given I am on any page of the application
    When the version system initializes
    Then the version is retrieved from package.json
    And the version is displayed in the designated element
    And the version element is found by ID 'version'

  Scenario: Version element update
    Given I have a version element in the DOM
    When the displayVersion function is called
    Then the version element's text content is updated
    And the version matches the package.json version
    And the version is displayed correctly

  Scenario: Version constant management
    Given the version system is active
    When I check the version constant
    Then the version is imported from package.json
    And the version constant is available for use
    And the version format follows semantic versioning

  Scenario: Version element not found
    Given the version element is not present in the DOM
    When the displayVersion function is called
    Then no error is thrown
    And the function handles the missing element gracefully
    And the application continues to function normally

  Scenario: Version display on page load
    Given I visit the application
    When the page loads
    Then the version is automatically displayed
    And the version is visible to the user
    And the version information is current

  Scenario: Version consistency
    Given the application is running
    When I check the version in different parts of the application
    Then the version is consistent across all components
    And the version matches the package.json version
    And no version conflicts exist

  Scenario: Version format validation
    Given I have a version from package.json
    When I examine the version format
    Then the version follows semantic versioning (major.minor.patch)
    And the version is a valid string
    And the version can be parsed correctly

  Scenario: Version display in footer
    Given I am viewing the application
    When I look for version information
    Then the version is typically displayed in the footer
    And the version is easily accessible
    And the version is clearly labeled

  Scenario: Version updates tracking
    Given I am using the application
    When the application is updated
    Then the version number changes accordingly
    And the new version is displayed
    And users can track application updates

  Scenario: Version system cleanup
    Given the version system is active
    When the application is closed
    Then no cleanup is required for the version system
    And no memory leaks occur
    And the version system is stateless
