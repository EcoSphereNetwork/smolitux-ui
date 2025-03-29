import { test, expect } from '@playwright/test';

test.describe('Tooltip und Drawer Komponenten', () => {
  test.beforeEach(async ({ page }) => {
    // Navigiere zur Storybook-Seite
    await page.goto('/');
  });

  test('Tooltip sollte bei Hover angezeigt werden', async ({ page }) => {
    // Navigiere zur Tooltip-Story
    await page.getByRole('link', { name: /tooltip/i, exact: false }).click();
    
    // Warte auf die Story-Ansicht
    await page.waitForSelector('[data-testid="storybook-preview-iframe"]');
    
    // Wechsle zum iFrame
    const iframe = page.frameLocator('[data-testid="storybook-preview-iframe"]');
    
    // Finde den Button mit Tooltip
    const button = iframe.getByRole('button', { name: /hover me/i });
    
    // Überprüfe, dass der Tooltip initial nicht sichtbar ist
    const tooltip = iframe.locator('[role="tooltip"]');
    await expect(tooltip).not.toBeVisible();
    
    // Hover über den Button
    await button.hover();
    
    // Warte kurz für die Animation
    await page.waitForTimeout(300);
    
    // Überprüfe, dass der Tooltip sichtbar ist
    await expect(tooltip).toBeVisible();
    
    // Überprüfe den Tooltip-Text
    await expect(tooltip).toContainText('Tooltip Text');
    
    // Bewege die Maus weg
    await page.mouse.move(0, 0);
    
    // Warte kurz für die Animation
    await page.waitForTimeout(300);
    
    // Überprüfe, dass der Tooltip nicht mehr sichtbar ist
    await expect(tooltip).not.toBeVisible();
  });

  test('Tooltip sollte mit Tastatur zugänglich sein', async ({ page }) => {
    // Navigiere zur Tooltip-Story
    await page.getByRole('link', { name: /tooltip/i, exact: false }).click();
    
    // Warte auf die Story-Ansicht
    await page.waitForSelector('[data-testid="storybook-preview-iframe"]');
    
    // Wechsle zum iFrame
    const iframe = page.frameLocator('[data-testid="storybook-preview-iframe"]');
    
    // Finde den Button mit Tooltip
    const button = iframe.getByRole('button', { name: /hover me/i });
    
    // Überprüfe, dass der Tooltip initial nicht sichtbar ist
    const tooltip = iframe.locator('[role="tooltip"]');
    await expect(tooltip).not.toBeVisible();
    
    // Fokussiere den Button mit Tab
    await page.keyboard.press('Tab');
    
    // Warte kurz für die Animation
    await page.waitForTimeout(300);
    
    // Überprüfe, dass der Tooltip sichtbar ist
    await expect(tooltip).toBeVisible();
    
    // Entferne den Fokus mit Tab
    await page.keyboard.press('Tab');
    
    // Warte kurz für die Animation
    await page.waitForTimeout(300);
    
    // Überprüfe, dass der Tooltip nicht mehr sichtbar ist
    await expect(tooltip).not.toBeVisible();
  });

  test('Drawer sollte geöffnet und geschlossen werden können', async ({ page }) => {
    // Navigiere zur Drawer-Story
    await page.getByRole('link', { name: /drawer/i, exact: false }).click();
    
    // Warte auf die Story-Ansicht
    await page.waitForSelector('[data-testid="storybook-preview-iframe"]');
    
    // Wechsle zum iFrame
    const iframe = page.frameLocator('[data-testid="storybook-preview-iframe"]');
    
    // Öffne den Drawer
    await iframe.getByRole('button', { name: /drawer öffnen/i }).click();
    
    // Überprüfe, ob der Drawer geöffnet ist
    const drawer = iframe.locator('[role="dialog"].drawer');
    await expect(drawer).toBeVisible();
    
    // Überprüfe den Titel
    const title = iframe.getByRole('heading', { name: /drawer titel/i });
    await expect(title).toBeVisible();
    
    // Schließe den Drawer mit dem Schließen-Button
    await iframe.getByRole('button', { name: /close/i }).click();
    
    // Überprüfe, ob der Drawer geschlossen ist
    await expect(drawer).not.toBeVisible();
    
    // Öffne den Drawer erneut
    await iframe.getByRole('button', { name: /drawer öffnen/i }).click();
    
    // Schließe den Drawer durch Klick auf das Overlay
    await iframe.locator('[data-testid="drawer-overlay"]').click({ position: { x: 10, y: 10 } });
    
    // Überprüfe, ob der Drawer geschlossen ist
    await expect(drawer).not.toBeVisible();
  });

  test('Drawer sollte verschiedene Positionen unterstützen', async ({ page }) => {
    // Navigiere zur Drawer-Story
    await page.getByRole('link', { name: /drawer/i, exact: false }).click();
    
    // Warte auf die Story-Ansicht
    await page.waitForSelector('[data-testid="storybook-preview-iframe"]');
    
    // Wechsle zum iFrame
    const iframe = page.frameLocator('[data-testid="storybook-preview-iframe"]');
    
    // Teste verschiedene Positionen
    const positions = ['left', 'right', 'top', 'bottom'];
    
    for (const position of positions) {
      // Öffne den Drawer mit der entsprechenden Position
      await iframe.getByRole('button', { name: new RegExp(`${position}`, 'i') }).click();
      
      // Überprüfe, ob der Drawer geöffnet ist
      const drawer = iframe.locator('[role="dialog"].drawer');
      await expect(drawer).toBeVisible();
      
      // Überprüfe die Position-Klasse
      await expect(drawer).toHaveClass(new RegExp(`drawer-${position}`));
      
      // Schließe den Drawer mit dem Schließen-Button
      await iframe.getByRole('button', { name: /close/i }).click();
      
      // Überprüfe, ob der Drawer geschlossen ist
      await expect(drawer).not.toBeVisible();
    }
  });

  test('Drawer sollte Tastaturnavigation unterstützen', async ({ page }) => {
    // Navigiere zur Drawer-Story
    await page.getByRole('link', { name: /drawer/i, exact: false }).click();
    
    // Warte auf die Story-Ansicht
    await page.waitForSelector('[data-testid="storybook-preview-iframe"]');
    
    // Wechsle zum iFrame
    const iframe = page.frameLocator('[data-testid="storybook-preview-iframe"]');
    
    // Öffne den Drawer
    await iframe.getByRole('button', { name: /drawer öffnen/i }).click();
    
    // Überprüfe, ob der Drawer geöffnet ist
    const drawer = iframe.locator('[role="dialog"].drawer');
    await expect(drawer).toBeVisible();
    
    // Drücke die Escape-Taste, um den Drawer zu schließen
    await page.keyboard.press('Escape');
    
    // Überprüfe, ob der Drawer geschlossen ist
    await expect(drawer).not.toBeVisible();
    
    // Öffne den Drawer erneut
    await iframe.getByRole('button', { name: /drawer öffnen/i }).click();
    
    // Überprüfe Tab-Navigation
    await page.keyboard.press('Tab'); // Fokus auf Schließen-Button
    
    // Drücke Enter, um den Drawer zu schließen
    await page.keyboard.press('Enter');
    
    // Überprüfe, ob der Drawer geschlossen ist
    await expect(drawer).not.toBeVisible();
  });
});