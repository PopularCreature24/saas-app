import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.describe('Login Page', () => {
    test('should display login form', async ({ page }) => {
      await page.goto('/auth/login');
      
      await expect(page.locator('h2')).toContainText('Welcome back');
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('input[type="password"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toContainText('Sign In');
    });

    test('should show validation errors for empty fields', async ({ page }) => {
      await page.goto('/auth/login');
      
      await page.click('button[type="submit"]');
      
      await expect(page.locator('input:invalid').first()).toBeVisible();
    });

    test('should navigate to register page', async ({ page }) => {
      await page.goto('/auth/login');
      
      await page.click('text=Sign up');
      await expect(page).toHaveURL('/auth/register');
    });

    test('should login successfully with valid credentials', async ({ page }) => {
      await page.goto('/auth/login');
      
      await page.fill('input[type="email"]', 'test@example.com');
      await page.fill('input[type="password"]', 'password123');
      await page.click('button[type="submit"]');
      
      await expect(page).toHaveURL('/dashboard');
    });
  });

  test.describe('Register Page', () => {
    test('should display registration form', async ({ page }) => {
      await page.goto('/auth/register');
      
      await expect(page.locator('h2')).toContainText('Create an account');
      await expect(page.locator('input[id="name"]')).toBeVisible();
      await expect(page.locator('input[id="email"]')).toBeVisible();
      await expect(page.locator('input[id="password"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toContainText('Create Account');
    });

    test('should show validation errors for empty fields', async ({ page }) => {
      await page.goto('/auth/register');
      
      await page.click('button[type="submit"]');
      
      await expect(page.locator('input:invalid').first()).toBeVisible();
    });

    test('should navigate to login page', async ({ page }) => {
      await page.goto('/auth/register');
      
      await page.click('text=Sign in');
      await expect(page).toHaveURL('/auth/login');
    });

    test('should register successfully', async ({ page }) => {
      await page.goto('/auth/register');
      
      await page.fill('input[id="name"]', 'Test User');
      await page.fill('input[id="email"]', 'test@example.com');
      await page.fill('input[id="password"]', 'password123');
      await page.click('button[type="submit"]');
      
      await expect(page).toHaveURL('/dashboard');
    });
  });
});
