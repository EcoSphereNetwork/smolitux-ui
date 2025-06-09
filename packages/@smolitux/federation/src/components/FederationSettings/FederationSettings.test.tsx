import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FederationSettings } from './FederationSettings';

const protocols = ['ActivityPub', 'ATProtocol', 'Matrix'];

describe('FederationSettings', () => {
  it('renders checkboxes', () => {
    render(<FederationSettings protocols={protocols} enabled={[]} onToggle={jest.fn()} />);
    expect(screen.getByLabelText('ActivityPub')).toBeInTheDocument();
  });

  it('calls onToggle when checkbox changed', () => {
    const onToggle = jest.fn();
    render(
      <FederationSettings protocols={protocols} enabled={[]} onToggle={onToggle} />
    );
    fireEvent.click(screen.getByLabelText('Matrix'));
    expect(onToggle).toHaveBeenCalledWith('Matrix', true);
  });
});
