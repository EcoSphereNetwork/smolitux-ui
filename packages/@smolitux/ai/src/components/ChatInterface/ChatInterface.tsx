import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@smolitux/utils';
import type { AIError } from '../types';
import { useAIEthics } from '../../utils/useAIEthics';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatInterfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  messages: ChatMessage[];
  onSendMessage: (message: string) => Promise<void> | void;
  isStreaming?: boolean;
  streamingMessage?: string;
  aiModel?: string;
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
  onError?: (error: AIError) => void;
  ethicsCheck?: boolean;
}

export const ChatInterface = forwardRef<HTMLDivElement, ChatInterfaceProps>(
  (
    {
      messages,
      onSendMessage,
      isStreaming = false,
      streamingMessage,
      aiModel = 'GPT-4',
      systemPrompt,
      ethicsCheck = true,
      onError,
      className,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { checkForBias } = useAIEthics();

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, streamingMessage]);

    const handleSubmit = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        if (ethicsCheck) {
          try {
            const bias = await checkForBias(inputValue);
            if (bias.severity > 0.7) {
              onError?.({
                type: 'ethics',
                message: 'Content may contain bias',
                details: bias,
              });
              return;
            }
          } catch (error) {
            onError?.({ type: 'ethics', message: 'Bias check failed' });
            return;
          }
        }

        setIsLoading(true);
        try {
          await onSendMessage(inputValue);
          setInputValue('');
        } catch (err) {
          onError?.(err as AIError);
        } finally {
          setIsLoading(false);
        }
      },
      [inputValue, isLoading, ethicsCheck, onSendMessage, onError, checkForBias]
    );

    return (
      <div
        ref={ref}
        className={cn('chat-interface', className)}
        role="log"
        aria-label="AI chat conversation"
        aria-live="polite"
        {...props}
      >
        {systemPrompt && (
          <div className="system-prompt" role="status">
            <span className="sr-only">System instructions: </span>
            {systemPrompt}
          </div>
        )}

        <div className="messages-container">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn('message', msg.role === 'assistant' && 'ai-message')}
            >
              {msg.content}
            </div>
          ))}

          {isStreaming && streamingMessage && (
            <div className="streaming-message" role="status">
              {streamingMessage}
              <span className="typing-indicator" aria-label="AI is typing">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="chat-input-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading || isStreaming}
            className="chat-input"
            aria-label="Chat message input"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading || isStreaming}
            className="send-button"
            aria-label="Send message"
          >
            {isLoading ? 'Sending…' : 'Send'}
          </button>
        </form>

        <div className="ai-info" role="status">
          <span className="sr-only">Using AI model: </span>
          {aiModel}
          {ethicsCheck && (
            <span className="ethics-badge" title="Ethics checking enabled">
              🛡️ Ethics Check
            </span>
          )}
        </div>

        <div className="sr-only" aria-live="polite">
          {isStreaming && 'AI is generating a response'}
          {isLoading && 'Processing your message'}
        </div>
      </div>
    );
  }
);

ChatInterface.displayName = 'ChatInterface';

export default ChatInterface;
