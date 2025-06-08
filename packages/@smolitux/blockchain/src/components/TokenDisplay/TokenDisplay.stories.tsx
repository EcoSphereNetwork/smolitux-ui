import type { Meta, StoryObj } from '@storybook/react';
import { TokenDisplay } from './TokenDisplay';

const meta: Meta<typeof TokenDisplay> = {
  title: 'Components/TokenDisplay',
  component: TokenDisplay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'TokenDisplay',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom TokenDisplay',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive TokenDisplay',
    onClick: () => alert('Clicked!'),
  },
};
