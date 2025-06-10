// packages/@smolitux/core/src/index.ts
// Core UI Components

// Animation exports
export {
  default as AnimatePresence,
  type AnimatePresenceProps,
} from './animations/AnimatePresence';
export { default as Motion, type MotionProps, type MotionVariants } from './animations/Motion';
export { default as keyframes, type KeyframeAnimation } from './animations/keyframes';
export {
  default as transitions,
  type TransitionPreset,
  type TransitionPresetName,
  type TransitionVariant,
  createTransition,
  createMultiTransition,
} from './animations/transitions';
export {
  default as useAnimation,
  type AnimationOptions,
  type AnimationControls,
} from './animations/useAnimation';
export {
  default as useTransition,
  type TransitionState,
  type TransitionOptions,
  type TransitionResult,
} from './animations/useTransition';
export { default as Alert, type AlertProps, type AlertType } from './components/Alert/Alert';
export { default as Badge, type BadgeProps } from './components/Badge/Badge';
export { default as Button, type ButtonProps } from './components/Button/Button';
// Temporarily disabled due to TypeScript errors
export { default as ButtonA11y, type A11yButtonProps } from './components/Button/Button.a11y';
export { default as Card, type CardProps } from './components/Card/Card';
export { default as Input, type InputProps } from './components/Input/Input';
export { default as Modal, type ModalProps } from './components/Modal/Modal';
export { default as Select, type SelectProps, type SelectOption } from './components/Select/Select';
// Temporarily disabled due to missing @smolitux/voice-control package
// export { VoiceButton } from './components/voice/VoiceButton';
// export { VoiceInput } from './components/voice/VoiceInput';
// export { VoiceSelect } from './components/voice/VoiceSelect';
// export { VoiceModal } from './components/voice/VoiceModal';
// export { VoiceCard } from './components/voice/VoiceCard';
export { default as TabView, type TabViewProps, type TabItem } from './components/TabView';
// Temporarily disabled due to TypeScript errors
export {
  default as Table,
  type TableProps,
  type TableColumn,
  type SortDirection,
} from './components/Table/Table';
export { default as Checkbox, type CheckboxProps } from './components/Checkbox/Checkbox';
export { default as Radio, type RadioProps } from './components/Radio/Radio';
export {
  default as RadioGroup,
  type RadioGroupProps,
  type RadioOption,
} from './components/RadioGroup/RadioGroup';
// Temporarily disabled due to TypeScript errors
export { default as Tooltip, type TooltipProps } from './components/Tooltip/Tooltip';
export {
  Toast,
  ToastProvider,
  useToast,
  useToastMethods,
  type ToastProps,
  type ToastType,
  type ToastProviderProps,
} from './components/Toast';
export { default as ProgressBar, type ProgressBarProps } from './components/ProgressBar';
export { default as Pagination, type PaginationProps } from './components/Pagination';
export { default as Skeleton, type SkeletonProps } from './components/Skeleton';
// export { default as TimePicker, type TimePickerProps } from './components/TimePicker';

// New components
export {
  default as FormControl,
  type FormControlProps,
  useFormControl,
} from './components/FormControl/FormControl';
export { default as Form, type FormProps } from './components/Form/Form';
// Temporarily disabled due to TypeScript errors
// export { default as FormField, type FormFieldProps } from './components/FormField/FormField';
export { default as TextArea, type TextAreaProps } from './components/TextArea/TextArea';
export { default as Switch, type SwitchProps } from './components/Switch/Switch';
export {
  default as Breadcrumb,
  type BreadcrumbProps,
  type BreadcrumbItemData,
} from './components/Breadcrumb/Breadcrumb';
export {
  default as ColorPicker,
  type ColorPickerProps,
} from './components/ColorPicker/ColorPicker';
export {
  default as Carousel,
  type CarouselProps,
  type CarouselItem,
} from './components/Carousel/Carousel';
// Temporarily disabled due to TypeScript errors
// export { default as Menu, type MenuProps } from './components/Menu/Menu';
// export { default as MenuItem, type MenuItemProps } from './components/Menu/MenuItem';
// export { default as MenuDivider, type MenuDividerProps } from './components/Menu/MenuDivider';
// export { default as MenuDropdown, type MenuDropdownProps } from './components/Menu/MenuDropdown';
export {
  default as Drawer,
  type DrawerProps,
  type DrawerPlacement,
} from './components/Drawer/Drawer';
export { default as Dialog, type DialogProps } from './components/Dialog/Dialog';
export {
  default as Popover,
  type PopoverProps,
  type PopoverPlacement,
} from './components/Popover/Popover';
// Temporarily disabled due to TypeScript errors
// export {
//   default as FileUpload,
//   type FileUploadProps,
//   type FileInfo,
// } from './components/FileUpload/FileUpload';
export {
  MediaPlayer,
  type MediaPlayerProps,
  type MediaSource,
  type MediaTrack,
} from './components/MediaPlayer/MediaPlayer';
// Temporarily disabled due to TypeScript errors
// export { default as DatePicker, type DatePickerProps } from './components/DatePicker/DatePicker';

// Animation components
export { default as Fade, type FadeProps } from './components/Fade/Fade';
export { default as Slide, type SlideProps, type SlideDirection } from './components/Slide/Slide';
export { default as Collapse, type CollapseProps } from './components/Collapse/Collapse';
export { default as Zoom, type ZoomProps } from './components/Zoom/Zoom';

// Form validation - Temporarily disabled due to TypeScript errors
// export { default as useFormContext } from './validation/Form';
// export { default as useForm } from './validation/useForm';
// export { default as useField } from './validation/useField';
// export { default as useValidation } from './validation/useValidation';
// export * from './validation/validators';
// export * from './validation/types';

// Internationalization - Temporarily disabled due to TypeScript errors
// export { default as I18nProvider, useI18n, type I18nProviderProps } from './i18n/I18nProvider';
// export { default as useTranslation } from './i18n/useTranslation';
export {
  default as LanguageSwitcher,
  type LanguageSwitcherProps,
} from './components/LanguageSwitcher/LanguageSwitcher';
export * from './i18n/types';
export * from './i18n/constants';
