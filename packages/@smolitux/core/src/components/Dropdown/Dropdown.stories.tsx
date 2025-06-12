import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dropdown, DropdownOption } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Core/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    options: { control: 'object' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    searchable: { control: 'boolean' },
    grouped: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
};

export default meta;

const templateOptions: DropdownOption[] = [
  { value: 'one', label: 'One', group: 'Group 1' },
  { value: 'two', label: 'Two', group: 'Group 1' },
  { value: 'three', label: 'Three', group: 'Group 2' },
  { value: 'four', label: 'Four', group: 'Group 2' },
];

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <Dropdown {...args} value={value} onChange={setValue} />
    );
  },
  args: {
    value: 'one',
    options: templateOptions,
  },
};

export const Searchable: Story = {
  render: Default.render,
  args: {
    value: 'one',
    options: templateOptions,
    searchable: true,
  },
};

export const Grouped: Story = {
  render: Default.render,
  args: {
    value: 'one',
    options: templateOptions,
    grouped: true,
  },
};

export const Disabled: Story = {
  render: Default.render,
  args: {
    value: 'one',
    options: templateOptions,
    disabled: true,
  },
};

export const LongList: Story = {
  render: Default.render,
  args: {
    value: '1',
    options: Array.from({ length: 50 }, (_, i) => ({ value: `${i}`, label: `Option ${i}` })),
    searchable: true,
  },
};
