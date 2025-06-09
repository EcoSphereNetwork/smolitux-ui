import type { Meta, StoryObj } from '@storybook/react';
import { PlatformIntegration } from './PlatformIntegration';

const meta: Meta<typeof PlatformIntegration> = {
  title: 'Resonance/PlatformIntegration',
  component: PlatformIntegration,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof PlatformIntegration>;

export const Default: Story = {
  args: {
    platformName: 'EcoSphere',
  },
};

export const Connected: Story = {
  args: {
    platformName: 'EcoSphere',
    isConnected: true,
  },
};
