import type { Meta, StoryObj } from '@storybook/react';
import { FederationStatus } from './FederationStatus';

const meta: Meta<typeof FederationStatus> = {
  title: 'Components/FederationStatus',
  component: FederationStatus,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'FederationStatus',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom FederationStatus',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive FederationStatus',
    onClick: () => alert('Clicked!'),
  },
};
