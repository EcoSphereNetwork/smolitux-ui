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
    sentiment: {
      positive: 0.6,
      negative: 0.2,
      neutral: 0.2,
    },
    emotions: {
      joy: 0.5,
      sadness: 0.1,
      fear: 0.05,
      anger: 0.05,
      surprise: 0.2,
      disgust: 0.1,
    },
    fetchSentiment: async () => ({
      positive: 0.6,
      negative: 0.2,
      neutral: 0.2,
    }),
  },
};

export const CustomStyle: Story = {
  args: {
    sentiment: {
      positive: 0.3,
      negative: 0.4,
      neutral: 0.3,
    },
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    sentiment: {
      positive: 0.8,
      negative: 0.1,
      neutral: 0.1,
    },
    fetchSentiment: async () => ({
      positive: 0.8,
      negative: 0.1,
      neutral: 0.1,
    }),
  },
};
