import type { Meta, StoryObj } from '@storybook/react';
import { ProtocolHandler } from './ProtocolHandler';
import { SupportedProtocol } from '../../types';

const meta: Meta<typeof ProtocolHandler> = {
  title: 'Federation/ProtocolHandler',
  component: ProtocolHandler,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Handles connections to federation protocols like ActivityPub or Matrix.',
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ProtocolHandler>;

const protocols: SupportedProtocol[] = [
  {
    name: 'ActivityPub',
    version: '1.0',
    capabilities: ['messages', 'search'],
    endpoints: [{ path: 'wss://example.com/ap', method: 'GET' }],
    authentication: ['none'],
  },
  {
    name: 'Matrix',
    version: '1.7',
    capabilities: ['messages', 'presence'],
    endpoints: [{ path: 'wss://example.com/matrix', method: 'GET' }],
    authentication: ['token'],
  },
];

export const Default: Story = {
  args: {
    protocols,
  },
};
