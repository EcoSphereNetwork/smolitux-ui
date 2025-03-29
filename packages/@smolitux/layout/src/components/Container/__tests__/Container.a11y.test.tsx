import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Container } from '../Container';

// Erweitere Jest-Matcher um Barrierefreiheitsprüfungen
expect.extend(toHaveNoViolations);

describe('Container Accessibility', () => {
  test('should not have accessibility violations', async () => {
    const { container } = render(
      <Container>
        <h1>Überschrift</h1>
        <p>Beispielinhalt für den Container</p>
      </Container>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should not have accessibility violations with nested interactive elements', async () => {
    const { container } = render(
      <Container>
        <h1>Formular</h1>
        <form>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" />
          <button type="submit">Absenden</button>
        </form>
      </Container>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should maintain accessibility when used as a layout container', async () => {
    const { container } = render(
      <Container>
        <div role="main">
          <h1>Hauptinhalt</h1>
          <p>Dieser Bereich enthält den Hauptinhalt der Seite.</p>
        </div>
        <div role="complementary">
          <h2>Zusätzliche Informationen</h2>
          <p>Dieser Bereich enthält ergänzende Informationen.</p>
        </div>
      </Container>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});