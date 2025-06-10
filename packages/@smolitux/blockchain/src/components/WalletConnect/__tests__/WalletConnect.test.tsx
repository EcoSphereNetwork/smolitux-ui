import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { WalletConnect } from '../WalletConnect';
import { EthereumProvider } from '../../../types';

const mockEthereum = {
  request: jest.fn(),
  on: jest.fn(),
  removeListener: jest.fn(),
} as unknown as EthereumProvider;

describe('WalletConnect', () => {
  beforeEach(() => {
    (window as any).ethereum = mockEthereum;
    mockEthereum.request.mockResolvedValue(['0xabc']);
  });

  afterEach(() => {
    jest.resetAllMocks();
    delete (window as any).ethereum;
  });

  it('shows wallet options after clicking connect', () => {
    render(<WalletConnect onConnect={jest.fn()} onDisconnect={jest.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /wallet verbinden/i }));
    expect(
      screen.getByRole('button', { name: /metamask/i })
    ).toBeInTheDocument();
  });

  it('forwards ref to root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <WalletConnect ref={ref} onConnect={jest.fn()} onDisconnect={jest.fn()} />
    );
    expect(ref.current).toHaveAttribute('data-testid', 'wallet-connect');
  });
});
