# Formular-Beispiele

Diese Seite enthält interaktive Beispiele für die Verwendung der Formular-Komponenten von Smolitux UI in realen Anwendungsfällen.

## Kontaktformular

Dieses Beispiel zeigt ein vollständiges Kontaktformular mit verschiedenen Eingabefeldern, Validierung und Absenden-Funktionalität.

```jsx live
function ContactForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    subscribe: false
  });
  
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Fehler zurücksetzen, wenn Feld geändert wird
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Betreff ist erforderlich';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Nachricht ist erforderlich';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Nachricht muss mindestens 10 Zeichen lang sein';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simuliere API-Aufruf
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Formular zurücksetzen
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          subscribe: false
        });
        
        // Nach 3 Sekunden die Erfolgsmeldung ausblenden
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      }, 1500);
    }
  };
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Kontaktieren Sie uns</h2>
      
      {isSubmitted && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze bei Ihnen melden.
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <FormControl 
          label="Name" 
          error={errors.name} 
          className="mb-4"
        >
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ihr Name"
            disabled={isSubmitting}
          />
        </FormControl>
        
        <FormControl 
          label="E-Mail" 
          error={errors.email} 
          className="mb-4"
        >
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ihre.email@beispiel.de"
            disabled={isSubmitting}
          />
        </FormControl>
        
        <FormControl 
          label="Betreff" 
          error={errors.subject} 
          className="mb-4"
        >
          <Select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="">Bitte wählen</option>
            <option value="allgemein">Allgemeine Anfrage</option>
            <option value="support">Technischer Support</option>
            <option value="feedback">Feedback</option>
            <option value="other">Sonstiges</option>
          </Select>
        </FormControl>
        
        <FormControl 
          label="Nachricht" 
          error={errors.message} 
          className="mb-4"
        >
          <TextArea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Ihre Nachricht..."
            rows={5}
            disabled={isSubmitting}
          />
        </FormControl>
        
        <FormControl className="mb-6">
          <Checkbox
            name="subscribe"
            checked={formData.subscribe}
            onChange={handleChange}
            disabled={isSubmitting}
            label="Newsletter abonnieren"
          />
        </FormControl>
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isSubmitting}
        >
          {isSubmitting ? 'Wird gesendet...' : 'Absenden'}
        </Button>
      </form>
    </div>
  );
}
```

## Registrierungsformular

Dieses Beispiel zeigt ein Registrierungsformular mit Passwort-Validierung und Nutzungsbedingungen.

```jsx live
function RegistrationForm() {
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Fehler zurücksetzen, wenn Feld geändert wird
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Benutzername ist erforderlich';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Benutzername muss mindestens 3 Zeichen lang sein';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
    }
    
    if (!formData.password) {
      newErrors.password = 'Passwort ist erforderlich';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Passwort muss mindestens 8 Zeichen lang sein';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Passwort muss mindestens einen Großbuchstaben, einen Kleinbuchstaben und eine Zahl enthalten';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwörter stimmen nicht überein';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Sie müssen den Nutzungsbedingungen zustimmen';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simuliere API-Aufruf
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-xl font-bold mb-2">Registrierung erfolgreich!</h2>
        <p className="mb-4">Vielen Dank für Ihre Registrierung. Eine Bestätigungs-E-Mail wurde an {formData.email} gesendet.</p>
        <Button 
          variant="primary"
          onClick={() => setIsSubmitted(false)}
        >
          Zurück zum Formular
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Konto erstellen</h2>
      
      <form onSubmit={handleSubmit}>
        <FormControl 
          label="Benutzername" 
          error={errors.username} 
          className="mb-4"
        >
          <Input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Ihr Benutzername"
            disabled={isSubmitting}
          />
        </FormControl>
        
        <FormControl 
          label="E-Mail" 
          error={errors.email} 
          className="mb-4"
        >
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ihre.email@beispiel.de"
            disabled={isSubmitting}
          />
        </FormControl>
        
        <FormControl 
          label="Passwort" 
          error={errors.password} 
          className="mb-4"
        >
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Passwort"
            disabled={isSubmitting}
          />
        </FormControl>
        
        <FormControl 
          label="Passwort bestätigen" 
          error={errors.confirmPassword} 
          className="mb-6"
        >
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Passwort bestätigen"
            disabled={isSubmitting}
          />
        </FormControl>
        
        <FormControl 
          error={errors.agreeTerms} 
          className="mb-6"
        >
          <Checkbox
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            disabled={isSubmitting}
            label={
              <span>
                Ich stimme den <a href="#" className="text-blue-600 hover:underline">Nutzungsbedingungen</a> und der <a href="#" className="text-blue-600 hover:underline">Datenschutzerklärung</a> zu
              </span>
            }
          />
        </FormControl>
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isSubmitting}
        >
          {isSubmitting ? 'Wird registriert...' : 'Registrieren'}
        </Button>
        
        <div className="mt-4 text-center text-sm text-gray-600">
          Bereits registriert? <a href="#" className="text-blue-600 hover:underline">Anmelden</a>
        </div>
      </form>
    </div>
  );
}
```

## Zahlungsformular

Dieses Beispiel zeigt ein Zahlungsformular für eine E-Commerce-Anwendung.

```jsx live
function PaymentForm() {
  const [formData, setFormData] = React.useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });
  
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Formatierung für Kartennummer: Füge Leerzeichen nach jeweils 4 Ziffern ein
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/\D/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim()
        .slice(0, 19); // 16 Ziffern + 3 Leerzeichen
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      return;
    }
    
    // Formatierung für Ablaufdatum: MM/YY
    if (name === 'expiryDate') {
      const formattedValue = value
        .replace(/\D/g, '')
        .replace(/^(.{2})(.+)$/, '$1/$2')
        .slice(0, 5);
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      return;
    }
    
    // Formatierung für CVV: Nur Zahlen, max. 4 Stellen
    if (name === 'cvv') {
      const formattedValue = value
        .replace(/\D/g, '')
        .slice(0, 4);
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Fehler zurücksetzen, wenn Feld geändert wird
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.cardName.trim()) {
      newErrors.cardName = 'Name ist erforderlich';
    }
    
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Kartennummer ist erforderlich';
    } else if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Kartennummer muss 16 Ziffern haben';
    }
    
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Ablaufdatum ist erforderlich';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Ungültiges Format (MM/YY)';
    } else {
      const [month, year] = formData.expiryDate.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      
      if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiryDate = 'Ungültiger Monat';
      } else if (
        parseInt(year) < currentYear || 
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        newErrors.expiryDate = 'Karte ist abgelaufen';
      }
    }
    
    if (!formData.cvv) {
      newErrors.cvv = 'Sicherheitscode ist erforderlich';
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = 'Sicherheitscode muss 3-4 Ziffern haben';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simuliere API-Aufruf
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-xl font-bold mb-2">Zahlung erfolgreich!</h2>
        <p className="mb-4">Vielen Dank für Ihren Einkauf. Eine Bestätigung wurde an Ihre E-Mail-Adresse gesendet.</p>
        <Button 
          variant="primary"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              cardName: '',
              cardNumber: '',
              expiryDate: '',
              cvv: '',
              saveCard: false
            });
          }}
        >
          Neue Zahlung
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Zahlungsinformationen</h2>
      
      <div className="mb-6 p-4 bg-gray-50 rounded-md">
        <div className="flex justify-between mb-2">
          <span>Zwischensumme:</span>
          <span>79,99 €</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Versand:</span>
          <span>4,95 €</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Steuern:</span>
          <span>15,20 €</span>
        </div>
        <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
          <span>Gesamtsumme:</span>
          <span>100,14 €</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <FormControl 
          label="Name auf der Karte" 
          error={errors.cardName} 
          className="mb-4"
        >
          <Input
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            placeholder="Max Mustermann"
            disabled={isSubmitting}
          />
        </FormControl>
        
        <FormControl 
          label="Kartennummer" 
          error={errors.cardNumber} 
          className="mb-4"
        >
          <Input
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            disabled={isSubmitting}
          />
        </FormControl>
        
        <div className="flex gap-4 mb-4">
          <FormControl 
            label="Ablaufdatum" 
            error={errors.expiryDate} 
            className="flex-1"
          >
            <Input
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              disabled={isSubmitting}
            />
          </FormControl>
          
          <FormControl 
            label="Sicherheitscode" 
            error={errors.cvv} 
            className="flex-1"
          >
            <Input
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
              disabled={isSubmitting}
            />
          </FormControl>
        </div>
        
        <FormControl className="mb-6">
          <Checkbox
            name="saveCard"
            checked={formData.saveCard}
            onChange={handleChange}
            disabled={isSubmitting}
            label="Karte für zukünftige Zahlungen speichern"
          />
        </FormControl>
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isSubmitting}
        >
          {isSubmitting ? 'Wird verarbeitet...' : 'Jetzt bezahlen'}
        </Button>
        
        <div className="mt-4 text-center text-sm text-gray-600">
          Ihre Zahlungsdaten werden sicher verarbeitet.
        </div>
      </form>
    </div>
  );
}
```

## Einstellungsformular

Dieses Beispiel zeigt ein Formular für Benutzereinstellungen mit verschiedenen Eingabetypen.

```jsx live
function SettingsForm() {
  const [formData, setFormData] = React.useState({
    displayName: 'Max Mustermann',
    email: 'max@example.com',
    language: 'de',
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    privacy: {
      profileVisibility: 'public',
      activityTracking: true,
      dataSharing: false
    }
  });
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuliere API-Aufruf
    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      
      // Toast nach 3 Sekunden ausblenden
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }, 1000);
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6">Kontoeinstellungen</h2>
      
      {showToast && (
        <div className="fixed top-4 right-4 p-4 bg-green-100 text-green-700 rounded-md shadow-md">
          Einstellungen wurden erfolgreich gespeichert!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Profil</h3>
          
          <FormControl 
            label="Anzeigename" 
            className="mb-4"
          >
            <Input
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </FormControl>
          
          <FormControl 
            label="E-Mail-Adresse" 
            className="mb-4"
          >
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </FormControl>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Darstellung</h3>
          
          <FormControl 
            label="Sprache" 
            className="mb-4"
          >
            <Select
              name="language"
              value={formData.language}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="de">Deutsch</option>
              <option value="en">Englisch</option>
              <option value="fr">Französisch</option>
              <option value="es">Spanisch</option>
            </Select>
          </FormControl>
          
          <FormControl 
            label="Theme" 
            className="mb-4"
          >
            <RadioGroup
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <Radio value="light" label="Hell" />
              <Radio value="dark" label="Dunkel" />
              <Radio value="system" label="Systemeinstellung" />
            </RadioGroup>
          </FormControl>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Benachrichtigungen</h3>
          
          <FormControl className="mb-2">
            <Checkbox
              name="notifications.email"
              checked={formData.notifications.email}
              onChange={handleChange}
              disabled={isSubmitting}
              label="E-Mail-Benachrichtigungen"
            />
          </FormControl>
          
          <FormControl className="mb-2">
            <Checkbox
              name="notifications.push"
              checked={formData.notifications.push}
              onChange={handleChange}
              disabled={isSubmitting}
              label="Push-Benachrichtigungen"
            />
          </FormControl>
          
          <FormControl className="mb-4">
            <Checkbox
              name="notifications.sms"
              checked={formData.notifications.sms}
              onChange={handleChange}
              disabled={isSubmitting}
              label="SMS-Benachrichtigungen"
            />
          </FormControl>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Datenschutz</h3>
          
          <FormControl 
            label="Profilsichtbarkeit" 
            className="mb-4"
          >
            <Select
              name="privacy.profileVisibility"
              value={formData.privacy.profileVisibility}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="public">Öffentlich</option>
              <option value="friends">Nur Freunde</option>
              <option value="private">Privat</option>
            </Select>
          </FormControl>
          
          <FormControl className="mb-2">
            <Checkbox
              name="privacy.activityTracking"
              checked={formData.privacy.activityTracking}
              onChange={handleChange}
              disabled={isSubmitting}
              label="Aktivitätsverfolgung erlauben"
            />
          </FormControl>
          
          <FormControl className="mb-4">
            <Checkbox
              name="privacy.dataSharing"
              checked={formData.privacy.dataSharing}
              onChange={handleChange}
              disabled={isSubmitting}
              label="Daten mit Partnern teilen"
            />
          </FormControl>
        </div>
        
        <div className="flex justify-end gap-4">
          <Button
            variant="outlined"
            disabled={isSubmitting}
          >
            Abbrechen
          </Button>
          
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
          >
            Speichern
          </Button>
        </div>
      </form>
    </div>
  );
}
```