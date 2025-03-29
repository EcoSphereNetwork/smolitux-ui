import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Textarea from '../Textarea';

// Erweitere Jest-Matcher um Barrierefreiheitsprüfungen
expect.extend(toHaveNoViolations);

describe('Textarea Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <Textarea 
        label="Beschreibung" 
        placeholder="Geben Sie eine Beschreibung ein"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with error state', async () => {
    const { container } = render(
      <Textarea 
        label="Beschreibung" 
        error="Dieses Feld ist erforderlich"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with helper text', async () => {
    const { container } = render(
      <Textarea 
        label="Beschreibung" 
        helperText="Maximal 500 Zeichen"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations in disabled state', async () => {
    const { container } = render(
      <Textarea 
        label="Beschreibung" 
        disabled
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations in read-only state', async () => {
    const { container } = render(
      <Textarea 
        label="Beschreibung" 
        readOnly
        defaultValue="Dies ist ein Beispieltext, der nicht geändert werden kann."
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with required attribute', async () => {
    const { container } = render(
      <Textarea 
        label="Beschreibung" 
        required
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with different sizes', async () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    
    for (const size of sizes) {
      const { container } = render(
        <Textarea 
          label={`Größe ${size}`} 
          size={size}
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should not have accessibility violations with full width', async () => {
    const { container } = render(
      <Textarea 
        label="Beschreibung" 
        fullWidth
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with custom rows', async () => {
    const { container } = render(
      <Textarea 
        label="Beschreibung" 
        rows={10}
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with resize options', async () => {
    const resizeOptions = ['none', 'both', 'horizontal', 'vertical'] as const;
    
    for (const resize of resizeOptions) {
      const { container } = render(
        <Textarea 
          label={`Resize ${resize}`} 
          resize={resize}
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should not have accessibility violations with maxLength', async () => {
    const { container } = render(
      <Textarea 
        label="Beschreibung" 
        maxLength={500}
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with character counter', async () => {
    const { container } = render(
      <Textarea 
        label="Beschreibung" 
        maxLength={500}
        showCharacterCount
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with custom className', async () => {
    const { container } = render(
      <Textarea 
        label="Beschreibung" 
        className="custom-textarea"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with custom styles', async () => {
    const { container } = render(
      <Textarea 
        label="Beschreibung" 
        style={{ backgroundColor: '#f0f0f0' }}
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});