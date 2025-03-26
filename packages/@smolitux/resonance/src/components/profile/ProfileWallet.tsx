import React from 'react';
import { Box, Flex, Text, Grid } from '@smolitux/utils/src/components/primitives';
import { Card, Button } from '@smolitux/utils/src/components/patterns';

export interface ProfileWalletProps {
  /** Wallet-Adresse */
  address: string;
  /** Token-Guthaben */
  balance: number;
  /** Token-Symbol */
  tokenSymbol: string;
  /** Transaktionshistorie */
  transactions: {
    id: string;
    type: 'send' | 'receive' | 'stake' | 'unstake' | 'reward';
    amount: number;
    timestamp: string;
    counterparty?: string;
    status: 'pending' | 'completed' | 'failed';
  }[];
  /** Ob die Daten geladen werden */
  isLoading?: boolean;
  /** Callback für Senden */
  onSend?: () => void;
  /** Callback für Empfangen */
  onReceive?: () => void;
  /** Callback für Staking */
  onStake?: () => void;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
}

/**
 * ProfileWallet-Komponente für die Anzeige von Wallet-Informationen.
 */
export const ProfileWallet: React.FC<ProfileWalletProps> = ({
  address,
  balance,
  tokenSymbol,
  transactions,
  isLoading = false,
  onSend,
  onReceive,
  onStake,
  className = '',
  style,
}) => {
  const formatAddress = (addr: string) => {
    if (addr.length <= 12) return addr;
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 6)}`;
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'send':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17l10-10M7 7h10v10" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'receive':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 7L7 17M17 17H7V7" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'stake':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2v20M2 12h20" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'unstake':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12h14" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'reward':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15l-3-3m0 0l3-3m-3 3h6M7 20h10a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'send':
        return '#ef4444';
      case 'receive':
        return '#10b981';
      case 'stake':
        return '#3b82f6';
      case 'unstake':
        return '#f59e0b';
      case 'reward':
        return '#8b5cf6';
      default:
        return '#6b7280';
    }
  };

  const getTransactionLabel = (type: string) => {
    switch (type) {
      case 'send':
        return 'Sent';
      case 'receive':
        return 'Received';
      case 'stake':
        return 'Staked';
      case 'unstake':
        return 'Unstaked';
      case 'reward':
        return 'Reward';
      default:
        return type;
    }
  };

  return (
    <Box
      className={`profile-wallet ${className}`}
      style={{
        ...style,
      }}
    >
      <Card style={{ marginBottom: '16px' }}>
        <Box style={{ padding: '16px' }}>
          <Text size="sm" color="#6b7280" style={{ marginBottom: '4px' }}>Wallet Address</Text>
          <Flex align="center" style={{ marginBottom: '16px' }}>
            <Text style={{ marginRight: '8px' }}>{formatAddress(address)}</Text>
            <Box 
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigator.clipboard.writeText(address);
                alert('Address copied to clipboard');
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Box>
          </Flex>
          
          <Text size="sm" color="#6b7280" style={{ marginBottom: '4px' }}>Balance</Text>
          <Text size="xl" weight="bold" style={{ marginBottom: '16px' }}>
            {balance} {tokenSymbol}
          </Text>
          
          <Flex>
            <Button 
              variant="outline" 
              onClick={onSend}
              style={{ marginRight: '8px' }}
            >
              Send
            </Button>
            <Button 
              variant="outline" 
              onClick={onReceive}
              style={{ marginRight: '8px' }}
            >
              Receive
            </Button>
            <Button 
              variant="outline" 
              onClick={onStake}
            >
              Stake
            </Button>
          </Flex>
        </Box>
      </Card>
      
      <Box>
        <Text weight="bold" style={{ marginBottom: '12px' }}>Transaction History</Text>
        
        {isLoading ? (
          <Card>
            {[1, 2, 3].map(i => (
              <Box key={i} style={{ padding: '12px 16px', borderBottom: i < 3 ? '1px solid #e5e7eb' : 'none' }}>
                <Flex justify="space-between" style={{ marginBottom: '8px' }}>
                  <Box
                    style={{
                      width: '100px',
                      height: '16px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                    }}
                  />
                  <Box
                    style={{
                      width: '80px',
                      height: '16px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                    }}
                  />
                </Flex>
                <Box
                  style={{
                    width: '150px',
                    height: '12px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                  }}
                />
              </Box>
            ))}
          </Card>
        ) : transactions.length === 0 ? (
          <Card>
            <Box style={{ padding: '32px 16px', textAlign: 'center' }}>
              <Text color="#6b7280">No transactions yet</Text>
            </Box>
          </Card>
        ) : (
          <Card>
            {transactions.map((transaction, index) => (
              <Box 
                key={transaction.id} 
                style={{ 
                  padding: '12px 16px', 
                  borderBottom: index < transactions.length - 1 ? '1px solid #e5e7eb' : 'none',
                }}
              >
                <Flex justify="space-between" style={{ marginBottom: '4px' }}>
                  <Flex align="center">
                    <Box style={{ marginRight: '8px' }}>
                      {getTransactionIcon(transaction.type)}
                    </Box>
                    <Text weight="medium">
                      {getTransactionLabel(transaction.type)}
                    </Text>
                  </Flex>
                  <Text 
                    weight="medium"
                    color={transaction.type === 'send' || transaction.type === 'unstake' ? '#ef4444' : '#10b981'}
                  >
                    {transaction.type === 'send' || transaction.type === 'unstake' ? '-' : '+'}{transaction.amount} {tokenSymbol}
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Text size="sm" color="#6b7280">
                    {formatDate(transaction.timestamp)}
                  </Text>
                  <Text 
                    size="sm" 
                    color={
                      transaction.status === 'completed' ? '#10b981' : 
                      transaction.status === 'pending' ? '#f59e0b' : '#ef4444'
                    }
                  >
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </Text>
                </Flex>
                {transaction.counterparty && (
                  <Text size="sm" color="#6b7280">
                    {transaction.type === 'send' ? 'To: ' : 'From: '}{formatAddress(transaction.counterparty)}
                  </Text>
                )}
              </Box>
            ))}
          </Card>
        )}
      </Box>
    </Box>
  );
};