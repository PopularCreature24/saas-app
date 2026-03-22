import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should display the hero section', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('h1')).toContainText('Next Generation');
    await expect(page.locator('text=3D Visualization')).toBeVisible();
  });

  test('should have navigation links', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('text=Features')).toBeVisible();
    await expect(page.locator('text=Pricing')).toBeVisible();
    await expect(page.locator('text=Demo')).toBeVisible();
  });

  test('should navigate to register page', async ({ page }) => {
    await page.goto('/');
    
    await page.click('text=Get Started Free');
    await expect(page).toHaveURL('/auth/register');
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/');
    
    await page.click('text=Log in');
    await expect(page).toHaveURL('/auth/login');
  });

  test('should display pricing section', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('text=Simple, Transparent Pricing')).toBeVisible();
    await expect(page.locator('text=Free')).toBeVisible();
    await expect(page.locator('text=Starter')).toBeVisible();
    await expect(page.locator('text=Pro')).toBeVisible();
    await expect(page.locator('text=Enterprise')).toBeVisible();
  });

  test('should display 3D viewer demo section', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('text=Interactive 3D Demo')).toBeVisible();
  });

  test('should display features section', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('text=Lightning Fast')).toBeVisible();
    await expect(page.locator('text=Enterprise Security')).toBeVisible();
    await expect(page.locator('text=Beautiful Design')).toBeVisible();
  });
});
