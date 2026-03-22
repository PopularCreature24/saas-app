import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test('complete user journey from landing to dashboard', async ({ page }) => {
    // Visit landing page
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Next Generation');
    
    // Navigate to register
    await page.click('text=Get Started Free');
    await expect(page).toHaveURL('/auth/register');
    
    // Register new user
    await page.fill('input[id="name"]', 'John Doe');
    await page.fill('input[id="email"]', 'john@example.com');
    await page.fill('input[id="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('text=Welcome back, John')).toBeVisible();
    
    // Navigate to projects
    await page.click('text=Projects');
    await expect(page).toHaveURL('/dashboard/projects');
    
    // Create new project
    await page.click('text=New Project');
    await page.fill('input[id="name"]', 'My First Project');
    await page.click('button:has-text("Create Project")');
    
    // Navigate to settings
    await page.click('text=Settings');
    await expect(page).toHaveURL('/dashboard/settings');
    
    // Navigate to billing
    await page.click('text=Billing');
    await expect(page).toHaveURL('/dashboard/billing');
    await expect(page.locator('text=Current Plan')).toBeVisible();
    
    // Go back to home
    await page.click('text=Nexus3D');
    await expect(page).toHaveURL('/');
  });

  test('navigation across all pages', async ({ page }) => {
    // Visit landing page
    await page.goto('/');
    
    // Check header navigation
    await page.click('text=Features');
    await page.waitForSelector('#features');
    
    await page.click('text=Pricing');
    await expect(page).toHaveURL('/pricing');
    
    await page.click('text=Demo');
    await page.waitForSelector('#demo');
    
    // Login
    await page.click('text=Log in');
    await expect(page).toHaveURL('/auth/login');
  });
});
