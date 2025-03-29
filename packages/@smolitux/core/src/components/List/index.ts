// packages/@smolitux/core/src/components/List/index.ts
export { 
  default as List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAction
} from './List';

export type { 
  ListProps,
  ListItemProps,
  ListItemTextProps,
  ListItemIconProps,
  ListItemActionProps,
  ListContextType
} from './List';

// Barrierefreie Versionen
export {
  ListA11y,
  ListItemA11y,
  ListItemTextA11y,
  ListItemIconA11y,
  ListItemActionA11y
} from './List.a11y';