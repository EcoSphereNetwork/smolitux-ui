// packages/@smolitux/core/src/index.ts
// Core UI Components

// Animation exports
export { default as AnimatePresence, type AnimatePresenceProps } from './animations/AnimatePresence';
export { default as Motion, type MotionProps, type MotionVariants } from './animations/Motion';
export { default as keyframes, type KeyframeAnimation } from './animations/keyframes';
export { 
  default as transitions, 
  type TransitionPreset, 
  type TransitionPresetName, 
  type TransitionVariant,
  createTransition,
  createMultiTransition
} from './animations/transitions';
export { default as useAnimation, type AnimationOptions, type AnimationControls } from './animations/useAnimation';
export { 
  default as useTransition, 
  type TransitionState, 
  type TransitionOptions, 
  type TransitionResult 
} from './animations/useTransition';
export { default as Alert, type AlertProps, type AlertType } from './components/Alert/Alert';
export { default as Badge, type BadgeProps } from './components/Badge/Badge';
export { default as Button, type ButtonProps } from './components/Button/Button';
export { default as Card, type CardProps } from './components/Card/Card';
export { default as Input, type InputProps } from './components/Input/Input';
export { default as Modal, type ModalProps } from './components/Modal/Modal';
export { default as Select, type SelectProps, type SelectOption } from './components/Select/Select';
export { default as TabView, type TabViewProps, type TabItem } from './components/TabView';
export { default as Table, type TableProps, type TableColumn, type SortDirection } from './components/Table/Table';
export { default as Checkbox, type CheckboxProps } from './components/Checkbox/Checkbox';
export { default as Radio, type RadioProps } from './components/Radio/Radio';
export { default as RadioGroup, type RadioGroupProps, type RadioOption } from './components/RadioGroup/RadioGroup';
export { default as Tooltip, type TooltipProps } from './components/Tooltip/Tooltip';
export { 
  Toast, 
  ToastProvider, 
  useToast, 
  useToastMethods, 
  type ToastProps, 
  type ToastType, 
  type ToastProviderProps 
} from './components/Toast';
export { default as ProgressBar, type ProgressBarProps } from './components/ProgressBar';
export { default as Pagination, type PaginationProps } from './components/Pagination';
export { default as Skeleton, type SkeletonProps } from './components/Skeleton';
export { default as TimePicker, type TimePickerProps } from './components/TimePicker';

// New components
export { default as FormControl, type FormControlProps, useFormControl } from './components/FormControl/FormControl';
export { default as TextArea, type TextAreaProps } from './components/TextArea/TextArea';
export { default as Switch, type SwitchProps } from './components/Switch/Switch';
export { default as Breadcrumb, type BreadcrumbProps, type BreadcrumbItem } from './components/Breadcrumb/Breadcrumb';
export { default as ColorPicker, type ColorPickerProps } from './components/ColorPicker/ColorPicker';
export { default as Carousel, type CarouselProps, type CarouselItem } from './components/Carousel/Carousel';
export { default as Menu, type MenuProps } from './components/Menu/Menu';
export { default as MenuItem, type MenuItemProps } from './components/Menu/MenuItem';
export { default as MenuDivider, type MenuDividerProps } from './components/Menu/MenuDivider';
export { default as MenuDropdown, type MenuDropdownProps } from './components/Menu/MenuDropdown';
export { default as Drawer, type DrawerProps, type DrawerPlacement } from './components/Drawer/Drawer';
export { default as Dialog, type DialogProps } from './components/Dialog/Dialog';
export { default as Popover, type PopoverProps, type PopoverPlacement } from './components/Popover/Popover';
export { default as FileUpload, type FileUploadProps, type FileInfo } from './components/FileUpload/FileUpload';
export { default as MediaPlayer, type MediaPlayerProps, type MediaType, type MediaSource, type MediaTrack, type MediaChapter } from './components/MediaPlayer/MediaPlayer';
export { default as DatePicker, type DatePickerProps } from './components/DatePicker/DatePicker';

// Animation components
export { default as Fade, type FadeProps } from './components/Fade/Fade';
export { default as Slide, type SlideProps, type SlideDirection } from './components/Slide/Slide';
export { default as Collapse, type CollapseProps } from './components/Collapse/Collapse';
export { default as Zoom, type ZoomProps } from './components/Zoom/Zoom';
