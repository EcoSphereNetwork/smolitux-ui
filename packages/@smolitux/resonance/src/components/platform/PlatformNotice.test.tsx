import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { PlatformNotice } from './PlatformNotice';
import { PlatformInfo } from '../../platform/types';

expect.extend(toHaveNoViolations);

const unsupported: PlatformInfo = {
  name: 'Unknown',
  supported: false,
  message: 'Unsupported platform',
};

const supported: PlatformInfo = {
  name: 'Eco',
  supported: true,
};

describe('PlatformNotice', () => {
  it('renders message when platform not supported', () => {
    render(<PlatformNotice platform={unsupported} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Unsupported platform');
  });

  it('renders nothing when platform supported', () => {
    const { container } = render(<PlatformNotice platform={supported} />);
    expect(container.firstChild).toBeNull();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<PlatformNotice platform={unsupported} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
