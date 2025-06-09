import type { Meta, StoryObj } from '@storybook/react';
import { render } from './render';

const meta: Meta<typeof render> = {
  title: 'Components/testing/render',
  component: render,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'render component from @smolitux/testing package',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'render Component',
  },
};

export const WithCustomClass: Story = {
  args: {
    children: 'Custom Styled render',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive render',
    onClick: () => console.log('render clicked'),
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled render',
    disabled: true,
  },
};

export const Playground: Story = {
  args: {
    children: 'Playground render',
  },
};
