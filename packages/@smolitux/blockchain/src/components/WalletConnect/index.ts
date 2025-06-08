import { WalletConnect as BaseWalletConnect, WalletConnectProps } from './WalletConnect';
import { default as WalletConnectA11y, WalletConnectA11yProps } from './WalletConnect.a11y';

// Erweitere WalletConnect um die A11y-Komponente
const WalletConnect = Object.assign(BaseWalletConnect, {
  A11y: WalletConnectA11y,
});

// Exportiere Komponenten und Typen
export { WalletConnect };
export type { WalletConnectProps, WalletConnectA11yProps };

// Fuer Abwaertskompatibilitaet mit dem bestehenden Export
export default WalletConnect;
