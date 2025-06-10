# Smolitux UI - ai Package

This document provides package-specific guidance for AI agents working with the `@smolitux/ai` package in the Smolitux UI component library.

## 📋 Package Overview

The `@smolitux/ai` package provides ai components for the Smolitux UI component library. These components are used to structure and organize the UI.

## 🧩 Component Categories

The ai package includes the following component categories:

### Container Components
- Container
- Section
- Main
- Header
- Footer
- Aside

### Grid Components
- Grid
- Row
- Column
- SimpleGrid
- AspectRatio

### Flex Components
- Flex
- HStack
- VStack
- Spacer
- Center
- Square
- Circle

### Box Components
- Box
- Card
- Paper
- Surface
- Frame
- Divider

### Responsive Components
- Show
- Hide
- Responsive
- BreakpointProvider
- useBreakpoint

## 🔧 Development Workflow

For each component in the ai package, follow this workflow:

### 1. Analysis Phase
```bash
COMPONENT="Grid"  # Replace with target

# Quick component inspection
bash scripts/workflows/analyze-repo.sh --package ai --component $COMPONENT
```

### 2. Completion Phase
```bash
# Complete component
bash scripts/workflows/complete-components.sh --package ai --component $COMPONENT
```

### 3. Validation Phase
```bash
# Validate component
bash scripts/workflows/validate-quality.sh --package ai --component $COMPONENT
```

### 4. Progress Tracking Phase
```bash
# Generate coverage dashboard
bash scripts/workflows/generate-coverage-dashboard.sh
```

## 📊 Component Requirements

All ai components must meet the following requirements:

### Accessibility
- WCAG 2.1 AA compliance
- Proper ARIA attributes
- Keyboard navigation
- Focus management
- Screen reader support

### Customization
- Theme-aware styling
- Variant support
- Size support
- Color scheme support
- Custom class support

### Performance
- Optimized rendering
- Memoization where appropriate
- Efficient event handling
- Minimal dependencies

### TypeScript
- Strict typing
- Comprehensive interfaces
- JSDoc comments
- No `any` types
- Proper event typing

### Testing
- Unit tests
- Integration tests
- Accessibility tests
- Visual tests
- Edge case tests

### Documentation
- Comprehensive Storybook stories
- Usage examples
- Prop documentation
- Accessibility notes
- Best practices

## 🚨 Common Issues and Solutions

### Issue: Grid component doesn't handle responsive props

**Cause**: Missing responsive prop handling.

**Solution**:
```typescript
// Add responsive prop handling
import { useTheme } from '@smolitux/theme';

interface GridProps {
  columns?: number | { [key: string]: number };
  gap?: string | { [key: string]: string };
  // Other props
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ columns = 12, gap = '1rem', ...props }, ref) => {
    const theme = useTheme();
    
    // Handle responsive columns
    const getColumns = () => {
      if (typeof columns === 'number') {
        return columns;
      }
      
      // Get current breakpoint
      const breakpoint = theme.breakpoints.current;
      
      // Find the closest breakpoint
      const breakpoints = Object.keys(columns);
      const closestBreakpoint = breakpoints.reduce((prev, curr) => {
        if (theme.breakpoints[curr] <= theme.breakpoints[breakpoint]) {
          return curr;
        }
        return prev;
      }, breakpoints[0]);
      
      return columns[closestBreakpoint] || columns.base || 12;
    };
    
    // Similar logic for gap
    
    return (
      <div
        ref={ref}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${getColumns()}, 1fr)`,
          gap: getGap(),
        }}
        {...props}
      />
    );
  }
);
```

### Issue: Flex component doesn't handle alignment

**Cause**: Missing alignment props.

**Solution**:
```typescript
// Add alignment props
interface FlexProps {
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  // Other props
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      align = 'stretch',
      justify = 'flex-start',
      direction = 'row',
      wrap = 'nowrap',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          alignItems: align,
          justifyContent: justify,
          flexDirection: direction,
          flexWrap: wrap,
        }}
        {...props}
      />
    );
  }
);
```

### Issue: Container component doesn't handle max width

**Cause**: Missing max width prop.

**Solution**:
```typescript
// Add max width prop
interface ContainerProps {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
  // Other props
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ maxWidth = 'lg', ...props }, ref) => {
    const theme = useTheme();
    
    // Get max width value
    const getMaxWidth = () => {
      if (typeof maxWidth === 'string' && maxWidth in theme.breakpoints) {
        return theme.breakpoints[maxWidth];
      }
      return maxWidth;
    };
    
    return (
      <div
        ref={ref}
        style={{
          width: '100%',
          maxWidth: getMaxWidth(),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
        }}
        {...props}
      />
    );
  }
);
```

### Issue: Box component doesn't handle system props

**Cause**: Missing system props.

**Solution**:
```typescript
// Add system props
import { system, SystemProps } from '@smolitux/theme';

interface BoxProps extends SystemProps {
  // Other props
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (props, ref) => {
    // Extract system props
    const { systemProps, otherProps } = system.extract(props);
    
    // Generate styles from system props
    const styles = system.css(systemProps);
    
    return (
      <div
        ref={ref}
        style={styles}
        {...otherProps}
      />
    );
  }
);
```

## 📚 Additional Resources

- [ai Package Guidelines](../../docs/wiki/codex/package-specific/ai.md)
- [Component Patterns](../../docs/wiki/codex/component-patterns.md)
- [Troubleshooting](../../docs/wiki/codex/troubleshooting.md)
- [Component Status](../../COMPONENT_STATUS.md)
- [Prompt System](../../prompts/README.md)