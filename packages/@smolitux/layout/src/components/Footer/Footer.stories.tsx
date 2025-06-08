import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    copyright: '© 2025 Smolitux',
    links: <a href="/impressum">Impressum</a>,
  },
};

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    links: <a href="/datenschutz">Datenschutz</a>,
  },
};

export const Colored: Story = {
  args: {
    variant: 'colored',
    color: 'secondary',
    links: <a href="/kontakt">Kontakt</a>,
  },
};

export const Fixed: Story = {
  args: {
    fixed: true,
    links: <a href="/faq">FAQ</a>,
  },
};
