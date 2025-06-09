import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActivityPubViewer } from './ActivityPubViewer';

const activity = { type: 'Note', id: '1', actor: 'Alice', content: 'Hello world' };

describe('ActivityPubViewer', () => {
  it('renders activity content', () => {
    render(<ActivityPubViewer activity={activity} />);
    expect(screen.getByTestId('content')).toHaveTextContent('Hello world');
  });

  it('applies custom className', () => {
    render(<ActivityPubViewer activity={activity} className="custom" />);
    expect(screen.getByTestId('activitypub-viewer')).toHaveClass('custom');
  });
});
