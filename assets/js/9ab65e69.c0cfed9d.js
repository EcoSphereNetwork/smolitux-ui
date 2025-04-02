"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5920],{8453:(e,n,i)=>{i.d(n,{R:()=>s,x:()=>o});var r=i(6540);const t={},c=r.createContext(t);function s(e){const n=r.useContext(c);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),r.createElement(c.Provider,{value:n},e.children)}},9166:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>r,toc:()=>l});const r=JSON.parse('{"id":"components/disclosure/accordion/accessibility","title":"Accordion-Komponente: Barrierefreiheit","description":"Diese Dokumentation beschreibt die Barrierefreiheitsfunktionen der Accordion-Komponente und gibt Hinweise zur korrekten Verwendung f\xfcr eine optimale Zug\xe4nglichkeit.","source":"@site/docs/components/disclosure/accordion/accessibility.md","sourceDirName":"components/disclosure/accordion","slug":"/components/disclosure/accordion/accessibility","permalink":"/smolitux-ui/docs/components/disclosure/accordion/accessibility","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/components/disclosure/accordion/accessibility.md","tags":[],"version":"current","frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"Accordion","permalink":"/smolitux-ui/docs/components/disclosure/accordion"},"next":{"title":"Carousel","permalink":"/smolitux-ui/docs/components/media/carousel"}}');var t=i(4848),c=i(8453);const s={},o="Accordion-Komponente: Barrierefreiheit",d={},l=[{value:"ARIA-Attribute und Rollen",id:"aria-attribute-und-rollen",level:2},{value:"Accordion",id:"accordion",level:3},{value:"AccordionItem Button",id:"accordionitem-button",level:3},{value:"AccordionItem Content",id:"accordionitem-content",level:3},{value:"Tastaturnavigation",id:"tastaturnavigation",level:2},{value:"Fokus-Management",id:"fokus-management",level:2},{value:"Beispiele f\xfcr barrierefreie Verwendung",id:"beispiele-f\xfcr-barrierefreie-verwendung",level:2},{value:"Standard-Accordion",id:"standard-accordion",level:3},{value:"Accordion mit mehreren ge\xf6ffneten Panels",id:"accordion-mit-mehreren-ge\xf6ffneten-panels",level:3},{value:"Accordion mit Icons",id:"accordion-mit-icons",level:3},{value:"Accordion mit deaktiviertem Panel",id:"accordion-mit-deaktiviertem-panel",level:3},{value:"Accordion mit Screenreader-Beschreibung",id:"accordion-mit-screenreader-beschreibung",level:3},{value:"Internationalisierung",id:"internationalisierung",level:2},{value:"Best Practices",id:"best-practices",level:2},{value:"Bekannte Einschr\xe4nkungen",id:"bekannte-einschr\xe4nkungen",level:2},{value:"Weitere Ressourcen",id:"weitere-ressourcen",level:2}];function a(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,c.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"accordion-komponente-barrierefreiheit",children:"Accordion-Komponente: Barrierefreiheit"})}),"\n",(0,t.jsx)(n.p,{children:"Diese Dokumentation beschreibt die Barrierefreiheitsfunktionen der Accordion-Komponente und gibt Hinweise zur korrekten Verwendung f\xfcr eine optimale Zug\xe4nglichkeit."}),"\n",(0,t.jsx)(n.h2,{id:"aria-attribute-und-rollen",children:"ARIA-Attribute und Rollen"}),"\n",(0,t.jsx)(n.p,{children:"Die Accordion-Komponente verwendet folgende ARIA-Attribute und Rollen, um die Barrierefreiheit zu verbessern:"}),"\n",(0,t.jsx)(n.h3,{id:"accordion",children:"Accordion"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'role="region"'}),": Identifiziert den Accordion-Container als Region"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'aria-multiselectable="true|false"'}),": Gibt an, ob mehrere Panels gleichzeitig ge\xf6ffnet sein k\xf6nnen"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"accordionitem-button",children:"AccordionItem Button"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'aria-expanded="true|false"'}),": Gibt an, ob das Panel ge\xf6ffnet ist"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'aria-controls="PANEL_ID"'}),": Verweist auf die ID des zugeh\xf6rigen Panels"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'aria-disabled="true|false"'}),": Gibt an, ob das Panel deaktiviert ist"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'id="BUTTON_ID"'}),": Eindeutige ID f\xfcr den Button"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"accordionitem-content",children:"AccordionItem Content"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'role="region"'}),": Identifiziert den Inhaltsbereich als Region"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'aria-hidden="true|false"'}),": Gibt an, ob der Inhalt sichtbar ist"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'aria-labelledby="BUTTON_ID"'}),": Verweist auf die ID des zugeh\xf6rigen Buttons"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'aria-describedby="DESCRIPTION_ID"'})," (optional): Verweist auf die ID einer zus\xe4tzlichen Beschreibung"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"tastaturnavigation",children:"Tastaturnavigation"}),"\n",(0,t.jsx)(n.p,{children:"Die Accordion-Komponente unterst\xfctzt folgende Tastaturinteraktionen:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Tab"}),": Navigiert zu den Accordion-Buttons und dann zu den ge\xf6ffneten Inhalten"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Shift+Tab"}),": Navigiert r\xfcckw\xe4rts durch fokussierbare Elemente"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Enter/Space"}),": \xd6ffnet oder schlie\xdft das Panel"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Home"}),": Bewegt den Fokus zum ersten Accordion-Button (wenn implementiert)"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"End"}),": Bewegt den Fokus zum letzten Accordion-Button (wenn implementiert)"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"fokus-management",children:"Fokus-Management"}),"\n",(0,t.jsx)(n.p,{children:"Die Accordion-Komponente implementiert folgende Fokus-Management-Strategien:"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Fokussierbare Inhalte"}),": Ge\xf6ffnete Panels sind fokussierbar (",(0,t.jsx)(n.code,{children:"tabIndex={0}"}),")"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Visueller Fokus-Indikator"}),": Deutliche visuelle Anzeige des Fokus"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Fokus-Reihenfolge"}),": Logische Tab-Reihenfolge durch die Accordion-Elemente"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"beispiele-f\xfcr-barrierefreie-verwendung",children:"Beispiele f\xfcr barrierefreie Verwendung"}),"\n",(0,t.jsx)(n.h3,{id:"standard-accordion",children:"Standard-Accordion"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:'<Accordion>\n  <AccordionItem id="section1" title="Abschnitt 1">\n    Inhalt von Abschnitt 1...\n  </AccordionItem>\n  <AccordionItem id="section2" title="Abschnitt 2">\n    Inhalt von Abschnitt 2...\n  </AccordionItem>\n</Accordion>\n'})}),"\n",(0,t.jsx)(n.h3,{id:"accordion-mit-mehreren-ge\xf6ffneten-panels",children:"Accordion mit mehreren ge\xf6ffneten Panels"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:'<Accordion allowMultiple>\n  <AccordionItem id="section1" title="Abschnitt 1">\n    Inhalt von Abschnitt 1...\n  </AccordionItem>\n  <AccordionItem id="section2" title="Abschnitt 2">\n    Inhalt von Abschnitt 2...\n  </AccordionItem>\n</Accordion>\n'})}),"\n",(0,t.jsx)(n.h3,{id:"accordion-mit-icons",children:"Accordion mit Icons"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:'<Accordion iconStyle="plus">\n  <AccordionItem id="section1" title="Abschnitt 1" icon={<InfoIcon />}>\n    Inhalt von Abschnitt 1...\n  </AccordionItem>\n  <AccordionItem id="section2" title="Abschnitt 2" icon={<SettingsIcon />}>\n    Inhalt von Abschnitt 2...\n  </AccordionItem>\n</Accordion>\n'})}),"\n",(0,t.jsx)(n.h3,{id:"accordion-mit-deaktiviertem-panel",children:"Accordion mit deaktiviertem Panel"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:'<Accordion>\n  <AccordionItem id="section1" title="Abschnitt 1">\n    Inhalt von Abschnitt 1...\n  </AccordionItem>\n  <AccordionItem id="section2" title="Abschnitt 2" disabled>\n    Inhalt von Abschnitt 2...\n  </AccordionItem>\n</Accordion>\n'})}),"\n",(0,t.jsx)(n.h3,{id:"accordion-mit-screenreader-beschreibung",children:"Accordion mit Screenreader-Beschreibung"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:'<Accordion>\n  <AccordionItem \n    id="section1" \n    title="Abschnitt 1"\n    description="Dieser Abschnitt enth\xe4lt wichtige Informationen"\n  >\n    Inhalt von Abschnitt 1...\n  </AccordionItem>\n</Accordion>\n'})}),"\n",(0,t.jsx)(n.h2,{id:"internationalisierung",children:"Internationalisierung"}),"\n",(0,t.jsxs)(n.p,{children:["Die Accordion-Komponente unterst\xfctzt Internationalisierung durch das ",(0,t.jsx)(n.code,{children:"i18n"}),"-Prop:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:'<Accordion\n  i18n={{\n    expand: "Erweitern",\n    collapse: "Einklappen"\n  }}\n>\n  {/* ... */}\n</Accordion>\n'})}),"\n",(0,t.jsx)(n.h2,{id:"best-practices",children:"Best Practices"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Aussagekr\xe4ftige Titel"}),": Verwenden Sie klare und pr\xe4zise Titel f\xfcr die Panels"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Konsistente Reihenfolge"}),": Halten Sie die Reihenfolge der Panels logisch und konsistent"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Visuelle Unterscheidung"}),": Stellen Sie sicher, dass ge\xf6ffnete Panels visuell deutlich erkennbar sind"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Tastaturzug\xe4nglichkeit"}),": Testen Sie die Komponente mit der Tastatur"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Screenreader-Unterst\xfctzung"}),": Stellen Sie sicher, dass die Komponente mit Screenreadern zug\xe4nglich ist"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Responsive Design"}),": Stellen Sie sicher, dass das Accordion auf allen Bildschirmgr\xf6\xdfen gut funktioniert"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"bekannte-einschr\xe4nkungen",children:"Bekannte Einschr\xe4nkungen"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Verschachtelte Accordions"}),": K\xf6nnen zu Verwirrung bei der Tastaturnavigation f\xfchren"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Zu viele Panels"}),": K\xf6nnen die Benutzerfreundlichkeit beeintr\xe4chtigen"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Dynamische Panels"}),": \xc4nderungen in der Panel-Anzahl k\xf6nnen zu Problemen mit dem Fokus f\xfchren"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"weitere-ressourcen",children:"Weitere Ressourcen"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/accordion/",children:"WAI-ARIA Authoring Practices: Accordion Pattern"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role",children:"MDN Web Docs: ARIA: button role"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role",children:"MDN Web Docs: ARIA: region role"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}}}]);