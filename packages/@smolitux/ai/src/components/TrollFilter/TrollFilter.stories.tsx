import type { Meta, StoryObj } from '@storybook/react';
import { TrollFilter } from './TrollFilter';

const meta: Meta<typeof TrollFilter> = {
  title: 'Components/TrollFilter',
  component: TrollFilter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'TrollFilter',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom TrollFilter',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive TrollFilter',
    onClick: () => alert('Clicked!'),
  },
};
