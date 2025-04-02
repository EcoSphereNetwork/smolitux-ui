"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5756],{3131:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>u,frontMatter:()=>d,metadata:()=>r,toc:()=>a});const r=JSON.parse('{"id":"accessibility/components/fade","title":"Fade Barrierefreiheit","description":"Implementierte Verbesserungen","source":"@site/docs/accessibility/components/fade.md","sourceDirName":"accessibility/components","slug":"/accessibility/components/fade","permalink":"/smolitux-ui/en/docs/accessibility/components/fade","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/accessibility/components/fade.md","tags":[],"version":"current","frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"Dropdown Barrierefreiheit","permalink":"/smolitux-ui/en/docs/accessibility/components/dropdown"},"next":{"title":"FileUpload Barrierefreiheit","permalink":"/smolitux-ui/en/docs/accessibility/components/fileupload"}}');var t=i(4848),s=i(8453);const d={},l="Fade Barrierefreiheit",c={},a=[{value:"Implementierte Verbesserungen",id:"implementierte-verbesserungen",level:2},{value:"ARIA-Attribute",id:"aria-attribute",level:3},{value:"Reduzierte Bewegung",id:"reduzierte-bewegung",level:3},{value:"Screenreader-Unterst\xfctzung",id:"screenreader-unterst\xfctzung",level:3},{value:"Beispiel-Implementierung",id:"beispiel-implementierung",level:2},{value:"Barrierefreiheitstests",id:"barrierefreiheitstests",level:2},{value:"Bekannte Einschr\xe4nkungen",id:"bekannte-einschr\xe4nkungen",level:2}];function o(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"fade-barrierefreiheit",children:"Fade Barrierefreiheit"})}),"\n",(0,t.jsx)(n.h2,{id:"implementierte-verbesserungen",children:"Implementierte Verbesserungen"}),"\n",(0,t.jsx)(n.p,{children:"Die Fade-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:"}),"\n",(0,t.jsx)(n.h3,{id:"aria-attribute",children:"ARIA-Attribute"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-live"})," - Informiert Screenreader \xfcber \xc4nderungen im Inhalt"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-atomic"})," - Gibt an, ob der gesamte Inhalt oder nur \xc4nderungen angek\xfcndigt werden sollen"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-relevant"})," - Gibt an, welche Arten von \xc4nderungen angek\xfcndigt werden sollen"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-busy"})," - Zeigt an, dass sich der Inhalt gerade \xe4ndert"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-describedby"})," - Verkn\xfcpft eine Beschreibung der Animation mit dem Element"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"reduzierte-bewegung",children:"Reduzierte Bewegung"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Respektiert die Einstellung ",(0,t.jsx)(n.code,{children:"prefers-reduced-motion"})," des Benutzers"]}),"\n",(0,t.jsx)(n.li,{children:"Deaktiviert Animationen, wenn der Benutzer reduzierte Bewegung bevorzugt"}),"\n",(0,t.jsx)(n.li,{children:"Bietet eine Option, um Animationen manuell zu deaktivieren"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"screenreader-unterst\xfctzung",children:"Screenreader-Unterst\xfctzung"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Beschreibende Texte f\xfcr Animationen"}),"\n",(0,t.jsxs)(n.li,{children:["Versteckte Hilfstexte mit ",(0,t.jsx)(n.code,{children:"sr-only"}),"-Klassen"]}),"\n",(0,t.jsx)(n.li,{children:"Ank\xfcndigungen von Status-\xc4nderungen"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"beispiel-implementierung",children:"Beispiel-Implementierung"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:'<Fade \n  in={isVisible} \n  aria-label="Inhalt" \n  animationDescription="Inhalt wird ein- oder ausgeblendet"\n  respectReducedMotion={true}\n>\n  <div>Inhalt, der ein- und ausgeblendet wird</div>\n</Fade>\n'})}),"\n",(0,t.jsx)(n.h2,{id:"barrierefreiheitstests",children:"Barrierefreiheitstests"}),"\n",(0,t.jsx)(n.p,{children:"Die Fade-Komponente wurde mit folgenden Tests auf Barrierefreiheit gepr\xfcft:"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Automatisierte Tests"})," mit jest-axe zur \xdcberpr\xfcfung der ARIA-Attribute"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Screenreader-Tests"})," zur \xdcberpr\xfcfung der korrekten Ank\xfcndigungen"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Reduzierte-Bewegung-Tests"})," zur Sicherstellung, dass Animationen deaktiviert werden k\xf6nnen"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"bekannte-einschr\xe4nkungen",children:"Bekannte Einschr\xe4nkungen"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Einige \xe4ltere Screenreader k\xf6nnen Probleme mit dynamischen Inhalten haben"}),"\n",(0,t.jsxs)(n.li,{children:["Die Erkennung von ",(0,t.jsx)(n.code,{children:"prefers-reduced-motion"})," funktioniert nur im Browser, nicht bei serverseitigem Rendering"]}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>d,x:()=>l});var r=i(6540);const t={},s=r.createContext(t);function d(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:d(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);