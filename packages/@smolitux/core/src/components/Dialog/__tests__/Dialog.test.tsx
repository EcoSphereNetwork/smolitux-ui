import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));
import { Dialog } from '../Dialog';
import { Button } from '../../Button/Button';

describe('Dialog', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock IntersectionObserver
    global.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  it('renders when open', () => {
    render(
      <Dialog isOpen={true} onClose={onClose} title="Hello">
        Content
      </Dialog>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('calls onClose via cancel button', async () => {
    render(
      <Dialog isOpen={true} onClose={onClose} title="X">
        Content
      </Dialog>
    );
    await userEvent.click(screen.getByRole('button', { name: /abbrechen/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when overlay clicked', () => {
    render(
      <Dialog isOpen={true} onClose={onClose} title="X">
        Content
      </Dialog>
    );
    fireEvent.click(screen.getByTestId('dialog-overlay'));
    expect(onClose).toHaveBeenCalled();
  });

  it('returns focus to trigger on close', async () => {
    const Test = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>open</Button>
          <Dialog isOpen={open} onClose={() => setOpen(false)} title="t">
            Content
          </Dialog>
        </>
      );
    };
    render(<Test />);
    const button = screen.getByRole('button', { name: 'open' });
    await userEvent.click(button);
    await userEvent.click(screen.getByRole('button', { name: /abbrechen/i }));
    expect(document.activeElement).toBe(button);
  });
});
