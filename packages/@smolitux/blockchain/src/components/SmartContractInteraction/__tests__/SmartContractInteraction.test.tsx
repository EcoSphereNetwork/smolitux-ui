import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SmartContractInteraction } from '../SmartContractInteraction';

describe('SmartContractInteraction', () => {
  const mockContractABI = [
    {
      name: 'balanceOf',
      type: 'function',
      inputs: [{ name: 'owner', type: 'address' }],
      outputs: [{ name: '', type: 'uint256' }],
      stateMutability: 'view',
    },
    {
      name: 'transfer',
      type: 'function',
      inputs: [
        { name: 'to', type: 'address' },
        { name: 'amount', type: 'uint256' },
      ],
      outputs: [{ name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
    },
  ];

  const mockContractAddress = '0x1234567890123456789012345678901234567890';
  const mockOnConnect = jest.fn();
  const mockOnDisconnect = jest.fn();
  const mockOnCallFunction = jest.fn();
  const mockOnSendTransaction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<SmartContractInteraction />);

    expect(screen.getByText(/smart contract interaction/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contract address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /connect/i })).toBeInTheDocument();
  });

  it('allows entering contract address', () => {
    render(<SmartContractInteraction />);

    const addressInput = screen.getByPlaceholderText(/contract address/i);
    fireEvent.change(addressInput, { target: { value: mockContractAddress } });

    expect(addressInput).toHaveValue(mockContractAddress);
  });

  it('calls onConnect when connect button is clicked', () => {
    render(<SmartContractInteraction onConnect={mockOnConnect} />);

    const addressInput = screen.getByPlaceholderText(/contract address/i);
    fireEvent.change(addressInput, { target: { value: mockContractAddress } });

    const connectButton = screen.getByRole('button', { name: /connect/i });
    fireEvent.click(connectButton);

    expect(mockOnConnect).toHaveBeenCalledWith(mockContractAddress);
  });

  it('displays contract functions when connected', async () => {
    render(
      <SmartContractInteraction
        contractAddress={mockContractAddress}
        contractABI={mockContractABI}
        isConnected={true}
      />
    );

    expect(screen.getByText(/connected to/i)).toBeInTheDocument();
    expect(screen.getByText(mockContractAddress)).toBeInTheDocument();
    expect(screen.getByText('balanceOf')).toBeInTheDocument();
    expect(screen.getByText('transfer')).toBeInTheDocument();
  });

  it('displays function inputs when a function is selected', async () => {
    render(
      <SmartContractInteraction
        contractAddress={mockContractAddress}
        contractABI={mockContractABI}
        isConnected={true}
      />
    );

    const balanceOfFunction = screen.getByText('balanceOf');
    fireEvent.click(balanceOfFunction);

    expect(screen.getByText(/function: balanceOf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/owner/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /call/i })).toBeInTheDocument();
  });

  it('calls onCallFunction when call button is clicked for view function', async () => {
    render(
      <SmartContractInteraction
        contractAddress={mockContractAddress}
        contractABI={mockContractABI}
        isConnected={true}
        onCallFunction={mockOnCallFunction}
      />
    );

    const balanceOfFunction = screen.getByText('balanceOf');
    fireEvent.click(balanceOfFunction);

    const ownerInput = screen.getByLabelText(/owner/i);
    fireEvent.change(ownerInput, {
      target: { value: '0xabcdef1234567890abcdef1234567890abcdef12' },
    });

    const callButton = screen.getByRole('button', { name: /call/i });
    fireEvent.click(callButton);

    expect(mockOnCallFunction).toHaveBeenCalledWith(
      'balanceOf',
      ['0xabcdef1234567890abcdef1234567890abcdef12'],
      expect.any(Object)
    );
  });

  it('calls onSendTransaction when send button is clicked for nonpayable function', async () => {
    render(
      <SmartContractInteraction
        contractAddress={mockContractAddress}
        contractABI={mockContractABI}
        isConnected={true}
        onSendTransaction={mockOnSendTransaction}
      />
    );

    const transferFunction = screen.getByText('transfer');
    fireEvent.click(transferFunction);

    const toInput = screen.getByLabelText(/to/i);
    fireEvent.change(toInput, { target: { value: '0xabcdef1234567890abcdef1234567890abcdef12' } });

    const amountInput = screen.getByLabelText(/amount/i);
    fireEvent.change(amountInput, { target: { value: '100' } });

    const sendButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(sendButton);

    expect(mockOnSendTransaction).toHaveBeenCalledWith(
      'transfer',
      ['0xabcdef1234567890abcdef1234567890abcdef12', '100'],
      expect.any(Object)
    );
  });

  it('displays transaction result when available', async () => {
    const mockResult = {
      hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      status: 'success',
      blockNumber: 12345678,
      gasUsed: '21000',
    };

    render(
      <SmartContractInteraction
        contractAddress={mockContractAddress}
        contractABI={mockContractABI}
        isConnected={true}
        transactionResult={mockResult}
      />
    );

    expect(screen.getByText(/transaction result/i)).toBeInTheDocument();
    expect(screen.getByText(/hash/i)).toBeInTheDocument();
    expect(screen.getByText(mockResult.hash)).toBeInTheDocument();
    expect(screen.getByText(/status/i)).toBeInTheDocument();
    expect(screen.getByText(mockResult.status)).toBeInTheDocument();
    expect(screen.getByText(/block number/i)).toBeInTheDocument();
    expect(screen.getByText(String(mockResult.blockNumber))).toBeInTheDocument();
    expect(screen.getByText(/gas used/i)).toBeInTheDocument();
    expect(screen.getByText(mockResult.gasUsed)).toBeInTheDocument();
  });

  it('displays function result when available', async () => {
    const mockFunctionResult = '1000000000000000000';

    render(
      <SmartContractInteraction
        contractAddress={mockContractAddress}
        contractABI={mockContractABI}
        isConnected={true}
        functionResult={mockFunctionResult}
      />
    );

    expect(screen.getByText(/function result/i)).toBeInTheDocument();
    expect(screen.getByText(mockFunctionResult)).toBeInTheDocument();
  });

  it('calls onDisconnect when disconnect button is clicked', () => {
    render(
      <SmartContractInteraction
        contractAddress={mockContractAddress}
        contractABI={mockContractABI}
        isConnected={true}
        onDisconnect={mockOnDisconnect}
      />
    );

    const disconnectButton = screen.getByRole('button', { name: /disconnect/i });
    fireEvent.click(disconnectButton);

    expect(mockOnDisconnect).toHaveBeenCalled();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Failed to connect to contract';

    render(<SmartContractInteraction error={errorMessage} />);

    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
