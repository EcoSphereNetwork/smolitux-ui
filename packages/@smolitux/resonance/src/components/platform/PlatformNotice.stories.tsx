import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PlatformNotice } from './PlatformNotice';

const meta: Meta<typeof PlatformNotice> = {
  title: 'Resonance/Platform/PlatformNotice',
  component: PlatformNotice,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PlatformNotice>;

export const Unsupported: Story = {
  args: {
    platform: {
      name: 'LegacyOS',
      supported: false,
      message: 'This platform is not supported',
    },
  },
};
