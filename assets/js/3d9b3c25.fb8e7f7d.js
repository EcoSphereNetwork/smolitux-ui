"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6938],{8453:(e,n,r)=>{r.d(n,{R:()=>i,x:()=>s});var d=r(6540);const t={},a=d.createContext(t);function i(e){const n=d.useContext(a);return d.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),d.createElement(a.Provider,{value:n},e.children)}},8906:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>h,frontMatter:()=>i,metadata:()=>d,toc:()=>c});const d=JSON.parse('{"id":"components/layout/card","title":"Card","description":"Die Card-Komponente wird verwendet, um Inhalte in einem abgegrenzten Container zu pr\xe4sentieren. Sie eignet sich ideal f\xfcr Dashboards, Listen und \xdcbersichten.","source":"@site/docs/components/layout/card.md","sourceDirName":"components/layout","slug":"/components/layout/card","permalink":"/smolitux-ui/docs/components/layout/card","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/components/layout/card.md","tags":[],"version":"current","frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"Components Overview","permalink":"/smolitux-ui/docs/components/overview"},"next":{"title":"Card-Komponente: Barrierefreiheit","permalink":"/smolitux-ui/docs/components/layout/card/accessibility"}}');var t=r(4848),a=r(8453);const i={},s="Card",l={},c=[{value:"Import",id:"import",level:2},{value:"Verwendung",id:"verwendung",level:2},{value:"Einfache Card",id:"einfache-card",level:3},{value:"Card mit Titel",id:"card-mit-titel",level:3},{value:"Card mit Footer",id:"card-mit-footer",level:3},{value:"Card mit Header-Aktion",id:"card-mit-header-aktion",level:3},{value:"Card ohne Padding",id:"card-ohne-padding",level:3},{value:"Hover-Effekt",id:"hover-effekt",level:3},{value:"Card ohne Rand",id:"card-ohne-rand",level:3},{value:"Props",id:"props",level:2},{value:"Beispiele",id:"beispiele",level:2},{value:"Produkt-Card",id:"produkt-card",level:3},{value:"Profil-Card",id:"profil-card",level:3},{value:"Dashboard-Card",id:"dashboard-card",level:3},{value:"Interaktive Card mit Zustand",id:"interaktive-card-mit-zustand",level:3},{value:"Card-Grid",id:"card-grid",level:3}];function o(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,a.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"card",children:"Card"})}),"\n",(0,t.jsx)(n.p,{children:"Die Card-Komponente wird verwendet, um Inhalte in einem abgegrenzten Container zu pr\xe4sentieren. Sie eignet sich ideal f\xfcr Dashboards, Listen und \xdcbersichten."}),"\n",(0,t.jsx)(n.h2,{id:"import",children:"Import"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"import { Card } from '@smolitux/core';\n"})}),"\n",(0,t.jsx)(n.h2,{id:"verwendung",children:"Verwendung"}),"\n",(0,t.jsx)(n.h3,{id:"einfache-card",children:"Einfache Card"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"<Card>\n  <p>Dies ist eine einfache Card mit Inhalt.</p>\n</Card>\n"})}),"\n",(0,t.jsx)(n.h3,{id:"card-mit-titel",children:"Card mit Titel"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:'<Card title="Meine Card">\n  <p>Dies ist eine Card mit einem Titel.</p>\n</Card>\n'})}),"\n",(0,t.jsx)(n.h3,{id:"card-mit-footer",children:"Card mit Footer"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:'<Card \n  title="Meine Card"\n  footer={\n    <div className="flex justify-end">\n      <button className="px-4 py-2 bg-primary-500 text-white rounded">Speichern</button>\n    </div>\n  }\n>\n  <p>Dies ist eine Card mit einem Footer.</p>\n</Card>\n'})}),"\n",(0,t.jsx)(n.h3,{id:"card-mit-header-aktion",children:"Card mit Header-Aktion"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:'<Card \n  title="Meine Card"\n  headerAction={\n    <button className="text-gray-500 hover:text-gray-700">\n      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />\n      </svg>\n    </button>\n  }\n>\n  <p>Dies ist eine Card mit einer Header-Aktion.</p>\n</Card>\n'})}),"\n",(0,t.jsx)(n.h3,{id:"card-ohne-padding",children:"Card ohne Padding"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:'<Card title="Ohne Padding" noPadding>\n  <img src="https://via.placeholder.com/400x200" alt="Platzhalterbild" className="w-full" />\n  <div className="p-4">\n    <p>Der Inhalt hat kein Padding, aber wir k\xf6nnen es manuell hinzuf\xfcgen.</p>\n  </div>\n</Card>\n'})}),"\n",(0,t.jsx)(n.h3,{id:"hover-effekt",children:"Hover-Effekt"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"<Card hoverable>\n  <p>Bewegen Sie den Mauszeiger \xfcber diese Card, um den Hover-Effekt zu sehen.</p>\n</Card>\n"})}),"\n",(0,t.jsx)(n.h3,{id:"card-ohne-rand",children:"Card ohne Rand"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"<Card bordered={false}>\n  <p>Diese Card hat keinen Rand, nur einen Schatten.</p>\n</Card>\n"})}),"\n",(0,t.jsx)(n.h2,{id:"props",children:"Props"}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:"Prop"}),(0,t.jsx)(n.th,{children:"Typ"}),(0,t.jsx)(n.th,{children:"Standard"}),(0,t.jsx)(n.th,{children:"Beschreibung"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"children"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"ReactNode"})}),(0,t.jsx)(n.td,{children:"-"}),(0,t.jsx)(n.td,{children:"Der Inhalt der Card"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"title"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"string"})}),(0,t.jsx)(n.td,{children:"-"}),(0,t.jsx)(n.td,{children:"Der Titel der Card"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"className"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"string"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"''"})}),(0,t.jsx)(n.td,{children:"Zus\xe4tzliche CSS-Klassen"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"footer"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"ReactNode"})}),(0,t.jsx)(n.td,{children:"-"}),(0,t.jsx)(n.td,{children:"Der Inhalt des Footers"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"noPadding"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"boolean"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"false"})}),(0,t.jsx)(n.td,{children:"Entfernt das Padding im Inhaltsbereich"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"hoverable"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"boolean"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"false"})}),(0,t.jsx)(n.td,{children:"Aktiviert einen Hover-Effekt"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"bordered"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"boolean"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"true"})}),(0,t.jsx)(n.td,{children:"Zeigt einen Rand um die Card an"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"headerAction"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"ReactNode"})}),(0,t.jsx)(n.td,{children:"-"}),(0,t.jsx)(n.td,{children:"Aktion im Header (z.B. Button oder Icon)"})]})]})]}),"\n",(0,t.jsx)(n.h2,{id:"beispiele",children:"Beispiele"}),"\n",(0,t.jsx)(n.h3,{id:"produkt-card",children:"Produkt-Card"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:'<Card \n  noPadding \n  hoverable\n  className="max-w-xs"\n>\n  <img src="/product-image.jpg" alt="Produkt" className="w-full h-48 object-cover" />\n  <div className="p-4">\n    <h3 className="text-lg font-semibold">Produktname</h3>\n    <p className="text-gray-600 mt-1">Kurze Produktbeschreibung hier.</p>\n    <div className="mt-4 flex items-center justify-between">\n      <span className="text-xl font-bold">\u20ac49,99</span>\n      <button className="px-3 py-1 bg-primary-500 text-white rounded">\n        In den Warenkorb\n      </button>\n    </div>\n  </div>\n</Card>\n'})}),"\n",(0,t.jsx)(n.h3,{id:"profil-card",children:"Profil-Card"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:'<Card className="max-w-md">\n  <div className="flex items-center">\n    <img \n      src="/avatar.jpg" \n      alt="Profilbild" \n      className="w-16 h-16 rounded-full object-cover"\n    />\n    <div className="ml-4">\n      <h3 className="text-lg font-semibold">Max Mustermann</h3>\n      <p className="text-gray-600">Software-Entwickler</p>\n    </div>\n  </div>\n  \n  <div className="mt-4">\n    <h4 className="font-medium text-gray-700">\xdcber mich</h4>\n    <p className="mt-2 text-gray-600">\n      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, \n      nisl eget ultricies tincidunt, nisl nisl aliquam nisl.\n    </p>\n  </div>\n  \n  <div className="mt-4 flex space-x-2">\n    <button className="px-3 py-1 bg-primary-500 text-white rounded">\n      Folgen\n    </button>\n    <button className="px-3 py-1 border border-gray-300 rounded">\n      Nachricht\n    </button>\n  </div>\n</Card>\n'})}),"\n",(0,t.jsx)(n.h3,{id:"dashboard-card",children:"Dashboard-Card"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:'<Card \n  title="Verkaufs\xfcbersicht" \n  headerAction={\n    <div className="flex space-x-2">\n      <select className="text-sm border rounded px-2 py-1">\n        <option>Diese Woche</option>\n        <option>Dieser Monat</option>\n        <option>Dieses Jahr</option>\n      </select>\n      <button className="text-gray-500 hover:text-gray-700">\n        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />\n        </svg>\n      </button>\n    </div>\n  }\n  footer={\n    <div className="text-sm text-gray-500">\n      Letzte Aktualisierung: vor 5 Minuten\n    </div>\n  }\n>\n  <div className="flex justify-between items-center">\n    <div>\n      <p className="text-gray-500">Gesamtumsatz</p>\n      <p className="text-2xl font-bold">\u20ac24.532</p>\n      <p className="text-green-500 text-sm">+12% gegen\xfcber Vorwoche</p>\n    </div>\n    \n    <div className="h-16 w-32 bg-gray-100 rounded">\n      {/* Hier k\xf6nnte ein Chart sein */}\n      <div className="h-full w-full flex items-center justify-center text-gray-400">\n        Chart\n      </div>\n    </div>\n  </div>\n</Card>\n'})}),"\n",(0,t.jsx)(n.h3,{id:"interaktive-card-mit-zustand",children:"Interaktive Card mit Zustand"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:'function ExpandableCard() {\n  const [isExpanded, setIsExpanded] = useState(false);\n  \n  return (\n    <Card \n      title="Erweiterbarer Inhalt"\n      headerAction={\n        <button \n          onClick={() => setIsExpanded(!isExpanded)}\n          className="text-gray-500 hover:text-gray-700"\n        >\n          {isExpanded ? (\n            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />\n            </svg>\n          ) : (\n            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />\n            </svg>\n          )}\n        </button>\n      }\n    >\n      <p>Dies ist der immer sichtbare Inhalt.</p>\n      \n      {isExpanded && (\n        <div className="mt-4 pt-4 border-t">\n          <p>Dies ist der erweiterte Inhalt, der nur angezeigt wird, wenn die Card erweitert ist.</p>\n          <p className="mt-2">Hier k\xf6nnen weitere Details oder Informationen angezeigt werden.</p>\n        </div>\n      )}\n    </Card>\n  );\n}\n'})}),"\n",(0,t.jsx)(n.h3,{id:"card-grid",children:"Card-Grid"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:'<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">\n  <Card title="Card 1">\n    <p>Inhalt f\xfcr Card 1</p>\n  </Card>\n  \n  <Card title="Card 2">\n    <p>Inhalt f\xfcr Card 2</p>\n  </Card>\n  \n  <Card title="Card 3">\n    <p>Inhalt f\xfcr Card 3</p>\n  </Card>\n  \n  <Card title="Card 4">\n    <p>Inhalt f\xfcr Card 4</p>\n  </Card>\n  \n  <Card title="Card 5">\n    <p>Inhalt f\xfcr Card 5</p>\n  </Card>\n  \n  <Card title="Card 6">\n    <p>Inhalt f\xfcr Card 6</p>\n  </Card>\n</div>\n'})})]})}function h(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}}}]);