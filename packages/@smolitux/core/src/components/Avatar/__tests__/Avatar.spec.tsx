import React from 'react';
import { render } from '@testing-library/react';
import { Avatar } from '../Avatar';

describe('Avatar Snapshots', () => {
  it('renders with image correctly', () => {
    const { asFragment } = render(
      <Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with initials correctly', () => {
    const { asFragment } = render(<Avatar name="John Doe" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with fallback icon correctly', () => {
    const { asFragment } = render(<Avatar />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with different sizes correctly', () => {
    const { asFragment } = render(
      <>
        <Avatar size="xs" name="XS" />
        <Avatar size="sm" name="SM" />
        <Avatar size="md" name="MD" />
        <Avatar size="lg" name="LG" />
        <Avatar size="xl" name="XL" />
        <Avatar size="2.5rem" name="Custom" />
      </>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with border correctly', () => {
    const { asFragment } = render(<Avatar name="John Doe" showBorder borderColor="blue-500" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom colors correctly', () => {
    const { asFragment } = render(
      <Avatar name="John Doe" bgColor="purple-500" textColor="white" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with badge correctly', () => {
    const { asFragment } = render(
      <>
        <Avatar name="Online" badge="online" />
        <Avatar name="Busy" badge="busy" />
        <Avatar name="Away" badge="away" />
        <Avatar name="Offline" badge="offline" />
        <Avatar name="Custom" badge="custom" badgeColor="pink-500" />
      </>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom className correctly', () => {
    const { asFragment } = render(<Avatar name="John Doe" className="custom-avatar" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with square shape correctly', () => {
    const { asFragment } = render(<Avatar name="John Doe" shape="square" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
