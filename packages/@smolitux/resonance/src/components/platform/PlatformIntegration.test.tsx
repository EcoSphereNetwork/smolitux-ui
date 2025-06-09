import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { PlatformIntegration } from './PlatformIntegration';

expect.extend(toHaveNoViolations);

describe('PlatformIntegration', () => {
  it('renders connect state', () => {
    render(<PlatformIntegration platformName="Eco" />);
    expect(screen.getByText(/connect to Eco/i)).toBeInTheDocument();
  });

  it('renders connected state', () => {
    render(<PlatformIntegration platformName="Eco" isConnected />);
    expect(screen.getByText(/connected to Eco/i)).toBeInTheDocument();
  });

  it('triggers connect handler', async () => {
    const user = userEvent.setup();
    const onConnect = jest.fn();
    render(<PlatformIntegration platformName="Eco" onConnect={onConnect} />);
    await user.click(screen.getByRole('button', { name: /connect/i }));
    expect(onConnect).toHaveBeenCalledTimes(1);
  });

  it('triggers disconnect handler', async () => {
    const user = userEvent.setup();
    const onDisconnect = jest.fn();
    render(
      <PlatformIntegration
        platformName="Eco"
        isConnected
        onDisconnect={onDisconnect}
      />
    );
    await user.click(screen.getByRole('button', { name: /disconnect/i }));
    expect(onDisconnect).toHaveBeenCalledTimes(1);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<PlatformIntegration platformName="Eco" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
