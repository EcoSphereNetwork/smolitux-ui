// packages/@smolitux/core/src/components/Spinner/__tests__/Spinner.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Spinner } from '../Spinner';

describe('Spinner', () => {
  it('renders correctly with default props', () => {
    render(<Spinner />);
    
    // Prüfe, ob der Spinner gerendert wurde
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    
    // Prüfe, ob der Standard-Label für Screenreader vorhanden ist
    const srLabel = screen.getByText('Wird geladen...');
    expect(srLabel).toBeInTheDocument();
    
    // Prüfe, ob die Standard-Klassen angewendet wurden
    expect(spinner).toHaveClass('smolitux-spinner-container');
    expect(spinner.firstChild).toHaveClass('smolitux-spinner');
    expect(spinner.firstChild).toHaveClass('smolitux-spinner--md');
    expect(spinner.firstChild).toHaveClass('smolitux-spinner--border');
    expect(spinner.firstChild).toHaveClass('smolitux-spinner--primary');
  });
  
  it('applies size classes correctly', () => {
    const { rerender } = render(<Spinner size="xs" />);
    expect(screen.getByRole('status').firstChild).toHaveClass('smolitux-spinner--xs');
    
    rerender(<Spinner size="sm" />);
    expect(screen.getByRole('status').firstChild).toHaveClass('smolitux-spinner--sm');
    
    rerender(<Spinner size="md" />);
    expect(screen.getByRole('status').firstChild).toHaveClass('smolitux-spinner--md');
    
    rerender(<Spinner size="lg" />);
    expect(screen.getByRole('status').firstChild).toHaveClass('smolitux-spinner--lg');
    
    rerender(<Spinner size="xl" />);
    expect(screen.getByRole('status').firstChild).toHaveClass('smolitux-spinner--xl');
  });
  
  it('applies variant classes correctly', () => {
    const { rerender } = render(<Spinner variant="border" />);
    expect(screen.getByRole('status').firstChild).toHaveClass('smolitux-spinner--border');
    
    rerender(<Spinner variant="grow" />);
    expect(screen.getByRole('status').firstChild).toHaveClass('smolitux-spinner--grow');
    
    rerender(<Spinner variant="dots" />);
    expect(screen.getByRole('status').firstChild).toHaveClass('smolitux-spinner--dots');
    
    rerender(<Spinner variant="ring" />);
    expect(screen.getByRole('status').firstChild).toHaveClass('smolitux-spinner--ring');
  });
  
  it('applies color classes correctly', () => {
    const { rerender } = render(<Spinner color="primary" />);
    expect(screen.getByRole('status').firstChild).toHaveClass('smolitux-spinner--primary');
    
    rerender(<Spinner color="secondary" />);
    expect(screen.getByRole('status').firstChild).toHaveClass('smolitux-spinner--secondary');
    
    rerender(<Spinner color="success" />);
    expect(screen.getByRole('status').firstChild).toHaveClass('smolitux-spinner--success');
    
    rerender(<Spinner color="danger" />);
    expect(screen.getByRole('status').firstChild).toHaveClass('smolitux-spinner--danger');
  });
  
  it('renders with custom label', () => {
    render(<Spinner label="Daten werden geladen..." />);
    const srLabel = screen.getByText('Daten werden geladen...');
    expect(srLabel).toBeInTheDocument();
  });
  
  it('renders with text', () => {
    render(<Spinner text="Bitte warten..." />);
    const text = screen.getByText('Bitte warten...');
    expect(text).toBeInTheDocument();
    expect(text).toHaveClass('smolitux-spinner-text');
  });
  
  it('applies centered class when centered prop is true', () => {
    render(<Spinner centered />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('smolitux-spinner-container--centered');
  });
  
  it('applies fullWidth class when fullWidth prop is true', () => {
    render(<Spinner fullWidth />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('smolitux-spinner-container--full-width');
  });
  
  it('applies custom className', () => {
    render(<Spinner className="custom-class" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('custom-class');
  });
  
  it('forwards ref to the container element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Spinner ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass('smolitux-spinner-container');
  });
  
  it('renders dots variant with correct structure', () => {
    render(<Spinner variant="dots" />);
    const spinner = screen.getByRole('status').firstChild as HTMLElement;
    expect(spinner).toHaveClass('smolitux-spinner--dots');
    expect(spinner.childNodes.length).toBe(3);
    expect(spinner.firstChild).toHaveClass('smolitux-spinner-dot');
  });
  
  it('renders ring variant with correct structure', () => {
    render(<Spinner variant="ring" />);
    const spinner = screen.getByRole('status').firstChild as HTMLElement;
    expect(spinner).toHaveClass('smolitux-spinner--ring');
    expect(spinner.firstChild).toHaveClass('smolitux-spinner-ring');
  });
});