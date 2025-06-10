#!/bin/bash
# -------------------------------------------------------
# generate-component.sh
# Generiert eine neue Komponente basierend auf Templates
#
# Verwendung: ./generate-component.sh --package PACKAGE --component COMPONENT [--type TYPE]
# -------------------------------------------------------

# Fehler bei nicht gesetzten Variablen anzeigen
set -u

# Bei Fehlern abbrechen
set -e

# Pfad zum Skriptverzeichnis
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

# Hilfsfunktionen laden
source "${SCRIPT_DIR}/../utils/common-functions.sh" 2>/dev/null || source "${REPO_ROOT}/scripts/utils/common-functions.sh"

# Argumente parsen
PACKAGE=""
COMPONENT=""
TYPE="basic" # basic, form, overlay, data, navigation

while [[ $# -gt 0 ]]; do
  case "$1" in
    --package)
      PACKAGE="$2"
      shift 2
      ;;
    --component)
      COMPONENT="$2"
      shift 2
      ;;
    --type)
      TYPE="$2"
      shift 2
      ;;
    *)
      log_error "Unbekanntes Argument: $1"
      exit 1
      ;;
  esac
done

# Argumente validieren
if [[ -z "$PACKAGE" ]]; then
  log_error "Fehler: --package muss angegeben werden"
  exit 1
fi

if [[ -z "$COMPONENT" ]]; then
  log_error "Fehler: --component muss angegeben werden"
  exit 1
fi

# Prüfen, ob Paket existiert
PACKAGE_DIR="${REPO_ROOT}/packages/@smolitux/${PACKAGE}"
if [[ ! -d "$PACKAGE_DIR" ]]; then
  log_error "Paket $PACKAGE existiert nicht"
  exit 1
fi

# Komponenten-Verzeichnis
COMPONENT_DIR="${PACKAGE_DIR}/src/components/${COMPONENT}"

# Prüfen, ob Komponente bereits existiert
if [[ -d "$COMPONENT_DIR" ]]; then
  log_error "Komponente $COMPONENT existiert bereits im Paket $PACKAGE"
  exit 1
fi

# Verzeichnis erstellen
log_info "Erstelle Verzeichnis für Komponente $COMPONENT im Paket $PACKAGE..."
mkdir -p "$COMPONENT_DIR"

# Komponenten-Datei erstellen
log_info "Erstelle Komponenten-Datei..."
cat > "${COMPONENT_DIR}/${COMPONENT}.tsx" << EOF
import React, { forwardRef } from 'react';
import { clsx } from '@smolitux/utils';
import './styles.css';

export interface ${COMPONENT}Props extends React.HTMLAttributes<HTMLDivElement> {
  /** Beschreibung der Prop */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Beschreibung der Prop */
  size?: 'sm' | 'md' | 'lg';
  /** Beschreibung der Prop */
  disabled?: boolean;
}

/**
 * ${COMPONENT} Komponente
 * 
 * @example
 * ```tsx
 * <${COMPONENT} variant="primary" size="md">Inhalt</${COMPONENT}>
 * ```
 */
export const ${COMPONENT} = forwardRef<HTMLDivElement, ${COMPONENT}Props>(
  ({ variant = 'primary', size = 'md', disabled = false, className, children, ...rest }, ref) => {
    const classes = clsx(
      '${COMPONENT.toLowerCase()}',
      \`${COMPONENT.toLowerCase()}--\${variant}\`,
      \`${COMPONENT.toLowerCase()}--\${size}\`,
      disabled && '${COMPONENT.toLowerCase()}--disabled',
      className
    );

    return (
      <div
        ref={ref}
        className={classes}
        aria-disabled={disabled}
        data-testid="${COMPONENT}"
        {...rest}
      >
        {children}
      </div>
    );
  }
);

${COMPONENT}.displayName = '${COMPONENT}';
export default ${COMPONENT};
EOF

# Index-Datei erstellen
log_info "Erstelle Index-Datei..."
cat > "${COMPONENT_DIR}/index.ts" << EOF
export { default, type ${COMPONENT}Props } from './${COMPONENT}';
EOF

# CSS-Datei erstellen
log_info "Erstelle CSS-Datei..."
cat > "${COMPONENT_DIR}/styles.css" << EOF
.${COMPONENT.toLowerCase()} {
  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  transition: all 0.2s ease;
}

/* Variants */
.${COMPONENT.toLowerCase()}--primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.${COMPONENT.toLowerCase()}--secondary {
  background-color: var(--color-secondary);
  color: var(--color-white);
}

.${COMPONENT.toLowerCase()}--danger {
  background-color: var(--color-danger);
  color: var(--color-white);
}

/* Sizes */
.${COMPONENT.toLowerCase()}--sm {
  font-size: var(--font-size-sm);
  padding: var(--spacing-1) var(--spacing-2);
}

.${COMPONENT.toLowerCase()}--md {
  font-size: var(--font-size-md);
  padding: var(--spacing-2) var(--spacing-4);
}

.${COMPONENT.toLowerCase()}--lg {
  font-size: var(--font-size-lg);
  padding: var(--spacing-3) var(--spacing-6);
}

/* States */
.${COMPONENT.toLowerCase()}--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
EOF

# Test-Datei erstellen
log_info "Erstelle Test-Datei..."
mkdir -p "${COMPONENT_DIR}/__tests__"
cat > "${COMPONENT_DIR}/__tests__/${COMPONENT}.test.tsx" << EOF
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ${COMPONENT} } from '../${COMPONENT}';

expect.extend(toHaveNoViolations);

describe('${COMPONENT}', () => {
  it('renders without crashing', () => {
    render(<${COMPONENT}>Test</${COMPONENT}>);
    expect(screen.getByTestId('${COMPONENT}')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<${COMPONENT} className="custom">Test</${COMPONENT}>);
    expect(screen.getByTestId('${COMPONENT}')).toHaveClass('custom');
  });

  it('applies variant class', () => {
    render(<${COMPONENT} variant="secondary">Test</${COMPONENT}>);
    expect(screen.getByTestId('${COMPONENT}')).toHaveClass('${COMPONENT.toLowerCase()}--secondary');
  });

  it('applies size class', () => {
    render(<${COMPONENT} size="lg">Test</${COMPONENT}>);
    expect(screen.getByTestId('${COMPONENT}')).toHaveClass('${COMPONENT.toLowerCase()}--lg');
  });

  it('applies disabled state', () => {
    render(<${COMPONENT} disabled>Test</${COMPONENT}>);
    const component = screen.getByTestId('${COMPONENT}');
    expect(component).toHaveClass('${COMPONENT.toLowerCase()}--disabled');
    expect(component).toHaveAttribute('aria-disabled', 'true');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<${COMPONENT} ref={ref}>Test</${COMPONENT}>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<${COMPONENT}>Test</${COMPONENT}>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
EOF

# Barrierefreiheits-Datei erstellen
log_info "Erstelle Barrierefreiheits-Datei..."
cat > "${COMPONENT_DIR}/${COMPONENT}.a11y.tsx" << EOF
import React from 'react';
import { ${COMPONENT}Props } from './${COMPONENT}';

/**
 * Barrierefreiheits-Erweiterung für die ${COMPONENT}-Komponente
 */
export const ${COMPONENT}A11y: React.FC<${COMPONENT}Props & {
  /** ARIA-Label für die Komponente */
  'aria-label'?: string;
  /** ID des Elements, das die Komponente beschreibt */
  'aria-describedby'?: string;
  /** ID des Elements, das die Komponente labelt */
  'aria-labelledby'?: string;
}> = (props) => {
  // Diese Komponente wird nicht direkt gerendert,
  // sondern dient nur zur Typdefinition und Dokumentation
  return null;
};

${COMPONENT}A11y.displayName = '${COMPONENT}A11y';
export default ${COMPONENT}A11y;
EOF

# Storybook-Datei erstellen
log_info "Erstelle Storybook-Datei..."
cat > "${COMPONENT_DIR}/${COMPONENT}.stories.tsx" << EOF
import type { Meta, StoryObj } from '@storybook/react';
import { ${COMPONENT} } from './${COMPONENT}';

const meta: Meta<typeof ${COMPONENT}> = {
  title: 'Components/${PACKAGE}/${COMPONENT}',
  component: ${COMPONENT},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '${COMPONENT} Komponente für die Smolitux UI Bibliothek.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default ${COMPONENT}',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <${COMPONENT} variant="primary">Primary</${COMPONENT}>
      <${COMPONENT} variant="secondary">Secondary</${COMPONENT}>
      <${COMPONENT} variant="danger">Danger</${COMPONENT}>
      <${COMPONENT} disabled>Disabled</${COMPONENT}>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <${COMPONENT} size="sm">Small</${COMPONENT}>
      <${COMPONENT} size="md">Medium</${COMPONENT}>
      <${COMPONENT} size="lg">Large</${COMPONENT}>
    </div>
  ),
};
EOF

# Export in index.ts hinzufügen
log_info "Füge Export in index.ts hinzu..."
INDEX_FILE="${PACKAGE_DIR}/src/index.ts"

if [[ -f "$INDEX_FILE" ]]; then
  if ! grep -q "${COMPONENT}" "$INDEX_FILE"; then
    echo "export { default as ${COMPONENT}, type ${COMPONENT}Props } from './components/${COMPONENT}';" >> "$INDEX_FILE"
    log_success "Export hinzugefügt"
  else
    log_warning "Export existiert bereits"
  fi
else
  log_error "index.ts existiert nicht im Paket $PACKAGE"
fi

log_success "Komponente $COMPONENT wurde erfolgreich im Paket $PACKAGE erstellt"