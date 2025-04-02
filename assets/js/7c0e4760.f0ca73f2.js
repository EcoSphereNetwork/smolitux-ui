"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6373],{8323:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>l,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"components/layout/card/accessibility","title":"Card-Komponente: Barrierefreiheit","description":"Diese Dokumentation beschreibt die Barrierefreiheitsfunktionen der Card-Komponente und gibt Hinweise zur korrekten Verwendung f\xfcr eine optimale Zug\xe4nglichkeit.","source":"@site/docs/components/layout/card/accessibility.md","sourceDirName":"components/layout/card","slug":"/components/layout/card/accessibility","permalink":"/smolitux-ui/docs/components/layout/card/accessibility","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/components/layout/card/accessibility.md","tags":[],"version":"current","frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"Card","permalink":"/smolitux-ui/docs/components/layout/card"},"next":{"title":"Collapse-Komponente: Barrierefreiheit","permalink":"/smolitux-ui/docs/components/layout/collapse/accessibility"}}');var t=i(4848),s=i(8453);const l={},a="Card-Komponente: Barrierefreiheit",d={},c=[{value:"ARIA-Attribute und Rollen",id:"aria-attribute-und-rollen",level:2},{value:"Card-Container",id:"card-container",level:3},{value:"Daten-Attribute",id:"daten-attribute",level:3},{value:"Abschnitte",id:"abschnitte",level:3},{value:"Tastaturnavigation",id:"tastaturnavigation",level:2},{value:"Fokus-Management",id:"fokus-management",level:2},{value:"Beispiele f\xfcr barrierefreie Verwendung",id:"beispiele-f\xfcr-barrierefreie-verwendung",level:2},{value:"Standard-Karte",id:"standard-karte",level:3},{value:"Karte mit Titel",id:"karte-mit-titel",level:3},{value:"Klickbare Karte",id:"klickbare-karte",level:3},{value:"Karte mit Footer",id:"karte-mit-footer",level:3},{value:"Karte mit Header-Aktion",id:"karte-mit-header-aktion",level:3},{value:"Best Practices",id:"best-practices",level:2},{value:"Bekannte Einschr\xe4nkungen",id:"bekannte-einschr\xe4nkungen",level:2},{value:"Weitere Ressourcen",id:"weitere-ressourcen",level:2}];function o(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"card-komponente-barrierefreiheit",children:"Card-Komponente: Barrierefreiheit"})}),"\n",(0,t.jsx)(n.p,{children:"Diese Dokumentation beschreibt die Barrierefreiheitsfunktionen der Card-Komponente und gibt Hinweise zur korrekten Verwendung f\xfcr eine optimale Zug\xe4nglichkeit."}),"\n",(0,t.jsx)(n.h2,{id:"aria-attribute-und-rollen",children:"ARIA-Attribute und Rollen"}),"\n",(0,t.jsx)(n.p,{children:"Die Card-Komponente verwendet folgende ARIA-Attribute und Rollen, um die Barrierefreiheit zu verbessern:"}),"\n",(0,t.jsx)(n.h3,{id:"card-container",children:"Card-Container"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'role="region"'}),": Kennzeichnet die Karte als eigenst\xe4ndigen Inhaltsbereich (Standardeinstellung)"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'role="button"'}),": Wenn die Karte klickbar ist (onClick-Handler vorhanden)"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'aria-labelledby="HEADER_ID"'}),": Verweist auf die ID des Titels (wenn vorhanden)"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'id="card-[unique-id]"'}),": Eindeutige ID f\xfcr ARIA-Referenzen"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'tabIndex="0"'}),": Macht die Karte fokussierbar, wenn sie klickbar ist"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"daten-attribute",children:"Daten-Attribute"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'data-variant="flat|elevated|outlined"'}),": Gibt die Variante der Karte an"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'data-hoverable="true"'}),": Kennzeichnet die Karte als mit Hover-Effekt"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"abschnitte",children:"Abschnitte"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'id="card-[unique-id]-header"'}),": Eindeutige ID f\xfcr den Header"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'id="card-[unique-id]-content"'}),": Eindeutige ID f\xfcr den Inhalt"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'id="card-[unique-id]-footer"'}),": Eindeutige ID f\xfcr den Footer"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"tastaturnavigation",children:"Tastaturnavigation"}),"\n",(0,t.jsx)(n.p,{children:"Die Card-Komponente unterst\xfctzt folgende Tastaturinteraktionen, wenn sie klickbar ist:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Tab"}),": Fokussiert die Karte"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Enter/Space"}),": Aktiviert die Karte (l\xf6st onClick-Handler aus)"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"fokus-management",children:"Fokus-Management"}),"\n",(0,t.jsx)(n.p,{children:"Die Card-Komponente implementiert folgende Fokus-Management-Strategien:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Bedingte Fokussierbarkeit"}),": Die Karte ist nur fokussierbar, wenn sie klickbar ist"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Fokus-Indikatoren"}),": Deutliche visuelle Anzeige des Fokus f\xfcr klickbare Karten"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"beispiele-f\xfcr-barrierefreie-verwendung",children:"Beispiele f\xfcr barrierefreie Verwendung"}),"\n",(0,t.jsx)(n.h3,{id:"standard-karte",children:"Standard-Karte"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:"<Card>\n  Karteninhalt\n</Card>\n"})}),"\n",(0,t.jsx)(n.h3,{id:"karte-mit-titel",children:"Karte mit Titel"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:'<Card title="Kartentitel">\n  Karteninhalt\n</Card>\n'})}),"\n",(0,t.jsx)(n.h3,{id:"klickbare-karte",children:"Klickbare Karte"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:"<Card \n  onClick={handleCardClick}\n  hoverable\n>\n  Klickbare Karte\n</Card>\n"})}),"\n",(0,t.jsx)(n.h3,{id:"karte-mit-footer",children:"Karte mit Footer"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:'<Card \n  title="Kartentitel"\n  footer={<Button>Aktion</Button>}\n>\n  Karteninhalt\n</Card>\n'})}),"\n",(0,t.jsx)(n.h3,{id:"karte-mit-header-aktion",children:"Karte mit Header-Aktion"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:'<Card \n  title="Kartentitel"\n  headerAction={<Button size="sm">Bearbeiten</Button>}\n>\n  Karteninhalt\n</Card>\n'})}),"\n",(0,t.jsx)(n.h2,{id:"best-practices",children:"Best Practices"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Beschreibende Titel"}),": Verwenden Sie beschreibende Titel f\xfcr Karten"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Dies verbessert die Navigation und Orientierung f\xfcr Screenreader-Benutzer"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Klickbare Karten"}),": Wenn eine Karte klickbar ist, sollte sie:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Einen ",(0,t.jsx)(n.code,{children:"onClick"}),"-Handler haben"]}),"\n",(0,t.jsxs)(n.li,{children:["Das ",(0,t.jsx)(n.code,{children:"hoverable"}),"-Attribut verwenden, um visuelles Feedback zu geben"]}),"\n",(0,t.jsx)(n.li,{children:"Einen beschreibenden Titel haben, der die Aktion erkl\xe4rt"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Semantische Struktur"}),": Verwenden Sie die richtigen Abschnitte"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"title"})," f\xfcr den Kartentitel"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"children"})," f\xfcr den Hauptinhalt"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"footer"})," f\xfcr Aktionen oder zus\xe4tzliche Informationen"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Ausreichender Kontrast"}),": Stellen Sie sicher, dass die Karte ausreichenden Kontrast zum Hintergrund hat"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Die Komponente verwendet automatisch kontrastreiche Farbkombinationen"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Konsistente Verwendung"}),": Verwenden Sie Karten konsistent in Ihrer Anwendung"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Gleiche Varianten f\xfcr \xe4hnliche Inhalte"}),"\n",(0,t.jsx)(n.li,{children:"Gleiche Interaktionsmuster f\xfcr \xe4hnliche Aktionen"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"bekannte-einschr\xe4nkungen",children:"Bekannte Einschr\xe4nkungen"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Verschachtelte interaktive Elemente"}),": Wenn eine Karte klickbar ist und interaktive Elemente enth\xe4lt, kann es zu Problemen mit der Tastaturnavigation kommen"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Komplexe Inhalte"}),": Bei komplexen Inhalten sollten zus\xe4tzliche ARIA-Attribute hinzugef\xfcgt werden"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"weitere-ressourcen",children:"Weitere Ressourcen"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/landmark-region/",children:"WAI-ARIA Authoring Practices: Region Pattern"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role",children:"MDN Web Docs: ARIA: region role"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://webaim.org/techniques/aria/",children:"WebAIM: Creating Accessible Cards"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>l,x:()=>a});var r=i(6540);const t={},s=r.createContext(t);function l(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);