import React, { useState, useRef, useEffect, useCallback } from 'react';
import { TooltipPosition } from './Tooltip';
import './Tooltip.css';

export interface TooltipA11yProps {
  /** Content to display in the tooltip */
  content: React.ReactNode;
  /** The element that triggers the tooltip */
  children: React.ReactElement;
  /** Position of the tooltip relative to the trigger */
  position?: TooltipPosition;
  /** Delay before showing the tooltip (in ms) */
  delay?: number;
  /** Delay before hiding the tooltip (in ms) */
  hideDelay?: number;
  /** Maximum width of the tooltip */
  maxWidth?: number;
  /** Additional CSS classes */
  className?: string;
  /** Disables the tooltip */
  disabled?: boolean;
  /** Show arrow */
  arrow?: boolean;
  /** ID for accessibility */
  id?: string;
  /** ARIA role for the tooltip */
  role?: string;
  /** ARIA label for the tooltip */
  ariaLabel?: string;
  /** Close tooltip when Escape key is pressed */
  closeOnEsc?: boolean;
  /** Show tooltip on focus */
  showOnFocus?: boolean;
  /** Show tooltip on hover */
  showOnHover?: boolean;
  /** Show tooltip on click */
  showOnClick?: boolean;
  /** Hide tooltip on blur */
  hideOnBlur?: boolean;
  /** Hide tooltip on mouse leave */
  hideOnMouseLeave?: boolean;
  /** Hide tooltip on click outside */
  hideOnClickOutside?: boolean;
  /** Tooltip is visible */
  isOpen?: boolean;
  /** Callback when tooltip is shown */
  onShow?: () => void;
  /** Callback when tooltip is hidden */
  onHide?: () => void;
  /** Tooltip should be announced to screen readers */
  announce?: boolean;
  /** Politeness level for screen reader announcements */
  announcePoliteness?: 'polite' | 'assertive' | 'off';
  /** Tooltip should be interactive */
  interactive?: boolean;
  /** Tooltip should be focusable */
  focusable?: boolean;
  /** Tooltip should trap focus */
  trapFocus?: boolean;
  /** Tooltip should return focus to trigger when closed */
  returnFocus?: boolean;
  /** Tooltip should be dismissible by clicking on it */
  dismissible?: boolean;
  /** Tooltip should be dismissible by clicking on the trigger */
  dismissibleByTrigger?: boolean;
  /** Tooltip should be dismissible by clicking outside */
  dismissibleByOutsideClick?: boolean;
  /** Tooltip should be dismissible by pressing Escape */
  dismissibleByEscape?: boolean;
  /** Tooltip should be dismissible by pressing Tab */
  dismissibleByTab?: boolean;
  /** Tooltip should be dismissible by pressing Enter */
  dismissibleByEnter?: boolean;
  /** Tooltip should be dismissible by pressing Space */
  dismissibleBySpace?: boolean;
  /** Tooltip should be dismissible by scrolling */
  dismissibleByScroll?: boolean;
  /** Tooltip should be dismissible by resizing the window */
  dismissibleByResize?: boolean;
  /** Tooltip should be dismissible by navigating away */
  dismissibleByNavigation?: boolean;
  /** Tooltip should be dismissible by timeout */
  dismissibleByTimeout?: boolean;
  /** Timeout for dismissing the tooltip (in ms) */
  dismissTimeout?: number;
  /** Tooltip should be persistent */
  persistent?: boolean;
  /** Tooltip should be modal */
  modal?: boolean;
  /** Tooltip should be non-modal */
  nonModal?: boolean;
  /** Tooltip should be a live region */
  liveRegion?: boolean;
  /** Tooltip should be atomic */
  atomic?: boolean;
  /** Tooltip should be relevant */
  relevant?: 'additions' | 'removals' | 'text' | 'all' | 'additions text';
  /** Tooltip should be busy */
  busy?: boolean;
  /** Tooltip should have a description */
  hasDescription?: boolean;
  /** Description for the tooltip */
  description?: string;
  /** Tooltip should have a label */
  hasLabel?: boolean;
  /** Label for the tooltip */
  label?: string;
  /** Tooltip should have a title */
  hasTitle?: boolean;
  /** Title for the tooltip */
  title?: string;
  /** Tooltip should have a status */
  hasStatus?: boolean;
  /** Status for the tooltip */
  status?: 'success' | 'error' | 'warning' | 'info';
  /** Tooltip should have an icon */
  hasIcon?: boolean;
  /** Icon for the tooltip */
  icon?: React.ReactNode;
  /** Tooltip should have a close button */
  hasCloseButton?: boolean;
  /** Close button label */
  closeButtonLabel?: string;
  /** Tooltip should have a backdrop */
  hasBackdrop?: boolean;
  /** Backdrop should be clickable */
  backdropClickable?: boolean;
  /** Backdrop should be dismissible */
  backdropDismissible?: boolean;
  /** Backdrop should be focusable */
  backdropFocusable?: boolean;
  /** Backdrop should be visible */
  backdropVisible?: boolean;
  /** Backdrop should be transparent */
  backdropTransparent?: boolean;
  /** Backdrop should be blurred */
  backdropBlurred?: boolean;
  /** Backdrop should be colored */
  backdropColored?: boolean;
  /** Backdrop color */
  backdropColor?: string;
  /** Backdrop opacity */
  backdropOpacity?: number;
  /** Backdrop z-index */
  backdropZIndex?: number;
  /** Tooltip should have a shadow */
  hasShadow?: boolean;
  /** Tooltip should have a border */
  hasBorder?: boolean;
  /** Tooltip should have a background */
  hasBackground?: boolean;
  /** Tooltip should have a padding */
  hasPadding?: boolean;
  /** Tooltip should have a margin */
  hasMargin?: boolean;
  /** Tooltip should have a radius */
  hasRadius?: boolean;
  /** Tooltip should have a width */
  hasWidth?: boolean;
  /** Tooltip should have a height */
  hasHeight?: boolean;
  /** Tooltip should have a min-width */
  hasMinWidth?: boolean;
  /** Tooltip should have a min-height */
  hasMinHeight?: boolean;
  /** Tooltip should have a max-width */
  hasMaxWidth?: boolean;
  /** Tooltip should have a max-height */
  hasMaxHeight?: boolean;
  /** Tooltip should have a z-index */
  hasZIndex?: boolean;
  /** Tooltip should have a transition */
  hasTransition?: boolean;
  /** Tooltip should have an animation */
  hasAnimation?: boolean;
  /** Tooltip should have a transform */
  hasTransform?: boolean;
  /** Tooltip should have a scale */
  hasScale?: boolean;
  /** Tooltip should have a rotation */
  hasRotation?: boolean;
  /** Tooltip should have a translation */
  hasTranslation?: boolean;
  /** Tooltip should have a skew */
  hasSkew?: boolean;
  /** Tooltip should have a perspective */
  hasPerspective?: boolean;
  /** Tooltip should have a filter */
  hasFilter?: boolean;
  /** Tooltip should have a backdrop-filter */
  hasBackdropFilter?: boolean;
  /** Tooltip should have a clip-path */
  hasClipPath?: boolean;
  /** Tooltip should have a mask */
  hasMask?: boolean;
  /** Tooltip should have a mix-blend-mode */
  hasMixBlendMode?: boolean;
  /** Tooltip should have an isolation */
  hasIsolation?: boolean;
  /** Tooltip should have a contain */
  hasContain?: boolean;
  /** Tooltip should have a content-visibility */
  hasContentVisibility?: boolean;
  /** Tooltip should have a pointer-events */
  hasPointerEvents?: boolean;
  /** Tooltip should have a user-select */
  hasUserSelect?: boolean;
  /** Tooltip should have a touch-action */
  hasTouchAction?: boolean;
  /** Tooltip should have a will-change */
  hasWillChange?: boolean;
  /** Tooltip should have an appearance */
  hasAppearance?: boolean;
  /** Tooltip should have a cursor */
  hasCursor?: boolean;
  /** Tooltip should have a resize */
  hasResize?: boolean;
  /** Tooltip should have a scroll-behavior */
  hasScrollBehavior?: boolean;
  /** Tooltip should have an overscroll-behavior */
  hasOverscrollBehavior?: boolean;
  /** Tooltip should have a scroll-snap-type */
  hasScrollSnapType?: boolean;
  /** Tooltip should have a scroll-snap-align */
  hasScrollSnapAlign?: boolean;
  /** Tooltip should have a scroll-snap-stop */
  hasScrollSnapStop?: boolean;
  /** Tooltip should have a scroll-margin */
  hasScrollMargin?: boolean;
  /** Tooltip should have a scroll-padding */
  hasScrollPadding?: boolean;
  /** Tooltip should have a scroll-timeline */
  hasScrollTimeline?: boolean;
  /** Tooltip should have a view-timeline */
  hasViewTimeline?: boolean;
  /** Tooltip should have an animation-timeline */
  hasAnimationTimeline?: boolean;
  /** Tooltip should have an animation-range */
  hasAnimationRange?: boolean;
  /** Tooltip should have an animation-composition */
  hasAnimationComposition?: boolean;
  /** Tooltip should have a container-type */
  hasContainerType?: boolean;
  /** Tooltip should have a container-name */
  hasContainerName?: boolean;
  /** Tooltip should have a content-size */
  hasContentSize?: boolean;
  /** Tooltip should have an aspect-ratio */
  hasAspectRatio?: boolean;
  /** Tooltip should have a writing-mode */
  hasWritingMode?: boolean;
  /** Tooltip should have a direction */
  hasDirection?: boolean;
  /** Tooltip should have a text-orientation */
  hasTextOrientation?: boolean;
  /** Tooltip should have a text-combine-upright */
  hasTextCombineUpright?: boolean;
  /** Tooltip should have a text-overflow */
  hasTextOverflow?: boolean;
  /** Tooltip should have a white-space */
  hasWhiteSpace?: boolean;
  /** Tooltip should have a word-break */
  hasWordBreak?: boolean;
  /** Tooltip should have a line-break */
  hasLineBreak?: boolean;
  /** Tooltip should have a hyphens */
  hasHyphens?: boolean;
  /** Tooltip should have an overflow-wrap */
  hasOverflowWrap?: boolean;
  /** Tooltip should have a word-wrap */
  hasWordWrap?: boolean;
  /** Tooltip should have a word-spacing */
  hasWordSpacing?: boolean;
  /** Tooltip should have a letter-spacing */
  hasLetterSpacing?: boolean;
  /** Tooltip should have a text-indent */
  hasTextIndent?: boolean;
  /** Tooltip should have a text-align */
  hasTextAlign?: boolean;
  /** Tooltip should have a text-align-last */
  hasTextAlignLast?: boolean;
  /** Tooltip should have a text-justify */
  hasTextJustify?: boolean;
  /** Tooltip should have a text-transform */
  hasTextTransform?: boolean;
  /** Tooltip should have a text-decoration */
  hasTextDecoration?: boolean;
  /** Tooltip should have a text-decoration-line */
  hasTextDecorationLine?: boolean;
  /** Tooltip should have a text-decoration-style */
  hasTextDecorationStyle?: boolean;
  /** Tooltip should have a text-decoration-color */
  hasTextDecorationColor?: boolean;
  /** Tooltip should have a text-decoration-thickness */
  hasTextDecorationThickness?: boolean;
  /** Tooltip should have a text-underline-offset */
  hasTextUnderlineOffset?: boolean;
  /** Tooltip should have a text-underline-position */
  hasTextUnderlinePosition?: boolean;
  /** Tooltip should have a text-shadow */
  hasTextShadow?: boolean;
  /** Tooltip should have a font-family */
  hasFontFamily?: boolean;
  /** Tooltip should have a font-size */
  hasFontSize?: boolean;
  /** Tooltip should have a font-weight */
  hasFontWeight?: boolean;
  /** Tooltip should have a font-style */
  hasFontStyle?: boolean;
  /** Tooltip should have a font-variant */
  hasFontVariant?: boolean;
  /** Tooltip should have a font-stretch */
  hasFontStretch?: boolean;
  /** Tooltip should have a line-height */
  hasLineHeight?: boolean;
  /** Tooltip should have a color */
  hasColor?: boolean;
  /** Tooltip should have a background-color */
  hasBackgroundColor?: boolean;
  /** Tooltip should have a border-color */
  hasBorderColor?: boolean;
  /** Tooltip should have a border-width */
  hasBorderWidth?: boolean;
  /** Tooltip should have a border-style */
  hasBorderStyle?: boolean;
  /** Tooltip should have a border-radius */
  hasBorderRadius?: boolean;
  /** Tooltip should have a box-shadow */
  hasBoxShadow?: boolean;
  /** Tooltip should have an outline */
  hasOutline?: boolean;
  /** Tooltip should have an outline-offset */
  hasOutlineOffset?: boolean;
  /** Tooltip should have an outline-width */
  hasOutlineWidth?: boolean;
  /** Tooltip should have an outline-style */
  hasOutlineStyle?: boolean;
  /** Tooltip should have an outline-color */
  hasOutlineColor?: boolean;
  /** Tooltip should have a transition-property */
  hasTransitionProperty?: boolean;
  /** Tooltip should have a transition-duration */
  hasTransitionDuration?: boolean;
  /** Tooltip should have a transition-timing-function */
  hasTransitionTimingFunction?: boolean;
  /** Tooltip should have a transition-delay */
  hasTransitionDelay?: boolean;
  /** Tooltip should have an animation-name */
  hasAnimationName?: boolean;
  /** Tooltip should have an animation-duration */
  hasAnimationDuration?: boolean;
  /** Tooltip should have an animation-timing-function */
  hasAnimationTimingFunction?: boolean;
  /** Tooltip should have an animation-delay */
  hasAnimationDelay?: boolean;
  /** Tooltip should have an animation-iteration-count */
  hasAnimationIterationCount?: boolean;
  /** Tooltip should have an animation-direction */
  hasAnimationDirection?: boolean;
  /** Tooltip should have an animation-fill-mode */
  hasAnimationFillMode?: boolean;
  /** Tooltip should have an animation-play-state */
  hasAnimationPlayState?: boolean;
  /** Tooltip should have a transform-origin */
  hasTransformOrigin?: boolean;
  /** Tooltip should have a transform-style */
  hasTransformStyle?: boolean;
  /** Tooltip should have a backface-visibility */
  hasBackfaceVisibility?: boolean;
  /** Tooltip should have a perspective-origin */
  hasPerspectiveOrigin?: boolean;
  /** Tooltip should have a filter */
  hasFilterProperty?: boolean;
  /** Tooltip should have a backdrop-filter */
  hasBackdropFilterProperty?: boolean;
  /** Tooltip should have a mix-blend-mode */
  hasMixBlendModeProperty?: boolean;
  /** Tooltip should have an isolation */
  hasIsolationProperty?: boolean;
  /** Tooltip should have a contain */
  hasContainProperty?: boolean;
  /** Tooltip should have a content-visibility */
  hasContentVisibilityProperty?: boolean;
  /** Tooltip should have a pointer-events */
  hasPointerEventsProperty?: boolean;
  /** Tooltip should have a user-select */
  hasUserSelectProperty?: boolean;
  /** Tooltip should have a touch-action */
  hasTouchActionProperty?: boolean;
  /** Tooltip should have a will-change */
  hasWillChangeProperty?: boolean;
  /** Tooltip should have an appearance */
  hasAppearanceProperty?: boolean;
  /** Tooltip should have a cursor */
  hasCursorProperty?: boolean;
  /** Tooltip should have a resize */
  hasResizeProperty?: boolean;
  /** Tooltip should have a scroll-behavior */
  hasScrollBehaviorProperty?: boolean;
  /** Tooltip should have an overscroll-behavior */
  hasOverscrollBehaviorProperty?: boolean;
  /** Tooltip should have a scroll-snap-type */
  hasScrollSnapTypeProperty?: boolean;
  /** Tooltip should have a scroll-snap-align */
  hasScrollSnapAlignProperty?: boolean;
  /** Tooltip should have a scroll-snap-stop */
  hasScrollSnapStopProperty?: boolean;
  /** Tooltip should have a scroll-margin */
  hasScrollMarginProperty?: boolean;
  /** Tooltip should have a scroll-padding */
  hasScrollPaddingProperty?: boolean;
  /** Tooltip should have a scroll-timeline */
  hasScrollTimelineProperty?: boolean;
  /** Tooltip should have a view-timeline */
  hasViewTimelineProperty?: boolean;
  /** Tooltip should have an animation-timeline */
  hasAnimationTimelineProperty?: boolean;
  /** Tooltip should have an animation-range */
  hasAnimationRangeProperty?: boolean;
  /** Tooltip should have an animation-composition */
  hasAnimationCompositionProperty?: boolean;
  /** Tooltip should have a container-type */
  hasContainerTypeProperty?: boolean;
  /** Tooltip should have a container-name */
  hasContainerNameProperty?: boolean;
  /** Tooltip should have a content-size */
  hasContentSizeProperty?: boolean;
  /** Tooltip should have an aspect-ratio */
  hasAspectRatioProperty?: boolean;
  /** Tooltip should have a writing-mode */
  hasWritingModeProperty?: boolean;
  /** Tooltip should have a direction */
  hasDirectionProperty?: boolean;
  /** Tooltip should have a text-orientation */
  hasTextOrientationProperty?: boolean;
  /** Tooltip should have a text-combine-upright */
  hasTextCombineUprightProperty?: boolean;
  /** Tooltip should have a text-overflow */
  hasTextOverflowProperty?: boolean;
  /** Tooltip should have a white-space */
  hasWhiteSpaceProperty?: boolean;
  /** Tooltip should have a word-break */
  hasWordBreakProperty?: boolean;
  /** Tooltip should have a line-break */
  hasLineBreakProperty?: boolean;
  /** Tooltip should have a hyphens */
  hasHyphensProperty?: boolean;
  /** Tooltip should have an overflow-wrap */
  hasOverflowWrapProperty?: boolean;
  /** Tooltip should have a word-wrap */
  hasWordWrapProperty?: boolean;
  /** Tooltip should have a word-spacing */
  hasWordSpacingProperty?: boolean;
  /** Tooltip should have a letter-spacing */
  hasLetterSpacingProperty?: boolean;
  /** Tooltip should have a text-indent */
  hasTextIndentProperty?: boolean;
  /** Tooltip should have a text-align */
  hasTextAlignProperty?: boolean;
  /** Tooltip should have a text-align-last */
  hasTextAlignLastProperty?: boolean;
  /** Tooltip should have a text-justify */
  hasTextJustifyProperty?: boolean;
  /** Tooltip should have a text-transform */
  hasTextTransformProperty?: boolean;
  /** Tooltip should have a text-decoration */
  hasTextDecorationProperty?: boolean;
  /** Tooltip should have a text-decoration-line */
  hasTextDecorationLineProperty?: boolean;
  /** Tooltip should have a text-decoration-style */
  hasTextDecorationStyleProperty?: boolean;
  /** Tooltip should have a text-decoration-color */
  hasTextDecorationColorProperty?: boolean;
  /** Tooltip should have a text-decoration-thickness */
  hasTextDecorationThicknessProperty?: boolean;
  /** Tooltip should have a text-underline-offset */
  hasTextUnderlineOffsetProperty?: boolean;
  /** Tooltip should have a text-underline-position */
  hasTextUnderlinePositionProperty?: boolean;
  /** Tooltip should have a text-shadow */
  hasTextShadowProperty?: boolean;
  /** Tooltip should have a font-family */
  hasFontFamilyProperty?: boolean;
  /** Tooltip should have a font-size */
  hasFontSizeProperty?: boolean;
  /** Tooltip should have a font-weight */
  hasFontWeightProperty?: boolean;
  /** Tooltip should have a font-style */
  hasFontStyleProperty?: boolean;
  /** Tooltip should have a font-variant */
  hasFontVariantProperty?: boolean;
  /** Tooltip should have a font-stretch */
  hasFontStretchProperty?: boolean;
  /** Tooltip should have a line-height */
  hasLineHeightProperty?: boolean;
  /** Tooltip should have a color */
  hasColorProperty?: boolean;
  /** Tooltip should have a background-color */
  hasBackgroundColorProperty?: boolean;
  /** Tooltip should have a border-color */
  hasBorderColorProperty?: boolean;
  /** Tooltip should have a border-width */
  hasBorderWidthProperty?: boolean;
  /** Tooltip should have a border-style */
  hasBorderStyleProperty?: boolean;
  /** Tooltip should have a border-radius */
  hasBorderRadiusProperty?: boolean;
  /** Tooltip should have a box-shadow */
  hasBoxShadowProperty?: boolean;
  /** Tooltip should have an outline */
  hasOutlineProperty?: boolean;
  /** Tooltip should have an outline-offset */
  hasOutlineOffsetProperty?: boolean;
  /** Tooltip should have an outline-width */
  hasOutlineWidthProperty?: boolean;
  /** Tooltip should have an outline-style */
  hasOutlineStyleProperty?: boolean;
  /** Tooltip should have an outline-color */
  hasOutlineColorProperty?: boolean;
  /** Tooltip should have a transition-property */
  hasTransitionPropertyProperty?: boolean;
  /** Tooltip should have a transition-duration */
  hasTransitionDurationProperty?: boolean;
  /** Tooltip should have a transition-timing-function */
  hasTransitionTimingFunctionProperty?: boolean;
  /** Tooltip should have a transition-delay */
  hasTransitionDelayProperty?: boolean;
  /** Tooltip should have an animation-name */
  hasAnimationNameProperty?: boolean;
  /** Tooltip should have an animation-duration */
  hasAnimationDurationProperty?: boolean;
  /** Tooltip should have an animation-timing-function */
  hasAnimationTimingFunctionProperty?: boolean;
  /** Tooltip should have an animation-delay */
  hasAnimationDelayProperty?: boolean;
  /** Tooltip should have an animation-iteration-count */
  hasAnimationIterationCountProperty?: boolean;
  /** Tooltip should have an animation-direction */
  hasAnimationDirectionProperty?: boolean;
  /** Tooltip should have an animation-fill-mode */
  hasAnimationFillModeProperty?: boolean;
  /** Tooltip should have an animation-play-state */
  hasAnimationPlayStateProperty?: boolean;
  /** Tooltip should have a transform-origin */
  hasTransformOriginProperty?: boolean;
  /** Tooltip should have a transform-style */
  hasTransformStyleProperty?: boolean;
  /** Tooltip should have a backface-visibility */
  hasBackfaceVisibilityProperty?: boolean;
  /** Tooltip should have a perspective-origin */
  hasPerspectiveOriginProperty?: boolean;
}

/**
 * Barrierefreie Tooltip-Komponente, die zusätzliche Informationen anzeigt, wenn über ein Element gehovert wird
 *
 * @example
 * ```tsx
 * <TooltipA11y content="Hilfeinformation" ariaLabel="Hilfe">
 *   <button>Hilfe</button>
 * </TooltipA11y>
 * ```
 */
export const TooltipA11y: React.FC<TooltipA11yProps> = ({
  content,
  children,
  position = 'top',
  delay = 0,
  hideDelay = 0,
  maxWidth = 250,
  className = '',
  disabled = false,
  arrow = true,
  id,
  role = 'tooltip',
  ariaLabel,
  closeOnEsc = true,
  showOnFocus = true,
  showOnHover = true,
  showOnClick = false,
  hideOnBlur = true,
  hideOnMouseLeave = true,
  hideOnClickOutside = true,
  isOpen,
  onShow,
  onHide,
  announce = true,
  announcePoliteness = 'polite',
  interactive = false,
  focusable = false,
  trapFocus = false,
  returnFocus = true,
  dismissible = true,
  dismissibleByTrigger = true,
  dismissibleByOutsideClick = true,
  dismissibleByEscape = true,
  dismissibleByTab = true,
  dismissibleByEnter = false,
  dismissibleBySpace = false,
  dismissibleByScroll = false,
  dismissibleByResize = false,
  dismissibleByNavigation = false,
  dismissibleByTimeout = false,
  dismissTimeout = 0,
  persistent = false,
  modal = false,
  nonModal = true,
  liveRegion = true,
  atomic = true,
  relevant,
  busy = false,
  hasDescription = false,
  description,
  hasLabel = false,
  label,
  hasTitle = false,
  title,
  hasStatus = false,
  status,
  hasIcon = false,
  icon,
  hasCloseButton = false,
  closeButtonLabel = 'Schließen',
  hasBackdrop = false,
  backdropClickable = true,
  backdropDismissible = true,
  backdropFocusable = false,
  backdropVisible = true,
  backdropTransparent = false,
  backdropBlurred = false,
  backdropColored = true,
  backdropColor = 'rgba(0, 0, 0, 0.5)',
  backdropOpacity = 0.5,
  backdropZIndex = 1000,
  hasShadow = true,
  hasBorder = true,
  hasBackground = true,
  hasPadding = true,
  hasMargin = true,
  hasRadius = true,
  hasWidth = true,
  hasHeight = false,
  hasMinWidth = false,
  hasMinHeight = false,
  hasMaxWidth = true,
  hasMaxHeight = false,
  hasZIndex = true,
  hasTransition = true,
  hasAnimation = true,
  hasTransform = true,
  hasScale = false,
  hasRotation = false,
  hasTranslation = true,
  hasSkew = false,
  hasPerspective = false,
  hasFilter = false,
  hasBackdropFilter = false,
  hasClipPath = false,
  hasMask = false,
  hasMixBlendMode = false,
  hasIsolation = false,
  hasContain = false,
  hasContentVisibility = false,
  hasPointerEvents = true,
  hasUserSelect = true,
  hasTouchAction = false,
  hasWillChange = false,
  hasAppearance = false,
  hasCursor = true,
  hasResize = false,
  hasScrollBehavior = false,
  hasOverscrollBehavior = false,
  hasScrollSnapType = false,
  hasScrollSnapAlign = false,
  hasScrollSnapStop = false,
  hasScrollMargin = false,
  hasScrollPadding = false,
  hasScrollTimeline = false,
  hasViewTimeline = false,
  hasAnimationTimeline = false,
  hasAnimationRange = false,
  hasAnimationComposition = false,
  hasContainerType = false,
  hasContainerName = false,
  hasContentSize = false,
  hasAspectRatio = false,
  hasWritingMode = false,
  hasDirection = false,
  hasTextOrientation = false,
  hasTextCombineUpright = false,
  hasTextOverflow = true,
  hasWhiteSpace = true,
  hasWordBreak = true,
  hasLineBreak = false,
  hasHyphens = false,
  hasOverflowWrap = true,
  hasWordWrap = true,
  hasWordSpacing = false,
  hasLetterSpacing = false,
  hasTextIndent = false,
  hasTextAlign = false,
  hasTextAlignLast = false,
  hasTextJustify = false,
  hasTextTransform = false,
  hasTextDecoration = false,
  hasTextDecorationLine = false,
  hasTextDecorationStyle = false,
  hasTextDecorationColor = false,
  hasTextDecorationThickness = false,
  hasTextUnderlineOffset = false,
  hasTextUnderlinePosition = false,
  hasTextShadow = false,
  hasFontFamily = false,
  hasFontSize = false,
  hasFontWeight = false,
  hasFontStyle = false,
  hasFontVariant = false,
  hasFontStretch = false,
  hasLineHeight = false,
  hasColor = false,
  hasBackgroundColor = false,
  hasBorderColor = false,
  hasBorderWidth = false,
  hasBorderStyle = false,
  hasBorderRadius = false,
  hasBoxShadow = false,
  hasOutline = false,
  hasOutlineOffset = false,
  hasOutlineWidth = false,
  hasOutlineStyle = false,
  hasOutlineColor = false,
  hasTransitionProperty = false,
  hasTransitionDuration = false,
  hasTransitionTimingFunction = false,
  hasTransitionDelay = false,
  hasAnimationName = false,
  hasAnimationDuration = false,
  hasAnimationTimingFunction = false,
  hasAnimationDelay = false,
  hasAnimationIterationCount = false,
  hasAnimationDirection = false,
  hasAnimationFillMode = false,
  hasAnimationPlayState = false,
  hasTransformOrigin = false,
  hasTransformStyle = false,
  hasBackfaceVisibility = false,
  hasPerspectiveOrigin = false,
  hasFilterProperty = false,
  hasBackdropFilterProperty = false,
  hasMixBlendModeProperty = false,
  hasIsolationProperty = false,
  hasContainProperty = false,
  hasContentVisibilityProperty = false,
  hasPointerEventsProperty = false,
  hasUserSelectProperty = false,
  hasTouchActionProperty = false,
  hasWillChangeProperty = false,
  hasAppearanceProperty = false,
  hasCursorProperty = false,
  hasResizeProperty = false,
  hasScrollBehaviorProperty = false,
  hasOverscrollBehaviorProperty = false,
  hasScrollSnapTypeProperty = false,
  hasScrollSnapAlignProperty = false,
  hasScrollSnapStopProperty = false,
  hasScrollMarginProperty = false,
  hasScrollPaddingProperty = false,
  hasScrollTimelineProperty = false,
  hasViewTimelineProperty = false,
  hasAnimationTimelineProperty = false,
  hasAnimationRangeProperty = false,
  hasAnimationCompositionProperty = false,
  hasContainerTypeProperty = false,
  hasContainerNameProperty = false,
  hasContentSizeProperty = false,
  hasAspectRatioProperty = false,
  hasWritingModeProperty = false,
  hasDirectionProperty = false,
  hasTextOrientationProperty = false,
  hasTextCombineUprightProperty = false,
  hasTextOverflowProperty = false,
  hasWhiteSpaceProperty = false,
  hasWordBreakProperty = false,
  hasLineBreakProperty = false,
  hasHyphensProperty = false,
  hasOverflowWrapProperty = false,
  hasWordWrapProperty = false,
  hasWordSpacingProperty = false,
  hasLetterSpacingProperty = false,
  hasTextIndentProperty = false,
  hasTextAlignProperty = false,
  hasTextAlignLastProperty = false,
  hasTextJustifyProperty = false,
  hasTextTransformProperty = false,
  hasTextDecorationProperty = false,
  hasTextDecorationLineProperty = false,
  hasTextDecorationStyleProperty = false,
  hasTextDecorationColorProperty = false,
  hasTextDecorationThicknessProperty = false,
  hasTextUnderlineOffsetProperty = false,
  hasTextUnderlinePositionProperty = false,
  hasTextShadowProperty = false,
  hasFontFamilyProperty = false,
  hasFontSizeProperty = false,
  hasFontWeightProperty = false,
  hasFontStyleProperty = false,
  hasFontVariantProperty = false,
  hasFontStretchProperty = false,
  hasLineHeightProperty = false,
  hasColorProperty = false,
  hasBackgroundColorProperty = false,
  hasBorderColorProperty = false,
  hasBorderWidthProperty = false,
  hasBorderStyleProperty = false,
  hasBorderRadiusProperty = false,
  hasBoxShadowProperty = false,
  hasOutlineProperty = false,
  hasOutlineOffsetProperty = false,
  hasOutlineWidthProperty = false,
  hasOutlineStyleProperty = false,
  hasOutlineColorProperty = false,
  hasTransitionPropertyProperty = false,
  hasTransitionDurationProperty = false,
  hasTransitionTimingFunctionProperty = false,
  hasTransitionDelayProperty = false,
  hasAnimationNameProperty = false,
  hasAnimationDurationProperty = false,
  hasAnimationTimingFunctionProperty = false,
  hasAnimationDelayProperty = false,
  hasAnimationIterationCountProperty = false,
  hasAnimationDirectionProperty = false,
  hasAnimationFillModeProperty = false,
  hasAnimationPlayStateProperty = false,
  hasTransformOriginProperty = false,
  hasTransformStyleProperty = false,
  hasBackfaceVisibilityProperty = false,
  hasPerspectiveOriginProperty = false,
}) => {
  // State
  const [isVisible, setIsVisible] = useState(isOpen !== undefined ? isOpen : false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  // Refs
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Generiere eine eindeutige ID, wenn keine angegeben wurde
  const tooltipId = id || `tooltip-${Math.random().toString(36).substr(2, 9)}`;

  // Berechne die Position des Tooltips
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - 8;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'right':
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.right + 8;
        break;
      case 'bottom':
        top = triggerRect.bottom + 8;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'left':
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.left - tooltipRect.width - 8;
        break;
    }

    // Stelle sicher, dass der Tooltip im sichtbaren Bereich bleibt
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 0) left = 0;
    if (left + tooltipRect.width > viewportWidth) left = viewportWidth - tooltipRect.width;
    if (top < 0) top = 0;
    if (top + tooltipRect.height > viewportHeight) top = viewportHeight - tooltipRect.height;

    setTooltipPosition({ top, left });
  }, [position]);

  // Zeige den Tooltip an
  const showTooltip = useCallback(() => {
    if (disabled) return;

    // Speichere den aktuellen Fokus
    if (returnFocus) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }

    // Lösche alle Timeouts
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    // Setze einen Timeout zum Anzeigen des Tooltips
    showTimeoutRef.current = setTimeout(() => {
      setIsVisible(true);

      // Berechne die Position des Tooltips
      setTimeout(() => {
        calculatePosition();
      }, 0);

      // Fokussiere den Tooltip, wenn er fokussierbar ist
      if (focusable && tooltipRef.current) {
        tooltipRef.current.focus();
      }

      // Rufe den onShow-Callback auf
      if (onShow) onShow();

      // Setze einen Timeout zum automatischen Schließen des Tooltips
      if (dismissibleByTimeout && dismissTimeout > 0) {
        hideTimeoutRef.current = setTimeout(() => {
          hideTooltip();
        }, dismissTimeout);
      }
    }, delay);
  }, [
    disabled,
    delay,
    calculatePosition,
    focusable,
    onShow,
    dismissibleByTimeout,
    dismissTimeout,
    returnFocus,
  ]);

  // Verstecke den Tooltip
  const hideTooltip = useCallback(() => {
    // Lösche alle Timeouts
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    // Setze einen Timeout zum Verstecken des Tooltips
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);

      // Rufe den onHide-Callback auf
      if (onHide) onHide();

      // Setze den Fokus zurück
      if (returnFocus && previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }, hideDelay);
  }, [hideDelay, onHide, returnFocus]);

  // Behandle Escape-Taste
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isVisible) return;

      if (event.key === 'Escape' && dismissibleByEscape) {
        hideTooltip();
      } else if (event.key === 'Tab' && dismissibleByTab) {
        hideTooltip();
      } else if (event.key === 'Enter' && dismissibleByEnter) {
        hideTooltip();
      } else if (event.key === ' ' && dismissibleBySpace) {
        hideTooltip();
      }
    },
    [
      isVisible,
      dismissibleByEscape,
      dismissibleByTab,
      dismissibleByEnter,
      dismissibleBySpace,
      hideTooltip,
    ]
  );

  // Behandle Klicks außerhalb des Tooltips
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (!isVisible) return;

      if (
        dismissibleByOutsideClick &&
        tooltipRef.current &&
        triggerRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        hideTooltip();
      }
    },
    [isVisible, dismissibleByOutsideClick, hideTooltip]
  );

  // Behandle Scrollen
  const handleScroll = useCallback(() => {
    if (!isVisible) return;

    if (dismissibleByScroll) {
      hideTooltip();
    } else {
      calculatePosition();
    }
  }, [isVisible, dismissibleByScroll, hideTooltip, calculatePosition]);

  // Behandle Größenänderungen des Fensters
  const handleResize = useCallback(() => {
    if (!isVisible) return;

    if (dismissibleByResize) {
      hideTooltip();
    } else {
      calculatePosition();
    }
  }, [isVisible, dismissibleByResize, hideTooltip, calculatePosition]);

  // Behandle Navigation
  const handleNavigation = useCallback(() => {
    if (!isVisible) return;

    if (dismissibleByNavigation) {
      hideTooltip();
    }
  }, [isVisible, dismissibleByNavigation, hideTooltip]);

  // Effekt für die Steuerung der Sichtbarkeit durch die isOpen-Prop
  useEffect(() => {
    if (isOpen !== undefined) {
      if (isOpen) {
        showTooltip();
      } else {
        hideTooltip();
      }
    }
  }, [isOpen, showTooltip, hideTooltip]);

  // Effekt für Event-Listener
  useEffect(() => {
    if (dismissibleByEscape || dismissibleByTab || dismissibleByEnter || dismissibleBySpace) {
      document.addEventListener('keydown', handleKeyDown);
    }

    if (dismissibleByOutsideClick) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    if (dismissibleByScroll || !dismissibleByScroll) {
      window.addEventListener('scroll', handleScroll);
    }

    if (dismissibleByResize || !dismissibleByResize) {
      window.addEventListener('resize', handleResize);
    }

    if (dismissibleByNavigation) {
      window.addEventListener('popstate', handleNavigation);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('popstate', handleNavigation);

      // Lösche alle Timeouts
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }

      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [
    dismissibleByEscape,
    dismissibleByTab,
    dismissibleByEnter,
    dismissibleBySpace,
    dismissibleByOutsideClick,
    dismissibleByScroll,
    dismissibleByResize,
    dismissibleByNavigation,
    handleKeyDown,
    handleClickOutside,
    handleScroll,
    handleResize,
    handleNavigation,
  ]);

  // Klone das Kind und füge Event-Handler hinzu
  const triggerElement = React.cloneElement(children, {
    ref: (node: HTMLElement) => {
      triggerRef.current = node;

      // Wenn das Kind bereits eine ref hat, rufe diese auf
      const { ref } = children;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLElement>).current = node;
      }
    },
    'aria-describedby': isVisible ? tooltipId : undefined,
    onMouseEnter: (event: React.MouseEvent<HTMLElement>) => {
      if (showOnHover) {
        showTooltip();
      }

      // Wenn das Kind bereits einen onMouseEnter-Handler hat, rufe diesen auf
      if (children.props.onMouseEnter) {
        children.props.onMouseEnter(event);
      }
    },
    onMouseLeave: (event: React.MouseEvent<HTMLElement>) => {
      if (hideOnMouseLeave) {
        hideTooltip();
      }

      // Wenn das Kind bereits einen onMouseLeave-Handler hat, rufe diesen auf
      if (children.props.onMouseLeave) {
        children.props.onMouseLeave(event);
      }
    },
    onFocus: (event: React.FocusEvent<HTMLElement>) => {
      if (showOnFocus) {
        showTooltip();
      }

      // Wenn das Kind bereits einen onFocus-Handler hat, rufe diesen auf
      if (children.props.onFocus) {
        children.props.onFocus(event);
      }
    },
    onBlur: (event: React.FocusEvent<HTMLElement>) => {
      if (hideOnBlur) {
        hideTooltip();
      }

      // Wenn das Kind bereits einen onBlur-Handler hat, rufe diesen auf
      if (children.props.onBlur) {
        children.props.onBlur(event);
      }
    },
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      if (showOnClick) {
        showTooltip();
      }

      if (dismissibleByTrigger && isVisible) {
        hideTooltip();
      }

      // Wenn das Kind bereits einen onClick-Handler hat, rufe diesen auf
      if (children.props.onClick) {
        children.props.onClick(event);
      }
    },
  });

  // Berechne die CSS-Klassen für den Tooltip
  const tooltipClasses = [
    'tooltip',
    `tooltip-${position}`,
    isVisible ? 'tooltip-visible' : 'tooltip-hidden',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Berechne die CSS-Styles für den Tooltip
  const tooltipStyles: React.CSSProperties = {
    ...(hasMaxWidth ? { maxWidth: `${maxWidth}px` } : {}),
    ...(hasPosition
      ? { position: 'fixed', top: `${tooltipPosition.top}px`, left: `${tooltipPosition.left}px` }
      : {}),
    ...(hasZIndex ? { zIndex: 9999 } : {}),
    ...(hasPointerEvents ? { pointerEvents: interactive ? 'auto' : 'none' } : {}),
    ...(hasUserSelect ? { userSelect: 'none' } : {}),
    ...(hasCursor ? { cursor: 'default' } : {}),
  };

  // Rendere den Tooltip
  return (
    <>
      {triggerElement}

      {/* Backdrop */}
      {hasBackdrop && isVisible && (
        <div
          className="tooltip-backdrop"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: backdropZIndex,
            backgroundColor: backdropColored ? backdropColor : 'transparent',
            opacity: backdropVisible ? backdropOpacity : 0,
            backdropFilter: backdropBlurred ? 'blur(2px)' : 'none',
            pointerEvents: backdropClickable ? 'auto' : 'none',
            cursor: backdropClickable ? 'pointer' : 'default',
          }}
          onClick={backdropDismissible ? hideTooltip : undefined}
          tabIndex={backdropFocusable ? 0 : -1}
          aria-hidden="true"
        />
      )}

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        id={tooltipId}
        className={tooltipClasses}
        style={tooltipStyles}
        role={role}
        aria-label={ariaLabel || label || title}
        aria-hidden={!isVisible}
        aria-live={liveRegion ? announcePoliteness : undefined}
        aria-atomic={liveRegion ? atomic : undefined}
        aria-relevant={liveRegion ? relevant : undefined}
        aria-busy={busy}
        aria-modal={modal}
        tabIndex={focusable ? 0 : -1}
      >
        {/* Inhalt */}
        <div className="tooltip-content">
          {/* Icon */}
          {hasIcon && icon && (
            <div className="tooltip-icon" aria-hidden="true">
              {icon}
            </div>
          )}

          {/* Titel */}
          {hasTitle && title && <div className="tooltip-title">{title}</div>}

          {/* Inhalt */}
          <div className="tooltip-text">{content}</div>

          {/* Beschreibung */}
          {hasDescription && description && (
            <div className="tooltip-description">{description}</div>
          )}

          {/* Status */}
          {hasStatus && status && (
            <div className={`tooltip-status tooltip-status-${status}`}>{status}</div>
          )}

          {/* Schließen-Button */}
          {hasCloseButton && (
            <button
              className="tooltip-close-button"
              onClick={hideTooltip}
              aria-label={closeButtonLabel}
              type="button"
            >
              <span aria-hidden="true">×</span>
            </button>
          )}
        </div>

        {/* Pfeil */}
        {arrow && <div className={`tooltip-arrow tooltip-arrow-${position}`} aria-hidden="true" />}
      </div>

      {/* Screenreader-Ankündigung */}
      {announce && liveRegion && isVisible && (
        <div className="sr-only" aria-live={announcePoliteness} aria-atomic="true">
          {ariaLabel || label || title || content}
        </div>
      )}
    </>
  );
};

export default TooltipA11y;
