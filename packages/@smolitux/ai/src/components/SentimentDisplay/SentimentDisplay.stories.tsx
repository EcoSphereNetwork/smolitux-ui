import type { Meta, StoryObj } from '@storybook/react';
import { SentimentDisplay } from './SentimentDisplay';

const meta: Meta<typeof SentimentDisplay> = {
  title: 'Components/SentimentDisplay',
  component: SentimentDisplay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'SentimentDisplay',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom SentimentDisplay',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive SentimentDisplay',
    onClick: () => alert('Clicked!'),
  },
};
