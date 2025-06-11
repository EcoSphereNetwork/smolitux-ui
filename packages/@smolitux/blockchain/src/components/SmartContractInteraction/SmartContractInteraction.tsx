// 🔧 TODO [Codex]: Tests fehlen – prüfen & umsetzen
// 🔧 TODO [Codex]: forwardRef hinzufügen – prüfen & umsetzen
import React, { useState } from 'react';
import { Card, Button, TabView } from '@smolitux/core';
import { Box, Flex, Text } from '../primitives';

export interface SmartContractMethod {
  /** Methodenname */
  name: string;
  /** Beschreibung */
  description?: string;
  /** Parameter */
  inputs: {
    name: string;
    type: string;
    description?: string;
  }[];
  /** Rückgabewerte */
  outputs: {
    name: string;
    type: string;
    description?: string;
  }[];
  /** Ob die Methode eine Transaktion ist */
  isTransaction: boolean;
  /** Ob die Methode konstant ist */
  isConstant: boolean;
}

export interface SmartContractInteractionProps {
  /** Vertragsadresse */
  contractAddress: string;
  /** Vertragsmethoden */
  methods: SmartContractMethod[];
  /** Ausgewählte Methode */
  selectedMethod?: string;
  /** Callback für Methodenauswahl */
  onSelectMethod?: (methodName: string) => void;
  /** Callback für Methodenaufruf */
  onCallMethod?: (methodName: string, params: unknown[]) => void;
  /** Ob ein Methodenaufruf läuft */
  isLoading?: boolean;
  /** Ergebnis des letzten Methodenaufrufs */
  result?: unknown;
  /** Fehler des letzten Methodenaufrufs */
  error?: string;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Inline-Styles */
  style?: React.CSSProperties;
}

/**
 * SmartContractInteraction-Komponente für die Interaktion mit Smart Contracts.
 * Ermöglicht den Aufruf von Vertragsmethoden und zeigt Ergebnisse an.
 */
export const SmartContractInteraction: React.FC<SmartContractInteractionProps> = ({
  contractAddress,
  methods,
  selectedMethod,
  onSelectMethod,
  onCallMethod,
  isLoading = false,
  result,
  error,
  className = '',
  style,
}) => {
  const [methodParams, setMethodParams] = useState<Record<string, Record<string, unknown>>>({});
  const [activeTab, setActiveTab] = useState<string>('methods');

  const handleParamChange = (methodName: string, paramName: string, value: string) => {
    setMethodParams((prev) => ({
      ...prev,
      [methodName]: {
        ...(prev[methodName] || {}),
        [paramName]: value,
      },
    }));
  };

  const handleCallMethod = (methodName: string) => {
    const method = methods.find((m) => m.name === methodName);
    if (!method) return;

    const params = method.inputs.map((input) => {
      const value = methodParams[methodName]?.[input.name];

      // Convert value based on type
      switch (input.type) {
        case 'uint256':
        case 'int256':
        case 'uint':
        case 'int':
          return value ? parseInt(value, 10) : 0;
        case 'bool':
          return value === 'true';
        case 'address':
        case 'string':
        default:
          return value || '';
      }
    });

    if (onCallMethod) {
      onCallMethod(methodName, params);
    }
  };

  const formatResult = (result: unknown) => {
    if (result === null || result === undefined) {
      return 'No result';
    }

    if (typeof result === 'object') {
      try {
        return JSON.stringify(result, null, 2);
      } catch {
        return 'Complex object';
      }
    }

    return String(result);
  };

  const renderMethodsList = () => (
    <Box>
      <Text weight="medium" style={{ marginBottom: '8px' }}>
        Contract Methods
      </Text>
      <Box
        style={{
          maxHeight: '300px',
          overflowY: 'auto',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
        }}
      >
        {methods.length === 0 ? (
          <Box style={{ padding: '16px', textAlign: 'center' }}>
            <Text color="#6b7280">No methods available</Text>
          </Box>
        ) : (
          methods.map((method) => (
            <Box
              key={method.name}
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid #e5e7eb',
                backgroundColor: selectedMethod === method.name ? '#f3f4f6' : 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => onSelectMethod && onSelectMethod(method.name)}
            >
              <Flex justify="space-between" align="center">
                <Box>
                  <Text weight="medium">{method.name}</Text>
                  {method.description && (
                    <Text size="sm" color="#6b7280">
                      {method.description}
                    </Text>
                  )}
                </Box>
                <Box
                  style={{
                    padding: '4px 8px',
                    borderRadius: '9999px',
                    backgroundColor: method.isTransaction ? '#fee2e2' : '#e0f2fe',
                    color: method.isTransaction ? '#ef4444' : '#3b82f6',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}
                >
                  {method.isTransaction ? 'Transaction' : 'View'}
                </Box>
              </Flex>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );

  const renderMethodDetails = () => {
    const method = methods.find((m) => m.name === selectedMethod);
    if (!method) {
      return (
        <Box style={{ padding: '16px', textAlign: 'center' }}>
          <Text color="#6b7280">Select a method to view details</Text>
        </Box>
      );
    }

    return (
      <Box>
        <Box style={{ marginBottom: '16px' }}>
          <Text weight="bold" size="lg">
            {method.name}
          </Text>
          {method.description && <Text style={{ marginTop: '4px' }}>{method.description}</Text>}
          <Box
            style={{
              display: 'inline-block',
              padding: '4px 8px',
              borderRadius: '9999px',
              backgroundColor: method.isTransaction ? '#fee2e2' : '#e0f2fe',
              color: method.isTransaction ? '#ef4444' : '#3b82f6',
              fontSize: '0.75rem',
              fontWeight: 500,
              marginTop: '8px',
            }}
          >
            {method.isTransaction ? 'Transaction' : 'View'}
          </Box>
        </Box>

        {method.inputs.length > 0 && (
          <Box style={{ marginBottom: '16px' }}>
            <Text weight="medium" style={{ marginBottom: '8px' }}>
              Inputs
            </Text>
            {method.inputs.map((input, index) => (
              <Box key={index} style={{ marginBottom: '12px' }}>
                <Flex align="center" style={{ marginBottom: '4px' }}>
                  <Text weight="medium">{input.name}</Text>
                  <Text size="sm" color="#6b7280" style={{ marginLeft: '8px' }}>
                    {input.type}
                  </Text>
                </Flex>
                {input.description && (
                  <Text size="sm" color="#6b7280" style={{ marginBottom: '4px' }}>
                    {input.description}
                  </Text>
                )}
                <input
                  type="text"
                  placeholder={`Enter ${input.name}`}
                  value={methodParams[method.name]?.[input.name] || ''}
                  onChange={(e) => handleParamChange(method.name, input.name, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb',
                    fontSize: '0.875rem',
                  }}
                  disabled={isLoading}
                />
              </Box>
            ))}
          </Box>
        )}

        {method.outputs.length > 0 && (
          <Box style={{ marginBottom: '16px' }}>
            <Text weight="medium" style={{ marginBottom: '8px' }}>
              Outputs
            </Text>
            {method.outputs.map((output, index) => (
              <Box
                key={index}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '6px',
                  marginBottom: '8px',
                }}
              >
                <Flex align="center">
                  <Text weight="medium">{output.name || `Output ${index + 1}`}</Text>
                  <Text size="sm" color="#6b7280" style={{ marginLeft: '8px' }}>
                    {output.type}
                  </Text>
                </Flex>
                {output.description && (
                  <Text size="sm" color="#6b7280">
                    {output.description}
                  </Text>
                )}
              </Box>
            ))}
          </Box>
        )}

        <Button
          onClick={() => handleCallMethod(method.name)}
          loading={isLoading}
          disabled={isLoading}
          colorScheme={method.isTransaction ? 'danger' : 'primary'}
          fullWidth
        >
          {isLoading
            ? 'Processing...'
            : method.isTransaction
              ? 'Execute Transaction'
              : 'Call Method'}
        </Button>
      </Box>
    );
  };

  const renderResult = () => {
    if (!result && !error) {
      return (
        <Box style={{ padding: '16px', textAlign: 'center' }}>
          <Text color="#6b7280">No result yet</Text>
        </Box>
      );
    }

    return (
      <Box>
        <Text weight="medium" style={{ marginBottom: '8px' }}>
          Result
        </Text>
        {error ? (
          <Box
            style={{
              padding: '12px',
              backgroundColor: '#fee2e2',
              borderRadius: '8px',
              color: '#ef4444',
            }}
          >
            <Text weight="medium">Error</Text>
            <Text>{error}</Text>
          </Box>
        ) : (
          <Box
            style={{
              padding: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '8px',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              overflowX: 'auto',
            }}
          >
            {formatResult(result)}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Card
      className={`smart-contract-interaction ${className}`}
      style={{
        ...style,
      }}
    >
      <Box style={{ padding: '16px' }}>
        <Box style={{ marginBottom: '16px' }}>
          <Text weight="bold" size="xl">
            Smart Contract Interaction
          </Text>
          <Text color="#6b7280">
            Contract: <code>{contractAddress}</code>
          </Text>
        </Box>

        <TabView
          tabs={[
            {
              id: 'methods',
              label: 'Methods',
              content: (
                <Flex style={{ marginTop: '16px' }}>
                  <Box style={{ width: '240px', marginRight: '16px' }}>{renderMethodsList()}</Box>
                  <Box style={{ flex: 1 }}>{renderMethodDetails()}</Box>
                </Flex>
              ),
            },
            {
              id: 'result',
              label: 'Result',
              content: <Box style={{ marginTop: '16px' }}>{renderResult()}</Box>,
            },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </Box>
    </Card>
  );
};
