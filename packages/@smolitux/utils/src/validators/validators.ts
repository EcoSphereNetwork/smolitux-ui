export function isEmail(value: unknown): value is string {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isURL(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function isAlphanumeric(value: unknown): value is string {
  return typeof value === 'string' && /^[a-z0-9]+$/i.test(value);
}

export function isNumeric(value: unknown): value is string {
  return typeof value === 'string' && /^-?\d+(\.\d+)?$/.test(value);
}

export function isAlpha(value: unknown): value is string {
  return typeof value === 'string' && /^[a-zA-Z]+$/.test(value);
}

export function isPhoneNumber(value: unknown): value is string {
  return typeof value === 'string' && /^\+?[0-9\-\s()]{7,}$/.test(value);
}

export function isPostalCode(value: unknown): value is string {
  return typeof value === 'string' && /^[A-Za-z0-9\-\s]{3,10}$/.test(value);
}

export function isIPAddress(value: unknown): value is string {
  return typeof value === 'string' && /^(\d{1,3}\.){3}\d{1,3}$/.test(value);
}

export function isCreditCard(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  return /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12})(?:[0-9]{3})?$/.test(
    value.replace(/[-\s]/g, '')
  );
}

export function isStrongPassword(value: unknown): value is string {
  return typeof value === 'string' && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
}

export function isDate(value: unknown): boolean {
  return typeof value === 'string' && !isNaN(Date.parse(value));
}

export function isHexColor(value: unknown): value is string {
  return typeof value === 'string' && /^#?[0-9A-Fa-f]{6}$/.test(value);
}

export function isJSON(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}

export function isEthereumAddress(value: unknown): value is string {
  return typeof value === 'string' && /^0x[a-fA-F0-9]{40}$/.test(value);
}

export function isBase64(value: unknown): value is string {
  return typeof value === 'string' && /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(value);
}
