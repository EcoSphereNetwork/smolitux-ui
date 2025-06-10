import type { Meta, StoryObj } from '@storybook/react';
import { Option } from './Option';

const meta: Meta<typeof Option> = {
  title: 'Components/Select/Option',
  component: Option,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Repräsentiert eine einzelne Option innerhalb einer Select-Komponente.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <select>
      <Option value="option1">Option 1</Option>
    </select>
  ),
};

export const CustomStyle: Story = {
  render: () => (
    <select className="custom-style">
      <Option value="option1">Styled Option</Option>
    </select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <select>
      <Option value="option1" disabled>
        Disabled Option
      </Option>
    </select>
  ),
};
