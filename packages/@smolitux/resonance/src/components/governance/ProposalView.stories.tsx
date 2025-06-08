import type { Meta, StoryObj } from '@storybook/react';
import { ProposalView } from './ProposalView';

const meta: Meta<typeof ProposalView> = {
  title: 'Components/ProposalView',
  component: ProposalView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'ProposalView',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom ProposalView',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive ProposalView',
    onClick: () => alert('Clicked!'),
  },
};
