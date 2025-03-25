import React from 'react';
import { 
  Card, 
  useTranslation,
  Breadcrumb,
  Alert,
  Form,
  FormField,
  Input,
  TextArea,
  Button,
  required,
  email,
  minLength,
  maxLength,
  pattern,
  number,
  min,
  max,
  createDependentValidator
} from '@smolitux/core';

const FormValidationPage: React.FC = () => {
  const t = useTranslation();

  // Validator für die Passwortbestätigung
  const passwordsMatch = createDependentValidator((value, values) => {
    if (!value) return true;
    
    return value === values.password 
      ? true 
      : t('formValidation.passwordsDoNotMatch');
  });

  const handleSubmit = (values: any) => {
    console.log('Form submitted:', values);
    // Hier würde die Registrierung verarbeitet werden
  };

  return (
    <div className="container">
      <Breadcrumb
        items={[
          { label: t('navigation.home'), href: '/' },
          { label: t('navigation.features'), href: '#' },
          { label: t('features.formValidation'), href: '/form-validation' }
        ]}
        className="mb-2"
      />

      <h1 className="section-title">{t('features.formValidation')}</h1>
      
      <Alert type="info" className="mb-2">
        {t('formValidation.description')}
      </Alert>

      <div className="section">
        <h2 className="section-title">{t('formValidation.registrationForm')}</h2>
        <Card className="p-2">
          <Form
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
              age: '',
              bio: '',
              website: '',
              phoneNumber: ''
            }}
            onSubmit={handleSubmit}
            validationStrategy="onBlur"
          >
            {({ isSubmitting, isValid }) => (
              <>
                <div className="form-group">
                  <FormField
                    name="username"
                    label={t('formValidation.username')}
                    validators={[
                      required(t('formValidation.usernameRequired')),
                      minLength(3, t('formValidation.usernameMinLength')),
                      maxLength(20, t('formValidation.usernameMaxLength')),
                      pattern(/^[a-zA-Z0-9_]+$/, t('formValidation.usernamePattern'))
                    ]}
                  >
                    {({ field, error }) => (
                      <Input 
                        placeholder={t('formValidation.usernamePlaceholder')} 
                        {...field} 
                        error={error} 
                      />
                    )}
                  </FormField>
                </div>

                <div className="form-group">
                  <FormField
                    name="email"
                    label={t('formValidation.email')}
                    validators={[
                      required(t('formValidation.emailRequired')),
                      email(t('formValidation.emailInvalid'))
                    ]}
                  >
                    {({ field, error }) => (
                      <Input 
                        type="email" 
                        placeholder={t('formValidation.emailPlaceholder')} 
                        {...field} 
                        error={error} 
                      />
                    )}
                  </FormField>
                </div>

                <div className="form-group">
                  <FormField
                    name="password"
                    label={t('formValidation.password')}
                    validators={[
                      required(t('formValidation.passwordRequired')),
                      minLength(8, t('formValidation.passwordMinLength')),
                      pattern(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                        t('formValidation.passwordPattern')
                      )
                    ]}
                  >
                    {({ field, error }) => (
                      <Input 
                        type="password" 
                        placeholder={t('formValidation.passwordPlaceholder')} 
                        {...field} 
                        error={error} 
                      />
                    )}
                  </FormField>
                </div>

                <div className="form-group">
                  <FormField
                    name="confirmPassword"
                    label={t('formValidation.confirmPassword')}
                    validators={[
                      required(t('formValidation.confirmPasswordRequired')),
                      passwordsMatch
                    ]}
                  >
                    {({ field, error }) => (
                      <Input 
                        type="password" 
                        placeholder={t('formValidation.confirmPasswordPlaceholder')} 
                        {...field} 
                        error={error} 
                      />
                    )}
                  </FormField>
                </div>

                <div className="form-group">
                  <FormField
                    name="age"
                    label={t('formValidation.age')}
                    validators={[
                      number(t('formValidation.ageNumber')),
                      min(18, t('formValidation.ageMin')),
                      max(120, t('formValidation.ageMax'))
                    ]}
                  >
                    {({ field, error }) => (
                      <Input 
                        type="number" 
                        placeholder={t('formValidation.agePlaceholder')} 
                        {...field} 
                        error={error} 
                      />
                    )}
                  </FormField>
                </div>

                <div className="form-group">
                  <FormField
                    name="website"
                    label={t('formValidation.website')}
                    validators={[
                      pattern(
                        /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
                        t('formValidation.websiteInvalid')
                      )
                    ]}
                  >
                    {({ field, error }) => (
                      <Input 
                        placeholder={t('formValidation.websitePlaceholder')} 
                        {...field} 
                        error={error} 
                      />
                    )}
                  </FormField>
                </div>

                <div className="form-group">
                  <FormField
                    name="phoneNumber"
                    label={t('formValidation.phoneNumber')}
                    validators={[
                      pattern(
                        /^\+?[0-9]{10,15}$/,
                        t('formValidation.phoneNumberInvalid')
                      )
                    ]}
                  >
                    {({ field, error }) => (
                      <Input 
                        placeholder={t('formValidation.phoneNumberPlaceholder')} 
                        {...field} 
                        error={error} 
                      />
                    )}
                  </FormField>
                </div>

                <div className="form-group">
                  <FormField
                    name="bio"
                    label={t('formValidation.bio')}
                    validators={[
                      maxLength(500, t('formValidation.bioMaxLength'))
                    ]}
                  >
                    {({ field, error }) => (
                      <TextArea 
                        placeholder={t('formValidation.bioPlaceholder')} 
                        rows={4} 
                        {...field} 
                        error={error} 
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
                    {t('formValidation.register')}
                  </Button>
                  <Button 
                    type="reset" 
                    variant="secondary"
                  >
                    {t('formValidation.reset')}
                  </Button>
                </div>
              </>
            )}
          </Form>
        </Card>
      </div>

      <div className="section">
        <h2 className="section-title">{t('formValidation.availableValidators')}</h2>
        <Card className="p-2">
          <table className="props-table">
            <thead>
              <tr>
                <th>{t('propsTable.name')}</th>
                <th>{t('propsTable.description')}</th>
                <th>{t('propsTable.example')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>required</td>
                <td>{t('formValidation.requiredDescription')}</td>
                <td><code>required('Field is required')</code></td>
              </tr>
              <tr>
                <td>email</td>
                <td>{t('formValidation.emailDescription')}</td>
                <td><code>email('Invalid email address')</code></td>
              </tr>
              <tr>
                <td>minLength</td>
                <td>{t('formValidation.minLengthDescription')}</td>
                <td><code>minLength(8, 'Min 8 characters')</code></td>
              </tr>
              <tr>
                <td>maxLength</td>
                <td>{t('formValidation.maxLengthDescription')}</td>
                <td><code>maxLength(100, 'Max 100 characters')</code></td>
              </tr>
              <tr>
                <td>pattern</td>
                <td>{t('formValidation.patternDescription')}</td>
                <td><code>pattern(/^[A-Z]+$/, 'Only uppercase')</code></td>
              </tr>
              <tr>
                <td>number</td>
                <td>{t('formValidation.numberDescription')}</td>
                <td><code>number('Must be a number')</code></td>
              </tr>
              <tr>
                <td>min</td>
                <td>{t('formValidation.minDescription')}</td>
                <td><code>min(18, 'Must be at least 18')</code></td>
              </tr>
              <tr>
                <td>max</td>
                <td>{t('formValidation.maxDescription')}</td>
                <td><code>max(100, 'Must be at most 100')</code></td>
              </tr>
              <tr>
                <td>createDependentValidator</td>
                <td>{t('formValidation.dependentDescription')}</td>
                <td>
                  <pre>
                    {`const passwordsMatch = createDependentValidator(
  (value, values) => {
    return value === values.password 
      ? true 
      : 'Passwords do not match';
  }
);`}
                  </pre>
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      <div className="section">
        <h2 className="section-title">{t('formValidation.validationStrategies')}</h2>
        <Card className="p-2">
          <div className="mb-2">
            <h3>onChange</h3>
            <p>{t('formValidation.onChangeDescription')}</p>
            <code>validationStrategy="onChange"</code>
          </div>

          <div className="mb-2">
            <h3>onBlur</h3>
            <p>{t('formValidation.onBlurDescription')}</p>
            <code>validationStrategy="onBlur"</code>
          </div>

          <div className="mb-2">
            <h3>onSubmit</h3>
            <p>{t('formValidation.onSubmitDescription')}</p>
            <code>validationStrategy="onSubmit"</code>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FormValidationPage;