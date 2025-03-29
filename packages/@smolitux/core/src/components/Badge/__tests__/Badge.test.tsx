import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge';

describe('Badge Component', () => {
  test('renders correctly with default props', () => {
    render(<Badge>Default</Badge>);
    
    expect(screen.getByText('Default')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveClass('bg-gray-100');
  });
  
  test('renders with different variants', () => {
    const { rerender } = render(<Badge variant="primary">Primary</Badge>);
    expect(screen.getByRole('status')).toHaveClass('bg-primary-100');
    
    rerender(<Badge variant="success">Success</Badge>);
    expect(screen.getByRole('status')).toHaveClass('bg-green-100');
    
    rerender(<Badge variant="warning">Warning</Badge>);
    expect(screen.getByRole('status')).toHaveClass('bg-yellow-100');
    
    rerender(<Badge variant="error">Error</Badge>);
    expect(screen.getByRole('status')).toHaveClass('bg-red-100');
    
    rerender(<Badge variant="info">Info</Badge>);
    expect(screen.getByRole('status')).toHaveClass('bg-blue-100');
  });
  
  test('renders with different sizes', () => {
    const { rerender } = render(<Badge size="xs">XS</Badge>);
    expect(screen.getByRole('status')).toHaveClass('text-xs px-1 py-0.5');
    
    rerender(<Badge size="sm">SM</Badge>);
    expect(screen.getByRole('status')).toHaveClass('text-xs px-1.5 py-0.5');
    
    rerender(<Badge size="md">MD</Badge>);
    expect(screen.getByRole('status')).toHaveClass('text-xs px-2.5 py-0.5');
    
    rerender(<Badge size="lg">LG</Badge>);
    expect(screen.getByRole('status')).toHaveClass('text-sm px-3 py-1');
  });
  
  test('renders with rounded style', () => {
    render(<Badge rounded>Rounded</Badge>);
    
    expect(screen.getByRole('status')).toHaveClass('rounded-full');
  });
  
  test('renders with custom className', () => {
    render(<Badge className="custom-class">Custom</Badge>);
    
    expect(screen.getByRole('status')).toHaveClass('custom-class');
  });
  
  test('renders with icon', () => {
    const icon = <span data-testid="test-icon">★</span>;
    render(<Badge icon={icon}>With Icon</Badge>);
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText('With Icon')).toBeInTheDocument();
  });
  
  test('renders as counter with maxCount', () => {
    render(<Badge isCounter maxCount={99}>100</Badge>);
    
    expect(screen.getByText('99+')).toBeInTheDocument();
  });
  
  test('renders as counter without exceeding maxCount', () => {
    render(<Badge isCounter maxCount={99}>50</Badge>);
    
    expect(screen.getByText('50')).toBeInTheDocument();
  });
  
  test('renders as dot without text', () => {
    render(<Badge isDot variant="warning" />);
    
    const dot = screen.getByTestId('badge');
    expect(dot).toHaveClass('rounded-full');
    expect(dot).toHaveAttribute('aria-hidden', 'true');
  });
  
  test('renders with outline style', () => {
    render(<Badge outline>Outline</Badge>);
    
    expect(screen.getByRole('status')).toHaveClass('bg-transparent border border-gray-300');
  });
  
  test('renders with custom HTML attributes', () => {
    render(<Badge htmlProps={{ 'data-testid': 'custom-badge' }}>Custom Attrs</Badge>);
    
    expect(screen.getByTestId('custom-badge')).toBeInTheDocument();
  });
  
  test('renders with custom ID', () => {
    render(<Badge id="test-badge-id">Custom ID</Badge>);
    
    expect(screen.getByRole('status')).toHaveAttribute('id', 'test-badge-id');
  });
});