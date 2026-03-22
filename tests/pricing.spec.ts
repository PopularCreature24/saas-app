import { test, expect } from '@playwright/test';

test.describe('Pricing Page', () => {
  test('should display all pricing plans', async ({ page }) => {
    await page.goto('/pricing');
    
    await expect(page.locator('h1')).toContainText('Simple, Transparent Pricing');
    await expect(page.locator('text=Free')).toBeVisible();
    await expect(page.locator('text=Starter')).toBeVisible();
    await expect(page.locator('text=Pro')).toBeVisible();
    await expect(page.locator('text=Enterprise')).toBeVisible();
  });

  test('should display plan features', async ({ page }) => {
    await page.goto('/pricing');
    
    await expect(page.locator('text=3 project slots')).toBeVisible();
    await expect(page.locator('text=15 project slots')).toBeVisible();
    await expect(page.locator('text=Unlimited projects')).toBeVisible();
  });

  test('should display pricing amounts', async ({ page }) => {
    await page.goto('/pricing');
    
    await expect(page.locator('text=$0')).toBeVisible();
    await expect(page.locator('text=$12')).toBeVisible();
    await expect(page.locator('text=$29')).toBeVisible();
    await expect(page.locator('text=$99')).toBeVisible();
  });

  test('should display FAQ section', async ({ page }) => {
    await page.goto('/pricing');
    
    await expect(page.locator('text=Frequently Asked Questions')).toBeVisible();
    await expect(page.locator('text=Can I change plans later?')).toBeVisible();
    await expect(page.locator('text=What payment methods')).toBeVisible();
  });

  test('should have back to home link', async ({ page }) => {
    await page.goto('/pricing');
    
    await page.click('text=Back to Home');
    await expect(page).toHaveURL('/');
  });

  test('should highlight popular plan', async ({ page }) => {
    await page.goto('/pricing');
    
    await expect(page.locator('text=Most Popular')).toBeVisible();
  });
});
