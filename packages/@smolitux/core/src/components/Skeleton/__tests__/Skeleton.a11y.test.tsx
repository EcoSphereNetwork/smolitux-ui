// packages/@smolitux/core/src/components/Skeleton/__tests__/Skeleton.a11y.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Skeleton } from '../';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('Skeleton Accessibility', () => {
  // Test für die Standard-Skeleton-Komponente
  it('should have no accessibility violations with standard Skeleton', async () => {
    const { container } = render(
      <Skeleton 
        aria-label="Lädt Text" 
        width={200}
        height={20}
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  // Test für die A11y-Version der Skeleton-Komponente
  it('should have no accessibility violations with A11y Skeleton', async () => {
    const { container } = render(
      <Skeleton.A11y 
        ariaLabel="Lädt Text" 
        width={200}
        height={20}
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <Skeleton.A11y 
        ariaLabel="Lädt Text"
        description="Bitte warten Sie, während der Text geladen wird"
        id="test-skeleton"
      />
    );
    
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveAttribute('id', 'test-skeleton');
    expect(skeleton).toHaveAttribute('aria-label', 'Lädt Text');
    expect(skeleton).toHaveAttribute('aria-busy', 'true');
    expect(skeleton).toHaveAttribute('aria-live', 'polite');
    expect(skeleton).toHaveAttribute('aria-atomic', 'true');
    expect(skeleton).toHaveAttribute('aria-describedby');
    
    // Überprüfe die Beschreibung
    const description = screen.getByText('Bitte warten Sie, während der Text geladen wird');
    expect(description).toHaveClass('sr-only');
    expect(skeleton.getAttribute('aria-describedby')).toBe(description.id);
    
    // Überprüfe, ob das Screenreader-Label vorhanden ist
    expect(screen.getByText('Lädt Text', { selector: '.sr-only' })).toBeInTheDocument();
  });

  it('should handle different variants correctly', () => {
    const { rerender } = render(
      <Skeleton.A11y 
        variant="text"
        ariaLabel="Lädt Text"
      />
    );
    
    let skeletonItem = screen.getByRole('status').querySelector('div');
    expect(skeletonItem).toHaveClass('rounded');
    
    rerender(
      <Skeleton.A11y 
        variant="circular"
        ariaLabel="Lädt Avatar"
      />
    );
    
    skeletonItem = screen.getByRole('status').querySelector('div');
    expect(skeletonItem).toHaveClass('rounded-full');
  });

  it('should handle different animations correctly', () => {
    const { rerender } = render(
      <Skeleton.A11y 
        animation="pulse"
        ariaLabel="Lädt Text"
      />
    );
    
    let skeletonItem = screen.getByRole('status').querySelector('div');
    expect(skeletonItem).toHaveClass('animate-pulse');
    
    rerender(
      <Skeleton.A11y 
        animation="wave"
        ariaLabel="Lädt Text"
      />
    );
    
    skeletonItem = screen.getByRole('status').querySelector('div');
    expect(skeletonItem).toHaveClass('animate-skeleton-wave');
    
    rerender(
      <Skeleton.A11y 
        animation="none"
        ariaLabel="Lädt Text"
      />
    );
    
    skeletonItem = screen.getByRole('status').querySelector('div');
    expect(skeletonItem).not.toHaveClass('animate-pulse');
    expect(skeletonItem).not.toHaveClass('animate-skeleton-wave');
  });

  it('should handle multiple items correctly', () => {
    render(
      <Skeleton.A11y 
        count={3}
        gap={10}
        ariaLabel="Lädt Liste"
      />
    );
    
    const skeletonItems = screen.getByRole('status').querySelectorAll('div[aria-hidden="true"]');
    expect(skeletonItems).toHaveLength(3);
    
    // Überprüfe, ob die Abstände korrekt gesetzt sind
    expect(skeletonItems[1]).toHaveStyle({ marginTop: '10px' });
    expect(skeletonItems[2]).toHaveStyle({ marginTop: '10px' });
  });

  it('should handle loaded state correctly', () => {
    const { rerender } = render(
      <Skeleton.A11y 
        isLoaded={false}
        ariaLabel="Lädt Text"
      >
        <p>Geladener Inhalt</p>
      </Skeleton.A11y>
    );
    
    // Im Ladezustand sollte der Skeleton angezeigt werden
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByText('Geladener Inhalt')).not.toBeInTheDocument();
    
    // Im geladenen Zustand sollte der Inhalt angezeigt werden
    rerender(
      <Skeleton.A11y 
        isLoaded={true}
        ariaLabel="Lädt Text"
      >
        <p>Geladener Inhalt</p>
      </Skeleton.A11y>
    );
    
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByText('Geladener Inhalt')).toBeInTheDocument();
  });

  it('should handle hideWhenLoaded correctly', () => {
    const { rerender } = render(
      <Skeleton.A11y 
        isLoaded={true}
        hideWhenLoaded={false}
        ariaLabel="Lädt Text"
      >
        <p>Geladener Inhalt</p>
      </Skeleton.A11y>
    );
    
    // Wenn hideWhenLoaded=false, sollte der Inhalt angezeigt werden
    expect(screen.getByText('Geladener Inhalt')).toBeInTheDocument();
    
    // Wenn hideWhenLoaded=true, sollte der Skeleton ausgeblendet werden
    rerender(
      <Skeleton.A11y 
        isLoaded={true}
        hideWhenLoaded={true}
        ariaLabel="Lädt Text"
      />
    );
    
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('should handle different live region politeness correctly', () => {
    const { rerender } = render(
      <Skeleton.A11y 
        liveRegionPoliteness="assertive"
        ariaLabel="Lädt Text"
      />
    );
    
    let skeleton = screen.getByRole('status');
    expect(skeleton).toHaveAttribute('aria-live', 'assertive');
    
    rerender(
      <Skeleton.A11y 
        liveRegionPoliteness="off"
        ariaLabel="Lädt Text"
      />
    );
    
    skeleton = screen.getByRole('status');
    expect(skeleton).toHaveAttribute('aria-live', 'off');
  });

  it('should handle aria-relevant correctly', () => {
    render(
      <Skeleton.A11y 
        relevant="additions"
        ariaLabel="Lädt Text"
      />
    );
    
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveAttribute('aria-relevant', 'additions');
  });

  it('should handle non-busy state correctly', () => {
    render(
      <Skeleton.A11y 
        busy={false}
        ariaLabel="Lädt Text"
      />
    );
    
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveAttribute('aria-busy', 'false');
  });
});