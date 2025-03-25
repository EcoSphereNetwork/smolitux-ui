import React from 'react';
import { render } from '@testing-library/react';
import { Toast } from '../Toast';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('Toast Snapshots', () => {
  it('renders default toast correctly', () => {
    const { asFragment } = render(<Toast message="Test message" isOpen />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders toast with title correctly', () => {
    const { asFragment } = render(<Toast title="Test Title" message="Test message" isOpen />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders toast with different types correctly', () => {
    const types = ['success', 'error', 'warning', 'info'];
    
    const fragments = types.map(type => {
      const { asFragment } = render(<Toast message={`${type} toast`} type={type as any} isOpen />);
      return { type, fragment: asFragment() };
    });
    
    fragments.forEach(({ type, fragment }) => {
      expect(fragment).toMatchSnapshot(`Toast with type ${type}`);
    });
  });

  it('renders toast with close button correctly', () => {
    const { asFragment } = render(<Toast message="Test message" showCloseButton isOpen />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders toast with icon correctly', () => {
    const { asFragment } = render(<Toast message="Test message" showIcon isOpen />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders toast with custom icon correctly', () => {
    const { asFragment } = render(
      <Toast 
        message="Test message" 
        icon={<span>🔔</span>} 
        isOpen 
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders toast with actions correctly', () => {
    const { asFragment } = render(
      <Toast 
        message="Test message" 
        actions={<button>Action</button>} 
        isOpen 
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders toast with custom className correctly', () => {
    const { asFragment } = render(<Toast message="Test message" className="custom-toast" isOpen />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders toast with different positions correctly', () => {
    const positions = ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'];
    
    const fragments = positions.map(position => {
      const { asFragment } = render(<Toast message="Test message" position={position as any} isOpen />);
      return { position, fragment: asFragment() };
    });
    
    fragments.forEach(({ position, fragment }) => {
      expect(fragment).toMatchSnapshot(`Toast with position ${position}`);
    });
  });

  it('renders toast with animation correctly', () => {
    const { asFragment } = render(<Toast message="Test message" animateOut isOpen />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders toast with all features enabled correctly', () => {
    const { asFragment } = render(
      <Toast 
        title="Complete Toast"
        message="This toast has all features enabled"
        type="success"
        showIcon
        showCloseButton
        animateOut
        actions={<button>Action</button>}
        position="bottom-right"
        isOpen
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});