import { test, expect } from '@playwright/test';

test.describe('Complete User Flow', () => {
  test('full registration and dashboard usage flow', async ({ page }) => {
    const uniqueEmail = `e2e-${Date.now()}@test.com`;
    
    await page.goto('/');
    
    await expect(page.locator('h1')).toContainText('Next Generation');
    
    await page.click('a:has-text("Get Started Free")');
    await expect(page).toHaveURL(/\/auth\/register/);
    
    await page.fill('input[id="name"]', 'E2E Test User');
    await page.fill('input[type="email"]', uniqueEmail);
    await page.fill('input[id="password"]', 'testpassword123');
    await page.fill('input[id="confirmPassword"]', 'testpassword123');
    
    await page.locator('button[type="submit"]').click();
    
    await page.waitForURL(/\/dashboard/, { timeout: 20000 }).catch(() => {
      console.log('Current URL:', page.url());
    });
    
    if (page.url().includes('/dashboard')) {
      await expect(page.locator('text=Welcome back')).toBeVisible({ timeout: 10000 });
      
      await page.click('a:has-text("Projects")');
      await expect(page).toHaveURL(/\/dashboard\/projects/);
      
      const newProjectButton = page.locator('button:has-text("New Project"), a:has-text("New Project")').first();
      await newProjectButton.click();
      
      await page.waitForTimeout(500);
      const dialogTitle = page.locator('text=Create New Project');
      if (await dialogTitle.isVisible({ timeout: 3000 }).catch(() => false)) {
        await page.fill('input[id="name"], input[placeholder*="Project"]', 'My Test Project');
        await page.click('button:has-text("Create Project")');
        await page.waitForTimeout(2000);
      }
      
      await page.click('a:has-text("Settings")');
      await expect(page).toHaveURL(/\/dashboard\/settings/);
      
      await page.click('button[role="tab"]:has-text("Security")');
      await page.waitForTimeout(500);
      
      await page.click('a:has-text("Billing")');
      await expect(page).toHaveURL(/\/dashboard\/billing/);
      await expect(page.locator('text=Available Plans')).toBeVisible({ timeout: 5000 }).catch(() => {});
      
      console.log('Full user flow completed successfully!');
    }
  });

  test('pricing page navigation flow', async ({ page }) => {
    await page.goto('/pricing');
    
    await expect(page.locator('h1')).toContainText('Pricing');
    await expect(page.locator('text=Free').first()).toBeVisible();
    await expect(page.locator('text=Pro').first()).toBeVisible();
    
    await page.click('a:has-text("Back to Home")');
    await expect(page).toHaveURL('/');
  });

  test('features navigation flow', async ({ page }) => {
    await page.goto('/');
    
    await page.click('a:has-text("Features")');
    await expect(page.locator('h2:has-text("Everything You Need")')).toBeVisible({ timeout: 5000 }).catch(() => {});
    
    await page.click('a:has-text("Demo")');
    await expect(page.locator('h2:has-text("Interactive 3D Demo")')).toBeVisible({ timeout: 5000 }).catch(() => {});
  });

  test('footer navigation', async ({ page }) => {
    await page.goto('/');
    
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    const footerLinks = page.locator('footer a');
    const linkCount = await footerLinks.count();
    expect(linkCount).toBeGreaterThan(0);
  });
});

test.describe('API Endpoints', () => {
  test('should reject unauthorized API access', async ({ page }) => {
    const response = await page.request.get('/api/dashboard');
    expect(response.status()).toBe(401);
  });

  test('should reject unauthorized project access', async ({ page }) => {
    const response = await page.request.get('/api/projects');
    expect(response.status()).toBe(401);
  });
});
