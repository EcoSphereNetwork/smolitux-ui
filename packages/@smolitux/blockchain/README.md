# @smolitux/blockchain

Blockchain components for Smolitux UI.

## Installation

```bash
npm install @smolitux/blockchain
# or
yarn add @smolitux/blockchain
```

## Components

- WalletConnect: Connects to blockchain wallets
- TokenDisplay: Displays token information and balances
- TransactionHistory: Shows transaction history
- StakingInterface: Interface for staking tokens
- TokenDistributionChart: Visualizes token distribution
- DeFiDashboard: Overview of DeFi protocols

## Usage

```jsx
import { WalletConnect } from '@smolitux/blockchain';

const MyComponent = () => {
  const handleConnect = (wallet) => {
    console.log('Connected to wallet:', wallet);
  };

  return (
    <WalletConnect onConnect={handleConnect} supportedWallets={['MetaMask', 'WalletConnect']} />
  );
};
```

## License

MIT
