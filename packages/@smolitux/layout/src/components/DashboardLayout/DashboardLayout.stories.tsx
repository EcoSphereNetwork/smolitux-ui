import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DashboardLayout } from './DashboardLayout';

const meta: Meta<typeof DashboardLayout> = {
  title: 'Layout/DashboardLayout',
  component: DashboardLayout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DashboardLayout>;

export const Basic: Story = {
  render: () => (
    <DashboardLayout
      header={{ show: true, title: 'Dashboard' }}
      sidebar={{ show: true, items: [] }}
      footer={{ show: true }}
    >
      <div style={{ height: '200px' }}>Content</div>
    </DashboardLayout>
  ),
};
