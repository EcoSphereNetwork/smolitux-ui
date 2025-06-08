import type { Meta, StoryObj } from '@storybook/react';
import { SmartContractInteraction } from './SmartContractInteraction';

const meta: Meta<typeof SmartContractInteraction> = {
  title: 'Components/SmartContractInteraction',
  component: SmartContractInteraction,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'SmartContractInteraction',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom SmartContractInteraction',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive SmartContractInteraction',
    onClick: () => alert('Clicked!'),
  },
};
