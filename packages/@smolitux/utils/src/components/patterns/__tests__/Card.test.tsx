import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '../Card';

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Test Content</Card>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies custom style', () => {
    const { container } = render(<Card style={{ backgroundColor: 'red' }}>Test Content</Card>);
    expect(container.firstChild).toHaveStyle('background-color: red');
  });

  it('renders with border when bordered=true', () => {
    const { container } = render(<Card bordered>Test Content</Card>);
    expect(container.firstChild).toHaveStyle('border: 1px solid rgba(0, 0, 0, 0.1)');
  });

  it('renders without border when bordered=false', () => {
    const { container } = render(<Card bordered={false}>Test Content</Card>);
    expect(container.firstChild).toHaveStyle('border: none');
  });

  it('renders with shadow when shadowed=true', () => {
    const { container } = render(<Card shadowed>Test Content</Card>);
    expect(container.firstChild).toHaveStyle('box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)');
  });

  it('renders without shadow when shadowed=false', () => {
    const { container } = render(<Card shadowed={false}>Test Content</Card>);
    expect(container.firstChild).toHaveStyle('box-shadow: none');
  });

  it('renders with rounded corners when rounded=true', () => {
    const { container } = render(<Card rounded>Test Content</Card>);
    expect(container.firstChild).toHaveStyle('border-radius: 0.5rem');
  });

  it('renders without rounded corners when rounded=false', () => {
    const { container } = render(<Card rounded={false}>Test Content</Card>);
    expect(container.firstChild).toHaveStyle('border-radius: 0');
  });

  it('renders with padding when padded=true', () => {
    const { container } = render(<Card padded>Test Content</Card>);
    expect(container.firstChild).toHaveStyle('padding: 1rem');
  });

  it('renders without padding when padded=false', () => {
    const { container } = render(<Card padded={false}>Test Content</Card>);
    expect(container.firstChild).toHaveStyle('padding: 0');
  });

  it('adds hover class when hoverable=true', () => {
    const { container } = render(<Card hoverable>Test Content</Card>);
    expect(container.firstChild).toHaveClass('hover:shadow-md');
    expect(container.firstChild).toHaveClass('hover:transform');
    expect(container.firstChild).toHaveClass('hover:translate-y-[-2px]');
  });

  it('does not add hover class when hoverable=false', () => {
    const { container } = render(<Card hoverable={false}>Test Content</Card>);
    expect(container.firstChild).not.toHaveClass('hover:shadow-md');
    expect(container.firstChild).not.toHaveClass('hover:transform');
    expect(container.firstChild).not.toHaveClass('hover:translate-y-[-2px]');
  });
});
