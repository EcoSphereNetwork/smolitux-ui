import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PrivacyConsentProvider } from './PrivacyContext';
import { PrivacySettings } from './PrivacySettings';

const meta: Meta<typeof PrivacySettings> = {
  title: 'Community/PrivacySettings',
  component: PrivacySettings,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <PrivacyConsentProvider>
        <PrivacySettings open={open} onClose={() => setOpen(false)} />
      </PrivacyConsentProvider>
    );
  },
};
