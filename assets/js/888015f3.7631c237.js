"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1708],{4488:(e,n,d)=>{d.r(n),d.d(n,{assets:()=>o,contentTitle:()=>t,default:()=>h,frontMatter:()=>r,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"components/overlay/modal","title":"Modal","description":"Die Modal-Komponente wird verwendet, um Inhalte in einem Overlay-Fenster anzuzeigen, das \xfcber der Hauptseite schwebt. Sie ist ideal f\xfcr Dialoge, Formulare, Best\xe4tigungen und andere Interaktionen, die die Aufmerksamkeit des Benutzers erfordern.","source":"@site/docs/components/overlay/modal.md","sourceDirName":"components/overlay","slug":"/components/overlay/modal","permalink":"/smolitux-ui/docs/components/overlay/modal","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/components/overlay/modal.md","tags":[],"version":"current","frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"Drawer","permalink":"/smolitux-ui/docs/components/overlay/drawer"},"next":{"title":"Modal-Komponente: Barrierefreiheit","permalink":"/smolitux-ui/docs/components/overlay/modal/accessibility"}}');var l=d(4848),i=d(8453);const r={},t="Modal",o={},c=[{value:"Import",id:"import",level:2},{value:"Verwendung",id:"verwendung",level:2},{value:"Einfaches Modal",id:"einfaches-modal",level:3},{value:"Modal mit Footer-Aktionen",id:"modal-mit-footer-aktionen",level:3},{value:"Verschiedene Modal-Gr\xf6\xdfen",id:"verschiedene-modal-gr\xf6\xdfen",level:3},{value:"Modal-Positionen",id:"modal-positionen",level:3},{value:"Modal mit Formular",id:"modal-mit-formular",level:3},{value:"Props",id:"props",level:2},{value:"Barrierefreiheit",id:"barrierefreiheit",level:2},{value:"Beispiele",id:"beispiele",level:2},{value:"Modal mit benutzerdefiniertem Header",id:"modal-mit-benutzerdefiniertem-header",level:3},{value:"Modal mit Best\xe4tigungsdialog",id:"modal-mit-best\xe4tigungsdialog",level:3},{value:"Verschachteltes Modal",id:"verschachteltes-modal",level:3}];function a(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"modal",children:"Modal"})}),"\n",(0,l.jsx)(n.p,{children:"Die Modal-Komponente wird verwendet, um Inhalte in einem Overlay-Fenster anzuzeigen, das \xfcber der Hauptseite schwebt. Sie ist ideal f\xfcr Dialoge, Formulare, Best\xe4tigungen und andere Interaktionen, die die Aufmerksamkeit des Benutzers erfordern."}),"\n",(0,l.jsx)(n.h2,{id:"import",children:"Import"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:"import { Modal } from '@smolitux/core';\n"})}),"\n",(0,l.jsx)(n.h2,{id:"verwendung",children:"Verwendung"}),"\n",(0,l.jsx)(n.h3,{id:"einfaches-modal",children:"Einfaches Modal"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:"import { useState } from 'react';\nimport { Modal, Button } from '@smolitux/core';\n\nfunction Example() {\n  const [isOpen, setIsOpen] = useState(false);\n  \n  return (\n    <>\n      <Button onClick={() => setIsOpen(true)}>Modal \xf6ffnen</Button>\n      \n      <Modal \n        isOpen={isOpen} \n        onClose={() => setIsOpen(false)}\n        title=\"Beispiel-Modal\"\n      >\n        <p>Dies ist der Inhalt des Modals.</p>\n      </Modal>\n    </>\n  );\n}\n"})}),"\n",(0,l.jsx)(n.h3,{id:"modal-mit-footer-aktionen",children:"Modal mit Footer-Aktionen"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:'<Modal\n  isOpen={isOpen}\n  onClose={() => setIsOpen(false)}\n  title="Best\xe4tigung"\n  footer={\n    <div className="flex justify-end space-x-2">\n      <Button variant="outline" onClick={() => setIsOpen(false)}>Abbrechen</Button>\n      <Button variant="primary" onClick={handleConfirm}>Best\xe4tigen</Button>\n    </div>\n  }\n>\n  <p>M\xf6chten Sie diese Aktion wirklich durchf\xfchren?</p>\n</Modal>\n'})}),"\n",(0,l.jsx)(n.h3,{id:"verschiedene-modal-gr\xf6\xdfen",children:"Verschiedene Modal-Gr\xf6\xdfen"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:'<Modal\n  isOpen={isOpen}\n  onClose={() => setIsOpen(false)}\n  title="Kleines Modal"\n  size="sm"\n>\n  <p>Dies ist ein kleines Modal.</p>\n</Modal>\n\n<Modal\n  isOpen={isOpen}\n  onClose={() => setIsOpen(false)}\n  title="Gro\xdfes Modal"\n  size="lg"\n>\n  <p>Dies ist ein gro\xdfes Modal.</p>\n</Modal>\n\n<Modal\n  isOpen={isOpen}\n  onClose={() => setIsOpen(false)}\n  title="Vollbild-Modal"\n  size="full"\n>\n  <p>Dies ist ein Vollbild-Modal.</p>\n</Modal>\n'})}),"\n",(0,l.jsx)(n.h3,{id:"modal-positionen",children:"Modal-Positionen"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:'<Modal\n  isOpen={isOpen}\n  onClose={() => setIsOpen(false)}\n  title="Modal oben"\n  position="top"\n>\n  <p>Dieses Modal erscheint am oberen Rand des Bildschirms.</p>\n</Modal>\n\n<Modal\n  isOpen={isOpen}\n  onClose={() => setIsOpen(false)}\n  title="Modal rechts"\n  position="right"\n>\n  <p>Dieses Modal erscheint am rechten Rand des Bildschirms.</p>\n</Modal>\n'})}),"\n",(0,l.jsx)(n.h3,{id:"modal-mit-formular",children:"Modal mit Formular"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:'<Modal\n  isOpen={isOpen}\n  onClose={() => setIsOpen(false)}\n  title="Neuen Benutzer erstellen"\n  footer={\n    <div className="flex justify-end space-x-2">\n      <Button variant="outline" onClick={() => setIsOpen(false)}>Abbrechen</Button>\n      <Button variant="primary" type="submit" form="user-form">Speichern</Button>\n    </div>\n  }\n>\n  <form id="user-form" onSubmit={handleSubmit}>\n    <div className="space-y-4">\n      <Input label="Name" name="name" required />\n      <Input label="E-Mail" name="email" type="email" required />\n      <Select \n        label="Rolle" \n        name="role"\n        options={[\n          { value: \'user\', label: \'Benutzer\' },\n          { value: \'admin\', label: \'Administrator\' }\n        ]}\n      />\n    </div>\n  </form>\n</Modal>\n'})}),"\n",(0,l.jsx)(n.h2,{id:"props",children:"Props"}),"\n",(0,l.jsxs)(n.table,{children:[(0,l.jsx)(n.thead,{children:(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.th,{children:"Prop"}),(0,l.jsx)(n.th,{children:"Typ"}),(0,l.jsx)(n.th,{children:"Standard"}),(0,l.jsx)(n.th,{children:"Beschreibung"})]})}),(0,l.jsxs)(n.tbody,{children:[(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"isOpen"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"boolean"})}),(0,l.jsx)(n.td,{children:"-"}),(0,l.jsx)(n.td,{children:"Steuert die Sichtbarkeit des Modals"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"onClose"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"() => void"})}),(0,l.jsx)(n.td,{children:"-"}),(0,l.jsx)(n.td,{children:"Callback-Funktion, die aufgerufen wird, wenn das Modal geschlossen wird"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"title"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"ReactNode"})}),(0,l.jsx)(n.td,{children:"-"}),(0,l.jsx)(n.td,{children:"Der Titel des Modals (optional)"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"children"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"ReactNode"})}),(0,l.jsx)(n.td,{children:"-"}),(0,l.jsx)(n.td,{children:"Der Inhalt des Modals"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"footer"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"ReactNode"})}),(0,l.jsx)(n.td,{children:"-"}),(0,l.jsx)(n.td,{children:"Der Footer-Inhalt des Modals (optional)"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"size"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"'md'"})}),(0,l.jsx)(n.td,{children:"Die Gr\xf6\xdfe des Modals"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"position"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"'center' | 'top' | 'right' | 'bottom' | 'left'"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"'center'"})}),(0,l.jsx)(n.td,{children:"Die Position des Modals"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"closeOnOverlayClick"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"boolean"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"true"})}),(0,l.jsx)(n.td,{children:"Ob das Modal geschlossen werden soll, wenn auf den Overlay-Hintergrund geklickt wird"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"closeOnEsc"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"boolean"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"true"})}),(0,l.jsx)(n.td,{children:"Ob das Modal geschlossen werden soll, wenn die Escape-Taste gedr\xfcckt wird"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"className"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"string"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"''"})}),(0,l.jsx)(n.td,{children:"Zus\xe4tzliche CSS-Klassen f\xfcr das Modal"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"headerClassName"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"string"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"''"})}),(0,l.jsx)(n.td,{children:"Zus\xe4tzliche CSS-Klassen f\xfcr den Header"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"bodyClassName"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"string"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"''"})}),(0,l.jsx)(n.td,{children:"Zus\xe4tzliche CSS-Klassen f\xfcr den Body"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"footerClassName"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"string"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"''"})}),(0,l.jsx)(n.td,{children:"Zus\xe4tzliche CSS-Klassen f\xfcr den Footer"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"overlayClassName"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"string"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"''"})}),(0,l.jsx)(n.td,{children:"Zus\xe4tzliche CSS-Klassen f\xfcr das Overlay"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"id"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"string"})}),(0,l.jsx)(n.td,{children:"-"}),(0,l.jsx)(n.td,{children:"ID f\xfcr Barrierefreiheit"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"animated"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"boolean"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"true"})}),(0,l.jsx)(n.td,{children:"Ob das Modal beim \xd6ffnen animiert werden soll"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"showCloseButton"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"boolean"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"true"})}),(0,l.jsx)(n.td,{children:"Ob das Modal einen Schlie\xdfen-Button haben soll"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"shadow"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"boolean"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"true"})}),(0,l.jsx)(n.td,{children:"Ob das Modal einen Schatten haben soll"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"rounded"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"boolean"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"true"})}),(0,l.jsx)(n.td,{children:"Ob das Modal abgerundete Ecken haben soll"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"bordered"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"boolean"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"true"})}),(0,l.jsx)(n.td,{children:"Ob das Modal einen Rahmen haben soll"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"initialFocus"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"boolean"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"true"})}),(0,l.jsx)(n.td,{children:"Ob das Modal beim \xd6ffnen fokussiert werden soll"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"restoreFocus"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"boolean"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"true"})}),(0,l.jsx)(n.td,{children:"Ob das Modal beim Schlie\xdfen den vorherigen Fokus wiederherstellen soll"})]})]})]}),"\n",(0,l.jsx)(n.h2,{id:"barrierefreiheit",children:"Barrierefreiheit"}),"\n",(0,l.jsx)(n.p,{children:"Die Modal-Komponente ist f\xfcr Barrierefreiheit optimiert:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["Verwendet die richtige ARIA-Rolle (",(0,l.jsx)(n.code,{children:'role="dialog"'}),")"]}),"\n",(0,l.jsx)(n.li,{children:"Fokus-Management: Fokus wird beim \xd6ffnen auf das Modal gesetzt und beim Schlie\xdfen wiederhergestellt"}),"\n",(0,l.jsx)(n.li,{children:"Fokus-Falle: Der Fokus bleibt innerhalb des Modals, wenn es ge\xf6ffnet ist"}),"\n",(0,l.jsx)(n.li,{children:"Tastaturnavigation: Schlie\xdfen mit Escape-Taste"}),"\n",(0,l.jsx)(n.li,{children:"Screenreader-Unterst\xfctzung: Korrekte ARIA-Attribute"}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"beispiele",children:"Beispiele"}),"\n",(0,l.jsx)(n.h3,{id:"modal-mit-benutzerdefiniertem-header",children:"Modal mit benutzerdefiniertem Header"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:'<Modal\n  isOpen={isOpen}\n  onClose={() => setIsOpen(false)}\n  headerClassName="bg-primary-500 text-white"\n>\n  <div className="flex items-center">\n    <Icon name="star" className="mr-2" />\n    <h2 className="text-xl font-bold">Premium-Funktion</h2>\n  </div>\n  <div className="mt-4">\n    <p>Diese Funktion ist nur f\xfcr Premium-Benutzer verf\xfcgbar.</p>\n  </div>\n</Modal>\n'})}),"\n",(0,l.jsx)(n.h3,{id:"modal-mit-best\xe4tigungsdialog",children:"Modal mit Best\xe4tigungsdialog"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:'<Modal\n  isOpen={isOpen}\n  onClose={() => setIsOpen(false)}\n  title="Eintrag l\xf6schen"\n  size="sm"\n  footer={\n    <div className="flex justify-end space-x-2">\n      <Button variant="outline" onClick={() => setIsOpen(false)}>Abbrechen</Button>\n      <Button variant="danger" onClick={handleDelete}>L\xf6schen</Button>\n    </div>\n  }\n>\n  <p>Sind Sie sicher, dass Sie diesen Eintrag l\xf6schen m\xf6chten? Diese Aktion kann nicht r\xfcckg\xe4ngig gemacht werden.</p>\n</Modal>\n'})}),"\n",(0,l.jsx)(n.h3,{id:"verschachteltes-modal",children:"Verschachteltes Modal"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:'function NestedModalExample() {\n  const [isFirstOpen, setIsFirstOpen] = useState(false);\n  const [isSecondOpen, setIsSecondOpen] = useState(false);\n  \n  return (\n    <>\n      <Button onClick={() => setIsFirstOpen(true)}>Erstes Modal \xf6ffnen</Button>\n      \n      <Modal \n        isOpen={isFirstOpen} \n        onClose={() => setIsFirstOpen(false)}\n        title="Erstes Modal"\n      >\n        <p>Dies ist das erste Modal.</p>\n        <Button onClick={() => setIsSecondOpen(true)}>Zweites Modal \xf6ffnen</Button>\n        \n        <Modal\n          isOpen={isSecondOpen}\n          onClose={() => setIsSecondOpen(false)}\n          title="Zweites Modal"\n        >\n          <p>Dies ist das zweite Modal, das \xfcber dem ersten schwebt.</p>\n        </Modal>\n      </Modal>\n    </>\n  );\n}\n'})})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(a,{...e})}):a(e)}},8453:(e,n,d)=>{d.d(n,{R:()=>r,x:()=>t});var s=d(6540);const l={},i=s.createContext(l);function r(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:r(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);