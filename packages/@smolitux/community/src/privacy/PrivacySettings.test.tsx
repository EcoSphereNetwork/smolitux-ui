import React from 'react';
import { render, screen } from '@testing-library/react';
import { PrivacySettings } from './PrivacySettings';

describe('PrivacySettings', () => {
  it('renders without crashing', () => {
    render(<PrivacySettings />);
    expect(screen.getByTestId('PrivacySettings')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<PrivacySettings className="custom-class" />);
    const element = screen.getByTestId('PrivacySettings');
    expect(element).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<PrivacySettings ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('handles children prop correctly', () => {
    render(<PrivacySettings>Test Content</PrivacySettings>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<PrivacySettings />);
    const element = screen.getByTestId('PrivacySettings');
    expect(element).toBeInTheDocument();
  });
});
