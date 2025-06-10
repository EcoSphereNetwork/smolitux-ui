# ⛓️ @smolitux/blockchain - CODEX COMPLETION PROMPT

## **DIREKTER BEFEHL FÜR CODEX:**

```bash
# ENDLOS-LOOP: WIEDERHOLE BIS BLOCKCHAIN 100% COMPLETE
while [ "$(find packages/@smolitux/blockchain/src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)" -lt 8 ]; do
  bash scripts/smolitux-analyzer.sh --package=blockchain
  cd packages/@smolitux/blockchain
  
  # FINDE NÄCHSTE UNVOLLSTÄNDIGE BLOCKCHAIN KOMPONENTE
  BLOCKCHAIN=("WalletConnect" "TokenDisplay" "TransactionHistory" "NFTGallery" "DeFiDashboard" "ContractInteraction" "CryptoChart" "BlockExplorer")
  
  NEXT=$(for comp in "${BLOCKCHAIN[@]}"; do
    if [ ! -f "src/components/$comp/$comp.tsx" ] || [ ! -f "src/components/$comp/$comp.test.tsx" ] || [ ! -f "src/components/$comp/$comp.stories.tsx" ]; then
      echo "$comp"; break
    fi
  done)
  
  echo "🎯 COMPLETING BLOCKCHAIN: $NEXT"
  
  # IMPLEMENTIERE ODER VERBESSERE BLOCKCHAIN KOMPONENTE
  [IMPLEMENT_OR_IMPROVE_BLOCKCHAIN]
  
  # AUTOMATISCHER WORKFLOW
  git add . && git commit -m "feat(blockchain): complete $NEXT - Web3 component with security"
  git push origin main
  gh pr create --title "Complete Blockchain: $NEXT" --body "Web3 component with multi-chain support and security features"
  gh pr merge --merge --delete-branch
  
  # UPDATE STATUS
  echo "✅ $NEXT COMPLETE - $(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)/8 Blockchain Components"
done
echo "🎉 @smolitux/blockchain 100% COMPLETE!"
```

---

## 📋 **BLOCKCHAIN PACKAGE SPEZIFIKATIONEN:**

### **🎯 Blockchain Components (8 Total):**
```
WalletConnect TokenDisplay TransactionHistory NFTGallery DeFiDashboard ContractInteraction CryptoChart BlockExplorer
```

### **✅ Pro Blockchain Component REQUIRED:**
- **Multi-Chain:** Ethereum, Polygon, BSC, Arbitrum support
- **Security:** Transaction validation, signature verification
- **Web3 Standards:** EIP compliance, MetaMask integration
- **Real-time:** Live price feeds, transaction monitoring
- **Error Handling:** Network failures, user rejections

### **🔧 CORE Blockchain Interfaces:**
```typescript
// WALLET Connection:
interface WalletConnectProps {
  supportedChains: ChainConfig[];
  autoConnect?: boolean;
  onConnect?: (wallet: WalletInfo) => void;
  onDisconnect?: () => void;
  onChainChanged?: (chainId: number) => void;
  onAccountChanged?: (accounts: string[]) => void;
  showBalance?: boolean;
  showChainInfo?: boolean;
}

// TOKEN Display:
interface TokenDisplayProps {
  tokens: TokenData[];
  variant?: 'list' | 'grid' | 'table';
  showPrices?: boolean;
  showBalance?: boolean;
  onTokenClick?: (token: TokenData) => void;
  filterChain?: number[];
  sortBy?: 'name' | 'balance' | 'price';
}

// TRANSACTION History:
interface TransactionHistoryProps {
  address: string;
  chainId: number;
  transactions: TransactionData[];
  onTransactionClick?: (tx: TransactionData) => void;
  showStatus?: boolean;
  filterType?: TransactionType[];
  realTime?: boolean;
}
```

### **📁 Blockchain Structure:**
```
src/components/
├── WalletConnect/          # Wallet connection & management
├── TokenDisplay/           # Token portfolio display
├── TransactionHistory/     # Transaction list & details
├── NFTGallery/            # NFT collection viewer
├── DeFiDashboard/         # DeFi protocols dashboard
├── ContractInteraction/   # Smart contract interface
├── CryptoChart/           # Price charts & analytics
└── BlockExplorer/         # Blockchain explorer
```

### **🌐 MULTI-CHAIN Support:**
```typescript
interface ChainConfig {
  id: number;
  name: string;
  rpcUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExplorerUrl: string;
  iconUrl?: string;
}

const SUPPORTED_CHAINS: ChainConfig[] = [
  {
    id: 1,
    name: 'Ethereum Mainnet',
    rpcUrl: 'https://mainnet.infura.io/v3/',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    blockExplorerUrl: 'https://etherscan.io',
  },
  {
    id: 137,
    name: 'Polygon',
    rpcUrl: 'https://polygon-rpc.com',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    blockExplorerUrl: 'https://polygonscan.com',
  },
  // BSC, Arbitrum, etc.
];
```

### **🔐 SECURITY Features:**
```typescript
// TRANSACTION Validation:
interface TransactionValidation {
  validateAmount: (amount: string, balance: string) => ValidationResult;
  validateAddress: (address: string) => boolean;
  validateChain: (chainId: number) => boolean;
  estimateGas: (transaction: Transaction) => Promise<string>;
  checkApproval: (token: string, spender: string, amount: string) => Promise<boolean>;
}

// SIGNATURE Verification:
interface SignatureVerification {
  verifyMessage: (message: string, signature: string, address: string) => boolean;
  verifyTypedData: (domain: TypedDataDomain, types: Record<string, any>, value: Record<string, any>, signature: string) => boolean;
}
```

### **💰 DEFI Integration:**
```typescript
// DEFI Protocol Support:
interface DeFiProtocol {
  name: string;
  tvl: string;
  apy: number;
  tokens: TokenData[];
  actions: DeFiAction[];
  risks: RiskFactor[];
}

interface DeFiAction {
  type: 'stake' | 'unstake' | 'claim' | 'swap' | 'provide_liquidity';
  label: string;
  enabled: boolean;
  execute: (params: any) => Promise<TransactionResponse>;
}
```

### **🧪 TESTING Requirements:**
```typescript
// REQUIRED für jede Blockchain Component:
✅ Web3 provider mocking (MetaMask, WalletConnect)
✅ Chain switching simulation
✅ Transaction signing simulation
✅ Error handling (rejected transactions, network errors)
✅ Multi-chain compatibility testing
✅ Security validation testing
✅ Real-time data mocking
```

### **📚 STORYBOOK Blockchain:**
```typescript
// REQUIRED Stories:
✅ Default Web3 component
✅ Multi-chain scenarios
✅ Transaction flow examples
✅ Error state handling (disconnected, wrong chain)
✅ Security features demonstration
✅ DeFi protocol integration
✅ NFT gallery examples
```

### **🚨 CONFLICT RESOLUTION:**
- **UPDATE ONLY:** `docs/wiki/development/component-status-blockchain.md`
- **WEB3 MOCKING:** Proper Web3 provider simulation for testing
- **SECURITY:** Never expose private keys or seed phrases

### **🔄 AUTO-REPEAT LOGIC:**
```bash
# NACH JEDEM SUCCESSFUL MERGE:
BLOCKCHAIN_COUNT=$(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)
if [ $BLOCKCHAIN_COUNT -lt 8 ]; then
  echo "🔄 CONTINUE: $BLOCKCHAIN_COUNT/8 Complete - Next blockchain component..."
  # RESTART ENTIRE PROMPT
else
  echo "🎉 WEB3 SYSTEM COMPLETE: @smolitux/blockchain 100% READY!"
fi
```

### **📊 SUCCESS METRICS:**
- **8/8 Blockchain Components** fully implemented
- **Multi-Chain Support** for major networks
- **Security Standards** transaction validation and verification
- **DeFi Integration** protocol support and interactions
- **Real-time Data** live blockchain information

---

## 🛠️ **PRAKTISCHE IMPLEMENTATION:**

### **WalletConnect Component:**
```typescript
export const WalletConnect = forwardRef<HTMLDivElement, WalletConnectProps>(
  ({ 
    supportedChains,
    autoConnect = false,
    onConnect,
    onDisconnect,
    onChainChanged,
    showBalance = true,
    className,
    ...props 
  }, ref) => {
    const [wallet, setWallet] = useState<WalletInfo | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // Web3 provider detection
    const isWeb3Available = typeof window !== 'undefined' && window.ethereum;
    
    const connectWallet = useCallback(async () => {
      if (!window.ethereum) {
        setError('Please install MetaMask or another Web3 wallet');
        return;
      }
      
      setIsConnecting(true);
      setError(null);
      
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        
        // Get chain ID
        const chainId = await window.ethereum.request({
          method: 'eth_chainId',
        });
        
        // Get balance
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [accounts[0], 'latest'],
        });
        
        const walletInfo: WalletInfo = {
          address: accounts[0],
          chainId: parseInt(chainId, 16),
          balance: (parseInt(balance, 16) / 1e18).toFixed(4),
          chainName: supportedChains.find(c => c.id === parseInt(chainId, 16))?.name || 'Unknown',
        };
        
        setWallet(walletInfo);
        onConnect?.(walletInfo);
        
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to connect wallet');
      } finally {
        setIsConnecting(false);
      }
    }, [supportedChains, onConnect]);
    
    const disconnectWallet = useCallback(() => {
      setWallet(null);
      setError(null);
      onDisconnect?.();
    }, [onDisconnect]);
    
    const switchChain = useCallback(async (chainId: number) => {
      if (!window.ethereum || !wallet) return;
      
      const chain = supportedChains.find(c => c.id === chainId);
      if (!chain) return;
      
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${chainId.toString(16)}` }],
        });
        
        onChainChanged?.(chainId);
      } catch (error: any) {
        if (error.code === 4902) {
          // Chain not added, add it
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: `0x${chainId.toString(16)}`,
                chainName: chain.name,
                rpcUrls: [chain.rpcUrl],
                nativeCurrency: chain.nativeCurrency,
                blockExplorerUrls: [chain.blockExplorerUrl],
              }],
            });
          } catch (addError) {
            setError('Failed to add chain to wallet');
          }
        } else {
          setError('Failed to switch chain');
        }
      }
    }, [supportedChains, wallet, onChainChanged]);
    
    // Auto-connect on mount
    useEffect(() => {
      if (autoConnect && isWeb3Available) {
        // Check if already connected
        window.ethereum.request({ method: 'eth_accounts' })
          .then((accounts: string[]) => {
            if (accounts.length > 0) {
              connectWallet();
            }
          });
      }
    }, [autoConnect, isWeb3Available, connectWallet]);
    
    if (!isWeb3Available) {
      return (
        <div 
          ref={ref}
          className={cn('p-4 border border-destructive/20 rounded-lg bg-destructive/10', className)}
          {...props}
        >
          <p className="text-destructive">
            Web3 wallet not detected. Please install MetaMask or another Web3 wallet.
          </p>
        </div>
      );
    }
    
    return (
      <div 
        ref={ref}
        className={cn('p-4 border border-border rounded-lg bg-card', className)}
        role="region"
        aria-label="Wallet connection"
        {...props}
      >
        {!wallet ? (
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">Connect Your Wallet</h3>
            
            {error && (
              <div className="p-3 border border-destructive/20 rounded bg-destructive/10">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}
            
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className={cn(
                'w-full py-3 px-4 rounded-md font-medium transition-colors',
                'bg-primary text-primary-foreground hover:bg-primary/90',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Wallet Info */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                </p>
                <p className="text-sm text-muted-foreground">{wallet.chainName}</p>
              </div>
              <button
                onClick={disconnectWallet}
                className="text-sm text-muted-foreground hover:text-destructive"
              >
                Disconnect
              </button>
            </div>
            
            {/* Balance */}
            {showBalance && (
              <div className="p-3 bg-muted rounded">
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className="font-semibold">{wallet.balance} ETH</p>
              </div>
            )}
            
            {/* Chain Switcher */}
            {supportedChains.length > 1 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Switch Network</p>
                <div className="grid grid-cols-2 gap-2">
                  {supportedChains.map(chain => (
                    <button
                      key={chain.id}
                      onClick={() => switchChain(chain.id)}
                      className={cn(
                        'p-2 text-sm rounded border transition-colors',
                        wallet.chainId === chain.id
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:bg-muted'
                      )}
                    >
                      {chain.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Accessibility */}
        <div className="sr-only" aria-live="polite">
          {wallet ? (
            `Wallet connected: ${wallet.address} on ${wallet.chainName}`
          ) : (
            'Wallet not connected'
          )}
          {error && `Error: ${error}`}
        </div>
      </div>
    );
  }
);
```

### **Auto-Status Update:**
```bash
cat > docs/wiki/development/component-status-blockchain.md << EOF
# @smolitux/blockchain Status
Last Updated: $(date)
Progress: $(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l)/8 ($(echo "scale=0; $(find src/components -name "*.tsx" | grep -v ".test." | grep -v ".stories." | wc -l) * 100 / 8" | bc)%)
Multi-Chain: ✅ Ethereum, Polygon, BSC support
Latest: $NEXT ✅
Security: Transaction validation, signature verification
DeFi: Protocol integration ready
EOF
```

**🎯 MISSION: WIEDERHOL DIESEN PROMPT BIS 8/8 BLOCKCHAIN COMPONENTS = 100% WEB3 SYSTEM!**
