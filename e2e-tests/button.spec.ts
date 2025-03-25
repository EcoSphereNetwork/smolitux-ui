import { test, expect } from '@playwright/test';

test.describe('Button Component', () => {
  test('should render primary button correctly', async ({ page }) => {
    // Navigiere zur Button-Story in Storybook
    await page.goto('http://localhost:6006/?path=/story/core-button--primary');
    
    // Warte auf das Storybook-Iframe
    const iframe = page.frameLocator('#storybook-preview-iframe');
    
    // Finde den Button im Iframe
    const button = iframe.locator('button.bg-primary-600');
    
    // Überprüfe, ob der Button sichtbar ist
    await expect(button).toBeVisible();
    
    // Überprüfe den Text des Buttons
    await expect(button).toHaveText('Primary Button');
  });

  test('should handle click events', async ({ page }) => {
    // Navigiere zur Button-Story in Storybook
    await page.goto('http://localhost:6006/?path=/story/core-button--primary');
    
    // Warte auf das Storybook-Iframe
    const iframe = page.frameLocator('#storybook-preview-iframe');
    
    // Finde den Button im Iframe
    const button = iframe.locator('button.bg-primary-600');
    
    // Klicke auf den Button
    await button.click();
    
    // Hier könnten wir weitere Überprüfungen durchführen, wenn der Button
    // in der Story einen sichtbaren Effekt hat, z.B. einen Counter erhöht
  });

  test('should render disabled button correctly', async ({ page }) => {
    // Navigiere zur Disabled-Button-Story in Storybook
    await page.goto('http://localhost:6006/?path=/story/core-button--disabled');
    
    // Warte auf das Storybook-Iframe
    const iframe = page.frameLocator('#storybook-preview-iframe');
    
    // Finde den Button im Iframe
    const button = iframe.locator('button[disabled]');
    
    // Überprüfe, ob der Button sichtbar ist
    await expect(button).toBeVisible();
    
    // Überprüfe, ob der Button deaktiviert ist
    await expect(button).toBeDisabled();
    
    // Überprüfe den Text des Buttons
    await expect(button).toHaveText('Disabled Button');
  });

  test('should render loading button correctly', async ({ page }) => {
    // Navigiere zur Loading-Button-Story in Storybook
    await page.goto('http://localhost:6006/?path=/story/core-button--loading');
    
    // Warte auf das Storybook-Iframe
    const iframe = page.frameLocator('#storybook-preview-iframe');
    
    // Finde den Button im Iframe
    const button = iframe.locator('button[aria-busy="true"]');
    
    // Überprüfe, ob der Button sichtbar ist
    await expect(button).toBeVisible();
    
    // Überprüfe, ob der Button deaktiviert ist
    await expect(button).toBeDisabled();
    
    // Überprüfe, ob der Loading-Text angezeigt wird
    await expect(button).toContainText('Loading');
  });
});