# Smolitux UI - Component Patterns

This document provides patterns and templates for component development in the Smolitux UI component library.

## 📋 Table of Contents

- [Component Structure](#component-structure)
- [Basic Component Pattern](#basic-component-pattern)
- [Form Component Pattern](#form-component-pattern)
- [Interactive Component Pattern](#interactive-component-pattern)
- [Data Display Component Pattern](#data-display-component-pattern)
- [AI Component Pattern](#ai-component-pattern)
- [Blockchain Component Pattern](#blockchain-component-pattern)
- [Test Patterns](#test-patterns)
- [Story Patterns](#story-patterns)

## Component Structure

Each component should follow this structure:

```
Component/
├── Component.tsx              # Main component implementation
├── Component.test.tsx         # Test suite
├── Component.stories.tsx      # Storybook stories
└── index.ts                   # Re-export
```

The `index.ts` file should re-export the component and its types:

```typescript
export * from './Component';
export { default } from './Component';
```

## Basic Component Pattern

The basic component pattern is used for simple components that don't require complex state management.

```typescript
import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

/**
 * Props for the Component
 */
export interface ComponentProps {
  /** Content to display inside the component */
  children?: React.ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
  /** Visual variant of the component */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Size variant of the component */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** ARIA label for accessibility */
  'aria-label'?: string;
}

/**
 * Component description
 */
export const Component = forwardRef<HTMLElement, ComponentProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      disabled = false,
      onClick,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    // CSS classes with conditional logic
    const componentClasses = clsx(
      'component',
      `component--${variant}`,
      `component--${size}`,
      {
        'component--disabled': disabled,
      },
      className
    );

    return (
      <div
        ref={ref}
        className={componentClasses}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        data-testid="Component"
        {...props}
      >
        {children}
      </div>
    );
  }
);

Component.displayName = 'Component';

export default Component;
```

## Form Component Pattern

The form component pattern is used for components that collect user input.

```typescript
import React, { forwardRef, useState, useCallback } from 'react';
import { clsx } from 'clsx';

/**
 * Props for the FormComponent
 */
export interface FormComponentProps {
  /** Input value */
  value?: string;
  /** Default value for uncontrolled usage */
  defaultValue?: string;
  /** Label for the input */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the input is required */
  required?: boolean;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Error message to display */
  error?: string;
  /** Helper text to display */
  helperText?: string;
  /** Additional CSS classes to apply */
  className?: string;
  /** Change event handler */
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Blur event handler */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Focus event handler */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** ARIA described by for accessibility */
  'aria-describedby'?: string;
}

/**
 * FormComponent description
 */
export const FormComponent = forwardRef<HTMLInputElement, FormComponentProps>(
  (
    {
      value,
      defaultValue,
      label,
      placeholder,
      required = false,
      disabled = false,
      error,
      helperText,
      className,
      onChange,
      onBlur,
      onFocus,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    // Internal state for uncontrolled usage
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    
    // Determine if component is controlled or uncontrolled
    const isControlled = value !== undefined;
    const inputValue = isControlled ? value : internalValue;
    
    // Generate unique IDs for accessibility
    const id = props.id || `form-component-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${id}-error` : undefined;
    const helperId = helperText ? `${id}-helper` : undefined;
    const describedBy = [ariaDescribedBy, errorId, helperId].filter(Boolean).join(' ') || undefined;
    
    // Event handlers
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue, event);
      },
      [isControlled, onChange]
    );
    
    // CSS classes
    const componentClasses = clsx(
      'form-component',
      {
        'form-component--disabled': disabled,
        'form-component--error': !!error,
        'form-component--required': required,
      },
      className
    );
    
    return (
      <div className={componentClasses}>
        {label && (
          <label 
            htmlFor={id}
            className="form-component__label"
          >
            {label}
            {required && <span className="form-component__required">*</span>}
          </label>
        )}
        
        <input
          ref={ref}
          id={id}
          className="form-component__input"
          value={inputValue}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
          aria-label={ariaLabel || label}
          aria-describedby={describedBy}
          aria-invalid={!!error}
          data-testid="FormComponent"
          {...props}
        />
        
        {error && (
          <div 
            id={errorId}
            className="form-component__error"
            role="alert"
          >
            {error}
          </div>
        )}
        
        {helperText && !error && (
          <div 
            id={helperId}
            className="form-component__helper"
          >
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

FormComponent.displayName = 'FormComponent';

export default FormComponent;
```

## Interactive Component Pattern

The interactive component pattern is used for components with expandable/collapsible functionality.

```typescript
import React, { forwardRef, useState, useCallback, useEffect } from 'react';
import { clsx } from 'clsx';

/**
 * Props for the InteractiveComponent
 */
export interface InteractiveComponentProps {
  /** Content to display inside the component */
  children?: React.ReactNode;
  /** Whether the component is expanded */
  expanded?: boolean;
  /** Default expanded state for uncontrolled usage */
  defaultExpanded?: boolean;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Additional CSS classes to apply */
  className?: string;
  /** Change event handler */
  onChange?: (expanded: boolean) => void;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Key down event handler */
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** ID of the element that contains the content */
  'aria-controls'?: string;
}

/**
 * InteractiveComponent description
 */
export const InteractiveComponent = forwardRef<HTMLElement, InteractiveComponentProps>(
  (
    {
      children,
      expanded,
      defaultExpanded = false,
      disabled = false,
      className,
      onChange,
      onClick,
      onKeyDown,
      'aria-label': ariaLabel,
      'aria-controls': ariaControls,
      ...props
    },
    ref
  ) => {
    // Internal state for uncontrolled usage
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
    
    // Determine if component is controlled or uncontrolled
    const isControlled = expanded !== undefined;
    const isExpanded = isControlled ? expanded : internalExpanded;
    
    // Generate unique IDs for accessibility
    const id = props.id || `interactive-component-${Math.random().toString(36).substr(2, 9)}`;
    const contentId = ariaControls || `${id}-content`;
    
    // Event handlers
    const handleToggle = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        if (disabled) return;
        
        const newExpanded = !isExpanded;
        
        if (!isControlled) {
          setInternalExpanded(newExpanded);
        }
        
        onChange?.(newExpanded);
        onClick?.(event);
      },
      [disabled, isExpanded, isControlled, onChange, onClick]
    );
    
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        if (disabled) return;
        
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          
          const newExpanded = !isExpanded;
          
          if (!isControlled) {
            setInternalExpanded(newExpanded);
          }
          
          onChange?.(newExpanded);
        }
        
        onKeyDown?.(event);
      },
      [disabled, isExpanded, isControlled, onChange, onKeyDown]
    );
    
    // CSS classes
    const componentClasses = clsx(
      'interactive-component',
      {
        'interactive-component--expanded': isExpanded,
        'interactive-component--disabled': disabled,
      },
      className
    );
    
    return (
      <div className="interactive-component-wrapper">
        <div
          ref={ref}
          id={id}
          className={componentClasses}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          aria-disabled={disabled}
          aria-label={ariaLabel}
          role="button"
          tabIndex={disabled ? -1 : 0}
          data-testid="InteractiveComponent"
          {...props}
        >
          {children}
        </div>
        
        <div
          id={contentId}
          className="interactive-component__content"
          aria-hidden={!isExpanded}
          hidden={!isExpanded}
        >
          {/* Content goes here */}
        </div>
      </div>
    );
  }
);

InteractiveComponent.displayName = 'InteractiveComponent';

export default InteractiveComponent;
```

## Data Display Component Pattern

The data display component pattern is used for components that display data with loading, error, and empty states.

```typescript
import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

/**
 * Props for the DataComponent
 */
export interface DataComponentProps<T = unknown> {
  /** Data to display */
  data: T[];
  /** Function to render each item */
  renderItem?: (item: T, index: number) => React.ReactNode;
  /** Whether the component is loading */
  loading?: boolean;
  /** Error message to display */
  error?: string;
  /** Message to display when data is empty */
  emptyMessage?: string;
  /** Additional CSS classes to apply */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** ARIA live region for accessibility */
  'aria-live'?: 'polite' | 'assertive' | 'off';
}

/**
 * DataComponent description
 */
export const DataComponent = forwardRef<HTMLElement, DataComponentProps>(
  (
    {
      data,
      renderItem,
      loading = false,
      error,
      emptyMessage = 'No data available',
      className,
      'aria-label': ariaLabel,
      'aria-live': ariaLive = 'polite',
      ...props
    },
    ref
  ) => {
    // CSS classes
    const componentClasses = clsx(
      'data-component',
      {
        'data-component--loading': loading,
        'data-component--error': !!error,
        'data-component--empty': !loading && !error && data.length === 0,
      },
      className
    );
    
    // Render content based on state
    const renderContent = () => {
      if (loading) {
        return (
          <div className="data-component__loading" aria-live="polite">
            Loading...
          </div>
        );
      }
      
      if (error) {
        return (
          <div className="data-component__error" role="alert">
            {error}
          </div>
        );
      }
      
      if (data.length === 0) {
        return (
          <div className="data-component__empty">
            {emptyMessage}
          </div>
        );
      }
      
      return (
        <div className="data-component__content">
          {data.map((item, index) => (
            <div key={index} className="data-component__item">
              {renderItem ? renderItem(item, index) : JSON.stringify(item)}
            </div>
          ))}
        </div>
      );
    };
    
    return (
      <div
        ref={ref}
        className={componentClasses}
        aria-label={ariaLabel}
        aria-live={ariaLive}
        aria-busy={loading}
        data-testid="DataComponent"
        {...props}
      >
        {renderContent()}
      </div>
    );
  }
);

DataComponent.displayName = 'DataComponent';

export default DataComponent;
```

## AI Component Pattern

The AI component pattern is used for components that interact with AI services.

```typescript
import React, { forwardRef, useState, useEffect } from 'react';
import { clsx } from 'clsx';

/**
 * Props for the AIComponent
 */
export interface AIComponentProps {
  /** Content to analyze */
  content?: string;
  /** Whether to analyze automatically */
  autoAnalyze?: boolean;
  /** Additional CSS classes to apply */
  className?: string;
  /** Callback when analysis is complete */
  onAnalysisComplete?: (result: AIAnalysisResult) => void;
  /** ARIA label for accessibility */
  'aria-label'?: string;
}

/**
 * Result of AI analysis
 */
export interface AIAnalysisResult {
  /** Sentiment score (-1 to 1) */
  sentiment: number;
  /** Sentiment label */
  sentimentLabel: 'positive' | 'neutral' | 'negative';
  /** Confidence score (0 to 1) */
  confidence: number;
  /** Key entities detected */
  entities: string[];
  /** Key topics detected */
  topics: string[];
}

/**
 * AIComponent description
 */
export const AIComponent = forwardRef<HTMLElement, AIComponentProps>(
  (
    {
      content = '',
      autoAnalyze = false,
      className,
      onAnalysisComplete,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    // State for analysis
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<AIAnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    // Mock AI analysis function
    const analyzeContent = async (text: string): Promise<AIAnalysisResult> => {
      // In a real implementation, this would call an AI service
      return new Promise((resolve) => {
        setTimeout(() => {
          const sentiment = Math.random() * 2 - 1; // -1 to 1
          const confidence = Math.random(); // 0 to 1
          
          resolve({
            sentiment,
            sentimentLabel: sentiment > 0.3 ? 'positive' : sentiment < -0.3 ? 'negative' : 'neutral',
            confidence,
            entities: ['Entity1', 'Entity2'],
            topics: ['Topic1', 'Topic2'],
          });
        }, 1000);
      });
    };
    
    // Handle analysis
    const handleAnalysis = async () => {
      if (!content || analyzing) return;
      
      try {
        setAnalyzing(true);
        setError(null);
        
        const analysisResult = await analyzeContent(content);
        
        setResult(analysisResult);
        onAnalysisComplete?.(analysisResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Analysis failed');
      } finally {
        setAnalyzing(false);
      }
    };
    
    // Auto-analyze when content changes
    useEffect(() => {
      if (autoAnalyze && content) {
        handleAnalysis();
      }
    }, [content, autoAnalyze]);
    
    // CSS classes
    const componentClasses = clsx(
      'ai-component',
      {
        'ai-component--analyzing': analyzing,
        'ai-component--has-result': !!result,
        'ai-component--has-error': !!error,
      },
      className
    );
    
    return (
      <div
        ref={ref}
        className={componentClasses}
        aria-label={ariaLabel}
        aria-busy={analyzing}
        data-testid="AIComponent"
        {...props}
      >
        <div className="ai-component__content">
          {content && (
            <div className="ai-component__input">
              <h3>Content</h3>
              <p>{content}</p>
            </div>
          )}
          
          {!autoAnalyze && (
            <button
              className="ai-component__analyze-button"
              onClick={handleAnalysis}
              disabled={analyzing || !content}
            >
              {analyzing ? 'Analyzing...' : 'Analyze'}
            </button>
          )}
          
          {analyzing && (
            <div className="ai-component__loading" aria-live="polite">
              Analyzing content...
            </div>
          )}
          
          {error && (
            <div className="ai-component__error" role="alert">
              {error}
            </div>
          )}
          
          {result && (
            <div className="ai-component__result" aria-live="polite">
              <h3>Analysis Result</h3>
              <div className="ai-component__sentiment">
                <strong>Sentiment:</strong> {result.sentimentLabel} ({result.sentiment.toFixed(2)})
              </div>
              <div className="ai-component__confidence">
                <strong>Confidence:</strong> {(result.confidence * 100).toFixed(0)}%
              </div>
              <div className="ai-component__entities">
                <strong>Entities:</strong> {result.entities.join(', ')}
              </div>
              <div className="ai-component__topics">
                <strong>Topics:</strong> {result.topics.join(', ')}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

AIComponent.displayName = 'AIComponent';

export default AIComponent;
```

## Blockchain Component Pattern

The blockchain component pattern is used for components that interact with blockchain services.

```typescript
import React, { forwardRef, useState, useEffect, useCallback } from 'react';
import { clsx } from 'clsx';

/**
 * Props for the BlockchainComponent
 */
export interface BlockchainComponentProps {
  /** Whether to connect automatically */
  autoConnect?: boolean;
  /** Additional CSS classes to apply */
  className?: string;
  /** Callback when connection status changes */
  onConnectionChange?: (connected: boolean) => void;
  /** ARIA label for accessibility */
  'aria-label'?: string;
}

/**
 * Wallet information
 */
export interface WalletInfo {
  /** Whether the wallet is connected */
  connected: boolean;
  /** Wallet address */
  address: string;
  /** Wallet balance */
  balance: string;
  /** Network ID */
  networkId: number;
}

/**
 * BlockchainComponent description
 */
export const BlockchainComponent = forwardRef<HTMLElement, BlockchainComponentProps>(
  (
    {
      autoConnect = false,
      className,
      onConnectionChange,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    // State for wallet
    const [connecting, setConnecting] = useState(false);
    const [wallet, setWallet] = useState<WalletInfo | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    // Mock wallet connection function
    const connectWallet = async (): Promise<WalletInfo> => {
      // In a real implementation, this would call a wallet provider
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.2) { // 80% success rate
            resolve({
              connected: true,
              address: '0x742d35Cc6634C0532925a3b8D563d7C0Aae1ce0F',
              balance: '1.5',
              networkId: 1,
            });
          } else {
            reject(new Error('Failed to connect wallet'));
          }
        }, 1000);
      });
    };
    
    // Handle connection
    const handleConnect = useCallback(async () => {
      if (connecting || wallet?.connected) return;
      
      try {
        setConnecting(true);
        setError(null);
        
        const walletInfo = await connectWallet();
        
        setWallet(walletInfo);
        onConnectionChange?.(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Connection failed');
        onConnectionChange?.(false);
      } finally {
        setConnecting(false);
      }
    }, [connecting, wallet, onConnectionChange]);
    
    // Handle disconnection
    const handleDisconnect = useCallback(() => {
      setWallet(null);
      onConnectionChange?.(false);
    }, [onConnectionChange]);
    
    // Auto-connect on mount
    useEffect(() => {
      if (autoConnect) {
        handleConnect();
      }
    }, [autoConnect, handleConnect]);
    
    // Format address for display
    const formatAddress = (address: string): string => {
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };
    
    // CSS classes
    const componentClasses = clsx(
      'blockchain-component',
      {
        'blockchain-component--connecting': connecting,
        'blockchain-component--connected': wallet?.connected,
        'blockchain-component--has-error': !!error,
      },
      className
    );
    
    return (
      <div
        ref={ref}
        className={componentClasses}
        aria-label={ariaLabel}
        aria-busy={connecting}
        data-testid="BlockchainComponent"
        {...props}
      >
        <div className="blockchain-component__content">
          {!wallet?.connected && (
            <button
              className="blockchain-component__connect-button"
              onClick={handleConnect}
              disabled={connecting}
            >
              {connecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}
          
          {connecting && (
            <div className="blockchain-component__loading" aria-live="polite">
              Connecting to wallet...
            </div>
          )}
          
          {error && (
            <div className="blockchain-component__error" role="alert">
              {error}
            </div>
          )}
          
          {wallet?.connected && (
            <div className="blockchain-component__wallet" aria-live="polite">
              <div className="blockchain-component__address">
                <strong>Address:</strong> {formatAddress(wallet.address)}
              </div>
              <div className="blockchain-component__balance">
                <strong>Balance:</strong> {wallet.balance} ETH
              </div>
              <div className="blockchain-component__network">
                <strong>Network:</strong> {wallet.networkId === 1 ? 'Mainnet' : `Network ${wallet.networkId}`}
              </div>
              <button
                className="blockchain-component__disconnect-button"
                onClick={handleDisconnect}
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

BlockchainComponent.displayName = 'BlockchainComponent';

export default BlockchainComponent;
```

## Test Patterns

For test patterns, refer to the [Test Templates](../../prompts/core/test-templates.md) document.

## Story Patterns

For story patterns, refer to the [Story Templates](../../prompts/core/story-templates.md) document.

These patterns provide a solid foundation for component development in the Smolitux UI component library. For package-specific patterns, refer to the [Package-Specific Guidelines](./package-specific/README.md).