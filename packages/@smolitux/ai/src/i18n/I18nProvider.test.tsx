import React from 'react';
import { render, screen } from '@testing-library/react';
import { I18nProvider } from './I18nProvider';

describe('I18nProvider', () => {
  it('renders without crashing', () => {
    render(<I18nProvider />);
    expect(screen.getByRole('button', { name: /I18nProvider/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<I18nProvider className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<I18nProvider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
