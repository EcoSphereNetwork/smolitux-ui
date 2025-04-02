"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7178],{8253:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>o,frontMatter:()=>l,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"accessibility/components/input","title":"Input Barrierefreiheit","description":"Implementierte Verbesserungen","source":"@site/docs/accessibility/components/input.md","sourceDirName":"accessibility/components","slug":"/accessibility/components/input","permalink":"/smolitux-ui/en/docs/accessibility/components/input","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/accessibility/components/input.md","tags":[],"version":"current","frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"FormField Barrierefreiheit","permalink":"/smolitux-ui/en/docs/accessibility/components/formfield"},"next":{"title":"LanguageSwitcher Barrierefreiheit","permalink":"/smolitux-ui/en/docs/accessibility/components/languageswitcher"}}');var t=r(4848),s=r(8453);const l={},a="Input Barrierefreiheit",c={},d=[{value:"Implementierte Verbesserungen",id:"implementierte-verbesserungen",level:2},{value:"ARIA-Attribute",id:"aria-attribute",level:3},{value:"Tastaturunterst\xfctzung",id:"tastaturunterst\xfctzung",level:3},{value:"Screenreader-Unterst\xfctzung",id:"screenreader-unterst\xfctzung",level:3},{value:"Formular-Validierung",id:"formular-validierung",level:3},{value:"Zus\xe4tzliche Funktionen",id:"zus\xe4tzliche-funktionen",level:3},{value:"Beispiel-Implementierung",id:"beispiel-implementierung",level:2},{value:"Barrierefreiheitstests",id:"barrierefreiheitstests",level:2},{value:"Bekannte Einschr\xe4nkungen",id:"bekannte-einschr\xe4nkungen",level:2}];function u(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"input-barrierefreiheit",children:"Input Barrierefreiheit"})}),"\n",(0,t.jsx)(n.h2,{id:"implementierte-verbesserungen",children:"Implementierte Verbesserungen"}),"\n",(0,t.jsx)(n.p,{children:"Die Input-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:"}),"\n",(0,t.jsx)(n.h3,{id:"aria-attribute",children:"ARIA-Attribute"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-labelledby"})," - Verkn\xfcpft das Label mit dem Input-Element"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-describedby"})," - Verkn\xfcpft Hilfetexte, Fehlermeldungen und andere Beschreibungen"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-invalid"})," - Zeigt an, ob der Input ung\xfcltig ist"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-required"})," - Zeigt an, ob der Input erforderlich ist"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-disabled"})," - Zeigt an, ob der Input deaktiviert ist"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-readonly"})," - Zeigt an, ob der Input schreibgesch\xfctzt ist"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-errormessage"})," - Verkn\xfcpft Fehlermeldungen mit dem Input"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'role="alert"'})," - Markiert Fehlermeldungen f\xfcr Screenreader"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'role="status"'})," - Markiert Statusmeldungen f\xfcr Screenreader"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'role="progressbar"'})," - Definiert den Fortschrittsbalken mit entsprechenden Attributen"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'role="button"'})," - Definiert klickbare Elemente wie Icons"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"tastaturunterst\xfctzung",children:"Tastaturunterst\xfctzung"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Vollst\xe4ndige Tastaturnavigation f\xfcr alle interaktiven Elemente"}),"\n",(0,t.jsx)(n.li,{children:"Unterst\xfctzung f\xfcr Enter/Space zum Aktivieren von Buttons"}),"\n",(0,t.jsx)(n.li,{children:"Escape-Taste zum L\xf6schen des Inputs (wenn isClearable aktiviert ist)"}),"\n",(0,t.jsx)(n.li,{children:"Fokus-Management f\xfcr alle interaktiven Elemente"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"screenreader-unterst\xfctzung",children:"Screenreader-Unterst\xfctzung"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Versteckte Labels mit ",(0,t.jsx)(n.code,{children:"sr-only"}),"-Klassen f\xfcr visuelle Layouts ohne sichtbare Labels"]}),"\n",(0,t.jsx)(n.li,{children:"Versteckte Hilfetexte f\xfcr zus\xe4tzliche Informationen"}),"\n",(0,t.jsx)(n.li,{children:"Ank\xfcndigungen f\xfcr Status\xe4nderungen"}),"\n",(0,t.jsx)(n.li,{children:"Beschreibende Texte f\xfcr Icons und Aktionen"}),"\n",(0,t.jsx)(n.li,{children:"Z\xe4hler mit zus\xe4tzlichen Informationen f\xfcr Screenreader"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"formular-validierung",children:"Formular-Validierung"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Barrierefreie Fehlermeldungen mit korrekten ARIA-Attributen"}),"\n",(0,t.jsx)(n.li,{children:"Visuelle und textuelle Darstellung von Validierungszust\xe4nden"}),"\n",(0,t.jsx)(n.li,{children:"Sofortige R\xfcckmeldung bei Validierungsfehlern"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"zus\xe4tzliche-funktionen",children:"Zus\xe4tzliche Funktionen"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Barrierefreier Passwort-Toggle mit korrekten ARIA-Attributen"}),"\n",(0,t.jsx)(n.li,{children:"Barrierefreier Clear-Button mit korrekten ARIA-Attributen"}),"\n",(0,t.jsx)(n.li,{children:"Barrierefreier Fortschrittsbalken mit korrekten ARIA-Attributen"}),"\n",(0,t.jsx)(n.li,{children:"Barrierefreier Z\xe4hler mit zus\xe4tzlichen Informationen f\xfcr Screenreader"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"beispiel-implementierung",children:"Beispiel-Implementierung"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:'<InputA11y\n  label="Email"\n  placeholder="name@example.com"\n  type="email"\n  helperText="Wir werden Ihre Email niemals teilen."\n  isRequired\n/>\n\n<InputA11y\n  label="Passwort"\n  type="password"\n  showPasswordToggle\n  showCounter\n  maxLength={20}\n/>\n\n<InputA11y\n  label="Suche"\n  type="search"\n  isClearable\n  leftIcon={<SearchIcon />}\n/>\n'})}),"\n",(0,t.jsx)(n.h2,{id:"barrierefreiheitstests",children:"Barrierefreiheitstests"}),"\n",(0,t.jsx)(n.p,{children:"Die Input-Komponente wurde mit folgenden Tests auf Barrierefreiheit gepr\xfcft:"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Automatisierte Tests"})," mit jest-axe zur \xdcberpr\xfcfung der ARIA-Attribute"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Tastaturnavigation"})," zur Sicherstellung der vollst\xe4ndigen Bedienbarkeit ohne Maus"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Screenreader-Tests"})," zur \xdcberpr\xfcfung der korrekten Ank\xfcndigungen"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Fokus-Management-Tests"})," zur Sicherstellung der korrekten Fokusreihenfolge"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"bekannte-einschr\xe4nkungen",children:"Bekannte Einschr\xe4nkungen"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Bei komplexen Inputs mit vielen Zusatzfunktionen kann die Tastaturnavigation umst\xe4ndlich werden"}),"\n",(0,t.jsx)(n.li,{children:"Die Formatierungsfunktionen m\xfcssen vom Entwickler implementiert werden, um barrierefrei zu sein"}),"\n",(0,t.jsx)(n.li,{children:"Datalist-Unterst\xfctzung variiert je nach Browser und Screenreader"}),"\n"]})]})}function o(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(u,{...e})}):u(e)}},8453:(e,n,r)=>{r.d(n,{R:()=>l,x:()=>a});var i=r(6540);const t={},s=i.createContext(t);function l(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);