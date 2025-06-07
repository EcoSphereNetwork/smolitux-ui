import { test, expect } from '@playwright/test';

/**
 * Browser compatibility tests for critical components.
 */
test.describe('Browser Compatibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('DatePicker works across browsers', async ({ page }) => {
    await page.getByRole('link', { name: /date\s*picker/i, exact: false }).click();
    await page.waitForSelector('[data-testid="storybook-preview-iframe"]');
    const frame = page.frameLocator('[data-testid="storybook-preview-iframe"]');
    const input = frame.getByRole('textbox');
    await input.click();
    await expect(frame.locator('.datepicker')).toBeVisible();
    // choose a date if element exists
    if (await frame.locator('.datepicker .day').count()) {
      await frame.locator('.datepicker .day').first().click();
    }
    await expect(frame.locator('.datepicker')).not.toBeVisible();
  });

  test('Form validation behaves consistently', async ({ page }) => {
    await page.getByRole('link', { name: /form/i, exact: false }).click();
    await page.waitForSelector('[data-testid="storybook-preview-iframe"]');
    const frame = page.frameLocator('[data-testid="storybook-preview-iframe"]');
    await frame.getByRole('button', { name: /submit|senden/i }).click();
    await expect(frame.locator('.error-message')).toBeVisible();
  });
});
