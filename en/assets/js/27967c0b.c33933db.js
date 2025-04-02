"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8259],{6329:(e,n,d)=>{d.r(n),d.d(n,{assets:()=>t,contentTitle:()=>c,default:()=>x,frontMatter:()=>l,metadata:()=>s,toc:()=>h});const s=JSON.parse('{"id":"components/README","title":"Smolitux UI Komponenten-Dokumentation","description":"Diese Dokumentation beschreibt die verf\xfcgbaren Komponenten in der Smolitux UI-Bibliothek.","source":"@site/docs/components/README.md","sourceDirName":"components","slug":"/components/","permalink":"/smolitux-ui/en/docs/components/","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/components/README.md","tags":[],"version":"current","frontMatter":{}}');var i=d(4848),r=d(8453);const l={},c="Smolitux UI Komponenten-Dokumentation",t={},h=[{value:"Inhaltsverzeichnis",id:"inhaltsverzeichnis",level:2},{value:"Einf\xfchrung",id:"einf\xfchrung",level:2},{value:"Installation",id:"installation",level:2},{value:"Basis-Komponenten",id:"basis-komponenten",level:2},{value:"Card",id:"card",level:3},{value:"Props",id:"props",level:4},{value:"Button",id:"button",level:3},{value:"Props",id:"props-1",level:4},{value:"ProgressBar",id:"progressbar",level:3},{value:"Props",id:"props-2",level:4},{value:"TabView",id:"tabview",level:3},{value:"Props",id:"props-3",level:4},{value:"Tooltip",id:"tooltip",level:3},{value:"Props",id:"props-4",level:4},{value:"KI-Komponenten",id:"ki-komponenten",level:2},{value:"TrendingTopics",id:"trendingtopics",level:3},{value:"EngagementScore",id:"engagementscore",level:3},{value:"Styling",id:"styling",level:2},{value:"Theming",id:"theming",level:2},{value:"Barrierefreiheit",id:"barrierefreiheit",level:2}];function o(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"smolitux-ui-komponenten-dokumentation",children:"Smolitux UI Komponenten-Dokumentation"})}),"\n",(0,i.jsx)(n.p,{children:"Diese Dokumentation beschreibt die verf\xfcgbaren Komponenten in der Smolitux UI-Bibliothek."}),"\n",(0,i.jsx)(n.h2,{id:"inhaltsverzeichnis",children:"Inhaltsverzeichnis"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#einf%C3%BChrung",children:"Einf\xfchrung"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#installation",children:"Installation"})}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"#basis-komponenten",children:"Basis-Komponenten"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#card",children:"Card"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#button",children:"Button"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#progressbar",children:"ProgressBar"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#tabview",children:"TabView"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#tooltip",children:"Tooltip"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"#ki-komponenten",children:"KI-Komponenten"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#trendingtopics",children:"TrendingTopics"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#engagementscore",children:"EngagementScore"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#styling",children:"Styling"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#theming",children:"Theming"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#barrierefreiheit",children:"Barrierefreiheit"})}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"einf\xfchrung",children:"Einf\xfchrung"}),"\n",(0,i.jsx)(n.p,{children:"Smolitux UI ist eine Komponenten-Bibliothek f\xfcr React-Anwendungen, die eine Vielzahl von wiederverwendbaren UI-Komponenten bietet. Die Bibliothek ist modular aufgebaut und in verschiedene Pakete unterteilt, die je nach Bedarf importiert werden k\xf6nnen."}),"\n",(0,i.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# Installation des gesamten Pakets\nnpm install @smolitux/ui\n\n# Installation einzelner Pakete\nnpm install @smolitux/utils\nnpm install @smolitux/core\nnpm install @smolitux/ai\n# usw.\n"})}),"\n",(0,i.jsx)(n.h2,{id:"basis-komponenten",children:"Basis-Komponenten"}),"\n",(0,i.jsx)(n.h3,{id:"card",children:"Card"}),"\n",(0,i.jsx)(n.p,{children:"Die Card-Komponente dient als Container f\xfcr verwandte Inhalte und Aktionen."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:"import { Card } from '@smolitux/utils/components/patterns';\n\nfunction Example() {\n  return (\n    <Card>\n      <h2>Titel</h2>\n      <p>Inhalt der Karte</p>\n    </Card>\n  );\n}\n"})}),"\n",(0,i.jsx)(n.h4,{id:"props",children:"Props"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Prop"}),(0,i.jsx)(n.th,{children:"Typ"}),(0,i.jsx)(n.th,{children:"Standard"}),(0,i.jsx)(n.th,{children:"Beschreibung"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"bordered"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"true"})}),(0,i.jsx)(n.td,{children:"Ob die Karte einen Rahmen haben soll"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"shadowed"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"false"})}),(0,i.jsx)(n.td,{children:"Ob die Karte einen Schatten haben soll"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"rounded"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"true"})}),(0,i.jsx)(n.td,{children:"Ob die Karte abgerundete Ecken haben soll"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"padded"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"true"})}),(0,i.jsx)(n.td,{children:"Ob die Karte Innenabstand haben soll"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"hoverable"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"false"})}),(0,i.jsx)(n.td,{children:"Ob die Karte einen Hover-Effekt haben soll"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"className"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"''"})}),(0,i.jsx)(n.td,{children:"Zus\xe4tzliche CSS-Klassen"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"style"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"React.CSSProperties"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"{}"})}),(0,i.jsx)(n.td,{children:"Inline-Styles"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"children"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"React.ReactNode"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Inhalt der Karte"})]})]})]}),"\n",(0,i.jsx)(n.h3,{id:"button",children:"Button"}),"\n",(0,i.jsx)(n.p,{children:"Die Button-Komponente dient zum Ausl\xf6sen von Aktionen oder Ereignissen."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:"import { Button } from '@smolitux/utils/components/patterns';\n\nfunction Example() {\n  return (\n    <Button onClick={() => console.log('Geklickt!')}>\n      Klick mich\n    </Button>\n  );\n}\n"})}),"\n",(0,i.jsx)(n.h4,{id:"props-1",children:"Props"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Prop"}),(0,i.jsx)(n.th,{children:"Typ"}),(0,i.jsx)(n.th,{children:"Standard"}),(0,i.jsx)(n.th,{children:"Beschreibung"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"variant"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'solid' | 'outline' | 'ghost' | 'link'"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'solid'"})}),(0,i.jsx)(n.td,{children:"Variante des Buttons"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"size"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'xs' | 'sm' | 'md' | 'lg' | 'xl'"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'md'"})}),(0,i.jsx)(n.td,{children:"Gr\xf6\xdfe des Buttons"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"disabled"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"false"})}),(0,i.jsx)(n.td,{children:"Ob der Button deaktiviert ist"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"loading"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"false"})}),(0,i.jsx)(n.td,{children:"Ob der Button im Ladezustand ist"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"leftIcon"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"React.ReactNode"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Icon links vom Text"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"rightIcon"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"React.ReactNode"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Icon rechts vom Text"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"type"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'button' | 'submit' | 'reset'"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'button'"})}),(0,i.jsx)(n.td,{children:"Typ des Buttons"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"fullWidth"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"false"})}),(0,i.jsx)(n.td,{children:"Ob der Button die volle Breite einnehmen soll"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"colorScheme"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'primary'"})}),(0,i.jsx)(n.td,{children:"Farbschema des Buttons"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"onClick"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"(event: React.MouseEvent<HTMLButtonElement>) => void"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Klick-Handler"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"className"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"''"})}),(0,i.jsx)(n.td,{children:"Zus\xe4tzliche CSS-Klassen"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"style"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"React.CSSProperties"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"{}"})}),(0,i.jsx)(n.td,{children:"Inline-Styles"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"children"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"React.ReactNode"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Inhalt des Buttons"})]})]})]}),"\n",(0,i.jsx)(n.h3,{id:"progressbar",children:"ProgressBar"}),"\n",(0,i.jsx)(n.p,{children:"Die ProgressBar-Komponente zeigt den Fortschritt eines Vorgangs an."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:"import { ProgressBar } from '@smolitux/utils/components/patterns';\n\nfunction Example() {\n  return (\n    <ProgressBar value={75} max={100} showValue />\n  );\n}\n"})}),"\n",(0,i.jsx)(n.h4,{id:"props-2",children:"Props"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Prop"}),(0,i.jsx)(n.th,{children:"Typ"}),(0,i.jsx)(n.th,{children:"Standard"}),(0,i.jsx)(n.th,{children:"Beschreibung"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"value"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"number"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Aktueller Wert"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"max"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"number"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"100"})}),(0,i.jsx)(n.td,{children:"Maximaler Wert"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"min"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"number"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"0"})}),(0,i.jsx)(n.td,{children:"Minimaler Wert"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"showValue"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"false"})}),(0,i.jsx)(n.td,{children:"Ob der Wert angezeigt werden soll"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"formatValue"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"(value: number, max: number) => string"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Funktion zur Formatierung des Werts"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"indeterminate"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"false"})}),(0,i.jsx)(n.td,{children:"Ob der Fortschritt unbestimmt ist"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"colorScheme"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'primary'"})}),(0,i.jsx)(n.td,{children:"Farbschema der Fortschrittsanzeige"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"size"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'xs' | 'sm' | 'md' | 'lg' | 'xl'"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'md'"})}),(0,i.jsx)(n.td,{children:"Gr\xf6\xdfe der Fortschrittsanzeige"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"rounded"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"true"})}),(0,i.jsx)(n.td,{children:"Ob die Fortschrittsanzeige abgerundete Ecken haben soll"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"animated"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"false"})}),(0,i.jsx)(n.td,{children:"Ob die Fortschrittsanzeige animiert sein soll"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"className"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"''"})}),(0,i.jsx)(n.td,{children:"Zus\xe4tzliche CSS-Klassen"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"progressClassName"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"''"})}),(0,i.jsx)(n.td,{children:"Zus\xe4tzliche CSS-Klassen f\xfcr das Fortschrittselement"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"style"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"React.CSSProperties"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"{}"})}),(0,i.jsx)(n.td,{children:"Inline-Styles"})]})]})]}),"\n",(0,i.jsx)(n.h3,{id:"tabview",children:"TabView"}),"\n",(0,i.jsx)(n.p,{children:"Die TabView-Komponente erm\xf6glicht die Organisation von Inhalten in Tabs."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:"import { TabView } from '@smolitux/utils/components/patterns';\n\nfunction Example() {\n  return (\n    <TabView\n      tabs={[\n        { id: 'tab1', label: 'Tab 1', content: <div>Inhalt von Tab 1</div> },\n        { id: 'tab2', label: 'Tab 2', content: <div>Inhalt von Tab 2</div> },\n      ]}\n      activeTab=\"tab1\"\n      onChange={(tabId) => console.log(`Tab ${tabId} ausgew\xe4hlt`)}\n    />\n  );\n}\n"})}),"\n",(0,i.jsx)(n.h4,{id:"props-3",children:"Props"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Prop"}),(0,i.jsx)(n.th,{children:"Typ"}),(0,i.jsx)(n.th,{children:"Standard"}),(0,i.jsx)(n.th,{children:"Beschreibung"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"tabs"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"TabItem[]"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Array von Tab-Elementen"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"activeTab"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"ID des aktiven Tabs"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"onChange"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"(tabId: string) => void"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Callback bei Tab-Wechsel"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"orientation"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'horizontal' | 'vertical'"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'horizontal'"})}),(0,i.jsx)(n.td,{children:"Ausrichtung der Tabs"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"size"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'sm' | 'md' | 'lg'"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'md'"})}),(0,i.jsx)(n.td,{children:"Gr\xf6\xdfe der Tabs"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"variant"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'line' | 'enclosed' | 'soft-rounded' | 'solid-rounded' | 'unstyled'"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'line'"})}),(0,i.jsx)(n.td,{children:"Variante der Tabs"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"isFitted"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"false"})}),(0,i.jsx)(n.td,{children:"Ob die Tabs die volle Breite einnehmen sollen"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"isLazy"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"true"})}),(0,i.jsx)(n.td,{children:"Ob Inhalte erst beim Aktivieren geladen werden sollen"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"isManual"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"false"})}),(0,i.jsx)(n.td,{children:"Ob die Tab-Auswahl manuell gesteuert wird"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"className"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"''"})}),(0,i.jsx)(n.td,{children:"Zus\xe4tzliche CSS-Klassen"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"tabListClassName"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"''"})}),(0,i.jsx)(n.td,{children:"Zus\xe4tzliche CSS-Klassen f\xfcr die Tab-Liste"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"tabPanelsClassName"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"''"})}),(0,i.jsx)(n.td,{children:"Zus\xe4tzliche CSS-Klassen f\xfcr die Tab-Panels"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"activeTabClassName"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"''"})}),(0,i.jsx)(n.td,{children:"Zus\xe4tzliche CSS-Klassen f\xfcr den aktiven Tab"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"inactiveTabClassName"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"''"})}),(0,i.jsx)(n.td,{children:"Zus\xe4tzliche CSS-Klassen f\xfcr inaktive Tabs"})]})]})]}),"\n",(0,i.jsx)(n.h3,{id:"tooltip",children:"Tooltip"}),"\n",(0,i.jsx)(n.p,{children:"Die Tooltip-Komponente zeigt zus\xe4tzliche Informationen an, wenn der Benutzer mit einem Element interagiert."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:"import { Tooltip } from '@smolitux/utils/components/patterns';\n\nfunction Example() {\n  return (\n    <Tooltip content=\"Zus\xe4tzliche Informationen\">\n      <button>Hover mich</button>\n    </Tooltip>\n  );\n}\n"})}),"\n",(0,i.jsx)(n.h4,{id:"props-4",children:"Props"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Prop"}),(0,i.jsx)(n.th,{children:"Typ"}),(0,i.jsx)(n.th,{children:"Standard"}),(0,i.jsx)(n.th,{children:"Beschreibung"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"content"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"React.ReactNode"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Inhalt des Tooltips"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"children"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"React.ReactElement"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Element, das den Tooltip ausl\xf6st"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"placement"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"TooltipPlacement"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'top'"})}),(0,i.jsx)(n.td,{children:"Position des Tooltips"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"disabled"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"false"})}),(0,i.jsx)(n.td,{children:"Ob der Tooltip deaktiviert ist"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"showDelay"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"number"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"0"})}),(0,i.jsx)(n.td,{children:"Verz\xf6gerung vor dem Anzeigen (in ms)"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"hideDelay"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"number"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"0"})}),(0,i.jsx)(n.td,{children:"Verz\xf6gerung vor dem Ausblenden (in ms)"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"hasArrow"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"true"})}),(0,i.jsx)(n.td,{children:"Ob der Tooltip einen Pfeil haben soll"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"isOpen"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Ob der Tooltip ge\xf6ffnet ist"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"defaultIsOpen"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"false"})}),(0,i.jsx)(n.td,{children:"Standard-\xd6ffnungszustand"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"onOpen"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"() => void"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Callback beim \xd6ffnen"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"onClose"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"() => void"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Callback beim Schlie\xdfen"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"className"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"''"})}),(0,i.jsx)(n.td,{children:"Zus\xe4tzliche CSS-Klassen"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"tooltipClassName"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"''"})}),(0,i.jsx)(n.td,{children:"Zus\xe4tzliche CSS-Klassen f\xfcr den Tooltip"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"arrowClassName"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"''"})}),(0,i.jsx)(n.td,{children:"Zus\xe4tzliche CSS-Klassen f\xfcr den Pfeil"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"tooltipStyle"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"React.CSSProperties"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"{}"})}),(0,i.jsx)(n.td,{children:"Inline-Styles f\xfcr den Tooltip"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"offset"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"number"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"8"})}),(0,i.jsx)(n.td,{children:"Abstand vom ausl\xf6senden Element (in px)"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"closeOnClick"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"true"})}),(0,i.jsx)(n.td,{children:"Ob der Tooltip beim Klicken au\xdferhalb geschlossen werden soll"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"closeOnEsc"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"true"})}),(0,i.jsx)(n.td,{children:"Ob der Tooltip beim Dr\xfccken der Escape-Taste geschlossen werden soll"})]})]})]}),"\n",(0,i.jsx)(n.h2,{id:"ki-komponenten",children:"KI-Komponenten"}),"\n",(0,i.jsx)(n.h3,{id:"trendingtopics",children:"TrendingTopics"}),"\n",(0,i.jsx)(n.p,{children:"Die TrendingTopics-Komponente zeigt Trending-Themen und -Inhalte an."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:"import { TrendingTopics } from '@smolitux/ai/components';\n\nfunction Example() {\n  return (\n    <TrendingTopics\n      title=\"Trending-Themen\"\n      topics={topics}\n      onRefresh={handleRefresh}\n    />\n  );\n}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"engagementscore",children:"EngagementScore"}),"\n",(0,i.jsx)(n.p,{children:"Die EngagementScore-Komponente zeigt und erkl\xe4rt Engagement-Scores."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:"import { EngagementScore } from '@smolitux/ai/components';\n\nfunction Example() {\n  return (\n    <EngagementScore\n      title=\"Engagement-Analyse\"\n      score={78}\n      metrics={metrics}\n      onRefresh={handleRefresh}\n    />\n  );\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"styling",children:"Styling"}),"\n",(0,i.jsx)(n.p,{children:"Die Komponenten unterst\xfctzen verschiedene Styling-Optionen:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"className"}),": Alle Komponenten akzeptieren eine ",(0,i.jsx)(n.code,{children:"className"}),"-Prop f\xfcr zus\xe4tzliche CSS-Klassen."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"style"}),": Alle Komponenten akzeptieren eine ",(0,i.jsx)(n.code,{children:"style"}),"-Prop f\xfcr Inline-Styles."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Utility-Funktionen"}),": Das ",(0,i.jsx)(n.code,{children:"@smolitux/utils"}),"-Paket bietet Utility-Funktionen f\xfcr Farben, Abst\xe4nde, Typografie und mehr."]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"theming",children:"Theming"}),"\n",(0,i.jsx)(n.p,{children:"Die Komponenten unterst\xfctzen ein flexibles Theming-System, das auf CSS-Variablen basiert. Sie k\xf6nnen das Erscheinungsbild der Komponenten anpassen, indem Sie die CSS-Variablen \xfcberschreiben."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-css",children:":root {\n  --primary-color: #3b82f6;\n  --secondary-color: #6b7280;\n  --success-color: #10b981;\n  --danger-color: #ef4444;\n  --warning-color: #f59e0b;\n  --info-color: #3b82f6;\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"barrierefreiheit",children:"Barrierefreiheit"}),"\n",(0,i.jsx)(n.p,{children:"Alle Komponenten sind so konzipiert, dass sie den WCAG 2.1 AA-Richtlinien entsprechen. Sie unterst\xfctzen Tastaturnavigation, Screenreader und andere Hilfstechnologien."})]})}function x(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(o,{...e})}):o(e)}},8453:(e,n,d)=>{d.d(n,{R:()=>l,x:()=>c});var s=d(6540);const i={},r=s.createContext(i);function l(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);