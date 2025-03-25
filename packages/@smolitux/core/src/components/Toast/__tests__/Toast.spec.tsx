import React from 'react';
import { render } from '@testing-library/react';
import { Toast } from '../Toast';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('Toast Snapshots', () => {
  it('renders default toast correctly', () => {
    const { asFragment } = render(
      <Toast message="Test message" isOpen={true} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders toast with title correctly', () => {
    const { asFragment } = render(
      <Toast title="Test Title" message="Test message" isOpen={true} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders toast with different types correctly', () => {
    const types = ['success', 'error', 'warning', 'info'];
    
    const fragments = types.map(type => {
      const { asFragment } = render(
        <Toast message="Test message" type={type as any} isOpen={true} />
      );
      return { type, fragment: asFragment() };
    });
    
    fragments.forEach(({ type, fragment }) => {
      expect(fragment).toMatchSnapshot(`Toast with type ${type}`);
    });
  });

  it('renders toast with close button correctly', () => {
    const { asFragment } = render(
      <Toast message="Test message" isOpen={true} showCloseButton={true} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders toast with icon correctly', () => {
    const { asFragment } = render(
      <Toast message="Test message" isOpen={true} showIcon={true} type="success" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders toast with custom icon correctly', () => {
    const { asFragment } = render(
      <Toast message="Test message" isOpen={true} icon={<span>🔔</span>} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders toast with actions correctly', () => {
    const { asFragment } = render(
      <Toast 
        message="Test message" 
        isOpen={true} 
        actions={<button>Action</button>}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders toast with different positions correctly', () => {
    const positions = [
      'top-right', 'top-left', 'bottom-right', 
      'bottom-left', 'top-center', 'bottom-center'
    ];
    
    const fragments = positions.map(position => {
      const { asFragment } = render(
        <Toast message="Test message" isOpen={true} position={position as any} />
      );
      return { position, fragment: asFragment() };
    });
    
    fragments.forEach(({ position, fragment }) => {
      expect(fragment).toMatchSnapshot(`Toast with position ${position}`);
    });
  });

  it('renders toast with animation correctly', () => {
    const { asFragment } = render(
      <Toast message="Test message" isOpen={true} animateOut={true} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders toast with custom className correctly', () => {
    const { asFragment } = render(
      <Toast message="Test message" isOpen={true} className="custom-toast" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders toast with all features enabled correctly', () => {
    const { asFragment } = render(
      <Toast 
        title="Test Title"
        message="Test message"
        type="success"
        isOpen={true}
        position="top-right"
        showIcon={true}
        showCloseButton={true}
        animateOut={true}
        actions={<button>Action</button>}
        className="custom-toast"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders toast in dark mode correctly', () => {
    // Override the mock for this test
    jest.resetModules();
    jest.mock('@smolitux/theme', () => ({
      useTheme: jest.fn(() => ({ themeMode: 'dark' })),
    }));
    
    const { asFragment } = render(
      <Toast message="Test message" isOpen={true} />
    );
    expect(asFragment()).toMatchSnapshot();
    
    // Reset the mock back
    jest.resetModules();
    jest.mock('@smolitux/theme', () => ({
      useTheme: jest.fn(() => ({ themeMode: 'light' })),
    }));
  });
});