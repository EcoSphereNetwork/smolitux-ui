import type { Meta, StoryObj } from '@storybook/react';
import { ProfileContent } from './ProfileContent';

const meta: Meta<typeof ProfileContent> = {
  title: 'Components/ProfileContent',
  component: ProfileContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'ProfileContent',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom ProfileContent',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive ProfileContent',
    onClick: () => alert('Clicked!'),
  },
};
