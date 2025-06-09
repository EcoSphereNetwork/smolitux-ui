import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatInterface, ChatMessage } from './ChatInterface';

const messages: ChatMessage[] = [
  { id: '1', role: 'user', content: 'Hi' },
  { id: '2', role: 'assistant', content: 'Hello' },
];

describe('ChatInterface', () => {
  it('renders messages', () => {
    render(
      <ChatInterface messages={messages} onSendMessage={jest.fn()} />
    );
    expect(screen.getByText('Hi')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('calls onSendMessage', async () => {
    const user = userEvent.setup();
    const handleSend = jest.fn();
    render(
      <ChatInterface messages={messages} onSendMessage={handleSend} />
    );
    await user.type(screen.getByLabelText('Chat message input'), 'test');
    await user.click(screen.getByLabelText('Send message'));
    expect(handleSend).toHaveBeenCalledWith('test');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <ChatInterface messages={messages} onSendMessage={jest.fn()} ref={ref} />
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
