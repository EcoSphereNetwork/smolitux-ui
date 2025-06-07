export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isURL(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function isAlphanumeric(value: string): boolean {
  return /^[a-z0-9]+$/i.test(value);
}

export function isNumeric(value: string): boolean {
  return /^-?\d+(\.\d+)?$/.test(value);
}

export function isAlpha(value: string): boolean {
  return /^[a-zA-Z]+$/.test(value);
}

export function isPhoneNumber(value: string): boolean {
  return /^\+?[0-9\-\s()]{7,}$/.test(value);
}

export function isPostalCode(value: string): boolean {
  return /^[A-Za-z0-9\-\s]{3,10}$/.test(value);
}

export function isIPAddress(value: string): boolean {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(value);
}

export function isCreditCard(value: string): boolean {
  return /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12})(?:[0-9]{3})?$/.test(value.replace(/[-\s]/g, ''));
}

export function isStrongPassword(value: string): boolean {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
}

export function isDate(value: string): boolean {
  return !isNaN(Date.parse(value));
}

export function isHexColor(value: string): boolean {
  return /^#?[0-9A-Fa-f]{6}$/.test(value);
}

export function isJSON(value: string): boolean {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}

export function isEthereumAddress(value: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(value);
}

export function isBase64(value: string): boolean {
  return /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(value);
}
