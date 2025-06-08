import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Card } from '../Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Basic/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    bordered: {
      control: 'boolean',
      description: 'Whether the card has a border',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    shadowed: {
      control: 'boolean',
      description: 'Whether the card has a shadow',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    rounded: {
      control: 'boolean',
      description: 'Whether the card has rounded corners',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    padded: {
      control: 'boolean',
      description: 'Whether the card has padding',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    hoverable: {
      control: 'boolean',
      description: 'Whether the card has a hover effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
      table: {
        type: { summary: 'string' },
      },
    },
    style: {
      control: 'object',
      description: 'Inline CSS styles',
      table: {
        type: { summary: 'React.CSSProperties' },
      },
    },
    children: {
      control: 'text',
      description: 'Card content',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <div
        style={{
          width: '300px',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p>Card Content</p>
      </div>
    ),
  },
};

export const WithHeader: Story = {
  args: {
    children: (
      <div style={{ width: '300px' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Card Title</h3>
        </div>
        <div style={{ padding: '16px' }}>
          <p>Card content goes here. This is a basic card with a header.</p>
        </div>
      </div>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    children: (
      <div style={{ width: '300px' }}>
        <div style={{ padding: '16px' }}>
          <p>Card content goes here. This is a basic card with a footer.</p>
        </div>
        <div
          style={{
            padding: '16px',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Action
          </button>
        </div>
      </div>
    ),
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    children: (
      <div style={{ width: '300px' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Card Title</h3>
        </div>
        <div style={{ padding: '16px' }}>
          <p>Card content goes here. This is a card with both header and footer.</p>
        </div>
        <div
          style={{
            padding: '16px',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Action
          </button>
        </div>
      </div>
    ),
  },
};

export const Shadowed: Story = {
  args: {
    shadowed: true,
    children: (
      <div
        style={{
          width: '300px',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p>Card with Shadow</p>
      </div>
    ),
  },
};

export const Hoverable: Story = {
  args: {
    hoverable: true,
    children: (
      <div
        style={{
          width: '300px',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p>Hover over me</p>
      </div>
    ),
  },
};

export const NoBorder: Story = {
  args: {
    bordered: false,
    children: (
      <div
        style={{
          width: '300px',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p>Card without Border</p>
      </div>
    ),
  },
};

export const NoRounding: Story = {
  args: {
    rounded: false,
    children: (
      <div
        style={{
          width: '300px',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p>Card without Rounded Corners</p>
      </div>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    padded: false,
    children: (
      <div
        style={{
          width: '300px',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p>Card without Padding</p>
      </div>
    ),
  },
};

export const CustomStyle: Story = {
  args: {
    style: { backgroundColor: '#f0f9ff', borderColor: '#3b82f6' },
    children: (
      <div
        style={{
          width: '300px',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p>Card with Custom Style</p>
      </div>
    ),
  },
};
