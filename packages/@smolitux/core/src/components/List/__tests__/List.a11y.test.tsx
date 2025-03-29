// packages/@smolitux/core/src/components/List/__tests__/List.a11y.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ListA11y, ListItemA11y, ListItemTextA11y, ListItemIconA11y, ListItemActionA11y } from '../List.a11y';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('List Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <ListA11y ariaLabel="Meine Liste">
        <ListItemA11y primary="Item 1" />
        <ListItemA11y primary="Item 2" />
        <ListItemA11y primary="Item 3" />
      </ListA11y>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <ListA11y 
        ariaLabel="Meine Liste" 
        description="Eine Liste mit Beispieleinträgen"
        id="test-list"
      >
        <ListItemA11y primary="Item 1" />
        <ListItemA11y primary="Item 2" />
        <ListItemA11y primary="Item 3" />
      </ListA11y>
    );
    
    const list = screen.getByRole('list');
    expect(list).toHaveAttribute('id', 'test-list');
    expect(list).toHaveAttribute('aria-label', 'Meine Liste');
    expect(list).toHaveAttribute('aria-describedby');
    
    const description = screen.getByText('Eine Liste mit Beispieleinträgen');
    expect(description).toHaveClass('sr-only');
    expect(description.id).toBe(list.getAttribute('aria-describedby'));
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
    
    // Überprüfe das erste ListItem
    expect(listItems[0]).toHaveAttribute('tabIndex', '-1');
  });

  it('should handle keyboard navigation correctly', () => {
    render(
      <ListA11y ariaLabel="Meine Liste">
        <ListItemA11y primary="Item 1" />
        <ListItemA11y primary="Item 2" />
        <ListItemA11y primary="Item 3" />
      </ListA11y>
    );
    
    const list = screen.getByRole('list');
    const listItems = screen.getAllByRole('listitem');
    
    // Fokussiere die Liste
    fireEvent.focus(list);
    
    // Drücke Pfeil nach unten, um das erste Element zu aktivieren
    fireEvent.keyDown(list, { key: 'ArrowDown' });
    expect(listItems[0]).toHaveAttribute('tabIndex', '0');
    
    // Drücke Pfeil nach unten, um zum nächsten Element zu navigieren
    fireEvent.keyDown(list, { key: 'ArrowDown' });
    expect(listItems[1]).toHaveAttribute('tabIndex', '0');
    
    // Drücke Home, um zum ersten Element zu navigieren
    fireEvent.keyDown(list, { key: 'Home' });
    expect(listItems[0]).toHaveAttribute('tabIndex', '0');
    
    // Drücke End, um zum letzten Element zu navigieren
    fireEvent.keyDown(list, { key: 'End' });
    expect(listItems[2]).toHaveAttribute('tabIndex', '0');
  });

  it('should handle horizontal list correctly', () => {
    render(
      <ListA11y ariaLabel="Meine Liste" horizontal>
        <ListItemA11y primary="Item 1" />
        <ListItemA11y primary="Item 2" />
        <ListItemA11y primary="Item 3" />
      </ListA11y>
    );
    
    const list = screen.getByRole('list');
    expect(list).toHaveClass('smolitux-list--horizontal');
    
    const listItems = screen.getAllByRole('listitem');
    
    // Fokussiere die Liste
    fireEvent.focus(list);
    
    // Drücke Pfeil nach rechts, um das erste Element zu aktivieren
    fireEvent.keyDown(list, { key: 'ArrowRight' });
    expect(listItems[0]).toHaveAttribute('tabIndex', '0');
    
    // Drücke Pfeil nach rechts, um zum nächsten Element zu navigieren
    fireEvent.keyDown(list, { key: 'ArrowRight' });
    expect(listItems[1]).toHaveAttribute('tabIndex', '0');
    
    // Drücke Pfeil nach links, um zum vorherigen Element zu navigieren
    fireEvent.keyDown(list, { key: 'ArrowLeft' });
    expect(listItems[0]).toHaveAttribute('tabIndex', '0');
  });

  it('should handle selectable items correctly', () => {
    const handleSelectItem = jest.fn();
    render(
      <ListA11y 
        ariaLabel="Meine Liste" 
        selectable 
        onSelectItem={handleSelectItem}
      >
        <ListItemA11y id="item1" primary="Item 1" />
        <ListItemA11y id="item2" primary="Item 2" />
        <ListItemA11y id="item3" primary="Item 3" />
      </ListA11y>
    );
    
    const listItems = screen.getAllByRole('listitem');
    
    // Klicke auf ein Item
    fireEvent.click(listItems[1]);
    
    // Überprüfe, ob der onSelectItem-Handler aufgerufen wurde
    expect(handleSelectItem).toHaveBeenCalledWith('item2');
    
    // Überprüfe, ob das Item als ausgewählt markiert ist
    expect(listItems[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('should handle disabled items correctly', () => {
    render(
      <ListA11y ariaLabel="Meine Liste">
        <ListItemA11y primary="Item 1" />
        <ListItemA11y primary="Item 2" disabled />
        <ListItemA11y primary="Item 3" />
      </ListA11y>
    );
    
    const listItems = screen.getAllByRole('listitem');
    
    // Überprüfe, ob das deaktivierte Item die richtigen ARIA-Attribute hat
    expect(listItems[1]).toHaveAttribute('aria-disabled', 'true');
  });

  it('should handle item description correctly', () => {
    render(
      <ListA11y ariaLabel="Meine Liste">
        <ListItemA11y 
          primary="Item 1" 
          description="Beschreibung für Item 1"
        />
        <ListItemA11y primary="Item 2" />
        <ListItemA11y primary="Item 3" />
      </ListA11y>
    );
    
    const listItem = screen.getByText('Item 1').closest('[role="listitem"]');
    expect(listItem).toHaveAttribute('aria-describedby');
    
    const description = screen.getByText('Beschreibung für Item 1');
    expect(description).toHaveClass('sr-only');
    expect(description.id).toBe(listItem?.getAttribute('aria-describedby'));
  });

  it('should handle ListItemText correctly', () => {
    render(
      <ListA11y ariaLabel="Meine Liste">
        <ListItemA11y>
          <ListItemTextA11y primary="Titel" secondary="Beschreibung" />
        </ListItemA11y>
      </ListA11y>
    );
    
    expect(screen.getByText('Titel')).toBeInTheDocument();
    expect(screen.getByText('Beschreibung')).toBeInTheDocument();
  });

  it('should handle ListItemIcon correctly', () => {
    render(
      <ListA11y ariaLabel="Meine Liste">
        <ListItemA11y>
          <ListItemIconA11y ariaLabel="Benutzer-Icon">
            <svg data-testid="icon"></svg>
          </ListItemIconA11y>
          <ListItemTextA11y primary="Benutzer" />
        </ListItemA11y>
      </ListA11y>
    );
    
    const icon = screen.getByTestId('icon').parentElement;
    expect(icon).toHaveAttribute('aria-label', 'Benutzer-Icon');
    expect(icon).toHaveAttribute('role', 'img');
  });

  it('should handle ListItemAction correctly', () => {
    render(
      <ListA11y ariaLabel="Meine Liste">
        <ListItemA11y>
          <ListItemTextA11y primary="Eintrag" />
          <ListItemActionA11y ariaLabel="Aktionen">
            <button>Bearbeiten</button>
          </ListItemActionA11y>
        </ListItemA11y>
      </ListA11y>
    );
    
    const action = screen.getByText('Bearbeiten').parentElement;
    expect(action).toHaveAttribute('aria-label', 'Aktionen');
    expect(action).toHaveAttribute('role', 'group');
  });

  it('should handle description list correctly', () => {
    render(
      <ListA11y ariaLabel="Beschreibungsliste" variant="description">
        <ListItemA11y primary="Begriff 1" secondary="Beschreibung 1" />
        <ListItemA11y primary="Begriff 2" secondary="Beschreibung 2" />
      </ListA11y>
    );
    
    const list = screen.getByRole('list');
    expect(list).toHaveClass('smolitux-list--description');
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    
    expect(screen.getByText('Begriff 1')).toHaveClass('smolitux-list-item-term');
    expect(screen.getByText('Beschreibung 1')).toHaveClass('smolitux-list-item-description');
  });
});