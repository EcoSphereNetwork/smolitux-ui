"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7416],{4065:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>a,contentTitle:()=>d,default:()=>u,frontMatter:()=>s,metadata:()=>i,toc:()=>o});const i=JSON.parse('{"id":"accessibility/components/formfield","title":"FormField Barrierefreiheit","description":"Implementierte Verbesserungen","source":"@site/docs/accessibility/components/formfield.md","sourceDirName":"accessibility/components","slug":"/accessibility/components/formfield","permalink":"/smolitux-ui/docs/accessibility/components/formfield","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/accessibility/components/formfield.md","tags":[],"version":"current","frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"FormControl Barrierefreiheit","permalink":"/smolitux-ui/docs/accessibility/components/formcontrol"},"next":{"title":"Input Barrierefreiheit","permalink":"/smolitux-ui/docs/accessibility/components/input"}}');var t=r(4848),l=r(8453);const s={},d="FormField Barrierefreiheit",a={},o=[{value:"Implementierte Verbesserungen",id:"implementierte-verbesserungen",level:2},{value:"ARIA-Attribute",id:"aria-attribute",level:3},{value:"Tastaturunterst\xfctzung",id:"tastaturunterst\xfctzung",level:3},{value:"Screenreader-Unterst\xfctzung",id:"screenreader-unterst\xfctzung",level:3},{value:"Formular-Validierung",id:"formular-validierung",level:3},{value:"Zus\xe4tzliche Funktionen",id:"zus\xe4tzliche-funktionen",level:3},{value:"Beispiel-Implementierung",id:"beispiel-implementierung",level:2},{value:"Barrierefreiheitstests",id:"barrierefreiheitstests",level:2},{value:"Bekannte Einschr\xe4nkungen",id:"bekannte-einschr\xe4nkungen",level:2}];function c(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"formfield-barrierefreiheit",children:"FormField Barrierefreiheit"})}),"\n",(0,t.jsx)(n.h2,{id:"implementierte-verbesserungen",children:"Implementierte Verbesserungen"}),"\n",(0,t.jsx)(n.p,{children:"Die FormField-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:"}),"\n",(0,t.jsx)(n.h3,{id:"aria-attribute",children:"ARIA-Attribute"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-labelledby"})," - Verkn\xfcpft das Label mit dem Formularfeld"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-describedby"})," - Verkn\xfcpft Hilfetexte, Fehlermeldungen und andere Beschreibungen mit dem Formularfeld"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-invalid"})," - Zeigt an, ob das Formularfeld ung\xfcltig ist"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-required"})," - Zeigt an, ob das Formularfeld erforderlich ist"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-disabled"})," - Zeigt an, ob das Formularfeld deaktiviert ist"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-readonly"})," - Zeigt an, ob das Formularfeld schreibgesch\xfctzt ist"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'role="alert"'})," - Markiert Fehlermeldungen f\xfcr Screenreader"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'role="progressbar"'})," - Definiert den Fortschrittsbalken mit entsprechenden Attributen"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-valuenow"}),", ",(0,t.jsx)(n.code,{children:"aria-valuemin"}),", ",(0,t.jsx)(n.code,{children:"aria-valuemax"})," - Definiert die Werte des Fortschrittsbalkens"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'aria-live="polite"'})," - Sorgt daf\xfcr, dass \xc4nderungen am Z\xe4hler angek\xfcndigt werden"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'aria-atomic="true"'})," - Sorgt daf\xfcr, dass der gesamte Inhalt des Elements angek\xfcndigt wird"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"tastaturunterst\xfctzung",children:"Tastaturunterst\xfctzung"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Korrekte Fokus-Reihenfolge f\xfcr alle interaktiven Elemente"}),"\n",(0,t.jsx)(n.li,{children:"Verbesserte Tastaturnavigation f\xfcr alle Formularelemente"}),"\n",(0,t.jsx)(n.li,{children:"Korrekte Verkn\xfcpfung von Labels und Formularfeldern"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"screenreader-unterst\xfctzung",children:"Screenreader-Unterst\xfctzung"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Versteckte Labels mit ",(0,t.jsx)(n.code,{children:"sr-only"}),"-Klassen f\xfcr visuelle Layouts ohne sichtbare Labels"]}),"\n",(0,t.jsx)(n.li,{children:"Versteckte Hilfetexte f\xfcr zus\xe4tzliche Informationen"}),"\n",(0,t.jsx)(n.li,{children:"Ank\xfcndigungen f\xfcr Status\xe4nderungen"}),"\n",(0,t.jsx)(n.li,{children:"Beschreibende Texte f\xfcr Icons und Aktionen"}),"\n",(0,t.jsx)(n.li,{children:"Z\xe4hler mit zus\xe4tzlichen Informationen f\xfcr Screenreader"}),"\n",(0,t.jsx)(n.li,{children:"Fortschrittsbalken mit zus\xe4tzlichen Informationen f\xfcr Screenreader"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"formular-validierung",children:"Formular-Validierung"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Barrierefreie Fehlermeldungen mit korrekten ARIA-Attributen"}),"\n",(0,t.jsx)(n.li,{children:"Visuelle und textuelle Darstellung von Validierungszust\xe4nden"}),"\n",(0,t.jsx)(n.li,{children:"Sofortige R\xfcckmeldung bei Validierungsfehlern"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"zus\xe4tzliche-funktionen",children:"Zus\xe4tzliche Funktionen"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Barrierefreier Z\xe4hler mit zus\xe4tzlichen Informationen f\xfcr Screenreader"}),"\n",(0,t.jsx)(n.li,{children:"Barrierefreier Fortschrittsbalken mit korrekten ARIA-Attributen"}),"\n",(0,t.jsx)(n.li,{children:"Barrierefreie Tooltips mit korrekten ARIA-Attributen"}),"\n",(0,t.jsx)(n.li,{children:"Barrierefreie Indikatoren f\xfcr Erfolg, Fehler und Ladezustand"}),"\n",(0,t.jsx)(n.li,{children:"Verschiedene Label-Positionen mit korrekter semantischer Struktur"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"beispiel-implementierung",children:"Beispiel-Implementierung"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:'<FormFieldA11y \n  label="Email" \n  helperText="Ihre gesch\xe4ftliche Email-Adresse" \n  component={Input}\n  type="email"\n  required\n/>\n\n<FormFieldA11y \n  label="Beschreibung"\n  component={TextArea}\n  showCounter\n  maxLength={200}\n  description="Beschreiben Sie Ihr Anliegen"\n/>\n\n<FormFieldA11y \n  label="Profilbild"\n  component={FileUpload}\n  loading={uploading}\n  showProgressBar\n  progress={uploadProgress}\n  progressMax={100}\n/>\n'})}),"\n",(0,t.jsx)(n.h2,{id:"barrierefreiheitstests",children:"Barrierefreiheitstests"}),"\n",(0,t.jsx)(n.p,{children:"Die FormField-Komponente wurde mit folgenden Tests auf Barrierefreiheit gepr\xfcft:"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Automatisierte Tests"})," mit jest-axe zur \xdcberpr\xfcfung der ARIA-Attribute"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Tastaturnavigation"})," zur Sicherstellung der vollst\xe4ndigen Bedienbarkeit ohne Maus"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Screenreader-Tests"})," zur \xdcberpr\xfcfung der korrekten Ank\xfcndigungen"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Fokus-Management-Tests"})," zur Sicherstellung der korrekten Fokusreihenfolge"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"bekannte-einschr\xe4nkungen",children:"Bekannte Einschr\xe4nkungen"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Bei komplexen Formularen mit vielen Elementen kann die Tastaturnavigation umst\xe4ndlich werden"}),"\n",(0,t.jsx)(n.li,{children:"Die Fortschrittsanzeige ist rein visuell und muss manuell aktualisiert werden"}),"\n",(0,t.jsx)(n.li,{children:"Die Validierungslogik muss vom Entwickler implementiert werden"}),"\n",(0,t.jsx)(n.li,{children:"Bei Verwendung von benutzerdefinierten Formularfeldern m\xfcssen diese selbst barrierefrei sein"}),"\n",(0,t.jsx)(n.li,{children:"Die Komponente ist stark abh\xe4ngig von der ValidationFormField-Komponente"}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},8453:(e,n,r)=>{r.d(n,{R:()=>s,x:()=>d});var i=r(6540);const t={},l=i.createContext(t);function s(e){const n=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),i.createElement(l.Provider,{value:n},e.children)}}}]);