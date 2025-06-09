import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { IdentityBridge } from './IdentityBridge';

const identities = [
  { platform: 'Mastodon', handle: '@alice@mastodon.social' },
  { platform: 'Matrix', handle: '@alice:matrix.org' },
];

describe('IdentityBridge', () => {
  it('renders list of identities', () => {
    render(<IdentityBridge identities={identities} />);
    expect(screen.getByText('Mastodon: @alice@mastodon.social')).toBeInTheDocument();
  });

  it('calls onUnlink when button clicked', () => {
    const onUnlink = jest.fn();
    render(<IdentityBridge identities={identities} onUnlink={onUnlink} />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onUnlink).toHaveBeenCalledWith('Mastodon');
  });
});
