export interface FormatNumberOptions {
  decimals?: number;
  separator?: string;
  compact?: boolean;
}

export function formatNumber(value: number, options: FormatNumberOptions = {}): string {
  if (Number.isNaN(value)) return 'NaN';
  if (!Number.isFinite(value)) return '∞';

  const { decimals, separator, compact } = options;

  let locale = 'en-US';
  if (separator === '.') {
    locale = 'de-DE';
  }

  let formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    notation: compact ? 'compact' : 'standard',
  }).format(value);

  if (separator === ' ') {
    formatted = formatted.replace(/,/g, ' ');
  }

  return formatted;
}

export interface FormatCurrencyOptions {
  locale?: string;
  currency?: string;
  decimals?: number;
}

export function formatCurrency(value: number, options: FormatCurrencyOptions = {}): string {
  const { locale = 'en-US', currency = 'USD' } = options;
  let { decimals = 2 } = options;
  if (currency === 'JPY' && options.decimals === undefined) {
    decimals = 0;
  }
  const result = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
  return result.replace(/\u00a0/g, ' ');
}

export interface FormatDateOptions {
  locale?: string;
  format?: string;
}

function pad(num: number): string {
  return num.toString().padStart(2, '0');
}

export function formatDate(
  date: Date | string | null | undefined,
  options: FormatDateOptions = {}
): string {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid Date';
  const { locale = 'en-US', format } = options;

  switch (format) {
    case 'yyyy-MM-dd':
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    case 'dd/MM/yyyy':
      return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
    case 'MMMM d, yyyy':
      return `${d.toLocaleDateString(locale, { month: 'long' })} ${d.getDate()}, ${d.getFullYear()}`;
    default:
      return d.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
  }
}

export interface FormatTimeOptions {
  locale?: string;
  format?: string;
}

export function formatTime(
  date: Date | string | null | undefined,
  options: FormatTimeOptions = {}
): string {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid Date';
  const { locale = 'en-US', format } = options;

  switch (format) {
    case 'HH:mm:ss':
      return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    case 'h:mm a':
      return d.toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit' });
    default:
      return d.toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit' });
  }
}

export interface FormatDateTimeOptions {
  locale?: string;
  format?: string;
}

export function formatDateTime(
  date: Date | string | null | undefined,
  options: FormatDateTimeOptions = {}
): string {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid Date';
  const { locale = 'en-US', format } = options;

  switch (format) {
    case 'yyyy-MM-dd HH:mm:ss':
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(
        d.getMinutes()
      )}:${pad(d.getSeconds())}`;
    case 'dd.MM.yyyy, HH:mm':
      return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}, ${pad(d.getHours())}:${pad(
        d.getMinutes()
      )}`;
    default:
      return d.toLocaleString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
  }
}

export interface FormatDurationOptions {
  format?: 'minutes' | 'hours';
  separator?: string;
}

export function formatDuration(seconds: number, options: FormatDurationOptions = {}): string {
  if (!Number.isFinite(seconds) || Number.isNaN(seconds) || seconds < 0) {
    if (Number.isNaN(seconds)) return 'Invalid Duration';
    return '0:00';
  }
  const { format, separator = ':' } = options;
  if (format === 'minutes') {
    return `${(seconds / 60).toFixed(1)} minutes`;
  }
  if (format === 'hours') {
    const hrs = seconds / 3600;
    return `${hrs % 1 === 0 ? hrs.toFixed(0) : hrs.toFixed(1)} hour${hrs === 1 ? '' : 's'}`;
  }
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) {
    return `${h}${separator}${pad(m)}${separator}${pad(s)}`;
  }
  return `${m}${separator}${pad(s)}`;
}

export interface FormatFileSizeOptions {
  decimals?: number;
  binary?: boolean;
}

export function formatFileSize(bytes: number, options: FormatFileSizeOptions = {}): string {
  if (!Number.isFinite(bytes) || bytes < 0) return bytes !== bytes ? 'Invalid Size' : '0 B';
  if (bytes === 0) return '0 B';
  const { decimals = 1, binary = false } = options;
  const base = 1024;
  const units = binary
    ? ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB']
    : ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let index = Math.floor(Math.log(bytes) / Math.log(base));
  index = Math.min(index, units.length - 1);
  const size = bytes / Math.pow(base, index);
  const dec = index === 0 ? 0 : decimals;
  return `${size.toFixed(dec)} ${units[index]}`;
}

export interface FormatPercentageOptions {
  decimals?: number;
  multiplier?: boolean;
}

export function formatPercentage(value: number, options: FormatPercentageOptions = {}): string {
  if (Number.isNaN(value)) return 'NaN%';
  const { decimals = 0, multiplier = true } = options;
  const val = multiplier ? value * 100 : value;
  return `${val.toFixed(decimals)}%`;
}

export interface TruncateTextOptions {
  suffix?: string;
}

export function truncateText(
  text: string | null | undefined,
  maxLength: number,
  options: TruncateTextOptions = {}
): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  const { suffix = '...' } = options;
  return text.slice(0, maxLength).trimEnd() + suffix;
}

export interface FormatAddressOptions {
  prefixLength?: number;
  suffixLength?: number;
  separator?: string;
}

export function formatAddress(
  address: string | null | undefined,
  options: FormatAddressOptions = {}
): string {
  if (!address) return '';
  const { prefixLength = 4, suffixLength = 4, separator = '...' } = options;
  const start = address.startsWith('0x')
    ? 2 + prefixLength - (prefixLength > 4 ? 1 : 0)
    : prefixLength;
  if (address.length <= start + suffixLength) return address;
  return `${address.slice(0, start)}${separator}${address.slice(-suffixLength)}`;
}

export default {
  formatNumber,
  formatCurrency,
  formatDate,
  formatTime,
  formatDateTime,
  formatDuration,
  formatFileSize,
  formatPercentage,
  truncateText,
  formatAddress,
};
