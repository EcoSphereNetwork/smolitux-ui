export interface EthereumProvider {
  request: <T = unknown>(
    args: { method: string; params?: unknown[] }
  ) => Promise<T>;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener: (event: string, handler: (...args: unknown[]) => void) => void;
}

export interface TokenInfo {
  /** Symbol des Tokens */
  symbol: string;
  /** Name des Tokens */
  name: string;
  /** Token-Guthaben */
  balance: string;
  /** Token-Wert in USD */
  valueUSD?: number;
  /** Token-Logo URL */
  logoUrl?: string;
  /** Token-Adresse */
  address: string;
}

export interface NFTItem {
  /** Token ID */
  tokenId: string;
  /** NFT name */
  name?: string;
  /** Image URL */
  imageUrl?: string;
  /** Description */
  description?: string;
  /** Chain ID */
  chainId?: number;
}

export type TransactionType = 'all' | 'send' | 'receive' | 'stake' | 'unstake' | 'reward' | 'fee';

export interface Transaction {
  /** Eindeutige ID der Transaktion */
  id: string;
  /** Hash der Transaktion */
  hash: string;
  /** Typ der Transaktion */
  type: TransactionType extends 'all' ? never : Exclude<TransactionType, 'all'>;
  /** Betrag der Transaktion */
  amount: string;
  /** Symbol des Tokens */
  tokenSymbol: string;
  /** Absender-Adresse */
  from: string;
  /** Empfänger-Adresse */
  to: string;
  /** Zeitpunkt der Transaktion */
  timestamp: Date;
  /** Status der Transaktion */
  status: 'pending' | 'confirmed' | 'failed';
  /** Netzwerk der Transaktion */
  network: string;
  /** Gaskosten der Transaktion */
  gasUsed?: string;
  /** Gaspreis der Transaktion */
  gasPrice?: string;
  /** Gesamte Gaskosten der Transaktion */
  gasFee?: string;
  /** Block-Nummer der Transaktion */
  blockNumber?: number;
  /** Anzahl der Bestätigungen */
  confirmations?: number;
  /** Notiz zur Transaktion */
  note?: string;
}
