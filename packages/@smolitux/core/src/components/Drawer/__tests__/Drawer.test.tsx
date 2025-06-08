import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Drawer } from '../Drawer';

describe('Drawer', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when isOpen is true', () => {
    render(
      <Drawer isOpen={true} onClose={mockOnClose}>
        Drawer Content
      </Drawer>
    );

    expect(screen.getByText('Drawer Content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <Drawer isOpen={false} onClose={mockOnClose}>
        Drawer Content
      </Drawer>
    );

    expect(screen.queryByText('Drawer Content')).not.toBeInTheDocument();
  });

  it('renders with title', () => {
    render(
      <Drawer isOpen={true} onClose={mockOnClose} title="Drawer Title">
        Drawer Content
      </Drawer>
    );

    expect(screen.getByText('Drawer Title')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <Drawer isOpen={true} onClose={mockOnClose}>
        Drawer Content
      </Drawer>
    );

    const closeButton = screen.getByLabelText('Schließen');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking on overlay if closeOnOverlayClick is true', () => {
    render(
      <Drawer isOpen={true} onClose={mockOnClose} closeOnOverlayClick={true}>
        Drawer Content
      </Drawer>
    );

    // Klick auf das Overlay (außerhalb des Drawer-Inhalts)
    const overlay = screen.getByTestId('drawer-overlay');
    fireEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking on overlay if closeOnOverlayClick is false', () => {
    render(
      <Drawer isOpen={true} onClose={mockOnClose} closeOnOverlayClick={false}>
        Drawer Content
      </Drawer>
    );

    // Klick auf das Overlay (außerhalb des Drawer-Inhalts)
    const overlay = screen.getByTestId('drawer-overlay');
    fireEvent.click(overlay);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('renders with footer', () => {
    render(
      <Drawer isOpen={true} onClose={mockOnClose} footer={<button>Footer Button</button>}>
        Drawer Content
      </Drawer>
    );

    expect(screen.getByText('Footer Button')).toBeInTheDocument();
  });

  it('renders with different placements', () => {
    const placements: Array<'left' | 'right' | 'top' | 'bottom'> = [
      'left',
      'right',
      'top',
      'bottom',
    ];

    placements.forEach((placement) => {
      const { unmount } = render(
        <Drawer isOpen={true} onClose={mockOnClose} placement={placement}>
          Drawer Content
        </Drawer>
      );

      const drawer = screen.getByRole('dialog');

      if (placement === 'left') {
        expect(drawer).toHaveClass('left-0');
      } else if (placement === 'right') {
        expect(drawer).toHaveClass('right-0');
      } else if (placement === 'top') {
        expect(drawer).toHaveClass('top-0');
      } else if (placement === 'bottom') {
        expect(drawer).toHaveClass('bottom-0');
      }

      unmount();
    });
  });

  it('applies custom width for left/right placement', () => {
    render(
      <Drawer isOpen={true} onClose={mockOnClose} placement="right" width="400px">
        Drawer Content
      </Drawer>
    );

    const drawer = screen.getByRole('dialog');
    expect(drawer).toHaveStyle('width: 400px');
  });

  it('applies custom height for top/bottom placement', () => {
    render(
      <Drawer isOpen={true} onClose={mockOnClose} placement="bottom" height="300px">
        Drawer Content
      </Drawer>
    );

    const drawer = screen.getByRole('dialog');
    expect(drawer).toHaveStyle('height: 300px');
  });

  it('hides header when showHeader is false', () => {
    render(
      <Drawer isOpen={true} onClose={mockOnClose} title="Drawer Title" showHeader={false}>
        Drawer Content
      </Drawer>
    );

    expect(screen.queryByText('Drawer Title')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Drawer isOpen={true} onClose={mockOnClose} className="custom-drawer">
        Drawer Content
      </Drawer>
    );

    const drawer = screen.getByRole('dialog');
    expect(drawer).toHaveClass('custom-drawer');
  });

  it('applies custom zIndex', () => {
    render(
      <Drawer isOpen={true} onClose={mockOnClose} zIndex={1050}>
        Drawer Content
      </Drawer>
    );

    const overlay = screen.getByTestId('drawer-overlay');
    expect(overlay).toHaveStyle('z-index: 1050');
  });

  it('sets focus on close button when opened', () => {
    render(
      <Drawer isOpen={true} onClose={mockOnClose} title="Drawer Title">
        <button>Button 1</button>
        <button>Button 2</button>
      </Drawer>
    );

    // Warten auf den Timeout für den initialen Fokus
    setTimeout(() => {
      const closeButton = screen.getByTestId('drawer-close-button');
      expect(document.activeElement).toBe(closeButton);
    }, 150);
  });
});
