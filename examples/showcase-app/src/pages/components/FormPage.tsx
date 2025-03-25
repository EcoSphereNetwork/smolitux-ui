import React, { useState } from 'react';
import { 
  Card, 
  useTranslation,
  Breadcrumb,
  Alert,
  Form,
  FormField,
  Input,
  TextArea,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Button,
  DatePicker,
  TimePicker,
  ColorPicker,
  FileUpload,
  required,
  email,
  minLength
} from '@smolitux/core';

const FormPage: React.FC = () => {
  const t = useTranslation();
  const [formData, setFormData] = useState({});

  const handleSubmit = (values: any) => {
    setFormData(values);
    console.log('Form submitted:', values);
  };

  const countryOptions = [
    { value: 'de', label: 'Deutschland' },
    { value: 'at', label: 'Österreich' },
    { value: 'ch', label: 'Schweiz' },
    { value: 'fr', label: 'Frankreich' },
    { value: 'it', label: 'Italien' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Männlich' },
    { value: 'female', label: 'Weiblich' },
    { value: 'other', label: 'Divers' },
    { value: 'prefer_not_to_say', label: 'Keine Angabe' }
  ];

  return (
    <div className="container">
      <Breadcrumb
        items={[
          { label: t('navigation.home'), href: '/' },
          { label: t('navigation.components'), href: '#' },
          { label: t('components.forms'), href: '/components/forms' }
        ]}
        className="mb-2"
      />

      <h1 className="section-title">{t('components.forms')}</h1>
      
      <Alert type="info" className="mb-2">
        {t('formPage.description')}
      </Alert>

      <div className="section">
        <h2 className="section-title">{t('formPage.basicForm')}</h2>
        <Card className="p-2">
          <Form
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              message: '',
              country: '',
              gender: '',
              subscribe: false,
              notifications: false,
              birthDate: '',
              meetingTime: '',
              favoriteColor: '#3f51b5',
              resume: null
            }}
            onSubmit={handleSubmit}
            validationStrategy="onBlur"
          >
            {({ isSubmitting, isValid, values }) => (
              <>
                <div className="flex-row flex-wrap gap-2">
                  <div className="form-group" style={{ flex: '1 1 45%' }}>
                    <FormField
                      name="firstName"
                      label={t('formPage.firstName')}
                      validators={[required(t('formPage.firstNameRequired'))]}
                    >
                      {({ field, error }) => (
                        <Input 
                          placeholder={t('formPage.firstNamePlaceholder')} 
                          {...field} 
                          error={error} 
                        />
                      )}
                    </FormField>
                  </div>

                  <div className="form-group" style={{ flex: '1 1 45%' }}>
                    <FormField
                      name="lastName"
                      label={t('formPage.lastName')}
                      validators={[required(t('formPage.lastNameRequired'))]}
                    >
                      {({ field, error }) => (
                        <Input 
                          placeholder={t('formPage.lastNamePlaceholder')} 
                          {...field} 
                          error={error} 
                        />
                      )}
                    </FormField>
                  </div>
                </div>

                <div className="form-group">
                  <FormField
                    name="email"
                    label={t('formPage.email')}
                    validators={[
                      required(t('formPage.emailRequired')),
                      email(t('formPage.emailInvalid'))
                    ]}
                  >
                    {({ field, error }) => (
                      <Input 
                        type="email" 
                        placeholder={t('formPage.emailPlaceholder')} 
                        {...field} 
                        error={error} 
                      />
                    )}
                  </FormField>
                </div>

                <div className="form-group">
                  <FormField
                    name="country"
                    label={t('formPage.country')}
                    validators={[required(t('formPage.countryRequired'))]}
                  >
                    {({ field, error }) => (
                      <Select 
                        options={countryOptions} 
                        placeholder={t('formPage.countryPlaceholder')} 
                        {...field} 
                        error={error} 
                      />
                    )}
                  </FormField>
                </div>

                <div className="form-group">
                  <FormField
                    name="gender"
                    label={t('formPage.gender')}
                  >
                    {({ field, error }) => (
                      <RadioGroup 
                        options={genderOptions} 
                        {...field} 
                        error={error} 
                      />
                    )}
                  </FormField>
                </div>

                <div className="form-group">
                  <FormField
                    name="birthDate"
                    label={t('formPage.birthDate')}
                  >
                    {({ field, error }) => (
                      <DatePicker 
                        placeholder={t('formPage.birthDatePlaceholder')} 
                        {...field} 
                        error={error} 
                      />
                    )}
                  </FormField>
                </div>

                <div className="form-group">
                  <FormField
                    name="meetingTime"
                    label={t('formPage.meetingTime')}
                  >
                    {({ field, error }) => (
                      <TimePicker 
                        placeholder={t('formPage.meetingTimePlaceholder')} 
                        {...field} 
                        error={error} 
                      />
                    )}
                  </FormField>
                </div>

                <div className="form-group">
                  <FormField
                    name="favoriteColor"
                    label={t('formPage.favoriteColor')}
                  >
                    {({ field, error }) => (
                      <ColorPicker 
                        {...field} 
                        error={error} 
                      />
                    )}
                  </FormField>
                </div>

                <div className="form-group">
                  <FormField
                    name="resume"
                    label={t('formPage.resume')}
                  >
                    {({ field, error }) => (
                      <FileUpload 
                        accept=".pdf,.doc,.docx" 
                        maxSize={5 * 1024 * 1024} 
                        {...field} 
                        error={error} 
                      />
                    )}
                  </FormField>
                </div>

                <div className="form-group">
                  <FormField
                    name="message"
                    label={t('formPage.message')}
                    validators={[
                      required(t('formPage.messageRequired')),
                      minLength(10, t('formPage.messageMinLength'))
                    ]}
                  >
                    {({ field, error }) => (
                      <TextArea 
                        placeholder={t('formPage.messagePlaceholder')} 
                        rows={5} 
                        {...field} 
                        error={error} 
                      />
                    )}
                  </FormField>
                </div>

                <div className="form-group">
                  <FormField
                    name="subscribe"
                    label={t('formPage.subscribe')}
                  >
                    {({ field }) => (
                      <Checkbox 
                        label={t('formPage.subscribeLabel')} 
                        {...field} 
                      />
                    )}
                  </FormField>
                </div>

                <div className="form-group">
                  <FormField
                    name="notifications"
                    label={t('formPage.notifications')}
                  >
                    {({ field }) => (
                      <Switch 
                        label={t('formPage.notificationsLabel')} 
                        {...field} 
                      />
                    )}
                  </FormField>
                </div>

                <div className="button-group">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    disabled={isSubmitting || !isValid}
                    isLoading={isSubmitting}
                  >
                    {t('formPage.submit')}
                  </Button>
                  <Button 
                    type="reset" 
                    variant="secondary"
                  >
                    {t('formPage.reset')}
                  </Button>
                </div>

                {Object.keys(formData).length > 0 && (
                  <div className="mt-2">
                    <h3>{t('formPage.formData')}</h3>
                    <pre className="code-block">
                      {JSON.stringify(formData, null, 2)}
                    </pre>
                  </div>
                )}
              </>
            )}
          </Form>

          <div className="code-block mt-2">
            {`<Form
  initialValues={{
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    country: '',
    gender: '',
    subscribe: false,
    notifications: false,
    birthDate: '',
    meetingTime: '',
    favoriteColor: '#3f51b5',
    resume: null
  }}
  onSubmit={handleSubmit}
  validationStrategy="onBlur"
>
  {({ isSubmitting, isValid }) => (
    <>
      <FormField
        name="firstName"
        label={t('formPage.firstName')}
        validators={[required(t('formPage.firstNameRequired'))]}
      >
        {({ field, error }) => (
          <Input 
            placeholder={t('formPage.firstNamePlaceholder')} 
            {...field} 
            error={error} 
          />
        )}
      </FormField>
      
      {/* Other form fields */}
      
      <Button 
        type="submit" 
        variant="primary" 
        disabled={isSubmitting || !isValid}
        isLoading={isSubmitting}
      >
        {t('formPage.submit')}
      </Button>
    </>
  )}
</Form>`}
          </div>
        </Card>
      </div>

      <div className="section">
        <h2 className="section-title">{t('formPage.formComponents')}</h2>
        <div className="component-grid">
          <Card className="p-2">
            <h3>Input</h3>
            <div className="component-example">
              <Input placeholder="Standard Input" />
            </div>
          </Card>

          <Card className="p-2">
            <h3>TextArea</h3>
            <div className="component-example">
              <TextArea placeholder="Multiline Text" rows={3} />
            </div>
          </Card>

          <Card className="p-2">
            <h3>Select</h3>
            <div className="component-example">
              <Select 
                options={countryOptions} 
                placeholder="Choose a country" 
              />
            </div>
          </Card>

          <Card className="p-2">
            <h3>Checkbox</h3>
            <div className="component-example">
              <Checkbox label="I agree to terms" />
            </div>
          </Card>

          <Card className="p-2">
            <h3>Radio</h3>
            <div className="component-example">
              <Radio label="Option 1" name="radio-example" value="1" />
              <Radio label="Option 2" name="radio-example" value="2" />
            </div>
          </Card>

          <Card className="p-2">
            <h3>Switch</h3>
            <div className="component-example">
              <Switch label="Enable notifications" />
            </div>
          </Card>

          <Card className="p-2">
            <h3>DatePicker</h3>
            <div className="component-example">
              <DatePicker placeholder="Select date" />
            </div>
          </Card>

          <Card className="p-2">
            <h3>TimePicker</h3>
            <div className="component-example">
              <TimePicker placeholder="Select time" />
            </div>
          </Card>

          <Card className="p-2">
            <h3>ColorPicker</h3>
            <div className="component-example">
              <ColorPicker defaultValue="#3f51b5" />
            </div>
          </Card>

          <Card className="p-2">
            <h3>FileUpload</h3>
            <div className="component-example">
              <FileUpload accept=".pdf,.doc,.docx" maxSize={5 * 1024 * 1024} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FormPage;