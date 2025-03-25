import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '../Card';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('Card', () => {
  test('renders correctly with default props', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
    expect(screen.getByText('Card Content').parentElement).toHaveClass('bg-white');
  });

  test('renders with custom className', () => {
    render(<Card className="custom-class">Card Content</Card>);
    expect(screen.getByText('Card Content').parentElement).toHaveClass('custom-class');
  });

  test('renders with different variants', () => {
    const { rerender } = render(<Card variant="elevated">Elevated Card</Card>);
    expect(screen.getByText('Elevated Card').parentElement).toHaveClass('shadow-md');

    rerender(<Card variant="outlined">Outlined Card</Card>);
    expect(screen.getByText('Outlined Card').parentElement).toHaveClass('border');

    rerender(<Card variant="flat">Flat Card</Card>);
    expect(screen.getByText('Flat Card').parentElement).toHaveClass('bg-white');
  });

  test('renders with different padding sizes', () => {
    const { rerender } = render(<Card padding="none">No Padding</Card>);
    expect(screen.getByText('No Padding').parentElement).toHaveClass('p-0');

    rerender(<Card padding="small">Small Padding</Card>);
    expect(screen.getByText('Small Padding').parentElement).toHaveClass('p-3');

    rerender(<Card padding="medium">Medium Padding</Card>);
    expect(screen.getByText('Medium Padding').parentElement).toHaveClass('p-5');

    rerender(<Card padding="large">Large Padding</Card>);
    expect(screen.getByText('Large Padding').parentElement).toHaveClass('p-8');
  });

  test('renders with different border radius', () => {
    const { rerender } = render(<Card borderRadius="none">No Radius</Card>);
    expect(screen.getByText('No Radius').parentElement).toHaveClass('rounded-none');

    rerender(<Card borderRadius="small">Small Radius</Card>);
    expect(screen.getByText('Small Radius').parentElement).toHaveClass('rounded-sm');

    rerender(<Card borderRadius="medium">Medium Radius</Card>);
    expect(screen.getByText('Medium Radius').parentElement).toHaveClass('rounded-md');

    rerender(<Card borderRadius="large">Large Radius</Card>);
    expect(screen.getByText('Large Radius').parentElement).toHaveClass('rounded-lg');

    rerender(<Card borderRadius="full">Full Radius</Card>);
    expect(screen.getByText('Full Radius').parentElement).toHaveClass('rounded-full');
  });

  test('renders with hover effect when hoverable is true', () => {
    render(<Card hoverable>Hoverable Card</Card>);
    expect(screen.getByText('Hoverable Card').parentElement).toHaveClass('hover:shadow-lg');
  });

  test('renders with custom width and height', () => {
    render(<Card width="300px" height="200px">Custom Size Card</Card>);
    const cardElement = screen.getByText('Custom Size Card').parentElement;
    expect(cardElement).toHaveStyle({ width: '300px', height: '200px' });
  });

  test('renders with custom background color', () => {
    render(<Card backgroundColor="bg-blue-100">Blue Card</Card>);
    expect(screen.getByText('Blue Card').parentElement).toHaveClass('bg-blue-100');
  });

  test('renders with custom border color', () => {
    render(<Card borderColor="border-red-500">Red Border Card</Card>);
    expect(screen.getByText('Red Border Card').parentElement).toHaveClass('border-red-500');
  });

  test('renders with header and footer', () => {
    render(
      <Card
        header={<div data-testid="card-header">Card Header</div>}
        footer={<div data-testid="card-footer">Card Footer</div>}
      >
        Card Body
      </Card>
    );
    
    expect(screen.getByTestId('card-header')).toBeInTheDocument();
    expect(screen.getByText('Card Body')).toBeInTheDocument();
    expect(screen.getByTestId('card-footer')).toBeInTheDocument();
  });

  test('applies onClick handler when provided', () => {
    const handleClick = jest.fn();
    render(<Card onClick={handleClick}>Clickable Card</Card>);
    
    const cardElement = screen.getByText('Clickable Card').parentElement;
    expect(cardElement).toHaveClass('cursor-pointer');
    
    cardElement?.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders with data attributes', () => {
    render(<Card data-testid="test-card" data-custom="custom-value">Data Attributes Card</Card>);
    
    const cardElement = screen.getByTestId('test-card');
    expect(cardElement).toHaveAttribute('data-custom', 'custom-value');
    expect(cardElement).toHaveTextContent('Data Attributes Card');
  });
});