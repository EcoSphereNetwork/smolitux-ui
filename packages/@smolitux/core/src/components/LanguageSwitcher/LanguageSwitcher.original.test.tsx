import React from 'react';
import { render, screen } from '@testing-library/react';
import { LanguageSwitcher.original } from './LanguageSwitcher.original';

describe('LanguageSwitcher.original', () => {
  it('renders without crashing', () => {
    render(<LanguageSwitcher.original />);
    expect(screen.getByRole('button', { name: /LanguageSwitcher.original/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<LanguageSwitcher.original className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<LanguageSwitcher.original ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
