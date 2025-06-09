import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from './ThemeProvider';

const meta: Meta<typeof ThemeProvider> = {
  title: 'Components/theme/ThemeProvider',
  component: ThemeProvider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ThemeProvider component from @smolitux/theme package',
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
    children: 'ThemeProvider Component',
  },
};

export const WithCustomClass: Story = {
  args: {
    children: 'Custom Styled ThemeProvider',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive ThemeProvider',
    onClick: () => console.log('ThemeProvider clicked'),
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled ThemeProvider',
    disabled: true,
  },
};

export const Playground: Story = {
  args: {
    children: 'Playground ThemeProvider',
  },
};
