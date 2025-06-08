import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'RadioGroup',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom RadioGroup',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive RadioGroup',
    onClick: () => alert('Clicked!'),
  },
};
