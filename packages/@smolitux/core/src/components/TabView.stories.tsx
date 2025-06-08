import type { Meta, StoryObj } from '@storybook/react';
import { TabView } from './TabView';

const meta: Meta<typeof TabView> = {
  title: 'Components/TabView',
  component: TabView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'TabView',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom TabView',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive TabView',
    onClick: () => alert('Clicked!'),
  },
};
