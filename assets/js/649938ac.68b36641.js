"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1722],{8453:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>c});var s=i(6540);const t={},l=s.createContext(t);function r(e){const n=s.useContext(l);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),s.createElement(l.Provider,{value:n},e.children)}},9505:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>h,frontMatter:()=>r,metadata:()=>s,toc:()=>o});const s=JSON.parse('{"id":"development/build-fix-guide","title":"Anleitung zur Behebung der Build-Probleme in Smolitux-UI","description":"Diese Anleitung beschreibt Schritt f\xfcr Schritt, wie die identifizierten Build-Probleme in der Smolitux-UI-Bibliothek behoben werden k\xf6nnen.","source":"@site/docs/development/build-fix-guide.md","sourceDirName":"development","slug":"/development/build-fix-guide","permalink":"/smolitux-ui/docs/development/build-fix-guide","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/development/build-fix-guide.md","tags":[],"version":"current","frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"Analyse der Build-Probleme in Smolitux-UI v0.2.1","permalink":"/smolitux-ui/docs/development/build-analysis"},"next":{"title":"Build-Probleme beheben","permalink":"/smolitux-ui/docs/development/build-troubleshooting"}}');var t=i(4848),l=i(8453);const r={},c="Anleitung zur Behebung der Build-Probleme in Smolitux-UI",d={},o=[{value:"Voraussetzungen",id:"voraussetzungen",level:2},{value:"Schritt 1: Repository klonen und Branch erstellen",id:"schritt-1-repository-klonen-und-branch-erstellen",level:2},{value:"Schritt 2: package.json aktualisieren",id:"schritt-2-packagejson-aktualisieren",level:2},{value:"Schritt 3: Zentrale TypeScript-Konfiguration erstellen",id:"schritt-3-zentrale-typescript-konfiguration-erstellen",level:2},{value:"Schritt 4: Paket-spezifische TypeScript-Konfigurationen aktualisieren",id:"schritt-4-paket-spezifische-typescript-konfigurationen-aktualisieren",level:2},{value:"Schritt 5: Fehlende Dateien erstellen",id:"schritt-5-fehlende-dateien-erstellen",level:2},{value:"1. Erstellen Sie die fehlenden Komponenten-Typen-Dateien:",id:"1-erstellen-sie-die-fehlenden-komponenten-typen-dateien",level:3},{value:"2. \xdcberpr\xfcfen Sie die Komponenten-Index-Datei:",id:"2-\xfcberpr\xfcfen-sie-die-komponenten-index-datei",level:3},{value:"3. Erstellen Sie die fehlende Styling-Index-Datei:",id:"3-erstellen-sie-die-fehlende-styling-index-datei",level:3},{value:"4. Erstellen Sie die fehlende Types-Index-Datei:",id:"4-erstellen-sie-die-fehlende-types-index-datei",level:3},{value:"Schritt 6: Abh\xe4ngigkeiten installieren",id:"schritt-6-abh\xe4ngigkeiten-installieren",level:2},{value:"Schritt 7: Build-Prozess testen",id:"schritt-7-build-prozess-testen",level:2},{value:"Schritt 8: \xc4nderungen committen und pushen",id:"schritt-8-\xe4nderungen-committen-und-pushen",level:2},{value:"Schritt 9: Pull Request erstellen",id:"schritt-9-pull-request-erstellen",level:2},{value:"Fehlerbehebung",id:"fehlerbehebung",level:2},{value:"Problem: Lerna-Befehle schlagen fehl",id:"problem-lerna-befehle-schlagen-fehl",level:3},{value:"Problem: TypeScript-Kompilierungsfehler",id:"problem-typescript-kompilierungsfehler",level:3},{value:"Problem: Jest-Tests schlagen fehl",id:"problem-jest-tests-schlagen-fehl",level:3},{value:"N\xe4chste Schritte",id:"n\xe4chste-schritte",level:2}];function a(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,l.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"anleitung-zur-behebung-der-build-probleme-in-smolitux-ui",children:"Anleitung zur Behebung der Build-Probleme in Smolitux-UI"})}),"\n",(0,t.jsx)(n.p,{children:"Diese Anleitung beschreibt Schritt f\xfcr Schritt, wie die identifizierten Build-Probleme in der Smolitux-UI-Bibliothek behoben werden k\xf6nnen."}),"\n",(0,t.jsx)(n.h2,{id:"voraussetzungen",children:"Voraussetzungen"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Node.js v16+ installiert"}),"\n",(0,t.jsx)(n.li,{children:"Git installiert"}),"\n",(0,t.jsx)(n.li,{children:"Zugriff auf das Smolitux-UI-Repository"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"schritt-1-repository-klonen-und-branch-erstellen",children:"Schritt 1: Repository klonen und Branch erstellen"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"git clone https://github.com/EcoSphereNetwork/smolitux-ui.git\ncd smolitux-ui\ngit checkout -b fix/build-process\n"})}),"\n",(0,t.jsx)(n.h2,{id:"schritt-2-packagejson-aktualisieren",children:"Schritt 2: package.json aktualisieren"}),"\n",(0,t.jsxs)(n.p,{children:["\xd6ffnen Sie die Datei ",(0,t.jsx)(n.code,{children:"package.json"})," im Root-Verzeichnis und aktualisieren Sie die Scripts-Sektion:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",children:'"scripts": {\n  "install-deps": "lerna exec -- npm install",\n  "clean": "lerna clean --yes",\n  "build": "lerna run build --no-bail",\n  "test": "jest",\n  "test:watch": "jest --watch",\n  "test:coverage": "jest --coverage",\n  "test:ci": "jest --ci --coverage",\n  "test:update-snapshots": "jest --updateSnapshot",\n  "test:e2e": "playwright test",\n  "lint": "lerna run lint",\n  "storybook": "storybook dev -p 6006",\n  "build-storybook": "storybook build",\n  "dev": "cd packages/playground && npm run dev"\n}\n'})}),"\n",(0,t.jsx)(n.p,{children:"Entfernen Sie problematische Abh\xe4ngigkeiten aus der devDependencies-Sektion:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npm uninstall cypress @percy/cypress @testing-library/cypress start-server-and-test\n"})}),"\n",(0,t.jsx)(n.h2,{id:"schritt-3-zentrale-typescript-konfiguration-erstellen",children:"Schritt 3: Zentrale TypeScript-Konfiguration erstellen"}),"\n",(0,t.jsxs)(n.p,{children:["Erstellen Sie eine zentrale ",(0,t.jsx)(n.code,{children:"tsconfig.json"})," im Root-Verzeichnis:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",children:'{\n  "compilerOptions": {\n    "target": "es5",\n    "lib": ["dom", "dom.iterable", "esnext"],\n    "allowJs": true,\n    "skipLibCheck": true,\n    "esModuleInterop": true,\n    "allowSyntheticDefaultImports": true,\n    "strict": true,\n    "forceConsistentCasingInFileNames": true,\n    "noFallthroughCasesInSwitch": true,\n    "module": "esnext",\n    "moduleResolution": "node",\n    "resolveJsonModule": true,\n    "isolatedModules": true,\n    "jsx": "react-jsx",\n    "declaration": true,\n    "declarationMap": true,\n    "sourceMap": true,\n    "outDir": "./dist",\n    "rootDir": "./src",\n    "baseUrl": "."\n  },\n  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx"]\n}\n'})}),"\n",(0,t.jsx)(n.h2,{id:"schritt-4-paket-spezifische-typescript-konfigurationen-aktualisieren",children:"Schritt 4: Paket-spezifische TypeScript-Konfigurationen aktualisieren"}),"\n",(0,t.jsxs)(n.p,{children:["Aktualisieren Sie die ",(0,t.jsx)(n.code,{children:"tsconfig.json"})," in jedem Paket, um auf die zentrale Konfiguration zu verweisen. Beispiel f\xfcr ",(0,t.jsx)(n.code,{children:"packages/@smolitux/utils/tsconfig.json"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",children:'{\n  "extends": "../../../../tsconfig.json",\n  "compilerOptions": {\n    "outDir": "./dist",\n    "rootDir": "./src"\n  },\n  "include": ["src/**/*"],\n  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx"]\n}\n'})}),"\n",(0,t.jsx)(n.h2,{id:"schritt-5-fehlende-dateien-erstellen",children:"Schritt 5: Fehlende Dateien erstellen"}),"\n",(0,t.jsx)(n.h3,{id:"1-erstellen-sie-die-fehlenden-komponenten-typen-dateien",children:"1. Erstellen Sie die fehlenden Komponenten-Typen-Dateien:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"mkdir -p packages/@smolitux/utils/src/types/components/{layout,form,feedback,navigation}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Erstellen Sie ",(0,t.jsx)(n.code,{children:"packages/@smolitux/utils/src/types/components/layout/index.ts"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"// Layout component types\nexport interface LayoutProps {\n  children: React.ReactNode;\n}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Erstellen Sie ",(0,t.jsx)(n.code,{children:"packages/@smolitux/utils/src/types/components/form/index.ts"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"// Form component types\nexport interface FormProps {\n  children: React.ReactNode;\n}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Erstellen Sie ",(0,t.jsx)(n.code,{children:"packages/@smolitux/utils/src/types/components/feedback/index.ts"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"// Feedback component types\nexport interface FeedbackProps {\n  children: React.ReactNode;\n}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Erstellen Sie ",(0,t.jsx)(n.code,{children:"packages/@smolitux/utils/src/types/components/navigation/index.ts"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"// Navigation component types\nexport interface NavigationProps {\n  children: React.ReactNode;\n}\n"})}),"\n",(0,t.jsx)(n.h3,{id:"2-\xfcberpr\xfcfen-sie-die-komponenten-index-datei",children:"2. \xdcberpr\xfcfen Sie die Komponenten-Index-Datei:"}),"\n",(0,t.jsxs)(n.p,{children:["Stellen Sie sicher, dass ",(0,t.jsx)(n.code,{children:"packages/@smolitux/utils/src/components/index.ts"})," korrekt ist:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"// Basic component utilities\nexport * from './primitives';\n\n// Common component patterns\nexport * from './patterns';\n"})}),"\n",(0,t.jsx)(n.h3,{id:"3-erstellen-sie-die-fehlende-styling-index-datei",children:"3. Erstellen Sie die fehlende Styling-Index-Datei:"}),"\n",(0,t.jsxs)(n.p,{children:["Erstellen Sie ",(0,t.jsx)(n.code,{children:"packages/@smolitux/utils/src/styling/index.ts"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"// Styling utilities\nexport * from './theme';\nexport * from './colors';\nexport * from './spacing';\n"})}),"\n",(0,t.jsx)(n.p,{children:"Erstellen Sie die referenzierten Dateien, falls sie nicht existieren:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"mkdir -p packages/@smolitux/utils/src/styling/{theme,colors,spacing}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Erstellen Sie ",(0,t.jsx)(n.code,{children:"packages/@smolitux/utils/src/styling/theme/index.ts"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"// Theme utilities\nexport const defaultTheme = {\n  colors: {\n    primary: '#3b82f6',\n    secondary: '#10b981',\n    danger: '#ef4444',\n    warning: '#f59e0b',\n    info: '#3b82f6',\n    success: '#10b981',\n  },\n};\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Erstellen Sie ",(0,t.jsx)(n.code,{children:"packages/@smolitux/utils/src/styling/colors/index.ts"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"// Color utilities\nexport const colors = {\n  primary: '#3b82f6',\n  secondary: '#10b981',\n  danger: '#ef4444',\n  warning: '#f59e0b',\n  info: '#3b82f6',\n  success: '#10b981',\n};\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Erstellen Sie ",(0,t.jsx)(n.code,{children:"packages/@smolitux/utils/src/styling/spacing/index.ts"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"// Spacing utilities\nexport const spacing = {\n  xs: '0.25rem',\n  sm: '0.5rem',\n  md: '1rem',\n  lg: '1.5rem',\n  xl: '2rem',\n};\n"})}),"\n",(0,t.jsx)(n.h3,{id:"4-erstellen-sie-die-fehlende-types-index-datei",children:"4. Erstellen Sie die fehlende Types-Index-Datei:"}),"\n",(0,t.jsxs)(n.p,{children:["Erstellen Sie ",(0,t.jsx)(n.code,{children:"packages/@smolitux/utils/src/types/index.ts"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"// Type utilities\nexport * from './components';\nexport * from './theme';\nexport * from './common';\n"})}),"\n",(0,t.jsx)(n.p,{children:"Erstellen Sie die referenzierten Dateien, falls sie nicht existieren:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"mkdir -p packages/@smolitux/utils/src/types/{theme,common}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Erstellen Sie ",(0,t.jsx)(n.code,{children:"packages/@smolitux/utils/src/types/theme/index.ts"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"// Theme types\nexport interface Theme {\n  colors: {\n    primary: string;\n    secondary: string;\n    danger: string;\n    warning: string;\n    info: string;\n    success: string;\n  };\n}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Erstellen Sie ",(0,t.jsx)(n.code,{children:"packages/@smolitux/utils/src/types/common/index.ts"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"// Common types\nexport type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';\nexport type Variant = 'solid' | 'outline' | 'ghost' | 'link';\nexport type ColorScheme = 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'success';\n"})}),"\n",(0,t.jsx)(n.h2,{id:"schritt-6-abh\xe4ngigkeiten-installieren",children:"Schritt 6: Abh\xe4ngigkeiten installieren"}),"\n",(0,t.jsx)(n.p,{children:"Installieren Sie die fehlende npmlog-Abh\xe4ngigkeit:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npm install npmlog --save-dev\n"})}),"\n",(0,t.jsx)(n.h2,{id:"schritt-7-build-prozess-testen",children:"Schritt 7: Build-Prozess testen"}),"\n",(0,t.jsx)(n.p,{children:"F\xfchren Sie den Build-Prozess aus:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npm run build\n"})}),"\n",(0,t.jsx)(n.h2,{id:"schritt-8-\xe4nderungen-committen-und-pushen",children:"Schritt 8: \xc4nderungen committen und pushen"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'git add .\ngit commit -m "Fix: Resolve build process issues"\ngit push origin fix/build-process\n'})}),"\n",(0,t.jsx)(n.h2,{id:"schritt-9-pull-request-erstellen",children:"Schritt 9: Pull Request erstellen"}),"\n",(0,t.jsx)(n.p,{children:"Erstellen Sie einen Pull Request auf GitHub, um Ihre \xc4nderungen in den Hauptbranch zu integrieren."}),"\n",(0,t.jsx)(n.h2,{id:"fehlerbehebung",children:"Fehlerbehebung"}),"\n",(0,t.jsx)(n.h3,{id:"problem-lerna-befehle-schlagen-fehl",children:"Problem: Lerna-Befehle schlagen fehl"}),"\n",(0,t.jsx)(n.p,{children:"Versuchen Sie, Lerna global zu installieren:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npm install -g lerna\n"})}),"\n",(0,t.jsx)(n.h3,{id:"problem-typescript-kompilierungsfehler",children:"Problem: TypeScript-Kompilierungsfehler"}),"\n",(0,t.jsx)(n.p,{children:"\xdcberpr\xfcfen Sie die TypeScript-Konfiguration und stellen Sie sicher, dass alle Pfade korrekt sind:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npx tsc --noEmit\n"})}),"\n",(0,t.jsx)(n.h3,{id:"problem-jest-tests-schlagen-fehl",children:"Problem: Jest-Tests schlagen fehl"}),"\n",(0,t.jsx)(n.p,{children:"Aktualisieren Sie die Jest-Konfiguration:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npm install --save-dev jest-environment-jsdom\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Und aktualisieren Sie ",(0,t.jsx)(n.code,{children:"jest.config.js"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-javascript",children:"module.exports = {\n  testEnvironment: 'jsdom',\n  // ...\n};\n"})}),"\n",(0,t.jsx)(n.h2,{id:"n\xe4chste-schritte",children:"N\xe4chste Schritte"}),"\n",(0,t.jsx)(n.p,{children:"Nach der Behebung der Build-Probleme sollten Sie:"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"Die Testabdeckung erh\xf6hen"}),"\n",(0,t.jsx)(n.li,{children:"Die Dokumentation aktualisieren"}),"\n",(0,t.jsx)(n.li,{children:"Eine neue Version ver\xf6ffentlichen"}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["Siehe den ",(0,t.jsx)(n.a,{href:"/smolitux-ui/docs/development/improvement-plan",children:"Verbesserungsplan"})," f\xfcr weitere Details."]})]})}function h(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}}}]);