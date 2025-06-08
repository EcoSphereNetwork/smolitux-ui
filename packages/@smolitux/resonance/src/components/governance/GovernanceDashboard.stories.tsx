import type { Meta, StoryObj } from '@storybook/react';
import { GovernanceDashboard } from './GovernanceDashboard';

const meta: Meta<typeof GovernanceDashboard> = {
  title: 'Components/GovernanceDashboard',
  component: GovernanceDashboard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'GovernanceDashboard',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom GovernanceDashboard',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive GovernanceDashboard',
    onClick: () => alert('Clicked!'),
  },
};
