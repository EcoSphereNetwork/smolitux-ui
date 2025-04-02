"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6433],{8453:(e,n,i)=>{i.d(n,{R:()=>l,x:()=>a});var r=i(6540);const t={},s=r.createContext(t);function l(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),r.createElement(s.Provider,{value:n},e.children)}},9682:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>u,frontMatter:()=>l,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"accessibility/components/flex","title":"Flex Barrierefreiheit","description":"Implementierte Verbesserungen","source":"@site/docs/accessibility/components/flex.md","sourceDirName":"accessibility/components","slug":"/accessibility/components/flex","permalink":"/smolitux-ui/en/docs/accessibility/components/flex","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/accessibility/components/flex.md","tags":[],"version":"current","frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"FileUpload Barrierefreiheit","permalink":"/smolitux-ui/en/docs/accessibility/components/fileupload"},"next":{"title":"Form Barrierefreiheit","permalink":"/smolitux-ui/en/docs/accessibility/components/form"}}');var t=i(4848),s=i(8453);const l={},a="Flex Barrierefreiheit",d={},c=[{value:"Implementierte Verbesserungen",id:"implementierte-verbesserungen",level:2},{value:"Semantische Struktur",id:"semantische-struktur",level:3},{value:"ARIA-Attribute",id:"aria-attribute",level:3},{value:"Tastaturunterst\xfctzung",id:"tastaturunterst\xfctzung",level:3},{value:"Beispiel-Implementierung",id:"beispiel-implementierung",level:2},{value:"Barrierefreiheitstests",id:"barrierefreiheitstests",level:2},{value:"Bekannte Einschr\xe4nkungen",id:"bekannte-einschr\xe4nkungen",level:2}];function o(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"flex-barrierefreiheit",children:"Flex Barrierefreiheit"})}),"\n",(0,t.jsx)(n.h2,{id:"implementierte-verbesserungen",children:"Implementierte Verbesserungen"}),"\n",(0,t.jsx)(n.p,{children:"Die Flex-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:"}),"\n",(0,t.jsx)(n.h3,{id:"semantische-struktur",children:"Semantische Struktur"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Unterst\xfctzung f\xfcr semantische HTML-Elemente (",(0,t.jsx)(n.code,{children:"div"}),", ",(0,t.jsx)(n.code,{children:"section"}),", ",(0,t.jsx)(n.code,{children:"article"}),", ",(0,t.jsx)(n.code,{children:"main"}),", ",(0,t.jsx)(n.code,{children:"aside"}),", ",(0,t.jsx)(n.code,{children:"header"}),", ",(0,t.jsx)(n.code,{children:"footer"}),", ",(0,t.jsx)(n.code,{children:"nav"}),", ",(0,t.jsx)(n.code,{children:"form"}),", ",(0,t.jsx)(n.code,{children:"fieldset"}),")"]}),"\n",(0,t.jsx)(n.li,{children:"Korrekte Verwendung von ARIA-Rollen f\xfcr verschiedene Anwendungsf\xe4lle"}),"\n",(0,t.jsx)(n.li,{children:"M\xf6glichkeit, benutzerdefinierte ARIA-Attribute zu setzen"}),"\n",(0,t.jsxs)(n.li,{children:["Unterst\xfctzung f\xfcr Landmark-Regionen (z.B. ",(0,t.jsx)(n.code,{children:'<FlexA11y as="nav" role="navigation">'}),")"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"aria-attribute",children:"ARIA-Attribute"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"role"})," - Definiert die Rolle des Elements"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-label"})," - Bietet eine Beschreibung des Elements"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-labelledby"})," - Verkn\xfcpft ein Label mit dem Element"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-describedby"})," - Verkn\xfcpft eine ausf\xfchrliche Beschreibung mit dem Element"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-owns"})," - Definiert Elemente, die zu diesem Element geh\xf6ren"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-controls"})," - Definiert Elemente, die von diesem Element gesteuert werden"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-expanded"})," - Zeigt an, ob ein Element erweitert ist"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-haspopup"})," - Zeigt an, ob ein Element ein Popup hat"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-hidden"})," - Versteckt ein Element vor Screenreadern"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-live"})," - Definiert eine Live-Region"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-relevant"})," - Definiert, welche \xc4nderungen in einer Live-Region relevant sind"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-atomic"})," - Definiert, ob eine Live-Region als Ganzes aktualisiert wird"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-busy"})," - Zeigt an, ob ein Element im Ladezustand ist"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-current"})," - Zeigt an, ob ein Element der aktuelle Kontext ist"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-roledescription"})," - Bietet eine benutzerdefinierte Rollenbeschreibung"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-keyshortcuts"})," - Definiert Tastaturk\xfcrzel f\xfcr ein Element"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-setsize"})," - Definiert die Gr\xf6\xdfe einer Gruppe"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-posinset"})," - Definiert die Position eines Elements in einer Gruppe"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-level"})," - Definiert die Hierarchieebene eines Elements"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"tastaturunterst\xfctzung",children:"Tastaturunterst\xfctzung"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Unterst\xfctzung f\xfcr ",(0,t.jsx)(n.code,{children:"tabIndex"})," zur Steuerung der Tabulatorreihenfolge"]}),"\n",(0,t.jsx)(n.li,{children:"M\xf6glichkeit, Flex-Container fokussierbar zu machen"}),"\n",(0,t.jsxs)(n.li,{children:["Unterst\xfctzung f\xfcr Tastaturk\xfcrzel durch ",(0,t.jsx)(n.code,{children:"aria-keyshortcuts"})]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"beispiel-implementierung",children:"Beispiel-Implementierung"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:'// Einfache Flex-Box\n<FlexA11y gap={4} alignItems="center">\n  <Icon name="user" aria-hidden="true" />\n  <span>Benutzername</span>\n</FlexA11y>\n\n// Navigation mit semantischer Struktur\n<FlexA11y \n  as="nav" \n  role="navigation" \n  ariaLabel="Hauptnavigation"\n  gap={4}\n>\n  <a href="/">Startseite</a>\n  <a href="/produkte">Produkte</a>\n  <a href="/kontakt">Kontakt</a>\n</FlexA11y>\n\n// Hauptinhalt mit semantischer Struktur\n<FlexA11y \n  as="main" \n  role="main"\n  direction="column"\n  gap={6}\n>\n  <h1>Willkommen</h1>\n  <p>Dies ist der Hauptinhalt der Seite.</p>\n</FlexA11y>\n\n// Seitenleiste mit semantischer Struktur\n<FlexA11y \n  as="aside" \n  role="complementary"\n  ariaLabel="Verwandte Informationen"\n  direction="column"\n  gap={4}\n>\n  <h2>Verwandte Artikel</h2>\n  <ul>\n    <li><a href="/artikel/1">Artikel 1</a></li>\n    <li><a href="/artikel/2">Artikel 2</a></li>\n  </ul>\n</FlexA11y>\n\n// Formular mit semantischer Struktur\n<FlexA11y \n  as="form" \n  role="form"\n  ariaLabel="Kontaktformular"\n  direction="column"\n  gap={4}\n>\n  <label htmlFor="name">Name</label>\n  <input id="name" type="text" />\n  <button type="submit">Absenden</button>\n</FlexA11y>\n\n// Live-Region f\xfcr Statusmeldungen\n<FlexA11y \n  ariaLive="polite" \n  ariaAtomic={true}\n  ariaRelevant="additions text"\n>\n  <div>Status: Erfolgreich gespeichert</div>\n</FlexA11y>\n'})}),"\n",(0,t.jsx)(n.h2,{id:"barrierefreiheitstests",children:"Barrierefreiheitstests"}),"\n",(0,t.jsx)(n.p,{children:"Die Flex-Komponente wurde mit folgenden Tests auf Barrierefreiheit gepr\xfcft:"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Automatisierte Tests"})," mit jest-axe zur \xdcberpr\xfcfung der ARIA-Attribute"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Manuelle Tests"})," zur \xdcberpr\xfcfung der semantischen Struktur"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Screenreader-Tests"})," zur \xdcberpr\xfcfung der korrekten Ank\xfcndigungen"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"bekannte-einschr\xe4nkungen",children:"Bekannte Einschr\xe4nkungen"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Die Komponente unterst\xfctzt derzeit keine automatische Anpassung der Rolle basierend auf dem gew\xe4hlten Element"}),"\n",(0,t.jsx)(n.li,{children:"Die Komponente unterst\xfctzt derzeit keine automatische Validierung der ARIA-Attribute"}),"\n",(0,t.jsx)(n.li,{children:"Die Komponente unterst\xfctzt derzeit keine automatische Generierung von IDs f\xfcr ARIA-Attribute"}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}}}]);