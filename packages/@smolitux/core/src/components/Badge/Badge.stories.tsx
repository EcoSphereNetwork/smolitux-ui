import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Core/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    rounded: { control: 'boolean' },
    isCounter: { control: 'boolean' },
    maxCount: { control: 'number' },
    isDot: { control: 'boolean' },
    outline: { control: 'boolean' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'md',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary',
    variant: 'primary',
    size: 'md',
  },
};

export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success',
    size: 'md',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning',
    variant: 'warning',
    size: 'md',
  },
};

export const Error: Story = {
  args: {
    children: 'Error',
    variant: 'error',
    size: 'md',
  },
};

export const Info: Story = {
  args: {
    children: 'Info',
    variant: 'info',
    size: 'md',
  },
};

export const Rounded: Story = {
  args: {
    children: 'Rounded',
    variant: 'primary',
    size: 'md',
    rounded: true,
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'primary',
    size: 'md',
    outline: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: 'With Icon',
    variant: 'success',
    size: 'md',
    icon: (
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
      </svg>
    ),
  },
};

export const Counter: Story = {
  args: {
    children: '42',
    variant: 'primary',
    size: 'md',
    isCounter: true,
  },
};

export const CounterWithMax: Story = {
  args: {
    children: '120',
    variant: 'error',
    size: 'md',
    isCounter: true,
    maxCount: 99,
  },
};

export const Dot: Story = {
  args: {
    variant: 'success',
    size: 'md',
    isDot: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Badge size="xs">XS</Badge>
      <Badge size="sm">SM</Badge>
      <Badge size="md">MD</Badge>
      <Badge size="lg">LG</Badge>
    </div>
  ),
};

export const DotSizes: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Badge size="xs" isDot variant="error" />
      <Badge size="sm" isDot variant="error" />
      <Badge size="md" isDot variant="error" />
      <Badge size="lg" isDot variant="error" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <Badge variant="default">Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="info">Info</Badge>
      </div>
      <div className="flex items-center space-x-2">
        <Badge variant="default" outline>Default</Badge>
        <Badge variant="primary" outline>Primary</Badge>
        <Badge variant="success" outline>Success</Badge>
        <Badge variant="warning" outline>Warning</Badge>
        <Badge variant="error" outline>Error</Badge>
        <Badge variant="info" outline>Info</Badge>
      </div>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center">
        <span className="mr-2">Nachrichten</span>
        <Badge variant="primary" isCounter>5</Badge>
      </div>
      <div className="flex items-center">
        <span className="mr-2">Status:</span>
        <Badge variant="success">Online</Badge>
      </div>
      <div className="flex items-center">
        <span className="mr-2">Benachrichtigungen</span>
        <Badge variant="error" isCounter maxCount={99}>120</Badge>
      </div>
      <div className="flex items-center">
        <span className="mr-2">Neue Funktion</span>
        <Badge variant="info" size="sm">Neu</Badge>
      </div>
    </div>
  ),
};