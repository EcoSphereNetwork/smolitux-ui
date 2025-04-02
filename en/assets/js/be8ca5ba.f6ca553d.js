"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3222],{8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>r});var i=t(6540);const l={},s=i.createContext(l);function o(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:o(e.components),i.createElement(s.Provider,{value:n},e.children)}},8908:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"components/overlay/dialog","title":"Dialog","description":"Die Dialog-Komponente zeigt Inhalte in einem modalen Fenster an, das \xfcber der Hauptanwendung schwebt. Sie eignet sich f\xfcr Best\xe4tigungen, Warnungen und Interaktionen, die die Aufmerksamkeit des Benutzers erfordern.","source":"@site/docs/components/overlay/dialog.md","sourceDirName":"components/overlay","slug":"/components/overlay/dialog","permalink":"/smolitux-ui/en/docs/components/overlay/dialog","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/components/overlay/dialog.md","tags":[],"version":"current","frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"Toast-Komponente: Barrierefreiheit","permalink":"/smolitux-ui/en/docs/components/feedback/toast/accessibility"},"next":{"title":"Dialog-Komponente: Barrierefreiheit","permalink":"/smolitux-ui/en/docs/components/overlay/dialog/accessibility"}}');var l=t(4848),s=t(8453);const o={},r="Dialog",a={},d=[{value:"Import",id:"import",level:2},{value:"Verwendung",id:"verwendung",level:2},{value:"Einfacher Dialog",id:"einfacher-dialog",level:3},{value:"Dialog mit Best\xe4tigung",id:"dialog-mit-best\xe4tigung",level:3},{value:"Dialog mit verschiedenen Varianten",id:"dialog-mit-verschiedenen-varianten",level:3},{value:"Dialog mit benutzerdefiniertem Footer",id:"dialog-mit-benutzerdefiniertem-footer",level:3},{value:"Dialog mit Icon",id:"dialog-mit-icon",level:3},{value:"Dialog mit verschiedenen Gr\xf6\xdfen",id:"dialog-mit-verschiedenen-gr\xf6\xdfen",level:3},{value:"Props",id:"props",level:2},{value:"Barrierefreiheit",id:"barrierefreiheit",level:2},{value:"Beispiele",id:"beispiele",level:2},{value:"Formular-Dialog",id:"formular-dialog",level:3},{value:"Mehrstufiger Dialog",id:"mehrstufiger-dialog",level:3},{value:"L\xf6schbest\xe4tigung",id:"l\xf6schbest\xe4tigung",level:3}];function c(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"dialog",children:"Dialog"})}),"\n",(0,l.jsx)(n.p,{children:"Die Dialog-Komponente zeigt Inhalte in einem modalen Fenster an, das \xfcber der Hauptanwendung schwebt. Sie eignet sich f\xfcr Best\xe4tigungen, Warnungen und Interaktionen, die die Aufmerksamkeit des Benutzers erfordern."}),"\n",(0,l.jsx)(n.h2,{id:"import",children:"Import"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:"import { Dialog } from '@smolitux/core';\n"})}),"\n",(0,l.jsx)(n.h2,{id:"verwendung",children:"Verwendung"}),"\n",(0,l.jsx)(n.h3,{id:"einfacher-dialog",children:"Einfacher Dialog"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:'function SimpleDialogExample() {\n  const [isOpen, setIsOpen] = useState(false);\n  \n  return (\n    <>\n      <Button onClick={() => setIsOpen(true)}>Dialog \xf6ffnen</Button>\n      \n      <Dialog\n        isOpen={isOpen}\n        onClose={() => setIsOpen(false)}\n        title="Beispiel-Dialog"\n      >\n        <p>Dies ist ein einfacher Dialog mit Standardbuttons.</p>\n      </Dialog>\n    </>\n  );\n}\n'})}),"\n",(0,l.jsx)(n.h3,{id:"dialog-mit-best\xe4tigung",children:"Dialog mit Best\xe4tigung"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:'function ConfirmDialogExample() {\n  const [isOpen, setIsOpen] = useState(false);\n  \n  const handleConfirm = () => {\n    console.log(\'Best\xe4tigt!\');\n    setIsOpen(false);\n  };\n  \n  return (\n    <>\n      <Button onClick={() => setIsOpen(true)}>Best\xe4tigungsdialog \xf6ffnen</Button>\n      \n      <Dialog\n        isOpen={isOpen}\n        onClose={() => setIsOpen(false)}\n        title="Best\xe4tigen Sie die Aktion"\n        confirmLabel="Best\xe4tigen"\n        cancelLabel="Abbrechen"\n        onConfirm={handleConfirm}\n        onCancel={() => setIsOpen(false)}\n        variant="confirm"\n      >\n        <p>Sind Sie sicher, dass Sie diese Aktion durchf\xfchren m\xf6chten?</p>\n      </Dialog>\n    </>\n  );\n}\n'})}),"\n",(0,l.jsx)(n.h3,{id:"dialog-mit-verschiedenen-varianten",children:"Dialog mit verschiedenen Varianten"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:"function VariantDialogExample() {\n  const [variant, setVariant] = useState(null);\n  \n  const openDialog = (selectedVariant) => {\n    setVariant(selectedVariant);\n  };\n  \n  const closeDialog = () => {\n    setVariant(null);\n  };\n  \n  return (\n    <>\n      <div className=\"flex space-x-2\">\n        <Button onClick={() => openDialog('info')}>Info</Button>\n        <Button onClick={() => openDialog('success')}>Erfolg</Button>\n        <Button onClick={() => openDialog('warning')}>Warnung</Button>\n        <Button onClick={() => openDialog('error')}>Fehler</Button>\n      </div>\n      \n      <Dialog\n        isOpen={variant !== null}\n        onClose={closeDialog}\n        title={variant ? `${variant.charAt(0).toUpperCase() + variant.slice(1)}-Dialog` : ''}\n        variant={variant}\n      >\n        <p>Dies ist ein Dialog mit der Variante \"{variant}\".</p>\n      </Dialog>\n    </>\n  );\n}\n"})}),"\n",(0,l.jsx)(n.h3,{id:"dialog-mit-benutzerdefiniertem-footer",children:"Dialog mit benutzerdefiniertem Footer"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:'function CustomFooterDialogExample() {\n  const [isOpen, setIsOpen] = useState(false);\n  \n  return (\n    <>\n      <Button onClick={() => setIsOpen(true)}>Dialog mit benutzerdefiniertem Footer</Button>\n      \n      <Dialog\n        isOpen={isOpen}\n        onClose={() => setIsOpen(false)}\n        title="Benutzerdefinierter Footer"\n        footerButtons={\n          <div className="flex justify-between w-full">\n            <Button variant="outline" onClick={() => setIsOpen(false)}>\n              Zur\xfcck\n            </Button>\n            <div className="space-x-2">\n              <Button variant="outline" onClick={() => console.log(\'Speichern\')}>\n                Speichern\n              </Button>\n              <Button onClick={() => console.log(\'Ver\xf6ffentlichen\')}>\n                Ver\xf6ffentlichen\n              </Button>\n            </div>\n          </div>\n        }\n      >\n        <p>Dieser Dialog hat einen benutzerdefinierten Footer mit mehreren Buttons.</p>\n      </Dialog>\n    </>\n  );\n}\n'})}),"\n",(0,l.jsx)(n.h3,{id:"dialog-mit-icon",children:"Dialog mit Icon"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:'function IconDialogExample() {\n  const [isOpen, setIsOpen] = useState(false);\n  \n  return (\n    <>\n      <Button onClick={() => setIsOpen(true)}>Dialog mit Icon</Button>\n      \n      <Dialog\n        isOpen={isOpen}\n        onClose={() => setIsOpen(false)}\n        title="Information"\n        variant="info"\n        icon={\n          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />\n          </svg>\n        }\n      >\n        <p>Dies ist ein Dialog mit einem benutzerdefinierten Icon.</p>\n      </Dialog>\n    </>\n  );\n}\n'})}),"\n",(0,l.jsx)(n.h3,{id:"dialog-mit-verschiedenen-gr\xf6\xdfen",children:"Dialog mit verschiedenen Gr\xf6\xdfen"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:"function SizeDialogExample() {\n  const [size, setSize] = useState(null);\n  \n  const openDialog = (selectedSize) => {\n    setSize(selectedSize);\n  };\n  \n  const closeDialog = () => {\n    setSize(null);\n  };\n  \n  return (\n    <>\n      <div className=\"flex space-x-2\">\n        <Button onClick={() => openDialog('sm')}>Klein</Button>\n        <Button onClick={() => openDialog('md')}>Mittel</Button>\n        <Button onClick={() => openDialog('lg')}>Gro\xdf</Button>\n        <Button onClick={() => openDialog('xl')}>Extra Gro\xdf</Button>\n        <Button onClick={() => openDialog('full')}>Vollbild</Button>\n      </div>\n      \n      <Dialog\n        isOpen={size !== null}\n        onClose={closeDialog}\n        title={`Dialog (${size})`}\n        size={size}\n      >\n        <p>Dies ist ein Dialog mit der Gr\xf6\xdfe \"{size}\".</p>\n      </Dialog>\n    </>\n  );\n}\n"})}),"\n",(0,l.jsx)(n.h2,{id:"props",children:"Props"}),"\n",(0,l.jsxs)(n.table,{children:[(0,l.jsx)(n.thead,{children:(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.th,{children:"Prop"}),(0,l.jsx)(n.th,{children:"Typ"}),(0,l.jsx)(n.th,{children:"Standard"}),(0,l.jsx)(n.th,{children:"Beschreibung"})]})}),(0,l.jsxs)(n.tbody,{children:[(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"isOpen"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"boolean"})}),(0,l.jsx)(n.td,{children:"-"}),(0,l.jsx)(n.td,{children:"Ist der Dialog ge\xf6ffnet?"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"onClose"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"() => void"})}),(0,l.jsx)(n.td,{children:"-"}),(0,l.jsx)(n.td,{children:"Callback zum Schlie\xdfen des Dialogs"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"title"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"ReactNode"})}),(0,l.jsx)(n.td,{children:"-"}),(0,l.jsx)(n.td,{children:"Titel des Dialogs"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"children"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"ReactNode"})}),(0,l.jsx)(n.td,{children:"-"}),(0,l.jsx)(n.td,{children:"Inhalt des Dialogs"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"confirmLabel"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"string"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"'OK'"})}),(0,l.jsx)(n.td,{children:"Text f\xfcr den Best\xe4tigen-Button"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"cancelLabel"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"string"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"'Abbrechen'"})}),(0,l.jsx)(n.td,{children:"Text f\xfcr den Abbrechen-Button"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"onConfirm"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"() => void"})}),(0,l.jsx)(n.td,{children:"-"}),(0,l.jsx)(n.td,{children:"Callback beim Klick auf Best\xe4tigen"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"onCancel"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"() => void"})}),(0,l.jsx)(n.td,{children:"-"}),(0,l.jsx)(n.td,{children:"Callback beim Klick auf Abbrechen"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"variant"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"'info' | 'success' | 'warning' | 'error' | 'confirm'"})}),(0,l.jsx)(n.td,{children:"-"}),(0,l.jsx)(n.td,{children:"Variante des Dialogs"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"footerButtons"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"ReactNode"})}),(0,l.jsx)(n.td,{children:"-"}),(0,l.jsx)(n.td,{children:"Benutzerdefinierte Buttons im Footer"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"size"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"'sm' | 'md' | 'lg' | 'xl' | 'full'"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"'md'"})}),(0,l.jsx)(n.td,{children:"Gr\xf6\xdfe des Dialogs"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"icon"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"ReactNode"})}),(0,l.jsx)(n.td,{children:"-"}),(0,l.jsx)(n.td,{children:"Icon des Dialogs"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"closeOnOverlayClick"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"boolean"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"true"})}),(0,l.jsx)(n.td,{children:"Schlie\xdfen bei Klick auf Overlay"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"closeOnEsc"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"boolean"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"true"})}),(0,l.jsx)(n.td,{children:"Schlie\xdfen bei ESC-Taste"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"initialFocus"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"boolean"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"true"})}),(0,l.jsx)(n.td,{children:"Fokus auf den Dialog setzen"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"animated"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"boolean"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"true"})}),(0,l.jsx)(n.td,{children:"Animation beim \xd6ffnen/Schlie\xdfen"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"className"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"string"})}),(0,l.jsx)(n.td,{children:"-"}),(0,l.jsx)(n.td,{children:"Zus\xe4tzliche CSS-Klassen"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"zIndex"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"number"})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"1000"})}),(0,l.jsx)(n.td,{children:"Z-Index-Wert"})]})]})]}),"\n",(0,l.jsx)(n.h2,{id:"barrierefreiheit",children:"Barrierefreiheit"}),"\n",(0,l.jsx)(n.p,{children:"Die Dialog-Komponente ist f\xfcr Barrierefreiheit optimiert:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["Verwendet die korrekten ARIA-Attribute (",(0,l.jsx)(n.code,{children:'role="dialog"'}),", ",(0,l.jsx)(n.code,{children:'aria-modal="true"'}),", ",(0,l.jsx)(n.code,{children:"aria-labelledby"}),", ",(0,l.jsx)(n.code,{children:"aria-describedby"}),")"]}),"\n",(0,l.jsx)(n.li,{children:"Fokus-Management: Fokus wird beim \xd6ffnen auf den Dialog gesetzt und beim Schlie\xdfen zur\xfcckgegeben"}),"\n",(0,l.jsx)(n.li,{children:"Tastaturnavigation: Schlie\xdfen mit ESC, Fokus-Trap innerhalb des Dialogs"}),"\n",(0,l.jsx)(n.li,{children:"Screenreader-Unterst\xfctzung durch semantische Struktur"}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"beispiele",children:"Beispiele"}),"\n",(0,l.jsx)(n.h3,{id:"formular-dialog",children:"Formular-Dialog"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:'function FormDialogExample() {\n  const [isOpen, setIsOpen] = useState(false);\n  const [formData, setFormData] = useState({\n    name: \'\',\n    email: \'\',\n    message: \'\'\n  });\n  \n  const handleChange = (e) => {\n    const { name, value } = e.target;\n    setFormData(prev => ({\n      ...prev,\n      [name]: value\n    }));\n  };\n  \n  const handleSubmit = () => {\n    console.log(\'Formular abgesendet:\', formData);\n    setIsOpen(false);\n  };\n  \n  return (\n    <>\n      <Button onClick={() => setIsOpen(true)}>Kontaktformular \xf6ffnen</Button>\n      \n      <Dialog\n        isOpen={isOpen}\n        onClose={() => setIsOpen(false)}\n        title="Kontaktformular"\n        footerButtons={\n          <div className="flex justify-end space-x-2 w-full">\n            <Button variant="outline" onClick={() => setIsOpen(false)}>\n              Abbrechen\n            </Button>\n            <Button onClick={handleSubmit}>\n              Absenden\n            </Button>\n          </div>\n        }\n        size="lg"\n      >\n        <div className="space-y-4">\n          <div>\n            <label className="block text-sm font-medium text-gray-700 mb-1">\n              Name\n            </label>\n            <input\n              type="text"\n              name="name"\n              value={formData.name}\n              onChange={handleChange}\n              className="w-full px-3 py-2 border border-gray-300 rounded-md"\n            />\n          </div>\n          \n          <div>\n            <label className="block text-sm font-medium text-gray-700 mb-1">\n              E-Mail\n            </label>\n            <input\n              type="email"\n              name="email"\n              value={formData.email}\n              onChange={handleChange}\n              className="w-full px-3 py-2 border border-gray-300 rounded-md"\n            />\n          </div>\n          \n          <div>\n            <label className="block text-sm font-medium text-gray-700 mb-1">\n              Nachricht\n            </label>\n            <textarea\n              name="message"\n              value={formData.message}\n              onChange={handleChange}\n              rows={4}\n              className="w-full px-3 py-2 border border-gray-300 rounded-md"\n            />\n          </div>\n        </div>\n      </Dialog>\n    </>\n  );\n}\n'})}),"\n",(0,l.jsx)(n.h3,{id:"mehrstufiger-dialog",children:"Mehrstufiger Dialog"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:'function MultiStepDialogExample() {\n  const [isOpen, setIsOpen] = useState(false);\n  const [step, setStep] = useState(1);\n  const [data, setData] = useState({\n    name: \'\',\n    email: \'\',\n    plan: \'\'\n  });\n  \n  const openDialog = () => {\n    setIsOpen(true);\n    setStep(1);\n    setData({\n      name: \'\',\n      email: \'\',\n      plan: \'\'\n    });\n  };\n  \n  const handleChange = (e) => {\n    const { name, value } = e.target;\n    setData(prev => ({\n      ...prev,\n      [name]: value\n    }));\n  };\n  \n  const nextStep = () => {\n    setStep(prev => prev + 1);\n  };\n  \n  const prevStep = () => {\n    setStep(prev => prev - 1);\n  };\n  \n  const handleSubmit = () => {\n    console.log(\'Registrierung abgeschlossen:\', data);\n    setIsOpen(false);\n  };\n  \n  return (\n    <>\n      <Button onClick={openDialog}>Registrierung starten</Button>\n      \n      <Dialog\n        isOpen={isOpen}\n        onClose={() => setIsOpen(false)}\n        title={`Schritt ${step} von 3: ${\n          step === 1 ? \'Pers\xf6nliche Daten\' : \n          step === 2 ? \'Kontaktdaten\' : \n          \'Plan ausw\xe4hlen\'\n        }`}\n        footerButtons={\n          <div className="flex justify-between w-full">\n            {step > 1 ? (\n              <Button variant="outline" onClick={prevStep}>\n                Zur\xfcck\n              </Button>\n            ) : (\n              <div></div>\n            )}\n            \n            {step < 3 ? (\n              <Button onClick={nextStep}>\n                Weiter\n              </Button>\n            ) : (\n              <Button onClick={handleSubmit}>\n                Abschlie\xdfen\n              </Button>\n            )}\n          </div>\n        }\n        size="md"\n      >\n        {step === 1 && (\n          <div>\n            <label className="block text-sm font-medium text-gray-700 mb-1">\n              Name\n            </label>\n            <input\n              type="text"\n              name="name"\n              value={data.name}\n              onChange={handleChange}\n              className="w-full px-3 py-2 border border-gray-300 rounded-md"\n            />\n          </div>\n        )}\n        \n        {step === 2 && (\n          <div>\n            <label className="block text-sm font-medium text-gray-700 mb-1">\n              E-Mail\n            </label>\n            <input\n              type="email"\n              name="email"\n              value={data.email}\n              onChange={handleChange}\n              className="w-full px-3 py-2 border border-gray-300 rounded-md"\n            />\n          </div>\n        )}\n        \n        {step === 3 && (\n          <div>\n            <label className="block text-sm font-medium text-gray-700 mb-1">\n              Plan ausw\xe4hlen\n            </label>\n            <select\n              name="plan"\n              value={data.plan}\n              onChange={handleChange}\n              className="w-full px-3 py-2 border border-gray-300 rounded-md"\n            >\n              <option value="">Bitte ausw\xe4hlen</option>\n              <option value="basic">Basic (\u20ac9,99/Monat)</option>\n              <option value="pro">Pro (\u20ac19,99/Monat)</option>\n              <option value="enterprise">Enterprise (\u20ac49,99/Monat)</option>\n            </select>\n          </div>\n        )}\n      </Dialog>\n    </>\n  );\n}\n'})}),"\n",(0,l.jsx)(n.h3,{id:"l\xf6schbest\xe4tigung",children:"L\xf6schbest\xe4tigung"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:'function DeleteConfirmationExample() {\n  const [isOpen, setIsOpen] = useState(false);\n  const [isDeleting, setIsDeleting] = useState(false);\n  \n  const handleDelete = () => {\n    setIsDeleting(true);\n    \n    // Simuliere API-Aufruf\n    setTimeout(() => {\n      console.log(\'Element gel\xf6scht\');\n      setIsDeleting(false);\n      setIsOpen(false);\n    }, 1500);\n  };\n  \n  return (\n    <>\n      <Button variant="danger" onClick={() => setIsOpen(true)}>\n        Element l\xf6schen\n      </Button>\n      \n      <Dialog\n        isOpen={isOpen}\n        onClose={() => !isDeleting && setIsOpen(false)}\n        title="Element l\xf6schen"\n        variant="error"\n        icon={\n          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />\n          </svg>\n        }\n        footerButtons={\n          <div className="flex justify-end space-x-2 w-full">\n            <Button \n              variant="outline" \n              onClick={() => setIsOpen(false)}\n              disabled={isDeleting}\n            >\n              Abbrechen\n            </Button>\n            <Button \n              variant="danger" \n              onClick={handleDelete}\n              loading={isDeleting}\n            >\n              {isDeleting ? \'Wird gel\xf6scht...\' : \'L\xf6schen\'}\n            </Button>\n          </div>\n        }\n      >\n        <p>Sind Sie sicher, dass Sie dieses Element l\xf6schen m\xf6chten? Diese Aktion kann nicht r\xfcckg\xe4ngig gemacht werden.</p>\n      </Dialog>\n    </>\n  );\n}\n'})})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(c,{...e})}):c(e)}}}]);