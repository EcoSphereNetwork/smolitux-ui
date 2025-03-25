import { test, expect } from '@playwright/test';

test.describe('Button Component', () => {
  test('should render primary button correctly', async ({ page }) => {
    // Navigiere zur Button-Story in Storybook
    await page.goto('/iframe.html?id=core-button--primary');
    
    // Überprüfe, ob der Button sichtbar ist
    const button = page.locator('button');
    await expect(button).toBeVisible();
    
    // Überprüfe den Text des Buttons
    await expect(button).toHaveText('Primary Button');
    
    // Überprüfe die Styling-Klassen
    const className = await button.getAttribute('class');
    expect(className).toContain('bg-primary-600');
  });

  test('should handle click events', async ({ page }) => {
    // Navigiere zur Button-Story in Storybook
    await page.goto('/iframe.html?id=core-button--default');
    
    // Klicke auf den Button
    const button = page.locator('button');
    await button.click();
    
    // In einer echten Anwendung würden wir hier auf eine Reaktion prüfen
    // Da dies ein isolierter Test ist, können wir nur prüfen, ob der Klick erfolgt ist
    await expect(button).toBeFocused();
  });

  test('should be disabled when disabled prop is true', async ({ page }) => {
    // Navigiere zur Disabled-Button-Story in Storybook
    await page.goto('/iframe.html?id=core-button--disabled');
    
    // Überprüfe, ob der Button disabled ist
    const button = page.locator('button');
    await expect(button).toBeDisabled();
    
    // Überprüfe die Styling-Klassen für den disabled-Zustand
    const className = await button.getAttribute('class');
    expect(className).toContain('opacity-50');
    expect(className).toContain('cursor-not-allowed');
  });

  test('should show loading state', async ({ page }) => {
    // Navigiere zur Loading-Button-Story in Storybook
    await page.goto('/iframe.html?id=core-button--loading');
    
    // Überprüfe, ob der Button im Loading-Zustand ist
    const button = page.locator('button');
    await expect(button).toBeDisabled();
    
    // Überprüfe, ob der Loading-Text angezeigt wird
    await expect(page.locator('text=Loading...')).toBeVisible();
    
    // Überprüfe, ob das Spinner-Icon angezeigt wird
    await expect(page.locator('svg')).toBeVisible();
  });

  test('should render different sizes correctly', async ({ page }) => {
    // Teste kleine Größe
    await page.goto('/iframe.html?id=core-button--small');
    let button = page.locator('button');
    let className = await button.getAttribute('class');
    expect(className).toContain('px-3 py-1.5 text-sm');
    
    // Teste mittlere Größe
    await page.goto('/iframe.html?id=core-button--medium');
    button = page.locator('button');
    className = await button.getAttribute('class');
    expect(className).toContain('px-4 py-2 text-base');
    
    // Teste große Größe
    await page.goto('/iframe.html?id=core-button--large');
    button = page.locator('button');
    className = await button.getAttribute('class');
    expect(className).toContain('px-6 py-3 text-lg');
  });
});