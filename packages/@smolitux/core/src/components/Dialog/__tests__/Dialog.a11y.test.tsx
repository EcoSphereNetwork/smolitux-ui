import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

import { Dialog } from '../';

expect.extend(toHaveNoViolations);

describe('Dialog Accessibility', () => {
  beforeEach(() => {
    global.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  it('sets accessible label and description', () => {
    render(
      <Dialog.A11y
        isOpen={true}
        onClose={() => {}}
        title="Dialog"
        accessibleLabel="Accessible Dialog"
        accessibleDescription="Desc"
      >
        <p>Content</p>
      </Dialog.A11y>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-label', 'Accessible Dialog');
    const desc = screen.getByText('Desc');
    expect(desc).toHaveClass('sr-only');
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <Dialog isOpen={true} onClose={() => {}} title="Title">
        <p>Content</p>
      </Dialog>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
