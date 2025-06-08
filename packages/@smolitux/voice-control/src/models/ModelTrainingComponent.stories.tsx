import type { Meta, StoryObj } from '@storybook/react';
import { ModelTrainingComponent } from './ModelTrainingComponent';

const meta: Meta<typeof ModelTrainingComponent> = {
  title: 'Components/ModelTrainingComponent',
  component: ModelTrainingComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'ModelTrainingComponent',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom ModelTrainingComponent',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive ModelTrainingComponent',
    onClick: () => alert('Clicked!'),
  },
};
