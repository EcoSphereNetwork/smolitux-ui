"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[68],{8453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>a});var r=t(6540);const s={},o=r.createContext(s);function i(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),r.createElement(o.Provider,{value:n},e.children)}},8593:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>i,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"testing/testplan/Unit-Tests","title":"Unit-Tests f\xfcr smolitux UI Komponenten","description":"Dieses Dokument beschreibt die Strategie und Implementierung von Unit-Tests f\xfcr die Komponenten der smolitux UI-Bibliothek.","source":"@site/docs/testing/testplan/03-Unit-Tests.md","sourceDirName":"testing/testplan","slug":"/testing/testplan/Unit-Tests","permalink":"/smolitux-ui/docs/testing/testplan/Unit-Tests","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/testing/testplan/03-Unit-Tests.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"Testinfrastruktur f\xfcr smolitux UI","permalink":"/smolitux-ui/docs/testing/testplan/Testinfrastruktur"},"next":{"title":"Integrationstests f\xfcr komplexe Komponenten","permalink":"/smolitux-ui/docs/testing/testplan/Integrationstests"}}');var s=t(4848),o=t(8453);const i={},a="Unit-Tests f\xfcr smolitux UI Komponenten",l={},c=[{value:"1. Allgemeine Teststrategie",id:"1-allgemeine-teststrategie",level:2},{value:"2. Best Practices f\xfcr Unit-Tests",id:"2-best-practices-f\xfcr-unit-tests",level:2},{value:"3. Beispiele f\xfcr Unit-Tests",id:"3-beispiele-f\xfcr-unit-tests",level:2},{value:"3.1 Beispiel: Button-Komponente",id:"31-beispiel-button-komponente",level:3},{value:"3.2 Beispiel: Input-Komponente",id:"32-beispiel-input-komponente",level:3},{value:"3.3 Beispiel: Card-Komponente",id:"33-beispiel-card-komponente",level:3},{value:"4. Komponenten mit Context testen",id:"4-komponenten-mit-context-testen",level:2},{value:"5. Testen von seiteneffektbasierten Komponenten (useEffect)",id:"5-testen-von-seiteneffektbasierten-komponenten-useeffect",level:2},{value:"6. Testkomponenten f\xfcr komplexe Szenarien erstellen",id:"6-testkomponenten-f\xfcr-komplexe-szenarien-erstellen",level:2},{value:"7. Test-Mocks f\xfcr externe Abh\xe4ngigkeiten",id:"7-test-mocks-f\xfcr-externe-abh\xe4ngigkeiten",level:2},{value:"8. Test-Helpers f\xfcr wiederkehrende Patterns",id:"8-test-helpers-f\xfcr-wiederkehrende-patterns",level:2}];function d(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"unit-tests-f\xfcr-smolitux-ui-komponenten",children:"Unit-Tests f\xfcr smolitux UI Komponenten"})}),"\n",(0,s.jsx)(n.p,{children:"Dieses Dokument beschreibt die Strategie und Implementierung von Unit-Tests f\xfcr die Komponenten der smolitux UI-Bibliothek."}),"\n",(0,s.jsx)(n.h2,{id:"1-allgemeine-teststrategie",children:"1. Allgemeine Teststrategie"}),"\n",(0,s.jsx)(n.p,{children:"F\xfcr jede Komponente sollten folgende Aspekte getestet werden:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Rendering"}),": Die Komponente wird korrekt gerendert"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Props"}),": Verhaltens\xe4nderungen basierend auf verschiedenen Props"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Interaktionen"}),": Benutzerinteraktionen wie Klicks, Hover, etc."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Zust\xe4nde"}),": Verschiedene Zust\xe4nde wie Loading, Error, Disabled"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Accessibility"}),": Tests f\xfcr grundlegende A11y-Eigenschaften"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"2-best-practices-f\xfcr-unit-tests",children:"2. Best Practices f\xfcr Unit-Tests"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Isolation"}),": Jeder Test sollte isoliert von anderen Tests ausgef\xfchrt werden k\xf6nnen"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Unabh\xe4ngigkeit"}),": Tests sollten nicht von der Reihenfolge der Ausf\xfchrung abh\xe4ngen"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Lesbarkeit"}),": Tests sollten klar und verst\xe4ndlich sein"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Wartbarkeit"}),": Tests sollten einfach zu warten sein"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"3-beispiele-f\xfcr-unit-tests",children:"3. Beispiele f\xfcr Unit-Tests"}),"\n",(0,s.jsx)(n.h3,{id:"31-beispiel-button-komponente",children:"3.1 Beispiel: Button-Komponente"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"// Button.test.tsx\nimport React from 'react';\nimport { render, screen, fireEvent } from '@testing-library/react';\nimport { Button } from '../Button';\n\ndescribe('Button', () => {\n  test('renders correctly with default props', () => {\n    render(<Button>Click me</Button>);\n    const button = screen.getByRole('button', { name: /Click me/i });\n    expect(button).toBeInTheDocument();\n    expect(button).toHaveClass('bg-primary-600'); // Prim\xe4r-Variante als Default\n  });\n\n  test('applies different variant styles correctly', () => {\n    const { rerender } = render(<Button variant=\"secondary\">Secondary</Button>);\n    expect(screen.getByRole('button')).toHaveClass('bg-secondary-600');\n\n    rerender(<Button variant=\"outline\">Outline</Button>);\n    expect(screen.getByRole('button')).toHaveClass('border-gray-300');\n\n    rerender(<Button variant=\"ghost\">Ghost</Button>);\n    expect(screen.getByRole('button')).toHaveClass('text-gray-700');\n  });\n\n  test('renders with different sizes', () => {\n    const { rerender } = render(<Button size=\"sm\">Small</Button>);\n    expect(screen.getByRole('button')).toHaveClass('px-3 py-1.5 text-sm');\n\n    rerender(<Button size=\"lg\">Large</Button>);\n    expect(screen.getByRole('button')).toHaveClass('px-6 py-3 text-lg');\n  });\n\n  test('calls onClick handler when clicked', () => {\n    const handleClick = jest.fn();\n    render(<Button onClick={handleClick}>Click me</Button>);\n    fireEvent.click(screen.getByRole('button'));\n    expect(handleClick).toHaveBeenCalledTimes(1);\n  });\n\n  test('renders loading state correctly', () => {\n    render(<Button loading>Loading</Button>);\n    expect(screen.getByText('Loading...')).toBeInTheDocument();\n    expect(screen.getByRole('button')).toBeDisabled();\n  });\n\n  test('renders icons correctly', () => {\n    render(\n      <Button leftIcon={<span data-testid=\"left-icon\" />}>\n        With Icon\n      </Button>\n    );\n    expect(screen.getByTestId('left-icon')).toBeInTheDocument();\n  });\n\n  test('applies fullWidth class when fullWidth prop is true', () => {\n    render(<Button fullWidth>Full Width</Button>);\n    expect(screen.getByRole('button')).toHaveClass('w-full');\n  });\n\n  test('is disabled when disabled prop is true', () => {\n    render(<Button disabled>Disabled</Button>);\n    expect(screen.getByRole('button')).toBeDisabled();\n    expect(screen.getByRole('button')).toHaveClass('opacity-50');\n  });\n\n  test('passes additional HTML attributes to button element', () => {\n    render(<Button data-testid=\"custom-button\">Custom Attr</Button>);\n    expect(screen.getByTestId('custom-button')).toBeInTheDocument();\n  });\n});\n"})}),"\n",(0,s.jsx)(n.h3,{id:"32-beispiel-input-komponente",children:"3.2 Beispiel: Input-Komponente"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"// Input.test.tsx\nimport React from 'react';\nimport { render, screen, fireEvent } from '@testing-library/react';\nimport userEvent from '@testing-library/user-event';\nimport { Input } from '../Input';\n\ndescribe('Input', () => {\n  test('renders with default props', () => {\n    render(<Input />);\n    expect(screen.getByRole('textbox')).toBeInTheDocument();\n  });\n\n  test('renders with correct value and handles change', async () => {\n    const handleChange = jest.fn();\n    render(<Input value=\"\" onChange={handleChange} />);\n    \n    const input = screen.getByRole('textbox');\n    await userEvent.type(input, 'Hello');\n    \n    expect(handleChange).toHaveBeenCalledTimes(5); // Einmal pro Zeichen\n  });\n\n  test('shows error message when provided', () => {\n    render(<Input error=\"Required field\" />);\n    expect(screen.getByText('Required field')).toBeInTheDocument();\n    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');\n  });\n\n  test('shows helper text when provided', () => {\n    render(<Input helperText=\"Enter your name\" />);\n    expect(screen.getByText('Enter your name')).toBeInTheDocument();\n  });\n\n  test('applies disabled styles when disabled', () => {\n    render(<Input disabled />);\n    expect(screen.getByRole('textbox')).toBeDisabled();\n    expect(screen.getByRole('textbox')).toHaveClass('bg-gray-100');\n  });\n\n  test('displays left and right icons correctly', () => {\n    const leftIcon = <span data-testid=\"left-icon\">L</span>;\n    const rightIcon = <span data-testid=\"right-icon\">R</span>;\n    \n    render(<Input leftIcon={leftIcon} rightIcon={rightIcon} />);\n    \n    expect(screen.getByTestId('left-icon')).toBeInTheDocument();\n    expect(screen.getByTestId('right-icon')).toBeInTheDocument();\n  });\n\n  test('handles focus and blur events', () => {\n    const handleFocus = jest.fn();\n    const handleBlur = jest.fn();\n    \n    render(<Input onFocus={handleFocus} onBlur={handleBlur} />);\n    \n    const input = screen.getByRole('textbox');\n    fireEvent.focus(input);\n    expect(handleFocus).toHaveBeenCalledTimes(1);\n    \n    fireEvent.blur(input);\n    expect(handleBlur).toHaveBeenCalledTimes(1);\n  });\n\n  test('applies custom className correctly', () => {\n    render(<Input className=\"custom-class\" />);\n    expect(screen.getByRole('textbox')).toHaveClass('custom-class');\n  });\n});\n"})}),"\n",(0,s.jsx)(n.h3,{id:"33-beispiel-card-komponente",children:"3.3 Beispiel: Card-Komponente"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"// Card.test.tsx\nimport React from 'react';\nimport { render, screen } from '@testing-library/react';\nimport { Card } from '../Card';\n\ndescribe('Card', () => {\n  test('renders children correctly', () => {\n    render(\n      <Card>\n        <div data-testid=\"card-content\">Card Content</div>\n      </Card>\n    );\n    expect(screen.getByTestId('card-content')).toBeInTheDocument();\n  });\n\n  test('renders title when provided', () => {\n    render(<Card title=\"Card Title\">Content</Card>);\n    expect(screen.getByText('Card Title')).toBeInTheDocument();\n  });\n\n  test('renders footer when provided', () => {\n    const footer = <div data-testid=\"card-footer\">Footer</div>;\n    render(<Card footer={footer}>Content</Card>);\n    expect(screen.getByTestId('card-footer')).toBeInTheDocument();\n  });\n\n  test('applies different elevations correctly', () => {\n    const { rerender } = render(<Card elevation=\"low\">Content</Card>);\n    expect(screen.getByText('Content').closest('.card')).toHaveClass('shadow-sm');\n\n    rerender(<Card elevation=\"high\">Content</Card>);\n    expect(screen.getByText('Content').closest('.card')).toHaveClass('shadow-lg');\n  });\n\n  test('applies custom className correctly', () => {\n    render(<Card className=\"custom-card\">Content</Card>);\n    expect(screen.getByText('Content').closest('.card')).toHaveClass('custom-card');\n  });\n\n  test('applies border when bordered prop is true', () => {\n    render(<Card bordered>Content</Card>);\n    expect(screen.getByText('Content').closest('.card')).toHaveClass('border');\n  });\n});\n"})}),"\n",(0,s.jsx)(n.h2,{id:"4-komponenten-mit-context-testen",children:"4. Komponenten mit Context testen"}),"\n",(0,s.jsx)(n.p,{children:"F\xfcr Komponenten, die Context verwenden (z.B. Theme-Context):"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"// ThemeAwareComponent.test.tsx\nimport React from 'react';\nimport { render, screen } from '@testing-library/react';\nimport { ThemeProvider } from '@smolitux/theme';\nimport { ThemeAwareComponent } from '../ThemeAwareComponent';\n\ndescribe('ThemeAwareComponent', () => {\n  test('renders with light theme by default', () => {\n    render(\n      <ThemeProvider>\n        <ThemeAwareComponent />\n      </ThemeProvider>\n    );\n    expect(screen.getByTestId('theme-component')).toHaveClass('bg-white');\n  });\n\n  test('renders with dark theme when provided', () => {\n    render(\n      <ThemeProvider initialTheme=\"dark\">\n        <ThemeAwareComponent />\n      </ThemeProvider>\n    );\n    expect(screen.getByTestId('theme-component')).toHaveClass('bg-gray-800');\n  });\n});\n"})}),"\n",(0,s.jsx)(n.h2,{id:"5-testen-von-seiteneffektbasierten-komponenten-useeffect",children:"5. Testen von seiteneffektbasierten Komponenten (useEffect)"}),"\n",(0,s.jsx)(n.p,{children:"F\xfcr Komponenten, die useEffect f\xfcr Seiteneffekte verwenden:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"// DataFetcher.test.tsx\nimport React from 'react';\nimport { render, screen, waitFor } from '@testing-library/react';\nimport { DataFetcher } from '../DataFetcher';\n\n// Mock der fetch API\nglobal.fetch = jest.fn(() =>\n  Promise.resolve({\n    ok: true,\n    json: () => Promise.resolve({ data: 'test data' }),\n  })\n) as jest.Mock;\n\ndescribe('DataFetcher', () => {\n  test('shows loading state initially', () => {\n    render(<DataFetcher url=\"https://example.com/data\" />);\n    expect(screen.getByText('Loading...')).toBeInTheDocument();\n  });\n\n  test('shows data after successful fetch', async () => {\n    render(<DataFetcher url=\"https://example.com/data\" />);\n    \n    await waitFor(() => {\n      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();\n      expect(screen.getByText('test data')).toBeInTheDocument();\n    });\n    \n    expect(global.fetch).toHaveBeenCalledWith('https://example.com/data');\n  });\n\n  test('shows error message on fetch failure', async () => {\n    // \xdcberschreiben des Mocks f\xfcr diesen Test\n    global.fetch = jest.fn(() =>\n      Promise.reject(new Error('Failed to fetch'))\n    ) as jest.Mock;\n    \n    render(<DataFetcher url=\"https://example.com/data\" />);\n    \n    await waitFor(() => {\n      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();\n      expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();\n    });\n  });\n});\n"})}),"\n",(0,s.jsx)(n.h2,{id:"6-testkomponenten-f\xfcr-komplexe-szenarien-erstellen",children:"6. Testkomponenten f\xfcr komplexe Szenarien erstellen"}),"\n",(0,s.jsx)(n.p,{children:"F\xfcr komplexe Komponenten kann es hilfreich sein, eine Testkomponente zu erstellen:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"// ComplexComponent.test.tsx\nimport React, { useState } from 'react';\nimport { render, screen, fireEvent } from '@testing-library/react';\nimport { ComplexComponent } from '../ComplexComponent';\n\n// Testkomponente, die den internen Zustand verwaltet\nconst TestWrapper = () => {\n  const [value, setValue] = useState('');\n  return (\n    <ComplexComponent\n      value={value}\n      onChange={(newValue) => setValue(newValue)}\n      data-testid=\"complex-component\"\n    />\n  );\n};\n\ndescribe('ComplexComponent', () => {\n  test('renders and handles state changes correctly', () => {\n    render(<TestWrapper />);\n    \n    const component = screen.getByTestId('complex-component');\n    expect(component).toBeInTheDocument();\n    \n    // Weiter mit Tests f\xfcr interne Zustands\xe4nderungen...\n  });\n});\n"})}),"\n",(0,s.jsx)(n.h2,{id:"7-test-mocks-f\xfcr-externe-abh\xe4ngigkeiten",children:"7. Test-Mocks f\xfcr externe Abh\xe4ngigkeiten"}),"\n",(0,s.jsx)(n.p,{children:"F\xfcr Komponenten, die externe Dienste oder Bibliotheken verwenden:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"// Mocks erstellen\njest.mock('@smolitux/utils', () => ({\n  formatDate: jest.fn((date) => '01/01/2023'),\n  validateEmail: jest.fn((email) => email.includes('@')),\n}));\n\n// Im Test verwenden\nimport { formatDate, validateEmail } from '@smolitux/utils';\n\ndescribe('FormattedDate', () => {\n  test('uses formatDate utility correctly', () => {\n    render(<FormattedDate date={new Date()} />);\n    expect(formatDate).toHaveBeenCalled();\n    expect(screen.getByText('01/01/2023')).toBeInTheDocument();\n  });\n});\n"})}),"\n",(0,s.jsx)(n.h2,{id:"8-test-helpers-f\xfcr-wiederkehrende-patterns",children:"8. Test-Helpers f\xfcr wiederkehrende Patterns"}),"\n",(0,s.jsx)(n.p,{children:"F\xfcr h\xe4ufig verwendete Test-Patterns:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"// test-utils.ts\nimport { render, RenderOptions } from '@testing-library/react';\nimport { ThemeProvider } from '@smolitux/theme';\n\n// Custom render mit ThemeProvider\nconst customRender = (\n  ui: React.ReactElement,\n  options?: Omit<RenderOptions, 'wrapper'> & { theme?: 'light' | 'dark' }\n) => {\n  const { theme = 'light', ...rest } = options || {};\n  return render(ui, {\n    wrapper: ({ children }) => (\n      <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>\n    ),\n    ...rest,\n  });\n};\n\n// Im Test verwenden\nimport { customRender } from '../../test-utils';\n\ntest('renders with theme', () => {\n  customRender(<ThemeAwareComponent />, { theme: 'dark' });\n  // Tests...\n});\n"})})]})}function p(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}}}]);