import React, { useState, useEffect } from 'react';
import { Button, Card } from '@smolitux/core';

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener: (event: string, handler: (...args: unknown[]) => void) => void;
}

export interface WalletConnectProps {
  /** Callback bei erfolgreicher Verbindung */
  onConnect: (address: string, provider: EthereumProvider) => void;
  /** Callback bei Trennung der Verbindung */
  onDisconnect: () => void;
  /** Unterstützte Wallet-Typen */
  supportedWallets?: string[];
  /** Zusätzliche CSS-Klassen */
  className?: string;
}

/**
 * WalletConnect-Komponente für die Verbindung mit Krypto-Wallets
 */
export const WalletConnect: React.FC<WalletConnectProps> = ({
  onConnect,
  onDisconnect,
  supportedWallets = ['metamask', 'walletconnect'],
  className = '',
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showWalletOptions, setShowWalletOptions] = useState(false);

  // Prüfen, ob Ethereum verfügbar ist
  const ethereum =
    typeof window !== 'undefined'
      ? (window as unknown as { ethereum?: EthereumProvider }).ethereum
      : undefined;
  const isEthereumAvailable = Boolean(ethereum);

  // Verbindungsstatus beim Laden prüfen
  useEffect(() => {
    const checkConnection = async () => {
      if (isEthereumAvailable) {
        try {
          const accounts = await ethereum!.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setIsConnected(true);
            onConnect(accounts[0], ethereum!);
          }
        } catch (err) {
          console.error('Fehler beim Prüfen der Verbindung:', err);
        }
      }
    };

    checkConnection();
  }, [isEthereumAvailable, onConnect]);

  // Ethereum-Events überwachen
  useEffect(() => {
    if (isEthereumAvailable) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // Benutzer hat die Verbindung getrennt
          setIsConnected(false);
          setWalletAddress(null);
          onDisconnect();
        } else {
          // Benutzer hat das Konto gewechselt
          setWalletAddress(accounts[0]);
          setIsConnected(true);
          onConnect(accounts[0], ethereum!);
        }
      };

      const handleChainChanged = () => {
        // Seite neu laden, wenn sich die Chain ändert
        window.location.reload();
      };

      ethereum!.on('accountsChanged', handleAccountsChanged);
      ethereum!.on('chainChanged', handleChainChanged);

      return () => {
        ethereum!.removeListener('accountsChanged', handleAccountsChanged);
        ethereum!.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [isEthereumAvailable, onConnect, onDisconnect]);

  // Mit MetaMask verbinden
  const connectMetaMask = async () => {
    if (!isEthereumAvailable) {
      setError(
        'MetaMask ist nicht installiert. Bitte installieren Sie MetaMask und versuchen Sie es erneut.'
      );
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const accounts = await ethereum!.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
      setIsConnected(true);
      onConnect(accounts[0], ethereum!);
    } catch (err) {
      console.error('Fehler beim Verbinden mit MetaMask:', err);
      setError('Verbindung mit MetaMask fehlgeschlagen. Bitte versuchen Sie es erneut.');
    } finally {
      setIsConnecting(false);
      setShowWalletOptions(false);
    }
  };

  // Mit WalletConnect verbinden
  const connectWalletConnect = async () => {
    setError('WalletConnect-Integration ist noch nicht implementiert.');
    setShowWalletOptions(false);
  };

  // Verbindung trennen
  const disconnect = () => {
    setIsConnected(false);
    setWalletAddress(null);
    onDisconnect();
  };

  // Wallet-Adresse formatieren
  const formatAddress = (address: string): string => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className={className} data-testid="wallet-connect">
      {isConnected ? (
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span>{formatAddress(walletAddress!)}</span>
          </div>

          <Button variant="outline" size="sm" onClick={disconnect}>
            Trennen
          </Button>
        </div>
      ) : (
        <div>
          {showWalletOptions ? (
            <Card className="p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Wallet verbinden
              </h3>

              <div className="space-y-2">
                {supportedWallets.includes('metamask') && (
                  <button
                    onClick={connectMetaMask}
                    disabled={isConnecting}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      <img
                        src="https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg"
                        alt="MetaMask"
                        className="w-8 h-8 mr-3"
                      />
                      <span className="font-medium">MetaMask</span>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )}

                {supportedWallets.includes('walletconnect') && (
                  <button
                    onClick={connectWalletConnect}
                    disabled={isConnecting}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      <img
                        src="https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Icon/Blue%20(Default)/Icon.svg"
                        alt="WalletConnect"
                        className="w-8 h-8 mr-3"
                      />
                      <span className="font-medium">WalletConnect</span>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {error && (
                <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" onClick={() => setShowWalletOptions(false)}>
                  Abbrechen
                </Button>
              </div>
            </Card>
          ) : (
            <Button variant="primary" onClick={() => setShowWalletOptions(true)}>
              Wallet verbinden
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
