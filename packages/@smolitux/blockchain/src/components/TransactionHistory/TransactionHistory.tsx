import React, { useState } from 'react';
import { Card, Button } from '@smolitux/core';

export type TransactionType = 'all' | 'send' | 'receive' | 'stake' | 'unstake' | 'reward' | 'fee';

export interface Transaction {
  /** Eindeutige ID der Transaktion */
  id: string;
  /** Hash der Transaktion */
  hash: string;
  /** Typ der Transaktion */
  type: 'send' | 'receive' | 'stake' | 'unstake' | 'reward' | 'fee';
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

export interface TransactionHistoryProps {
  /** Transaktionen */
  transactions: Transaction[];
  /** Anzahl der Transaktionen pro Seite */
  pageSize?: number;
  /** Callback beim Klicken auf eine Transaktion */
  onTransactionClick?: (transaction: Transaction) => void;
  /** Callback beim Filtern der Transaktionen */
  onFilter?: (type: TransactionType) => void;
  /** Callback beim Ändern der Seite */
  onPageChange?: (page: number) => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Ist die Komponente im Ladezustand? */
  loading?: boolean;
}

/**
 * TransactionHistory-Komponente für die Anzeige von Blockchain-Transaktionen
 */
export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
  pageSize = 10,
  onTransactionClick,
  onFilter,
  onPageChange,
  className = '',
  loading = false,
}) => {
  const [activeType, setActiveType] = useState<TransactionType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedTransaction, setExpandedTransaction] = useState<string | null>(null);
  
  // Gesamtanzahl der Seiten
  const totalPages = Math.ceil(transactions.length / pageSize);
  
  // Transaktionen für die aktuelle Seite
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  // Typ-Filter ändern
  const handleTypeChange = (type: TransactionType) => {
    setActiveType(type);
    setCurrentPage(1);
    
    if (onFilter) {
      onFilter(type);
    }
  };
  
  // Seite ändern
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    
    if (onPageChange) {
      onPageChange(page);
    }
  };
  
  // Transaktion ein-/ausklappen
  const toggleTransaction = (transactionId: string) => {
    setExpandedTransaction(expandedTransaction === transactionId ? null : transactionId);
  };
  
  // Transaktion anklicken
  const handleTransactionClick = (transaction: Transaction) => {
    if (onTransactionClick) {
      onTransactionClick(transaction);
    } else {
      toggleTransaction(transaction.id);
    }
  };
  
  // Zeitpunkt formatieren
  const formatTimestamp = (timestamp: Date): string => {
    return new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(timestamp);
  };
  
  // Adresse formatieren
  const formatAddress = (address: string): string => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  // Icon für Transaktionstyp
  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'send':
        return (
          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 text-red-500 dark:text-red-400 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
        );
      case 'receive':
        return (
          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 text-green-500 dark:text-green-400 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        );
      case 'stake':
        return (
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        );
      case 'unstake':
        return (
          <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-500 dark:text-yellow-400 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        );
      case 'reward':
        return (
          <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-500 dark:text-purple-400 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'fee':
        return (
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };
  
  // Status-Badge
  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400">
            Ausstehend
          </span>
        );
      case 'confirmed':
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
            Bestätigt
          </span>
        );
      case 'failed':
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400">
            Fehlgeschlagen
          </span>
        );
      default:
        return null;
    }
  };
  
  // Platzhalter für den Ladezustand
  const renderPlaceholders = () => {
    return Array.from({ length: pageSize }).map((_, index) => (
      <div key={`placeholder-${index}`} className="p-4 border-b border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="ml-4 flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          </div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
        </div>
      </div>
    ));
  };
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Transaktionshistorie
        </h3>
        
        <div className="flex space-x-2">
          <button
            onClick={() => handleTypeChange('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              activeType === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Alle
          </button>
          <button
            onClick={() => handleTypeChange('send')}
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              activeType === 'send'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Gesendet
          </button>
          <button
            onClick={() => handleTypeChange('receive')}
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              activeType === 'receive'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Empfangen
          </button>
          <button
            onClick={() => handleTypeChange('reward')}
            className={`hidden sm:block px-3 py-1 rounded-full text-xs font-medium ${
              activeType === 'reward'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Belohnungen
          </button>
        </div>
      </div>
      
      {/* Transaktionsliste */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {loading ? (
          renderPlaceholders()
        ) : paginatedTransactions.length === 0 ? (
          <div className="py-12 text-center text-gray-500 dark:text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg font-medium">Keine Transaktionen gefunden</p>
            <p className="mt-2">Es wurden keine Transaktionen für die ausgewählten Filter gefunden.</p>
          </div>
        ) : (
          paginatedTransactions.map(transaction => (
            <div key={transaction.id} className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Transaktionsübersicht */}
              <div
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
                onClick={() => handleTransactionClick(transaction)}
              >
                <div className="flex items-center">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  
                  {/* Informationen */}
                  <div className="ml-4 flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {transaction.type === 'send' && 'Gesendet'}
                          {transaction.type === 'receive' && 'Empfangen'}
                          {transaction.type === 'stake' && 'Gestaked'}
                          {transaction.type === 'unstake' && 'Unstaked'}
                          {transaction.type === 'reward' && 'Belohnung'}
                          {transaction.type === 'fee' && 'Gebühr'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {formatTimestamp(transaction.timestamp)}
                        </p>
                      </div>
                      
                      <div className="mt-2 sm:mt-0 flex items-center">
                        <p className={`text-sm font-medium ${
                          transaction.type === 'send' || transaction.type === 'fee'
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-green-600 dark:text-green-400'
                        }`}>
                          {transaction.type === 'send' || transaction.type === 'fee' ? '-' : '+'}
                          {transaction.amount} {transaction.tokenSymbol}
                        </p>
                        <div className="ml-3">
                          {getStatusBadge(transaction.status)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex flex-col sm:flex-row sm:items-center text-xs text-gray-500 dark:text-gray-400">
                      <p className="flex items-center">
                        <span className="font-medium mr-1">Von:</span>
                        {formatAddress(transaction.from)}
                      </p>
                      <svg className="hidden sm:block w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      <p className="flex items-center mt-1 sm:mt-0">
                        <span className="font-medium mr-1">An:</span>
                        {formatAddress(transaction.to)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Pfeil */}
                  <div className="ml-4">
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        expandedTransaction === transaction.id ? 'transform rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Erweiterte Transaktionsdetails */}
              {expandedTransaction === transaction.id && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Transaktionsdetails
                      </h4>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Hash:</span>
                          <span className="text-xs text-gray-700 dark:text-gray-300 font-mono">
                            {formatAddress(transaction.hash)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Netzwerk:</span>
                          <span className="text-xs text-gray-700 dark:text-gray-300">
                            {transaction.network}
                          </span>
                        </div>
                        
                        {transaction.blockNumber && (
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Block:</span>
                            <span className="text-xs text-gray-700 dark:text-gray-300">
                              {transaction.blockNumber}
                            </span>
                          </div>
                        )}
                        
                        {transaction.confirmations !== undefined && (
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Bestätigungen:</span>
                            <span className="text-xs text-gray-700 dark:text-gray-300">
                              {transaction.confirmations}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Gebühren
                      </h4>
                      
                      <div className="space-y-2">
                        {transaction.gasUsed && (
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Gas verwendet:</span>
                            <span className="text-xs text-gray-700 dark:text-gray-300">
                              {transaction.gasUsed}
                            </span>
                          </div>
                        )}
                        
                        {transaction.gasPrice && (
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Gas-Preis:</span>
                            <span className="text-xs text-gray-700 dark:text-gray-300">
                              {transaction.gasPrice}
                            </span>
                          </div>
                        )}
                        
                        {transaction.gasFee && (
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Gesamtgebühr:</span>
                            <span className="text-xs text-gray-700 dark:text-gray-300">
                              {transaction.gasFee}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {transaction.note && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Notiz
                      </h4>
                      <p className="text-xs text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        {transaction.note}
                      </p>
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://etherscan.io/tx/${transaction.hash}`, '_blank')}
                    >
                      Im Explorer anzeigen
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      {/* Paginierung */}
      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Zurück
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Weiter
            </Button>
          </div>
          
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Seite <span className="font-medium">{currentPage}</span> von{' '}
                <span className="font-medium">{totalPages}</span>
              </p>
            </div>
            
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium ${
                    currentPage === 1
                      ? 'text-gray-300 dark:text-gray-600'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="sr-only">Zurück</span>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {Array.from({ length: totalPages }).map((_, index) => {
                  const page = index + 1;
                  const isCurrentPage = page === currentPage;
                  
                  // Zeige nur die aktuelle Seite, die erste und letzte Seite und die Seiten um die aktuelle Seite herum an
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          isCurrentPage
                            ? 'z-10 bg-primary-50 dark:bg-primary-900/20 border-primary-500 dark:border-primary-500 text-primary-600 dark:text-primary-400'
                            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                  
                  // Zeige Auslassungspunkte an
                  if (
                    (page === 2 && currentPage > 3) ||
                    (page === totalPages - 1 && currentPage < totalPages - 2)
                  ) {
                    return (
                      <span
                        key={page}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        ...
                      </span>
                    );
                  }
                  
                  return null;
                })}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium ${
                    currentPage === totalPages
                      ? 'text-gray-300 dark:text-gray-600'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="sr-only">Weiter</span>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};