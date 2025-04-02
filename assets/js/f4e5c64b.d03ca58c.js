"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[214],{5174:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>l,default:()=>c,frontMatter:()=>d,metadata:()=>s,toc:()=>h});const s=JSON.parse('{"id":"guidelines/theming/index","title":"Theming-Richtlinien f\xfcr Smolitux UI","description":"Einf\xfchrung","source":"@site/docs/guidelines/theming/index.md","sourceDirName":"guidelines/theming","slug":"/guidelines/theming/","permalink":"/smolitux-ui/docs/guidelines/theming/","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/guidelines/theming/index.md","tags":[],"version":"current","frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"Testing-Strategie","permalink":"/smolitux-ui/docs/guidelines/testing-strategy"},"next":{"title":"Teststrategie f\xfcr Smolitux UI","permalink":"/smolitux-ui/docs/testing/test-strategy"}}');var r=i(4848),t=i(8453);const d={},l="Theming-Richtlinien f\xfcr Smolitux UI",a={},h=[{value:"Einf\xfchrung",id:"einf\xfchrung",level:2},{value:"Grundkonzepte",id:"grundkonzepte",level:2},{value:"Design-Tokens",id:"design-tokens",level:3},{value:"Farbsystem",id:"farbsystem",level:3},{value:"Abst\xe4nde und Gr\xf6\xdfen",id:"abst\xe4nde-und-gr\xf6\xdfen",level:3},{value:"Typografie",id:"typografie",level:3},{value:"Radien und Schatten",id:"radien-und-schatten",level:3},{value:"Implementierung des Themings",id:"implementierung-des-themings",level:2},{value:"Tailwind-Konfiguration",id:"tailwind-konfiguration",level:3},{value:"CSS-Variablen",id:"css-variablen",level:3},{value:"Verwendung in Komponenten",id:"verwendung-in-komponenten",level:3},{value:"Anpassung des Themes",id:"anpassung-des-themes",level:2},{value:"Globale Theme-Anpassung",id:"globale-theme-anpassung",level:3},{value:"Komponenten-spezifische Anpassung",id:"komponenten-spezifische-anpassung",level:3},{value:"Theme-Provider",id:"theme-provider",level:3},{value:"Dark Mode",id:"dark-mode",level:2},{value:"Responsive Design",id:"responsive-design",level:2},{value:"Barrierefreiheit und Theming",id:"barrierefreiheit-und-theming",level:2},{value:"Best Practices",id:"best-practices",level:2},{value:"Beispiele",id:"beispiele",level:2},{value:"Beispiel: Button mit verschiedenen Themes",id:"beispiel-button-mit-verschiedenen-themes",level:3},{value:"Beispiel: Responsive Card mit Theme-Anpassung",id:"beispiel-responsive-card-mit-theme-anpassung",level:3},{value:"Ressourcen",id:"ressourcen",level:2}];function o(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"theming-richtlinien-f\xfcr-smolitux-ui",children:"Theming-Richtlinien f\xfcr Smolitux UI"})}),"\n",(0,r.jsx)(n.h2,{id:"einf\xfchrung",children:"Einf\xfchrung"}),"\n",(0,r.jsx)(n.p,{children:"Das Theming-System der Smolitux UI Bibliothek erm\xf6glicht es, das Erscheinungsbild der Komponenten konsistent anzupassen. Diese Richtlinien beschreiben, wie das Theming-System funktioniert und wie es verwendet werden kann."}),"\n",(0,r.jsx)(n.h2,{id:"grundkonzepte",children:"Grundkonzepte"}),"\n",(0,r.jsx)(n.h3,{id:"design-tokens",children:"Design-Tokens"}),"\n",(0,r.jsx)(n.p,{children:"Design-Tokens sind die grundlegenden Bausteine des Theming-Systems. Sie repr\xe4sentieren visuelle Eigenschaften wie Farben, Abst\xe4nde, Typografie und mehr. Diese Tokens werden in Tailwind CSS konfiguriert und sind \xfcber Klassen in allen Komponenten verf\xfcgbar."}),"\n",(0,r.jsx)(n.h3,{id:"farbsystem",children:"Farbsystem"}),"\n",(0,r.jsx)(n.p,{children:"Das Farbsystem basiert auf semantischen Farbvariablen, die in verschiedenen Kontexten verwendet werden:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Prim\xe4rfarbe"}),": Hauptfarbe der Anwendung, verwendet f\xfcr prim\xe4re Aktionen und Hervorhebungen"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Sekund\xe4rfarbe"}),": Erg\xe4nzende Farbe, verwendet f\xfcr sekund\xe4re Aktionen und Elemente"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Erfolgsfarbe"}),": Gr\xfcnt\xf6ne f\xfcr erfolgreiche Aktionen und positive Zust\xe4nde"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Warnfarbe"}),": Gelb-/Oranget\xf6ne f\xfcr Warnungen und Aufmerksamkeit erfordernde Zust\xe4nde"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Fehlerfarbe"}),": Rott\xf6ne f\xfcr Fehler und kritische Zust\xe4nde"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Infofarbe"}),": Blaut\xf6ne f\xfcr informative Zust\xe4nde und Hinweise"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Neutrale Farben"}),": Graut\xf6ne f\xfcr Text, Hintergr\xfcnde und R\xe4nder"]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Jede semantische Farbe hat verschiedene Schattierungen (50-900), die f\xfcr verschiedene Zust\xe4nde und Kontraste verwendet werden."}),"\n",(0,r.jsx)(n.h3,{id:"abst\xe4nde-und-gr\xf6\xdfen",children:"Abst\xe4nde und Gr\xf6\xdfen"}),"\n",(0,r.jsx)(n.p,{children:"Wir verwenden ein konsistentes Abstandssystem mit folgenden Werten:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"none"}),": 0px"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"xs"}),": 0.25rem (4px)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"sm"}),": 0.5rem (8px)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"md"}),": 1rem (16px)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"lg"}),": 1.5rem (24px)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"xl"}),": 2rem (32px)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"2xl"}),": 3rem (48px)"]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Diese Abst\xe4nde werden f\xfcr Margins, Paddings, Gaps und andere Abstandseigenschaften verwendet."}),"\n",(0,r.jsx)(n.h3,{id:"typografie",children:"Typografie"}),"\n",(0,r.jsx)(n.p,{children:"Das Typografiesystem definiert Schriftfamilien, -gr\xf6\xdfen, -gewichte und Zeilenh\xf6hen:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Schriftfamilien"}),": Sans-serif (UI), Serif (Inhalte), Monospace (Code)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Schriftgr\xf6\xdfen"}),": xs, sm, md, lg, xl, 2xl, 3xl, 4xl"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Schriftgewichte"}),": light, normal, medium, semibold, bold"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Zeilenh\xf6hen"}),": tight, normal, relaxed, loose"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"radien-und-schatten",children:"Radien und Schatten"}),"\n",(0,r.jsx)(n.p,{children:"F\xfcr konsistente Formen und Tiefe:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Radien"}),": none, sm, md, lg, xl, full"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Schatten"}),": none, sm, md, lg, xl, inner"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"implementierung-des-themings",children:"Implementierung des Themings"}),"\n",(0,r.jsx)(n.h3,{id:"tailwind-konfiguration",children:"Tailwind-Konfiguration"}),"\n",(0,r.jsx)(n.p,{children:"Die Design-Tokens werden in der Tailwind-Konfiguration definiert:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"// tailwind.config.js\nmodule.exports = {\n  theme: {\n    colors: {\n      primary: {\n        50: '#f0f9ff',\n        100: '#e0f2fe',\n        // ...weitere Schattierungen\n        600: '#0284c7',\n        // ...weitere Schattierungen\n      },\n      // ...weitere Farben\n    },\n    spacing: {\n      none: '0',\n      xs: '0.25rem',\n      sm: '0.5rem',\n      md: '1rem',\n      lg: '1.5rem',\n      xl: '2rem',\n      '2xl': '3rem',\n    },\n    // ...weitere Token-Definitionen\n  },\n  // ...weitere Konfiguration\n};\n"})}),"\n",(0,r.jsx)(n.h3,{id:"css-variablen",children:"CSS-Variablen"}),"\n",(0,r.jsx)(n.p,{children:"F\xfcr dynamisches Theming verwenden wir CSS-Variablen:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-css",children:":root {\n  --color-primary-50: theme('colors.primary.50');\n  --color-primary-100: theme('colors.primary.100');\n  /* ...weitere Variablen */\n}\n\n.dark {\n  --color-primary-50: theme('colors.primary.900');\n  --color-primary-100: theme('colors.primary.800');\n  /* ...weitere Variablen f\xfcr Dark Mode */\n}\n"})}),"\n",(0,r.jsx)(n.h3,{id:"verwendung-in-komponenten",children:"Verwendung in Komponenten"}),"\n",(0,r.jsx)(n.p,{children:"Komponenten verwenden die Design-Tokens \xfcber Tailwind-Klassen:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:"<button \n  className={classNames(\n    'px-md py-sm rounded-md font-medium',\n    variant === 'primary' && 'bg-primary-600 text-white hover:bg-primary-700',\n    variant === 'secondary' && 'bg-secondary-600 text-white hover:bg-secondary-700',\n    size === 'sm' && 'text-sm',\n    size === 'lg' && 'text-lg',\n  )}\n>\n  {children}\n</button>\n"})}),"\n",(0,r.jsx)(n.h2,{id:"anpassung-des-themes",children:"Anpassung des Themes"}),"\n",(0,r.jsx)(n.h3,{id:"globale-theme-anpassung",children:"Globale Theme-Anpassung"}),"\n",(0,r.jsx)(n.p,{children:"Das Theme kann global angepasst werden, indem die Tailwind-Konfiguration \xfcberschrieben wird:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"// custom-theme.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        primary: {\n          // \xdcberschreiben der Prim\xe4rfarbe\n          600: '#0070f3',\n        },\n      },\n    },\n  },\n};\n"})}),"\n",(0,r.jsx)(n.h3,{id:"komponenten-spezifische-anpassung",children:"Komponenten-spezifische Anpassung"}),"\n",(0,r.jsx)(n.p,{children:"Komponenten k\xf6nnen \xfcber Props angepasst werden:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:'<Button \n  variant="primary"\n  size="lg"\n  className="custom-button-class"\n>\n  Angepasster Button\n</Button>\n'})}),"\n",(0,r.jsx)(n.h3,{id:"theme-provider",children:"Theme-Provider"}),"\n",(0,r.jsx)(n.p,{children:"F\xfcr dynamisches Theming verwenden wir einen Theme-Provider:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:"import { ThemeProvider } from '@smolitux/core';\n\nfunction App() {\n  return (\n    <ThemeProvider theme=\"light\" customTheme={customTheme}>\n      <YourApp />\n    </ThemeProvider>\n  );\n}\n"})}),"\n",(0,r.jsx)(n.h2,{id:"dark-mode",children:"Dark Mode"}),"\n",(0,r.jsx)(n.p,{children:"Smolitux UI unterst\xfctzt Dark Mode \xfcber Tailwind's Dark Mode-Funktionalit\xe4t:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:'<div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">\n  Inhalt mit Dark Mode-Unterst\xfctzung\n</div>\n'})}),"\n",(0,r.jsx)(n.p,{children:"Der Dark Mode kann \xfcber den Theme-Provider gesteuert werden:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:'<ThemeProvider theme="dark">\n  <YourApp />\n</ThemeProvider>\n'})}),"\n",(0,r.jsx)(n.h2,{id:"responsive-design",children:"Responsive Design"}),"\n",(0,r.jsx)(n.p,{children:"Alle Komponenten sind responsiv gestaltet und verwenden Tailwind's Breakpoint-System:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:'<div className="flex-col sm:flex-row md:flex-col lg:flex-row">\n  Responsives Layout\n</div>\n'})}),"\n",(0,r.jsx)(n.p,{children:"Die Standard-Breakpoints sind:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"sm"}),": 640px"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"md"}),": 768px"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"lg"}),": 1024px"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"xl"}),": 1280px"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"2xl"}),": 1536px"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"barrierefreiheit-und-theming",children:"Barrierefreiheit und Theming"}),"\n",(0,r.jsx)(n.p,{children:"Bei der Anpassung des Themes ist es wichtig, die Barrierefreiheit zu ber\xfccksichtigen:"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Farbkontrast"}),": Stelle sicher, dass der Kontrast zwischen Text und Hintergrund den WCAG-Richtlinien entspricht (mindestens 4,5:1 f\xfcr normalen Text, 3:1 f\xfcr gro\xdfen Text)."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Fokusindikatoren"}),": Behalte deutliche Fokusindikatoren bei, auch wenn das Theme angepasst wird."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Konsistenz"}),": Halte die visuelle Hierarchie und Bedeutung von Farben konsistent."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"best-practices",children:"Best Practices"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Verwende semantische Farben"}),": Nutze die semantischen Farbvariablen statt direkter Farbwerte."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Respektiere das Abstandssystem"}),": Verwende die definierten Abstandswerte f\xfcr konsistente Layouts."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Teste verschiedene Themes"}),": Teste deine Komponenten mit verschiedenen Themes und im Dark Mode."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Ber\xfccksichtige Barrierefreiheit"}),": Stelle sicher, dass angepasste Themes die Barrierefreiheitsrichtlinien erf\xfcllen."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"Dokumentiere Theme-Anpassungen"}),": Dokumentiere, wie deine Komponenten auf Theme-\xc4nderungen reagieren."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"beispiele",children:"Beispiele"}),"\n",(0,r.jsx)(n.h3,{id:"beispiel-button-mit-verschiedenen-themes",children:"Beispiel: Button mit verschiedenen Themes"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:'// Standard-Theme\n<Button variant="primary">Standard Button</Button>\n\n// Angepasstes Theme\n<ThemeProvider customTheme={customTheme}>\n  <Button variant="primary">Angepasster Button</Button>\n</ThemeProvider>\n\n// Dark Mode\n<ThemeProvider theme="dark">\n  <Button variant="primary">Dark Mode Button</Button>\n</ThemeProvider>\n'})}),"\n",(0,r.jsx)(n.h3,{id:"beispiel-responsive-card-mit-theme-anpassung",children:"Beispiel: Responsive Card mit Theme-Anpassung"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:'<Card \n  className="bg-white dark:bg-gray-800 p-sm md:p-md lg:p-lg"\n  titleClassName="text-lg md:text-xl text-primary-700 dark:text-primary-300"\n>\n  <h2>Responsive Card</h2>\n  <p>Inhalt mit Theme-Anpassung</p>\n</Card>\n'})}),"\n",(0,r.jsx)(n.h2,{id:"ressourcen",children:"Ressourcen"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://tailwindcss.com/docs",children:"Tailwind CSS Dokumentation"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html",children:"WCAG Farbkontrast-Richtlinien"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://material.io/design/material-theming/overview.html",children:"Material Design Theming"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties",children:"CSS Variables Guide"})}),"\n"]})]})}function c(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>d,x:()=>l});var s=i(6540);const r={},t=s.createContext(r);function d(e){const n=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:d(e.components),s.createElement(t.Provider,{value:n},e.children)}}}]);