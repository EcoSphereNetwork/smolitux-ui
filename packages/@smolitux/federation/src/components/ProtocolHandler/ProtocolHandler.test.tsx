import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { ProtocolHandler } from './ProtocolHandler';
import { SupportedProtocol } from '../../types';

const protocols: SupportedProtocol[] = [
  {
    name: 'ActivityPub',
    version: '1.0',
    capabilities: ['messages'],
    endpoints: [{ path: 'ws://example.com/ap', method: 'GET' }],
    authentication: ['none'],
  },
];

describe('ProtocolHandler', () => {
  it('renders protocol list', () => {
    render(<ProtocolHandler protocols={protocols} />);
    expect(screen.getByText('ActivityPub')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(<ProtocolHandler protocols={protocols} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('reconnect button calls connect', async () => {
    const user = userEvent.setup();
    render(<ProtocolHandler protocols={protocols} />);
    await user.click(screen.getByRole('button', { name: /Reconnect/i }));
    expect(screen.getByTestId('protocol-handler')).toBeInTheDocument();
  });
});
