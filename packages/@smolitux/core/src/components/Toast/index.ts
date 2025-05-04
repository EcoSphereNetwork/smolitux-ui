// packages/@smolitux/core/src/components/Toast/index.ts
import { default as BaseToast, type ToastProps, type ToastType } from './Toast';
import { default as BaseToastProvider, useToast as useBaseToast, useToastMethods as useBaseToastMethods, type ToastProviderProps } from './ToastProvider';
import { default as ToastA11y, type ToastA11yProps } from './Toast.a11y';
import { default as ToastProviderA11y, useToastA11y, useToastContextA11y, type ToastProviderA11yProps } from './ToastProvider.a11y';

// Erweitere Toast und ToastProvider um die A11y-Komponenten
const Toast = Object.assign(BaseToast, {
  A11y: ToastA11y
});

const ToastProvider = Object.assign(BaseToastProvider, {
  A11y: ToastProviderA11y
});

// Exportiere Komponenten und Typen
export { Toast, ToastProvider, useBaseToast as useToast, useBaseToastMethods as useToastMethods, useToastA11y, useToastContextA11y };
export type { ToastProps, ToastType, ToastProviderProps, ToastA11yProps, ToastProviderA11yProps };

// Fuer Abwaertskompatibilitaet mit dem bestehenden Export
export { Toast as default, ToastProvider as DefaultToastProvider };
