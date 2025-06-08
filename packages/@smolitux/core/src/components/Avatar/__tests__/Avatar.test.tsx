import React from 'react';
import { render, screen } from '@testing-library/react';
import { Avatar } from '../Avatar';

describe('Avatar', () => {
  it('renders with image src', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />);
    const img = screen.getByAltText('User Avatar');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('renders initials when no image is provided', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders single initial for single name', () => {
    render(<Avatar name="John" />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('renders fallback icon when no image or name is provided', () => {
    render(<Avatar />);
    // Check for the fallback icon (implementation may vary)
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Avatar size="sm" name="John Doe" />);
    let avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('w-8');
    expect(avatar).toHaveClass('h-8');

    rerender(<Avatar size="md" name="John Doe" />);
    avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('w-10');
    expect(avatar).toHaveClass('h-10');

    rerender(<Avatar size="lg" name="John Doe" />);
    avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('w-12');
    expect(avatar).toHaveClass('h-12');

    rerender(<Avatar size="xl" name="John Doe" />);
    avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('w-16');
    expect(avatar).toHaveClass('h-16');
  });

  it('applies custom size correctly', () => {
    render(<Avatar size="2.5rem" name="John Doe" />);
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveStyle({ width: '2.5rem', height: '2.5rem' });
  });

  it('applies border when specified', () => {
    render(<Avatar name="John Doe" showBorder />);
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('border-2');
  });

  it('applies custom border color when specified', () => {
    render(<Avatar name="John Doe" showBorder borderColor="red-500" />);
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('border-red-500');
  });

  it('applies custom background color when specified', () => {
    render(<Avatar name="John Doe" bgColor="blue-500" />);
    const container = screen.getByTestId('avatar-fallback');
    expect(container).toHaveClass('bg-blue-500');
  });

  it('applies custom text color when specified', () => {
    render(<Avatar name="John Doe" textColor="yellow-500" />);
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('text-yellow-500');
  });

  it('renders badge when specified', () => {
    render(<Avatar name="John Doe" badge="online" />);
    const badge = screen.getByTestId('avatar-badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-green-500'); // Assuming 'online' is green
  });

  it('renders custom badge when specified', () => {
    render(<Avatar name="John Doe" badge="custom" badgeColor="purple-500" />);
    const badge = screen.getByTestId('avatar-badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-purple-500');
  });

  it('applies custom className when provided', () => {
    render(<Avatar name="John Doe" className="custom-avatar" />);
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('custom-avatar');
  });
});
