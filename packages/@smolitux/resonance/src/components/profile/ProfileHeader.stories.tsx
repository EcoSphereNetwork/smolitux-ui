import type { Meta, StoryObj } from '@storybook/react';
import { ProfileHeader } from './ProfileHeader';

const meta: Meta<typeof ProfileHeader> = {
  title: 'Components/ProfileHeader',
  component: ProfileHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'ProfileHeader',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom ProfileHeader',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive ProfileHeader',
    onClick: () => alert('Clicked!'),
  },
};
