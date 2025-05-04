import React, { useState } from 'react';
import { Card, Button, ProgressBar } from '@smolitux/core';
import { SentimentDisplayProps, SentimentScore, EmotionScore, SentimentTrend, SentimentTopic } from './SentimentDisplay';

export interface SentimentDisplayA11yProps extends SentimentDisplayProps {
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
   * Ob die Komponente eine Tabelle ist
   */
  isTable?: boolean;
  
  /**
   * Ob die Komponente ein Chart ist
   */
  isChart?: boolean;
  
  /**
   * Ob die Komponente ein Status ist
   */
  isStatus?: boolean;
  
  /**
   * Ob die Komponente ein Alert ist
   */
  isAlert?: boolean;
  
  /**
   * Ob die Komponente ein Log ist
   */
  isLog?: boolean;
  
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
   * Ob die Komponente ein Slider ist
   */
  isSlider?: boolean;
  
  /**
   * Ob die Komponente ein Spinbutton ist
   */
  isSpinbutton?: boolean;
  
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
   * Ob die Komponente ein Dialog ist
   */
  isDialog?: boolean;
  
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
   * Ob die Komponente ein Form ist
   */
  isForm?: boolean;
  
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
   * Ob die Komponente ein Tabpanel ist
   */
  isTabpanel?: boolean;
  
  /**
   * Ob die Komponente ein Toolbar ist
   */
  isToolbar?: boolean;
  
  /**
   * Ob die Komponente ein Tree ist
   */
  isTree?: boolean;
  
  /**
   * Ob die Komponente ein Treegrid ist
   */
  isTreegrid?: boolean;
  
  /**
   * Ob die Komponente ein Treeitem ist
   */
  isTreeitem?: boolean;
  
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
   * Ob die Komponente ein Grid ist
   */
  isGrid?: boolean;
  
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
   * Ob die Komponente ein Tablist ist
   */
  isTablist?: boolean;
  
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
  isSpinbutton2?: boolean;
  
  /**
   * Ob die Komponente ein Slider ist
   */
  isSlider2?: boolean;
  
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
   * Ob die Komponente ein Link ist
   */
  isLink2?: boolean;
  
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
}

/**
 * Barrierefreie SentimentDisplay-Komponente für die Visualisierung von Sentiment-Analysen für Inhalte
 * 
 * @example
 * ```tsx
 * <SentimentDisplayA11y
 *   title="Stimmungsanalyse"
 *   sentiment={{ positive: 0.7, negative: 0.1, neutral: 0.2 }}
 *   ariaLabel="Stimmungsanalyse für Artikel XYZ"
 *   isLiveRegion={true}
 *   ariaLive="polite"
 * />
 * ```
 */
export const SentimentDisplayA11y: React.FC<SentimentDisplayA11yProps> = ({
  title = 'Stimmungsanalyse',
  description,
  sentiment,
  emotions,
  trend,
  topics,
  onRefresh,
  onTimeRangeChange,
  className = '',
  loading = false,
  timeRanges = ['24h', '7d', '30d', '90d', 'all'],
  currentTimeRange = '7d',
  contentId,
  contentTitle,
  contentType,
  contentThumbnail,
  overallSentiment,
  sentimentChange,
  analyzedCount,
  analysisTimestamp,
  showDistribution = true,
  showEmotions = true,
  showTrend = true,
  showTopics = true,
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  ariaLive = 'polite',
  ariaAtomic = true,
  ariaRelevant,
  ariaBusy,
  isLiveRegion = false,
  isRegion = true,
  isLandmark = false,
  isTable = false,
  isChart = false,
  isStatus = false,
  isAlert = false,
  isLog = false,
  isTimer = false,
  isMarquee = false,
  isProgressbar = false,
  isMeter = false,
  isSlider = false,
  isSpinbutton = false,
  isScrollbar = false,
  isSeparator = false,
  isTooltip = false,
  isDialog = false,
  isAlertdialog = false,
  isBanner = false,
  isComplementary = false,
  isContentinfo = false,
  isForm = false,
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
  isTabpanel = false,
  isToolbar = false,
  isTree = false,
  isTreegrid = false,
  isTreeitem = false,
  isWidget = false,
  isWindow = false,
  isArticle = false,
  isColumnheader = false,
  isDefinition = false,
  isDirectory = false,
  isGrid = false,
  isGridcell = false,
  isHeading = false,
  isLink = false,
  isRow = false,
  isRowgroup = false,
  isRowheader = false,
  isTablist = false,
  isTab = false,
  isTerm = false,
  isTime = false,
  isTextbox = false,
  isSearchbox = false,
  isSpinbutton2 = false,
  isSlider2 = false,
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
  isLink2 = false,
  isRow2 = false,
  isRowgroup2 = false,
  isRowheader2 = false,
  isTablist2 = false,
  isTab2 = false,
  isTerm2 = false,
  isTime2 = false,
  isTextbox2 = false,
  isSearchbox2 = false,
  ...rest
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState(currentTimeRange);
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);
  
  // Zeitraum ändern
  const handleTimeRangeChange = async (range: string) => {
    setSelectedTimeRange(range);
    
    if (onTimeRangeChange) {
      try {
        await onTimeRangeChange(range);
      } catch (error) {
        console.error('Fehler beim Ändern des Zeitraums:', error);
      }
    }
  };
  
  // Analyse aktualisieren
  const handleRefresh = async () => {
    if (!onRefresh || isRefreshing) return;
    
    setIsRefreshing(true);
    
    try {
      await onRefresh();
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Analyse:', error);
    } finally {
      setIsRefreshing(false);
    }
  };
  
  // Stimmungswert in Text umwandeln
  const getSentimentText = (value: number): string => {
    if (value >= 0.6) return 'Sehr positiv';
    if (value >= 0.2) return 'Positiv';
    if (value >= -0.2) return 'Neutral';
    if (value >= -0.6) return 'Negativ';
    return 'Sehr negativ';
  };
  
  // Stimmungswert in Farbe umwandeln
  const getSentimentColor = (value: number): string => {
    if (value >= 0.6) return 'bg-green-500';
    if (value >= 0.2) return 'bg-green-400';
    if (value >= -0.2) return 'bg-gray-400';
    if (value >= -0.6) return 'bg-red-400';
    return 'bg-red-500';
  };
  
  // Stimmungswert in Textfarbe umwandeln
  const getSentimentTextColor = (value: number): string => {
    if (value >= 0.6) return 'text-green-500';
    if (value >= 0.2) return 'text-green-400';
    if (value >= -0.2) return 'text-gray-500';
    if (value >= -0.6) return 'text-red-400';
    return 'text-red-500';
  };
  
  // Stimmungsänderung formatieren
  const formatSentimentChange = (change?: number): string => {
    if (change === undefined) return '';
    
    const sign = change >= 0 ? '+' : '';
    return `${sign}${(change * 100).toFixed(1)}%`;
  };
  
  // Datum formatieren
  const formatDate = (date?: Date): string => {
    if (!date) return '';
    
    return new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  // Stimmungstrend rendern
  const renderTrendChart = () => {
    // Hier würde normalerweise ein Chart-Rendering stattfinden
    // Da wir keine Chart-Bibliothek einbinden, zeigen wir einen Platzhalter an
    
    if (!trend || trend.length === 0) return null;
    
    const minValue = Math.min(...trend.map(t => t.value));
    const maxValue = Math.max(...trend.map(t => t.value));
    const avgValue = trend.reduce((sum, t) => sum + t.value, 0) / trend.length;
    
    return (
      <div 
        className="h-48 bg-gray-50 dark:bg-gray-800 rounded-md flex items-center justify-center"
        role={isChart ? 'img' : undefined}
        aria-label={isChart ? `Stimmungstrend mit ${trend.length} Datenpunkten. Minimaler Wert: ${minValue.toFixed(2)}, Durchschnittlicher Wert: ${avgValue.toFixed(2)}, Maximaler Wert: ${maxValue.toFixed(2)}` : undefined}
      >
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Stimmungstrend
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {trend.length} Datenpunkte
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Min: {minValue.toFixed(2)}
            {' | '}
            Avg: {avgValue.toFixed(2)}
            {' | '}
            Max: {maxValue.toFixed(2)}
          </p>
        </div>
      </div>
    );
  };
  
  // Platzhalter für den Ladezustand
  const renderPlaceholders = () => {
    return (
      <div className="animate-pulse" aria-hidden="true">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="md:w-1/3 p-4 bg-gray-200 dark:bg-gray-700 rounded-lg h-32" />
          <div className="md:w-2/3 p-4 bg-gray-200 dark:bg-gray-700 rounded-lg h-32" />
        </div>
        
        <div className="mb-6">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2" />
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    );
  };
  
  // Gesamtstimmung berechnen, falls nicht angegeben
  const calculatedOverallSentiment = overallSentiment !== undefined
    ? overallSentiment
    : sentiment.positive - sentiment.negative;
  
  // Bestimme die Rolle basierend auf den Eigenschaften
  const determineRole = () => {
    if (isRegion) return 'region';
    if (isLandmark) return 'landmark';
    if (isTable) return 'table';
    if (isStatus) return 'status';
    if (isAlert) return 'alert';
    if (isLog) return 'log';
    if (isTimer) return 'timer';
    if (isMarquee) return 'marquee';
    if (isProgressbar) return 'progressbar';
    if (isMeter) return 'meter';
    if (isSlider) return 'slider';
    if (isSpinbutton) return 'spinbutton';
    if (isScrollbar) return 'scrollbar';
    if (isSeparator) return 'separator';
    if (isTooltip) return 'tooltip';
    if (isDialog) return 'dialog';
    if (isAlertdialog) return 'alertdialog';
    if (isBanner) return 'banner';
    if (isComplementary) return 'complementary';
    if (isContentinfo) return 'contentinfo';
    if (isForm) return 'form';
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
    if (isTabpanel) return 'tabpanel';
    if (isToolbar) return 'toolbar';
    if (isTree) return 'tree';
    if (isTreegrid) return 'treegrid';
    if (isTreeitem) return 'treeitem';
    if (isWidget) return 'widget';
    if (isWindow) return 'window';
    if (isArticle) return 'article';
    if (isColumnheader) return 'columnheader';
    if (isDefinition) return 'definition';
    if (isDirectory) return 'directory';
    if (isGrid) return 'grid';
    if (isGridcell) return 'gridcell';
    if (isHeading) return 'heading';
    if (isLink) return 'link';
    if (isRow) return 'row';
    if (isRowgroup) return 'rowgroup';
    if (isRowheader) return 'rowheader';
    if (isTablist) return 'tablist';
    if (isTab) return 'tab';
    if (isTerm) return 'term';
    if (isTime) return 'time';
    if (isTextbox) return 'textbox';
    if (isSearchbox) return 'searchbox';
    return undefined;
  };
  
  // Screenreader-Ankündigung für die Gesamtstimmung
  const getOverallSentimentAnnouncement = () => {
    const sentimentText = getSentimentText(calculatedOverallSentiment);
    const sentimentPercentage = (calculatedOverallSentiment * 100).toFixed(0);
    
    let announcement = `Gesamtstimmung: ${sentimentText} (${sentimentPercentage}%)`;
    
    if (sentimentChange !== undefined) {
      const changeText = formatSentimentChange(sentimentChange);
      announcement += `, Änderung: ${changeText}`;
    }
    
    if (analyzedCount !== undefined) {
      announcement += `, basierend auf ${analyzedCount} ${contentType === 'comments' ? 'Kommentaren' : 'Elementen'}`;
    }
    
    return announcement;
  };
  
  // Screenreader-Ankündigung für die Stimmungsverteilung
  const getSentimentDistributionAnnouncement = () => {
    return `Stimmungsverteilung: Positiv ${(sentiment.positive * 100).toFixed(1)}%, Neutral ${(sentiment.neutral * 100).toFixed(1)}%, Negativ ${(sentiment.negative * 100).toFixed(1)}%${sentiment.mixed ? `, Gemischt ${(sentiment.mixed * 100).toFixed(1)}%` : ''}`;
  };
  
  return (
    <Card 
      className={`overflow-hidden ${className}`}
      role={determineRole()}
      aria-label={ariaLabel || title}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-live={isLiveRegion ? ariaLive : undefined}
      aria-atomic={isLiveRegion ? ariaAtomic : undefined}
      aria-relevant={isLiveRegion ? ariaRelevant : undefined}
      aria-busy={loading || ariaBusy ? 'true' : undefined}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h3 
            className="text-lg font-semibold text-gray-900 dark:text-white"
            id={`${ariaLabelledby || 'sentiment-display'}-title`}
          >
            {title}
          </h3>
          
          <div className="flex space-x-2">
            {onRefresh && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2"
                aria-label="Analyse aktualisieren"
              >
                <svg
                  className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </Button>
            )}
          </div>
        </div>
        
        {description && (
          <p 
            className="text-sm text-gray-500 dark:text-gray-400"
            id={`${ariaLabelledby || 'sentiment-display'}-description`}
          >
            {description}
          </p>
        )}
        
        {/* Inhaltsinformationen */}
        {contentTitle && (
          <div className="flex items-center mt-4">
            {contentThumbnail && (
              <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                <img
                  src={contentThumbnail}
                  alt={`Thumbnail für ${contentTitle}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                {contentTitle}
              </h4>
              
              <div className="flex items-center mt-1">
                {contentType && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {contentType}
                  </span>
                )}
                
                {contentId && (
                  <>
                    <span className="mx-1 text-gray-300 dark:text-gray-600">•</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ID: {contentId}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Zeitraumauswahl */}
      {timeRanges.length > 0 && showTrend && (
        <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex space-x-2" role="toolbar" aria-label="Zeitraumauswahl">
            {timeRanges.map(range => (
              <button
                key={range}
                onClick={() => handleTimeRangeChange(range)}
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedTimeRange === range
                    ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                aria-pressed={selectedTimeRange === range ? 'true' : 'false'}
              >
                {range === '24h' && '24 Stunden'}
                {range === '7d' && '7 Tage'}
                {range === '30d' && '30 Tage'}
                {range === '90d' && '90 Tage'}
                {range === 'all' && 'Alle Zeit'}
                {!['24h', '7d', '30d', '90d', 'all'].includes(range) && range}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Inhalt */}
      <div className="p-6">
        {loading ? (
          <>
            <div className="sr-only" aria-live="polite">Lade Stimmungsanalyse...</div>
            {renderPlaceholders()}
          </>
        ) : (
          <>
            {/* Screenreader-Ankündigung */}
            {isLiveRegion && (
              <div className="sr-only" aria-live={ariaLive} aria-atomic={ariaAtomic}>
                {getOverallSentimentAnnouncement()}
                {showDistribution && getSentimentDistributionAnnouncement()}
              </div>
            )}
            
            {/* Gesamtstimmung und Stimmungsverteilung */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              {/* Gesamtstimmung */}
              <div className="md:w-1/3">
                <div 
                  className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
                  role={isMeter ? 'meter' : undefined}
                  aria-label={isMeter ? `Gesamtstimmung: ${getSentimentText(calculatedOverallSentiment)}` : undefined}
                  aria-valuenow={isMeter ? calculatedOverallSentiment * 100 : undefined}
                  aria-valuemin={isMeter ? -100 : undefined}
                  aria-valuemax={isMeter ? 100 : undefined}
                  aria-valuetext={isMeter ? `${(calculatedOverallSentiment * 100).toFixed(0)}%` : undefined}
                >
                  <h4 
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    id="overall-sentiment-heading"
                  >
                    Gesamtstimmung
                  </h4>
                  
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative w-32 h-32">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div 
                          className={`w-24 h-24 rounded-full ${getSentimentColor(calculatedOverallSentiment)} opacity-20`}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p 
                          className={`text-2xl font-bold ${getSentimentTextColor(calculatedOverallSentiment)}`}
                          aria-hidden="true"
                        >
                          {(calculatedOverallSentiment * 100).toFixed(0)}%
                        </p>
                        <p 
                          className="text-sm text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                        >
                          {getSentimentText(calculatedOverallSentiment)}
                        </p>
                        
                        {sentimentChange !== undefined && (
                          <p 
                            className={`text-xs mt-1 ${
                              sentimentChange >= 0
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}
                            aria-hidden="true"
                          >
                            {formatSentimentChange(sentimentChange)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                    {analyzedCount !== undefined && (
                      <p>Basierend auf {analyzedCount} {contentType === 'comments' ? 'Kommentaren' : 'Elementen'}</p>
                    )}
                    
                    {analysisTimestamp && (
                      <p className="mt-1">Analysiert am {formatDate(analysisTimestamp)}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Stimmungsverteilung */}
              {showDistribution && (
                <div className="md:w-2/3">
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                    <h4 
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4"
                      id="sentiment-distribution-heading"
                    >
                      Stimmungsverteilung
                    </h4>
                    
                    <div className="space-y-4">
                      {/* Positive Stimmung */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span 
                            className="text-sm text-gray-700 dark:text-gray-300"
                            id="positive-sentiment-label"
                          >
                            Positiv
                          </span>
                          <span 
                            className="text-sm text-gray-700 dark:text-gray-300"
                            aria-hidden="true"
                          >
                            {(sentiment.positive * 100).toFixed(1)}%
                          </span>
                        </div>
                        <ProgressBar
                          value={sentiment.positive * 100}
                          max={100}
                          className="h-2 bg-gray-200 dark:bg-gray-600"
                          progressClassName="bg-green-500"
                          aria-labelledby="positive-sentiment-label"
                          aria-valuetext={`${(sentiment.positive * 100).toFixed(1)}%`}
                        />
                      </div>
                      
                      {/* Neutrale Stimmung */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span 
                            className="text-sm text-gray-700 dark:text-gray-300"
                            id="neutral-sentiment-label"
                          >
                            Neutral
                          </span>
                          <span 
                            className="text-sm text-gray-700 dark:text-gray-300"
                            aria-hidden="true"
                          >
                            {(sentiment.neutral * 100).toFixed(1)}%
                          </span>
                        </div>
                        <ProgressBar
                          value={sentiment.neutral * 100}
                          max={100}
                          className="h-2 bg-gray-200 dark:bg-gray-600"
                          progressClassName="bg-gray-400"
                          aria-labelledby="neutral-sentiment-label"
                          aria-valuetext={`${(sentiment.neutral * 100).toFixed(1)}%`}
                        />
                      </div>
                      
                      {/* Negative Stimmung */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span 
                            className="text-sm text-gray-700 dark:text-gray-300"
                            id="negative-sentiment-label"
                          >
                            Negativ
                          </span>
                          <span 
                            className="text-sm text-gray-700 dark:text-gray-300"
                            aria-hidden="true"
                          >
                            {(sentiment.negative * 100).toFixed(1)}%
                          </span>
                        </div>
                        <ProgressBar
                          value={sentiment.negative * 100}
                          max={100}
                          className="h-2 bg-gray-200 dark:bg-gray-600"
                          progressClassName="bg-red-500"
                          aria-labelledby="negative-sentiment-label"
                          aria-valuetext={`${(sentiment.negative * 100).toFixed(1)}%`}
                        />
                      </div>
                      
                      {/* Gemischte Stimmung */}
                      {sentiment.mixed !== undefined && (
                        <div>
                          <div className="flex justify-between mb-1">
                            <span 
                              className="text-sm text-gray-700 dark:text-gray-300"
                              id="mixed-sentiment-label"
                            >
                              Gemischt
                            </span>
                            <span 
                              className="text-sm text-gray-700 dark:text-gray-300"
                              aria-hidden="true"
                            >
                              {(sentiment.mixed * 100).toFixed(1)}%
                            </span>
                          </div>
                          <ProgressBar
                            value={sentiment.mixed * 100}
                            max={100}
                            className="h-2 bg-gray-200 dark:bg-gray-600"
                            progressClassName="bg-purple-500"
                            aria-labelledby="mixed-sentiment-label"
                            aria-valuetext={`${(sentiment.mixed * 100).toFixed(1)}%`}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Stimmungstrend */}
            {showTrend && trend && trend.length > 0 && (
              <div className="mb-8">
                <h4 
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  id="sentiment-trend-heading"
                >
                  Stimmungstrend
                </h4>
                {renderTrendChart()}
              </div>
            )}
            
            {/* Emotionen und Themen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Emotionen */}
              {showEmotions && emotions && (
                <div>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                    <h4 
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4"
                      id="emotions-heading"
                    >
                      Emotionen
                    </h4>
                    
                    <div className="space-y-4">
                      {/* Freude */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span 
                            className="text-sm text-gray-700 dark:text-gray-300"
                            id="joy-emotion-label"
                          >
                            Freude
                          </span>
                          <span 
                            className="text-sm text-gray-700 dark:text-gray-300"
                            aria-hidden="true"
                          >
                            {(emotions.joy * 100).toFixed(1)}%
                          </span>
                        </div>
                        <ProgressBar
                          value={emotions.joy * 100}
                          max={100}
                          className="h-2 bg-gray-200 dark:bg-gray-600"
                          progressClassName="bg-yellow-500"
                          aria-labelledby="joy-emotion-label"
                          aria-valuetext={`${(emotions.joy * 100).toFixed(1)}%`}
                        />
                      </div>
                      
                      {/* Traurigkeit */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span 
                            className="text-sm text-gray-700 dark:text-gray-300"
                            id="sadness-emotion-label"
                          >
                            Traurigkeit
                          </span>
                          <span 
                            className="text-sm text-gray-700 dark:text-gray-300"
                            aria-hidden="true"
                          >
                            {(emotions.sadness * 100).toFixed(1)}%
                          </span>
                        </div>
                        <ProgressBar
                          value={emotions.sadness * 100}
                          max={100}
                          className="h-2 bg-gray-200 dark:bg-gray-600"
                          progressClassName="bg-blue-500"
                          aria-labelledby="sadness-emotion-label"
                          aria-valuetext={`${(emotions.sadness * 100).toFixed(1)}%`}
                        />
                      </div>
                      
                      {/* Angst */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span 
                            className="text-sm text-gray-700 dark:text-gray-300"
                            id="fear-emotion-label"
                          >
                            Angst
                          </span>
                          <span 
                            className="text-sm text-gray-700 dark:text-gray-300"
                            aria-hidden="true"
                          >
                            {(emotions.fear * 100).toFixed(1)}%
                          </span>
                        </div>
                        <ProgressBar
                          value={emotions.fear * 100}
                          max={100}
                          className="h-2 bg-gray-200 dark:bg-gray-600"
                          progressClassName="bg-purple-500"
                          aria-labelledby="fear-emotion-label"
                          aria-valuetext={`${(emotions.fear * 100).toFixed(1)}%`}
                        />
                      </div>
                      
                      {/* Wut */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span 
                            className="text-sm text-gray-700 dark:text-gray-300"
                            id="anger-emotion-label"
                          >
                            Wut
                          </span>
                          <span 
                            className="text-sm text-gray-700 dark:text-gray-300"
                            aria-hidden="true"
                          >
                            {(emotions.anger * 100).toFixed(1)}%
                          </span>
                        </div>
                        <ProgressBar
                          value={emotions.anger * 100}
                          max={100}
                          className="h-2 bg-gray-200 dark:bg-gray-600"
                          progressClassName="bg-red-500"
                          aria-labelledby="anger-emotion-label"
                          aria-valuetext={`${(emotions.anger * 100).toFixed(1)}%`}
                        />
                      </div>
                      
                      {/* Überraschung */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span 
                            className="text-sm text-gray-700 dark:text-gray-300"
                            id="surprise-emotion-label"
                          >
                            Überraschung
                          </span>
                          <span 
                            className="text-sm text-gray-700 dark:text-gray-300"
                            aria-hidden="true"
                          >
                            {(emotions.surprise * 100).toFixed(1)}%
                          </span>
                        </div>
                        <ProgressBar
                          value={emotions.surprise * 100}
                          max={100}
                          className="h-2 bg-gray-200 dark:bg-gray-600"
                          progressClassName="bg-orange-500"
                          aria-labelledby="surprise-emotion-label"
                          aria-valuetext={`${(emotions.surprise * 100).toFixed(1)}%`}
                        />
                      </div>
                      
                      {/* Ekel */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span 
                            className="text-sm text-gray-700 dark:text-gray-300"
                            id="disgust-emotion-label"
                          >
                            Ekel
                          </span>
                          <span 
                            className="text-sm text-gray-700 dark:text-gray-300"
                            aria-hidden="true"
                          >
                            {(emotions.disgust * 100).toFixed(1)}%
                          </span>
                        </div>
                        <ProgressBar
                          value={emotions.disgust * 100}
                          max={100}
                          className="h-2 bg-gray-200 dark:bg-gray-600"
                          progressClassName="bg-green-500"
                          aria-labelledby="disgust-emotion-label"
                          aria-valuetext={`${(emotions.disgust * 100).toFixed(1)}%`}
                        />
                      </div>
                      
                      {/* Vertrauen */}
                      {emotions.trust !== undefined && (
                        <div>
                          <div className="flex justify-between mb-1">
                            <span 
                              className="text-sm text-gray-700 dark:text-gray-300"
                              id="trust-emotion-label"
                            >
                              Vertrauen
                            </span>
                            <span 
                              className="text-sm text-gray-700 dark:text-gray-300"
                              aria-hidden="true"
                            >
                              {(emotions.trust * 100).toFixed(1)}%
                            </span>
                          </div>
                          <ProgressBar
                            value={emotions.trust * 100}
                            max={100}
                            className="h-2 bg-gray-200 dark:bg-gray-600"
                            progressClassName="bg-blue-400"
                            aria-labelledby="trust-emotion-label"
                            aria-valuetext={`${(emotions.trust * 100).toFixed(1)}%`}
                          />
                        </div>
                      )}
                      
                      {/* Vorfreude */}
                      {emotions.anticipation !== undefined && (
                        <div>
                          <div className="flex justify-between mb-1">
                            <span 
                              className="text-sm text-gray-700 dark:text-gray-300"
                              id="anticipation-emotion-label"
                            >
                              Vorfreude
                            </span>
                            <span 
                              className="text-sm text-gray-700 dark:text-gray-300"
                              aria-hidden="true"
                            >
                              {(emotions.anticipation * 100).toFixed(1)}%
                            </span>
                          </div>
                          <ProgressBar
                            value={emotions.anticipation * 100}
                            max={100}
                            className="h-2 bg-gray-200 dark:bg-gray-600"
                            progressClassName="bg-pink-500"
                            aria-labelledby="anticipation-emotion-label"
                            aria-valuetext={`${(emotions.anticipation * 100).toFixed(1)}%`}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Themen */}
              {showTopics && topics && topics.length > 0 && (
                <div>
                  <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                    <h4 
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4"
                      id="topics-heading"
                    >
                      Themen
                    </h4>
                    
                    <ul className="space-y-3" aria-labelledby="topics-heading">
                      {topics.map((topic, index) => (
                        <li 
                          key={topic.name}
                          className={`p-2 rounded-md ${
                            hoveredTopic === topic.name
                              ? 'bg-gray-100 dark:bg-gray-600'
                              : ''
                          }`}
                          onMouseEnter={() => setHoveredTopic(topic.name)}
                          onMouseLeave={() => setHoveredTopic(null)}
                        >
                          <div className="flex justify-between mb-1">
                            <span 
                              className="text-sm font-medium text-gray-700 dark:text-gray-300"
                              id={`topic-${index}-name`}
                            >
                              {topic.name}
                            </span>
                            <span 
                              className={`text-xs ${
                                topic.sentiment >= 0.2
                                  ? 'text-green-600 dark:text-green-400'
                                  : topic.sentiment <= -0.2
                                  ? 'text-red-600 dark:text-red-400'
                                  : 'text-gray-500 dark:text-gray-400'
                              }`}
                              aria-hidden="true"
                            >
                              {(topic.sentiment * 100).toFixed(0)}%
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="flex-1 mr-2">
                              <ProgressBar
                                value={(topic.relevance * 100)}
                                max={100}
                                className="h-1 bg-gray-200 dark:bg-gray-600"
                                progressClassName={`${
                                  topic.sentiment >= 0.2
                                    ? 'bg-green-500'
                                    : topic.sentiment <= -0.2
                                    ? 'bg-red-500'
                                    : 'bg-gray-400'
                                }`}
                                aria-labelledby={`topic-${index}-name`}
                                aria-valuetext={`Relevanz: ${(topic.relevance * 100).toFixed(0)}%, Stimmung: ${(topic.sentiment * 100).toFixed(0)}%`}
                              />
                            </div>
                            <span 
                              className="text-xs text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                            >
                              {topic.frequency}x
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default SentimentDisplayA11y;