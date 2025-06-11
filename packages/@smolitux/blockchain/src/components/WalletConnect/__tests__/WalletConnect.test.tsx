import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { WalletConnect } from '../WalletConnect';
import { EthereumProvider } from '../../../types';

jest.mock('@smolitux/core', () => ({
  Button: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props} />
  ),
  Card: (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />,
}));

const mockRequest = jest.fn();
const mockEthereum: EthereumProvider = {
  request: mockRequest as unknown as EthereumProvider['request'],
  on: jest.fn(),
  removeListener: jest.fn(),
};

describe('WalletConnect', () => {
  beforeEach(() => {
    (window as unknown as { ethereum: EthereumProvider }).ethereum = mockEthereum;
    mockRequest.mockResolvedValue(['0xabc']);
  });

  afterEach(() => {
    jest.resetAllMocks();
    delete (window as unknown as { ethereum?: EthereumProvider }).ethereum;
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
