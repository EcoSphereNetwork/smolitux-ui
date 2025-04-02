"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6115],{3681:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>o,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"testing/testing-standards","title":"Teststandards und Best Practices f\xfcr Smolitux UI","description":"Diese Dokumentation beschreibt die Teststandards und Best Practices f\xfcr die Entwicklung und das Testen von Komponenten in der Smolitux UI Bibliothek. Sie dient als Leitfaden f\xfcr alle Mitwirkenden, um eine konsistente und hochwertige Testabdeckung sicherzustellen.","source":"@site/docs/testing/testing-standards.md","sourceDirName":"testing","slug":"/testing/testing-standards","permalink":"/smolitux-ui/en/docs/testing/testing-standards","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/testing/testing-standards.md","tags":[],"version":"current","frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"Test Coverage Report","permalink":"/smolitux-ui/en/docs/testing/test-coverage-report"},"next":{"title":"Barrierefreiheitstests f\xfcr Smolitux UI Komponenten","permalink":"/smolitux-ui/en/docs/testing/implementation/accessibility-tests"}}');var r=s(4848),i=s(8453);const o={},l="Teststandards und Best Practices f\xfcr Smolitux UI",c={},d=[{value:"Inhaltsverzeichnis",id:"inhaltsverzeichnis",level:2},{value:"Allgemeine Testprinzipien",id:"allgemeine-testprinzipien",level:2},{value:"Testarten",id:"testarten",level:2},{value:"Teststruktur",id:"teststruktur",level:2},{value:"Namenskonventionen",id:"namenskonventionen",level:2},{value:"Accessibility (A11y) Tests",id:"accessibility-a11y-tests",level:2},{value:"Best Practices f\xfcr A11y Tests",id:"best-practices-f\xfcr-a11y-tests",level:3},{value:"Unit Tests",id:"unit-tests",level:2},{value:"Best Practices f\xfcr Unit Tests",id:"best-practices-f\xfcr-unit-tests",level:3},{value:"Integration Tests",id:"integration-tests",level:2},{value:"Best Practices f\xfcr Integration Tests",id:"best-practices-f\xfcr-integration-tests",level:3},{value:"Snapshot Tests",id:"snapshot-tests",level:2},{value:"Best Practices f\xfcr Snapshot Tests",id:"best-practices-f\xfcr-snapshot-tests",level:3},{value:"Visual Regression Tests",id:"visual-regression-tests",level:2},{value:"Best Practices f\xfcr Visual Regression Tests",id:"best-practices-f\xfcr-visual-regression-tests",level:3},{value:"Performance Tests",id:"performance-tests",level:2},{value:"Best Practices f\xfcr Performance Tests",id:"best-practices-f\xfcr-performance-tests",level:3},{value:"Test-Driven Development (TDD)",id:"test-driven-development-tdd",level:2},{value:"Continuous Integration",id:"continuous-integration",level:2},{value:"Testabdeckung",id:"testabdeckung",level:2},{value:"Mocking und Stubbing",id:"mocking-und-stubbing",level:2},{value:"Best Practices f\xfcr Mocking und Stubbing",id:"best-practices-f\xfcr-mocking-und-stubbing",level:3},{value:"Fehlerbehebung",id:"fehlerbehebung",level:2},{value:"Ressourcen",id:"ressourcen",level:2}];function a(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"teststandards-und-best-practices-f\xfcr-smolitux-ui",children:"Teststandards und Best Practices f\xfcr Smolitux UI"})}),"\n",(0,r.jsx)(n.p,{children:"Diese Dokumentation beschreibt die Teststandards und Best Practices f\xfcr die Entwicklung und das Testen von Komponenten in der Smolitux UI Bibliothek. Sie dient als Leitfaden f\xfcr alle Mitwirkenden, um eine konsistente und hochwertige Testabdeckung sicherzustellen."}),"\n",(0,r.jsx)(n.h2,{id:"inhaltsverzeichnis",children:"Inhaltsverzeichnis"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"#allgemeine-testprinzipien",children:"Allgemeine Testprinzipien"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"#testarten",children:"Testarten"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"#teststruktur",children:"Teststruktur"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"#namenskonventionen",children:"Namenskonventionen"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"#accessibility-a11y-tests",children:"Accessibility (A11y) Tests"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"#unit-tests",children:"Unit Tests"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"#integration-tests",children:"Integration Tests"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"#snapshot-tests",children:"Snapshot Tests"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"#visual-regression-tests",children:"Visual Regression Tests"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"#performance-tests",children:"Performance Tests"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"#test-driven-development-tdd",children:"Test-Driven Development (TDD)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"#continuous-integration",children:"Continuous Integration"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"#testabdeckung",children:"Testabdeckung"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"#mocking-und-stubbing",children:"Mocking und Stubbing"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"#fehlerbehebung",children:"Fehlerbehebung"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"allgemeine-testprinzipien",children:"Allgemeine Testprinzipien"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Testbarkeit"}),": Komponenten sollten von Anfang an mit Testbarkeit im Sinn entwickelt werden."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Isolation"}),": Tests sollten isoliert sein und keine Abh\xe4ngigkeiten zu anderen Tests haben."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Wiederholbarkeit"}),": Tests sollten deterministisch sein und bei jeder Ausf\xfchrung das gleiche Ergebnis liefern."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Lesbarkeit"}),": Tests sollten leicht zu lesen und zu verstehen sein."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Wartbarkeit"}),": Tests sollten leicht zu warten sein und sich an \xc4nderungen in der Komponente anpassen lassen."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"testarten",children:"Testarten"}),"\n",(0,r.jsx)(n.p,{children:"F\xfcr jede Komponente sollten folgende Testarten implementiert werden:"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Unit Tests"}),": Testen einzelner Komponenten in Isolation"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Integration Tests"}),": Testen der Interaktion zwischen Komponenten"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Accessibility (A11y) Tests"}),": Testen der Barrierefreiheit"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Snapshot Tests"}),": Testen der visuellen Konsistenz"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Visual Regression Tests"}),": Testen der visuellen \xc4nderungen (optional)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Performance Tests"}),": Testen der Leistung (f\xfcr komplexe Komponenten)"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"teststruktur",children:"Teststruktur"}),"\n",(0,r.jsxs)(n.p,{children:["Die Testdateien sollten in einem ",(0,r.jsx)(n.code,{children:"__tests__"}),"-Verzeichnis neben der Komponente platziert werden:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"/packages/@smolitux/[package]/src/components/[ComponentName]/\n  \u251c\u2500\u2500 __tests__/\n  \u2502   \u251c\u2500\u2500 [ComponentName].test.tsx       # Unit Tests\n  \u2502   \u251c\u2500\u2500 [ComponentName].a11y.test.tsx  # Accessibility Tests\n  \u2502   \u251c\u2500\u2500 [ComponentName].spec.tsx       # Integration Tests\n  \u2502   \u2514\u2500\u2500 [ComponentName].stories.tsx    # Storybook Stories (f\xfcr visuelle Tests)\n  \u251c\u2500\u2500 [ComponentName].tsx                # Komponente\n  \u2514\u2500\u2500 index.ts                           # Export\n"})}),"\n",(0,r.jsx)(n.h2,{id:"namenskonventionen",children:"Namenskonventionen"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Unit Tests"}),": ",(0,r.jsx)(n.code,{children:"[ComponentName].test.tsx"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Accessibility Tests"}),": ",(0,r.jsx)(n.code,{children:"[ComponentName].a11y.test.tsx"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Integration Tests"}),": ",(0,r.jsx)(n.code,{children:"[ComponentName].spec.tsx"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Storybook Stories"}),": ",(0,r.jsx)(n.code,{children:"[ComponentName].stories.tsx"})]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"accessibility-a11y-tests",children:"Accessibility (A11y) Tests"}),"\n",(0,r.jsx)(n.p,{children:"Accessibility Tests sollten mit jest-axe durchgef\xfchrt werden:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"import React from 'react';\nimport { render } from '@testing-library/react';\nimport { axe, toHaveNoViolations } from 'jest-axe';\nimport { ComponentName } from '../ComponentName';\n\nexpect.extend(toHaveNoViolations);\n\ndescribe('ComponentName - Accessibility', () => {\n  it('should not have any accessibility violations', async () => {\n    const { container } = render(<ComponentName />);\n    const results = await axe(container);\n    expect(results).toHaveNoViolations();\n  });\n\n  // Weitere spezifische Tests f\xfcr die Komponente\n});\n"})}),"\n",(0,r.jsx)(n.h3,{id:"best-practices-f\xfcr-a11y-tests",children:"Best Practices f\xfcr A11y Tests"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Teste verschiedene Zust\xe4nde"}),": Teste die Komponente in verschiedenen Zust\xe4nden (z.B. disabled, loading, error)."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Teste Keyboard-Navigation"}),": Stelle sicher, dass die Komponente mit der Tastatur bedient werden kann."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Teste mit verschiedenen Themes"}),": Teste die Komponente mit verschiedenen Themes (z.B. light, dark)."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Teste mit verschiedenen Gr\xf6\xdfen"}),": Teste die Komponente mit verschiedenen Gr\xf6\xdfen (z.B. small, medium, large)."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"unit-tests",children:"Unit Tests"}),"\n",(0,r.jsx)(n.p,{children:"Unit Tests sollten mit Jest und React Testing Library durchgef\xfchrt werden:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"import React from 'react';\nimport { render, screen, fireEvent } from '@testing-library/react';\nimport { ComponentName } from '../ComponentName';\n\ndescribe('ComponentName', () => {\n  it('should render correctly', () => {\n    render(<ComponentName />);\n    expect(screen.getByRole('button')).toBeInTheDocument();\n  });\n\n  it('should handle click events', () => {\n    const handleClick = jest.fn();\n    render(<ComponentName onClick={handleClick} />);\n    fireEvent.click(screen.getByRole('button'));\n    expect(handleClick).toHaveBeenCalledTimes(1);\n  });\n\n  // Weitere Tests f\xfcr die Komponente\n});\n"})}),"\n",(0,r.jsx)(n.h3,{id:"best-practices-f\xfcr-unit-tests",children:"Best Practices f\xfcr Unit Tests"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Teste die Funktionalit\xe4t"}),": Teste, ob die Komponente wie erwartet funktioniert."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Teste die Props"}),": Teste, ob die Komponente die Props korrekt verarbeitet."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Teste die Ereignisse"}),": Teste, ob die Komponente Ereignisse korrekt verarbeitet."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Teste die Zust\xe4nde"}),": Teste, ob die Komponente verschiedene Zust\xe4nde korrekt darstellt."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Teste die Fehlerbehandlung"}),": Teste, ob die Komponente Fehler korrekt behandelt."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"integration-tests",children:"Integration Tests"}),"\n",(0,r.jsx)(n.p,{children:"Integration Tests sollten mit Jest und React Testing Library durchgef\xfchrt werden:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"import React from 'react';\nimport { render, screen, fireEvent } from '@testing-library/react';\nimport { Form } from '../../Form/Form';\nimport { Input } from '../../Input/Input';\nimport { Button } from '../../Button/Button';\n\ndescribe('Form Integration', () => {\n  it('should submit form data correctly', () => {\n    const handleSubmit = jest.fn();\n    render(\n      <Form onSubmit={handleSubmit}>\n        <Input name=\"username\" />\n        <Button type=\"submit\">Submit</Button>\n      </Form>\n    );\n    \n    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'testuser' } });\n    fireEvent.click(screen.getByRole('button'));\n    \n    expect(handleSubmit).toHaveBeenCalledWith({ username: 'testuser' });\n  });\n\n  // Weitere Tests f\xfcr die Integration\n});\n"})}),"\n",(0,r.jsx)(n.h3,{id:"best-practices-f\xfcr-integration-tests",children:"Best Practices f\xfcr Integration Tests"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Teste die Interaktion"}),": Teste, ob die Komponenten korrekt miteinander interagieren."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Teste den Datenfluss"}),": Teste, ob Daten korrekt zwischen Komponenten flie\xdfen."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Teste komplexe Szenarien"}),": Teste komplexe Szenarien, die mehrere Komponenten umfassen."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Teste die Fehlerbehandlung"}),": Teste, ob Fehler korrekt zwischen Komponenten propagiert werden."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"snapshot-tests",children:"Snapshot Tests"}),"\n",(0,r.jsx)(n.p,{children:"Snapshot Tests sollten mit Jest durchgef\xfchrt werden:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"import React from 'react';\nimport { render } from '@testing-library/react';\nimport { ComponentName } from '../ComponentName';\n\ndescribe('ComponentName - Snapshots', () => {\n  it('should match snapshot', () => {\n    const { container } = render(<ComponentName />);\n    expect(container).toMatchSnapshot();\n  });\n\n  it('should match snapshot with props', () => {\n    const { container } = render(<ComponentName variant=\"primary\" />);\n    expect(container).toMatchSnapshot();\n  });\n\n  // Weitere Snapshot-Tests f\xfcr verschiedene Zust\xe4nde\n});\n"})}),"\n",(0,r.jsx)(n.h3,{id:"best-practices-f\xfcr-snapshot-tests",children:"Best Practices f\xfcr Snapshot Tests"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Halte Snapshots klein"}),": Teste spezifische Teile der Komponente statt der gesamten Komponente."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Aktualisiere Snapshots bewusst"}),": \xdcberpr\xfcfe \xc4nderungen an Snapshots sorgf\xe4ltig."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Teste verschiedene Zust\xe4nde"}),": Erstelle Snapshots f\xfcr verschiedene Zust\xe4nde der Komponente."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Vermeide zu viele Snapshots"}),": Zu viele Snapshots k\xf6nnen die Wartung erschweren."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"visual-regression-tests",children:"Visual Regression Tests"}),"\n",(0,r.jsx)(n.p,{children:"Visual Regression Tests sollten mit Storybook und Chromatic durchgef\xfchrt werden:"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"Erstelle Storybook Stories f\xfcr die Komponente:"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"import React from 'react';\nimport { ComponentName } from '../ComponentName';\n\nexport default {\n  title: 'Components/ComponentName',\n  component: ComponentName,\n};\n\nexport const Default = () => <ComponentName />;\nexport const Primary = () => <ComponentName variant=\"primary\" />;\nexport const Secondary = () => <ComponentName variant=\"secondary\" />;\nexport const Disabled = () => <ComponentName disabled />;\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"2",children:["\n",(0,r.jsx)(n.li,{children:"Konfiguriere Chromatic f\xfcr visuelle Regressionstests."}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"best-practices-f\xfcr-visual-regression-tests",children:"Best Practices f\xfcr Visual Regression Tests"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Teste verschiedene Viewports"}),": Teste die Komponente in verschiedenen Bildschirmgr\xf6\xdfen."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Teste verschiedene Themes"}),": Teste die Komponente mit verschiedenen Themes."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Teste verschiedene Zust\xe4nde"}),": Teste die Komponente in verschiedenen Zust\xe4nden."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Teste Animationen"}),": Teste Animationen mit verschiedenen Verz\xf6gerungen."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"performance-tests",children:"Performance Tests"}),"\n",(0,r.jsx)(n.p,{children:"Performance Tests sollten f\xfcr komplexe Komponenten durchgef\xfchrt werden:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"import React from 'react';\nimport { render } from '@testing-library/react';\nimport { ComponentName } from '../ComponentName';\n\ndescribe('ComponentName - Performance', () => {\n  it('should render efficiently with many items', () => {\n    const items = Array.from({ length: 1000 }, (_, i) => ({ id: i, name: `Item ${i}` }));\n    \n    const start = performance.now();\n    render(<ComponentName items={items} />);\n    const end = performance.now();\n    \n    expect(end - start).toBeLessThan(100); // Sollte in weniger als 100ms rendern\n  });\n\n  // Weitere Performance-Tests\n});\n"})}),"\n",(0,r.jsx)(n.h3,{id:"best-practices-f\xfcr-performance-tests",children:"Best Practices f\xfcr Performance Tests"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Teste mit realistischen Datenmengen"}),": Teste die Komponente mit realistischen Datenmengen."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Setze Schwellenwerte"}),": Definiere klare Schwellenwerte f\xfcr akzeptable Leistung."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Teste auf verschiedenen Ger\xe4ten"}),": Teste die Leistung auf verschiedenen Ger\xe4ten (wenn m\xf6glich)."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Teste Speicherverbrauch"}),": Teste den Speicherverbrauch der Komponente."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"test-driven-development-tdd",children:"Test-Driven Development (TDD)"}),"\n",(0,r.jsx)(n.p,{children:"Wir empfehlen die Verwendung von Test-Driven Development (TDD) f\xfcr die Entwicklung neuer Komponenten:"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Schreibe zuerst Tests"}),": Schreibe Tests, die das erwartete Verhalten der Komponente beschreiben."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Implementiere die Komponente"}),": Implementiere die Komponente, um die Tests zu bestehen."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Refaktoriere"}),": Verbessere den Code, w\xe4hrend die Tests weiterhin bestehen."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"continuous-integration",children:"Continuous Integration"}),"\n",(0,r.jsx)(n.p,{children:"Alle Tests werden automatisch in der CI/CD-Pipeline ausgef\xfchrt:"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Pull Requests"}),": Tests werden automatisch f\xfcr Pull Requests ausgef\xfchrt."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Main Branch"}),": Tests werden automatisch f\xfcr den Main Branch ausgef\xfchrt."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Release"}),": Tests werden automatisch vor einem Release ausgef\xfchrt."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"testabdeckung",children:"Testabdeckung"}),"\n",(0,r.jsx)(n.p,{children:"Wir streben eine hohe Testabdeckung an:"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Statements"}),": Mindestens 80% Abdeckung"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Branches"}),": Mindestens 80% Abdeckung"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Functions"}),": Mindestens 90% Abdeckung"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Lines"}),": Mindestens 80% Abdeckung"]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Die Testabdeckung wird automatisch in der CI/CD-Pipeline gemessen und berichtet."}),"\n",(0,r.jsx)(n.h2,{id:"mocking-und-stubbing",children:"Mocking und Stubbing"}),"\n",(0,r.jsx)(n.p,{children:"F\xfcr Tests, die externe Abh\xe4ngigkeiten haben, sollten Mocks und Stubs verwendet werden:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"import React from 'react';\nimport { render, screen } from '@testing-library/react';\nimport { ComponentName } from '../ComponentName';\nimport { useData } from '../../hooks/useData';\n\n// Mock des Hooks\njest.mock('../../hooks/useData', () => ({\n  useData: jest.fn(),\n}));\n\ndescribe('ComponentName', () => {\n  beforeEach(() => {\n    // Mock zur\xfccksetzen\n    jest.clearAllMocks();\n  });\n\n  it('should render data correctly', () => {\n    // Mock konfigurieren\n    (useData as jest.Mock).mockReturnValue({\n      data: [{ id: 1, name: 'Test' }],\n      loading: false,\n      error: null,\n    });\n\n    render(<ComponentName />);\n    expect(screen.getByText('Test')).toBeInTheDocument();\n  });\n\n  it('should render loading state', () => {\n    // Mock konfigurieren\n    (useData as jest.Mock).mockReturnValue({\n      data: [],\n      loading: true,\n      error: null,\n    });\n\n    render(<ComponentName />);\n    expect(screen.getByText('Loading...')).toBeInTheDocument();\n  });\n\n  // Weitere Tests mit Mocks\n});\n"})}),"\n",(0,r.jsx)(n.h3,{id:"best-practices-f\xfcr-mocking-und-stubbing",children:"Best Practices f\xfcr Mocking und Stubbing"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Mocke nur das N\xf6tigste"}),": Mocke nur die Teile, die f\xfcr den Test relevant sind."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Setze Mocks zur\xfcck"}),": Setze Mocks zwischen Tests zur\xfcck, um Seiteneffekte zu vermeiden."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Verwende realistische Daten"}),": Verwende realistische Daten f\xfcr Mocks."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Dokumentiere Mocks"}),": Dokumentiere, welche Teile gemockt wurden und warum."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"fehlerbehebung",children:"Fehlerbehebung"}),"\n",(0,r.jsx)(n.p,{children:"Wenn Tests fehlschlagen, folge diesen Schritten zur Fehlerbehebung:"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"\xdcberpr\xfcfe die Fehlermeldung"}),": Verstehe, was genau fehlgeschlagen ist."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Isoliere das Problem"}),": F\xfchre einzelne Tests aus, um das Problem zu isolieren."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"\xdcberpr\xfcfe \xc4nderungen"}),": \xdcberpr\xfcfe, welche \xc4nderungen das Problem verursacht haben k\xf6nnten."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"\xdcberpr\xfcfe Abh\xe4ngigkeiten"}),": \xdcberpr\xfcfe, ob Abh\xe4ngigkeiten aktualisiert wurden."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"\xdcberpr\xfcfe Mocks"}),": \xdcberpr\xfcfe, ob Mocks korrekt konfiguriert sind."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"\xdcberpr\xfcfe die Testumgebung"}),": \xdcberpr\xfcfe, ob die Testumgebung korrekt konfiguriert ist."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"ressourcen",children:"Ressourcen"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://jestjs.io/docs/getting-started",children:"Jest Dokumentation"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://testing-library.com/docs/react-testing-library/intro/",children:"React Testing Library Dokumentation"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/nickcolley/jest-axe",children:"jest-axe Dokumentation"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://storybook.js.org/docs/react/get-started/introduction",children:"Storybook Dokumentation"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://www.chromatic.com/docs/",children:"Chromatic Dokumentation"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://www.w3.org/TR/WCAG21/",children:"WCAG 2.1 Richtlinien"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>l});var t=s(6540);const r={},i=t.createContext(r);function o(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);