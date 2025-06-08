import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';

const meta: Meta<typeof Button> = {
  title: 'Core/Inputs/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary','secondary','success','danger','warning','info','outline','ghost','link','solid','unstyled'],
      description: 'Variante des Buttons',
    },
    size: {
      control: 'select',
      options: ['xs','sm','md','lg','xl'],
      description: 'Gr\xF6\xDFe des Buttons',
    },
    shape: {
      control: 'select',
      options: ['square','rounded','pill'],
      description: 'Form des Buttons',
    },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    loading: { control: 'boolean' },
    isIconButton: { control: 'boolean', description: 'Icon-Button ohne Text' },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary Button' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary Button' },
};

export const Success: Story = {
  args: { variant: 'success', children: 'Success Button' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline Button' },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Button size="xs">XS</Button>
      <Button size="sm">SM</Button>
      <Button size="md">MD</Button>
      <Button size="lg">LG</Button>
      <Button size="xl">XL</Button>
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Button shape="square">Square</Button>
      <Button shape="rounded">Rounded</Button>
      <Button shape="pill">Pill</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button leftIcon={<span>\u2190</span>}>Left</Button>
      <Button rightIcon={<span>\u2192</span>}>Right</Button>
      <Button isIconButton leftIcon={<span>\u2605</span>} aria-label="Star" />
    </div>
  ),
};

export const FullWidth: Story = {
  args: { fullWidth: true, children: 'Full Width Button' },
};

export const Loading: Story = {
  args: { loading: true, children: 'Loading Button' },
};

