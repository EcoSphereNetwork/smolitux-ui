import React from 'react';
import { render, screen } from '@testing-library/react';
import { LanguageSwitcher } from './LanguageSwitcher';

describe('LanguageSwitcher', () => {
  it('renders without crashing', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByRole('button', { name: /LanguageSwitcher/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<LanguageSwitcher className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<LanguageSwitcher ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
