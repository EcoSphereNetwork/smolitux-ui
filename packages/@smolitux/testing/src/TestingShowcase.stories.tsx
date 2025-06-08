import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { a11y } from './a11y';
import { Button } from '@smolitux/core';

const meta: Meta = {
  title: 'Testing/TestingShowcase',
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => <Button>Test Button</Button>,
};

export const MockExamples: Story = {
  render: () => <div>Use file mocks and helper utilities for testing.</div>,
};

export const A11yTestingDemo: Story = {
  render: () => <Button aria-label="demo">Accessible Button</Button>,
  parameters: {
    docs: {
      description: {
        story: 'Use a11y.testA11y to validate components.'
      }
    }
  }
};
