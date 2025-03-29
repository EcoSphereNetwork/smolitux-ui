import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { FormControlA11y } from '../FormControl.a11y';

// Erweitere Jest-Matcher um axe-Prüfungen
expect.extend(toHaveNoViolations);

describe('FormControl Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <FormControlA11y label="Name" helperText="Bitte geben Sie Ihren vollständigen Namen ein">
        <input type="text" />
      </FormControlA11y>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <FormControlA11y 
        label="Email" 
        helperText="Ihre geschäftliche Email-Adresse"
        id="test-email"
      >
        <input type="email" id="test-email" />
      </FormControlA11y>
    );
    
    const label = screen.getByText('Email');
    expect(label).toHaveAttribute('for', 'test-email');
    expect(label).toHaveAttribute('id');
    
    const helperText = screen.getByText('Ihre geschäftliche Email-Adresse');
    expect(helperText).toHaveAttribute('id');
    
    // Überprüfe, ob die FormControl-Komponente die richtigen ARIA-Attribute hat
    const formControl = helperText.parentElement?.parentElement;
    expect(formControl).toHaveAttribute('aria-describedby', helperText.id);
  });

  it('should handle error states correctly', () => {
    render(
      <FormControlA11y 
        label="Email" 
        error="Ungültige Email-Adresse"
        id="test-email"
      >
        <input type="email" id="test-email" />
      </FormControlA11y>
    );
    
    const errorMessage = screen.getByText('Ungültige Email-Adresse');
    expect(errorMessage).toHaveAttribute('role', 'alert');
    expect(errorMessage).toHaveAttribute('id');
    
    // Überprüfe, ob die FormControl-Komponente die richtigen ARIA-Attribute hat
    const formControl = errorMessage.parentElement?.parentElement;
    expect(formControl).toHaveAttribute('aria-describedby', errorMessage.id);
  });

  it('should handle success states correctly', () => {
    render(
      <FormControlA11y 
        label="Email" 
        successMessage="Email-Adresse ist verfügbar"
        isSuccess
        id="test-email"
      >
        <input type="email" id="test-email" />
      </FormControlA11y>
    );
    
    const successMessage = screen.getByText('Email-Adresse ist verfügbar');
    expect(successMessage).toHaveAttribute('role', 'status');
    expect(successMessage).toHaveAttribute('id');
    
    // Überprüfe, ob die FormControl-Komponente die richtigen ARIA-Attribute hat
    const formControl = successMessage.parentElement?.parentElement;
    expect(formControl).toHaveAttribute('aria-describedby', successMessage.id);
  });

  it('should handle required state correctly', () => {
    render(
      <FormControlA11y 
        label="Name" 
        required
        showRequiredIndicator
        id="test-name"
      >
        <input type="text" id="test-name" required />
      </FormControlA11y>
    );
    
    // Überprüfe, ob das Sternchen angezeigt wird
    expect(screen.getByText('*', { selector: 'span[aria-hidden="true"]' })).toBeInTheDocument();
    
    // Überprüfe, ob die Screenreader-Information vorhanden ist
    expect(screen.getByText('(Erforderlich)', { selector: '.sr-only' })).toBeInTheDocument();
  });

  it('should handle tooltip correctly', () => {
    render(
      <FormControlA11y 
        label="Name" 
        tooltip="Bitte geben Sie Ihren vollständigen Namen ein"
        id="test-name"
      >
        <input type="text" id="test-name" />
      </FormControlA11y>
    );
    
    // Überprüfe, ob der Tooltip vorhanden ist
    const tooltipIcon = screen.getByLabelText('Tooltip: Bitte geben Sie Ihren vollständigen Namen ein');
    expect(tooltipIcon).toBeInTheDocument();
    expect(tooltipIcon).toHaveAttribute('title', 'Bitte geben Sie Ihren vollständigen Namen ein');
  });

  it('should handle hidden label correctly', () => {
    render(
      <FormControlA11y 
        label="Name" 
        hideLabel
        id="test-name"
      >
        <input type="text" id="test-name" />
      </FormControlA11y>
    );
    
    const label = screen.getByText('Name');
    expect(label).toHaveClass('sr-only');
  });

  it('should handle counter correctly', () => {
    render(
      <FormControlA11y 
        label="Beschreibung" 
        showCounter
        counterValue={10}
        counterMax={100}
        id="test-description"
      >
        <textarea id="test-description"></textarea>
      </FormControlA11y>
    );
    
    const counter = screen.getByText('10/100', { selector: 'span[aria-hidden="true"]' });
    expect(counter).toBeInTheDocument();
    
    // Überprüfe, ob die Screenreader-Information vorhanden ist
    expect(screen.getByText('10 von maximal 100 Zeichen eingegeben (10%)', { selector: '.sr-only' })).toBeInTheDocument();
  });

  it('should handle progress bar correctly', () => {
    render(
      <FormControlA11y 
        label="Upload" 
        showProgressBar
        progressValue={50}
        progressMax={100}
        id="test-upload"
      >
        <input type="file" id="test-upload" />
      </FormControlA11y>
    );
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    
    // Überprüfe, ob die Screenreader-Information vorhanden ist
    expect(screen.getByText('Fortschritt: 50%', { selector: '.sr-only' })).toBeInTheDocument();
  });

  it('should handle loading state correctly', () => {
    render(
      <FormControlA11y 
        label="Name" 
        isLoading
        showLoadingIndicator
        id="test-name"
      >
        <input type="text" id="test-name" />
      </FormControlA11y>
    );
    
    // Überprüfe, ob der Ladeindikator angezeigt wird
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
    
    // Überprüfe, ob die Screenreader-Information vorhanden ist
    expect(screen.getByText('Lädt...', { selector: '.sr-only' })).toBeInTheDocument();
  });

  it('should handle description correctly', () => {
    render(
      <FormControlA11y 
        label="Name" 
        description="Dieses Feld ist für Ihren vollständigen Namen vorgesehen"
        id="test-name"
      >
        <input type="text" id="test-name" />
      </FormControlA11y>
    );
    
    // Überprüfe, ob die Beschreibung vorhanden ist
    const description = screen.getByText('Dieses Feld ist für Ihren vollständigen Namen vorgesehen');
    expect(description).toHaveClass('sr-only');
    
    // Überprüfe, ob die FormControl-Komponente die richtigen ARIA-Attribute hat
    const formControl = description.parentElement?.parentElement;
    expect(formControl).toHaveAttribute('aria-describedby', description.id);
  });
});