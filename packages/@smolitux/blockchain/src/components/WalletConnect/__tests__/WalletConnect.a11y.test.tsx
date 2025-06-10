import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { WalletConnect } from '../WalletConnect';
import { EthereumProvider } from '../../../types';

expect.extend(toHaveNoViolations);

const mockRequest = jest.fn();
const mockEthereum: EthereumProvider = {
  request: mockRequest as unknown as EthereumProvider['request'],
  on: jest.fn(),
  removeListener: jest.fn(),
};

describe('WalletConnect a11y', () => {
  beforeEach(() => {
    (window as any).ethereum = mockEthereum;
    mockRequest.mockResolvedValue(['0xabc']);
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
