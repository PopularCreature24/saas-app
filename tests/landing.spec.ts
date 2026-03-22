import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should display the hero section', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('h1')).toContainText('Next Generation');
    await expect(page.locator('text=3D Visualization')).toBeVisible();
  });

  test('should have navigation links', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('a:has-text("Features")').first()).toBeVisible();
    await expect(page.locator('a:has-text("Pricing")').first()).toBeVisible();
    await expect(page.locator('a:has-text("Demo")').first()).toBeVisible();
  });

  test('should navigate to register page from hero', async ({ page }) => {
    await page.goto('/');
    
    await page.click('a:has-text("Get Started Free")');
    await expect(page).toHaveURL(/\/auth\/register/);
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/');
    
    await page.click('button:has-text("Log in")');
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('should navigate to pricing page', async ({ page }) => {
    await page.goto('/');
    
    await page.click('a:has-text("Pricing")');
    await expect(page).toHaveURL('/pricing');
  });

  test('should display pricing section', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('text=Simple, Transparent Pricing')).toBeVisible();
    await expect(page.locator('text=Free')).toBeVisible();
    await expect(page.locator('text=Starter')).toBeVisible();
    await expect(page.locator('text=Pro')).toBeVisible();
    await expect(page.locator('text=Enterprise')).toBeVisible();
  });

  test('should display features section', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('text=Lightning Fast')).toBeVisible();
    await expect(page.locator('text=Enterprise Security')).toBeVisible();
    await expect(page.locator('text=Beautiful Design')).toBeVisible();
  });

  test('should display testimonials section', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('text=Loved by Creators')).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('footer')).toBeVisible();
  });
});

test.describe('Pricing Page', () => {
  test('should display all pricing plans', async ({ page }) => {
    await page.goto('/pricing');
    
    await expect(page.locator('h1:has-text("Simple, Transparent Pricing")')).toBeVisible();
    await expect(page.locator('text=Free').first()).toBeVisible();
    await expect(page.locator('text=Starter')).toBeVisible();
    await expect(page.locator('text=Pro')).toBeVisible();
    await expect(page.locator('text=Enterprise')).toBeVisible();
  });

  test('should display FAQ section', async ({ page }) => {
    await page.goto('/pricing');
    
    await expect(page.locator('text=Frequently Asked Questions')).toBeVisible();
  });

  test('should navigate back to home', async ({ page }) => {
    await page.goto('/pricing');
    
    await page.click('a:has-text("Back to Home")');
    await expect(page).toHaveURL('/');
  });

  test('should show plan features', async ({ page }) => {
    await page.goto('/pricing');
    
    await expect(page.locator('text=3 project slots')).toBeVisible();
    await expect(page.locator('text=15 project slots')).toBeVisible();
    await expect(page.locator('text=Unlimited projects')).toBeVisible();
  });
});
