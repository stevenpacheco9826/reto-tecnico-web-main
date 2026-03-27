/**
 * Global constants for test automation
 */

export const TIMEOUTS = {
  SHORT: 3000,      // 3 seconds - for quick interactions
  DEFAULT: 10000,   // 10 seconds - standard wait time
  LONG: 30000,      // 30 seconds - for slow operations
};

export const WAITS = {
  TRANSITION: 500,   // Wait for UI transitions
  NETWORK: 'networkidle',  // Wait for network to idle
};

export const PATHS = {
  SCREENSHOTS: 'screenshots',
  REPORTS: 'reports',
};

export const BASE_URL = process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com';

export const CREDENTIALS = {
  ADMIN_USERNAME: process.env.ADMIN_USERNAME || 'Admin',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin123',
};
