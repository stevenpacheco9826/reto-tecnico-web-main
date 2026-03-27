/**
 * Dashboard Page Locators
 * Centralized selectors for the dashboard page
 */

export const DashboardLocators = {
  // Navigation & Menu
  AdminMenuLink: 'Admin',
  SearchButton: 'Search',
  AddUserButton: 'Add',
  
  // Dropdowns & Selects
  UserRoleSelect: '.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow',
  AdminOptionSelect: 'Admin',
  
  // User Profile & Logout
  UserProfileDropdown: '[class*="profile"]',
  LogoutLink: 'a:has-text("Logout")',
  
  // Table Elements
  TableBody: '.oxd-table-body',
  TableRow: '.oxd-table-row',
  TableCell: '.oxd-table-cell',
  
  // Action Buttons
  EditButton: 'button:has-text("Edit")',
  DeleteButton: 'button:has-text("Delete")',
  
  // Filters
  RoleFilterLabel: 'User Role',
  StatusFilterLabel: 'Status',
} as const;