import type { Meta, StoryObj } from '@storybook/react';
import { I18nProvider } from './I18nProvider';

const meta: Meta<typeof I18nProvider> = {
  title: 'Components/I18nProvider',
  component: I18nProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'I18nProvider',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom I18nProvider',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive I18nProvider',
    onClick: () => alert('Clicked!'),
  },
};
