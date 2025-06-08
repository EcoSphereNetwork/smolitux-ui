/**
 * Validiert eine E-Mail-Adresse
 * @param email Die zu validierende E-Mail-Adresse
 * @returns true, wenn die E-Mail-Adresse gültig ist, sonst false
 */
export function validateEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

/**
 * Validiert ein Passwort
 * @param password Das zu validierende Passwort
 * @returns true, wenn das Passwort gültig ist, sonst false
 */
export function validatePassword(password: string): boolean {
  // Mindestens 8 Zeichen, mindestens ein Buchstabe und eine Zahl
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password);
}

/**
 * Validiert einen Benutzernamen
 * @param username Der zu validierende Benutzername
 * @returns true, wenn der Benutzername gültig ist, sonst false
 */
export function validateUsername(username: string): boolean {
  // Mindestens 3 Zeichen, nur Buchstaben, Zahlen und Unterstriche
  const re = /^[a-zA-Z0-9_]{3,}$/;
  return re.test(username);
}

/**
 * Validiert eine URL
 * @param url Die zu validierende URL
 * @returns true, wenn die URL gültig ist, sonst false
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Validiert eine Wallet-Adresse
 * @param address Die zu validierende Wallet-Adresse
 * @returns true, wenn die Wallet-Adresse gültig ist, sonst false
 */
export function validateWalletAddress(address: string): boolean {
  // Einfache Validierung für Ethereum-Adressen
  const re = /^0x[a-fA-F0-9]{40}$/;
  return re.test(address);
}
