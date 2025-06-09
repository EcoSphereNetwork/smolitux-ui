import type { Meta, StoryObj } from '@storybook/react';
import { components } from './components';

const meta: Meta<typeof components> = {
  title: 'Components/testing/components',
  component: components,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'components component from @smolitux/testing package',
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
    children: 'components Component',
  },
};

export const WithCustomClass: Story = {
  args: {
    children: 'Custom Styled components',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive components',
    onClick: () => console.log('components clicked'),
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled components',
    disabled: true,
  },
};

export const Playground: Story = {
  args: {
    children: 'Playground components',
  },
};
