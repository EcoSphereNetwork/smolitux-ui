import type { Meta, StoryObj } from '@storybook/react';
import { WalletConnect } from './WalletConnect';

const meta: Meta<typeof WalletConnect> = {
  title: 'Components/WalletConnect',
  component: WalletConnect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'WalletConnect',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom WalletConnect',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive WalletConnect',
    onClick: () => alert('Clicked!'),
  },
};
