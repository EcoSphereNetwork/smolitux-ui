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
    expect(screen.getByTestId('card')).toHaveClass('bg-white');
  });

  test('renders with custom className', () => {
    render(<Card className="custom-class">Card Content</Card>);
    expect(screen.getByTestId('card')).toHaveClass('custom-class');
  });

  test('renders with different variants', () => {
    const { rerender } = render(<Card variant="elevated">Elevated Card</Card>);
    expect(screen.getByTestId('card')).toHaveClass('shadow-md');

    rerender(<Card variant="outlined">Outlined Card</Card>);
    expect(screen.getByTestId('card')).toHaveClass('border');

    rerender(<Card variant="flat">Flat Card</Card>);
    expect(screen.getByTestId('card')).toHaveClass('bg-white');
  });

  test('renders with different padding sizes', () => {
    const { rerender } = render(<Card padding="none">No Padding</Card>);
    expect(screen.getByTestId('card')).toHaveClass('p-0');

    rerender(<Card padding="small">Small Padding</Card>);
    expect(screen.getByTestId('card')).toHaveClass('p-3');

    rerender(<Card padding="medium">Medium Padding</Card>);
    expect(screen.getByTestId('card')).toHaveClass('p-4');

    rerender(<Card padding="large">Large Padding</Card>);
    expect(screen.getByTestId('card')).toHaveClass('p-6');
  });

  test('renders with different border radius', () => {
    const { rerender } = render(<Card borderRadius="none">No Radius</Card>);
    expect(screen.getByTestId('card')).toHaveClass('rounded-none');

    rerender(<Card borderRadius="small">Small Radius</Card>);
    expect(screen.getByTestId('card')).toHaveClass('rounded-sm');

    rerender(<Card borderRadius="medium">Medium Radius</Card>);
    expect(screen.getByTestId('card')).toHaveClass('rounded-lg');

    rerender(<Card borderRadius="large">Large Radius</Card>);
    expect(screen.getByTestId('card')).toHaveClass('rounded-xl');
  });

  test('renders with hover effect when hoverable is true', () => {
    render(<Card hoverable>Hoverable Card</Card>);
    expect(screen.getByTestId('card')).toHaveClass('hover:shadow-lg');
  });

  test('renders with custom width and height', () => {
    render(<Card width="300px" height="200px">Custom Size Card</Card>);
    const cardElement = screen.getByTestId('card');
    expect(cardElement).toHaveStyle({ width: '300px', height: '200px' });
  });

  test('renders with custom background color', () => {
    render(<Card backgroundColor="bg-blue-100">Blue Card</Card>);
    expect(screen.getByTestId('card')).toHaveClass('bg-blue-100');
  });

  test('renders with custom border color', () => {
    render(<Card borderColor="border-red-500">Red Border Card</Card>);
    expect(screen.getByTestId('card')).toHaveClass('border-red-500');
  });

  test('renders with header and footer', () => {
    render(
      <Card
        title="Card Header"
        footer={<div>Card Footer</div>}
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
    
    const cardElement = screen.getByTestId('card');
    
    cardElement.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders with data attributes', () => {
    render(<Card data-custom="custom-value">Data Attributes Card</Card>);
    
    const cardElement = screen.getByTestId('card');
    expect(cardElement).toHaveAttribute('data-custom', 'custom-value');
    expect(screen.getByText('Data Attributes Card')).toBeInTheDocument();
  });
});