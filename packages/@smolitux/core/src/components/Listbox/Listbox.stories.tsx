import type { Meta, StoryObj } from '@storybook/react';
import { Listbox } from './Listbox';

const meta: Meta<typeof Listbox> = {
  title: 'Components/Core/Listbox',
  component: Listbox,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'change' },
    value: { control: 'text' },
    options: { control: 'object' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    autoFocus: { control: 'boolean' },
  },
  args: {
    value: '',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ],
  },
};
export default meta;

type Story = StoryObj<typeof Listbox>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
  args: { placeholder: 'Select an option' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const ManyOptions: Story = {
  args: {
    options: Array.from({ length: 20 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: String(i + 1),
    })),
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { label: 'Active', value: 'a' },
      { label: 'Disabled', value: 'd', disabled: true },
    ],
  },
};
