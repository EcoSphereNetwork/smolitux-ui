import type { Meta, StoryObj } from '@storybook/react';
import { NFTGallery, NFTItem } from './NFTGallery';

const meta: Meta<typeof NFTGallery> = {
  title: 'Components/NFTGallery',
  component: NFTGallery,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const sampleNfts: NFTItem[] = [
  {
    tokenId: '1',
    name: 'Eco NFT #1',
    imageUrl: 'https://placekitten.com/200/200',
    chainId: 1,
  },
  {
    tokenId: '2',
    name: 'Eco NFT #2',
    imageUrl: 'https://placekitten.com/201/200',
    chainId: 137,
  },
  {
    tokenId: '3',
    name: 'Eco NFT #3',
    imageUrl: 'https://placekitten.com/202/200',
    chainId: 1,
  },
];

export const Default: Story = {
  args: {
    nfts: sampleNfts,
  },
};

export const Selectable: Story = {
  args: {
    nfts: sampleNfts,
    onSelect: (nft) => alert(`Selected ${nft.tokenId}`),
  },
};
