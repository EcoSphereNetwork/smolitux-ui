"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[518],{8453:(e,n,i)=>{i.d(n,{R:()=>s,x:()=>a});var r=i(6540);const l={},t=r.createContext(l);function s(e){const n=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:s(e.components),r.createElement(t.Provider,{value:n},e.children)}},9467:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>o,frontMatter:()=>s,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"components/data/table/accessibility","title":"Table-Komponente: Barrierefreiheit","description":"Diese Dokumentation beschreibt die Barrierefreiheitsfunktionen der Table-Komponente und gibt Hinweise zur korrekten Verwendung f\xfcr eine optimale Zug\xe4nglichkeit.","source":"@site/docs/components/data/table/accessibility.md","sourceDirName":"components/data/table","slug":"/components/data/table/accessibility","permalink":"/smolitux-ui/en/docs/components/data/table/accessibility","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/components/data/table/accessibility.md","tags":[],"version":"current","frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"Table","permalink":"/smolitux-ui/en/docs/components/data-display/table"},"next":{"title":"Breadcrumb","permalink":"/smolitux-ui/en/docs/components/navigation/breadcrumb"}}');var l=i(4848),t=i(8453);const s={},a="Table-Komponente: Barrierefreiheit",d={},c=[{value:"ARIA-Attribute und Rollen",id:"aria-attribute-und-rollen",level:2},{value:"Tabelle",id:"tabelle",level:3},{value:"Spalten\xfcberschriften",id:"spalten\xfcberschriften",level:3},{value:"Zeilen",id:"zeilen",level:3},{value:"Zellen",id:"zellen",level:3},{value:"Paginierung",id:"paginierung",level:3},{value:"Ladezustand und leere Tabelle",id:"ladezustand-und-leere-tabelle",level:3},{value:"Tastaturnavigation",id:"tastaturnavigation",level:2},{value:"Sortierbare Spalten\xfcberschriften",id:"sortierbare-spalten\xfcberschriften",level:3},{value:"Klickbare Zeilen",id:"klickbare-zeilen",level:3},{value:"Paginierung",id:"paginierung-1",level:3},{value:"Beispiele f\xfcr barrierefreie Verwendung",id:"beispiele-f\xfcr-barrierefreie-verwendung",level:2},{value:"Standard-Tabelle",id:"standard-tabelle",level:3},{value:"Tabelle mit klickbaren Zeilen",id:"tabelle-mit-klickbaren-zeilen",level:3},{value:"Tabelle mit Paginierung",id:"tabelle-mit-paginierung",level:3},{value:"Tabelle mit Beschriftung",id:"tabelle-mit-beschriftung",level:3},{value:"Best Practices",id:"best-practices",level:2},{value:"Bekannte Einschr\xe4nkungen",id:"bekannte-einschr\xe4nkungen",level:2},{value:"Weitere Ressourcen",id:"weitere-ressourcen",level:2}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"table-komponente-barrierefreiheit",children:"Table-Komponente: Barrierefreiheit"})}),"\n",(0,l.jsx)(n.p,{children:"Diese Dokumentation beschreibt die Barrierefreiheitsfunktionen der Table-Komponente und gibt Hinweise zur korrekten Verwendung f\xfcr eine optimale Zug\xe4nglichkeit."}),"\n",(0,l.jsx)(n.h2,{id:"aria-attribute-und-rollen",children:"ARIA-Attribute und Rollen"}),"\n",(0,l.jsx)(n.p,{children:"Die Table-Komponente verwendet folgende ARIA-Attribute und Rollen, um die Barrierefreiheit zu verbessern:"}),"\n",(0,l.jsx)(n.h3,{id:"tabelle",children:"Tabelle"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:'role="grid"'}),": Identifiziert die Tabelle als interaktives Raster"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:'aria-label="Datentabelle"'}),": Beschreibt den Zweck der Tabelle (anpassbar)"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:'summary="..."'}),": Bietet eine Zusammenfassung der Tabelle (optional)"]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"spalten\xfcberschriften",children:"Spalten\xfcberschriften"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:'role="columnheader"'}),": Identifiziert die Spalten\xfcberschriften"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:'scope="col"'}),": Gibt an, dass die \xdcberschrift f\xfcr eine Spalte gilt"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:'aria-sort="ascending|descending"'}),": Zeigt die aktuelle Sortierrichtung an"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:'aria-label="Spaltenname, klicken zum Sortieren"'}),": Beschreibt die Funktion der Spalten\xfcberschrift"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:'tabIndex="0"'}),": Macht sortierbare Spalten\xfcberschriften fokussierbar"]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"zeilen",children:"Zeilen"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:'role="row"'}),": Identifiziert die Zeilen"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:'aria-selected="true|false"'}),": Zeigt an, ob die Zeile ausgew\xe4hlt ist"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:'tabIndex="0"'}),": Macht klickbare Zeilen fokussierbar"]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"zellen",children:"Zellen"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:'role="gridcell"'}),": Identifiziert die Zellen"]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"paginierung",children:"Paginierung"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:'aria-label="Vorherige Seite|N\xe4chste Seite"'}),": Beschreibt die Funktion der Paginierungsbuttons"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:'aria-disabled="true|false"'}),": Zeigt an, ob ein Button deaktiviert ist"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:'aria-live="polite"'}),": K\xfcndigt \xc4nderungen an der Paginierung an"]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"ladezustand-und-leere-tabelle",children:"Ladezustand und leere Tabelle"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:'role="status"'}),": Identifiziert Statusmeldungen"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:'aria-live="polite"'}),": K\xfcndigt Status\xe4nderungen an"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"tastaturnavigation",children:"Tastaturnavigation"}),"\n",(0,l.jsx)(n.p,{children:"Die Table-Komponente unterst\xfctzt folgende Tastaturinteraktionen:"}),"\n",(0,l.jsx)(n.h3,{id:"sortierbare-spalten\xfcberschriften",children:"Sortierbare Spalten\xfcberschriften"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Tab"}),": Fokussiert die n\xe4chste sortierbare Spalten\xfcberschrift"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Enter/Space"}),": \xc4ndert die Sortierrichtung"]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"klickbare-zeilen",children:"Klickbare Zeilen"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Tab"}),": Fokussiert die n\xe4chste klickbare Zeile"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Enter/Space"}),": Aktiviert die Zeilenklick-Funktion"]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"paginierung-1",children:"Paginierung"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Tab"}),": Fokussiert die Paginierungsbuttons"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Enter/Space"}),": Aktiviert den Button"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"beispiele-f\xfcr-barrierefreie-verwendung",children:"Beispiele f\xfcr barrierefreie Verwendung"}),"\n",(0,l.jsx)(n.h3,{id:"standard-tabelle",children:"Standard-Tabelle"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-tsx",children:'<Table\n  columns={columns}\n  data={data}\n  ariaLabel="Benutzerliste"\n  summary="Tabelle mit Benutzerdaten, sortierbar nach Name und Alter"\n/>\n'})}),"\n",(0,l.jsx)(n.h3,{id:"tabelle-mit-klickbaren-zeilen",children:"Tabelle mit klickbaren Zeilen"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-tsx",children:'<Table\n  columns={columns}\n  data={data}\n  onRowClick={handleRowClick}\n  ariaLabel="Benutzerliste mit klickbaren Zeilen"\n/>\n'})}),"\n",(0,l.jsx)(n.h3,{id:"tabelle-mit-paginierung",children:"Tabelle mit Paginierung"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-tsx",children:'<Table\n  columns={columns}\n  data={data}\n  paginated={true}\n  itemsPerPage={10}\n  currentPage={currentPage}\n  onPageChange={handlePageChange}\n  ariaLabel="Paginierte Benutzerliste"\n/>\n'})}),"\n",(0,l.jsx)(n.h3,{id:"tabelle-mit-beschriftung",children:"Tabelle mit Beschriftung"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-tsx",children:'<Table\n  columns={columns}\n  data={data}\n  caption={<h2>Benutzerliste</h2>}\n  captionPosition="top"\n  ariaLabel="Benutzerliste"\n/>\n'})}),"\n",(0,l.jsx)(n.h2,{id:"best-practices",children:"Best Practices"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsxs)(n.strong,{children:["Immer ein ",(0,l.jsx)(n.code,{children:"ariaLabel"})," verwenden"]}),": Das Label hilft Screenreader-Benutzern, den Zweck der Tabelle zu verstehen"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Beschreibende Spalten\xfcberschriften verwenden"}),": Klare \xdcberschriften helfen beim Verst\xe4ndnis der Daten"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Sortierbare Spalten kennzeichnen"}),": Machen Sie deutlich, welche Spalten sortierbar sind"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Tastaturzug\xe4nglichkeit testen"}),": Stellen Sie sicher, dass die Tabelle mit der Tastatur bedient werden kann"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Screenreader-Unterst\xfctzung testen"}),": Stellen Sie sicher, dass die Tabelle mit Screenreadern zug\xe4nglich ist"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"bekannte-einschr\xe4nkungen",children:"Bekannte Einschr\xe4nkungen"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Komplexe Tabellen"}),": Sehr komplexe Tabellen mit verschachtelten Spalten k\xf6nnen f\xfcr Screenreader-Benutzer schwer zu verstehen sein"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Mobile Ger\xe4te"}),": Auf kleinen Bildschirmen kann die Tabelle schwer zu bedienen sein"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Gro\xdfe Datenmengen"}),": Sehr gro\xdfe Tabellen k\xf6nnen die Performance beeintr\xe4chtigen"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"weitere-ressourcen",children:"Weitere Ressourcen"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/grid/",children:"WAI-ARIA Authoring Practices: Grid Pattern"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/grid_role",children:"MDN Web Docs: ARIA: grid role"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://webaim.org/techniques/tables/",children:"WebAIM: Creating Accessible Tables"})}),"\n"]})]})}function o(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(h,{...e})}):h(e)}}}]);