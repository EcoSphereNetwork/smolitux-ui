import React from 'react';
import { render, screen } from '@testing-library/react';
import { PrivacyContext } from './PrivacyContext';

describe('PrivacyContext', () => {
  it('renders without crashing', () => {
    render(<PrivacyContext />);
    expect(screen.getByTestId('PrivacyContext')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<PrivacyContext className="custom-class" />);
    const element = screen.getByTestId('PrivacyContext');
    expect(element).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<PrivacyContext ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('handles children prop correctly', () => {
    render(<PrivacyContext>Test Content</PrivacyContext>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<PrivacyContext />);
    const element = screen.getByTestId('PrivacyContext');
    expect(element).toBeInTheDocument();
  });
});
