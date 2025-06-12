import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { FormGroup } from './FormGroup';

const meta: Meta<typeof FormGroup> = {
  title: 'Core/FormGroup',
  component: FormGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
    horizontal: { control: 'boolean' },
    description: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof FormGroup>;

export const Default: Story = {
  args: {
    label: 'Username',
    children: <input aria-label="Username" />,
  },
};

export const WithHint: Story = {
  args: {
    label: 'Email',
    hint: 'We will not share it',
    children: <input aria-label="Email" />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    error: 'Too weak',
    required: true,
    children: <input aria-label="Password" />,
  },
};

export const Horizontal: Story = {
  args: {
    label: 'City',
    horizontal: true,
    labelFor: 'city',
    children: <input id="city" aria-label="City" />,
  },
};
