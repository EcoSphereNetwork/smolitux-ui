import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { WalletConnect } from '../';

// Erweitere Jest-Matcher um Barrierefreiheitspruefungen
expect.extend(toHaveNoViolations);

// Mock für window.ethereum
const mockEthereum = {
  request: jest.fn(),
  on: jest.fn(),
  removeListener: jest.fn()
};

describe('WalletConnect Accessibility', () => {
  beforeEach(() => {
    // Mock für window.ethereum
    (window as any).ethereum = mockEthereum;
    
    // Mock für die request-Methode
    mockEthereum.request.mockImplementation((params: { method: string }) => {
      if (params.method === 'eth_accounts') {
        return Promise.resolve([]);
      } else if (params.method === 'eth_requestAccounts') {
        return Promise.resolve(['0x1234567890123456789012345678901234567890']);
      }
      return Promise.reject(new Error('Method not implemented'));
    });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
    delete (window as any).ethereum;
  });
  
  // Test für die Standard-WalletConnect-Komponente
  test('should not have accessibility violations with standard WalletConnect', async () => {
    const handleConnect = jest.fn();
    const handleDisconnect = jest.fn();
    
    const { container } = render(
      <WalletConnect
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  // Test für die A11y-Version der WalletConnect-Komponente
  test('should not have accessibility violations with A11y WalletConnect', async () => {
    const handleConnect = jest.fn();
    const handleDisconnect = jest.fn();
    
    const { container } = render(
      <WalletConnect.A11y
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        ariaLabel="Wallet-Verbindung"
        isLiveRegion={true}
        ariaLive="polite"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  test('should have proper ARIA attributes with A11y WalletConnect', () => {
    const handleConnect = jest.fn();
    const handleDisconnect = jest.fn();
    
    render(
      <WalletConnect.A11y
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        ariaLabel="Wallet-Verbindung"
        isLiveRegion={true}
        ariaLive="polite"
        ariaAtomic={true}
      />
    );
    
    const walletConnect = screen.getByLabelText('Wallet-Verbindung');
    expect(walletConnect).toHaveAttribute('aria-live', 'polite');
    expect(walletConnect).toHaveAttribute('aria-atomic', 'true');
    
    // Screenreader-Ankündigung sollte vorhanden sein
    const announcement = screen.getByText('Wallet nicht verbunden.');
    expect(announcement).toBeInTheDocument();
  });
  
  test('should handle different roles correctly', () => {
    const handleConnect = jest.fn();
    const handleDisconnect = jest.fn();
    
    const { rerender } = render(
      <WalletConnect.A11y
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        ariaLabel="Wallet-Verbindung"
        isRegion={true}
      />
    );
    
    expect(screen.getByRole('region')).toBeInTheDocument();
    
    rerender(
      <WalletConnect.A11y
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        ariaLabel="Wallet-Verbindung"
        isStatus={true}
      />
    );
    
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
  
  test('should handle connect button correctly', () => {
    const handleConnect = jest.fn();
    const handleDisconnect = jest.fn();
    
    render(
      <WalletConnect.A11y
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        ariaLabel="Wallet-Verbindung"
      />
    );
    
    const connectButton = screen.getByLabelText('Wallet verbinden');
    expect(connectButton).toBeInTheDocument();
    
    // Klicke auf den Connect-Button
    fireEvent.click(connectButton);
    
    // Wallet-Optionen sollten angezeigt werden
    const walletOptions = screen.getByText('Wallet verbinden');
    expect(walletOptions).toBeInTheDocument();
    
    // MetaMask-Option sollte vorhanden sein
    const metamaskOption = screen.getByLabelText('Mit MetaMask verbinden');
    expect(metamaskOption).toBeInTheDocument();
    
    // WalletConnect-Option sollte vorhanden sein
    const walletConnectOption = screen.getByLabelText('Mit WalletConnect verbinden');
    expect(walletConnectOption).toBeInTheDocument();
    
    // Abbrechen-Button sollte vorhanden sein
    const cancelButton = screen.getByLabelText('Wallet-Auswahl abbrechen');
    expect(cancelButton).toBeInTheDocument();
  });
  
  test('should handle MetaMask connection correctly', async () => {
    const handleConnect = jest.fn();
    const handleDisconnect = jest.fn();
    
    render(
      <WalletConnect.A11y
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        ariaLabel="Wallet-Verbindung"
        isLiveRegion={true}
      />
    );
    
    // Klicke auf den Connect-Button
    fireEvent.click(screen.getByLabelText('Wallet verbinden'));
    
    // Klicke auf die MetaMask-Option
    fireEvent.click(screen.getByLabelText('Mit MetaMask verbinden'));
    
    // Callback sollte aufgerufen worden sein
    expect(handleConnect).toHaveBeenCalledWith(
      '0x1234567890123456789012345678901234567890',
      expect.anything()
    );
    
    // Verbundener Status sollte angezeigt werden
    const connectedStatus = await screen.findByLabelText('Wallet verbunden: 0x1234...7890');
    expect(connectedStatus).toBeInTheDocument();
    
    // Trennen-Button sollte vorhanden sein
    const disconnectButton = screen.getByLabelText('Wallet-Verbindung trennen');
    expect(disconnectButton).toBeInTheDocument();
    
    // Klicke auf den Trennen-Button
    fireEvent.click(disconnectButton);
    
    // Callback sollte aufgerufen worden sein
    expect(handleDisconnect).toHaveBeenCalled();
  });
  
  test('should handle WalletConnect connection correctly', () => {
    const handleConnect = jest.fn();
    const handleDisconnect = jest.fn();
    
    render(
      <WalletConnect.A11y
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        ariaLabel="Wallet-Verbindung"
        isLiveRegion={true}
      />
    );
    
    // Klicke auf den Connect-Button
    fireEvent.click(screen.getByLabelText('Wallet verbinden'));
    
    // Klicke auf die WalletConnect-Option
    fireEvent.click(screen.getByLabelText('Mit WalletConnect verbinden'));
    
    // Fehlermeldung sollte angezeigt werden
    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toHaveTextContent('WalletConnect-Integration ist noch nicht implementiert.');
  });
  
  test('should handle error state correctly', () => {
    const handleConnect = jest.fn();
    const handleDisconnect = jest.fn();
    
    // Mock für einen Fehler
    mockEthereum.request.mockImplementation(() => {
      return Promise.reject(new Error('User rejected request'));
    });
    
    render(
      <WalletConnect.A11y
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        ariaLabel="Wallet-Verbindung"
        isLiveRegion={true}
      />
    );
    
    // Klicke auf den Connect-Button
    fireEvent.click(screen.getByLabelText('Wallet verbinden'));
    
    // Klicke auf die MetaMask-Option
    fireEvent.click(screen.getByLabelText('Mit MetaMask verbinden'));
    
    // Fehlermeldung sollte angezeigt werden
    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toHaveTextContent('Verbindung mit MetaMask fehlgeschlagen');
  });
});