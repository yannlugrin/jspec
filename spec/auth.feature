Feature: Authentication
  Scenario: Login with valid credentials
    Given the user tj
    And the password foobar
    When I press login
    Then I should be authenticated
    
  Scenario: Login with invalid credentials
    Given the user foo
    And the password bar
    When I press login
    Then I should not be authenticated
