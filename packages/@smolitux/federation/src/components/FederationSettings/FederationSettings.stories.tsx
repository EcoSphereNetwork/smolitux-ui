import type { Meta, StoryObj } from '@storybook/react';
import { FederationSettings } from './FederationSettings';

const meta: Meta<typeof FederationSettings> = {
  title: 'Federation/FederationSettings',
  component: FederationSettings,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    protocols: ['ActivityPub', 'ATProtocol', 'Matrix'],
    enabled: ['ActivityPub'],
    onToggle: () => {},
  },
};
