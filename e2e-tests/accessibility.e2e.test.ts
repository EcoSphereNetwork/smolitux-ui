import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Barrierefreiheit', () => {
  test.beforeEach(async ({ page }) => {
    // Navigiere zur Storybook-Seite
    await page.goto('/');
  });

  test('Storybook-Hauptseite sollte keine Barrierefreiheitsverletzungen haben', async ({ page }) => {
    // Führe Axe-Tests auf der Hauptseite durch
    const results = await new AxeBuilder({ page }).analyze();
    
    // Überprüfe, ob keine Verletzungen vorhanden sind
    expect(results.violations).toEqual([]);
  });

  test('Modal-Komponente sollte barrierefrei sein', async ({ page }) => {
    // Navigiere zur Modal-Story
    await page.getByRole('link', { name: /modal/i, exact: false }).click();
    
    // Warte auf die Story-Ansicht
    await page.waitForSelector('[data-testid="storybook-preview-iframe"]');
    
    // Wechsle zum iFrame
    const frame = page.frameLocator('[data-testid="storybook-preview-iframe"]').first();
    const frameHandle = await frame.elementHandle();
    const contentFrame = await frameHandle?.contentFrame();
    
    if (!contentFrame) {
      throw new Error('Could not access content frame');
    }
    
    // Öffne den Modal
    await contentFrame.click('button:has-text("Modal öffnen")');
    
    // Führe Axe-Tests durch
    const results = await new AxeBuilder({ page: contentFrame }).analyze();
    
    // Überprüfe, ob keine Verletzungen vorhanden sind
    expect(results.violations).toEqual([]);
    
    // Schließe den Modal
    await contentFrame.click('button[aria-label="Close"]');
  });

  test('Dialog-Komponente sollte barrierefrei sein', async ({ page }) => {
    // Navigiere zur Dialog-Story
    await page.getByRole('link', { name: /dialog/i, exact: false }).click();
    
    // Warte auf die Story-Ansicht
    await page.waitForSelector('[data-testid="storybook-preview-iframe"]');
    
    // Wechsle zum iFrame
    const frame = page.frameLocator('[data-testid="storybook-preview-iframe"]').first();
    const frameHandle = await frame.elementHandle();
    const contentFrame = await frameHandle?.contentFrame();
    
    if (!contentFrame) {
      throw new Error('Could not access content frame');
    }
    
    // Öffne den Dialog
    await contentFrame.click('button:has-text("Info")');
    
    // Führe Axe-Tests durch
    const results = await new AxeBuilder({ page: contentFrame }).analyze();
    
    // Überprüfe, ob keine Verletzungen vorhanden sind
    expect(results.violations).toEqual([]);
    
    // Schließe den Dialog
    await contentFrame.click('button:has-text("Bestätigen")');
  });

  test('Formular-Komponenten sollten barrierefrei sein', async ({ page }) => {
    // Navigiere zur Form-Story
    await page.getByRole('link', { name: /form/i, exact: false }).click();
    
    // Warte auf die Story-Ansicht
    await page.waitForSelector('[data-testid="storybook-preview-iframe"]');
    
    // Wechsle zum iFrame
    const frame = page.frameLocator('[data-testid="storybook-preview-iframe"]').first();
    const frameHandle = await frame.elementHandle();
    const contentFrame = await frameHandle?.contentFrame();
    
    if (!contentFrame) {
      throw new Error('Could not access content frame');
    }
    
    // Führe Axe-Tests durch
    const results = await new AxeBuilder({ page: contentFrame }).analyze();
    
    // Überprüfe, ob keine Verletzungen vorhanden sind
    expect(results.violations).toEqual([]);
  });

  test('Tastaturnavigation sollte auf allen Komponenten funktionieren', async ({ page }) => {
    // Navigiere zur Button-Story
    await page.getByRole('link', { name: /button/i, exact: false }).click();
    
    // Warte auf die Story-Ansicht
    await page.waitForSelector('[data-testid="storybook-preview-iframe"]');
    
    // Wechsle zum iFrame
    const iframe = page.frameLocator('[data-testid="storybook-preview-iframe"]');
    
    // Fokussiere den ersten Button mit Tab
    await page.keyboard.press('Tab');
    
    // Überprüfe, ob der Button fokussiert ist
    const focusedElement = await iframe.evaluate(() => {
      const activeElement = document.activeElement;
      return activeElement ? activeElement.tagName.toLowerCase() : null;
    });
    
    expect(focusedElement).toBe('button');
    
    // Drücke Enter, um den Button zu aktivieren
    await page.keyboard.press('Enter');
    
    // Überprüfe, ob der Button aktiviert wurde (z.B. durch eine Klasse oder ein Attribut)
    const isActivated = await iframe.evaluate(() => {
      const activeElement = document.activeElement;
      return activeElement && (
        activeElement.classList.contains('active') || 
        activeElement.getAttribute('data-activated') === 'true'
      );
    });
    
    expect(isActivated).toBeTruthy();
  });

  test('Farbkontrast sollte ausreichend sein', async ({ page }) => {
    // Navigiere zur Typography-Story
    await page.getByRole('link', { name: /typography|text/i, exact: false }).click();
    
    // Warte auf die Story-Ansicht
    await page.waitForSelector('[data-testid="storybook-preview-iframe"]');
    
    // Wechsle zum iFrame
    const frame = page.frameLocator('[data-testid="storybook-preview-iframe"]').first();
    const frameHandle = await frame.elementHandle();
    const contentFrame = await frameHandle?.contentFrame();
    
    if (!contentFrame) {
      throw new Error('Could not access content frame');
    }
    
    // Führe Axe-Tests mit Fokus auf Farbkontrast durch
    const results = await new AxeBuilder({ page: contentFrame })
      .withRules(['color-contrast'])
      .analyze();
    
    // Überprüfe, ob keine Kontrastverletzungen vorhanden sind
    expect(results.violations).toEqual([]);
  });
});