import React from 'react';
import { 
  Card, 
  useTranslation,
  Breadcrumb,
  Alert,
  Button,
  LanguageSwitcher,
  useI18n
} from '@smolitux/core';

const I18nPage: React.FC = () => {
  const t = useTranslation();
  const { 
    language, 
    changeLanguage, 
    availableLanguages,
    formatNumber,
    formatDate
  } = useI18n();

  const currentDate = new Date();
  const price = 1234.56;
  const count = 5;

  return (
    <div className="container">
      <Breadcrumb
        items={[
          { label: t('navigation.home'), href: '/' },
          { label: t('navigation.features'), href: '#' },
          { label: t('features.i18n'), href: '/i18n' }
        ]}
        className="mb-2"
      />

      <h1 className="section-title">{t('features.i18n')}</h1>
      
      <Alert type="info" className="mb-2">
        {t('i18nPage.description')}
      </Alert>

      <div className="section">
        <h2 className="section-title">{t('i18nPage.currentLanguage')}</h2>
        <Card className="p-2">
          <p className="mb-2">
            {t('i18nPage.currentLanguageIs')}: <strong>{t(`languages.${language}`)}</strong>
          </p>
          
          <div className="mb-2">
            <h3>{t('i18nPage.switchLanguage')}</h3>
            <LanguageSwitcher className="mt-1" />
          </div>

          <div className="mb-2">
            <h3>{t('i18nPage.manualSwitching')}</h3>
            <div className="button-group mt-1">
              {availableLanguages.map(lang => (
                <Button 
                  key={lang}
                  variant={language === lang ? 'primary' : 'secondary'}
                  onClick={() => changeLanguage(lang)}
                  disabled={language === lang}
                >
                  {t(`languages.${lang}`)}
                </Button>
              ))}
            </div>
          </div>

          <div className="code-block">
            {`// Verwenden des useI18n Hooks
const { language, changeLanguage, availableLanguages } = useI18n();

// Sprache ändern
changeLanguage('en');

// Komponente für Sprachumschaltung
<LanguageSwitcher />`}
          </div>
        </Card>
      </div>

      <div className="section">
        <h2 className="section-title">{t('i18nPage.translationExamples')}</h2>
        <Card className="p-2">
          <div className="mb-2">
            <h3>{t('i18nPage.simpleTranslation')}</h3>
            <p>{t('i18nPage.welcomeMessage')}</p>
            
            <div className="code-block">
              {`// Verwenden des useTranslation Hooks
const t = useTranslation();

// Einfache Übersetzung
<p>{t('i18nPage.welcomeMessage')}</p>`}
            </div>
          </div>

          <div className="mb-2">
            <h3>{t('i18nPage.translationWithVariables')}</h3>
            <p>{t('i18nPage.greeting', { name: 'Max Mustermann' })}</p>
            
            <div className="code-block">
              {`// Übersetzung mit Variablen
<p>{t('i18nPage.greeting', { name: 'Max Mustermann' })}</p>`}
            </div>
          </div>

          <div className="mb-2">
            <h3>{t('i18nPage.pluralization')}</h3>
            <p>{t('i18nPage.itemCount', { count: 0 })}</p>
            <p>{t('i18nPage.itemCount', { count: 1 })}</p>
            <p>{t('i18nPage.itemCount', { count: 5 })}</p>
            
            <div className="code-block">
              {`// Pluralisierung
<p>{t('i18nPage.itemCount', { count: 0 })}</p>
<p>{t('i18nPage.itemCount', { count: 1 })}</p>
<p>{t('i18nPage.itemCount', { count: 5 })}</p>`}
            </div>
          </div>
        </Card>
      </div>

      <div className="section">
        <h2 className="section-title">{t('i18nPage.formatting')}</h2>
        <Card className="p-2">
          <div className="mb-2">
            <h3>{t('i18nPage.numberFormatting')}</h3>
            <p>{t('i18nPage.standardNumber')}: {formatNumber(price)}</p>
            <p>{t('i18nPage.currencyNumber')}: {formatNumber(price, { style: 'currency', currency: 'EUR' })}</p>
            <p>{t('i18nPage.percentNumber')}: {formatNumber(0.8756, { style: 'percent' })}</p>
            
            <div className="code-block">
              {`// Zahlenformatierung
const { formatNumber } = useI18n();

// Standard-Formatierung
<p>{formatNumber(1234.56)}</p>

// Währungsformatierung
<p>{formatNumber(1234.56, { style: 'currency', currency: 'EUR' })}</p>

// Prozent-Formatierung
<p>{formatNumber(0.8756, { style: 'percent' })}</p>`}
            </div>
          </div>

          <div className="mb-2">
            <h3>{t('i18nPage.dateFormatting')}</h3>
            <p>{t('i18nPage.shortDate')}: {formatDate(currentDate, { dateStyle: 'short' })}</p>
            <p>{t('i18nPage.mediumDate')}: {formatDate(currentDate, { dateStyle: 'medium' })}</p>
            <p>{t('i18nPage.longDate')}: {formatDate(currentDate, { dateStyle: 'long' })}</p>
            <p>{t('i18nPage.fullDate')}: {formatDate(currentDate, { dateStyle: 'full' })}</p>
            
            <div className="code-block">
              {`// Datumsformatierung
const { formatDate } = useI18n();
const currentDate = new Date();

// Kurzes Datumsformat
<p>{formatDate(currentDate, { dateStyle: 'short' })}</p>

// Mittleres Datumsformat
<p>{formatDate(currentDate, { dateStyle: 'medium' })}</p>

// Langes Datumsformat
<p>{formatDate(currentDate, { dateStyle: 'long' })}</p>

// Vollständiges Datumsformat
<p>{formatDate(currentDate, { dateStyle: 'full' })}</p>`}
            </div>
          </div>
        </Card>
      </div>

      <div className="section">
        <h2 className="section-title">{t('i18nPage.i18nProvider')}</h2>
        <Card className="p-2">
          <div className="mb-2">
            <h3>{t('i18nPage.setupProvider')}</h3>
            
            <div className="code-block">
              {`// In der main.tsx oder App.tsx
import { I18nProvider } from '@smolitux/core';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider defaultLanguage="de" detectBrowserLanguage={true}>
      <App />
    </I18nProvider>
  </React.StrictMode>
);`}
            </div>
          </div>

          <div className="mb-2">
            <h3>{t('i18nPage.customResources')}</h3>
            
            <div className="code-block">
              {`// Eigene Übersetzungsressourcen
const customResources = {
  de: {
    myApp: {
      greeting: 'Hallo, {{name}}!',
      farewell: 'Auf Wiedersehen, {{name}}!'
    }
  },
  en: {
    myApp: {
      greeting: 'Hello, {{name}}!',
      farewell: 'Goodbye, {{name}}!'
    }
  }
};

// Verwendung im I18nProvider
<I18nProvider 
  defaultLanguage="de"
  resources={customResources}
>
  <YourApp />
</I18nProvider>`}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default I18nPage;