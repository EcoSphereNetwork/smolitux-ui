import type { Meta, StoryObj } from '@storybook/react';
import { Icon, IconName } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Core/Icon',
  component: Icon,
  argTypes: {
    name: { control: 'text' },
    size: { control: 'text' },
    color: { control: 'color' },
    title: { control: 'text' },
    ariaHidden: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Standard: Story = {
  args: { name: 'check' as IconName },
};

export const WithTitle: Story = {
  args: { name: 'info' as IconName, title: 'Information' },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Icon {...args} size={16} />
      <Icon {...args} size={24} />
      <Icon {...args} size={32} />
    </div>
  ),
  args: { name: 'check' as IconName },
};

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Icon {...args} color="green" />
      <Icon {...args} color="red" />
      <Icon {...args} color="blue" />
    </div>
  ),
  args: { name: 'alert' as IconName },
};
