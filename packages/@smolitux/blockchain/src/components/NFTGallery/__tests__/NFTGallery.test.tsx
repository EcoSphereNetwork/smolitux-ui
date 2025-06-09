import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NFTGallery, NFTItem } from '../NFTGallery';

describe('NFTGallery', () => {
  const nfts: NFTItem[] = [
    { tokenId: '1', name: 'NFT 1', imageUrl: 'img1.png', chainId: 1 },
    { tokenId: '2', name: 'NFT 2', imageUrl: 'img2.png', chainId: 137 },
  ];

  it('renders a grid of NFTs', () => {
    render(<NFTGallery nfts={nfts} />);

    expect(screen.getByTestId('nft-gallery')).toBeInTheDocument();
    expect(screen.getByAltText('NFT 1')).toBeInTheDocument();
    expect(screen.getByAltText('NFT 2')).toBeInTheDocument();
  });

  it('handles selection', () => {
    const onSelect = jest.fn();
    render(<NFTGallery nfts={nfts} onSelect={onSelect} />);

    fireEvent.click(screen.getByAltText('NFT 1'));
    expect(onSelect).toHaveBeenCalledWith(nfts[0]);
  });
});
