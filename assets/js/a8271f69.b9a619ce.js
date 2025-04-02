"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3375],{7163:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>h,frontMatter:()=>l,metadata:()=>r,toc:()=>a});const r=JSON.parse('{"id":"accessibility/components/timepicker","title":"TimePicker Barrierefreiheit","description":"Implementierte Verbesserungen","source":"@site/docs/accessibility/components/timepicker.md","sourceDirName":"accessibility/components","slug":"/accessibility/components/timepicker","permalink":"/smolitux-ui/docs/accessibility/components/timepicker","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/accessibility/components/timepicker.md","tags":[],"version":"current","frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"TextArea Barrierefreiheit","permalink":"/smolitux-ui/docs/accessibility/components/textarea"},"next":{"title":"Zoom Barrierefreiheit","permalink":"/smolitux-ui/docs/accessibility/components/zoom"}}');var t=i(4848),s=i(8453);const l={},c="TimePicker Barrierefreiheit",d={},a=[{value:"Implementierte Verbesserungen",id:"implementierte-verbesserungen",level:2},{value:"ARIA-Attribute",id:"aria-attribute",level:3},{value:"Tastaturunterst\xfctzung",id:"tastaturunterst\xfctzung",level:3},{value:"Screenreader-Unterst\xfctzung",id:"screenreader-unterst\xfctzung",level:3},{value:"Zus\xe4tzliche Funktionen",id:"zus\xe4tzliche-funktionen",level:3},{value:"Beispiel-Implementierung",id:"beispiel-implementierung",level:2},{value:"Barrierefreiheitstests",id:"barrierefreiheitstests",level:2},{value:"Bekannte Einschr\xe4nkungen",id:"bekannte-einschr\xe4nkungen",level:2}];function o(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"timepicker-barrierefreiheit",children:"TimePicker Barrierefreiheit"})}),"\n",(0,t.jsx)(n.h2,{id:"implementierte-verbesserungen",children:"Implementierte Verbesserungen"}),"\n",(0,t.jsx)(n.p,{children:"Die TimePicker-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:"}),"\n",(0,t.jsx)(n.h3,{id:"aria-attribute",children:"ARIA-Attribute"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-label"})," - Bietet eine Beschreibung des TimePickers"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-labelledby"})," - Verkn\xfcpft ein Label mit dem TimePicker"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-describedby"})," - Verkn\xfcpft eine ausf\xfchrliche Beschreibung mit dem TimePicker"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-expanded"})," - Zeigt an, ob das Popup ge\xf6ffnet ist"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-haspopup"})," - Zeigt an, dass der TimePicker ein Popup hat"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-controls"})," - Verkn\xfcpft den TimePicker mit dem Popup"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-invalid"})," - Zeigt an, ob der TimePicker ung\xfcltig ist"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-required"})," - Zeigt an, ob der TimePicker erforderlich ist"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-readonly"})," - Zeigt an, ob der TimePicker schreibgesch\xfctzt ist"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-busy"})," - Zeigt an, ob der TimePicker im Ladezustand ist"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'role="dialog"'})," - Definiert das Popup als Dialog"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'role="listbox"'})," - Definiert die Listen im Popup als Listboxen"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'role="option"'})," - Definiert die Elemente in den Listen als Optionen"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-selected"})," - Zeigt an, welche Option ausgew\xe4hlt ist"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-activedescendant"})," - Verkn\xfcpft die Listbox mit der aktuell fokussierten Option"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"tastaturunterst\xfctzung",children:"Tastaturunterst\xfctzung"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\xd6ffnen des Popups mit Enter oder Leertaste"}),"\n",(0,t.jsx)(n.li,{children:"Schlie\xdfen des Popups mit Escape"}),"\n",(0,t.jsx)(n.li,{children:"Navigation zwischen den Abschnitten (Stunden, Minuten, Sekunden, Periode) mit Tab"}),"\n",(0,t.jsx)(n.li,{children:"Navigation innerhalb der Abschnitte mit Pfeiltasten"}),"\n",(0,t.jsx)(n.li,{children:"Sprung zum Anfang/Ende der Liste mit Home/End"}),"\n",(0,t.jsx)(n.li,{children:"Auswahl einer Option mit Enter oder Leertaste"}),"\n",(0,t.jsx)(n.li,{children:"Visuelle Fokus-Indikatoren f\xfcr alle interaktiven Elemente"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"screenreader-unterst\xfctzung",children:"Screenreader-Unterst\xfctzung"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Versteckte Beschreibungen f\xfcr zus\xe4tzliche Informationen"}),"\n",(0,t.jsx)(n.li,{children:"Live-Regionen f\xfcr Status\xe4nderungen"}),"\n",(0,t.jsx)(n.li,{children:"Ank\xfcndigung von Zeit\xe4nderungen"}),"\n",(0,t.jsx)(n.li,{children:"Korrekte Ank\xfcndigung von Fehlermeldungen"}),"\n",(0,t.jsx)(n.li,{children:"Screenreader-Anweisungen zur Bedienung des TimePickers"}),"\n",(0,t.jsx)(n.li,{children:"Korrekte Beschriftung aller Abschnitte und Optionen"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"zus\xe4tzliche-funktionen",children:"Zus\xe4tzliche Funktionen"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Unterst\xfctzung f\xfcr 12h- und 24h-Format"}),"\n",(0,t.jsx)(n.li,{children:"Unterst\xfctzung f\xfcr verschiedene Gr\xf6\xdfen"}),"\n",(0,t.jsx)(n.li,{children:"Unterst\xfctzung f\xfcr Fehler-, Erfolgs- und Ladezust\xe4nde"}),"\n",(0,t.jsx)(n.li,{children:"Unterst\xfctzung f\xfcr Hilfetext und Beschreibungen"}),"\n",(0,t.jsx)(n.li,{children:"Unterst\xfctzung f\xfcr benutzerdefinierte Icons"}),"\n",(0,t.jsx)(n.li,{children:"Unterst\xfctzung f\xfcr Zeitintervalle (minuteStep, secondStep)"}),"\n",(0,t.jsx)(n.li,{children:"Unterst\xfctzung f\xfcr Min- und Max-Zeit"}),"\n",(0,t.jsx)(n.li,{children:"Unterst\xfctzung f\xfcr optionale Sekunden (hideSeconds)"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"beispiel-implementierung",children:"Beispiel-Implementierung"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:'// Einfacher TimePicker\n<TimePickerA11y\n  label="Uhrzeit"\n  format="24h"\n  onChange={(time) => console.log(time)}\n  ariaLabel="Uhrzeit ausw\xe4hlen"\n/>\n\n// TimePicker mit 12h-Format\n<TimePickerA11y\n  label="Uhrzeit"\n  format="12h"\n  onChange={(time) => console.log(time)}\n  ariaLabel="Uhrzeit ausw\xe4hlen"\n  helperText="Format: HH:MM AM/PM"\n/>\n\n// TimePicker ohne Sekunden\n<TimePickerA11y\n  label="Uhrzeit"\n  hideSeconds\n  onChange={(time) => console.log(time)}\n  ariaLabel="Uhrzeit ausw\xe4hlen"\n  helperText="Format: HH:MM"\n/>\n\n// TimePicker mit Zeitintervallen\n<TimePickerA11y\n  label="Uhrzeit"\n  minuteStep={15}\n  secondStep={15}\n  onChange={(time) => console.log(time)}\n  ariaLabel="Uhrzeit ausw\xe4hlen"\n  helperText="15-Minuten-Intervalle"\n/>\n\n// TimePicker mit Min- und Max-Zeit\n<TimePickerA11y\n  label="Uhrzeit"\n  minTime="09:00"\n  maxTime="17:00"\n  onChange={(time) => console.log(time)}\n  ariaLabel="Uhrzeit ausw\xe4hlen"\n  helperText="Gesch\xe4ftszeiten: 9:00 - 17:00 Uhr"\n/>\n\n// TimePicker mit Icon\n<TimePickerA11y\n  label="Uhrzeit"\n  leftIcon={<ClockIcon />}\n  onChange={(time) => console.log(time)}\n  ariaLabel="Uhrzeit ausw\xe4hlen"\n/>\n\n// TimePicker mit Fehlermeldung\n<TimePickerA11y\n  label="Uhrzeit"\n  error="Bitte geben Sie eine g\xfcltige Uhrzeit ein"\n  onChange={(time) => console.log(time)}\n  ariaLabel="Uhrzeit ausw\xe4hlen"\n/>\n'})}),"\n",(0,t.jsx)(n.h2,{id:"barrierefreiheitstests",children:"Barrierefreiheitstests"}),"\n",(0,t.jsx)(n.p,{children:"Die TimePicker-Komponente wurde mit folgenden Tests auf Barrierefreiheit gepr\xfcft:"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Automatisierte Tests"})," mit jest-axe zur \xdcberpr\xfcfung der ARIA-Attribute"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Tastatur-Tests"})," zur \xdcberpr\xfcfung der Tastaturnavigation und -bedienung"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Screenreader-Tests"})," zur \xdcberpr\xfcfung der korrekten Ank\xfcndigungen"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Visuelle Tests"})," zur \xdcberpr\xfcfung der Farbkontraste und Fokus-Indikatoren"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"bekannte-einschr\xe4nkungen",children:"Bekannte Einschr\xe4nkungen"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Die Komponente unterst\xfctzt derzeit keine Eingabe per Tastatur direkt im Input-Feld"}),"\n",(0,t.jsx)(n.li,{children:"Die Komponente unterst\xfctzt derzeit keine Zeitzonen"}),"\n",(0,t.jsx)(n.li,{children:"Die Komponente unterst\xfctzt derzeit keine Millisekunden"}),"\n",(0,t.jsx)(n.li,{children:"Die Komponente unterst\xfctzt derzeit keine Kombination mit DatePicker"}),"\n",(0,t.jsx)(n.li,{children:"Die Komponente unterst\xfctzt derzeit keine Lokalisierung der Beschriftungen"}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>l,x:()=>c});var r=i(6540);const t={},s=r.createContext(t);function l(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);