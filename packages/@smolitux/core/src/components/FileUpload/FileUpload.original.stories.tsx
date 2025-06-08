import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload.original } from './FileUpload.original';

const meta: Meta<typeof FileUpload.original> = {
  title: 'Components/FileUpload.original',
  component: FileUpload.original,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'FileUpload.original',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom FileUpload.original',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive FileUpload.original',
    onClick: () => alert('Clicked!'),
  },
};
