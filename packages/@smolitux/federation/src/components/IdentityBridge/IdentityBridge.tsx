import React from 'react';
import { Card, Button } from '@smolitux/core';

export interface LinkedIdentity {
  platform: string;
  handle: string;
}

export interface IdentityBridgeProps {
  identities: LinkedIdentity[];
  onUnlink?: (platform: string) => void;
  className?: string;
}

export const IdentityBridge: React.FC<IdentityBridgeProps> = ({ identities, onUnlink, className }) => {
  return (
    <Card className={className} data-testid="identity-bridge">
      <h3 className="font-semibold mb-2">Linked Identities</h3>
      <ul className="space-y-1">
        {identities.map((id) => (
          <li key={id.platform} className="flex items-center justify-between">
            <span>{id.platform}: {id.handle}</span>
            {onUnlink && (
              <Button size="sm" onClick={() => onUnlink(id.platform)}>
                Unlink
              </Button>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default IdentityBridge;
