import type { Meta, StoryObj } from '@storybook/react';
import { FederatedSearch } from './FederatedSearch';

const meta: Meta<typeof FederatedSearch> = {
  title: 'Components/FederatedSearch',
  component: FederatedSearch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'FederatedSearch',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom FederatedSearch',
    className: 'custom-style',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive FederatedSearch',
    onClick: () => alert('Clicked!'),
  },
};

export const WithActivityPub: Story = {
  args: {
    platforms: [
      { id: 'mastodon', name: 'Mastodon', url: 'https://mastodon.social', isActive: true },
    ],
    onSearch: async (q) => [
      {
        id: '1',
        title: `Result for ${q}`,
        url: 'https://mastodon.social',
        type: 'post',
        platform: { id: 'mastodon', name: 'Mastodon', url: 'https://mastodon.social' },
      },
    ],
  },
};
