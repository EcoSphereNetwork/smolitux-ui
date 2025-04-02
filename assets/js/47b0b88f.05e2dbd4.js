"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5762],{3848:(e,d,n)=>{n.r(d),n.d(d,{assets:()=>t,contentTitle:()=>c,default:()=>j,frontMatter:()=>l,metadata:()=>r,toc:()=>h});const r=JSON.parse('{"id":"api/reference","title":"API-Referenz","description":"Diese Seite bietet eine detaillierte API-Referenz f\xfcr alle Komponenten der Smolitux UI Bibliothek.","source":"@site/docs/api/reference.md","sourceDirName":"api","slug":"/api/reference","permalink":"/smolitux-ui/docs/api/reference","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/api/reference.md","tags":[],"version":"current","frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"Layout-Beispiele","permalink":"/smolitux-ui/docs/examples/layout-examples"},"next":{"title":"Barrierefreie Komponenten (A11y)","permalink":"/smolitux-ui/docs/accessibility/a11y-components"}}');var s=n(4848),i=n(8453);const l={},c="API-Referenz",t={},h=[{value:"Core-Komponenten",id:"core-komponenten",level:2},{value:"Button",id:"button",level:3},{value:"Props",id:"props",level:4},{value:"Input",id:"input",level:3},{value:"Props",id:"props-1",level:4},{value:"Select",id:"select",level:3},{value:"Props",id:"props-2",level:4},{value:"Layout-Komponenten",id:"layout-komponenten",level:2},{value:"Container",id:"container",level:3},{value:"Props",id:"props-3",level:4},{value:"Grid",id:"grid",level:3},{value:"Props",id:"props-4",level:4},{value:"Chart-Komponenten",id:"chart-komponenten",level:2},{value:"LineChart",id:"linechart",level:3},{value:"Props",id:"props-5",level:4},{value:"LineChartSeries Typ",id:"linechartseries-typ",level:4},{value:"Theme-System",id:"theme-system",level:2},{value:"ThemeProvider",id:"themeprovider",level:3},{value:"Props",id:"props-6",level:4},{value:"useTheme Hook",id:"usetheme-hook",level:3},{value:"R\xfcckgabewerte",id:"r\xfcckgabewerte",level:4}];function x(e){const d={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(d.header,{children:(0,s.jsx)(d.h1,{id:"api-referenz",children:"API-Referenz"})}),"\n",(0,s.jsx)(d.p,{children:"Diese Seite bietet eine detaillierte API-Referenz f\xfcr alle Komponenten der Smolitux UI Bibliothek."}),"\n",(0,s.jsx)(d.h2,{id:"core-komponenten",children:"Core-Komponenten"}),"\n",(0,s.jsx)(d.h3,{id:"button",children:"Button"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-tsx",children:"import { Button } from '@smolitux/core';\n\n<Button\n  variant=\"primary\"\n  size=\"md\"\n  disabled={false}\n  onClick={() => console.log('Button geklickt')}\n>\n  Klick mich\n</Button>\n"})}),"\n",(0,s.jsx)(d.h4,{id:"props",children:"Props"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{children:"Prop"}),(0,s.jsx)(d.th,{children:"Typ"}),(0,s.jsx)(d.th,{children:"Standard"}),(0,s.jsx)(d.th,{children:"Beschreibung"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"variant"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger'"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"'primary'"})}),(0,s.jsx)(d.td,{children:"Die Variante des Buttons"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"size"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"'xs' | 'sm' | 'md' | 'lg' | 'xl'"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"'md'"})}),(0,s.jsx)(d.td,{children:"Die Gr\xf6\xdfe des Buttons"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"disabled"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"boolean"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"false"})}),(0,s.jsx)(d.td,{children:"Deaktiviert den Button"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"fullWidth"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"boolean"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"false"})}),(0,s.jsx)(d.td,{children:"Button nimmt die volle Breite ein"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"leftIcon"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"ReactNode"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Icon links vom Text"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"rightIcon"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"ReactNode"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Icon rechts vom Text"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"isLoading"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"boolean"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"false"})}),(0,s.jsx)(d.td,{children:"Zeigt einen Ladezustand an"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"loadingText"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"string"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Text w\xe4hrend des Ladezustands"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"onClick"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"(event: React.MouseEvent<HTMLButtonElement>) => void"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Klick-Handler"})]})]})]}),"\n",(0,s.jsx)(d.h3,{id:"input",children:"Input"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-tsx",children:'import { Input } from \'@smolitux/core\';\nimport { useState } from \'react\';\n\n// In einer Komponente:\nconst [email, setEmail] = useState(\'\');\n\n<Input\n  label="E-Mail"\n  type="email"\n  placeholder="name@beispiel.de"\n  value={email}\n  onChange={(e) => setEmail(e.target.value)}\n  error="Ung\xfcltige E-Mail-Adresse"\n/>\n'})}),"\n",(0,s.jsx)(d.h4,{id:"props-1",children:"Props"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{children:"Prop"}),(0,s.jsx)(d.th,{children:"Typ"}),(0,s.jsx)(d.th,{children:"Standard"}),(0,s.jsx)(d.th,{children:"Beschreibung"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"label"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"string"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Label f\xfcr das Eingabefeld"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"type"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"'text'"})}),(0,s.jsx)(d.td,{children:"Typ des Eingabefelds"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"placeholder"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"string"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Platzhaltertext"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"value"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"string"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Wert des Eingabefelds"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"defaultValue"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"string"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Standardwert des Eingabefelds"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"onChange"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"(event: React.ChangeEvent<HTMLInputElement>) => void"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"\xc4nderungs-Handler"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"onBlur"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"(event: React.FocusEvent<HTMLInputElement>) => void"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Blur-Handler"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"onFocus"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"(event: React.FocusEvent<HTMLInputElement>) => void"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Focus-Handler"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"error"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"string"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Fehlermeldung"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"disabled"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"boolean"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"false"})}),(0,s.jsx)(d.td,{children:"Deaktiviert das Eingabefeld"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"readOnly"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"boolean"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"false"})}),(0,s.jsx)(d.td,{children:"Schreibgesch\xfctzt"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"required"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"boolean"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"false"})}),(0,s.jsx)(d.td,{children:"Pflichtfeld"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"size"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"'sm' | 'md' | 'lg'"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"'md'"})}),(0,s.jsx)(d.td,{children:"Gr\xf6\xdfe des Eingabefelds"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"leftElement"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"ReactNode"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Element links im Eingabefeld"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"rightElement"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"ReactNode"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Element rechts im Eingabefeld"})]})]})]}),"\n",(0,s.jsx)(d.h3,{id:"select",children:"Select"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-tsx",children:"import { Select } from '@smolitux/core';\nimport { useState } from 'react';\n\n// In einer Komponente:\nconst [selectedCountry, setSelectedCountry] = useState('de');\n\n<Select\n  label=\"Land\"\n  options={[\n    { value: 'de', label: 'Deutschland' },\n    { value: 'at', label: '\xd6sterreich' },\n    { value: 'ch', label: 'Schweiz' },\n  ]}\n  value={selectedCountry}\n  onChange={(value) => setSelectedCountry(value)}\n/>\n"})}),"\n",(0,s.jsx)(d.h4,{id:"props-2",children:"Props"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{children:"Prop"}),(0,s.jsx)(d.th,{children:"Typ"}),(0,s.jsx)(d.th,{children:"Standard"}),(0,s.jsx)(d.th,{children:"Beschreibung"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"label"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"string"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Label f\xfcr das Auswahlfeld"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"options"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"Array<{ value: string; label: string; disabled?: boolean }>"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"[]"})}),(0,s.jsx)(d.td,{children:"Optionen f\xfcr das Auswahlfeld"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"value"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"string"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Ausgew\xe4hlter Wert"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"defaultValue"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"string"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Standardwert"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"onChange"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"(value: string) => void"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"\xc4nderungs-Handler"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"placeholder"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"string"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Platzhaltertext"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"disabled"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"boolean"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"false"})}),(0,s.jsx)(d.td,{children:"Deaktiviert das Auswahlfeld"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"error"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"string"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Fehlermeldung"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"required"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"boolean"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"false"})}),(0,s.jsx)(d.td,{children:"Pflichtfeld"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"size"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"'sm' | 'md' | 'lg'"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"'md'"})}),(0,s.jsx)(d.td,{children:"Gr\xf6\xdfe des Auswahlfelds"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"isSearchable"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"boolean"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"false"})}),(0,s.jsx)(d.td,{children:"Erm\xf6glicht die Suche"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"isMulti"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"boolean"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"false"})}),(0,s.jsx)(d.td,{children:"Erm\xf6glicht Mehrfachauswahl"})]})]})]}),"\n",(0,s.jsx)(d.h2,{id:"layout-komponenten",children:"Layout-Komponenten"}),"\n",(0,s.jsx)(d.h3,{id:"container",children:"Container"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-tsx",children:"import { Container } from '@smolitux/layout';\n\n<Container maxWidth=\"lg\" disableGutters={false}>\n  <h1>Meine Seite</h1>\n  <p>Inhalt, der auf verschiedenen Bildschirmgr\xf6\xdfen konsistent angezeigt wird</p>\n</Container>\n"})}),"\n",(0,s.jsx)(d.h4,{id:"props-3",children:"Props"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{children:"Prop"}),(0,s.jsx)(d.th,{children:"Typ"}),(0,s.jsx)(d.th,{children:"Standard"}),(0,s.jsx)(d.th,{children:"Beschreibung"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"maxWidth"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'none'"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"'lg'"})}),(0,s.jsx)(d.td,{children:"Maximale Breite des Containers"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"disableGutters"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"boolean"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"false"})}),(0,s.jsx)(d.td,{children:"Horizontales Padding deaktivieren"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"fullHeight"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"boolean"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"false"})}),(0,s.jsx)(d.td,{children:"Container auf Bildschirmh\xf6he setzen"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"centerContent"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"boolean"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"false"})}),(0,s.jsx)(d.td,{children:"Content innerhalb des Containers zentrieren"})]})]})]}),"\n",(0,s.jsx)(d.h3,{id:"grid",children:"Grid"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-tsx",children:"import { Grid } from '@smolitux/layout';\n\n<Grid container spacing={4}>\n  <Grid item xs={12} md={6}>\n    <Card>Inhalt 1</Card>\n  </Grid>\n  <Grid item xs={12} md={6}>\n    <Card>Inhalt 2</Card>\n  </Grid>\n</Grid>\n"})}),"\n",(0,s.jsx)(d.h4,{id:"props-4",children:"Props"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{children:"Prop"}),(0,s.jsx)(d.th,{children:"Typ"}),(0,s.jsx)(d.th,{children:"Standard"}),(0,s.jsx)(d.th,{children:"Beschreibung"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"container"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"boolean"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"false"})}),(0,s.jsx)(d.td,{children:"Container-Modus aktivieren (f\xfcr Grid-Container)"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"item"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"boolean"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"false"})}),(0,s.jsx)(d.td,{children:"Item-Modus aktivieren (f\xfcr Grid-Items)"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"spacing"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"0"})}),(0,s.jsx)(d.td,{children:"Abstand zwischen Grid-Items"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"columnSpacing"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"Grid['spacing']"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Horizontaler Abstand zwischen Grid-Items"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"rowSpacing"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"Grid['spacing']"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Vertikaler Abstand zwischen Grid-Items"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"justifyContent"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Ausrichtung der Items entlang der Hauptachse"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"alignItems"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Ausrichtung der Items entlang der Kreuzachse"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"direction"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"'row' | 'row-reverse' | 'column' | 'column-reverse'"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Flex-Direction der Items"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"wrap"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"'nowrap' | 'wrap' | 'wrap-reverse'"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"'wrap'"})}),(0,s.jsx)(d.td,{children:"Flex-Wrap-Verhalten"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"xs"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"number | 'auto' | boolean"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Anzahl der Spalten f\xfcr xs-Bildschirme (0px+)"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"sm"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"number | 'auto' | boolean"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Anzahl der Spalten f\xfcr sm-Bildschirme (640px+)"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"md"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"number | 'auto' | boolean"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Anzahl der Spalten f\xfcr md-Bildschirme (768px+)"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"lg"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"number | 'auto' | boolean"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Anzahl der Spalten f\xfcr lg-Bildschirme (1024px+)"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"xl"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"number | 'auto' | boolean"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Anzahl der Spalten f\xfcr xl-Bildschirme (1280px+)"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"xxl"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"number | 'auto' | boolean"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Anzahl der Spalten f\xfcr 2xl-Bildschirme (1536px+)"})]})]})]}),"\n",(0,s.jsx)(d.h2,{id:"chart-komponenten",children:"Chart-Komponenten"}),"\n",(0,s.jsx)(d.h3,{id:"linechart",children:"LineChart"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-tsx",children:"import { LineChart } from '@smolitux/charts';\n\n<LineChart\n  data={{\n    id: 'views',\n    name: 'Page Views',\n    data: [\n      { x: 'Jan', y: 100 },\n      { x: 'Feb', y: 150 },\n      { x: 'Mar', y: 200 },\n      { x: 'Apr', y: 120 },\n      { x: 'May', y: 180 },\n    ]\n  }}\n  height={300}\n  showGrid\n  showPoints\n/>\n"})}),"\n",(0,s.jsx)(d.h4,{id:"props-5",children:"Props"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{children:"Prop"}),(0,s.jsx)(d.th,{children:"Typ"}),(0,s.jsx)(d.th,{children:"Standard"}),(0,s.jsx)(d.th,{children:"Beschreibung"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"data"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"LineChartSeries | LineChartSeries[]"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Einzelne Datenserie oder Array von Serien"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"height"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"number"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"300"})}),(0,s.jsx)(d.td,{children:"H\xf6he des Charts"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"width"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"number | string"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"'100%'"})}),(0,s.jsx)(d.td,{children:"Breite des Charts"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"padding"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"{ top?: number; right?: number; bottom?: number; left?: number }"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"{ top: 30, right: 30, bottom: 40, left: 50 }"})}),(0,s.jsx)(d.td,{children:"Padding innerhalb des Charts"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"axisLabels"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"{ x?: string; y?: string }"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Achsentitel"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"units"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"{ x?: string; y?: string }"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Einheiten f\xfcr Achsenbeschriftungen"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"showGrid"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"boolean"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"true"})}),(0,s.jsx)(d.td,{children:"Grid-Linien anzeigen"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"showPoints"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"boolean"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"true"})}),(0,s.jsx)(d.td,{children:"Datenpunkte anzeigen"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"showTooltips"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"boolean"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"true"})}),(0,s.jsx)(d.td,{children:"Tooltips anzeigen"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"showLegend"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"boolean"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"true"})}),(0,s.jsx)(d.td,{children:"Legende anzeigen"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"legendPosition"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"'top' | 'right' | 'bottom' | 'left'"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"'top'"})}),(0,s.jsx)(d.td,{children:"Position der Legende"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"animated"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"boolean"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"true"})}),(0,s.jsx)(d.td,{children:"Animation aktivieren"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"startYAxisAtZero"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"boolean"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"false"})}),(0,s.jsx)(d.td,{children:"Y-Achse bei Null beginnen"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"colors"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"string[]"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Angepasste Farben f\xfcr mehrere Serien"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"formatYLabel"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"(value: number) => string"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"(value) => value.toString()"})}),(0,s.jsx)(d.td,{children:"Angepasste Formatierung f\xfcr Y-Achsenbeschriftungen"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"formatXLabel"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"(value: string | number) => string"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"(value) => value.toString()"})}),(0,s.jsx)(d.td,{children:"Angepasste Formatierung f\xfcr X-Achsenbeschriftungen"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"aspectRatio"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"number"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"16 / 9"})}),(0,s.jsx)(d.td,{children:"F\xfcr responsive SVG (viewBox)"})]})]})]}),"\n",(0,s.jsx)(d.h4,{id:"linechartseries-typ",children:"LineChartSeries Typ"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-typescript",children:"interface LineChartSeries {\n  id: string;\n  name: string;\n  color?: string;\n  lineType?: 'solid' | 'dashed' | 'dotted';\n  lineWidth?: number;\n  data: LineChartDataPoint[];\n}\n\ninterface LineChartDataPoint {\n  x: string | number;\n  y: number;\n  category?: string;\n  metadata?: Record<string, any>;\n}\n"})}),"\n",(0,s.jsx)(d.h2,{id:"theme-system",children:"Theme-System"}),"\n",(0,s.jsx)(d.h3,{id:"themeprovider",children:"ThemeProvider"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-tsx",children:"import { ThemeProvider, createTheme } from '@smolitux/theme';\n\n// Benutzerdefiniertes Theme erstellen\nconst customTheme = createTheme({\n  colors: {\n    primary: '#3498db',\n    secondary: '#2ecc71',\n  },\n  fonts: {\n    body: '\"Open Sans\", sans-serif',\n  },\n});\n\n// Theme anwenden\n<ThemeProvider theme={customTheme}>\n  <App />\n</ThemeProvider>\n"})}),"\n",(0,s.jsx)(d.h4,{id:"props-6",children:"Props"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{children:"Prop"}),(0,s.jsx)(d.th,{children:"Typ"}),(0,s.jsx)(d.th,{children:"Standard"}),(0,s.jsx)(d.th,{children:"Beschreibung"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"theme"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"Theme"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"defaultTheme"})}),(0,s.jsx)(d.td,{children:"Das zu verwendende Theme"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"children"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"ReactNode"})}),(0,s.jsx)(d.td,{children:"-"}),(0,s.jsx)(d.td,{children:"Die Komponenten, auf die das Theme angewendet werden soll"})]})]})]}),"\n",(0,s.jsx)(d.h3,{id:"usetheme-hook",children:"useTheme Hook"}),"\n",(0,s.jsx)(d.pre,{children:(0,s.jsx)(d.code,{className:"language-tsx",children:"import { useTheme } from '@smolitux/theme';\n\nfunction MyComponent() {\n  const { theme, themeMode, setThemeMode } = useTheme();\n  \n  return (\n    <div>\n      <p>Aktuelle Prim\xe4rfarbe: {theme.colors.primary}</p>\n      <p>Aktueller Modus: {themeMode}</p>\n      <button onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}>\n        Modus wechseln\n      </button>\n    </div>\n  );\n}\n"})}),"\n",(0,s.jsx)(d.h4,{id:"r\xfcckgabewerte",children:"R\xfcckgabewerte"}),"\n",(0,s.jsxs)(d.table,{children:[(0,s.jsx)(d.thead,{children:(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.th,{children:"Wert"}),(0,s.jsx)(d.th,{children:"Typ"}),(0,s.jsx)(d.th,{children:"Beschreibung"})]})}),(0,s.jsxs)(d.tbody,{children:[(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"theme"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"Theme"})}),(0,s.jsx)(d.td,{children:"Das aktuelle Theme-Objekt"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"themeMode"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"'light' | 'dark'"})}),(0,s.jsx)(d.td,{children:"Der aktuelle Theme-Modus"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"setThemeMode"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"(mode: 'light' | 'dark') => void"})}),(0,s.jsx)(d.td,{children:"Funktion zum \xc4ndern des Theme-Modus"})]}),(0,s.jsxs)(d.tr,{children:[(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"toggleThemeMode"})}),(0,s.jsx)(d.td,{children:(0,s.jsx)(d.code,{children:"() => void"})}),(0,s.jsx)(d.td,{children:"Funktion zum Umschalten des Theme-Modus"})]})]})]})]})}function j(e={}){const{wrapper:d}={...(0,i.R)(),...e.components};return d?(0,s.jsx)(d,{...e,children:(0,s.jsx)(x,{...e})}):x(e)}},8453:(e,d,n)=>{n.d(d,{R:()=>l,x:()=>c});var r=n(6540);const s={},i=r.createContext(s);function l(e){const d=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(d):{...d,...e}}),[d,e])}function c(e){let d;return d=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),r.createElement(i.Provider,{value:d},e.children)}}}]);