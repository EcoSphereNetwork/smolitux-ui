"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5130],{5428:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>o,frontMatter:()=>d,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"components/navigation/stepper","title":"Stepper","description":"Die Stepper-Komponente zeigt den Fortschritt in einem mehrstufigen Prozess an und erm\xf6glicht die Navigation zwischen den einzelnen Schritten.","source":"@site/docs/components/navigation/stepper.md","sourceDirName":"components/navigation","slug":"/components/navigation/stepper","permalink":"/smolitux-ui/en/docs/components/navigation/stepper","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/components/navigation/stepper.md","tags":[],"version":"current","frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"Pagination","permalink":"/smolitux-ui/en/docs/components/navigation/pagination"},"next":{"title":"Tabs","permalink":"/smolitux-ui/en/docs/components/navigation/tabs"}}');var i=t(4848),r=t(8453);const d={},a="Stepper",l={},c=[{value:"Import",id:"import",level:2},{value:"Verwendung",id:"verwendung",level:2},{value:"Einfacher Stepper",id:"einfacher-stepper",level:3},{value:"Stepper mit Inhalt",id:"stepper-mit-inhalt",level:3},{value:"Vertikaler Stepper",id:"vertikaler-stepper",level:3},{value:"Stepper mit Beschreibungen",id:"stepper-mit-beschreibungen",level:3},{value:"Stepper mit Icons",id:"stepper-mit-icons",level:3},{value:"Stepper mit optionalen Schritten",id:"stepper-mit-optionalen-schritten",level:3},{value:"Stepper mit deaktivierten Schritten",id:"stepper-mit-deaktivierten-schritten",level:3},{value:"Stepper mit benutzerdefinierten Aktionen",id:"stepper-mit-benutzerdefinierten-aktionen",level:3},{value:"Stepper ohne Verbindungslinien",id:"stepper-ohne-verbindungslinien",level:3},{value:"Stepper mit verschiedenen Varianten",id:"stepper-mit-verschiedenen-varianten",level:3},{value:"Stepper mit verschiedenen Gr\xf6\xdfen",id:"stepper-mit-verschiedenen-gr\xf6\xdfen",level:3},{value:"Props",id:"props",level:2},{value:"Stepper Props",id:"stepper-props",level:3},{value:"Step Interface",id:"step-interface",level:3},{value:"StepperContent Props",id:"steppercontent-props",level:3},{value:"StepperActions Props",id:"stepperactions-props",level:3},{value:"Barrierefreiheit",id:"barrierefreiheit",level:2},{value:"Beispiele",id:"beispiele",level:2},{value:"Registrierungsformular mit Stepper",id:"registrierungsformular-mit-stepper",level:3},{value:"Checkout-Prozess mit Stepper",id:"checkout-prozess-mit-stepper",level:3}];function p(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"stepper",children:"Stepper"})}),"\n",(0,i.jsx)(n.p,{children:"Die Stepper-Komponente zeigt den Fortschritt in einem mehrstufigen Prozess an und erm\xf6glicht die Navigation zwischen den einzelnen Schritten."}),"\n",(0,i.jsx)(n.h2,{id:"import",children:"Import"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:"import { Stepper, StepperContent, StepperActions } from '@smolitux/core';\n"})}),"\n",(0,i.jsx)(n.h2,{id:"verwendung",children:"Verwendung"}),"\n",(0,i.jsx)(n.h3,{id:"einfacher-stepper",children:"Einfacher Stepper"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:"const steps = [\n  { id: 'step1', title: 'Schritt 1' },\n  { id: 'step2', title: 'Schritt 2' },\n  { id: 'step3', title: 'Schritt 3' }\n];\n\nfunction SimpleStepperExample() {\n  const [activeStep, setActiveStep] = useState(0);\n  \n  return (\n    <Stepper\n      steps={steps}\n      activeStep={activeStep}\n      onStepChange={setActiveStep}\n    />\n  );\n}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"stepper-mit-inhalt",children:"Stepper mit Inhalt"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:"function StepperWithContentExample() {\n  const [activeStep, setActiveStep] = useState(0);\n  \n  const steps = [\n    { id: 'step1', title: 'Pers\xf6nliche Daten' },\n    { id: 'step2', title: 'Adresse' },\n    { id: 'step3', title: 'Best\xe4tigung' }\n  ];\n  \n  return (\n    <Stepper\n      steps={steps}\n      activeStep={activeStep}\n      onStepChange={setActiveStep}\n    >\n      <StepperContent>\n        <div>\n          <h3>Pers\xf6nliche Daten</h3>\n          <p>Inhalt f\xfcr Schritt 1</p>\n        </div>\n        \n        <div>\n          <h3>Adresse</h3>\n          <p>Inhalt f\xfcr Schritt 2</p>\n        </div>\n        \n        <div>\n          <h3>Best\xe4tigung</h3>\n          <p>Inhalt f\xfcr Schritt 3</p>\n        </div>\n      </StepperContent>\n      \n      <StepperActions />\n    </Stepper>\n  );\n}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"vertikaler-stepper",children:"Vertikaler Stepper"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:'<Stepper\n  steps={steps}\n  activeStep={activeStep}\n  onStepChange={setActiveStep}\n  orientation="vertical"\n>\n  <StepperContent>\n    {/* Inhalte f\xfcr die Schritte */}\n  </StepperContent>\n  \n  <StepperActions />\n</Stepper>\n'})}),"\n",(0,i.jsx)(n.h3,{id:"stepper-mit-beschreibungen",children:"Stepper mit Beschreibungen"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:"const stepsWithDescription = [\n  { \n    id: 'step1', \n    title: 'Pers\xf6nliche Daten', \n    description: 'Geben Sie Ihre pers\xf6nlichen Informationen ein' \n  },\n  { \n    id: 'step2', \n    title: 'Adresse', \n    description: 'Geben Sie Ihre Adresse ein' \n  },\n  { \n    id: 'step3', \n    title: 'Best\xe4tigung', \n    description: '\xdcberpr\xfcfen und best\xe4tigen Sie Ihre Angaben' \n  }\n];\n\n<Stepper\n  steps={stepsWithDescription}\n  activeStep={activeStep}\n  onStepChange={setActiveStep}\n/>\n"})}),"\n",(0,i.jsx)(n.h3,{id:"stepper-mit-icons",children:"Stepper mit Icons"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:'const stepsWithIcons = [\n  { \n    id: \'step1\', \n    title: \'Pers\xf6nliche Daten\', \n    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />\n    </svg>\n  },\n  { \n    id: \'step2\', \n    title: \'Adresse\', \n    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />\n    </svg>\n  },\n  { \n    id: \'step3\', \n    title: \'Best\xe4tigung\', \n    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />\n    </svg>\n  }\n];\n\n<Stepper\n  steps={stepsWithIcons}\n  activeStep={activeStep}\n  onStepChange={setActiveStep}\n/>\n'})}),"\n",(0,i.jsx)(n.h3,{id:"stepper-mit-optionalen-schritten",children:"Stepper mit optionalen Schritten"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:"const stepsWithOptional = [\n  { id: 'step1', title: 'Pers\xf6nliche Daten' },\n  { id: 'step2', title: 'Adresse', optional: true },\n  { id: 'step3', title: 'Best\xe4tigung' }\n];\n\n<Stepper\n  steps={stepsWithOptional}\n  activeStep={activeStep}\n  onStepChange={setActiveStep}\n/>\n"})}),"\n",(0,i.jsx)(n.h3,{id:"stepper-mit-deaktivierten-schritten",children:"Stepper mit deaktivierten Schritten"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:"const stepsWithDisabled = [\n  { id: 'step1', title: 'Pers\xf6nliche Daten' },\n  { id: 'step2', title: 'Adresse' },\n  { id: 'step3', title: 'Best\xe4tigung', disabled: true }\n];\n\n<Stepper\n  steps={stepsWithDisabled}\n  activeStep={activeStep}\n  onStepChange={setActiveStep}\n/>\n"})}),"\n",(0,i.jsx)(n.h3,{id:"stepper-mit-benutzerdefinierten-aktionen",children:"Stepper mit benutzerdefinierten Aktionen"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:"function CustomActionsStepperExample() {\n  const [activeStep, setActiveStep] = useState(0);\n  \n  const steps = [\n    { id: 'step1', title: 'Schritt 1' },\n    { id: 'step2', title: 'Schritt 2' },\n    { id: 'step3', title: 'Schritt 3' }\n  ];\n  \n  const handleComplete = () => {\n    console.log('Prozess abgeschlossen!');\n    // Hier k\xf6nnte z.B. ein API-Aufruf erfolgen\n  };\n  \n  return (\n    <Stepper\n      steps={steps}\n      activeStep={activeStep}\n      onStepChange={setActiveStep}\n    >\n      <StepperContent>\n        {/* Inhalte f\xfcr die Schritte */}\n      </StepperContent>\n      \n      <StepperActions\n        backLabel=\"Zur\xfcck\"\n        nextLabel=\"Fortfahren\"\n        completeLabel=\"Senden\"\n        onBack={() => console.log('Zur\xfcck geklickt')}\n        onNext={() => console.log('Weiter geklickt')}\n        onComplete={handleComplete}\n      />\n    </Stepper>\n  );\n}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"stepper-ohne-verbindungslinien",children:"Stepper ohne Verbindungslinien"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:"<Stepper\n  steps={steps}\n  activeStep={activeStep}\n  onStepChange={setActiveStep}\n  showConnector={false}\n/>\n"})}),"\n",(0,i.jsx)(n.h3,{id:"stepper-mit-verschiedenen-varianten",children:"Stepper mit verschiedenen Varianten"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:'<Stepper\n  steps={steps}\n  activeStep={activeStep}\n  onStepChange={setActiveStep}\n  variant="outlined"\n/>\n\n<Stepper\n  steps={steps}\n  activeStep={activeStep}\n  onStepChange={setActiveStep}\n  variant="contained"\n/>\n'})}),"\n",(0,i.jsx)(n.h3,{id:"stepper-mit-verschiedenen-gr\xf6\xdfen",children:"Stepper mit verschiedenen Gr\xf6\xdfen"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:'<Stepper\n  steps={steps}\n  activeStep={activeStep}\n  onStepChange={setActiveStep}\n  size="sm"\n/>\n\n<Stepper\n  steps={steps}\n  activeStep={activeStep}\n  onStepChange={setActiveStep}\n  size="lg"\n/>\n'})}),"\n",(0,i.jsx)(n.h2,{id:"props",children:"Props"}),"\n",(0,i.jsx)(n.h3,{id:"stepper-props",children:"Stepper Props"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Prop"}),(0,i.jsx)(n.th,{children:"Typ"}),(0,i.jsx)(n.th,{children:"Standard"}),(0,i.jsx)(n.th,{children:"Beschreibung"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"steps"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"Step[]"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Schritte im Stepper"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"activeStep"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"number"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Aktiver Schritt-Index"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"onStepChange"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"(index: number) => void"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Callback beim \xc4ndern des aktiven Schritts"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"orientation"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'horizontal' | 'vertical'"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'horizontal'"})}),(0,i.jsx)(n.td,{children:"Orientierung des Steppers"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"variant"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'default' | 'outlined' | 'contained'"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'default'"})}),(0,i.jsx)(n.td,{children:"Variante des Steppers"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"size"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'sm' | 'md' | 'lg'"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'md'"})}),(0,i.jsx)(n.td,{children:"Gr\xf6\xdfe des Steppers"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"children"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"ReactNode"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Kinder-Elemente (StepperContent)"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"className"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Zus\xe4tzliche CSS-Klassen"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"showConnector"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"true"})}),(0,i.jsx)(n.td,{children:"Verbindungslinie zwischen Schritten anzeigen"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"clickable"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"true"})}),(0,i.jsx)(n.td,{children:"Klickbare Schritte"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"ariaLabel"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'Stepper'"})}),(0,i.jsx)(n.td,{children:"Alternativtext f\xfcr Barrierefreiheit"})]})]})]}),"\n",(0,i.jsx)(n.h3,{id:"step-interface",children:"Step Interface"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Eigenschaft"}),(0,i.jsx)(n.th,{children:"Typ"}),(0,i.jsx)(n.th,{children:"Beschreibung"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"id"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{children:"Eindeutige ID des Schritts"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"title"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"ReactNode"})}),(0,i.jsx)(n.td,{children:"Titel des Schritts"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"description"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"ReactNode"})}),(0,i.jsx)(n.td,{children:"Beschreibung des Schritts (optional)"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"icon"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"ReactNode"})}),(0,i.jsx)(n.td,{children:"Icon des Schritts (optional)"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"optional"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:"Ist der Schritt optional?"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"disabled"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:"Ist der Schritt deaktiviert?"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"data"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"any"})}),(0,i.jsx)(n.td,{children:"Benutzerdefinierte Daten f\xfcr den Schritt"})]})]})]}),"\n",(0,i.jsx)(n.h3,{id:"steppercontent-props",children:"StepperContent Props"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Prop"}),(0,i.jsx)(n.th,{children:"Typ"}),(0,i.jsx)(n.th,{children:"Standard"}),(0,i.jsx)(n.th,{children:"Beschreibung"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"children"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"ReactNode"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Inhalt f\xfcr den aktuellen Schritt"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"className"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Zus\xe4tzliche CSS-Klassen"})]})]})]}),"\n",(0,i.jsx)(n.h3,{id:"stepperactions-props",children:"StepperActions Props"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Prop"}),(0,i.jsx)(n.th,{children:"Typ"}),(0,i.jsx)(n.th,{children:"Standard"}),(0,i.jsx)(n.th,{children:"Beschreibung"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"children"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"ReactNode"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Kinder-Elemente (Buttons)"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"className"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Zus\xe4tzliche CSS-Klassen"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"backLabel"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'Zur\xfcck'"})}),(0,i.jsx)(n.td,{children:"Text f\xfcr den Zur\xfcck-Button"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"nextLabel"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'Weiter'"})}),(0,i.jsx)(n.td,{children:"Text f\xfcr den Weiter-Button"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"completeLabel"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"'Abschlie\xdfen'"})}),(0,i.jsx)(n.td,{children:"Text f\xfcr den Abschlie\xdfen-Button"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"onBack"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"() => void"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Callback beim Klick auf Zur\xfcck"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"onNext"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"() => void"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Callback beim Klick auf Weiter"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"onComplete"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"() => void"})}),(0,i.jsx)(n.td,{children:"-"}),(0,i.jsx)(n.td,{children:"Callback beim Klick auf Abschlie\xdfen"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"showDefaultButtons"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"true"})}),(0,i.jsx)(n.td,{children:"Standardbuttons anzeigen"})]})]})]}),"\n",(0,i.jsx)(n.h2,{id:"barrierefreiheit",children:"Barrierefreiheit"}),"\n",(0,i.jsx)(n.p,{children:"Die Stepper-Komponente ist f\xfcr Barrierefreiheit optimiert:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Verwendet die korrekten ARIA-Attribute (",(0,i.jsx)(n.code,{children:'role="navigation"'}),", ",(0,i.jsx)(n.code,{children:'aria-current="step"'}),", ",(0,i.jsx)(n.code,{children:"aria-disabled"}),")"]}),"\n",(0,i.jsx)(n.li,{children:"Unterst\xfctzt Tastaturnavigation (Tab, Enter)"}),"\n",(0,i.jsx)(n.li,{children:"Screenreader-Unterst\xfctzung durch semantische Struktur"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"beispiele",children:"Beispiele"}),"\n",(0,i.jsx)(n.h3,{id:"registrierungsformular-mit-stepper",children:"Registrierungsformular mit Stepper"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:'function RegistrationStepper() {\n  const [activeStep, setActiveStep] = useState(0);\n  const [formData, setFormData] = useState({\n    firstName: \'\',\n    lastName: \'\',\n    email: \'\',\n    password: \'\',\n    address: \'\',\n    city: \'\',\n    zipCode: \'\',\n    country: \'\'\n  });\n  \n  const handleChange = (e) => {\n    const { name, value } = e.target;\n    setFormData(prev => ({\n      ...prev,\n      [name]: value\n    }));\n  };\n  \n  const handleSubmit = () => {\n    console.log(\'Registrierung abgeschlossen:\', formData);\n    // Hier k\xf6nnte ein API-Aufruf erfolgen\n    alert(\'Registrierung erfolgreich!\');\n  };\n  \n  const steps = [\n    { id: \'account\', title: \'Konto erstellen\', description: \'Pers\xf6nliche Informationen\' },\n    { id: \'address\', title: \'Adresse\', description: \'Lieferadresse\' },\n    { id: \'confirm\', title: \'Best\xe4tigung\', description: \'\xdcberpr\xfcfen Sie Ihre Angaben\' }\n  ];\n  \n  return (\n    <div className="max-w-2xl mx-auto">\n      <Stepper\n        steps={steps}\n        activeStep={activeStep}\n        onStepChange={setActiveStep}\n      >\n        <StepperContent>\n          {/* Schritt 1: Konto erstellen */}\n          <div className="space-y-4 py-4">\n            <h3 className="text-lg font-medium">Konto erstellen</h3>\n            <div className="grid grid-cols-2 gap-4">\n              <div>\n                <label className="block text-sm font-medium text-gray-700 mb-1">\n                  Vorname\n                </label>\n                <input\n                  type="text"\n                  name="firstName"\n                  value={formData.firstName}\n                  onChange={handleChange}\n                  className="w-full px-3 py-2 border border-gray-300 rounded-md"\n                  required\n                />\n              </div>\n              <div>\n                <label className="block text-sm font-medium text-gray-700 mb-1">\n                  Nachname\n                </label>\n                <input\n                  type="text"\n                  name="lastName"\n                  value={formData.lastName}\n                  onChange={handleChange}\n                  className="w-full px-3 py-2 border border-gray-300 rounded-md"\n                  required\n                />\n              </div>\n            </div>\n            <div>\n              <label className="block text-sm font-medium text-gray-700 mb-1">\n                E-Mail\n              </label>\n              <input\n                type="email"\n                name="email"\n                value={formData.email}\n                onChange={handleChange}\n                className="w-full px-3 py-2 border border-gray-300 rounded-md"\n                required\n              />\n            </div>\n            <div>\n              <label className="block text-sm font-medium text-gray-700 mb-1">\n                Passwort\n              </label>\n              <input\n                type="password"\n                name="password"\n                value={formData.password}\n                onChange={handleChange}\n                className="w-full px-3 py-2 border border-gray-300 rounded-md"\n                required\n              />\n            </div>\n          </div>\n          \n          {/* Schritt 2: Adresse */}\n          <div className="space-y-4 py-4">\n            <h3 className="text-lg font-medium">Adresse</h3>\n            <div>\n              <label className="block text-sm font-medium text-gray-700 mb-1">\n                Stra\xdfe und Hausnummer\n              </label>\n              <input\n                type="text"\n                name="address"\n                value={formData.address}\n                onChange={handleChange}\n                className="w-full px-3 py-2 border border-gray-300 rounded-md"\n                required\n              />\n            </div>\n            <div className="grid grid-cols-2 gap-4">\n              <div>\n                <label className="block text-sm font-medium text-gray-700 mb-1">\n                  Stadt\n                </label>\n                <input\n                  type="text"\n                  name="city"\n                  value={formData.city}\n                  onChange={handleChange}\n                  className="w-full px-3 py-2 border border-gray-300 rounded-md"\n                  required\n                />\n              </div>\n              <div>\n                <label className="block text-sm font-medium text-gray-700 mb-1">\n                  PLZ\n                </label>\n                <input\n                  type="text"\n                  name="zipCode"\n                  value={formData.zipCode}\n                  onChange={handleChange}\n                  className="w-full px-3 py-2 border border-gray-300 rounded-md"\n                  required\n                />\n              </div>\n            </div>\n            <div>\n              <label className="block text-sm font-medium text-gray-700 mb-1">\n                Land\n              </label>\n              <select\n                name="country"\n                value={formData.country}\n                onChange={handleChange}\n                className="w-full px-3 py-2 border border-gray-300 rounded-md"\n                required\n              >\n                <option value="">Land ausw\xe4hlen</option>\n                <option value="DE">Deutschland</option>\n                <option value="AT">\xd6sterreich</option>\n                <option value="CH">Schweiz</option>\n              </select>\n            </div>\n          </div>\n          \n          {/* Schritt 3: Best\xe4tigung */}\n          <div className="space-y-4 py-4">\n            <h3 className="text-lg font-medium">Best\xe4tigung</h3>\n            <div className="bg-gray-50 p-4 rounded-md">\n              <h4 className="font-medium mb-2">Pers\xf6nliche Informationen</h4>\n              <p>Name: {formData.firstName} {formData.lastName}</p>\n              <p>E-Mail: {formData.email}</p>\n              \n              <h4 className="font-medium mt-4 mb-2">Adresse</h4>\n              <p>{formData.address}</p>\n              <p>{formData.zipCode} {formData.city}</p>\n              <p>{formData.country}</p>\n            </div>\n            <div className="mt-4">\n              <label className="flex items-center">\n                <input type="checkbox" className="h-4 w-4 text-primary-600" />\n                <span className="ml-2 text-sm text-gray-700">\n                  Ich akzeptiere die AGB und Datenschutzbestimmungen\n                </span>\n              </label>\n            </div>\n          </div>\n        </StepperContent>\n        \n        <StepperActions\n          onComplete={handleSubmit}\n        />\n      </Stepper>\n    </div>\n  );\n}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"checkout-prozess-mit-stepper",children:"Checkout-Prozess mit Stepper"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:'function CheckoutStepper() {\n  const [activeStep, setActiveStep] = useState(0);\n  \n  const steps = [\n    { id: \'cart\', title: \'Warenkorb\', icon: \'\ud83d\uded2\' },\n    { id: \'shipping\', title: \'Versand\', icon: \'\ud83d\ude9a\' },\n    { id: \'payment\', title: \'Zahlung\', icon: \'\ud83d\udcb3\' },\n    { id: \'confirmation\', title: \'Best\xe4tigung\', icon: \'\u2705\' }\n  ];\n  \n  const handleComplete = () => {\n    console.log(\'Bestellung abgeschlossen!\');\n    // Hier k\xf6nnte ein API-Aufruf erfolgen\n  };\n  \n  return (\n    <div className="max-w-3xl mx-auto">\n      <Stepper\n        steps={steps}\n        activeStep={activeStep}\n        onStepChange={setActiveStep}\n        variant="contained"\n      >\n        <StepperContent>\n          {/* Warenkorb */}\n          <div className="py-4">\n            <h3 className="text-lg font-medium mb-4">Warenkorb</h3>\n            <div className="border rounded-md divide-y">\n              <div className="p-4 flex items-center">\n                <div className="w-16 h-16 bg-gray-100 rounded"></div>\n                <div className="ml-4 flex-1">\n                  <h4 className="font-medium">Produkt 1</h4>\n                  <p className="text-gray-500">\u20ac29,99</p>\n                </div>\n                <div className="flex items-center">\n                  <button className="w-8 h-8 border rounded-l-md">-</button>\n                  <span className="w-10 h-8 border-t border-b flex items-center justify-center">1</span>\n                  <button className="w-8 h-8 border rounded-r-md">+</button>\n                </div>\n              </div>\n              <div className="p-4 flex items-center">\n                <div className="w-16 h-16 bg-gray-100 rounded"></div>\n                <div className="ml-4 flex-1">\n                  <h4 className="font-medium">Produkt 2</h4>\n                  <p className="text-gray-500">\u20ac49,99</p>\n                </div>\n                <div className="flex items-center">\n                  <button className="w-8 h-8 border rounded-l-md">-</button>\n                  <span className="w-10 h-8 border-t border-b flex items-center justify-center">2</span>\n                  <button className="w-8 h-8 border rounded-r-md">+</button>\n                </div>\n              </div>\n            </div>\n            <div className="mt-4 flex justify-between font-medium">\n              <span>Gesamtsumme:</span>\n              <span>\u20ac129,97</span>\n            </div>\n          </div>\n          \n          {/* Versand */}\n          <div className="py-4">\n            <h3 className="text-lg font-medium mb-4">Versandoptionen</h3>\n            <div className="space-y-3">\n              <label className="flex items-center p-3 border rounded-md">\n                <input type="radio" name="shipping" className="h-4 w-4 text-primary-600" defaultChecked />\n                <div className="ml-3">\n                  <span className="font-medium">Standardversand</span>\n                  <p className="text-sm text-gray-500">3-5 Werktage, \u20ac4,99</p>\n                </div>\n              </label>\n              <label className="flex items-center p-3 border rounded-md">\n                <input type="radio" name="shipping" className="h-4 w-4 text-primary-600" />\n                <div className="ml-3">\n                  <span className="font-medium">Expressversand</span>\n                  <p className="text-sm text-gray-500">1-2 Werktage, \u20ac9,99</p>\n                </div>\n              </label>\n            </div>\n            <div className="mt-6">\n              <h4 className="font-medium mb-2">Lieferadresse</h4>\n              <div className="grid grid-cols-2 gap-4">\n                <input\n                  type="text"\n                  placeholder="Vorname"\n                  className="px-3 py-2 border rounded-md"\n                />\n                <input\n                  type="text"\n                  placeholder="Nachname"\n                  className="px-3 py-2 border rounded-md"\n                />\n              </div>\n              <input\n                type="text"\n                placeholder="Stra\xdfe und Hausnummer"\n                className="w-full mt-3 px-3 py-2 border rounded-md"\n              />\n              <div className="grid grid-cols-3 gap-4 mt-3">\n                <input\n                  type="text"\n                  placeholder="PLZ"\n                  className="px-3 py-2 border rounded-md"\n                />\n                <input\n                  type="text"\n                  placeholder="Stadt"\n                  className="col-span-2 px-3 py-2 border rounded-md"\n                />\n              </div>\n            </div>\n          </div>\n          \n          {/* Zahlung */}\n          <div className="py-4">\n            <h3 className="text-lg font-medium mb-4">Zahlungsmethode</h3>\n            <div className="space-y-3">\n              <label className="flex items-center p-3 border rounded-md">\n                <input type="radio" name="payment" className="h-4 w-4 text-primary-600" defaultChecked />\n                <div className="ml-3">\n                  <span className="font-medium">Kreditkarte</span>\n                </div>\n              </label>\n              <label className="flex items-center p-3 border rounded-md">\n                <input type="radio" name="payment" className="h-4 w-4 text-primary-600" />\n                <div className="ml-3">\n                  <span className="font-medium">PayPal</span>\n                </div>\n              </label>\n              <label className="flex items-center p-3 border rounded-md">\n                <input type="radio" name="payment" className="h-4 w-4 text-primary-600" />\n                <div className="ml-3">\n                  <span className="font-medium">Rechnung</span>\n                </div>\n              </label>\n            </div>\n            <div className="mt-6">\n              <h4 className="font-medium mb-2">Kreditkartendaten</h4>\n              <input\n                type="text"\n                placeholder="Karteninhaber"\n                className="w-full px-3 py-2 border rounded-md"\n              />\n              <input\n                type="text"\n                placeholder="Kartennummer"\n                className="w-full mt-3 px-3 py-2 border rounded-md"\n              />\n              <div className="grid grid-cols-2 gap-4 mt-3">\n                <input\n                  type="text"\n                  placeholder="G\xfcltig bis (MM/JJ)"\n                  className="px-3 py-2 border rounded-md"\n                />\n                <input\n                  type="text"\n                  placeholder="CVC"\n                  className="px-3 py-2 border rounded-md"\n                />\n              </div>\n            </div>\n          </div>\n          \n          {/* Best\xe4tigung */}\n          <div className="py-4">\n            <h3 className="text-lg font-medium mb-4">Bestell\xfcbersicht</h3>\n            <div className="bg-gray-50 p-4 rounded-md">\n              <h4 className="font-medium mb-2">Artikel</h4>\n              <div className="flex justify-between">\n                <span>Produkt 1 (1x)</span>\n                <span>\u20ac29,99</span>\n              </div>\n              <div className="flex justify-between">\n                <span>Produkt 2 (2x)</span>\n                <span>\u20ac99,98</span>\n              </div>\n              \n              <h4 className="font-medium mt-4 mb-2">Versand</h4>\n              <div className="flex justify-between">\n                <span>Standardversand</span>\n                <span>\u20ac4,99</span>\n              </div>\n              \n              <div className="border-t mt-4 pt-4">\n                <div className="flex justify-between font-bold">\n                  <span>Gesamtsumme</span>\n                  <span>\u20ac134,96</span>\n                </div>\n              </div>\n            </div>\n            <div className="mt-4">\n              <label className="flex items-center">\n                <input type="checkbox" className="h-4 w-4 text-primary-600" />\n                <span className="ml-2 text-sm text-gray-700">\n                  Ich akzeptiere die AGB und Datenschutzbestimmungen\n                </span>\n              </label>\n            </div>\n          </div>\n        </StepperContent>\n        \n        <StepperActions\n          completeLabel="Jetzt kaufen"\n          onComplete={handleComplete}\n        />\n      </Stepper>\n    </div>\n  );\n}\n'})})]})}function o(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(p,{...e})}):p(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>d,x:()=>a});var s=t(6540);const i={},r=s.createContext(i);function d(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:d(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);