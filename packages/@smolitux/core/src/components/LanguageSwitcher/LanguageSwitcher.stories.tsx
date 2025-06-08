import type { Meta, StoryObj } from '@storybook/react';
import { LanguageSwitcher } from './LanguageSwitcher';

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'Components/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'LanguageSwitcher',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom LanguageSwitcher',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive LanguageSwitcher',
    onClick: () => alert('Clicked!'),
  },
};
