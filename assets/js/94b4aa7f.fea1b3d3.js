"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2111],{2724:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>u,frontMatter:()=>l,metadata:()=>r,toc:()=>a});const r=JSON.parse('{"id":"accessibility/components/zoom","title":"Zoom Barrierefreiheit","description":"Implementierte Verbesserungen","source":"@site/docs/accessibility/components/zoom.md","sourceDirName":"accessibility/components","slug":"/accessibility/components/zoom","permalink":"/smolitux-ui/docs/accessibility/components/zoom","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/accessibility/components/zoom.md","tags":[],"version":"current","frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"TimePicker Barrierefreiheit","permalink":"/smolitux-ui/docs/accessibility/components/timepicker"},"next":{"title":"Sprachsteuerung: Komponenten-Integration","permalink":"/smolitux-ui/docs/features/voice-control/component-integration"}}');var t=i(4848),s=i(8453);const l={},o="Zoom Barrierefreiheit",d={},a=[{value:"Implementierte Verbesserungen",id:"implementierte-verbesserungen",level:2},{value:"ARIA-Attribute",id:"aria-attribute",level:3},{value:"Reduzierte Bewegung",id:"reduzierte-bewegung",level:3},{value:"Epilepsie-Sicherheit",id:"epilepsie-sicherheit",level:3},{value:"Screenreader-Unterst\xfctzung",id:"screenreader-unterst\xfctzung",level:3},{value:"Beispiel-Implementierung",id:"beispiel-implementierung",level:2},{value:"Barrierefreiheitstests",id:"barrierefreiheitstests",level:2},{value:"Bekannte Einschr\xe4nkungen",id:"bekannte-einschr\xe4nkungen",level:2}];function c(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"zoom-barrierefreiheit",children:"Zoom Barrierefreiheit"})}),"\n",(0,t.jsx)(n.h2,{id:"implementierte-verbesserungen",children:"Implementierte Verbesserungen"}),"\n",(0,t.jsx)(n.p,{children:"Die Zoom-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:"}),"\n",(0,t.jsx)(n.h3,{id:"aria-attribute",children:"ARIA-Attribute"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-label"})," - Bietet eine Beschreibung der Animation"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-labelledby"})," - Verkn\xfcpft ein Label mit der Animation"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-describedby"})," - Verkn\xfcpft eine ausf\xfchrliche Beschreibung mit der Animation"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-hidden"})," - Versteckt die Animation vor Screenreadern, wenn n\xf6tig"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-live"})," - Definiert eine Live-Region f\xfcr Ank\xfcndigungen der Animation"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-atomic"})," - Definiert, ob die Live-Region als Ganzes aktualisiert wird"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-relevant"})," - Definiert, welche \xc4nderungen in der Live-Region relevant sind"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-busy"})," - Zeigt an, ob die Animation im Ladezustand ist"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"aria-roledescription"})," - Bietet eine benutzerdefinierte Rollenbeschreibung"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"reduzierte-bewegung",children:"Reduzierte Bewegung"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Respektiert die Einstellung ",(0,t.jsx)(n.code,{children:"prefers-reduced-motion"})," des Benutzers"]}),"\n",(0,t.jsx)(n.li,{children:"Deaktiviert Animationen automatisch, wenn der Benutzer reduzierte Bewegung bevorzugt"}),"\n",(0,t.jsx)(n.li,{children:"Bietet eine sofortige Darstellung ohne \xdcbergangseffekte f\xfcr Benutzer mit Bewegungsempfindlichkeit"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"epilepsie-sicherheit",children:"Epilepsie-Sicherheit"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Option zur Begrenzung der Animationsgeschwindigkeit f\xfcr Benutzer mit Epilepsie"}),"\n",(0,t.jsx)(n.li,{children:"Mindestdauer f\xfcr Animationen, um schnelle Blitzeffekte zu vermeiden"}),"\n",(0,t.jsx)(n.li,{children:"Sanftere \xdcberg\xe4nge f\xfcr mehr Sicherheit"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"screenreader-unterst\xfctzung",children:"Screenreader-Unterst\xfctzung"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Ank\xfcndigung von Animationen f\xfcr Screenreader"}),"\n",(0,t.jsx)(n.li,{children:"Benutzerdefinierte Ank\xfcndigungen f\xfcr Ein- und Ausblendungen"}),"\n",(0,t.jsx)(n.li,{children:"Versteckte Beschreibungen f\xfcr zus\xe4tzliche Informationen"}),"\n",(0,t.jsx)(n.li,{children:"Semantisch korrekte Struktur mit anpassbarem HTML-Element"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"beispiel-implementierung",children:"Beispiel-Implementierung"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:'// Einfache Zoom-Animation\n<ZoomA11y \n  in={isVisible} \n  scale={0.5}\n>\n  <div>Animierter Inhalt</div>\n</ZoomA11y>\n\n// Mit Screenreader-Ank\xfcndigungen\n<ZoomA11y \n  in={isVisible} \n  scale={0.75}\n  announceAnimation\n  enterAnnouncement="Inhalt wird eingeblendet"\n  exitAnnouncement="Inhalt wird ausgeblendet"\n  ariaLive="polite"\n>\n  <div>Animierter Inhalt mit Ank\xfcndigung</div>\n</ZoomA11y>\n\n// Mit reduzierter Bewegung\n<ZoomA11y \n  in={isVisible} \n  scale={0.5}\n  respectReducedMotion\n>\n  <div>Animierter Inhalt mit reduzierter Bewegung</div>\n</ZoomA11y>\n\n// Mit Epilepsie-Sicherheit\n<ZoomA11y \n  in={isVisible} \n  scale={0.5}\n  epilepsySafe\n>\n  <div>Animierter Inhalt mit Epilepsie-Sicherheit</div>\n</ZoomA11y>\n\n// Mit semantischem HTML-Element\n<ZoomA11y \n  in={isVisible} \n  scale={0.5}\n  as="section"\n  ariaLabel="Animierter Abschnitt"\n>\n  <div>Animierter Inhalt in einem semantischen Element</div>\n</ZoomA11y>\n\n// Mit ARIA-Attributen\n<ZoomA11y \n  in={isVisible} \n  scale={0.5}\n  ariaLabel="Animierter Inhalt"\n  ariaLive="assertive"\n  ariaAtomic={true}\n  ariaRoledescription="Zoom-Animation"\n>\n  <div>Animierter Inhalt mit ARIA-Attributen</div>\n</ZoomA11y>\n\n// Mit Callbacks\n<ZoomA11y \n  in={isVisible} \n  scale={0.5}\n  onEnter={() => console.log(\'Animation startet\')}\n  onEntered={() => console.log(\'Animation abgeschlossen\')}\n  onExit={() => console.log(\'Ausblenden startet\')}\n  onExited={() => console.log(\'Ausblenden abgeschlossen\')}\n>\n  <div>Animierter Inhalt mit Callbacks</div>\n</ZoomA11y>\n\n// Mit direkter Anwendung auf ein Element\n<ZoomA11y \n  in={isVisible} \n  scale={0.5}\n  ariaLabel="Animierter Button"\n>\n  <button onClick={handleClick}>Klick mich</button>\n</ZoomA11y>\n'})}),"\n",(0,t.jsx)(n.h2,{id:"barrierefreiheitstests",children:"Barrierefreiheitstests"}),"\n",(0,t.jsx)(n.p,{children:"Die Zoom-Komponente wurde mit folgenden Tests auf Barrierefreiheit gepr\xfcft:"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Automatisierte Tests"})," mit jest-axe zur \xdcberpr\xfcfung der ARIA-Attribute"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Reduzierte-Bewegung-Tests"})," zur \xdcberpr\xfcfung der Respektierung von ",(0,t.jsx)(n.code,{children:"prefers-reduced-motion"})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Epilepsie-Sicherheits-Tests"})," zur \xdcberpr\xfcfung der Animationsgeschwindigkeit"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Screenreader-Tests"})," zur \xdcberpr\xfcfung der korrekten Ank\xfcndigungen"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Visuelle Tests"})," zur \xdcberpr\xfcfung der Animation und des Verhaltens"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"bekannte-einschr\xe4nkungen",children:"Bekannte Einschr\xe4nkungen"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Die Komponente unterst\xfctzt derzeit keine automatische Anpassung der Animation basierend auf der Bildschirmgr\xf6\xdfe"}),"\n",(0,t.jsx)(n.li,{children:"Die Komponente unterst\xfctzt derzeit keine automatische Anpassung der Animation basierend auf der Verbindungsgeschwindigkeit"}),"\n",(0,t.jsx)(n.li,{children:"Die Komponente unterst\xfctzt derzeit keine automatische Anpassung der Animation basierend auf der Batteriekapazit\xe4t"}),"\n",(0,t.jsx)(n.li,{children:"Die Komponente unterst\xfctzt derzeit keine automatische Anpassung der Animation basierend auf der Prozessorleistung"}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>l,x:()=>o});var r=i(6540);const t={},s=r.createContext(t);function l(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);