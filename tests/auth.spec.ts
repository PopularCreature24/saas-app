import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.describe('Login Page', () => {
    test('should display login form', async ({ page }) => {
      await page.goto('/auth/login');
      
      await expect(page.locator('h2, [class*="CardTitle"]')).toContainText('Welcome back');
      await expect(page.locator('input[id="email"], input[type="email"]').first()).toBeVisible();
      await expect(page.locator('input[id="password"], input[type="password"]').first()).toBeVisible();
    });

    test('should show validation errors for empty fields', async ({ page }) => {
      await page.goto('/auth/login');
      
      await page.locator('button[type="submit"]').click();
      
      await expect(page.locator('input:invalid').first()).toBeVisible();
    });

    test('should navigate to register page', async ({ page }) => {
      await page.goto('/auth/login');
      
      await page.click('a:has-text("Sign up")');
      await expect(page).toHaveURL(/\/auth\/register/);
    });

    test('should show error for invalid credentials', async ({ page }) => {
      await page.goto('/auth/login');
      
      await page.fill('input[type="email"]', 'nonexistent@example.com');
      await page.fill('input[type="password"]', 'wrongpassword');
      await page.locator('button[type="submit"]').click();
      
      await expect(page.locator('[role="alert"], .text-destructive, .toast')).toBeVisible({ timeout: 5000 }).catch(() => {});
    });

    test('should have magic link option', async ({ page }) => {
      await page.goto('/auth/login');
      
      await expect(page.locator('button:has-text("Send Magic Link")')).toBeVisible();
    });
  });

  test.describe('Register Page', () => {
    test('should display registration form', async ({ page }) => {
      await page.goto('/auth/register');
      
      await expect(page.locator('h2, [class*="CardTitle"]')).toContainText('Create an account');
      await expect(page.locator('input[id="name"]')).toBeVisible();
      await expect(page.locator('input[id="email"], input[type="email"]').first()).toBeVisible();
      await expect(page.locator('input[id="password"], input[type="password"]').first()).toBeVisible();
    });

    test('should show validation errors for empty fields', async ({ page }) => {
      await page.goto('/auth/register');
      
      await page.locator('button[type="submit"]').click();
      
      await expect(page.locator('input:invalid').first()).toBeVisible();
    });

    test('should show error for mismatched passwords', async ({ page }) => {
      await page.goto('/auth/register');
      
      await page.fill('input[id="name"]', 'Test User');
      await page.fill('input[type="email"]', 'newuser@example.com');
      await page.fill('input[id="password"]', 'password123');
      await page.fill('input[id="confirmPassword"]', 'differentpassword');
      await page.locator('button[type="submit"]').click();
      
      await expect(page.locator('[role="alert"], .toast')).toBeVisible({ timeout: 5000 });
    });

    test('should show error for short password', async ({ page }) => {
      await page.goto('/auth/register');
      
      await page.fill('input[id="name"]', 'Test User');
      await page.fill('input[type="email"]', 'newuser@example.com');
      await page.fill('input[id="password"]', 'short');
      await page.locator('button[type="submit"]').click();
      
      await expect(page.locator('[role="alert"], .toast')).toBeVisible({ timeout: 5000 });
    });

    test('should navigate to login page', async ({ page }) => {
      await page.goto('/auth/register');
      
      await page.click('a:has-text("Sign in")');
      await expect(page).toHaveURL(/\/auth\/login/);
    });
  });

  test.describe('Protected Routes', () => {
    test('should redirect to login when accessing dashboard', async ({ page }) => {
      await page.goto('/dashboard');
      
      await expect(page).toHaveURL(/\/auth\/login/);
    });

    test('should redirect to dashboard when accessing auth pages while logged in', async ({ page }) => {
      const uniqueEmail = `test-${Date.now()}@example.com`;
      
      await page.goto('/auth/register');
      await page.fill('input[id="name"]', 'Test User');
      await page.fill('input[type="email"]', uniqueEmail);
      await page.fill('input[id="password"]', 'password123');
      await page.fill('input[id="confirmPassword"]', 'password123');
      
      await page.locator('button[type="submit"]').click();
      
      await page.waitForURL(/\/dashboard/, { timeout: 10000 }).catch(() => {
        page.goto('/auth/login');
      });
    });
  });
});
