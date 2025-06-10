// 🔧 TODO [Codex]: Tests fehlen – prüfen & umsetzen
// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React from 'react';
import { Card } from '@smolitux/core';
import { TokenInfo } from '../../types';

export interface TokenDisplayProps {
  /** Token-Informationen */
  token: TokenInfo;
  /** Zusätzliche Informationen anzeigen */
  showDetails?: boolean;
  /** Callback beim Klicken auf den Token */
  onClick?: (token: TokenInfo) => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
}

/**
 * TokenDisplay-Komponente für die Anzeige von Token-Informationen
 */
export const TokenDisplay: React.FC<TokenDisplayProps> = ({
  token,
  showDetails = false,
  onClick,
  className = '',
}) => {
  const { symbol, name, balance, valueUSD, logoUrl, address } = token;

  // Token-Adresse formatieren
  const formatAddress = (addr: string): string => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  // Wert formatieren
  const formatValue = (value: number): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleClick = () => {
    if (onClick) {
      onClick(token);
    }
  };

  return (
    <Card
      className={`p-4 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`}
      onClick={onClick ? handleClick : undefined}
    >
      <div className="flex items-center">
        {/* Token-Logo */}
        <div className="flex-shrink-0 mr-4">
          {logoUrl ? (
            <img src={logoUrl} alt={`${name} Logo`} className="w-12 h-12 rounded-full" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold text-lg">
              {symbol.substring(0, 2)}
            </div>
          )}
        </div>

        {/* Token-Informationen */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {symbol}
            </h3>
            <span className="text-lg font-medium text-gray-900 dark:text-white">{balance}</span>
          </div>

          <div className="flex items-center justify-between mt-1">
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{name}</p>
            {valueUSD !== undefined && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{formatValue(valueUSD)}</p>
            )}
          </div>
        </div>
      </div>

      {/* Zusätzliche Details */}
      {showDetails && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Token-Adresse</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {formatAddress(address)}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Netzwerk</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Ethereum</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
