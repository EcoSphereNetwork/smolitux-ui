#!/bin/bash
# -------------------------------------------------------
# generate-tests.sh
# Generiert Tests für eine Komponente
#
# Verwendung: ./generate-tests.sh --package PACKAGE --component COMPONENT
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

# Hauptfunktionalität
log_info "Generiere Tests für Komponente $COMPONENT im Paket $PACKAGE..."

# Komponenten-Verzeichnis
COMPONENT_DIR="${REPO_ROOT}/packages/@smolitux/${PACKAGE}/src/components/${COMPONENT}"

# Prüfen, ob Komponente existiert
if [[ ! -d "$COMPONENT_DIR" ]]; then
  log_error "Komponente $COMPONENT existiert nicht im Paket $PACKAGE"
  exit 1
fi

# Prüfen, ob Komponenten-Datei existiert
if [[ ! -f "${COMPONENT_DIR}/${COMPONENT}.tsx" ]]; then
  log_error "Komponenten-Datei ${COMPONENT}.tsx existiert nicht"
  exit 1
fi

# Test-Verzeichnis erstellen
TEST_DIR="${COMPONENT_DIR}/__tests__"
mkdir -p "$TEST_DIR"

# Props aus Komponenten-Datei extrahieren
log_info "Extrahiere Props aus Komponenten-Datei..."
PROPS=$(grep -A 20 "export interface ${COMPONENT}Props" "${COMPONENT_DIR}/${COMPONENT}.tsx" | grep -E "^\s+[a-zA-Z0-9]+\??: " | sed -E 's/^\s+([a-zA-Z0-9]+)\??:.*/\1/g')

# Test-Datei erstellen
log_info "Erstelle Test-Datei..."
cat > "${TEST_DIR}/${COMPONENT}.test.tsx" << EOF
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

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<${COMPONENT} ref={ref}>Test</${COMPONENT}>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
EOF

# Tests für Props hinzufügen
for PROP in $PROPS; do
  if [[ "$PROP" == "variant" ]]; then
    cat >> "${TEST_DIR}/${COMPONENT}.test.tsx" << EOF

  it('applies variant class', () => {
    render(<${COMPONENT} variant="secondary">Test</${COMPONENT}>);
    expect(screen.getByTestId('${COMPONENT}')).toHaveClass('${COMPONENT.toLowerCase()}--secondary');
  });
EOF
  elif [[ "$PROP" == "size" ]]; then
    cat >> "${TEST_DIR}/${COMPONENT}.test.tsx" << EOF

  it('applies size class', () => {
    render(<${COMPONENT} size="lg">Test</${COMPONENT}>);
    expect(screen.getByTestId('${COMPONENT}')).toHaveClass('${COMPONENT.toLowerCase()}--lg');
  });
EOF
  elif [[ "$PROP" == "disabled" ]]; then
    cat >> "${TEST_DIR}/${COMPONENT}.test.tsx" << EOF

  it('applies disabled state', () => {
    render(<${COMPONENT} disabled>Test</${COMPONENT}>);
    const component = screen.getByTestId('${COMPONENT}');
    expect(component).toHaveClass('${COMPONENT.toLowerCase()}--disabled');
    expect(component).toHaveAttribute('aria-disabled', 'true');
  });
EOF
  elif [[ "$PROP" == "onClick" ]]; then
    cat >> "${TEST_DIR}/${COMPONENT}.test.tsx" << EOF

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<${COMPONENT} onClick={handleClick}>Test</${COMPONENT}>);
    
    await user.click(screen.getByTestId('${COMPONENT}'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
EOF
  fi
done

# Barrierefreiheitstest hinzufügen
cat >> "${TEST_DIR}/${COMPONENT}.test.tsx" << EOF

  it('has no accessibility violations', async () => {
    const { container } = render(<${COMPONENT}>Test</${COMPONENT}>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
EOF

# Snapshot-Test-Datei erstellen
log_info "Erstelle Snapshot-Test-Datei..."
cat > "${TEST_DIR}/${COMPONENT}.spec.tsx" << EOF
import React from 'react';
import { render } from '@testing-library/react';
import { ${COMPONENT} } from '../${COMPONENT}';

describe('${COMPONENT} Snapshots', () => {
  it('renders with different variants correctly', () => {
    const { asFragment: primary } = render(<${COMPONENT} variant="primary">Primary</${COMPONENT}>);
    expect(primary()).toMatchSnapshot('${COMPONENT} with variant primary');

    const { asFragment: secondary } = render(<${COMPONENT} variant="secondary">Secondary</${COMPONENT}>);
    expect(secondary()).toMatchSnapshot('${COMPONENT} with variant secondary');

    const { asFragment: danger } = render(<${COMPONENT} variant="danger">Danger</${COMPONENT}>);
    expect(danger()).toMatchSnapshot('${COMPONENT} with variant danger');
  });

  it('renders with different sizes correctly', () => {
    const { asFragment: small } = render(<${COMPONENT} size="sm">Small</${COMPONENT}>);
    expect(small()).toMatchSnapshot('${COMPONENT} with size sm');

    const { asFragment: medium } = render(<${COMPONENT} size="md">Medium</${COMPONENT}>);
    expect(medium()).toMatchSnapshot('${COMPONENT} with size md');

    const { asFragment: large } = render(<${COMPONENT} size="lg">Large</${COMPONENT}>);
    expect(large()).toMatchSnapshot('${COMPONENT} with size lg');
  });

  it('renders in disabled state correctly', () => {
    const { asFragment } = render(<${COMPONENT} disabled>Disabled</${COMPONENT}>);
    expect(asFragment()).toMatchSnapshot('${COMPONENT} in disabled state');
  });
});
EOF

# Barrierefreiheits-Test-Datei erstellen
log_info "Erstelle Barrierefreiheits-Test-Datei..."
cat > "${TEST_DIR}/${COMPONENT}.a11y.test.tsx" << EOF
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ${COMPONENT} } from '../${COMPONENT}';

expect.extend(toHaveNoViolations);

describe('${COMPONENT} Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<${COMPONENT}>Test</${COMPONENT}>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has correct ARIA attributes when disabled', () => {
    render(<${COMPONENT} disabled>Test</${COMPONENT}>);
    expect(screen.getByTestId('${COMPONENT}')).toHaveAttribute('aria-disabled', 'true');
  });

  it('is keyboard navigable', async () => {
    const handleClick = jest.fn();
    render(<${COMPONENT} onClick={handleClick}>Test</${COMPONENT}>);
    
    const component = screen.getByTestId('${COMPONENT}');
    component.focus();
    expect(document.activeElement).toBe(component);
    
    // Simulate keyboard interaction
    fireEvent.keyDown(component, { key: 'Enter', code: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
EOF

log_success "Tests für Komponente $COMPONENT im Paket $PACKAGE wurden erfolgreich generiert"