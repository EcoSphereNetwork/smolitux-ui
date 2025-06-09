import type { Meta, StoryObj } from '@storybook/react';
import { ChatInterface, ChatMessage } from './ChatInterface';

const meta: Meta<typeof ChatInterface> = {
  title: 'AI/ChatInterface',
  component: ChatInterface,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const baseMessages: ChatMessage[] = [
  { id: '1', role: 'assistant', content: 'Hello, how can I help you?' },
];

export const Default: Story = {
  args: {
    messages: baseMessages,
    onSendMessage: async () => {},
  },
};

export const Streaming: Story = {
  args: {
    messages: baseMessages,
    isStreaming: true,
    streamingMessage: 'Generating answer...'
  },
};

export const ErrorState: Story = {
  args: {
    messages: baseMessages,
    onSendMessage: async () => {
      throw new Error('Failed');
    },
  },
};
