"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3517],{8453:(e,n,i)=>{i.d(n,{R:()=>c,x:()=>t});var r=i(6540);const s={},l=r.createContext(s);function c(e){const n=r.useContext(l);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),r.createElement(l.Provider,{value:n},e.children)}},8925:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>t,default:()=>a,frontMatter:()=>c,metadata:()=>r,toc:()=>h});const r=JSON.parse('{"id":"components/inputs/checkbox/accessibility","title":"Checkbox-Komponente: Barrierefreiheit","description":"Diese Dokumentation beschreibt die Barrierefreiheitsfunktionen der Checkbox-Komponente und gibt Hinweise zur korrekten Verwendung f\xfcr eine optimale Zug\xe4nglichkeit.","source":"@site/docs/components/inputs/checkbox/accessibility.md","sourceDirName":"components/inputs/checkbox","slug":"/components/inputs/checkbox/accessibility","permalink":"/smolitux-ui/docs/components/inputs/checkbox/accessibility","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/components/inputs/checkbox/accessibility.md","tags":[],"version":"current","frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"Checkbox Komponente","permalink":"/smolitux-ui/docs/components/inputs/Checkbox"},"next":{"title":"Input Komponente","permalink":"/smolitux-ui/docs/components/inputs/Input"}}');var s=i(4848),l=i(8453);const c={},t="Checkbox-Komponente: Barrierefreiheit",d={},h=[{value:"ARIA-Attribute und Rollen",id:"aria-attribute-und-rollen",level:2},{value:"Standard-Checkbox",id:"standard-checkbox",level:3},{value:"Switch/Toggle",id:"switchtoggle",level:3},{value:"Button-Checkbox",id:"button-checkbox",level:3},{value:"Tastaturnavigation",id:"tastaturnavigation",level:2},{value:"Screenreader-Unterst\xfctzung",id:"screenreader-unterst\xfctzung",level:2},{value:"Beispiele f\xfcr barrierefreie Verwendung",id:"beispiele-f\xfcr-barrierefreie-verwendung",level:2},{value:"Standard-Checkbox",id:"standard-checkbox-1",level:3},{value:"Erforderliche Checkbox",id:"erforderliche-checkbox",level:3},{value:"Checkbox mit Fehler",id:"checkbox-mit-fehler",level:3},{value:"Checkbox mit Hilfetext",id:"checkbox-mit-hilfetext",level:3},{value:"Indeterminierte Checkbox",id:"indeterminierte-checkbox",level:3},{value:"Switch-Checkbox",id:"switch-checkbox",level:3},{value:"Toggle-Checkbox",id:"toggle-checkbox",level:3},{value:"Button-Checkbox",id:"button-checkbox-1",level:3},{value:"Best Practices",id:"best-practices",level:2},{value:"Bekannte Einschr\xe4nkungen",id:"bekannte-einschr\xe4nkungen",level:2},{value:"Weitere Ressourcen",id:"weitere-ressourcen",level:2}];function o(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"checkbox-komponente-barrierefreiheit",children:"Checkbox-Komponente: Barrierefreiheit"})}),"\n",(0,s.jsx)(n.p,{children:"Diese Dokumentation beschreibt die Barrierefreiheitsfunktionen der Checkbox-Komponente und gibt Hinweise zur korrekten Verwendung f\xfcr eine optimale Zug\xe4nglichkeit."}),"\n",(0,s.jsx)(n.h2,{id:"aria-attribute-und-rollen",children:"ARIA-Attribute und Rollen"}),"\n",(0,s.jsx)(n.p,{children:"Die Checkbox-Komponente verwendet folgende ARIA-Attribute und Rollen, um die Barrierefreiheit zu verbessern:"}),"\n",(0,s.jsx)(n.h3,{id:"standard-checkbox",children:"Standard-Checkbox"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Nativer ",(0,s.jsx)(n.code,{children:'<input type="checkbox">'})," mit impliziter Rolle ",(0,s.jsx)(n.code,{children:"checkbox"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:'aria-checked="mixed"'}),": F\xfcr indeterminierten Zustand"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:'aria-required="true"'}),": Wenn die Checkbox erforderlich ist"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:'aria-invalid="true"'}),": Wenn die Checkbox ung\xfcltig ist"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:'aria-disabled="true"'}),": Wenn die Checkbox deaktiviert ist"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:'aria-describedby="ID"'}),": Verweist auf Hilfetexte, Beschreibungen oder Erfolgsmeldungen"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:'aria-errormessage="ID"'}),": Verweist auf Fehlermeldungen"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"switchtoggle",children:"Switch/Toggle"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:'role="switch"'}),": Kennzeichnet die Checkbox als Schalter"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:'aria-roledescription="Schalter"'}),": Beschreibt die Funktion f\xfcr Screenreader"]}),"\n",(0,s.jsx)(n.li,{children:"Alle anderen Attribute wie bei Standard-Checkbox"}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"button-checkbox",children:"Button-Checkbox"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:'role="checkbox"'}),": Explizite Rolle f\xfcr Button-Checkboxen"]}),"\n",(0,s.jsx)(n.li,{children:"Alle anderen Attribute wie bei Standard-Checkbox"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"tastaturnavigation",children:"Tastaturnavigation"}),"\n",(0,s.jsx)(n.p,{children:"Die Checkbox-Komponente unterst\xfctzt folgende Tastaturinteraktionen:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Tab"}),": Fokussiert die Checkbox"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Space"}),": Aktiviert/deaktiviert die Checkbox"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Enter"}),": Aktiviert/deaktiviert die Checkbox (bei Button-Checkbox)"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"screenreader-unterst\xfctzung",children:"Screenreader-Unterst\xfctzung"}),"\n",(0,s.jsx)(n.p,{children:"Die Checkbox-Komponente bietet folgende Screenreader-Unterst\xfctzungen:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Beschreibende Labels"}),": Die Checkbox wird mit einem beschreibenden Label versehen"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Erforderliche Felder"}),': Erforderliche Felder werden mit "(Erforderlich)" f\xfcr Screenreader angek\xfcndigt']}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Fehlermeldungen"}),": Fehlermeldungen werden mit ",(0,s.jsx)(n.code,{children:'role="alert"'})," und ",(0,s.jsx)(n.code,{children:'aria-live="assertive"'})," angek\xfcndigt"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Erfolgsmeldungen"}),": Erfolgsmeldungen werden mit ",(0,s.jsx)(n.code,{children:'role="status"'})," und ",(0,s.jsx)(n.code,{children:'aria-live="polite"'})," angek\xfcndigt"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Versteckte Texte"}),": Zus\xe4tzliche Informationen f\xfcr Screenreader durch ",(0,s.jsx)(n.code,{children:"sr-only"}),"-Klassen"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"beispiele-f\xfcr-barrierefreie-verwendung",children:"Beispiele f\xfcr barrierefreie Verwendung"}),"\n",(0,s.jsx)(n.h3,{id:"standard-checkbox-1",children:"Standard-Checkbox"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:'<Checkbox \n  label="Ich akzeptiere die AGB" \n/>\n'})}),"\n",(0,s.jsx)(n.h3,{id:"erforderliche-checkbox",children:"Erforderliche Checkbox"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:'<Checkbox \n  label="Ich akzeptiere die AGB" \n  isRequired \n/>\n'})}),"\n",(0,s.jsx)(n.h3,{id:"checkbox-mit-fehler",children:"Checkbox mit Fehler"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:'<Checkbox \n  label="Ich akzeptiere die AGB" \n  isRequired \n  error="Bitte akzeptieren Sie die AGB, um fortzufahren" \n/>\n'})}),"\n",(0,s.jsx)(n.h3,{id:"checkbox-mit-hilfetext",children:"Checkbox mit Hilfetext"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:'<Checkbox \n  label="Newsletter abonnieren" \n  helperText="Sie k\xf6nnen sich jederzeit wieder abmelden" \n/>\n'})}),"\n",(0,s.jsx)(n.h3,{id:"indeterminierte-checkbox",children:"Indeterminierte Checkbox"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:'<Checkbox \n  label="Alle ausw\xe4hlen" \n  indeterminate \n/>\n'})}),"\n",(0,s.jsx)(n.h3,{id:"switch-checkbox",children:"Switch-Checkbox"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:'<Checkbox \n  label="Benachrichtigungen aktivieren" \n  isSwitch \n/>\n'})}),"\n",(0,s.jsx)(n.h3,{id:"toggle-checkbox",children:"Toggle-Checkbox"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:'<Checkbox \n  label="Dunkelmodus" \n  isToggle \n/>\n'})}),"\n",(0,s.jsx)(n.h3,{id:"button-checkbox-1",children:"Button-Checkbox"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:'<Checkbox \n  label="Als Favorit markieren" \n  isButton \n/>\n'})}),"\n",(0,s.jsx)(n.h2,{id:"best-practices",children:"Best Practices"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Beschreibende Labels"}),": Verwenden Sie klare, beschreibende Labels f\xfcr Checkboxen"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:'Gut: "Newsletter abonnieren" oder "Ich akzeptiere die AGB"'}),"\n",(0,s.jsx)(n.li,{children:'Schlecht: "Abonnieren" oder "Akzeptieren"'}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Gruppierung"}),": Gruppieren Sie zusammengeh\xf6rige Checkboxen"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Verwenden Sie ",(0,s.jsx)(n.code,{children:"<fieldset>"})," und ",(0,s.jsx)(n.code,{children:"<legend>"})," f\xfcr Gruppen von Checkboxen"]}),"\n",(0,s.jsxs)(n.li,{children:["Oder verwenden Sie die ",(0,s.jsx)(n.code,{children:"CheckboxGroup"}),"-Komponente"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Fehlermeldungen"}),": Stellen Sie klare Fehlermeldungen bereit"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Beschreiben Sie das Problem und wie es behoben werden kann"}),"\n",(0,s.jsx)(n.li,{children:"Vermeiden Sie technische Fehlermeldungen"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Visuelle Unterscheidung"}),": Stellen Sie sicher, dass der Zustand der Checkbox visuell klar erkennbar ist"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Ausreichender Kontrast zwischen ausgew\xe4hltem und nicht ausgew\xe4hltem Zustand"}),"\n",(0,s.jsx)(n.li,{children:"Deutliche visuelle Unterscheidung f\xfcr indeterminierten Zustand"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Tastaturnavigation"}),": Stellen Sie sicher, dass die Checkbox mit der Tastatur bedienbar ist"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Fokus-Indikatoren sollten deutlich sichtbar sein"}),"\n",(0,s.jsx)(n.li,{children:"Die Tab-Reihenfolge sollte logisch sein"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"bekannte-einschr\xe4nkungen",children:"Bekannte Einschr\xe4nkungen"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Komplexe Zust\xe4nde"}),": Bei sehr komplexen Zust\xe4nden kann es f\xfcr Screenreader-Benutzer schwierig sein, den aktuellen Zustand zu verstehen"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Benutzerdefinierte Styles"}),": Bei stark angepassten Styles kann die visuelle Unterscheidung zwischen den Zust\xe4nden beeintr\xe4chtigt werden"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"weitere-ressourcen",children:"Weitere Ressourcen"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/",children:"WAI-ARIA Authoring Practices: Checkbox Pattern"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/checkbox_role",children:"MDN Web Docs: ARIA: checkbox role"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://webaim.org/techniques/forms/",children:"WebAIM: Creating Accessible Forms"})}),"\n"]})]})}function a(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}}}]);