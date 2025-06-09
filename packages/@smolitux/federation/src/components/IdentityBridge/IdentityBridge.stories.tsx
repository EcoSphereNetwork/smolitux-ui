import type { Meta, StoryObj } from '@storybook/react';
import { IdentityBridge } from './IdentityBridge';

const meta: Meta<typeof IdentityBridge> = {
  title: 'Federation/IdentityBridge',
  component: IdentityBridge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    identities: [
      { platform: 'Mastodon', handle: '@alice@mastodon.social' },
      { platform: 'Matrix', handle: '@alice:matrix.org' },
    ],
  },
};
