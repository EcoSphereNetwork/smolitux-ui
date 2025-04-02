"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3891],{1345:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>u,frontMatter:()=>l,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"accessibility/components/carousel","title":"Carousel Barrierefreiheit","description":"Implementierte Verbesserungen","source":"@site/docs/accessibility/components/carousel.md","sourceDirName":"accessibility/components","slug":"/accessibility/components/carousel","permalink":"/smolitux-ui/en/docs/accessibility/components/carousel","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/accessibility/components/carousel.md","tags":[],"version":"current","frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"Barrierefreiheit: Komponentenstatus","permalink":"/smolitux-ui/en/docs/accessibility/component-status"},"next":{"title":"ColorPicker Barrierefreiheit","permalink":"/smolitux-ui/en/docs/accessibility/components/colorpicker"}}');var s=i(4848),t=i(8453);const l={},a="Carousel Barrierefreiheit",d={},c=[{value:"Implementierte Verbesserungen",id:"implementierte-verbesserungen",level:2},{value:"ARIA-Attribute",id:"aria-attribute",level:3},{value:"Tastaturnavigation",id:"tastaturnavigation",level:3},{value:"Pause-Funktion",id:"pause-funktion",level:3},{value:"Screenreader-Unterst\xfctzung",id:"screenreader-unterst\xfctzung",level:3},{value:"Beispiel-Implementierung",id:"beispiel-implementierung",level:2},{value:"Barrierefreiheitstests",id:"barrierefreiheitstests",level:2},{value:"Bekannte Einschr\xe4nkungen",id:"bekannte-einschr\xe4nkungen",level:2}];function o(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"carousel-barrierefreiheit",children:"Carousel Barrierefreiheit"})}),"\n",(0,s.jsx)(n.h2,{id:"implementierte-verbesserungen",children:"Implementierte Verbesserungen"}),"\n",(0,s.jsx)(n.p,{children:"Die Carousel-Komponente wurde mit folgenden Barrierefreiheitsverbesserungen aktualisiert:"}),"\n",(0,s.jsx)(n.h3,{id:"aria-attribute",children:"ARIA-Attribute"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:'role="region"'})," - Definiert den Carousel als eigenst\xe4ndigen Bereich"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:'aria-roledescription="carousel"'})," - Beschreibt die Rolle des Elements als Carousel"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"aria-label"})," - Bietet eine beschreibende Bezeichnung f\xfcr das Carousel"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"aria-describedby"})," - Verkn\xfcpft eine detaillierte Beschreibung mit dem Carousel"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"aria-live"})," - Informiert Screenreader \xfcber \xc4nderungen im Carousel"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"F\xfcr die einzelnen Slides:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:'role="tabpanel"'})," - Definiert jeden Slide als Panel"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"aria-hidden"})," - Versteckt inaktive Slides vor Screenreadern"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:'aria-roledescription="slide"'})," - Beschreibt die Rolle des Elements als Slide"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"tabindex"})," - Steuert die Fokussierbarkeit der Slides"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"tastaturnavigation",children:"Tastaturnavigation"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Pfeiltasten (links/rechts) zum Navigieren zwischen Slides"}),"\n",(0,s.jsx)(n.li,{children:"Home/End-Tasten zum Springen zum ersten/letzten Slide"}),"\n",(0,s.jsx)(n.li,{children:"Leertaste zum Pausieren/Fortsetzen der automatischen Wiedergabe"}),"\n",(0,s.jsx)(n.li,{children:"Fokus-Management f\xfcr aktive Slides"}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"pause-funktion",children:"Pause-Funktion"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Pause-Button zum Anhalten der automatischen Wiedergabe"}),"\n",(0,s.jsx)(n.li,{children:"Visuelles Feedback zum aktuellen Wiedergabestatus"}),"\n",(0,s.jsxs)(n.li,{children:["ARIA-Attribute f\xfcr den Pause-Button (",(0,s.jsx)(n.code,{children:"aria-pressed"}),", ",(0,s.jsx)(n.code,{children:"aria-label"}),")"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"screenreader-unterst\xfctzung",children:"Screenreader-Unterst\xfctzung"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Status-Ank\xfcndigungen f\xfcr aktuelle Slide-Position"}),"\n",(0,s.jsx)(n.li,{children:"Beschreibende Texte f\xfcr Screenreader-Benutzer"}),"\n",(0,s.jsxs)(n.li,{children:["Versteckte Hilfstexte mit ",(0,s.jsx)(n.code,{children:"sr-only"}),"-Klassen"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"beispiel-implementierung",children:"Beispiel-Implementierung"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:'<div\n  role="region"\n  aria-label={ariaLabel}\n  aria-roledescription="carousel"\n  aria-describedby={ariaDescription ? ariaDescriptionId : undefined}\n  tabIndex={0}\n  onKeyDown={handleKeyDown}\n>\n  {/* Slides */}\n  <div \n    aria-live={isPaused ? "polite" : "off"}\n  >\n    {items.map((item, index) => (\n      <div \n        key={item.id}\n        id={`${carouselId}-slide-${index}`}\n        role="tabpanel"\n        aria-hidden={activeIndex !== index}\n        aria-label={item.ariaLabel || `Bild ${index + 1}`}\n        aria-roledescription="slide"\n        tabIndex={activeIndex === index ? 0 : -1}\n        data-slide-index={index}\n      >\n        {item.content}\n      </div>\n    ))}\n  </div>\n  \n  {/* Pause-Button */}\n  <button\n    type="button"\n    aria-label={isPaused ? "Wiedergabe starten" : "Wiedergabe pausieren"}\n    aria-pressed={isPaused}\n    onClick={togglePause}\n  >\n    {/* Icon */}\n  </button>\n  \n  {/* Status f\xfcr Screenreader */}\n  <div className="sr-only" aria-live="polite">\n    {`Bild ${activeIndex + 1} von ${totalItems}${isPaused ? \', Wiedergabe pausiert\' : \'\'}`}\n  </div>\n</div>\n'})}),"\n",(0,s.jsx)(n.h2,{id:"barrierefreiheitstests",children:"Barrierefreiheitstests"}),"\n",(0,s.jsx)(n.p,{children:"Die Carousel-Komponente wurde mit folgenden Tests auf Barrierefreiheit gepr\xfcft:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Automatisierte Tests"})," mit jest-axe zur \xdcberpr\xfcfung der ARIA-Attribute"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Tastaturnavigation"})," zur Sicherstellung der vollst\xe4ndigen Bedienbarkeit ohne Maus"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Screenreader-Tests"})," zur \xdcberpr\xfcfung der korrekten Ank\xfcndigungen"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Fokus-Management-Tests"})," zur Sicherstellung der korrekten Fokusreihenfolge"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"bekannte-einschr\xe4nkungen",children:"Bekannte Einschr\xe4nkungen"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Bei sehr komplexen Inhalten in den Slides kann die Tastaturnavigation innerhalb eines Slides schwierig sein"}),"\n",(0,s.jsx)(n.li,{children:"Autoplay sollte standardm\xe4\xdfig deaktiviert sein, um die Barrierefreiheit zu verbessern"}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>l,x:()=>a});var r=i(6540);const s={},t=r.createContext(s);function l(e){const n=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),r.createElement(t.Provider,{value:n},e.children)}}}]);