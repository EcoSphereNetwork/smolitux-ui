"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7453],{4791:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>h,frontMatter:()=>t,metadata:()=>d,toc:()=>c});const d=JSON.parse('{"id":"components/data-display/badge","title":"Badge","description":"Die Badge-Komponente wird verwendet, um Status, Kennzeichnungen oder Z\xe4hler anzuzeigen. Sie ist ideal f\xfcr Benachrichtigungen, Tags oder Labels.","source":"@site/docs/components/data-display/badge.md","sourceDirName":"components/data-display","slug":"/components/data-display/badge","permalink":"/smolitux-ui/en/docs/components/data-display/badge","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/components/data-display/badge.md","tags":[],"version":"current","frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"Avatar-Komponente: Barrierefreiheit","permalink":"/smolitux-ui/en/docs/components/data-display/avatar/accessibility"},"next":{"title":"Badge-Komponente: Barrierefreiheit","permalink":"/smolitux-ui/en/docs/components/data-display/badge/accessibility"}}');var r=i(4848),a=i(8453);const t={},s="Badge",l={},c=[{value:"Import",id:"import",level:2},{value:"Verwendung",id:"verwendung",level:2},{value:"Einfache Badge",id:"einfache-badge",level:3},{value:"Verschiedene Varianten",id:"verschiedene-varianten",level:3},{value:"Verschiedene Gr\xf6\xdfen",id:"verschiedene-gr\xf6\xdfen",level:3},{value:"Abgerundete Badge",id:"abgerundete-badge",level:3},{value:"Badge mit Icon",id:"badge-mit-icon",level:3},{value:"Badge als Z\xe4hler",id:"badge-als-z\xe4hler",level:3},{value:"Badge als Punkt",id:"badge-als-punkt",level:3},{value:"Outline Badge",id:"outline-badge",level:3},{value:"Badge in Kombination mit anderen Elementen",id:"badge-in-kombination-mit-anderen-elementen",level:3},{value:"Props",id:"props",level:2},{value:"Barrierefreiheit",id:"barrierefreiheit",level:2},{value:"Beispiele",id:"beispiele",level:2},{value:"Badge f\xfcr Statusanzeige",id:"badge-f\xfcr-statusanzeige",level:3},{value:"Badge f\xfcr Priorit\xe4ten",id:"badge-f\xfcr-priorit\xe4ten",level:3},{value:"Badge f\xfcr Benachrichtigungen",id:"badge-f\xfcr-benachrichtigungen",level:3},{value:"Badge f\xfcr Tags",id:"badge-f\xfcr-tags",level:3},{value:"Badge mit benutzerdefinierten Styles",id:"badge-mit-benutzerdefinierten-styles",level:3},{value:"Interaktive Badge",id:"interaktive-badge",level:3}];function o(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"badge",children:"Badge"})}),"\n",(0,r.jsx)(n.p,{children:"Die Badge-Komponente wird verwendet, um Status, Kennzeichnungen oder Z\xe4hler anzuzeigen. Sie ist ideal f\xfcr Benachrichtigungen, Tags oder Labels."}),"\n",(0,r.jsx)(n.h2,{id:"import",children:"Import"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"import { Badge } from '@smolitux/core';\n"})}),"\n",(0,r.jsx)(n.h2,{id:"verwendung",children:"Verwendung"}),"\n",(0,r.jsx)(n.h3,{id:"einfache-badge",children:"Einfache Badge"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"<Badge>Default</Badge>\n"})}),"\n",(0,r.jsx)(n.h3,{id:"verschiedene-varianten",children:"Verschiedene Varianten"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<Badge variant="default">Default</Badge>\n<Badge variant="primary">Primary</Badge>\n<Badge variant="success">Success</Badge>\n<Badge variant="warning">Warning</Badge>\n<Badge variant="error">Error</Badge>\n<Badge variant="info">Info</Badge>\n'})}),"\n",(0,r.jsx)(n.h3,{id:"verschiedene-gr\xf6\xdfen",children:"Verschiedene Gr\xf6\xdfen"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<Badge size="xs">Extra Small</Badge>\n<Badge size="sm">Small</Badge>\n<Badge size="md">Medium</Badge>\n<Badge size="lg">Large</Badge>\n'})}),"\n",(0,r.jsx)(n.h3,{id:"abgerundete-badge",children:"Abgerundete Badge"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"<Badge rounded>Rounded</Badge>\n"})}),"\n",(0,r.jsx)(n.h3,{id:"badge-mit-icon",children:"Badge mit Icon"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"import { CheckIcon } from '@heroicons/react/solid';\n\n<Badge icon={<CheckIcon className=\"w-3 h-3 mr-1\" />}>Mit Icon</Badge>\n"})}),"\n",(0,r.jsx)(n.h3,{id:"badge-als-z\xe4hler",children:"Badge als Z\xe4hler"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<Badge isCounter>5</Badge>\n<Badge isCounter maxCount={99}>100</Badge> {/* Zeigt "99+" an */}\n'})}),"\n",(0,r.jsx)(n.h3,{id:"badge-als-punkt",children:"Badge als Punkt"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<Badge isDot variant="error" />\n'})}),"\n",(0,r.jsx)(n.h3,{id:"outline-badge",children:"Outline Badge"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<Badge outline variant="primary">Outline</Badge>\n'})}),"\n",(0,r.jsx)(n.h3,{id:"badge-in-kombination-mit-anderen-elementen",children:"Badge in Kombination mit anderen Elementen"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<div className="flex items-center">\n  <span className="mr-2">Nachrichten</span>\n  <Badge variant="primary" isCounter>3</Badge>\n</div>\n\n<button className="relative px-4 py-2 bg-gray-100 rounded">\n  Benachrichtigungen\n  <Badge \n    isDot \n    variant="error" \n    className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2" \n  />\n</button>\n'})}),"\n",(0,r.jsx)(n.h2,{id:"props",children:"Props"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Prop"}),(0,r.jsx)(n.th,{children:"Typ"}),(0,r.jsx)(n.th,{children:"Standard"}),(0,r.jsx)(n.th,{children:"Beschreibung"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"children"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"ReactNode"})}),(0,r.jsx)(n.td,{children:"-"}),(0,r.jsx)(n.td,{children:"Der Inhalt der Badge"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"variant"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"'default'"})}),(0,r.jsx)(n.td,{children:"Die visuelle Variante der Badge"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"size"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"'xs' | 'sm' | 'md' | 'lg'"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"'md'"})}),(0,r.jsx)(n.td,{children:"Die Gr\xf6\xdfe der Badge"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"rounded"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"boolean"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"false"})}),(0,r.jsx)(n.td,{children:"Ob die Badge abgerundet sein soll"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"className"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"string"})}),(0,r.jsx)(n.td,{children:"-"}),(0,r.jsx)(n.td,{children:"Zus\xe4tzliche CSS-Klassen"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"icon"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"ReactNode"})}),(0,r.jsx)(n.td,{children:"-"}),(0,r.jsx)(n.td,{children:"Ein optionales Icon f\xfcr die Badge"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"isCounter"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"boolean"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"false"})}),(0,r.jsx)(n.td,{children:"Ob die Badge als Z\xe4hler angezeigt werden soll"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"maxCount"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"number"})}),(0,r.jsx)(n.td,{children:"-"}),(0,r.jsx)(n.td,{children:"Maximaler Wert f\xfcr Z\xe4hler (z.B. 99+)"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"isDot"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"boolean"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"false"})}),(0,r.jsx)(n.td,{children:"Ob die Badge als Punkt ohne Text angezeigt werden soll"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"outline"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"boolean"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"false"})}),(0,r.jsx)(n.td,{children:"Ob die Badge als Outline angezeigt werden soll"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"htmlProps"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"HTMLAttributes<HTMLSpanElement>"})}),(0,r.jsx)(n.td,{children:"-"}),(0,r.jsx)(n.td,{children:"Zus\xe4tzliche HTML-Attribute"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"id"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"string"})}),(0,r.jsx)(n.td,{children:"-"}),(0,r.jsx)(n.td,{children:"ID f\xfcr Barrierefreiheit"})]})]})]}),"\n",(0,r.jsx)(n.h2,{id:"barrierefreiheit",children:"Barrierefreiheit"}),"\n",(0,r.jsx)(n.p,{children:"Die Badge-Komponente ist f\xfcr Barrierefreiheit optimiert:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Ausreichender Kontrast zwischen Text und Hintergrund"}),"\n",(0,r.jsx)(n.li,{children:"Unterst\xfctzung f\xfcr Screenreader durch semantische Struktur"}),"\n",(0,r.jsx)(n.li,{children:"M\xf6glichkeit, eine ID f\xfcr ARIA-Attribute zu setzen"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"beispiele",children:"Beispiele"}),"\n",(0,r.jsx)(n.h3,{id:"badge-f\xfcr-statusanzeige",children:"Badge f\xfcr Statusanzeige"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"function StatusBadge({ status }) {\n  const statusConfig = {\n    active: { variant: 'success', label: 'Aktiv' },\n    pending: { variant: 'warning', label: 'Ausstehend' },\n    inactive: { variant: 'error', label: 'Inaktiv' },\n    draft: { variant: 'default', label: 'Entwurf' },\n  };\n  \n  const config = statusConfig[status] || statusConfig.draft;\n  \n  return (\n    <Badge variant={config.variant} rounded>\n      {config.label}\n    </Badge>\n  );\n}\n\n// Verwendung\n<StatusBadge status=\"active\" />\n<StatusBadge status=\"pending\" />\n<StatusBadge status=\"inactive\" />\n<StatusBadge status=\"draft\" />\n"})}),"\n",(0,r.jsx)(n.h3,{id:"badge-f\xfcr-priorit\xe4ten",children:"Badge f\xfcr Priorit\xe4ten"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"function PriorityBadge({ priority }) {\n  const priorityConfig = {\n    high: { variant: 'error', label: 'Hoch' },\n    medium: { variant: 'warning', label: 'Mittel' },\n    low: { variant: 'info', label: 'Niedrig' },\n  };\n  \n  const config = priorityConfig[priority] || priorityConfig.low;\n  \n  return (\n    <Badge variant={config.variant}>\n      {config.label}\n    </Badge>\n  );\n}\n\n// Verwendung\n<PriorityBadge priority=\"high\" />\n<PriorityBadge priority=\"medium\" />\n<PriorityBadge priority=\"low\" />\n"})}),"\n",(0,r.jsx)(n.h3,{id:"badge-f\xfcr-benachrichtigungen",children:"Badge f\xfcr Benachrichtigungen"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'function NotificationIcon({ count = 0 }) {\n  return (\n    <div className="relative inline-block">\n      <svg \n        xmlns="http://www.w3.org/2000/svg" \n        className="h-6 w-6 text-gray-600" \n        fill="none" \n        viewBox="0 0 24 24" \n        stroke="currentColor"\n      >\n        <path \n          strokeLinecap="round" \n          strokeLinejoin="round" \n          strokeWidth={2} \n          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" \n        />\n      </svg>\n      \n      {count > 0 && (\n        <Badge \n          isCounter \n          maxCount={99} \n          variant="error" \n          size="xs" \n          className="absolute -top-1 -right-1"\n        >\n          {count}\n        </Badge>\n      )}\n    </div>\n  );\n}\n\n// Verwendung\n<NotificationIcon count={5} />\n<NotificationIcon count={0} />\n<NotificationIcon count={100} />\n'})}),"\n",(0,r.jsx)(n.h3,{id:"badge-f\xfcr-tags",children:"Badge f\xfcr Tags"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"function TagList({ tags }) {\n  return (\n    <div className=\"flex flex-wrap gap-2\">\n      {tags.map((tag, index) => (\n        <Badge \n          key={index} \n          variant=\"primary\" \n          outline \n          rounded \n          className=\"px-3 py-1\"\n        >\n          {tag}\n        </Badge>\n      ))}\n    </div>\n  );\n}\n\n// Verwendung\n<TagList tags={['React', 'JavaScript', 'UI', 'Component']} />\n"})}),"\n",(0,r.jsx)(n.h3,{id:"badge-mit-benutzerdefinierten-styles",children:"Badge mit benutzerdefinierten Styles"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<Badge \n  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"\n  rounded\n>\n  Premium\n</Badge>\n'})}),"\n",(0,r.jsx)(n.h3,{id:"interaktive-badge",children:"Interaktive Badge"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'function RemovableTag({ label, onRemove }) {\n  return (\n    <Badge \n      variant="primary" \n      outline \n      rounded \n      className="px-3 py-1 flex items-center"\n    >\n      <span>{label}</span>\n      <button \n        onClick={onRemove} \n        className="ml-2 text-primary-600 hover:text-primary-800 focus:outline-none"\n        aria-label={`Remove ${label} tag`}\n      >\n        <svg \n          xmlns="http://www.w3.org/2000/svg" \n          className="h-3 w-3" \n          viewBox="0 0 20 20" \n          fill="currentColor"\n        >\n          <path \n            fillRule="evenodd" \n            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" \n            clipRule="evenodd" \n          />\n        </svg>\n      </button>\n    </Badge>\n  );\n}\n\n// Verwendung\n<RemovableTag \n  label="React" \n  onRemove={() => console.log(\'Tag removed\')} \n/>\n'})})]})}function h(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>t,x:()=>s});var d=i(6540);const r={},a=d.createContext(r);function t(e){const n=d.useContext(a);return d.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),d.createElement(a.Provider,{value:n},e.children)}}}]);