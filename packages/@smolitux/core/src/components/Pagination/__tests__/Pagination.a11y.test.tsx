// packages/@smolitux/core/src/components/Pagination/__tests__/Pagination.a11y.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { PaginationA11y } from '../Pagination.a11y';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('Pagination Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const handleChange = jest.fn();
    const { container } = render(
      <PaginationA11y
        pageCount={10}
        currentPage={1}
        onChange={handleChange}
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    const handleChange = jest.fn();
    render(
      <PaginationA11y
        pageCount={10}
        currentPage={3}
        onChange={handleChange}
        description="Navigieren Sie durch die Ergebnisse"
        id="test-pagination"
      />
    );
    
    // Überprüfe die Pagination-Komponente
    const pagination = screen.getByRole('navigation');
    expect(pagination).toHaveAttribute('aria-label', 'Seitennavigation');
    expect(pagination).toHaveAttribute('aria-controls');
    
    // Überprüfe die Beschreibung
    const description = screen.getByText('Navigieren Sie durch die Ergebnisse');
    expect(description).toHaveClass('sr-only');
    
    // Überprüfe die Seitennummern
    const pageButtons = screen.getAllByRole('button');
    const currentPageButton = pageButtons.find(button => button.getAttribute('aria-current') === 'page');
    expect(currentPageButton).toBeInTheDocument();
    expect(currentPageButton).toHaveAttribute('aria-label', 'Seite 3 von 10');
    
    // Überprüfe die Navigation-Buttons
    const prevButton = screen.getByTitle('Zurück');
    expect(prevButton).toHaveAttribute('aria-label', 'Zurück');
    expect(prevButton).toHaveAttribute('aria-disabled', 'false');
    
    const nextButton = screen.getByTitle('Weiter');
    expect(nextButton).toHaveAttribute('aria-label', 'Weiter');
    expect(nextButton).toHaveAttribute('aria-disabled', 'false');
  });

  it('should handle keyboard navigation correctly', () => {
    const handleChange = jest.fn();
    render(
      <PaginationA11y
        pageCount={10}
        currentPage={3}
        onChange={handleChange}
      />
    );
    
    // Finde die Seitennummern-Buttons
    const pageButtons = screen.getAllByRole('button');
    const page4Button = pageButtons.find(button => button.textContent === '4');
    
    // Fokussiere den Button und drücke Enter
    fireEvent.focus(page4Button!);
    fireEvent.keyDown(page4Button!, { key: 'Enter' });
    
    // Überprüfe, ob der onChange-Handler aufgerufen wurde
    expect(handleChange).toHaveBeenCalledWith(4);
    
    // Teste auch die Leertaste
    fireEvent.keyDown(page4Button!, { key: ' ' });
    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it('should handle disabled state correctly', () => {
    const handleChange = jest.fn();
    render(
      <PaginationA11y
        pageCount={10}
        currentPage={1}
        onChange={handleChange}
        disabled
      />
    );
    
    // Überprüfe, ob alle Buttons deaktiviert sind
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
    
    // Versuche, einen Button zu klicken
    fireEvent.click(buttons[2]); // Seite 2
    
    // Der onChange-Handler sollte nicht aufgerufen werden
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should handle first/last page navigation correctly', () => {
    const handleChange = jest.fn();
    render(
      <PaginationA11y
        pageCount={10}
        currentPage={5}
        onChange={handleChange}
        showFirstLast
      />
    );
    
    // Finde die erste/letzte Seite Buttons
    const firstButton = screen.getByTitle('Erste');
    const lastButton = screen.getByTitle('Letzte');
    
    // Klicke auf den ersten Seite Button
    fireEvent.click(firstButton);
    expect(handleChange).toHaveBeenCalledWith(1);
    
    // Klicke auf den letzten Seite Button
    fireEvent.click(lastButton);
    expect(handleChange).toHaveBeenCalledWith(10);
  });

  it('should handle prev/next navigation correctly', () => {
    const handleChange = jest.fn();
    render(
      <PaginationA11y
        pageCount={10}
        currentPage={5}
        onChange={handleChange}
        showPrevNext
      />
    );
    
    // Finde die vorherige/nächste Seite Buttons
    const prevButton = screen.getByTitle('Zurück');
    const nextButton = screen.getByTitle('Weiter');
    
    // Klicke auf den vorherigen Seite Button
    fireEvent.click(prevButton);
    expect(handleChange).toHaveBeenCalledWith(4);
    
    // Klicke auf den nächsten Seite Button
    fireEvent.click(nextButton);
    expect(handleChange).toHaveBeenCalledWith(6);
  });

  it('should disable prev button on first page', () => {
    const handleChange = jest.fn();
    render(
      <PaginationA11y
        pageCount={10}
        currentPage={1}
        onChange={handleChange}
      />
    );
    
    // Finde die vorherige Seite Button
    const prevButton = screen.getByTitle('Zurück');
    
    // Überprüfe, ob der Button deaktiviert ist
    expect(prevButton).toHaveAttribute('aria-disabled', 'true');
    expect(prevButton).toBeDisabled();
    
    // Versuche, den Button zu klicken
    fireEvent.click(prevButton);
    
    // Der onChange-Handler sollte nicht aufgerufen werden
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should disable next button on last page', () => {
    const handleChange = jest.fn();
    render(
      <PaginationA11y
        pageCount={10}
        currentPage={10}
        onChange={handleChange}
      />
    );
    
    // Finde die nächste Seite Button
    const nextButton = screen.getByTitle('Weiter');
    
    // Überprüfe, ob der Button deaktiviert ist
    expect(nextButton).toHaveAttribute('aria-disabled', 'true');
    expect(nextButton).toBeDisabled();
    
    // Versuche, den Button zu klicken
    fireEvent.click(nextButton);
    
    // Der onChange-Handler sollte nicht aufgerufen werden
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should handle ellipsis correctly', () => {
    const handleChange = jest.fn();
    render(
      <PaginationA11y
        pageCount={20}
        currentPage={10}
        onChange={handleChange}
        siblingCount={1}
      />
    );
    
    // Überprüfe, ob die Ellipsen vorhanden sind
    const ellipses = screen.getAllByText('…', { selector: 'span[aria-hidden="true"]' });
    expect(ellipses).toHaveLength(2);
    
    // Überprüfe, ob die Screenreader-Texte vorhanden sind
    const ellipsisTexts = screen.getAllByText('Weitere Seiten', { selector: '.sr-only' });
    expect(ellipsisTexts).toHaveLength(2);
  });

  it('should show page count when enabled', () => {
    const handleChange = jest.fn();
    render(
      <PaginationA11y
        pageCount={10}
        currentPage={5}
        onChange={handleChange}
        showPageCount
      />
    );
    
    // Überprüfe, ob die Seitenzahl angezeigt wird
    const pageCount = screen.getByText('Seite 5 von 10');
    expect(pageCount).toBeInTheDocument();
    expect(pageCount).toHaveAttribute('aria-live', 'polite');
    expect(pageCount).toHaveAttribute('aria-atomic', 'true');
  });

  it('should use custom labels', () => {
    const handleChange = jest.fn();
    render(
      <PaginationA11y
        pageCount={10}
        currentPage={5}
        onChange={handleChange}
        labels={{
          pagination: 'Blättern',
          previous: 'Vorherige',
          next: 'Nächste',
          first: 'Anfang',
          last: 'Ende',
          pageTemplate: 'Blatt {page} von {total}'
        }}
      />
    );
    
    // Überprüfe, ob die benutzerdefinierten Labels verwendet werden
    const navigation = screen.getByRole('navigation');
    expect(navigation).toHaveAttribute('aria-label', 'Blättern');
    
    const prevButton = screen.getByTitle('Vorherige');
    expect(prevButton).toHaveAttribute('aria-label', 'Vorherige');
    
    const nextButton = screen.getByTitle('Nächste');
    expect(nextButton).toHaveAttribute('aria-label', 'Nächste');
    
    const firstButton = screen.getByTitle('Anfang');
    expect(firstButton).toHaveAttribute('aria-label', 'Anfang');
    
    const lastButton = screen.getByTitle('Ende');
    expect(lastButton).toHaveAttribute('aria-label', 'Ende');
    
    // Überprüfe, ob das benutzerdefinierte Seitentemplate verwendet wird
    const pageButtons = screen.getAllByRole('button');
    const page5Button = pageButtons.find(button => button.textContent === '5');
    expect(page5Button).toHaveAttribute('aria-label', 'Blatt 5 von 10');
  });
});