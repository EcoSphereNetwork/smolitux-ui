"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[654],{2933:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>l,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"guidelines/testing-strategy","title":"Testing-Strategie","description":"Diese Dokumentation beschreibt die Testing-Strategie f\xfcr die Smolitux-UI-Bibliothek.","source":"@site/docs/guidelines/testing-strategy.md","sourceDirName":"guidelines","slug":"/guidelines/testing-strategy","permalink":"/smolitux-ui/en/docs/guidelines/testing-strategy","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/guidelines/testing-strategy.md","tags":[],"version":"current","frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"Komponenten-Struktur Richtlinien","permalink":"/smolitux-ui/en/docs/guidelines/component-structure"},"next":{"title":"Theming-Richtlinien f\xfcr Smolitux UI","permalink":"/smolitux-ui/en/docs/guidelines/theming/"}}');var t=i(4848),r=i(8453);const l={},o="Testing-Strategie",c={},d=[{value:"\xdcbersicht",id:"\xfcbersicht",level:2},{value:"Testarten",id:"testarten",level:2},{value:"1. Unit-Tests",id:"1-unit-tests",level:3},{value:"Ziele",id:"ziele",level:4},{value:"Werkzeuge",id:"werkzeuge",level:4},{value:"Beispiel",id:"beispiel",level:4},{value:"2. Integration-Tests",id:"2-integration-tests",level:3},{value:"Ziele",id:"ziele-1",level:4},{value:"Werkzeuge",id:"werkzeuge-1",level:4},{value:"Beispiel",id:"beispiel-1",level:4},{value:"3. Snapshot-Tests",id:"3-snapshot-tests",level:3},{value:"Ziele",id:"ziele-2",level:4},{value:"Werkzeuge",id:"werkzeuge-2",level:4},{value:"Beispiel",id:"beispiel-2",level:4},{value:"4. Visuelle Regressionstests",id:"4-visuelle-regressionstests",level:3},{value:"Ziele",id:"ziele-3",level:4},{value:"Werkzeuge",id:"werkzeuge-3",level:4},{value:"Beispiel",id:"beispiel-3",level:4},{value:"5. End-to-End-Tests",id:"5-end-to-end-tests",level:3},{value:"Ziele",id:"ziele-4",level:4},{value:"Werkzeuge",id:"werkzeuge-4",level:4},{value:"Beispiel",id:"beispiel-4",level:4},{value:"6. Barrierefreiheitstests",id:"6-barrierefreiheitstests",level:3},{value:"Ziele",id:"ziele-5",level:4},{value:"Werkzeuge",id:"werkzeuge-5",level:4},{value:"Beispiel",id:"beispiel-5",level:4},{value:"7. Performance-Tests",id:"7-performance-tests",level:3},{value:"Ziele",id:"ziele-6",level:4},{value:"Werkzeuge",id:"werkzeuge-6",level:4},{value:"Beispiel",id:"beispiel-6",level:4},{value:"Testabdeckung",id:"testabdeckung",level:2},{value:"Testorganisation",id:"testorganisation",level:2},{value:"Continuous Integration",id:"continuous-integration",level:2},{value:"Mocking",id:"mocking",level:2},{value:"Best Practices",id:"best-practices",level:2},{value:"Testprozess",id:"testprozess",level:2},{value:"Fazit",id:"fazit",level:2}];function a(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"testing-strategie",children:"Testing-Strategie"})}),"\n",(0,t.jsx)(n.p,{children:"Diese Dokumentation beschreibt die Testing-Strategie f\xfcr die Smolitux-UI-Bibliothek."}),"\n",(0,t.jsx)(n.h2,{id:"\xfcbersicht",children:"\xdcbersicht"}),"\n",(0,t.jsx)(n.p,{children:"Die Testing-Strategie f\xfcr Smolitux-UI umfasst verschiedene Arten von Tests, um sicherzustellen, dass die Komponenten korrekt funktionieren, gut aussehen und benutzerfreundlich sind."}),"\n",(0,t.jsx)(n.h2,{id:"testarten",children:"Testarten"}),"\n",(0,t.jsx)(n.h3,{id:"1-unit-tests",children:"1. Unit-Tests"}),"\n",(0,t.jsx)(n.p,{children:"Unit-Tests testen einzelne Komponenten oder Funktionen isoliert."}),"\n",(0,t.jsx)(n.h4,{id:"ziele",children:"Ziele"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Sicherstellen, dass Komponenten korrekt rendern"}),"\n",(0,t.jsx)(n.li,{children:"\xdcberpr\xfcfen, dass Komponenten auf Benutzerinteraktionen reagieren"}),"\n",(0,t.jsx)(n.li,{children:"Testen von Props und Callbacks"}),"\n",(0,t.jsx)(n.li,{children:"\xdcberpr\xfcfen von Zustands\xe4nderungen"}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"werkzeuge",children:"Werkzeuge"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Jest: Test-Runner und Assertion-Bibliothek"}),"\n",(0,t.jsx)(n.li,{children:"React Testing Library: F\xfcr komponentenbasierte Tests"}),"\n",(0,t.jsx)(n.li,{children:"jest-dom: F\xfcr DOM-spezifische Assertions"}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"beispiel",children:"Beispiel"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:"import React from 'react';\nimport { render, screen, fireEvent } from '@testing-library/react';\nimport { Button } from './Button';\n\ndescribe('Button', () => {\n  it('renders with the correct label', () => {\n    render(<Button label=\"Click me\" onClick={() => {}} />);\n    expect(screen.getByText('Click me')).toBeInTheDocument();\n  });\n\n  it('calls onClick when clicked', () => {\n    const onClick = jest.fn();\n    render(<Button label=\"Click me\" onClick={onClick} />);\n    fireEvent.click(screen.getByText('Click me'));\n    expect(onClick).toHaveBeenCalledTimes(1);\n  });\n\n  it('is disabled when disabled prop is true', () => {\n    render(<Button label=\"Click me\" onClick={() => {}} disabled />);\n    expect(screen.getByText('Click me')).toBeDisabled();\n  });\n});\n"})}),"\n",(0,t.jsx)(n.h3,{id:"2-integration-tests",children:"2. Integration-Tests"}),"\n",(0,t.jsx)(n.p,{children:"Integration-Tests testen das Zusammenspiel mehrerer Komponenten."}),"\n",(0,t.jsx)(n.h4,{id:"ziele-1",children:"Ziele"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\xdcberpr\xfcfen, dass Komponenten korrekt zusammenarbeiten"}),"\n",(0,t.jsx)(n.li,{children:"Testen von Datenfluss zwischen Komponenten"}),"\n",(0,t.jsx)(n.li,{children:"\xdcberpr\xfcfen von komplexen Interaktionen"}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"werkzeuge-1",children:"Werkzeuge"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Jest: Test-Runner und Assertion-Bibliothek"}),"\n",(0,t.jsx)(n.li,{children:"React Testing Library: F\xfcr komponentenbasierte Tests"}),"\n",(0,t.jsx)(n.li,{children:"jest-dom: F\xfcr DOM-spezifische Assertions"}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"beispiel-1",children:"Beispiel"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:"import React from 'react';\nimport { render, screen, fireEvent } from '@testing-library/react';\nimport { Form } from './Form';\n\ndescribe('Form', () => {\n  it('submits the form with the correct data', () => {\n    const onSubmit = jest.fn();\n    render(<Form onSubmit={onSubmit} />);\n    \n    fireEvent.change(screen.getByLabelText('Name'), {\n      target: { value: 'John Doe' },\n    });\n    \n    fireEvent.change(screen.getByLabelText('Email'), {\n      target: { value: 'john@example.com' },\n    });\n    \n    fireEvent.click(screen.getByText('Submit'));\n    \n    expect(onSubmit).toHaveBeenCalledWith({\n      name: 'John Doe',\n      email: 'john@example.com',\n    });\n  });\n});\n"})}),"\n",(0,t.jsx)(n.h3,{id:"3-snapshot-tests",children:"3. Snapshot-Tests"}),"\n",(0,t.jsx)(n.p,{children:"Snapshot-Tests \xfcberpr\xfcfen, ob sich das Erscheinungsbild einer Komponente unbeabsichtigt \xe4ndert."}),"\n",(0,t.jsx)(n.h4,{id:"ziele-2",children:"Ziele"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Erkennen von unbeabsichtigten \xc4nderungen am Erscheinungsbild"}),"\n",(0,t.jsx)(n.li,{children:"Dokumentieren des aktuellen Zustands einer Komponente"}),"\n",(0,t.jsx)(n.li,{children:"Schnelles Testen von UI-Komponenten"}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"werkzeuge-2",children:"Werkzeuge"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Jest: Test-Runner und Snapshot-Funktionalit\xe4t"}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"beispiel-2",children:"Beispiel"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:"import React from 'react';\nimport { render } from '@testing-library/react';\nimport { Button } from './Button';\n\ndescribe('Button', () => {\n  it('matches snapshot', () => {\n    const { container } = render(<Button label=\"Click me\" onClick={() => {}} />);\n    expect(container).toMatchSnapshot();\n  });\n\n  it('matches snapshot when disabled', () => {\n    const { container } = render(<Button label=\"Click me\" onClick={() => {}} disabled />);\n    expect(container).toMatchSnapshot();\n  });\n});\n"})}),"\n",(0,t.jsx)(n.h3,{id:"4-visuelle-regressionstests",children:"4. Visuelle Regressionstests"}),"\n",(0,t.jsx)(n.p,{children:"Visuelle Regressionstests \xfcberpr\xfcfen, ob sich das Erscheinungsbild einer Komponente visuell \xe4ndert."}),"\n",(0,t.jsx)(n.h4,{id:"ziele-3",children:"Ziele"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Erkennen von visuellen Regressionen"}),"\n",(0,t.jsx)(n.li,{children:"\xdcberpr\xfcfen von Komponenten in verschiedenen Browsern und Ger\xe4ten"}),"\n",(0,t.jsx)(n.li,{children:"Testen von Responsive Design"}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"werkzeuge-3",children:"Werkzeuge"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Storybook: F\xfcr die Darstellung von Komponenten"}),"\n",(0,t.jsx)(n.li,{children:"Chromatic: F\xfcr visuelle Regressionstests"}),"\n",(0,t.jsx)(n.li,{children:"Percy: Alternative zu Chromatic"}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"beispiel-3",children:"Beispiel"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:"// Button.stories.tsx\nimport React from 'react';\nimport { Meta, StoryObj } from '@storybook/react';\nimport { Button } from './Button';\n\nconst meta: Meta<typeof Button> = {\n  title: 'Components/Button',\n  component: Button,\n  parameters: {\n    layout: 'centered',\n  },\n  tags: ['autodocs'],\n};\n\nexport default meta;\ntype Story = StoryObj<typeof Button>;\n\nexport const Default: Story = {\n  args: {\n    label: 'Click me',\n    onClick: () => {},\n  },\n};\n\nexport const Disabled: Story = {\n  args: {\n    label: 'Click me',\n    onClick: () => {},\n    disabled: true,\n  },\n};\n"})}),"\n",(0,t.jsx)(n.h3,{id:"5-end-to-end-tests",children:"5. End-to-End-Tests"}),"\n",(0,t.jsx)(n.p,{children:"End-to-End-Tests testen die Anwendung aus der Perspektive des Benutzers."}),"\n",(0,t.jsx)(n.h4,{id:"ziele-4",children:"Ziele"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\xdcberpr\xfcfen, dass die Anwendung als Ganzes funktioniert"}),"\n",(0,t.jsx)(n.li,{children:"Testen von Benutzerfl\xfcssen"}),"\n",(0,t.jsx)(n.li,{children:"\xdcberpr\xfcfen von Integrationen mit externen Diensten"}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"werkzeuge-4",children:"Werkzeuge"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Playwright: F\xfcr End-to-End-Tests"}),"\n",(0,t.jsx)(n.li,{children:"Cypress: Alternative zu Playwright"}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"beispiel-4",children:"Beispiel"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:"// login.spec.ts\nimport { test, expect } from '@playwright/test';\n\ntest('user can log in', async ({ page }) => {\n  await page.goto('https://example.com/login');\n  \n  await page.fill('input[name=\"email\"]', 'user@example.com');\n  await page.fill('input[name=\"password\"]', 'password');\n  await page.click('button[type=\"submit\"]');\n  \n  await expect(page).toHaveURL('https://example.com/dashboard');\n  await expect(page.locator('h1')).toHaveText('Welcome, User');\n});\n"})}),"\n",(0,t.jsx)(n.h3,{id:"6-barrierefreiheitstests",children:"6. Barrierefreiheitstests"}),"\n",(0,t.jsx)(n.p,{children:"Barrierefreiheitstests \xfcberpr\xfcfen, ob die Komponenten f\xfcr alle Benutzer zug\xe4nglich sind."}),"\n",(0,t.jsx)(n.h4,{id:"ziele-5",children:"Ziele"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Sicherstellen, dass Komponenten barrierefrei sind"}),"\n",(0,t.jsx)(n.li,{children:"\xdcberpr\xfcfen von ARIA-Attributen"}),"\n",(0,t.jsx)(n.li,{children:"Testen von Keyboard-Navigation"}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"werkzeuge-5",children:"Werkzeuge"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"jest-axe: F\xfcr automatisierte Barrierefreiheitstests"}),"\n",(0,t.jsx)(n.li,{children:"Storybook a11y addon: F\xfcr Barrierefreiheitstests in Storybook"}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"beispiel-5",children:"Beispiel"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:"import React from 'react';\nimport { render } from '@testing-library/react';\nimport { axe, toHaveNoViolations } from 'jest-axe';\nimport { Button } from './Button';\n\nexpect.extend(toHaveNoViolations);\n\ndescribe('Button', () => {\n  it('has no accessibility violations', async () => {\n    const { container } = render(<Button label=\"Click me\" onClick={() => {}} />);\n    const results = await axe(container);\n    expect(results).toHaveNoViolations();\n  });\n});\n"})}),"\n",(0,t.jsx)(n.h3,{id:"7-performance-tests",children:"7. Performance-Tests"}),"\n",(0,t.jsx)(n.p,{children:"Performance-Tests \xfcberpr\xfcfen, ob die Komponenten performant sind."}),"\n",(0,t.jsx)(n.h4,{id:"ziele-6",children:"Ziele"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Messen von Renderzeiten"}),"\n",(0,t.jsx)(n.li,{children:"Identifizieren von Performance-Bottlenecks"}),"\n",(0,t.jsx)(n.li,{children:"\xdcberpr\xfcfen von Speicherverbrauch"}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"werkzeuge-6",children:"Werkzeuge"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"React Profiler: F\xfcr Profiling von React-Komponenten"}),"\n",(0,t.jsx)(n.li,{children:"Lighthouse: F\xfcr Performance-Messungen"}),"\n",(0,t.jsx)(n.li,{children:"Chrome DevTools: F\xfcr Performance-Profiling"}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"beispiel-6",children:"Beispiel"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:"import React from 'react';\nimport { Profiler } from 'react';\nimport { render } from '@testing-library/react';\nimport { Button } from './Button';\n\ndescribe('Button', () => {\n  it('renders efficiently', () => {\n    const onRender = jest.fn();\n    \n    render(\n      <Profiler id=\"Button\" onRender={onRender}>\n        <Button label=\"Click me\" onClick={() => {}} />\n      </Profiler>\n    );\n    \n    expect(onRender).toHaveBeenCalled();\n    const [, , actualDuration] = onRender.mock.calls[0];\n    expect(actualDuration).toBeLessThan(5); // ms\n  });\n});\n"})}),"\n",(0,t.jsx)(n.h2,{id:"testabdeckung",children:"Testabdeckung"}),"\n",(0,t.jsx)(n.p,{children:"Die Testabdeckung sollte mindestens 80% betragen. Die Testabdeckung wird mit Jest gemessen."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npm test -- --coverage\n"})}),"\n",(0,t.jsx)(n.h2,{id:"testorganisation",children:"Testorganisation"}),"\n",(0,t.jsx)(n.p,{children:"Tests sollten neben den Komponenten platziert werden, die sie testen."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"ComponentName/\n\u251c\u2500\u2500 ComponentName.tsx\n\u251c\u2500\u2500 ComponentName.test.tsx\n\u251c\u2500\u2500 ComponentName.stories.tsx\n\u2514\u2500\u2500 index.ts\n"})}),"\n",(0,t.jsx)(n.h2,{id:"continuous-integration",children:"Continuous Integration"}),"\n",(0,t.jsx)(n.p,{children:"Tests sollten in der CI-Pipeline ausgef\xfchrt werden, um sicherzustellen, dass keine Regressionen eingef\xfchrt werden."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"# .github/workflows/test.yml\nname: Test\n\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v2\n      - uses: actions/setup-node@v2\n        with:\n          node-version: '16'\n      - run: npm ci\n      - run: npm test\n      - run: npm run test:e2e\n      - run: npm run test:a11y\n"})}),"\n",(0,t.jsx)(n.h2,{id:"mocking",children:"Mocking"}),"\n",(0,t.jsx)(n.p,{children:"Externe Abh\xe4ngigkeiten sollten gemockt werden, um Tests deterministisch zu machen."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:"// __mocks__/axios.js\nexport default {\n  get: jest.fn(() => Promise.resolve({ data: {} })),\n  post: jest.fn(() => Promise.resolve({ data: {} })),\n};\n"})}),"\n",(0,t.jsx)(n.h2,{id:"best-practices",children:"Best Practices"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Isolation"}),": Testen Sie Komponenten isoliert."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Determinismus"}),": Stellen Sie sicher, dass Tests deterministisch sind."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Lesbarkeit"}),": Schreiben Sie lesbare Tests."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Wartbarkeit"}),": Schreiben Sie wartbare Tests."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Geschwindigkeit"}),": Stellen Sie sicher, dass Tests schnell ausgef\xfchrt werden."]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"testprozess",children:"Testprozess"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Schreiben"}),": Schreiben Sie Tests f\xfcr neue Komponenten."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Ausf\xfchren"}),": F\xfchren Sie Tests lokal aus."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"\xdcberpr\xfcfen"}),": \xdcberpr\xfcfen Sie die Testabdeckung."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Verbessern"}),": Verbessern Sie Tests, wenn n\xf6tig."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Automatisieren"}),": Automatisieren Sie Tests in der CI-Pipeline."]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"fazit",children:"Fazit"}),"\n",(0,t.jsx)(n.p,{children:"Eine umfassende Testing-Strategie ist entscheidend f\xfcr die Qualit\xe4t der Smolitux-UI-Bibliothek. Durch die Kombination verschiedener Testarten k\xf6nnen wir sicherstellen, dass die Komponenten korrekt funktionieren, gut aussehen und benutzerfreundlich sind."})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>l,x:()=>o});var s=i(6540);const t={},r=s.createContext(t);function l(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);