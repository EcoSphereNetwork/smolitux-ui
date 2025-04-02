"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9773],{3568:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>l,default:()=>u,frontMatter:()=>d,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"components/inputs/Button","title":"Button Komponente","description":"Die Button-Komponente ist ein grundlegendes Interaktionselement, das f\xfcr verschiedene Aktionen in der Benutzeroberfl\xe4che verwendet wird. Sie wurde f\xfcr optimale Barrierefreiheit und Benutzerfreundlichkeit entwickelt.","source":"@site/docs/components/inputs/Button.md","sourceDirName":"components/inputs","slug":"/components/inputs/Button","permalink":"/smolitux-ui/en/docs/components/inputs/Button","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/components/inputs/Button.md","tags":[],"version":"current","frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"Grid","permalink":"/smolitux-ui/en/docs/components/layout/grid"},"next":{"title":"Button-Komponente: Barrierefreiheit","permalink":"/smolitux-ui/en/docs/components/inputs/button/accessibility"}}');var r=t(4848),s=t(8453);const d={},l="Button Komponente",o={},c=[{value:"Import",id:"import",level:2},{value:"Eigenschaften",id:"eigenschaften",level:2},{value:"Beispiele",id:"beispiele",level:2},{value:"Grundlegende Verwendung",id:"grundlegende-verwendung",level:3},{value:"Status-Varianten",id:"status-varianten",level:3},{value:"Mit Icons",id:"mit-icons",level:3},{value:"Zustandsvarianten",id:"zustandsvarianten",level:3},{value:"Gr\xf6\xdfen",id:"gr\xf6\xdfen",level:3},{value:"Formen",id:"formen",level:3},{value:"Als Link",id:"als-link",level:3},{value:"Barrierefreiheit",id:"barrierefreiheit",level:2},{value:"Design-\xdcberlegungen",id:"design-\xfcberlegungen",level:2},{value:"Implementierungsdetails",id:"implementierungsdetails",level:2},{value:"Aktuelle Verbesserungen",id:"aktuelle-verbesserungen",level:2},{value:"Zuk\xfcnftige Verbesserungen",id:"zuk\xfcnftige-verbesserungen",level:2},{value:"Erweiterte Beispiele",id:"erweiterte-beispiele",level:2},{value:"Button-Gruppe",id:"button-gruppe",level:3},{value:"Button mit Best\xe4tigungsdialog",id:"button-mit-best\xe4tigungsdialog",level:3},{value:"Button mit Ladeindikator und Timeout",id:"button-mit-ladeindikator-und-timeout",level:3}];function a(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"button-komponente",children:"Button Komponente"})}),"\n",(0,r.jsx)(n.p,{children:"Die Button-Komponente ist ein grundlegendes Interaktionselement, das f\xfcr verschiedene Aktionen in der Benutzeroberfl\xe4che verwendet wird. Sie wurde f\xfcr optimale Barrierefreiheit und Benutzerfreundlichkeit entwickelt."}),"\n",(0,r.jsx)(n.h2,{id:"import",children:"Import"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"import { Button } from '@smolitux/core';\n"})}),"\n",(0,r.jsx)(n.h2,{id:"eigenschaften",children:"Eigenschaften"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Eigenschaft"}),(0,r.jsx)(n.th,{children:"Typ"}),(0,r.jsx)(n.th,{children:"Standard"}),(0,r.jsx)(n.th,{children:"Beschreibung"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"variant"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"'primary' | 'secondary' | 'ghost' | 'link' | 'solid' | 'outline' | 'danger' | 'warning' | 'success' | 'info' | 'unstyled'"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"'primary'"})}),(0,r.jsx)(n.td,{children:"Bestimmt das visuelle Erscheinungsbild des Buttons"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"size"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"'xs' | 'sm' | 'md' | 'lg' | 'xl'"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"'md'"})}),(0,r.jsx)(n.td,{children:"Legt die Gr\xf6\xdfe des Buttons fest"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"isLoading"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"boolean"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"false"})}),(0,r.jsx)(n.td,{children:"Zeigt einen Ladezustand an"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"isDisabled"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"boolean"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"false"})}),(0,r.jsx)(n.td,{children:"Deaktiviert den Button"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"isSuccess"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"boolean"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"false"})}),(0,r.jsx)(n.td,{children:"Zeigt einen Erfolgszustand an"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"isError"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"boolean"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"false"})}),(0,r.jsx)(n.td,{children:"Zeigt einen Fehlerzustand an"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"leftIcon"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"ReactNode"})}),(0,r.jsx)(n.td,{children:"-"}),(0,r.jsx)(n.td,{children:"Icon, das links vom Text angezeigt wird"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"rightIcon"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"ReactNode"})}),(0,r.jsx)(n.td,{children:"-"}),(0,r.jsx)(n.td,{children:"Icon, das rechts vom Text angezeigt wird"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"loadingText"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"string"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"'Loading...'"})}),(0,r.jsx)(n.td,{children:"Text, der im Ladezustand angezeigt wird"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"loadingPlaceholder"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"ReactNode"})}),(0,r.jsx)(n.td,{children:"-"}),(0,r.jsx)(n.td,{children:"Benutzerdefinierter Inhalt f\xfcr den Ladezustand"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"loadingSpinner"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"ReactNode"})}),(0,r.jsx)(n.td,{children:"-"}),(0,r.jsx)(n.td,{children:"Benutzerdefinierter Spinner f\xfcr den Ladezustand"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"successIcon"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"ReactNode"})}),(0,r.jsx)(n.td,{children:"-"}),(0,r.jsx)(n.td,{children:"Benutzerdefiniertes Icon f\xfcr den Erfolgszustand"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"errorIcon"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"ReactNode"})}),(0,r.jsx)(n.td,{children:"-"}),(0,r.jsx)(n.td,{children:"Benutzerdefiniertes Icon f\xfcr den Fehlerzustand"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"isIconButton"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"boolean"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"false"})}),(0,r.jsx)(n.td,{children:"Formatiert den Button als Icon-Button ohne Text"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"isDropdownTrigger"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"boolean"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"false"})}),(0,r.jsx)(n.td,{children:"Formatiert den Button als Dropdown-Trigger mit Pfeil-Icon"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"isToggle"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"boolean"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"false"})}),(0,r.jsx)(n.td,{children:"Formatiert den Button als umschaltbaren Button"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"isToggleOn"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"boolean"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"false"})}),(0,r.jsx)(n.td,{children:"Gibt an, ob ein Toggle-Button eingeschaltet ist"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"fullWidth"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"boolean"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"false"})}),(0,r.jsx)(n.td,{children:"Button nimmt die volle verf\xfcgbare Breite ein"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"shape"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"'rounded' | 'square' | 'pill'"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"'rounded'"})}),(0,r.jsx)(n.td,{children:"Bestimmt die Form des Buttons"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"onClick"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"(event: React.MouseEvent) => void"})}),(0,r.jsx)(n.td,{children:"-"}),(0,r.jsx)(n.td,{children:"Funktion, die beim Klicken ausgef\xfchrt wird"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"onPress"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"() => void"})}),(0,r.jsx)(n.td,{children:"-"}),(0,r.jsx)(n.td,{children:"Alternative Funktion f\xfcr Touch/Klick-Ereignisse"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"as"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"React.ElementType"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"'button'"})}),(0,r.jsx)(n.td,{children:"Rendert den Button als anderes Element (z.B. 'a' f\xfcr Links)"})]})]})]}),"\n",(0,r.jsx)(n.h2,{id:"beispiele",children:"Beispiele"}),"\n",(0,r.jsx)(n.h3,{id:"grundlegende-verwendung",children:"Grundlegende Verwendung"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<Button variant="primary">Prim\xe4rer Button</Button>\n<Button variant="secondary">Sekund\xe4rer Button</Button>\n<Button variant="ghost">Ghost Button</Button>\n<Button variant="link">Link Button</Button>\n<Button variant="solid">Solid Button (Alias f\xfcr primary)</Button>\n<Button variant="outline">Outline Button (Alias f\xfcr ghost)</Button>\n'})}),"\n",(0,r.jsx)(n.h3,{id:"status-varianten",children:"Status-Varianten"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<Button variant="success">Erfolg</Button>\n<Button variant="danger">Gefahr</Button>\n<Button variant="warning">Warnung</Button>\n<Button variant="info">Information</Button>\n'})}),"\n",(0,r.jsx)(n.h3,{id:"mit-icons",children:"Mit Icons"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<Button leftIcon={<SearchIcon />}>Suchen</Button>\n<Button rightIcon={<ArrowRightIcon />}>Weiter</Button>\n<Button leftIcon={<SearchIcon />} rightIcon={<ArrowRightIcon />}>Suchen und Weiter</Button>\n<Button isIconButton leftIcon={<SearchIcon />} aria-label="Suchen" />\n'})}),"\n",(0,r.jsx)(n.h3,{id:"zustandsvarianten",children:"Zustandsvarianten"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"<Button isLoading>Wird geladen...</Button>\n<Button isSuccess>Erfolgreich gespeichert</Button>\n<Button isError>Fehler aufgetreten</Button>\n<Button isDisabled>Deaktiviert</Button>\n<Button isDropdownTrigger>Dropdown \xf6ffnen</Button>\n<Button isToggle isToggleOn>Aktiv</Button>\n"})}),"\n",(0,r.jsx)(n.h3,{id:"gr\xf6\xdfen",children:"Gr\xf6\xdfen"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<Button size="xs">Extra Klein</Button>\n<Button size="sm">Klein</Button>\n<Button size="md">Mittel</Button>\n<Button size="lg">Gro\xdf</Button>\n<Button size="xl">Extra Gro\xdf</Button>\n'})}),"\n",(0,r.jsx)(n.h3,{id:"formen",children:"Formen"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<Button shape="rounded">Abgerundet</Button>\n<Button shape="square">Quadratisch</Button>\n<Button shape="pill">Pill-Form</Button>\n'})}),"\n",(0,r.jsx)(n.h3,{id:"als-link",children:"Als Link"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<Button as="a" href="https://example.com">Link Button</Button>\n'})}),"\n",(0,r.jsx)(n.h2,{id:"barrierefreiheit",children:"Barrierefreiheit"}),"\n",(0,r.jsx)(n.p,{children:"Die Button-Komponente wurde mit besonderem Fokus auf Barrierefreiheit entwickelt:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Buttons haben standardm\xe4\xdfig den richtigen Fokus-Stil mit sichtbarem Fokusring"}),"\n",(0,r.jsxs)(n.li,{children:["Bei Verwendung als Link (",(0,r.jsx)(n.code,{children:'as="a"'}),") wird die richtige Semantik beibehalten"]}),"\n",(0,r.jsxs)(n.li,{children:["Im Ladezustand wird ",(0,r.jsx)(n.code,{children:'aria-busy="true"'}),' gesetzt und ein Screenreader-Text "Bitte warten" hinzugef\xfcgt']}),"\n",(0,r.jsxs)(n.li,{children:["Deaktivierte Buttons haben ",(0,r.jsx)(n.code,{children:'aria-disabled="true"'})]}),"\n",(0,r.jsx)(n.li,{children:'Erfolgszust\xe4nde haben zus\xe4tzlichen Screenreader-Text "Erfolgreich"'}),"\n",(0,r.jsx)(n.li,{children:'Fehlerzust\xe4nde haben zus\xe4tzlichen Screenreader-Text "Fehler aufgetreten"'}),"\n",(0,r.jsxs)(n.li,{children:["Dropdown-Trigger haben ",(0,r.jsx)(n.code,{children:'aria-haspopup="true"'})," und ",(0,r.jsx)(n.code,{children:"aria-expanded"})," Attribute"]}),"\n",(0,r.jsxs)(n.li,{children:["Icon-Buttons haben ",(0,r.jsx)(n.code,{children:"aria-label"})," f\xfcr Screenreader-Unterst\xfctzung"]}),"\n",(0,r.jsx)(n.li,{children:"Volle Tastaturunterst\xfctzung mit Enter und Space f\xfcr Aktivierung"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"design-\xfcberlegungen",children:"Design-\xdcberlegungen"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Prim\xe4re Buttons sollten f\xfcr die Hauptaktion auf einer Seite verwendet werden"}),"\n",(0,r.jsx)(n.li,{children:"Sekund\xe4re Buttons f\xfcr alternative Aktionen"}),"\n",(0,r.jsx)(n.li,{children:"Ghost/Outline-Buttons f\xfcr weniger wichtige Aktionen"}),"\n",(0,r.jsx)(n.li,{children:"Link-Buttons f\xfcr navigations\xe4hnliche Aktionen"}),"\n",(0,r.jsx)(n.li,{children:"Status-Varianten (success, danger, etc.) sollten konsistent f\xfcr entsprechende Aktionen verwendet werden"}),"\n",(0,r.jsxs)(n.li,{children:["Icon-Buttons sollten immer ein ",(0,r.jsx)(n.code,{children:"aria-label"})," haben"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"implementierungsdetails",children:"Implementierungsdetails"}),"\n",(0,r.jsx)(n.p,{children:"Die Button-Komponente verwendet intern:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Flexbox f\xfcr die Ausrichtung von Text und Icons"}),"\n",(0,r.jsx)(n.li,{children:"CSS-Transitions f\xfcr Hover- und Fokus-Effekte"}),"\n",(0,r.jsx)(n.li,{children:"SVG-Icons f\xfcr Ladezust\xe4nde, Erfolg und Fehler"}),"\n",(0,r.jsx)(n.li,{children:"React.forwardRef f\xfcr Ref-Weiterleitung"}),"\n",(0,r.jsx)(n.li,{children:"Tailwind CSS f\xfcr Styling"}),"\n",(0,r.jsx)(n.li,{children:"Screenreader-only Texte f\xfcr verbesserte Barrierefreiheit"}),"\n",(0,r.jsx)(n.li,{children:"Keyboard-Event-Handler f\xfcr bessere Tastaturunterst\xfctzung"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"aktuelle-verbesserungen",children:"Aktuelle Verbesserungen"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Verbesserte ARIA-Attribute f\xfcr bessere Barrierefreiheit"}),"\n",(0,r.jsx)(n.li,{children:"Erweiterte Zust\xe4nde (Erfolg, Fehler) mit visuellen Indikatoren"}),"\n",(0,r.jsx)(n.li,{children:"Bessere Screenreader-Unterst\xfctzung f\xfcr verschiedene Zust\xe4nde"}),"\n",(0,r.jsx)(n.li,{children:"Verbesserte Tastaturnavigation f\xfcr Dropdown-Trigger"}),"\n",(0,r.jsx)(n.li,{children:"Konsistente CSS-Klassen f\xfcr einfachere Styling-Anpassungen"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"zuk\xfcnftige-verbesserungen",children:"Zuk\xfcnftige Verbesserungen"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Ripple-Effekt f\xfcr besseres Feedback bei Klicks"}),"\n",(0,r.jsx)(n.li,{children:"Theming-Unterst\xfctzung f\xfcr benutzerdefinierte Farbpaletten"}),"\n",(0,r.jsx)(n.li,{children:"Animation f\xfcr Zustands\xfcberg\xe4nge"}),"\n",(0,r.jsx)(n.li,{children:"Gruppierte Button-Unterst\xfctzung (ButtonGroup-Komponente)"}),"\n",(0,r.jsx)(n.li,{children:"Erweiterte Tooltip-Integration"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"erweiterte-beispiele",children:"Erweiterte Beispiele"}),"\n",(0,r.jsx)(n.h3,{id:"button-gruppe",children:"Button-Gruppe"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"function ButtonGroup({ options, value, onChange }) {\n  return (\n    <div className=\"flex\">\n      {options.map((option) => (\n        <Button\n          key={option.value}\n          variant={value === option.value ? 'primary' : 'outline'}\n          onClick={() => onChange(option.value)}\n          className={`\n            ${value === option.value ? 'z-10' : ''}\n            ${option.value === options[0].value ? 'rounded-r-none' : ''}\n            ${option.value === options[options.length - 1].value ? 'rounded-l-none' : ''}\n            ${option.value !== options[0].value && option.value !== options[options.length - 1].value ? 'rounded-none' : ''}\n            ${option.value !== options[0].value ? '-ml-px' : ''}\n          `}\n        >\n          {option.label}\n        </Button>\n      ))}\n    </div>\n  );\n}\n\n// Verwendung\nfunction Example() {\n  const [view, setView] = useState('day');\n  \n  const options = [\n    { value: 'day', label: 'Tag' },\n    { value: 'week', label: 'Woche' },\n    { value: 'month', label: 'Monat' },\n  ];\n  \n  return (\n    <ButtonGroup \n      options={options} \n      value={view} \n      onChange={setView} \n    />\n  );\n}\n"})}),"\n",(0,r.jsx)(n.h3,{id:"button-mit-best\xe4tigungsdialog",children:"Button mit Best\xe4tigungsdialog"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"function ConfirmButton({ children, onConfirm, confirmText = 'Sind Sie sicher?' }) {\n  const [showConfirm, setShowConfirm] = useState(false);\n  \n  const handleClick = () => {\n    if (showConfirm) {\n      onConfirm();\n      setShowConfirm(false);\n    } else {\n      setShowConfirm(true);\n    }\n  };\n  \n  const handleCancel = (e) => {\n    e.stopPropagation();\n    setShowConfirm(false);\n  };\n  \n  return (\n    <div className=\"relative inline-block\">\n      <Button \n        variant={showConfirm ? 'danger' : 'primary'} \n        onClick={handleClick}\n      >\n        {showConfirm ? confirmText : children}\n      </Button>\n      \n      {showConfirm && (\n        <Button \n          variant=\"outline\" \n          size=\"sm\" \n          onClick={handleCancel}\n          className=\"absolute -top-2 -right-2 rounded-full w-6 h-6 p-0 flex items-center justify-center\"\n        >\n          \u2715\n        </Button>\n      )}\n    </div>\n  );\n}\n\n// Verwendung\n<ConfirmButton onConfirm={() => console.log('Best\xe4tigt!')}>\n  L\xf6schen\n</ConfirmButton>\n"})}),"\n",(0,r.jsx)(n.h3,{id:"button-mit-ladeindikator-und-timeout",children:"Button mit Ladeindikator und Timeout"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"function LoadingButton({ children, onClick, timeout = 2000 }) {\n  const [isLoading, setIsLoading] = useState(false);\n  \n  const handleClick = async () => {\n    setIsLoading(true);\n    \n    try {\n      await onClick();\n    } catch (error) {\n      console.error('Error:', error);\n    } finally {\n      // Mindestens 'timeout' ms anzeigen, damit der Benutzer den Ladeindikator sieht\n      setTimeout(() => {\n        setIsLoading(false);\n      }, timeout);\n    }\n  };\n  \n  return (\n    <Button \n      onClick={handleClick} \n      loading={isLoading} \n      disabled={isLoading}\n    >\n      {children}\n    </Button>\n  );\n}\n\n// Verwendung\n<LoadingButton \n  onClick={async () => {\n    // Simuliere API-Aufruf\n    return new Promise(resolve => setTimeout(resolve, 1000));\n  }}\n>\n  Speichern\n</LoadingButton>\n"})})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>d,x:()=>l});var i=t(6540);const r={},s=i.createContext(r);function d(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:d(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);