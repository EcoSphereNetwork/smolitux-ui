import React from 'react';
import { Card, Button } from '@smolitux/core';
import { Box, Flex, Text } from '../primitives';

export interface PlatformIntegrationProps {
  /** Name of the external platform */
  platformName: string;
  /** Whether the platform is already connected */
  isConnected?: boolean;
  /** Triggered when the user wants to connect */
  onConnect?: () => void;
  /** Triggered when the user wants to disconnect */
  onDisconnect?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

/**
 * PlatformIntegration component allows connecting or disconnecting a third-party platform.
 */
export const PlatformIntegration: React.FC<PlatformIntegrationProps> = ({
  platformName,
  isConnected = false,
  onConnect,
  onDisconnect,
  className = '',
  style,
}) => (
  <Card className={`platform-integration ${className}`} style={style}>
    <Box style={{ padding: '16px', textAlign: 'center' }}>
      <Text weight="bold" size="lg">
        {isConnected ? `Connected to ${platformName}` : `Connect to ${platformName}`}
      </Text>
      <Box style={{ marginTop: '12px' }}>
        <Button
          onClick={isConnected ? onDisconnect : onConnect}
          variant={isConnected ? 'secondary' : 'primary'}
        >
          {isConnected ? 'Disconnect' : 'Connect'}
        </Button>
      </Box>
    </Box>
  </Card>
);

PlatformIntegration.displayName = 'PlatformIntegration';

export default PlatformIntegration;
