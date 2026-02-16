Feature: Orange HRM Dashboard (Ejemplo)

  Scenario: Search users by role admin
    Given I navigate to the Orange HRM login page
    When I login with username "Admin" and password "admin123"
    When I search users by role admin
    Then all results should have role "Admin" 
