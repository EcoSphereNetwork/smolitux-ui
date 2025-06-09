import type { Meta, StoryObj } from '@storybook/react';
import { PrivacyContext } from './PrivacyContext';

const meta: Meta<typeof PrivacyContext> = {
  title: 'Components/community/PrivacyContext',
  component: PrivacyContext,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'PrivacyContext component from @smolitux/community package',
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
    children: 'PrivacyContext Component',
  },
};

export const WithCustomClass: Story = {
  args: {
    children: 'Custom Styled PrivacyContext',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive PrivacyContext',
    onClick: () => console.log('PrivacyContext clicked'),
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled PrivacyContext',
    disabled: true,
  },
};

export const Playground: Story = {
  args: {
    children: 'Playground PrivacyContext',
  },
};
