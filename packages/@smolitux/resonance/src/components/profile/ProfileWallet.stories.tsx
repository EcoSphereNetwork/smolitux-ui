import type { Meta, StoryObj } from '@storybook/react';
import { ProfileWallet } from './ProfileWallet';

const meta: Meta<typeof ProfileWallet> = {
  title: 'Components/ProfileWallet',
  component: ProfileWallet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'ProfileWallet',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom ProfileWallet',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive ProfileWallet',
    onClick: () => alert('Clicked!'),
  },
};
