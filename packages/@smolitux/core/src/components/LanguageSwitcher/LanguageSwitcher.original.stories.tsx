import type { Meta, StoryObj } from '@storybook/react';
import { LanguageSwitcher.original } from './LanguageSwitcher.original';

const meta: Meta<typeof LanguageSwitcher.original> = {
  title: 'Components/LanguageSwitcher.original',
  component: LanguageSwitcher.original,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'LanguageSwitcher.original',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom LanguageSwitcher.original',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive LanguageSwitcher.original',
    onClick: () => alert('Clicked!'),
  },
};
