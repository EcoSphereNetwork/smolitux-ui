import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileContent } from '../ProfileContent';

const meta: Meta<typeof ProfileContent> = {
  title: 'Resonance/Profile/ProfileContent',
  component: ProfileContent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ProfileContent>;

export const Default: Story = {
  args: { posts: [], isLoading: false },
};
