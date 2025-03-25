import React from 'react';
import { render } from '@testing-library/react';
import { Dialog } from '../Dialog';

describe('Dialog Snapshots', () => {
  const mockOnClose = jest.fn();

  it('renders default dialog correctly', () => {
    const { asFragment } = render(
      <Dialog isOpen={true} onClose={mockOnClose}>
        Dialog Content
      </Dialog>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with title correctly', () => {
    const { asFragment } = render(
      <Dialog isOpen={true} onClose={mockOnClose} title="Dialog Title">
        Dialog Content
      </Dialog>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with confirm and cancel buttons correctly', () => {
    const { asFragment } = render(
      <Dialog 
        isOpen={true} 
        onClose={mockOnClose} 
        onConfirm={() => {}}
        onCancel={() => {}}
        confirmLabel="Bestätigen"
        cancelLabel="Abbrechen"
      >
        Dialog Content
      </Dialog>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom footer buttons correctly', () => {
    const { asFragment } = render(
      <Dialog 
        isOpen={true} 
        onClose={mockOnClose} 
        footerButtons={<button>Custom Button</button>}
      >
        Dialog Content
      </Dialog>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with different sizes correctly', () => {
    const sizes: Array<'sm' | 'md' | 'lg' | 'xl' | 'full'> = ['sm', 'md', 'lg', 'xl', 'full'];
    
    const fragments = sizes.map(size => {
      const { asFragment } = render(
        <Dialog isOpen={true} onClose={mockOnClose} size={size}>
          Dialog Content
        </Dialog>
      );
      return { size, fragment: asFragment() };
    });
    
    fragments.forEach(({ size, fragment }) => {
      expect(fragment).toMatchSnapshot(`Dialog with size ${size}`);
    });
  });

  it('renders with different variants correctly', () => {
    const variants: Array<'info' | 'success' | 'warning' | 'error' | 'confirm'> = [
      'info', 'success', 'warning', 'error', 'confirm'
    ];
    
    const fragments = variants.map(variant => {
      const { asFragment } = render(
        <Dialog isOpen={true} onClose={mockOnClose} variant={variant}>
          Dialog Content
        </Dialog>
      );
      return { variant, fragment: asFragment() };
    });
    
    fragments.forEach(({ variant, fragment }) => {
      expect(fragment).toMatchSnapshot(`Dialog with variant ${variant}`);
    });
  });

  it('renders with icon correctly', () => {
    const { asFragment } = render(
      <Dialog 
        isOpen={true} 
        onClose={mockOnClose} 
        icon={<span>🔔</span>}
      >
        Dialog Content
      </Dialog>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});