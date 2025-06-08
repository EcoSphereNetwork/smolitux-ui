/**
 * Formatiert einen Währungsbetrag
 * @param value Der zu formatierende Wert
 * @param currency Die Währung (z.B. 'USD', 'EUR')
 * @param options Optionen für die Formatierung
 * @returns Formatierter Währungsbetrag
 */
export function formatCurrency(
  value: number,
  currency: string = 'USD',
  options: Intl.NumberFormatOptions = {}
) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(value);
}

/**
 * Formatiert eine Zahl
 * @param value Der zu formatierende Wert
 * @param options Optionen für die Formatierung
 * @returns Formatierte Zahl
 */
export function formatNumber(value: number, options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat(undefined, options).format(value);
}

/**
 * Formatiert einen Prozentsatz
 * @param value Der zu formatierende Wert
 * @param options Optionen für die Formatierung
 * @returns Formatierter Prozentsatz
 */
export function formatPercentage(value: number, options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat(undefined, {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    ...options,
  }).format(value / 100);
}

/**
 * Formatiert ein Datum
 * @param dateString Der zu formatierende Datums-String
 * @param options Optionen für die Formatierung
 * @returns Formatiertes Datum
 */
export function formatDate(dateString: string, options: Intl.DateTimeFormatOptions = {}) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  });
}

/**
 * Formatiert eine Zeitdauer
 * @param dateString Das Enddatum als String
 * @returns Formatierte Zeitdauer
 */
export function formatTimeRemaining(dateString: string) {
  const endDate = new Date(dateString);
  const now = new Date();

  if (now > endDate) return 'Ended';

  const diffMs = endDate.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (diffDays > 0) {
    return `${diffDays}d ${diffHours}h remaining`;
  } else {
    return `${diffHours}h remaining`;
  }
}
