import React from 'react';
import { render, screen } from '@testing-library/react';
import { PlatformNotice } from '../PlatformNotice';

describe('PlatformNotice', () => {
  it('does not render when platform is supported', () => {
    render(<PlatformNotice platform={{ name: 'Web', supported: true }} />);
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('shows message for unsupported platform', () => {
    render(
      <PlatformNotice
        platform={{ name: 'LegacyOS', supported: false, message: 'Not supported' }}
      />
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Not supported');
  });
});
