import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  Button, 
  Alert, 
  Badge, 
  useTranslation,
  Fade
} from '@smolitux/core';

const HomePage: React.FC = () => {
  const t = useTranslation();

  return (
    <div className="container">
      <Fade in={true} appear={true}>
        <div className="section">
          <h1 className="section-title">{t('home.title')}</h1>
          <Alert type="info" className="mb-2">
            {t('home.welcome')}
          </Alert>
          <p className="mb-2">
            {t('home.description')}
          </p>
          <div className="button-group">
            <Button 
              as={Link} 
              to="/components/buttons" 
              variant="primary"
            >
              {t('home.exploreComponents')}
            </Button>
            <Button 
              as={Link} 
              to="/theming" 
              variant="secondary"
            >
              {t('home.learnTheming')}
            </Button>
          </div>
        </div>
      </Fade>

      <div className="section">
        <h2 className="section-title">{t('home.featuredComponents')}</h2>
        <div className="component-grid">
          <Card className="component-card">
            <h3>
              {t('components.buttons')} 
              <Badge variant="primary" className="ml-1">Core</Badge>
            </h3>
            <p>{t('home.buttonDescription')}</p>
            <div className="component-example">
              <Button 
                as={Link} 
                to="/components/buttons" 
                variant="primary" 
                size="sm"
              >
                {t('home.viewComponent')}
              </Button>
            </div>
          </Card>

          <Card className="component-card">
            <h3>
              {t('components.forms')} 
              <Badge variant="primary" className="ml-1">Core</Badge>
            </h3>
            <p>{t('home.formDescription')}</p>
            <div className="component-example">
              <Button 
                as={Link} 
                to="/components/forms" 
                variant="primary" 
                size="sm"
              >
                {t('home.viewComponent')}
              </Button>
            </div>
          </Card>

          <Card className="component-card">
            <h3>
              {t('components.alerts')} 
              <Badge variant="primary" className="ml-1">Core</Badge>
            </h3>
            <p>{t('home.alertDescription')}</p>
            <div className="component-example">
              <Button 
                as={Link} 
                to="/components/alerts" 
                variant="primary" 
                size="sm"
              >
                {t('home.viewComponent')}
              </Button>
            </div>
          </Card>

          <Card className="component-card">
            <h3>
              {t('components.modals')} 
              <Badge variant="primary" className="ml-1">Core</Badge>
            </h3>
            <p>{t('home.modalDescription')}</p>
            <div className="component-example">
              <Button 
                as={Link} 
                to="/components/modals" 
                variant="primary" 
                size="sm"
              >
                {t('home.viewComponent')}
              </Button>
            </div>
          </Card>

          <Card className="component-card">
            <h3>
              {t('components.tables')} 
              <Badge variant="primary" className="ml-1">Core</Badge>
            </h3>
            <p>{t('home.tableDescription')}</p>
            <div className="component-example">
              <Button 
                as={Link} 
                to="/components/tables" 
                variant="primary" 
                size="sm"
              >
                {t('home.viewComponent')}
              </Button>
            </div>
          </Card>

          <Card className="component-card">
            <h3>
              {t('components.charts')} 
              <Badge variant="secondary" className="ml-1">Charts</Badge>
            </h3>
            <p>{t('home.chartDescription')}</p>
            <div className="component-example">
              <Button 
                as={Link} 
                to="/components/charts" 
                variant="primary" 
                size="sm"
              >
                {t('home.viewComponent')}
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">{t('home.featuredFeatures')}</h2>
        <div className="component-grid">
          <Card className="component-card">
            <h3>{t('features.theming')}</h3>
            <p>{t('home.themingDescription')}</p>
            <div className="component-example">
              <Button 
                as={Link} 
                to="/theming" 
                variant="primary" 
                size="sm"
              >
                {t('home.learnMore')}
              </Button>
            </div>
          </Card>

          <Card className="component-card">
            <h3>{t('features.i18n')}</h3>
            <p>{t('home.i18nDescription')}</p>
            <div className="component-example">
              <Button 
                as={Link} 
                to="/i18n" 
                variant="primary" 
                size="sm"
              >
                {t('home.learnMore')}
              </Button>
            </div>
          </Card>

          <Card className="component-card">
            <h3>{t('features.formValidation')}</h3>
            <p>{t('home.formValidationDescription')}</p>
            <div className="component-example">
              <Button 
                as={Link} 
                to="/form-validation" 
                variant="primary" 
                size="sm"
              >
                {t('home.learnMore')}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;