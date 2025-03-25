import React from 'react';
import { 
  Button, 
  Card, 
  useTranslation,
  Breadcrumb,
  Alert
} from '@smolitux/core';

const ButtonsPage: React.FC = () => {
  const t = useTranslation();

  return (
    <div className="container">
      <Breadcrumb
        items={[
          { label: t('navigation.home'), href: '/' },
          { label: t('navigation.components'), href: '#' },
          { label: t('components.buttons'), href: '/components/buttons' }
        ]}
        className="mb-2"
      />

      <h1 className="section-title">{t('components.buttons')}</h1>
      
      <Alert type="info" className="mb-2">
        {t('buttonPage.description')}
      </Alert>

      <div className="section">
        <h2 className="section-title">{t('buttonPage.variants')}</h2>
        <Card className="p-2">
          <div className="button-group mb-2">
            <Button variant="primary">{t('buttonPage.primary')}</Button>
            <Button variant="secondary">{t('buttonPage.secondary')}</Button>
            <Button variant="success">{t('buttonPage.success')}</Button>
            <Button variant="danger">{t('buttonPage.danger')}</Button>
            <Button variant="warning">{t('buttonPage.warning')}</Button>
            <Button variant="info">{t('buttonPage.info')}</Button>
            <Button variant="light">{t('buttonPage.light')}</Button>
            <Button variant="dark">{t('buttonPage.dark')}</Button>
          </div>

          <div className="code-block">
            {`<Button variant="primary">{t('buttonPage.primary')}</Button>
<Button variant="secondary">{t('buttonPage.secondary')}</Button>
<Button variant="success">{t('buttonPage.success')}</Button>
<Button variant="danger">{t('buttonPage.danger')}</Button>
<Button variant="warning">{t('buttonPage.warning')}</Button>
<Button variant="info">{t('buttonPage.info')}</Button>
<Button variant="light">{t('buttonPage.light')}</Button>
<Button variant="dark">{t('buttonPage.dark')}</Button>`}
          </div>
        </Card>
      </div>

      <div className="section">
        <h2 className="section-title">{t('buttonPage.sizes')}</h2>
        <Card className="p-2">
          <div className="button-group mb-2">
            <Button variant="primary" size="lg">{t('buttonPage.large')}</Button>
            <Button variant="primary">{t('buttonPage.medium')}</Button>
            <Button variant="primary" size="sm">{t('buttonPage.small')}</Button>
            <Button variant="primary" size="xs">{t('buttonPage.extraSmall')}</Button>
          </div>

          <div className="code-block">
            {`<Button variant="primary" size="lg">{t('buttonPage.large')}</Button>
<Button variant="primary">{t('buttonPage.medium')}</Button>
<Button variant="primary" size="sm">{t('buttonPage.small')}</Button>
<Button variant="primary" size="xs">{t('buttonPage.extraSmall')}</Button>`}
          </div>
        </Card>
      </div>

      <div className="section">
        <h2 className="section-title">{t('buttonPage.states')}</h2>
        <Card className="p-2">
          <div className="button-group mb-2">
            <Button variant="primary">{t('buttonPage.normal')}</Button>
            <Button variant="primary" disabled>{t('buttonPage.disabled')}</Button>
            <Button variant="primary" isLoading>{t('buttonPage.loading')}</Button>
            <Button variant="primary" active>{t('buttonPage.active')}</Button>
          </div>

          <div className="code-block">
            {`<Button variant="primary">{t('buttonPage.normal')}</Button>
<Button variant="primary" disabled>{t('buttonPage.disabled')}</Button>
<Button variant="primary" isLoading>{t('buttonPage.loading')}</Button>
<Button variant="primary" active>{t('buttonPage.active')}</Button>`}
          </div>
        </Card>
      </div>

      <div className="section">
        <h2 className="section-title">{t('buttonPage.outlineButtons')}</h2>
        <Card className="p-2">
          <div className="button-group mb-2">
            <Button variant="primary" outline>{t('buttonPage.primary')}</Button>
            <Button variant="secondary" outline>{t('buttonPage.secondary')}</Button>
            <Button variant="success" outline>{t('buttonPage.success')}</Button>
            <Button variant="danger" outline>{t('buttonPage.danger')}</Button>
          </div>

          <div className="code-block">
            {`<Button variant="primary" outline>{t('buttonPage.primary')}</Button>
<Button variant="secondary" outline>{t('buttonPage.secondary')}</Button>
<Button variant="success" outline>{t('buttonPage.success')}</Button>
<Button variant="danger" outline>{t('buttonPage.danger')}</Button>`}
          </div>
        </Card>
      </div>

      <div className="section">
        <h2 className="section-title">{t('buttonPage.blockButtons')}</h2>
        <Card className="p-2">
          <div className="flex-column mb-2">
            <Button variant="primary" block>{t('buttonPage.blockButton')}</Button>
            <Button variant="secondary" block>{t('buttonPage.anotherBlockButton')}</Button>
          </div>

          <div className="code-block">
            {`<Button variant="primary" block>{t('buttonPage.blockButton')}</Button>
<Button variant="secondary" block>{t('buttonPage.anotherBlockButton')}</Button>`}
          </div>
        </Card>
      </div>

      <div className="section">
        <h2 className="section-title">{t('buttonPage.withIcons')}</h2>
        <Card className="p-2">
          <div className="button-group mb-2">
            <Button variant="primary">
              <span className="icon">⭐</span>
              {t('buttonPage.withIcon')}
            </Button>
            <Button variant="secondary">
              {t('buttonPage.withIcon')}
              <span className="icon">🔍</span>
            </Button>
            <Button variant="success">
              <span className="icon">✓</span>
            </Button>
          </div>

          <div className="code-block">
            {`<Button variant="primary">
  <span className="icon">⭐</span>
  {t('buttonPage.withIcon')}
</Button>
<Button variant="secondary">
  {t('buttonPage.withIcon')}
  <span className="icon">🔍</span>
</Button>
<Button variant="success">
  <span className="icon">✓</span>
</Button>`}
          </div>
        </Card>
      </div>

      <div className="section">
        <h2 className="section-title">{t('buttonPage.asLink')}</h2>
        <Card className="p-2">
          <div className="button-group mb-2">
            <Button as="a" href="#" variant="primary">
              {t('buttonPage.linkButton')}
            </Button>
            <Button as="a" href="#" variant="secondary" outline>
              {t('buttonPage.anotherLinkButton')}
            </Button>
          </div>

          <div className="code-block">
            {`<Button as="a" href="#" variant="primary">
  {t('buttonPage.linkButton')}
</Button>
<Button as="a" href="#" variant="secondary" outline>
  {t('buttonPage.anotherLinkButton')}
</Button>`}
          </div>
        </Card>
      </div>

      <div className="section">
        <h2 className="section-title">{t('buttonPage.props')}</h2>
        <Card className="p-2">
          <table className="props-table">
            <thead>
              <tr>
                <th>{t('propsTable.name')}</th>
                <th>{t('propsTable.type')}</th>
                <th>{t('propsTable.default')}</th>
                <th>{t('propsTable.description')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>variant</td>
                <td>string</td>
                <td>'primary'</td>
                <td>{t('buttonPage.variantProp')}</td>
              </tr>
              <tr>
                <td>size</td>
                <td>string</td>
                <td>'md'</td>
                <td>{t('buttonPage.sizeProp')}</td>
              </tr>
              <tr>
                <td>outline</td>
                <td>boolean</td>
                <td>false</td>
                <td>{t('buttonPage.outlineProp')}</td>
              </tr>
              <tr>
                <td>block</td>
                <td>boolean</td>
                <td>false</td>
                <td>{t('buttonPage.blockProp')}</td>
              </tr>
              <tr>
                <td>disabled</td>
                <td>boolean</td>
                <td>false</td>
                <td>{t('buttonPage.disabledProp')}</td>
              </tr>
              <tr>
                <td>isLoading</td>
                <td>boolean</td>
                <td>false</td>
                <td>{t('buttonPage.isLoadingProp')}</td>
              </tr>
              <tr>
                <td>active</td>
                <td>boolean</td>
                <td>false</td>
                <td>{t('buttonPage.activeProp')}</td>
              </tr>
              <tr>
                <td>as</td>
                <td>ElementType</td>
                <td>'button'</td>
                <td>{t('buttonPage.asProp')}</td>
              </tr>
              <tr>
                <td>onClick</td>
                <td>function</td>
                <td>-</td>
                <td>{t('buttonPage.onClickProp')}</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

export default ButtonsPage;