// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React, { useEffect, useState } from 'react';
import { Card, Button } from '@smolitux/core';
import {
  ProtocolHandlerProps,
  ProtocolConnection,
  SupportedProtocol,
  ProtocolMessage,
} from '../../types';

interface ConnectionState {
  status: ProtocolConnection['status'];
  socket?: WebSocket;
}

export const ProtocolHandler: React.FC<ProtocolHandlerProps> = ({
  protocols,
  onMessage,
  onConnection,
  errorHandling = { retries: 3, retryDelay: 1000 },
  authentication,
  className,
}) => {
  const [connections, setConnections] = useState<Record<string, ConnectionState>>(
    {}
  );

  useEffect(() => {
    protocols.forEach((protocol) => {
      connect(protocol);
    });

    return () => {
      Object.values(connections).forEach((conn) => conn.socket?.close());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [protocols]);

  const connect = (protocol: SupportedProtocol) => {
    const endpoint = protocol.endpoints.find((e) => e.method === 'GET');
    if (!endpoint) return;

    updateConnection(protocol.name, { status: 'connecting' });
    const socket = new WebSocket(endpoint.path);

    socket.onopen = () => {
      updateConnection(protocol.name, { status: 'connected', socket });
      onConnection?.({ protocol: protocol.name, status: 'connected' });
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage?.({ protocol: protocol.name, content: data });
      } catch {
        onMessage?.({ protocol: protocol.name, content: { raw: event.data } });
      }
    };

    socket.onerror = () => {
      updateConnection(protocol.name, { status: 'error' });
      onConnection?.({ protocol: protocol.name, status: 'error' });
      retry(protocol, 1);
    };

    socket.onclose = () => {
      updateConnection(protocol.name, { status: 'disconnected' });
      onConnection?.({ protocol: protocol.name, status: 'disconnected' });
    };
  };

  const retry = (protocol: SupportedProtocol, attempt: number) => {
    if (attempt > (errorHandling.retries || 0)) return;
    setTimeout(() => connect(protocol), errorHandling.retryDelay || 1000);
  };

  const updateConnection = (
    name: SupportedProtocol['name'],
    state: Partial<ConnectionState>
  ) => {
    setConnections((prev) => ({
      ...prev,
      [name]: { ...prev[name], ...state },
    }));
  };

  return (
    <Card className={className} data-testid="protocol-handler">
      <h3 className="font-semibold mb-2">Protocol Connections</h3>
      <ul className="space-y-1">
        {protocols.map((p) => (
          <li key={p.name} className="flex items-center justify-between">
            <span>{p.name}</span>
            <span>{connections[p.name]?.status || 'disconnected'}</span>
          </li>
        ))}
      </ul>
      <div className="mt-2 text-right">
        <Button
          size="sm"
          onClick={() =>
            protocols.forEach((protocol) => connect(protocol))
          }
        >
          Reconnect
        </Button>
      </div>
    </Card>
  );
};

export default ProtocolHandler;
