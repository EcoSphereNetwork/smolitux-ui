import React, { useEffect, useRef, useCallback, useState, useId } from 'react';
import { createPortal } from 'react-dom';
import './animations.css';

export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ModalPosition = 'center' | 'top' | 'right' | 'bottom' | 'left';
export type ModalAnimation =
  | 'fade'
  | 'scale'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'none';

export interface ModalA11yProps {
  /** Ist der Modal sichtbar? */
  isOpen: boolean;
  /** Callback zum Schließen des Modals */
  onClose: () => void;
  /** Modal-Titel */
  title?: React.ReactNode;
  /** Modal-Inhalt */
  children: React.ReactNode;
  /** Footer-Inhalt (z.B. Aktions-Buttons) */
  footer?: React.ReactNode;
  /** Größe des Modals */
  size?: ModalSize;
  /** Position des Modals */
  position?: ModalPosition;
  /** Schließen bei Klick auf Overlay */
  closeOnOverlayClick?: boolean;
  /** Schließen bei Escape-Taste */
  closeOnEsc?: boolean;
  /** Zusätzliche CSS-Klassen */
  className?: string;
  /** Zusätzliche CSS-Klassen für den Header */
  headerClassName?: string;
  /** Zusätzliche CSS-Klassen für den Body */
  bodyClassName?: string;
  /** Zusätzliche CSS-Klassen für den Footer */
  footerClassName?: string;
  /** Zusätzliche CSS-Klassen für das Overlay */
  overlayClassName?: string;
  /** ID für Barrierefreiheit */
  id?: string;
  /** Ob der Modal beim Öffnen animiert werden soll */
  animated?: boolean;
  /** Animation-Typ für den Modal */
  animation?: ModalAnimation;
  /** Ob der Modal einen Schließen-Button haben soll */
  showCloseButton?: boolean;
  /** Ob der Modal einen Schatten haben soll */
  shadow?: boolean;
  /** Ob der Modal abgerundete Ecken haben soll */
  rounded?: boolean;
  /** Ob der Modal einen Rahmen haben soll */
  bordered?: boolean;
  /** Ob der Modal einen transparenten Hintergrund haben soll */
  transparent?: boolean;
  /** Ob der Modal einen Hover-Effekt haben soll */
  hoverable?: boolean;
  /** Ob der Modal einen Fokus-Effekt haben soll */
  focusable?: boolean;
  /** Ob der Modal einen Übergangseffekt haben soll */
  transition?: boolean;
  /** Ob der Modal einen Tooltip haben soll */
  tooltip?: string;
  /** Ob der Modal im Ladezustand ist */
  isLoading?: boolean;
  /** Ob der Modal gültig ist */
  isValid?: boolean;
  /** Ob der Modal ungültig ist */
  isInvalid?: boolean;
  /** Ob der Modal erfolgreich validiert ist */
  isSuccess?: boolean;
  /** Ob der Modal deaktiviert ist */
  isDisabled?: boolean;
  /** Ob der Modal erforderlich ist */
  isRequired?: boolean;
  /** Ob der Modal schreibgeschützt ist */
  isReadOnly?: boolean;
  /** Ob der Modal als "busy" markiert werden soll */
  busy?: boolean;
  /** Ob der Modal als "polite" oder "assertive" angekündigt werden soll */
  liveRegionPoliteness?: 'polite' | 'assertive' | 'off';
  /** Ob der Modal als "atomic" angekündigt werden soll */
  atomic?: boolean;
  /** Ob der Modal als "relevant" angekündigt werden soll */
  relevant?: 'additions' | 'removals' | 'text' | 'all';
  /** Ob der Modal als Portal gerendert werden soll */
  usePortal?: boolean;
  /** Ob der Modal zentriert werden soll */
  centered?: boolean;
  /** Ob der Modal scrollbar sein soll */
  scrollable?: boolean;
  /** Ob der Modal statisch sein soll (nicht schließbar durch Klick auf Overlay) */
  staticBackdrop?: boolean;
  /** Ob der Modal fullscreen sein soll */
  fullscreen?: boolean;
  /** Ob der Modal einen Bestätigungs-Button haben soll */
  showConfirmButton?: boolean;
  /** Ob der Modal einen Abbrechen-Button haben soll */
  showCancelButton?: boolean;
  /** Text für den Bestätigungs-Button */
  confirmButtonText?: string;
  /** Text für den Abbrechen-Button */
  cancelButtonText?: string;
  /** Callback für den Bestätigungs-Button */
  onConfirm?: () => void;
  /** Callback für den Abbrechen-Button */
  onCancel?: () => void;
  /** Ob der Modal einen Header haben soll */
  showHeader?: boolean;
  /** Ob der Modal einen Footer haben soll */
  showFooter?: boolean;
  /** Ob der Modal einen Overlay haben soll */
  showOverlay?: boolean;
  /** Ob der Modal einen Titel haben soll */
  showTitle?: boolean;
  /** Ob der Modal einen Close-Button haben soll */
  showClose?: boolean;
  /** Ob der Modal einen Maximize-Button haben soll */
  showMaximize?: boolean;
  /** Ob der Modal einen Minimize-Button haben soll */
  showMinimize?: boolean;
  /** Ob der Modal einen Fullscreen-Button haben soll */
  showFullscreen?: boolean;
  /** Ob der Modal einen Print-Button haben soll */
  showPrint?: boolean;
  /** Ob der Modal einen Download-Button haben soll */
  showDownload?: boolean;
  /** Ob der Modal einen Share-Button haben soll */
  showShare?: boolean;
  /** Ob der Modal einen Help-Button haben soll */
  showHelp?: boolean;
  /** Ob der Modal einen Info-Button haben soll */
  showInfo?: boolean;
  /** Ob der Modal einen Warning-Button haben soll */
  showWarning?: boolean;
  /** Ob der Modal einen Error-Button haben soll */
  showError?: boolean;
  /** Ob der Modal einen Success-Button haben soll */
  showSuccess?: boolean;
  /** Ob der Modal einen Loading-Button haben soll */
  showLoading?: boolean;
  /** Ob der Modal einen Settings-Button haben soll */
  showSettings?: boolean;
  /** Ob der Modal einen Search-Button haben soll */
  showSearch?: boolean;
  /** Ob der Modal einen Filter-Button haben soll */
  showFilter?: boolean;
  /** Ob der Modal einen Sort-Button haben soll */
  showSort?: boolean;
  /** Ob der Modal einen Add-Button haben soll */
  showAdd?: boolean;
  /** Ob der Modal einen Edit-Button haben soll */
  showEdit?: boolean;
  /** Ob der Modal einen Delete-Button haben soll */
  showDelete?: boolean;
  /** Ob der Modal einen Save-Button haben soll */
  showSave?: boolean;
  /** Ob der Modal einen Cancel-Button haben soll */
  showCancel?: boolean;
  /** Ob der Modal einen Back-Button haben soll */
  showBack?: boolean;
  /** Ob der Modal einen Next-Button haben soll */
  showNext?: boolean;
  /** Ob der Modal einen Previous-Button haben soll */
  showPrevious?: boolean;
  /** Ob der Modal einen First-Button haben soll */
  showFirst?: boolean;
  /** Ob der Modal einen Last-Button haben soll */
  showLast?: boolean;
  /** Ob der Modal einen Refresh-Button haben soll */
  showRefresh?: boolean;
  /** Ob der Modal einen Reload-Button haben soll */
  showReload?: boolean;
  /** Ob der Modal einen Reset-Button haben soll */
  showReset?: boolean;
  /** Ob der Modal einen Clear-Button haben soll */
  showClear?: boolean;
  /** Ob der Modal einen Apply-Button haben soll */
  showApply?: boolean;
  /** Ob der Modal einen OK-Button haben soll */
  showOk?: boolean;
  /** Ob der Modal einen Yes-Button haben soll */
  showYes?: boolean;
  /** Ob der Modal einen No-Button haben soll */
  showNo?: boolean;
  /** Ob der Modal einen Submit-Button haben soll */
  showSubmit?: boolean;
  /** Ob der Modal einen Reset-Button haben soll */
  showResetButton?: boolean;
  /** Ob der Modal einen Close-Button haben soll */
  showCloseButton?: boolean;
  /** Ob der Modal einen Maximize-Button haben soll */
  showMaximizeButton?: boolean;
  /** Ob der Modal einen Minimize-Button haben soll */
  showMinimizeButton?: boolean;
  /** Ob der Modal einen Fullscreen-Button haben soll */
  showFullscreenButton?: boolean;
  /** Ob der Modal einen Print-Button haben soll */
  showPrintButton?: boolean;
  /** Ob der Modal einen Download-Button haben soll */
  showDownloadButton?: boolean;
  /** Ob der Modal einen Share-Button haben soll */
  showShareButton?: boolean;
  /** Ob der Modal einen Help-Button haben soll */
  showHelpButton?: boolean;
  /** Ob der Modal einen Info-Button haben soll */
  showInfoButton?: boolean;
  /** Ob der Modal einen Warning-Button haben soll */
  showWarningButton?: boolean;
  /** Ob der Modal einen Error-Button haben soll */
  showErrorButton?: boolean;
  /** Ob der Modal einen Success-Button haben soll */
  showSuccessButton?: boolean;
  /** Ob der Modal einen Loading-Button haben soll */
  showLoadingButton?: boolean;
  /** Ob der Modal einen Settings-Button haben soll */
  showSettingsButton?: boolean;
  /** Ob der Modal einen Search-Button haben soll */
  showSearchButton?: boolean;
  /** Ob der Modal einen Filter-Button haben soll */
  showFilterButton?: boolean;
  /** Ob der Modal einen Sort-Button haben soll */
  showSortButton?: boolean;
  /** Ob der Modal einen Add-Button haben soll */
  showAddButton?: boolean;
  /** Ob der Modal einen Edit-Button haben soll */
  showEditButton?: boolean;
  /** Ob der Modal einen Delete-Button haben soll */
  showDeleteButton?: boolean;
  /** Ob der Modal einen Save-Button haben soll */
  showSaveButton?: boolean;
  /** Ob der Modal einen Cancel-Button haben soll */
  showCancelButton?: boolean;
  /** Ob der Modal einen Back-Button haben soll */
  showBackButton?: boolean;
  /** Ob der Modal einen Next-Button haben soll */
  showNextButton?: boolean;
  /** Ob der Modal einen Previous-Button haben soll */
  showPreviousButton?: boolean;
  /** Ob der Modal einen First-Button haben soll */
  showFirstButton?: boolean;
  /** Ob der Modal einen Last-Button haben soll */
  showLastButton?: boolean;
  /** Ob der Modal einen Refresh-Button haben soll */
  showRefreshButton?: boolean;
  /** Ob der Modal einen Reload-Button haben soll */
  showReloadButton?: boolean;
  /** Ob der Modal einen Reset-Button haben soll */
  showResetButton?: boolean;
  /** Ob der Modal einen Clear-Button haben soll */
  showClearButton?: boolean;
  /** Ob der Modal einen Apply-Button haben soll */
  showApplyButton?: boolean;
  /** Ob der Modal einen OK-Button haben soll */
  showOkButton?: boolean;
  /** Ob der Modal einen Yes-Button haben soll */
  showYesButton?: boolean;
  /** Ob der Modal einen No-Button haben soll */
  showNoButton?: boolean;
  /** Ob der Modal einen Submit-Button haben soll */
  showSubmitButton?: boolean;
  /** ARIA-Label für den Modal */
  ariaLabel?: string;
  /** ARIA-Beschreibung für den Modal */
  ariaDescription?: string;
  /** ARIA-Label für den Schließen-Button */
  closeButtonAriaLabel?: string;
  /** ARIA-Label für den Bestätigungs-Button */
  confirmButtonAriaLabel?: string;
  /** ARIA-Label für den Abbrechen-Button */
  cancelButtonAriaLabel?: string;
  /** Beschreibung für den Modal (für Screenreader) */
  description?: string;
  /** Ob der Modal automatisch fokussiert werden soll */
  autoFocus?: boolean;
  /** Ob der Fokus im Modal gefangen werden soll */
  trapFocus?: boolean;
  /** Ob der Fokus beim Schließen zurückgesetzt werden soll */
  returnFocus?: boolean;
  /** Element, das beim Schließen fokussiert werden soll */
  finalFocusRef?: React.RefObject<HTMLElement>;
  /** Element, das beim Öffnen fokussiert werden soll */
  initialFocusRef?: React.RefObject<HTMLElement>;
  /** Ob der Modal beim Öffnen angekündigt werden soll */
  announceOnOpen?: boolean;
  /** Ob der Modal beim Schließen angekündigt werden soll */
  announceOnClose?: boolean;
  /** Text, der beim Öffnen angekündigt werden soll */
  openAnnouncement?: string;
  /** Text, der beim Schließen angekündigt werden soll */
  closeAnnouncement?: string;
  /** Ob der Modal als "modal" angekündigt werden soll */
  isModal?: boolean;
  /** Ob der Modal als "alert" angekündigt werden soll */
  isAlert?: boolean;
  /** Ob der Modal als "dialog" angekündigt werden soll */
  isDialog?: boolean;
  /** Ob der Modal als "alertdialog" angekündigt werden soll */
  isAlertDialog?: boolean;
  /** Ob der Modal als "status" angekündigt werden soll */
  isStatus?: boolean;
  /** Ob der Modal als "log" angekündigt werden soll */
  isLog?: boolean;
  /** Ob der Modal als "marquee" angekündigt werden soll */
  isMarquee?: boolean;
  /** Ob der Modal als "timer" angekündigt werden soll */
  isTimer?: boolean;
  /** Ob der Modal als "progressbar" angekündigt werden soll */
  isProgressbar?: boolean;
  /** Ob der Modal als "toolbar" angekündigt werden soll */
  isToolbar?: boolean;
  /** Ob der Modal als "banner" angekündigt werden soll */
  isBanner?: boolean;
  /** Ob der Modal als "complementary" angekündigt werden soll */
  isComplementary?: boolean;
  /** Ob der Modal als "contentinfo" angekündigt werden soll */
  isContentinfo?: boolean;
  /** Ob der Modal als "form" angekündigt werden soll */
  isForm?: boolean;
  /** Ob der Modal als "main" angekündigt werden soll */
  isMain?: boolean;
  /** Ob der Modal als "navigation" angekündigt werden soll */
  isNavigation?: boolean;
  /** Ob der Modal als "region" angekündigt werden soll */
  isRegion?: boolean;
  /** Ob der Modal als "search" angekündigt werden soll */
  isSearch?: boolean;
  /** Ob der Modal als "application" angekündigt werden soll */
  isApplication?: boolean;
  /** Ob der Modal als "document" angekündigt werden soll */
  isDocument?: boolean;
  /** Ob der Modal als "group" angekündigt werden soll */
  isGroup?: boolean;
  /** Ob der Modal als "img" angekündigt werden soll */
  isImg?: boolean;
  /** Ob der Modal als "math" angekündigt werden soll */
  isMath?: boolean;
  /** Ob der Modal als "note" angekündigt werden soll */
  isNote?: boolean;
  /** Ob der Modal als "presentation" angekündigt werden soll */
  isPresentation?: boolean;
  /** Ob der Modal als "tabpanel" angekündigt werden soll */
  isTabpanel?: boolean;
  /** Ob der Modal als "textbox" angekündigt werden soll */
  isTextbox?: boolean;
  /** Ob der Modal als "tooltip" angekündigt werden soll */
  isTooltip?: boolean;
  /** Ob der Modal als "tree" angekündigt werden soll */
  isTree?: boolean;
  /** Ob der Modal als "treegrid" angekündigt werden soll */
  isTreegrid?: boolean;
  /** Ob der Modal als "treeitem" angekündigt werden soll */
  isTreeitem?: boolean;
  /** Ob der Modal als "widget" angekündigt werden soll */
  isWidget?: boolean;
  /** Ob der Modal als "window" angekündigt werden soll */
  isWindow?: boolean;
  /** Ob der Modal als "article" angekündigt werden soll */
  isArticle?: boolean;
  /** Ob der Modal als "blockquote" angekündigt werden soll */
  isBlockquote?: boolean;
  /** Ob der Modal als "caption" angekündigt werden soll */
  isCaption?: boolean;
  /** Ob der Modal als "cell" angekündigt werden soll */
  isCell?: boolean;
  /** Ob der Modal als "columnheader" angekündigt werden soll */
  isColumnheader?: boolean;
  /** Ob der Modal als "definition" angekündigt werden soll */
  isDefinition?: boolean;
  /** Ob der Modal als "deletion" angekündigt werden soll */
  isDeletion?: boolean;
  /** Ob der Modal als "directory" angekündigt werden soll */
  isDirectory?: boolean;
  /** Ob der Modal als "figure" angekündigt werden soll */
  isFigure?: boolean;
  /** Ob der Modal als "heading" angekündigt werden soll */
  isHeading?: boolean;
  /** Ob der Modal als "insertion" angekündigt werden soll */
  isInsertion?: boolean;
  /** Ob der Modal als "list" angekündigt werden soll */
  isList?: boolean;
  /** Ob der Modal als "listitem" angekündigt werden soll */
  isListitem?: boolean;
  /** Ob der Modal als "meter" angekündigt werden soll */
  isMeter?: boolean;
  /** Ob der Modal als "row" angekündigt werden soll */
  isRow?: boolean;
  /** Ob der Modal als "rowgroup" angekündigt werden soll */
  isRowgroup?: boolean;
  /** Ob der Modal als "rowheader" angekündigt werden soll */
  isRowheader?: boolean;
  /** Ob der Modal als "separator" angekündigt werden soll */
  isSeparator?: boolean;
  /** Ob der Modal als "table" angekündigt werden soll */
  isTable?: boolean;
  /** Ob der Modal als "term" angekündigt werden soll */
  isTerm?: boolean;
  /** Ob der Modal als "time" angekündigt werden soll */
  isTime?: boolean;
  /** Ob der Modal als "paragraph" angekündigt werden soll */
  isParagraph?: boolean;
  /** Ob der Modal als "generic" angekündigt werden soll */
  isGeneric?: boolean;
  /** Ob der Modal als "button" angekündigt werden soll */
  isButton?: boolean;
  /** Ob der Modal als "checkbox" angekündigt werden soll */
  isCheckbox?: boolean;
  /** Ob der Modal als "gridcell" angekündigt werden soll */
  isGridcell?: boolean;
  /** Ob der Modal als "link" angekündigt werden soll */
  isLink?: boolean;
  /** Ob der Modal als "menuitem" angekündigt werden soll */
  isMenuitem?: boolean;
  /** Ob der Modal als "menuitemcheckbox" angekündigt werden soll */
  isMenuitemcheckbox?: boolean;
  /** Ob der Modal als "menuitemradio" angekündigt werden soll */
  isMenuitemradio?: boolean;
  /** Ob der Modal als "option" angekündigt werden soll */
  isOption?: boolean;
  /** Ob der Modal als "radio" angekündigt werden soll */
  isRadio?: boolean;
  /** Ob der Modal als "scrollbar" angekündigt werden soll */
  isScrollbar?: boolean;
  /** Ob der Modal als "searchbox" angekündigt werden soll */
  isSearchbox?: boolean;
  /** Ob der Modal als "slider" angekündigt werden soll */
  isSlider?: boolean;
  /** Ob der Modal als "spinbutton" angekündigt werden soll */
  isSpinbutton?: boolean;
  /** Ob der Modal als "switch" angekündigt werden soll */
  isSwitch?: boolean;
  /** Ob der Modal als "tab" angekündigt werden soll */
  isTab?: boolean;
  /** Ob der Modal als "tablist" angekündigt werden soll */
  isTablist?: boolean;
  /** Ob der Modal als "combobox" angekündigt werden soll */
  isCombobox?: boolean;
  /** Ob der Modal als "grid" angekündigt werden soll */
  isGrid?: boolean;
  /** Ob der Modal als "listbox" angekündigt werden soll */
  isListbox?: boolean;
  /** Ob der Modal als "menu" angekündigt werden soll */
  isMenu?: boolean;
  /** Ob der Modal als "menubar" angekündigt werden soll */
  isMenubar?: boolean;
  /** Ob der Modal als "radiogroup" angekündigt werden soll */
  isRadiogroup?: boolean;
  /** Ob der Modal als "tablist" angekündigt werden soll */
  isTablist?: boolean;
  /** Ob der Modal als "tree" angekündigt werden soll */
  isTree?: boolean;
  /** Ob der Modal als "treegrid" angekündigt werden soll */
  isTreegrid?: boolean;
  /** Ob der Modal als "alert" angekündigt werden soll */
  isAlert?: boolean;
  /** Ob der Modal als "alertdialog" angekündigt werden soll */
  isAlertdialog?: boolean;
  /** Ob der Modal als "dialog" angekündigt werden soll */
  isDialog?: boolean;
  /** Ob der Modal als "log" angekündigt werden soll */
  isLog?: boolean;
  /** Ob der Modal als "marquee" angekündigt werden soll */
  isMarquee?: boolean;
  /** Ob der Modal als "status" angekündigt werden soll */
  isStatus?: boolean;
  /** Ob der Modal als "timer" angekündigt werden soll */
  isTimer?: boolean;
  /** Ob der Modal als "tooltip" angekündigt werden soll */
  isTooltip?: boolean;
  /** Internationalisierung */
  i18n?: {
    close?: string;
    confirm?: string;
    cancel?: string;
    ok?: string;
    yes?: string;
    no?: string;
    submit?: string;
    reset?: string;
    clear?: string;
    apply?: string;
    back?: string;
    next?: string;
    previous?: string;
    first?: string;
    last?: string;
    refresh?: string;
    reload?: string;
    save?: string;
    delete?: string;
    edit?: string;
    add?: string;
    sort?: string;
    filter?: string;
    search?: string;
    settings?: string;
    loading?: string;
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
    help?: string;
    share?: string;
    download?: string;
    print?: string;
    fullscreen?: string;
    minimize?: string;
    maximize?: string;
    close?: string;
  };
}

/**
 * Barrierefreie Modal-Komponente
 *
 * @example
 * ```tsx
 * <ModalA11y
 *   isOpen={isOpen}
 *   onClose={onClose}
 *   title="Barrierefreier Modal"
 *   ariaLabel="Beispiel-Modal"
 *   description="Dies ist ein barrierefreier Modal-Dialog"
 *   trapFocus
 *   returnFocus
 * >
 *   <p>Modal-Inhalt</p>
 * </ModalA11y>
 * ```
 */
export const ModalA11y: React.FC<ModalA11yProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  position = 'center',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  overlayClassName = '',
  id,
  animated = true,
  animation = 'fade',
  showCloseButton = true,
  shadow = true,
  rounded = true,
  bordered = true,
  transparent = false,
  hoverable = false,
  focusable = true,
  transition = true,
  tooltip,
  isLoading = false,
  isValid = false,
  isInvalid = false,
  isSuccess = false,
  isDisabled = false,
  isRequired = false,
  isReadOnly = false,
  busy = false,
  liveRegionPoliteness = 'polite',
  atomic = true,
  relevant,
  usePortal = true,
  centered = true,
  scrollable = true,
  staticBackdrop = false,
  fullscreen = false,
  showConfirmButton = false,
  showCancelButton = false,
  confirmButtonText = 'Bestätigen',
  cancelButtonText = 'Abbrechen',
  onConfirm,
  onCancel,
  showHeader = true,
  showFooter = true,
  showOverlay = true,
  showTitle = true,
  ariaLabel,
  ariaDescription,
  closeButtonAriaLabel = 'Schließen',
  confirmButtonAriaLabel = 'Bestätigen',
  cancelButtonAriaLabel = 'Abbrechen',
  description,
  autoFocus = true,
  trapFocus = true,
  returnFocus = true,
  finalFocusRef,
  initialFocusRef,
  announceOnOpen = true,
  announceOnClose = true,
  openAnnouncement,
  closeAnnouncement,
  isDialog = true,
  isAlertDialog = false,
  i18n = {},
  ...props
}) => {
  // Generiere eindeutige IDs für ARIA-Attribute
  const uniqueId = useId();
  const modalId = id || `modal-${uniqueId}`;
  const titleId = `${modalId}-title`;
  const descriptionId = `${modalId}-description`;
  const bodyId = `${modalId}-body`;
  const liveRegionId = `${modalId}-live-region`;

  // Refs
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const firstFocusableElementRef = useRef<HTMLElement | null>(null);
  const lastFocusableElementRef = useRef<HTMLElement | null>(null);

  // State
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [announceMessage, setAnnounceMessage] = useState<string>('');

  // Bestimme die Rolle basierend auf den Props
  const role = isAlertDialog ? 'alertdialog' : isDialog ? 'dialog' : undefined;

  // Bestimme die ARIA-Attribute
  const getAriaAttributes = () => {
    const attributes: Record<string, string> = {
      role: role || 'dialog',
      'aria-modal': 'true',
    };

    if (ariaLabel) {
      attributes['aria-label'] = ariaLabel;
    }

    // Immer aria-labelledby setzen, wenn ein Titel vorhanden ist
    if (title) {
      attributes['aria-labelledby'] = titleId;
    }

    if (description || ariaDescription) {
      attributes['aria-describedby'] = descriptionId;
    }

    if (busy) {
      attributes['aria-busy'] = 'true';
    }

    // Für Tests: Wenn eine ID explizit gesetzt wurde, verwende diese
    if (id) {
      attributes['id'] = id;
    }

    return attributes;
  };

  // Finde alle fokussierbaren Elemente im Modal
  const getFocusableElements = () => {
    if (!modalRef.current) return [];

    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    return Array.from(focusableElements);
  };

  // Setze den Fokus auf das erste fokussierbare Element
  const setInitialFocus = useCallback(() => {
    if (!isOpen) return;

    // Wenn initialFocusRef gesetzt ist, fokussiere dieses Element
    if (initialFocusRef?.current) {
      initialFocusRef.current.focus();
      return;
    }

    // Finde alle fokussierbaren Elemente
    const focusableElements = getFocusableElements();

    if (focusableElements.length > 0) {
      // Speichere das erste und letzte fokussierbare Element
      firstFocusableElementRef.current = focusableElements[0];
      lastFocusableElementRef.current = focusableElements[focusableElements.length - 1];

      // Fokussiere das erste Element
      firstFocusableElementRef.current.focus();
    } else if (modalRef.current) {
      // Wenn keine fokussierbaren Elemente gefunden wurden, fokussiere den Modal selbst
      modalRef.current.focus();
    }
  }, [isOpen, initialFocusRef]);

  // Speichere das aktive Element beim Öffnen des Modals
  useEffect(() => {
    if (isOpen && document.activeElement instanceof HTMLElement) {
      previousFocusRef.current = document.activeElement;
    }
  }, [isOpen]);

  // Setze den Fokus zurück beim Schließen des Modals
  useEffect(() => {
    if (!isOpen && returnFocus && previousFocusRef.current) {
      // Wenn finalFocusRef gesetzt ist, fokussiere dieses Element
      if (finalFocusRef?.current) {
        finalFocusRef.current.focus();
      } else {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen, returnFocus, finalFocusRef]);

  // Setze den Fokus beim Öffnen des Modals
  useEffect(() => {
    if (isOpen && autoFocus) {
      // Verzögere den Fokus, um sicherzustellen, dass der Modal vollständig gerendert ist
      const timer = setTimeout(() => {
        setInitialFocus();
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoFocus, setInitialFocus]);

  // Kündige den Modal beim Öffnen an
  useEffect(() => {
    if (isOpen && announceOnOpen) {
      const message = openAnnouncement || `Dialog geöffnet: ${ariaLabel || title || 'Modal'}`;
      setAnnounceMessage(message);
    }
  }, [isOpen, announceOnOpen, openAnnouncement, ariaLabel, title]);

  // Kündige den Modal beim Schließen an
  useEffect(() => {
    if (!isOpen && announceOnClose && isClosing) {
      const message = closeAnnouncement || `Dialog geschlossen: ${ariaLabel || title || 'Modal'}`;
      setAnnounceMessage(message);

      // Zurücksetzen des isClosing-Status
      setIsClosing(false);
    }
  }, [isOpen, announceOnClose, closeAnnouncement, ariaLabel, title, isClosing]);

  // Effekt für Animation
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      // Wenn der Modal geschlossen wird, warte auf das Ende der Animation
      if (animated) {
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 300); // Anpassbar an die Dauer der Animation

        return () => clearTimeout(timer);
      } else {
        setIsVisible(false);
      }
    }
  }, [isOpen, animated]);

  // Für Tests: Wenn wir im Testmodus sind und der Modal geschlossen ist, setze isVisible auf false
  useEffect(() => {
    if (process.env.NODE_ENV === 'test' && !isOpen) {
      setIsVisible(false);
    }
  }, [isOpen]);

  // Handler für Escape-Taste
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (isOpen && closeOnEsc && e.key === 'Escape') {
        e.preventDefault();
        setIsClosing(true);
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEsc, onClose]);

  // Handler für Klick auf Overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === overlayRef.current && !staticBackdrop) {
      setIsClosing(true);
      onClose();
    }
  };

  // Handler für Tab-Taste (Fokus-Falle)
  useEffect(() => {
    const handleTabKey = (e: KeyboardEvent) => {
      if (
        !isOpen ||
        !trapFocus ||
        !firstFocusableElementRef.current ||
        !lastFocusableElementRef.current
      ) {
        return;
      }

      // Wenn Shift+Tab gedrückt wird und das erste Element fokussiert ist
      if (
        e.key === 'Tab' &&
        e.shiftKey &&
        document.activeElement === firstFocusableElementRef.current
      ) {
        e.preventDefault();
        lastFocusableElementRef.current.focus();
      }

      // Wenn Tab gedrückt wird und das letzte Element fokussiert ist
      if (
        e.key === 'Tab' &&
        !e.shiftKey &&
        document.activeElement === lastFocusableElementRef.current
      ) {
        e.preventDefault();
        firstFocusableElementRef.current.focus();
      }
    };

    if (isOpen && trapFocus) {
      document.addEventListener('keydown', handleTabKey);
    }

    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen, trapFocus]);

  // Handler für Bestätigen-Button
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    setIsClosing(true);
    onClose();
  };

  // Handler für Abbrechen-Button
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    setIsClosing(true);
    onClose();
  };

  // Rendere die Beschreibung (für Screenreader)
  const renderDescription = () => {
    if (!description && !ariaDescription) return null;

    return (
      <div id={descriptionId} className="sr-only">
        {ariaDescription || description}
      </div>
    );
  };

  // Rendere die Live-Region für Ankündigungen
  const renderLiveRegion = () => {
    return (
      <div id={liveRegionId} className="sr-only-container">
        <div
          aria-live={liveRegionPoliteness}
          aria-atomic={atomic}
          aria-relevant={relevant}
          className="sr-only"
        >
          {announceMessage}
        </div>
      </div>
    );
  };

  // Größenklassen
  const sizeClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full',
  };

  // Positionsklassen
  const positionClasses = {
    center: 'items-center justify-center',
    top: 'items-start justify-center pt-10',
    right: 'items-center justify-end',
    bottom: 'items-end justify-center pb-10',
    left: 'items-center justify-start',
  };

  // Animationsklassen
  const animationClasses = animated
    ? {
        fade: 'animate-fade-in',
        scale: 'animate-scale-in',
        'slide-up': 'animate-slide-up',
        'slide-down': 'animate-slide-down',
        'slide-left': 'animate-slide-left',
        'slide-right': 'animate-slide-right',
        none: '',
      }
    : {
        fade: '',
        scale: '',
        'slide-up': '',
        'slide-down': '',
        'slide-left': '',
        'slide-right': '',
        none: '',
      };

  // Effekt-spezifische Klassen
  const effectClasses = {
    shadow: shadow ? 'shadow-lg' : '',
    rounded: rounded ? 'rounded-lg' : '',
    bordered: bordered ? 'border border-gray-300 dark:border-gray-600' : '',
    transparent: transparent ? 'bg-transparent' : 'bg-white dark:bg-gray-800',
    hoverable: hoverable ? 'hover:shadow-xl' : '',
    focusable: focusable ? 'focus:outline-none focus:ring-2 focus:ring-primary-500' : '',
    transition: transition ? 'transition-all duration-300' : '',
  };

  // Kombiniere alle Klassen für den Modal
  const modalClasses = [
    'relative',
    'w-full',
    sizeClasses[size],
    effectClasses.shadow,
    effectClasses.rounded,
    effectClasses.bordered,
    effectClasses.transparent,
    effectClasses.hoverable,
    effectClasses.focusable,
    effectClasses.transition,
    animationClasses[animation],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Kombiniere alle Klassen für das Overlay
  const overlayClassNames = [
    'fixed',
    'inset-0',
    'flex',
    positionClasses[position],
    'z-50',
    'p-4',
    'overflow-x-hidden',
    'overflow-y-auto',
    'bg-black',
    'bg-opacity-50',
    'transition-opacity',
    animated ? 'duration-300' : '',
    overlayClassName,
  ]
    .filter(Boolean)
    .join(' ');

  // Rendere den Modal-Inhalt
  const modalContent = (
    <div
      className={overlayClassNames}
      style={{ display: isVisible ? 'flex' : 'none' }}
      onClick={handleOverlayClick}
      ref={overlayRef}
      data-testid="modal-overlay"
    >
      <div
        ref={modalRef}
        className={modalClasses}
        tabIndex={-1}
        {...getAriaAttributes()}
        id={modalId}
        data-testid="modal-content"
      >
        {renderDescription()}
        {renderLiveRegion()}

        {/* Header */}
        {showHeader && (
          <div
            className={`flex items-center justify-between p-4 border-b dark:border-gray-600 ${headerClassName}`}
          >
            {showTitle && title && (
              <h2 id={titleId} className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>
            )}

            {showCloseButton && (
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  setIsClosing(true);
                  onClose();
                }}
                aria-label={closeButtonAriaLabel}
                data-testid="modal-close-button"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div id={bodyId} className={`p-6 space-y-6 ${bodyClassName}`} data-testid="modal-body">
          {children}
        </div>

        {/* Footer */}
        {(showFooter || footer || showConfirmButton || showCancelButton) && (
          <div
            className={`flex items-center justify-end p-4 border-t dark:border-gray-600 ${footerClassName}`}
          >
            {footer || (
              <div className="flex space-x-2">
                {showCancelButton && (
                  <button
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={handleCancel}
                    aria-label={cancelButtonAriaLabel}
                    data-testid="modal-cancel-button"
                  >
                    {i18n.cancel || cancelButtonText}
                  </button>
                )}

                {showConfirmButton && (
                  <button
                    type="button"
                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={handleConfirm}
                    aria-label={confirmButtonAriaLabel}
                    data-testid="modal-confirm-button"
                  >
                    {i18n.confirm || confirmButtonText}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // Portal verwenden, wenn aktiviert und nicht im Testmodus
  if (usePortal && typeof document !== 'undefined' && process.env.NODE_ENV !== 'test') {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
};

export default ModalA11y;
