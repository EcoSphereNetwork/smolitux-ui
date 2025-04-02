# Komponenten-Spezifikation der Resonance UI Bibliothek

## 1. Komponentenklassifikation

### 1.1 Primitive Komponenten
Atomare Basiskomponenten mit minimaler Logik und maximaler Konfigurierbarkeit.

#### 1.1.1 Button-Komponente
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: (event: React.MouseEvent) => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  onClick,
  ...rest
}) => {
  // Implementierungsdetails
}
```

#### 1.1.2 Input-Komponente
```typescript
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number';
  label?: string;
  placeholder?: string;
  error?: string;
  success?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  label,
  error,
  success,
  leftIcon,
  rightIcon,
  variant = 'default',
  size = 'md',
  ...rest
}) => {
  // Implementierungsdetails
}
```

### 1.2 Zusammengesetzte Komponenten

#### 1.2.1 Modal-Komponente
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlay?: boolean;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  title,
  size = 'md',
  closeOnOverlay = true,
  footer,
  ...rest
}) => {
  // Implementierungsdetails
}
```

#### 1.2.2 Form-Komponente
```typescript
interface FormProps {
  initialValues: Record<string, any>;
  validationSchema?: any;
  onSubmit: (values: Record<string, any>) => void;
  layout?: 'vertical' | 'horizontal';
}

const Form: React.FC<FormProps> = ({
  children,
  initialValues,
  validationSchema,
  onSubmit,
  layout = 'vertical',
  ...rest
}) => {
  // Implementierungsdetails
}
```

### 1.3 Layout-Komponenten

#### 1.3.1 Grid-Komponente
```typescript
interface GridProps {
  container?: boolean;
  item?: boolean;
  spacing?: 0 | 1 | 2 | 3 | 4 | 5;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

const Grid: React.FC<GridProps> = ({
  children,
  container = false,
  item = false,
  spacing = 0,
  xs,
  sm,
  md,
  lg,
  xl,
  ...rest
}) => {
  // Implementierungsdetails
}
```

## 2. Globale Design-Tokens

### 2.1 Farbpalette
```typescript
const colors = {
  primary: {
    50: '#E6F2FF',
    100: '#B3DBFF',
    200: '#80C3FF',
    300: '#4DACFF',
    400: '#1A95FF',
    500: '#0075E1', // Hauptfarbe
    600: '#005BB3',
    700: '#004285',
    800: '#002957',
    900: '#001429'
  },
  secondary: {
    // Ähnliche Struktur wie Primary
  },
  // Weitere Farbkategorien
};
```

### 2.2 Typografie
```typescript
const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system'],
    serif: ['Merriweather', 'Georgia'],
    mono: ['Fira Code', 'monospace']
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    // Weitere Größen
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  }
};
```

## 3. Responsive Design-Strategien

### 3.1 Breakpoint-Definitionen
```typescript
const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};
```

### 3.2 Responsive Utility-Hook
```typescript
function useResponsive() {
  const [breakpoint, setBreakpoint] = useState<keyof typeof breakpoints>('xs');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // Logik zur Ermittlung des aktuellen Breakpoints
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialer Aufruf

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: breakpoint === 'xs' || breakpoint === 'sm',
    isTablet: breakpoint === 'md',
    isDesktop: breakpoint === 'lg' || breakpoint === 'xl',
    breakpoint
  };
}
```

## 4. Accessibility-Konzepte

### 4.1 Aria-Attribute Utility
```typescript
function useAccessibility(props: {
  label?: string;
  description?: string;
}) {
  return {
    'aria-label': props.label,
    'aria-description': props.description,
    role: 'region'
  };
}
```

## 5. Animations-System

### 5.1 Animations-Definitionen
```typescript
const animations = {
  fadeIn: keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `,
  slideIn: keyframes`
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  `,
  // Weitere Animationen
};
```

## 6. Internationalisierung

### 6.1 Übersetzungs-Utility
```typescript
function useTranslation(namespace: string) {
  const { t } = useTranslation(namespace);
  return {
    translate: (key: string, options?: any) => t(key, options)
  };
}
```

## 7. Theme-Management

### 7.1 Theme-Provider
```typescript
interface ThemeProviderProps {
  theme?: 'light' | 'dark' | 'system';
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme = 'system',
  children
}) => {
  // Theme-Logik
}
```

## 8. Performance-Optimierungen

### 8.1 Memoization-Strategie
```typescript
const MemoizedComponent = React.memo(MyComponent, (prevProps, nextProps) => {
  // Benutzerdefinierte Vergleichslogik
});
```

Diese umfassende Spezifikation bietet einen detaillierten Einblick in die Architektur und Implementierung der Komponenten-Bibliothek.