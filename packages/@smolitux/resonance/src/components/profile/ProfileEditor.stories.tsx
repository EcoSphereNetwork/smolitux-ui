import type { Meta, StoryObj } from '@storybook/react';
import { ProfileEditor } from './ProfileEditor';

const meta: Meta<typeof ProfileEditor> = {
  title: 'Components/ProfileEditor',
  component: ProfileEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'ProfileEditor',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom ProfileEditor',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive ProfileEditor',
    onClick: () => alert('Clicked!'),
  },
};
