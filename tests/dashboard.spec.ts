import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');
  });

  test('should display dashboard overview', async ({ page }) => {
    await expect(page.locator('text=Welcome back')).toBeVisible();
    await expect(page.locator('text=Total Projects')).toBeVisible();
    await expect(page.locator('text=Current Plan')).toBeVisible();
  });

  test('should navigate to projects page', async ({ page }) => {
    await page.click('text=Projects');
    await expect(page).toHaveURL('/dashboard/projects');
    await expect(page.locator('h1')).toContainText('Projects');
  });

  test('should navigate to settings page', async ({ page }) => {
    await page.click('text=Settings');
    await expect(page).toHaveURL('/dashboard/settings');
    await expect(page.locator('h1')).toContainText('Settings');
  });

  test('should navigate to billing page', async ({ page }) => {
    await page.click('text=Billing');
    await expect(page).toHaveURL('/dashboard/billing');
    await expect(page.locator('h1')).toContainText('Billing');
  });

  test('should logout successfully', async ({ page }) => {
    await page.click('[aria-label="Log out"]');
    await expect(page).toHaveURL('/');
  });
});

test.describe('Projects Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.goto('/dashboard/projects');
  });

  test('should display projects list', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Projects');
    await expect(page.locator('text=Product Showcase')).toBeVisible();
    await expect(page.locator('text=Architecture Model')).toBeVisible();
  });

  test('should search projects', async ({ page }) => {
    await page.fill('input[placeholder="Search projects..."]', 'Product');
    await expect(page.locator('text=Product Showcase')).toBeVisible();
  });

  test('should open new project dialog', async ({ page }) => {
    await page.click('text=New Project');
    await expect(page.locator('text=Create New Project')).toBeVisible();
  });
});

test.describe('Settings Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.goto('/dashboard/settings');
  });

  test('should display settings tabs', async ({ page }) => {
    await expect(page.locator('text=Profile')).toBeVisible();
    await expect(page.locator('text=Notifications')).toBeVisible();
    await expect(page.locator('text=Appearance')).toBeVisible();
    await expect(page.locator('text=Security')).toBeVisible();
  });

  test('should update profile information', async ({ page }) => {
    await page.fill('input[id="name"]', 'Updated Name');
    await page.click('button:has-text("Save Changes")');
    await expect(page.locator('text=Profile updated successfully')).toBeVisible();
  });

  test('should toggle notification settings', async ({ page }) => {
    await page.click('text=Notifications');
    const switchElement = page.locator('label:has-text("Email Notifications")').locator('..').locator('input[type="checkbox"]');
    await switchElement.click();
  });
});
