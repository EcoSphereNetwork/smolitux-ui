import { test, expect } from '@playwright/test';

test.describe('Formular-Komponenten', () => {
  test.beforeEach(async ({ page }) => {
    // Navigiere zur Storybook-Seite
    await page.goto('/');
  });

  test('Input sollte Werte korrekt akzeptieren und validieren', async ({ page }) => {
    // Navigiere zur Input-Story
    await page.getByRole('link', { name: /input/i, exact: false }).click();
    
    // Warte auf die Story-Ansicht
    await page.waitForSelector('[data-testid="storybook-preview-iframe"]');
    
    // Wechsle zum iFrame
    const iframe = page.frameLocator('[data-testid="storybook-preview-iframe"]');
    
    // Finde das Input-Feld
    const input = iframe.getByRole('textbox');
    
    // Gib einen Text ein
    await input.fill('Test Input');
    
    // Überprüfe, ob der Wert korrekt gesetzt wurde
    await expect(input).toHaveValue('Test Input');
    
    // Teste Validierung (falls vorhanden)
    const validationInput = iframe.getByLabel(/email/i);
    if (await validationInput.count() > 0) {
      // Gib eine ungültige E-Mail ein
      await validationInput.fill('invalid-email');
      
      // Überprüfe, ob der Fehler angezeigt wird
      const errorMessage = iframe.locator('.error-message');
      await expect(errorMessage).toBeVisible();
      
      // Gib eine gültige E-Mail ein
      await validationInput.fill('test@example.com');
      
      // Überprüfe, ob der Fehler nicht mehr angezeigt wird
      await expect(errorMessage).not.toBeVisible();
    }
  });

  test('Select sollte Optionen korrekt anzeigen und auswählen', async ({ page }) => {
    // Navigiere zur Select-Story
    await page.getByRole('link', { name: /select/i, exact: false }).click();
    
    // Warte auf die Story-Ansicht
    await page.waitForSelector('[data-testid="storybook-preview-iframe"]');
    
    // Wechsle zum iFrame
    const iframe = page.frameLocator('[data-testid="storybook-preview-iframe"]');
    
    // Finde das Select-Element
    const select = iframe.getByRole('combobox');
    
    // Öffne das Select-Dropdown
    await select.click();
    
    // Wähle eine Option aus
    await iframe.getByRole('option', { name: /option 2/i }).click();
    
    // Überprüfe, ob die Option ausgewählt wurde
    await expect(select).toHaveValue('option2');
    
    // Teste Multi-Select (falls vorhanden)
    const multiSelect = iframe.locator('select[multiple]');
    if (await multiSelect.count() > 0) {
      // Öffne das Multi-Select
      await multiSelect.click();
      
      // Wähle mehrere Optionen aus (mit Strg/Cmd gedrückt)
      await iframe.getByRole('option', { name: /option 1/i }).click();
      await page.keyboard.down('Control');
      await iframe.getByRole('option', { name: /option 3/i }).click();
      await page.keyboard.up('Control');
      
      // Überprüfe, ob beide Optionen ausgewählt wurden
      const selectedOptions = await multiSelect.evaluate((select) => {
        return Array.from(select.selectedOptions).map(option => option.value);
      });
      
      expect(selectedOptions).toContain('option1');
      expect(selectedOptions).toContain('option3');
    }
  });

  test('Checkbox sollte korrekt umgeschaltet werden können', async ({ page }) => {
    // Navigiere zur Checkbox-Story
    await page.getByRole('link', { name: /checkbox/i, exact: false }).click();
    
    // Warte auf die Story-Ansicht
    await page.waitForSelector('[data-testid="storybook-preview-iframe"]');
    
    // Wechsle zum iFrame
    const iframe = page.frameLocator('[data-testid="storybook-preview-iframe"]');
    
    // Finde die Checkbox
    const checkbox = iframe.getByRole('checkbox');
    
    // Überprüfe den initialen Zustand
    await expect(checkbox).not.toBeChecked();
    
    // Klicke auf die Checkbox
    await checkbox.click();
    
    // Überprüfe, ob die Checkbox ausgewählt ist
    await expect(checkbox).toBeChecked();
    
    // Klicke erneut auf die Checkbox
    await checkbox.click();
    
    // Überprüfe, ob die Checkbox nicht mehr ausgewählt ist
    await expect(checkbox).not.toBeChecked();
    
    // Teste Tastaturzugriff
    await checkbox.focus();
    await page.keyboard.press('Space');
    
    // Überprüfe, ob die Checkbox ausgewählt ist
    await expect(checkbox).toBeChecked();
  });

  test('Radio sollte korrekt ausgewählt werden können', async ({ page }) => {
    // Navigiere zur Radio-Story
    await page.getByRole('link', { name: /radio/i, exact: false }).click();
    
    // Warte auf die Story-Ansicht
    await page.waitForSelector('[data-testid="storybook-preview-iframe"]');
    
    // Wechsle zum iFrame
    const iframe = page.frameLocator('[data-testid="storybook-preview-iframe"]');
    
    // Finde die Radio-Buttons
    const radioButtons = iframe.getByRole('radio');
    
    // Überprüfe, ob mindestens zwei Radio-Buttons vorhanden sind
    const count = await radioButtons.count();
    expect(count).toBeGreaterThanOrEqual(2);
    
    // Klicke auf den ersten Radio-Button
    await radioButtons.nth(0).click();
    
    // Überprüfe, ob der erste Radio-Button ausgewählt ist
    await expect(radioButtons.nth(0)).toBeChecked();
    
    // Klicke auf den zweiten Radio-Button
    await radioButtons.nth(1).click();
    
    // Überprüfe, ob der zweite Radio-Button ausgewählt ist
    await expect(radioButtons.nth(1)).toBeChecked();
    
    // Überprüfe, ob der erste Radio-Button nicht mehr ausgewählt ist
    await expect(radioButtons.nth(0)).not.toBeChecked();
    
    // Teste Tastaturzugriff
    await radioButtons.nth(0).focus();
    await page.keyboard.press('Space');
    
    // Überprüfe, ob der erste Radio-Button ausgewählt ist
    await expect(radioButtons.nth(0)).toBeChecked();
  });

  test('Formular sollte korrekt validiert und abgesendet werden', async ({ page }) => {
    // Navigiere zur Form-Story
    await page.getByRole('link', { name: /form/i, exact: false }).click();
    
    // Warte auf die Story-Ansicht
    await page.waitForSelector('[data-testid="storybook-preview-iframe"]');
    
    // Wechsle zum iFrame
    const iframe = page.frameLocator('[data-testid="storybook-preview-iframe"]');
    
    // Finde das Formular
    const form = iframe.locator('form');
    
    // Finde die Eingabefelder
    const nameInput = iframe.getByLabel(/name/i);
    const emailInput = iframe.getByLabel(/email/i);
    
    // Versuche, das Formular ohne Eingaben abzusenden
    await iframe.getByRole('button', { name: /submit|senden/i }).click();
    
    // Überprüfe, ob Validierungsfehler angezeigt werden
    const errorMessages = iframe.locator('.error-message');
    await expect(errorMessages).toBeVisible();
    
    // Fülle das Formular korrekt aus
    await nameInput.fill('Test User');
    await emailInput.fill('test@example.com');
    
    // Sende das Formular ab
    await iframe.getByRole('button', { name: /submit|senden/i }).click();
    
    // Überprüfe, ob eine Erfolgsmeldung angezeigt wird
    const successMessage = iframe.locator('.success-message');
    await expect(successMessage).toBeVisible();
  });
});