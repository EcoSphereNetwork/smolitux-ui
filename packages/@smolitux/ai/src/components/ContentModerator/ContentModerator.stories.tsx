import type { Meta, StoryObj } from '@storybook/react';
import { ContentModerator } from './ContentModerator';

const meta: Meta<typeof ContentModerator> = {
  title: 'Components/ContentModerator',
  component: ContentModerator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'ContentModerator',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom ContentModerator',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive ContentModerator',
    onClick: () => alert('Clicked!'),
  },
};
