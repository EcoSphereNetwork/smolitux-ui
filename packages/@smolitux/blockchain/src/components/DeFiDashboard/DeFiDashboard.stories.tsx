import type { Meta, StoryObj } from '@storybook/react';
import { DeFiDashboard, DeFiProtocol } from './DeFiDashboard';

const meta: Meta<typeof DeFiDashboard> = {
  title: 'Blockchain/DeFiDashboard',
  component: DeFiDashboard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DeFiDashboard>;

const sampleProtocols: DeFiProtocol[] = [
  {
    name: 'StakeHub',
    chainId: 1,
    tvl: '1M',
    apy: 12.5,
    actions: [
      { type: 'stake', label: 'Stake', enabled: true },
      { type: 'claim', label: 'Claim', enabled: true },
    ],
  },
  {
    name: 'SwapX',
    chainId: 137,
    tvl: '500K',
    apy: 8,
    actions: [
      { type: 'swap', label: 'Swap', enabled: true },
    ],
  },
];

export const Default: Story = {
  args: {
    protocols: sampleProtocols,
  },
};
