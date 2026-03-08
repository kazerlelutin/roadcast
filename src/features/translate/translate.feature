Feature: Translation and internationalization
  As a bento generator user
  I want to use the application in my preferred language
  So that I can understand and interact with the interface effectively

  Background:
    Given the application is initialized
    And translation data is available

  Scenario: Language detection from browser
    Given I visit the application for the first time
    And no language preference is stored
    When the application initializes
    Then the browser language is detected
    And if the browser language is supported, it is set as current language
    And if the browser language is not supported, French is set as default

  Scenario: Language persistence in localStorage
    Given I have previously selected a language
    When the application loads
    Then the stored language preference is retrieved
    And the application uses the stored language
    And the language preference persists across sessions

  Scenario: Language switching
    Given I am using the application
    When I change the language setting
    Then the current language is updated
    And all UI elements are translated to the new language
    And the language preference is saved to localStorage

  Scenario: Translation retrieval
    Given I have translation data for multiple languages
    When I request a translation
    Then the translation for the current language is returned
    And if the current language translation is not available, French is used as fallback
    And if no translation is found, 'Not found' is returned

  Scenario: UI element translation
    Given I have UI elements with translation attributes
    When the language changes
    Then all elements with 'data-translate' attributes are updated
    And the text content reflects the new language
    And the translation keys are properly resolved

  Scenario: Supported languages
    Given the translation system is active
    When I check available languages
    Then French (fr) is supported
    And English (en) is supported
    And Korean (ko) is supported
    And other languages are not supported

  Scenario: Translation key management
    Given I have UI translation keys
    When I check the available translation keys
    Then action keys (add, delete, exchange, select) are available
    And navigation keys (home, about) are available
    And content keys (ingredients, steps, export) are available
    And all keys have translations for supported languages

  Scenario: Fallback translation behavior
    Given I have a translation object with missing languages
    When I request a translation
    Then the system falls back to French if the current language is missing
    And the system returns 'Not found' if no translations are available
    And no errors are thrown for missing translations

  Scenario: Language storage key management
    Given the translation system is active
    When I check the localStorage key
    Then the key is set to 'bento_language'
    And the language preference is stored under this key

  Scenario: Dynamic translation updates
    Given I have elements that need translation updates
    When the language changes
    Then all elements with translation attributes are found
    And their text content is updated with new translations
    And the UI reflects the language change immediately

  Scenario: Translation data structure
    Given I have translation objects
    When I examine the translation structure
    Then each translation has a French (fr) property
    And optional English (en) and Korean (ko) properties
    And the structure is consistent across all translations
