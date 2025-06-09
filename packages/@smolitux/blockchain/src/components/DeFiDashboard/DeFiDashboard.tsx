import React from 'react';
import { Card, Button } from '@smolitux/core';
import { Box, Flex, Text } from '../primitives';

export interface DeFiAction {
  type: 'stake' | 'unstake' | 'claim' | 'swap' | 'provide_liquidity';
  label: string;
  enabled: boolean;
}

export interface DeFiProtocol {
  name: string;
  chainId: number;
  tvl: string;
  apy: number;
  actions: DeFiAction[];
}

export interface DeFiDashboardProps {
  protocols: DeFiProtocol[];
  filterChain?: number[];
  onAction?: (protocol: DeFiProtocol, action: DeFiAction) => void;
  className?: string;
}

export const DeFiDashboard: React.FC<DeFiDashboardProps> = ({
  protocols,
  filterChain,
  onAction,
  className = '',
}) => {
  const filtered = filterChain && filterChain.length > 0
    ? protocols.filter((p) => filterChain.includes(p.chainId))
    : protocols;

  const handleAction = (protocol: DeFiProtocol, action: DeFiAction) => {
    if (action.enabled && onAction) {
      onAction(protocol, action);
    }
  };

  return (
    <div className={className} role="region" aria-label="DeFi Dashboard">
      {filtered.length === 0 ? (
        <Text>No DeFi protocols available</Text>
      ) : (
        <Flex direction="column" gap={16}>
          {filtered.map((protocol) => (
            <Card key={protocol.name} className="p-4">
              <Flex justify="space-between" align="center">
                <Box>
                  <Text as="h3" style={{ fontWeight: 600 }}>
                    {protocol.name}
                  </Text>
                  <Text size="sm" color="#6b7280">
                    TVL: {protocol.tvl}
                  </Text>
                  <Text size="sm" color="#6b7280">
                    APY: {protocol.apy}%
                  </Text>
                </Box>
                <Flex gap={8}>
                  {protocol.actions.map((action) => (
                    <Button
                      key={action.type}
                      size="sm"
                      disabled={!action.enabled}
                      onClick={() => handleAction(protocol, action)}
                    >
                      {action.label}
                    </Button>
                  ))}
                </Flex>
              </Flex>
            </Card>
          ))}
        </Flex>
      )}
    </div>
  );
};

export default DeFiDashboard;
