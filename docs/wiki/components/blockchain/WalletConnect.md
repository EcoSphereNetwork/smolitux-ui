# WalletConnect

WalletConnect stellt eine Schnittstelle bereit, um sich mit verschiedenen Krypto-Wallets zu verbinden. Die Komponente bietet Buttons für MetaMask und WalletConnect und meldet den Verbindungsstatus an den Aufrufer.
Die Komponente verwendet `forwardRef`, sodass Sie einen Ref auf das Wurzelelement erhalten können.

## Props

| Prop | Typ | Beschreibung |
|------|-----|--------------|
| `onConnect` | `(address: string, provider: EthereumProvider) => void` | Wird aufgerufen, sobald die Verbindung erfolgreich hergestellt wurde. |
| `onDisconnect` | `() => void` | Wird ausgelöst, wenn die Verbindung getrennt wird. |
| `supportedWallets` | `string[]` | Liste der unterstützten Wallet-Optionen. Standardmäßig `['metamask', 'walletconnect']`. |
| `className` | `string` | Zusätzliche CSS-Klassen. |

## Beispiel

```tsx
import { WalletConnect } from '@smolitux/blockchain';

export default function Example() {
  const handleConnect = (address: string) => {
    console.log('Verbunden mit', address);
  };

  return <WalletConnect onConnect={handleConnect} onDisconnect={() => {}} />;
}
```

Weitere Informationen finden sich im Paket-README unter `packages/@smolitux/blockchain/README.md`.
