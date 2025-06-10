import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SmartContractInteraction, SmartContractMethod } from '../SmartContractInteraction';

describe('SmartContractInteraction', () => {
  const methods: SmartContractMethod[] = [
    { name: 'balanceOf', inputs: [], outputs: [], stateMutability: 'view' },
  ];

  test('renders contract address input', () => {
    render(<SmartContractInteraction contractAddress="" methods={methods} />);
    expect(screen.getByPlaceholderText(/contract address/i)).toBeInTheDocument();
  });

  test('calls onSelectMethod', () => {
    const onSelect = jest.fn();
    render(
      <SmartContractInteraction
        contractAddress="0x123"
        methods={methods}
        onSelectMethod={onSelect}
      />
    );
    fireEvent.click(screen.getByText('balanceOf'));
    expect(onSelect).toHaveBeenCalledWith('balanceOf');
  });
});
