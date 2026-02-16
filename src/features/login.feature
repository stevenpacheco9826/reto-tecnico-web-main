Feature: Orange HRM Login

  Scenario: Login with valid credentials
    Given I navigate to the Orange HRM login page
    When I login with username "Admin" and password "admin123"
    Then I should be logged in successfully
    And Dashboard should be visible

  Scenario: Login with invalid credentials
    Given I navigate to the Orange HRM login page
    When I login with username "invalid_user" and password "invalid_password"
    Then I should see an error message
    And I should remain on the login page
