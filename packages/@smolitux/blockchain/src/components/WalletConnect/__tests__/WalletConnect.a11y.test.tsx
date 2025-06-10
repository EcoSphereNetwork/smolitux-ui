import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { WalletConnect } from '../WalletConnect';
import { EthereumProvider } from '../../../types';

expect.extend(toHaveNoViolations);

const mockEthereum = {
  request: jest.fn(),
  on: jest.fn(),
  removeListener: jest.fn(),
} as unknown as EthereumProvider;

describe('WalletConnect a11y', () => {
  beforeEach(() => {
    (window as any).ethereum = mockEthereum;
    mockEthereum.request.mockResolvedValue(['0xabc']);
  });

  afterEach(() => {
    jest.resetAllMocks();
    delete (window as any).ethereum;
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <WalletConnect onConnect={jest.fn()} onDisconnect={jest.fn()} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
