import { test, expect } from '@playwright/test';

test.describe('Modal und Dialog Komponenten', () => {
  test.beforeEach(async ({ page }) => {
    // Navigiere zur Storybook-Seite
    await page.goto('/');
  });

  test('Modal sollte geöffnet und geschlossen werden können', async ({ page }) => {
    // Navigiere zur Modal-Story
    await page.getByRole('link', { name: /modal/i, exact: false }).click();
    
    // Warte auf die Story-Ansicht
    await page.waitForSelector('[data-testid="storybook-preview-iframe"]');
    
    // Wechsle zum iFrame
    const iframe = page.frameLocator('[data-testid="storybook-preview-iframe"]');
    
    // Öffne den Modal
    await iframe.getByRole('button', { name: /modal öffnen/i }).click();
    
    // Überprüfe, ob der Modal geöffnet ist
    const modal = iframe.getByRole('dialog');
    await expect(modal).toBeVisible();
    
    // Überprüfe den Titel
    const title = iframe.getByRole('heading', { name: /modal titel/i });
    await expect(title).toBeVisible();
    
    // Schließe den Modal mit dem Schließen-Button
    await iframe.getByRole('button', { name: /close/i }).click();
    
    // Überprüfe, ob der Modal geschlossen ist
    await expect(modal).not.toBeVisible();
    
    // Öffne den Modal erneut
    await iframe.getByRole('button', { name: /modal öffnen/i }).click();
    
    // Schließe den Modal durch Klick auf das Overlay
    await iframe.locator('[data-testid="modal-overlay"]').click({ position: { x: 10, y: 10 } });
    
    // Überprüfe, ob der Modal geschlossen ist
    await expect(modal).not.toBeVisible();
  });

  test('Dialog sollte verschiedene Varianten unterstützen', async ({ page }) => {
    // Navigiere zur Dialog-Story
    await page.getByRole('link', { name: /dialog/i, exact: false }).click();
    
    // Warte auf die Story-Ansicht
    await page.waitForSelector('[data-testid="storybook-preview-iframe"]');
    
    // Wechsle zum iFrame
    const iframe = page.frameLocator('[data-testid="storybook-preview-iframe"]');
    
    // Teste verschiedene Varianten
    const variants = ['info', 'success', 'warning', 'error', 'confirm'];
    
    for (const variant of variants) {
      // Öffne den Dialog mit der entsprechenden Variante
      await iframe.getByRole('button', { name: new RegExp(`${variant}`, 'i') }).click();
      
      // Überprüfe, ob der Dialog geöffnet ist
      const dialog = iframe.getByRole('dialog');
      await expect(dialog).toBeVisible();
      
      // Überprüfe den Titel basierend auf der Variante
      const title = iframe.getByRole('heading', { name: new RegExp(`${variant}`, 'i') });
      await expect(title).toBeVisible();
      
      // Schließe den Dialog mit dem Bestätigen-Button
      await iframe.getByRole('button', { name: /bestätigen/i }).click();
      
      // Überprüfe, ob der Dialog geschlossen ist
      await expect(dialog).not.toBeVisible();
    }
  });

  test('Dialog sollte Tastaturnavigation unterstützen', async ({ page }) => {
    // Navigiere zur Dialog-Story
    await page.getByRole('link', { name: /dialog/i, exact: false }).click();
    
    // Warte auf die Story-Ansicht
    await page.waitForSelector('[data-testid="storybook-preview-iframe"]');
    
    // Wechsle zum iFrame
    const iframe = page.frameLocator('[data-testid="storybook-preview-iframe"]');
    
    // Öffne den Dialog
    await iframe.getByRole('button', { name: /info/i }).click();
    
    // Überprüfe, ob der Dialog geöffnet ist
    const dialog = iframe.getByRole('dialog');
    await expect(dialog).toBeVisible();
    
    // Drücke die Escape-Taste, um den Dialog zu schließen
    await page.keyboard.press('Escape');
    
    // Überprüfe, ob der Dialog geschlossen ist
    await expect(dialog).not.toBeVisible();
    
    // Öffne den Dialog erneut
    await iframe.getByRole('button', { name: /info/i }).click();
    
    // Überprüfe Tab-Navigation
    await page.keyboard.press('Tab'); // Fokus auf Schließen-Button
    await page.keyboard.press('Tab'); // Fokus auf Abbrechen-Button
    await page.keyboard.press('Tab'); // Fokus auf Bestätigen-Button
    
    // Drücke Enter, um den Dialog zu schließen
    await page.keyboard.press('Enter');
    
    // Überprüfe, ob der Dialog geschlossen ist
    await expect(dialog).not.toBeVisible();
  });

  test('Dialog sollte blockierend sein können', async ({ page }) => {
    // Navigiere zur Dialog-Story
    await page.getByRole('link', { name: /dialog/i, exact: false }).click();
    
    // Warte auf die Story-Ansicht
    await page.waitForSelector('[data-testid="storybook-preview-iframe"]');
    
    // Wechsle zum iFrame
    const iframe = page.frameLocator('[data-testid="storybook-preview-iframe"]');
    
    // Öffne den blockierenden Dialog
    await iframe.getByRole('button', { name: /blocking/i }).click();
    
    // Überprüfe, ob der Dialog geöffnet ist
    const dialog = iframe.getByRole('dialog');
    await expect(dialog).toBeVisible();
    
    // Versuche, den Dialog mit Escape zu schließen
    await page.keyboard.press('Escape');
    
    // Überprüfe, ob der Dialog immer noch geöffnet ist
    await expect(dialog).toBeVisible();
    
    // Versuche, den Dialog durch Klick auf das Overlay zu schließen
    await iframe.locator('[data-testid="dialog-overlay"]').click({ position: { x: 10, y: 10 } });
    
    // Überprüfe, ob der Dialog immer noch geöffnet ist
    await expect(dialog).toBeVisible();
    
    // Schließe den Dialog mit dem Bestätigen-Button
    await iframe.getByRole('button', { name: /bestätigen/i }).click();
    
    // Überprüfe, ob der Dialog geschlossen ist
    await expect(dialog).not.toBeVisible();
  });

  test('Modal sollte Fokus-Management korrekt implementieren', async ({ page }) => {
    // Navigiere zur Modal-Story
    await page.getByRole('link', { name: /modal/i, exact: false }).click();
    
    // Warte auf die Story-Ansicht
    await page.waitForSelector('[data-testid="storybook-preview-iframe"]');
    
    // Wechsle zum iFrame
    const iframe = page.frameLocator('[data-testid="storybook-preview-iframe"]');
    
    // Öffne den Modal mit Formular
    await iframe.getByRole('button', { name: /formular/i }).click();
    
    // Überprüfe, ob der Modal geöffnet ist
    const modal = iframe.getByRole('dialog');
    await expect(modal).toBeVisible();
    
    // Überprüfe, ob der erste Input-Feld fokussiert ist
    await expect(iframe.locator('input[name="name"]')).toBeFocused();
    
    // Tab durch alle fokussierbaren Elemente
    await page.keyboard.press('Tab'); // Zum nächsten Feld
    await expect(iframe.locator('input[name="email"]')).toBeFocused();
    
    await page.keyboard.press('Tab'); // Zum Abbrechen-Button
    await expect(iframe.getByRole('button', { name: /abbrechen/i })).toBeFocused();
    
    await page.keyboard.press('Tab'); // Zum Bestätigen-Button
    await expect(iframe.getByRole('button', { name: /senden/i })).toBeFocused();
    
    await page.keyboard.press('Tab'); // Zurück zum ersten Element (Fokus-Falle)
    await expect(iframe.getByRole('button', { name: /close/i })).toBeFocused();
    
    // Schließe den Modal
    await iframe.getByRole('button', { name: /close/i }).click();
    
    // Überprüfe, ob der Modal geschlossen ist
    await expect(modal).not.toBeVisible();
    
    // Überprüfe, ob der Fokus zum Öffnen-Button zurückgekehrt ist
    await expect(iframe.getByRole('button', { name: /formular/i })).toBeFocused();
  });
});