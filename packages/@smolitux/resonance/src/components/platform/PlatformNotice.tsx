import React from 'react';
import { Box, Text } from '../primitives';
import { PlatformInfo } from '../../platform/types';

export interface PlatformNoticeProps {
  /** Informationen zur aktuellen Plattform */
  platform: PlatformInfo;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
}

/**
 * Zeigt einen Hinweis an, wenn die Plattform nicht unterstützt wird.
 */
export const PlatformNotice: React.FC<PlatformNoticeProps> = ({
  platform,
  className = '',
  style,
}) => {
  if (platform.supported) {
    return null;
  }

  return (
    <Box className={`platform-notice ${className}`} style={style} role="alert">
      <Text>{platform.message || 'Unsupported platform'}</Text>
    </Box>
  );
};

export default PlatformNotice;
