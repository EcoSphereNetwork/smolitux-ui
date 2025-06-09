import type { Meta, StoryObj } from '@storybook/react';
import { ActivityPubViewer } from './ActivityPubViewer';

const meta: Meta<typeof ActivityPubViewer> = {
  title: 'Federation/ActivityPubViewer',
  component: ActivityPubViewer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activity: {
      type: 'Note',
      id: '1',
      actor: 'Alice',
      content: 'Hello world',
      published: new Date().toISOString(),
    },
  },
};
