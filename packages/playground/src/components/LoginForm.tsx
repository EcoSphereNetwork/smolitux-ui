// packages/playground/src/components/LoginForm.tsx
import React, { useState } from 'react';
import { Button, Input, Card, Alert } from '@smolitux/core';

interface LoginFormProps {
  onSubmit: (values: { email: string; password: string }) => Promise<void>;
  onForgotPassword?: () => void;
  onRegister?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onForgotPassword, onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await onSubmit({ email, password });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="Anmeldung"
      className="max-w-md mx-auto"
      footer={
        <div className="flex justify-between">
          {onForgotPassword && (
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Passwort vergessen?
            </button>
          )}
          {onRegister && (
            <button
              type="button"
              onClick={onRegister}
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Neues Konto erstellen
            </button>
          )}
        </div>
      }
    >
      {success && (
        <Alert
          type="success"
          title="Erfolgreich angemeldet"
          message="Sie werden weitergeleitet..."
          className="mb-4"
        />
      )}

      {error && (
        <Alert type="error" title="Anmeldung fehlgeschlagen" message={error} className="mb-4" />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="E-Mail-Adresse"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          placeholder="beispiel@domain.de"
          disabled={loading}
        />

        <Input
          label="Passwort"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          disabled={loading}
        />

        <Button type="submit" variant="primary" fullWidth loading={loading} disabled={loading}>
          Anmelden
        </Button>
      </form>
    </Card>
  );
};

export default LoginForm;
