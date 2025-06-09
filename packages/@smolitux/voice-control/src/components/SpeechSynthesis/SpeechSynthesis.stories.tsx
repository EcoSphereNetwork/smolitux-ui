import type { Meta, StoryObj } from '@storybook/react';
import { SpeechSynthesis } from './SpeechSynthesis';

const meta: Meta<typeof SpeechSynthesis> = {
  title: 'Voice Control/SpeechSynthesis',
  component: SpeechSynthesis,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'SpeechSynthesis component with Web Speech API integration and accessibility features.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SpeechSynthesis>;

export const Default: Story = {
  args: {
    text: 'Hello world',
  },
};

export const WithSettings: Story = {
  args: {
    text: 'Hello world',
    showSettings: true,
  },
};

export const Accessible: Story = {
  args: {
    text: 'Hello world',
    showControls: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates accessibility features including visual feedback and screen reader support.',
      },
    },
  },
};

export const BrowserSupport: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
        <h3 className="font-semibold mb-2">Browser Support</h3>
        <p className="text-sm text-muted-foreground">
          This component requires Web Speech API support.
          It works best in Chrome, Safari, and Edge browsers.
        </p>
      </div>
      <SpeechSynthesis text="Hello world" />
    </div>
  ),
};
