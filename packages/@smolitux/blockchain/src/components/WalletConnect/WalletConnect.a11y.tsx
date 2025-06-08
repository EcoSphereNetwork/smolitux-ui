import React, { useState, useEffect } from 'react';
import { Button, Card } from '@smolitux/core';
import { WalletConnectProps } from './WalletConnect';

export interface WalletConnectA11yProps extends WalletConnectProps {
  /**
   * ARIA-Label für die Komponente
   */
  ariaLabel?: string;

  /**
   * ARIA-Labelledby für die Komponente
   */
  ariaLabelledby?: string;

  /**
   * ARIA-Describedby für die Komponente
   */
  ariaDescribedby?: string;

  /**
   * ARIA-Live für die Komponente
   */
  ariaLive?: 'polite' | 'assertive' | 'off';

  /**
   * ARIA-Atomic für die Komponente
   */
  ariaAtomic?: boolean;

  /**
   * ARIA-Relevant für die Komponente
   */
  ariaRelevant?: 'additions' | 'removals' | 'text' | 'all' | 'additions text';

  /**
   * ARIA-Busy für die Komponente
   */
  ariaBusy?: boolean;

  /**
   * Ob die Komponente eine Live-Region ist
   */
  isLiveRegion?: boolean;

  /**
   * Ob die Komponente eine Region ist
   */
  isRegion?: boolean;

  /**
   * Ob die Komponente eine Landmark ist
   */
  isLandmark?: boolean;

  /**
   * Ob die Komponente ein Dialog ist
   */
  isDialog?: boolean;

  /**
   * Ob die Komponente ein Alert ist
   */
  isAlert?: boolean;

  /**
   * Ob die Komponente ein Status ist
   */
  isStatus?: boolean;

  /**
   * Ob die Komponente ein Form ist
   */
  isForm?: boolean;

  /**
   * Ob die Komponente ein Menu ist
   */
  isMenu?: boolean;

  /**
   * Ob die Komponente eine Listbox ist
   */
  isListbox?: boolean;

  /**
   * Ob die Komponente ein Radiogroup ist
   */
  isRadiogroup?: boolean;

  /**
   * Ob die Komponente ein Toolbar ist
   */
  isToolbar?: boolean;

  /**
   * Ob die Komponente ein Tree ist
   */
  isTree?: boolean;

  /**
   * Ob die Komponente ein Grid ist
   */
  isGrid?: boolean;

  /**
   * Ob die Komponente ein Table ist
   */
  isTable?: boolean;

  /**
   * Ob die Komponente ein Tablist ist
   */
  isTablist?: boolean;

  /**
   * Ob die Komponente ein Tabpanel ist
   */
  isTabpanel?: boolean;

  /**
   * Ob die Komponente ein Combobox ist
   */
  isCombobox?: boolean;

  /**
   * Ob die Komponente ein Textbox ist
   */
  isTextbox?: boolean;

  /**
   * Ob die Komponente ein Searchbox ist
   */
  isSearchbox?: boolean;

  /**
   * Ob die Komponente ein Spinbutton ist
   */
  isSpinbutton?: boolean;

  /**
   * Ob die Komponente ein Slider ist
   */
  isSlider?: boolean;

  /**
   * Ob die Komponente ein Scrollbar ist
   */
  isScrollbar?: boolean;

  /**
   * Ob die Komponente ein Separator ist
   */
  isSeparator?: boolean;

  /**
   * Ob die Komponente ein Tooltip ist
   */
  isTooltip?: boolean;

  /**
   * Ob die Komponente ein Alertdialog ist
   */
  isAlertdialog?: boolean;

  /**
   * Ob die Komponente ein Banner ist
   */
  isBanner?: boolean;

  /**
   * Ob die Komponente ein Complementary ist
   */
  isComplementary?: boolean;

  /**
   * Ob die Komponente ein Contentinfo ist
   */
  isContentinfo?: boolean;

  /**
   * Ob die Komponente ein Main ist
   */
  isMain?: boolean;

  /**
   * Ob die Komponente ein Navigation ist
   */
  isNavigation?: boolean;

  /**
   * Ob die Komponente ein Search ist
   */
  isSearch?: boolean;

  /**
   * Ob die Komponente ein Application ist
   */
  isApplication?: boolean;

  /**
   * Ob die Komponente ein Document ist
   */
  isDocument?: boolean;

  /**
   * Ob die Komponente ein Feed ist
   */
  isFeed?: boolean;

  /**
   * Ob die Komponente ein Figure ist
   */
  isFigure?: boolean;

  /**
   * Ob die Komponente ein Group ist
   */
  isGroup?: boolean;

  /**
   * Ob die Komponente ein Img ist
   */
  isImg?: boolean;

  /**
   * Ob die Komponente ein List ist
   */
  isList?: boolean;

  /**
   * Ob die Komponente ein Listitem ist
   */
  isListitem?: boolean;

  /**
   * Ob die Komponente ein Math ist
   */
  isMath?: boolean;

  /**
   * Ob die Komponente ein Note ist
   */
  isNote?: boolean;

  /**
   * Ob die Komponente ein Presentation ist
   */
  isPresentation?: boolean;

  /**
   * Ob die Komponente ein Widget ist
   */
  isWidget?: boolean;

  /**
   * Ob die Komponente ein Window ist
   */
  isWindow?: boolean;

  /**
   * Ob die Komponente ein Article ist
   */
  isArticle?: boolean;

  /**
   * Ob die Komponente ein Columnheader ist
   */
  isColumnheader?: boolean;

  /**
   * Ob die Komponente ein Definition ist
   */
  isDefinition?: boolean;

  /**
   * Ob die Komponente ein Directory ist
   */
  isDirectory?: boolean;

  /**
   * Ob die Komponente ein Gridcell ist
   */
  isGridcell?: boolean;

  /**
   * Ob die Komponente ein Heading ist
   */
  isHeading?: boolean;

  /**
   * Ob die Komponente ein Link ist
   */
  isLink?: boolean;

  /**
   * Ob die Komponente ein Row ist
   */
  isRow?: boolean;

  /**
   * Ob die Komponente ein Rowgroup ist
   */
  isRowgroup?: boolean;

  /**
   * Ob die Komponente ein Rowheader ist
   */
  isRowheader?: boolean;

  /**
   * Ob die Komponente ein Tab ist
   */
  isTab?: boolean;

  /**
   * Ob die Komponente ein Term ist
   */
  isTerm?: boolean;

  /**
   * Ob die Komponente ein Time ist
   */
  isTime?: boolean;

  /**
   * Ob die Komponente ein Timer ist
   */
  isTimer?: boolean;

  /**
   * Ob die Komponente ein Marquee ist
   */
  isMarquee?: boolean;

  /**
   * Ob die Komponente ein Progressbar ist
   */
  isProgressbar?: boolean;

  /**
   * Ob die Komponente ein Meter ist
   */
  isMeter?: boolean;

  /**
   * Ob die Komponente ein Log ist
   */
  isLog?: boolean;

  /**
   * Ob die Komponente ein Treegrid ist
   */
  isTreegrid?: boolean;

  /**
   * Ob die Komponente ein Treeitem ist
   */
  isTreeitem?: boolean;

  /**
   * Ob die Komponente ein Switch ist
   */
  isSwitch?: boolean;

  /**
   * Ob die Komponente ein Option ist
   */
  isOption?: boolean;

  /**
   * Ob die Komponente ein Menuitem ist
   */
  isMenuitem?: boolean;

  /**
   * Ob die Komponente ein Menuitemcheckbox ist
   */
  isMenuitemcheckbox?: boolean;

  /**
   * Ob die Komponente ein Menuitemradio ist
   */
  isMenuitemradio?: boolean;

  /**
   * Ob die Komponente ein Menubar ist
   */
  isMenubar?: boolean;

  /**
   * Ob die Komponente ein Menubutton ist
   */
  isMenubutton?: boolean;

  /**
   * Ob die Komponente ein Checkbox ist
   */
  isCheckbox?: boolean;

  /**
   * Ob die Komponente ein Radio ist
   */
  isRadio?: boolean;

  /**
   * Ob die Komponente ein Button ist
   */
  isButton?: boolean;

  /**
   * Ob die Komponente ein Link ist
   */
  isLink2?: boolean;

  /**
   * Ob die Komponente ein Progressbar ist
   */
  isProgressbar2?: boolean;

  /**
   * Ob die Komponente ein Meter ist
   */
  isMeter2?: boolean;

  /**
   * Ob die Komponente ein Slider ist
   */
  isSlider2?: boolean;

  /**
   * Ob die Komponente ein Spinbutton ist
   */
  isSpinbutton2?: boolean;

  /**
   * Ob die Komponente ein Scrollbar ist
   */
  isScrollbar2?: boolean;

  /**
   * Ob die Komponente ein Separator ist
   */
  isSeparator2?: boolean;

  /**
   * Ob die Komponente ein Tooltip ist
   */
  isTooltip2?: boolean;

  /**
   * Ob die Komponente ein Dialog ist
   */
  isDialog2?: boolean;

  /**
   * Ob die Komponente ein Alertdialog ist
   */
  isAlertdialog2?: boolean;

  /**
   * Ob die Komponente ein Banner ist
   */
  isBanner2?: boolean;

  /**
   * Ob die Komponente ein Complementary ist
   */
  isComplementary2?: boolean;

  /**
   * Ob die Komponente ein Contentinfo ist
   */
  isContentinfo2?: boolean;

  /**
   * Ob die Komponente ein Form ist
   */
  isForm2?: boolean;

  /**
   * Ob die Komponente ein Main ist
   */
  isMain2?: boolean;

  /**
   * Ob die Komponente ein Navigation ist
   */
  isNavigation2?: boolean;

  /**
   * Ob die Komponente ein Search ist
   */
  isSearch2?: boolean;

  /**
   * Ob die Komponente ein Application ist
   */
  isApplication2?: boolean;

  /**
   * Ob die Komponente ein Document ist
   */
  isDocument2?: boolean;

  /**
   * Ob die Komponente ein Feed ist
   */
  isFeed2?: boolean;

  /**
   * Ob die Komponente ein Figure ist
   */
  isFigure2?: boolean;

  /**
   * Ob die Komponente ein Group ist
   */
  isGroup2?: boolean;

  /**
   * Ob die Komponente ein Img ist
   */
  isImg2?: boolean;

  /**
   * Ob die Komponente ein List ist
   */
  isList2?: boolean;

  /**
   * Ob die Komponente ein Listitem ist
   */
  isListitem2?: boolean;

  /**
   * Ob die Komponente ein Math ist
   */
  isMath2?: boolean;

  /**
   * Ob die Komponente ein Note ist
   */
  isNote2?: boolean;

  /**
   * Ob die Komponente ein Presentation ist
   */
  isPresentation2?: boolean;

  /**
   * Ob die Komponente ein Tabpanel ist
   */
  isTabpanel2?: boolean;

  /**
   * Ob die Komponente ein Toolbar ist
   */
  isToolbar2?: boolean;

  /**
   * Ob die Komponente ein Tree ist
   */
  isTree2?: boolean;

  /**
   * Ob die Komponente ein Treegrid ist
   */
  isTreegrid2?: boolean;

  /**
   * Ob die Komponente ein Treeitem ist
   */
  isTreeitem2?: boolean;

  /**
   * Ob die Komponente ein Widget ist
   */
  isWidget2?: boolean;

  /**
   * Ob die Komponente ein Window ist
   */
  isWindow2?: boolean;

  /**
   * Ob die Komponente ein Article ist
   */
  isArticle2?: boolean;

  /**
   * Ob die Komponente ein Columnheader ist
   */
  isColumnheader2?: boolean;

  /**
   * Ob die Komponente ein Definition ist
   */
  isDefinition2?: boolean;

  /**
   * Ob die Komponente ein Directory ist
   */
  isDirectory2?: boolean;

  /**
   * Ob die Komponente ein Grid ist
   */
  isGrid2?: boolean;

  /**
   * Ob die Komponente ein Gridcell ist
   */
  isGridcell2?: boolean;

  /**
   * Ob die Komponente ein Heading ist
   */
  isHeading2?: boolean;

  /**
   * Ob die Komponente ein Row ist
   */
  isRow2?: boolean;

  /**
   * Ob die Komponente ein Rowgroup ist
   */
  isRowgroup2?: boolean;

  /**
   * Ob die Komponente ein Rowheader ist
   */
  isRowheader2?: boolean;

  /**
   * Ob die Komponente ein Tablist ist
   */
  isTablist2?: boolean;

  /**
   * Ob die Komponente ein Tab ist
   */
  isTab2?: boolean;

  /**
   * Ob die Komponente ein Term ist
   */
  isTerm2?: boolean;

  /**
   * Ob die Komponente ein Time ist
   */
  isTime2?: boolean;

  /**
   * Ob die Komponente ein Textbox ist
   */
  isTextbox2?: boolean;

  /**
   * Ob die Komponente ein Searchbox ist
   */
  isSearchbox2?: boolean;

  /**
   * Ob die Komponente ein Switch ist
   */
  isSwitch2?: boolean;

  /**
   * Ob die Komponente ein Option ist
   */
  isOption2?: boolean;

  /**
   * Ob die Komponente ein Menuitem ist
   */
  isMenuitem2?: boolean;

  /**
   * Ob die Komponente ein Menuitemcheckbox ist
   */
  isMenuitemcheckbox2?: boolean;

  /**
   * Ob die Komponente ein Menuitemradio ist
   */
  isMenuitemradio2?: boolean;

  /**
   * Ob die Komponente ein Menubar ist
   */
  isMenubar2?: boolean;

  /**
   * Ob die Komponente ein Menubutton ist
   */
  isMenubutton2?: boolean;

  /**
   * Ob die Komponente ein Checkbox ist
   */
  isCheckbox2?: boolean;

  /**
   * Ob die Komponente ein Radio ist
   */
  isRadio2?: boolean;

  /**
   * Ob die Komponente ein Button ist
   */
  isButton2?: boolean;
}

/**
 * Barrierefreie WalletConnect-Komponente für die Verbindung mit Krypto-Wallets
 *
 * @example
 * ```tsx
 * <WalletConnectA11y
 *   onConnect={(address, provider) => console.log('Connected:', address)}
 *   onDisconnect={() => console.log('Disconnected')}
 *   ariaLabel="Wallet-Verbindung"
 *   isLiveRegion={true}
 * />
 * ```
 */
export const WalletConnectA11y: React.FC<WalletConnectA11yProps> = ({
  onConnect,
  onDisconnect,
  supportedWallets = ['metamask', 'walletconnect'],
  className = '',
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  ariaLive = 'polite',
  ariaAtomic = true,
  ariaRelevant,
  ariaBusy,
  isLiveRegion = false,
  isRegion = false,
  isLandmark = false,
  isDialog = false,
  isAlert = false,
  isStatus = false,
  isForm = false,
  isMenu = false,
  isListbox = false,
  isRadiogroup = false,
  isToolbar = false,
  isTree = false,
  isGrid = false,
  isTable = false,
  isTablist = false,
  isTabpanel = false,
  isCombobox = false,
  isTextbox = false,
  isSearchbox = false,
  isSpinbutton = false,
  isSlider = false,
  isScrollbar = false,
  isSeparator = false,
  isTooltip = false,
  isAlertdialog = false,
  isBanner = false,
  isComplementary = false,
  isContentinfo = false,
  isMain = false,
  isNavigation = false,
  isSearch = false,
  isApplication = false,
  isDocument = false,
  isFeed = false,
  isFigure = false,
  isGroup = false,
  isImg = false,
  isList = false,
  isListitem = false,
  isMath = false,
  isNote = false,
  isPresentation = false,
  isWidget = false,
  isWindow = false,
  isArticle = false,
  isColumnheader = false,
  isDefinition = false,
  isDirectory = false,
  isGridcell = false,
  isHeading = false,
  isLink = false,
  isRow = false,
  isRowgroup = false,
  isRowheader = false,
  isTab = false,
  isTerm = false,
  isTime = false,
  isTimer = false,
  isMarquee = false,
  isProgressbar = false,
  isMeter = false,
  isLog = false,
  isTreegrid = false,
  isTreeitem = false,
  isSwitch = false,
  isOption = false,
  isMenuitem = false,
  isMenuitemcheckbox = false,
  isMenuitemradio = false,
  isMenubar = false,
  isMenubutton = false,
  isCheckbox = false,
  isRadio = false,
  isButton = false,
  isLink2 = false,
  isProgressbar2 = false,
  isMeter2 = false,
  isSlider2 = false,
  isSpinbutton2 = false,
  isScrollbar2 = false,
  isSeparator2 = false,
  isTooltip2 = false,
  isDialog2 = false,
  isAlertdialog2 = false,
  isBanner2 = false,
  isComplementary2 = false,
  isContentinfo2 = false,
  isForm2 = false,
  isMain2 = false,
  isNavigation2 = false,
  isSearch2 = false,
  isApplication2 = false,
  isDocument2 = false,
  isFeed2 = false,
  isFigure2 = false,
  isGroup2 = false,
  isImg2 = false,
  isList2 = false,
  isListitem2 = false,
  isMath2 = false,
  isNote2 = false,
  isPresentation2 = false,
  isTabpanel2 = false,
  isToolbar2 = false,
  isTree2 = false,
  isTreegrid2 = false,
  isTreeitem2 = false,
  isWidget2 = false,
  isWindow2 = false,
  isArticle2 = false,
  isColumnheader2 = false,
  isDefinition2 = false,
  isDirectory2 = false,
  isGrid2 = false,
  isGridcell2 = false,
  isHeading2 = false,
  isRow2 = false,
  isRowgroup2 = false,
  isRowheader2 = false,
  isTablist2 = false,
  isTab2 = false,
  isTerm2 = false,
  isTime2 = false,
  isTextbox2 = false,
  isSearchbox2 = false,
  isSwitch2 = false,
  isOption2 = false,
  isMenuitem2 = false,
  isMenuitemcheckbox2 = false,
  isMenuitemradio2 = false,
  isMenubar2 = false,
  isMenubutton2 = false,
  isCheckbox2 = false,
  isRadio2 = false,
  isButton2 = false,
  ...rest
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showWalletOptions, setShowWalletOptions] = useState(false);

  // Prüfen, ob Ethereum verfügbar ist
  const isEthereumAvailable = typeof window !== 'undefined' && (window as any).ethereum;

  // Verbindungsstatus beim Laden prüfen
  useEffect(() => {
    const checkConnection = async () => {
      if (isEthereumAvailable) {
        try {
          const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setIsConnected(true);
            onConnect(accounts[0], (window as any).ethereum);
          }
        } catch (err) {
          console.error('Fehler beim Prüfen der Verbindung:', err);
        }
      }
    };

    checkConnection();
  }, [isEthereumAvailable, onConnect]);

  // Ethereum-Events überwachen
  useEffect(() => {
    if (isEthereumAvailable) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // Benutzer hat die Verbindung getrennt
          setIsConnected(false);
          setWalletAddress(null);
          onDisconnect();
        } else {
          // Benutzer hat das Konto gewechselt
          setWalletAddress(accounts[0]);
          setIsConnected(true);
          onConnect(accounts[0], (window as any).ethereum);
        }
      };

      const handleChainChanged = () => {
        // Seite neu laden, wenn sich die Chain ändert
        window.location.reload();
      };

      (window as any).ethereum.on('accountsChanged', handleAccountsChanged);
      (window as any).ethereum.on('chainChanged', handleChainChanged);

      return () => {
        (window as any).ethereum.removeListener('accountsChanged', handleAccountsChanged);
        (window as any).ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [isEthereumAvailable, onConnect, onDisconnect]);

  // Mit MetaMask verbinden
  const connectMetaMask = async () => {
    if (!isEthereumAvailable) {
      setError(
        'MetaMask ist nicht installiert. Bitte installieren Sie MetaMask und versuchen Sie es erneut.'
      );
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
      setIsConnected(true);
      onConnect(accounts[0], (window as any).ethereum);
    } catch (err) {
      console.error('Fehler beim Verbinden mit MetaMask:', err);
      setError('Verbindung mit MetaMask fehlgeschlagen. Bitte versuchen Sie es erneut.');
    } finally {
      setIsConnecting(false);
      setShowWalletOptions(false);
    }
  };

  // Mit WalletConnect verbinden
  const connectWalletConnect = async () => {
    setError('WalletConnect-Integration ist noch nicht implementiert.');
    setShowWalletOptions(false);
  };

  // Verbindung trennen
  const disconnect = () => {
    setIsConnected(false);
    setWalletAddress(null);
    onDisconnect();
  };

  // Wallet-Adresse formatieren
  const formatAddress = (address: string): string => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Bestimme die Rolle basierend auf den Eigenschaften
  const determineRole = () => {
    if (isRegion) return 'region';
    if (isLandmark) return 'landmark';
    if (isDialog) return 'dialog';
    if (isAlert) return 'alert';
    if (isStatus) return 'status';
    if (isForm) return 'form';
    if (isMenu) return 'menu';
    if (isListbox) return 'listbox';
    if (isRadiogroup) return 'radiogroup';
    if (isToolbar) return 'toolbar';
    if (isTree) return 'tree';
    if (isGrid) return 'grid';
    if (isTable) return 'table';
    if (isTablist) return 'tablist';
    if (isTabpanel) return 'tabpanel';
    if (isCombobox) return 'combobox';
    if (isTextbox) return 'textbox';
    if (isSearchbox) return 'searchbox';
    if (isSpinbutton) return 'spinbutton';
    if (isSlider) return 'slider';
    if (isScrollbar) return 'scrollbar';
    if (isSeparator) return 'separator';
    if (isTooltip) return 'tooltip';
    if (isAlertdialog) return 'alertdialog';
    if (isBanner) return 'banner';
    if (isComplementary) return 'complementary';
    if (isContentinfo) return 'contentinfo';
    if (isMain) return 'main';
    if (isNavigation) return 'navigation';
    if (isSearch) return 'search';
    if (isApplication) return 'application';
    if (isDocument) return 'document';
    if (isFeed) return 'feed';
    if (isFigure) return 'figure';
    if (isGroup) return 'group';
    if (isImg) return 'img';
    if (isList) return 'list';
    if (isListitem) return 'listitem';
    if (isMath) return 'math';
    if (isNote) return 'note';
    if (isPresentation) return 'presentation';
    if (isWidget) return 'widget';
    if (isWindow) return 'window';
    if (isArticle) return 'article';
    if (isColumnheader) return 'columnheader';
    if (isDefinition) return 'definition';
    if (isDirectory) return 'directory';
    if (isGridcell) return 'gridcell';
    if (isHeading) return 'heading';
    if (isLink) return 'link';
    if (isRow) return 'row';
    if (isRowgroup) return 'rowgroup';
    if (isRowheader) return 'rowheader';
    if (isTab) return 'tab';
    if (isTerm) return 'term';
    if (isTime) return 'time';
    if (isTimer) return 'timer';
    if (isMarquee) return 'marquee';
    if (isProgressbar) return 'progressbar';
    if (isMeter) return 'meter';
    if (isLog) return 'log';
    if (isTreegrid) return 'treegrid';
    if (isTreeitem) return 'treeitem';
    if (isSwitch) return 'switch';
    if (isOption) return 'option';
    if (isMenuitem) return 'menuitem';
    if (isMenuitemcheckbox) return 'menuitemcheckbox';
    if (isMenuitemradio) return 'menuitemradio';
    if (isMenubar) return 'menubar';
    if (isMenubutton) return 'menubutton';
    if (isCheckbox) return 'checkbox';
    if (isRadio) return 'radio';
    if (isButton) return 'button';
    return undefined;
  };

  // Screenreader-Ankündigung für den Verbindungsstatus
  const getConnectionStatusAnnouncement = () => {
    if (isConnected) {
      return `Wallet verbunden. Adresse: ${formatAddress(walletAddress!)}`;
    } else if (isConnecting) {
      return 'Verbindung wird hergestellt...';
    } else if (error) {
      return `Fehler: ${error}`;
    } else if (showWalletOptions) {
      return 'Bitte wählen Sie eine Wallet aus.';
    } else {
      return 'Wallet nicht verbunden.';
    }
  };

  return (
    <div
      className={className}
      role={determineRole()}
      aria-label={ariaLabel || 'Wallet-Verbindung'}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-live={isLiveRegion ? ariaLive : undefined}
      aria-atomic={isLiveRegion ? ariaAtomic : undefined}
      aria-relevant={isLiveRegion ? ariaRelevant : undefined}
      aria-busy={isConnecting || ariaBusy ? 'true' : undefined}
    >
      {/* Screenreader-Ankündigung */}
      {isLiveRegion && (
        <div className="sr-only" aria-live={ariaLive} aria-atomic={ariaAtomic}>
          {getConnectionStatusAnnouncement()}
        </div>
      )}

      {isConnected ? (
        <div className="flex items-center space-x-2">
          <div
            className="flex items-center bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm"
            role="status"
            aria-label={`Wallet verbunden: ${formatAddress(walletAddress!)}`}
          >
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2" aria-hidden="true"></span>
            <span>{formatAddress(walletAddress!)}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={disconnect}
            aria-label="Wallet-Verbindung trennen"
          >
            Trennen
          </Button>
        </div>
      ) : (
        <div>
          {showWalletOptions ? (
            <Card
              className="p-4"
              role={isDialog ? 'dialog' : undefined}
              aria-labelledby="wallet-connect-title"
              aria-describedby={error ? 'wallet-connect-error' : undefined}
              aria-modal={isDialog ? 'true' : undefined}
            >
              <h3
                className="text-lg font-medium text-gray-900 dark:text-white mb-4"
                id="wallet-connect-title"
              >
                Wallet verbinden
              </h3>

              <div
                className="space-y-2"
                role={
                  isListbox ? 'listbox' : isList ? 'list' : isRadiogroup ? 'radiogroup' : undefined
                }
                aria-label="Verfügbare Wallets"
              >
                {supportedWallets.includes('metamask') && (
                  <button
                    onClick={connectMetaMask}
                    disabled={isConnecting}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    role={
                      isOption
                        ? 'option'
                        : isMenuitem
                          ? 'menuitem'
                          : isListitem
                            ? 'listitem'
                            : undefined
                    }
                    aria-label="Mit MetaMask verbinden"
                    aria-disabled={isConnecting ? 'true' : undefined}
                  >
                    <div className="flex items-center">
                      <img
                        src="https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg"
                        alt="MetaMask Logo"
                        className="w-8 h-8 mr-3"
                      />
                      <span className="font-medium">MetaMask</span>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )}

                {supportedWallets.includes('walletconnect') && (
                  <button
                    onClick={connectWalletConnect}
                    disabled={isConnecting}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    role={
                      isOption
                        ? 'option'
                        : isMenuitem
                          ? 'menuitem'
                          : isListitem
                            ? 'listitem'
                            : undefined
                    }
                    aria-label="Mit WalletConnect verbinden"
                    aria-disabled={isConnecting ? 'true' : undefined}
                  >
                    <div className="flex items-center">
                      <img
                        src="https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Icon/Blue%20(Default)/Icon.svg"
                        alt="WalletConnect Logo"
                        className="w-8 h-8 mr-3"
                      />
                      <span className="font-medium">WalletConnect</span>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {error && (
                <div
                  className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md text-sm"
                  role="alert"
                  id="wallet-connect-error"
                >
                  {error}
                </div>
              )}

              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowWalletOptions(false)}
                  aria-label="Wallet-Auswahl abbrechen"
                >
                  Abbrechen
                </Button>
              </div>
            </Card>
          ) : (
            <Button
              variant="primary"
              onClick={() => setShowWalletOptions(true)}
              aria-label="Wallet verbinden"
              aria-haspopup={isDialog ? 'dialog' : undefined}
              aria-expanded={showWalletOptions ? 'true' : 'false'}
            >
              Wallet verbinden
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default WalletConnectA11y;
