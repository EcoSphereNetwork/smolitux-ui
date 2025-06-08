import type { Meta, StoryObj } from '@storybook/react';
import { RecommendationCarousel } from './RecommendationCarousel';

const meta: Meta<typeof RecommendationCarousel> = {
  title: 'Components/RecommendationCarousel',
  component: RecommendationCarousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'RecommendationCarousel',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom RecommendationCarousel',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive RecommendationCarousel',
    onClick: () => alert('Clicked!'),
  },
};
