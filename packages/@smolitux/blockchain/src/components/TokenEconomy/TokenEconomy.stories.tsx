import type { Meta, StoryObj } from '@storybook/react';
import { TokenEconomy } from './TokenEconomy';

const meta: Meta<typeof TokenEconomy> = {
  title: 'Components/TokenEconomy',
  component: TokenEconomy,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'TokenEconomy',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom TokenEconomy',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive TokenEconomy',
    onClick: () => alert('Clicked!'),
  },
};
