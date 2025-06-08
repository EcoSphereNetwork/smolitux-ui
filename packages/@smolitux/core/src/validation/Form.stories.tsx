import type { Meta, StoryObj } from '@storybook/react';
import { Form } from './Form';

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Form',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Form',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Form',
    onClick: () => alert('Clicked!'),
  },
};
