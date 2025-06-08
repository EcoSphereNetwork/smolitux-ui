import type { Meta, StoryObj } from '@storybook/react';
import { AccordionItem } from './AccordionItem';

const meta: Meta<typeof AccordionItem> = {
  title: 'Components/AccordionItem',
  component: AccordionItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'AccordionItem',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom AccordionItem',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive AccordionItem',
    onClick: () => alert('Clicked!'),
  },
};
