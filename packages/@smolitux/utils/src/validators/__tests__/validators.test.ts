import {
  isEmail,
  isURL,
  isAlphanumeric,
  isNumeric,
  isAlpha,
  isPhoneNumber,
  isPostalCode,
  isIPAddress,
  isCreditCard,
  isStrongPassword,
  isDate,
  isHexColor,
  isJSON,
  isEthereumAddress,
  isBase64,
} from './validators';

describe('validators', () => {
  describe('isEmail', () => {
    it('validates correct email addresses', () => {
      expect(isEmail('test@example.com')).toBe(true);
      expect(isEmail('test.name@example.co.uk')).toBe(true);
      expect(isEmail('test+label@example.com')).toBe(true);
      expect(isEmail('123@example.com')).toBe(true);
    });

    it('invalidates incorrect email addresses', () => {
      expect(isEmail('test@')).toBe(false);
      expect(isEmail('test@example')).toBe(false);
      expect(isEmail('test.example.com')).toBe(false);
      expect(isEmail('test@.com')).toBe(false);
      expect(isEmail('@example.com')).toBe(false);
      expect(isEmail('test@exam ple.com')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(isEmail('')).toBe(false);
      expect(isEmail(null)).toBe(false);
      expect(isEmail(undefined)).toBe(false);
    });
  });

  describe('isURL', () => {
    it('validates correct URLs', () => {
      expect(isURL('https://example.com')).toBe(true);
      expect(isURL('http://example.com')).toBe(true);
      expect(isURL('https://www.example.co.uk/path?query=string#hash')).toBe(true);
      expect(isURL('http://localhost:3000')).toBe(true);
    });

    it('invalidates incorrect URLs', () => {
      expect(isURL('example.com')).toBe(false);
      expect(isURL('htp://example.com')).toBe(false);
      expect(isURL('https://exam ple.com')).toBe(false);
      expect(isURL('https:/example.com')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(isURL('')).toBe(false);
      expect(isURL(null)).toBe(false);
      expect(isURL(undefined)).toBe(false);
    });
  });

  describe('isAlphanumeric', () => {
    it('validates alphanumeric strings', () => {
      expect(isAlphanumeric('abc123')).toBe(true);
      expect(isAlphanumeric('ABC123')).toBe(true);
      expect(isAlphanumeric('123')).toBe(true);
      expect(isAlphanumeric('abc')).toBe(true);
    });

    it('invalidates non-alphanumeric strings', () => {
      expect(isAlphanumeric('abc-123')).toBe(false);
      expect(isAlphanumeric('abc 123')).toBe(false);
      expect(isAlphanumeric('abc_123')).toBe(false);
      expect(isAlphanumeric('abc@123')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(isAlphanumeric('')).toBe(false);
      expect(isAlphanumeric(null)).toBe(false);
      expect(isAlphanumeric(undefined)).toBe(false);
    });
  });

  describe('isNumeric', () => {
    it('validates numeric strings', () => {
      expect(isNumeric('123')).toBe(true);
      expect(isNumeric('0')).toBe(true);
      expect(isNumeric('-123')).toBe(true);
      expect(isNumeric('123.456')).toBe(true);
    });

    it('invalidates non-numeric strings', () => {
      expect(isNumeric('abc')).toBe(false);
      expect(isNumeric('123abc')).toBe(false);
      expect(isNumeric('123 456')).toBe(false);
      expect(isNumeric('123,456')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(isNumeric('')).toBe(false);
      expect(isNumeric(null)).toBe(false);
      expect(isNumeric(undefined)).toBe(false);
    });
  });

  describe('isAlpha', () => {
    it('validates alphabetic strings', () => {
      expect(isAlpha('abc')).toBe(true);
      expect(isAlpha('ABC')).toBe(true);
      expect(isAlpha('AbCdEf')).toBe(true);
    });

    it('invalidates non-alphabetic strings', () => {
      expect(isAlpha('abc123')).toBe(false);
      expect(isAlpha('abc-def')).toBe(false);
      expect(isAlpha('abc def')).toBe(false);
      expect(isAlpha('123')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(isAlpha('')).toBe(false);
      expect(isAlpha(null)).toBe(false);
      expect(isAlpha(undefined)).toBe(false);
    });
  });

  describe('isPhoneNumber', () => {
    it('validates phone numbers', () => {
      expect(isPhoneNumber('+1 (123) 456-7890')).toBe(true);
      expect(isPhoneNumber('123-456-7890')).toBe(true);
      expect(isPhoneNumber('(123) 456-7890')).toBe(true);
      expect(isPhoneNumber('1234567890')).toBe(true);
    });

    it('invalidates incorrect phone numbers', () => {
      expect(isPhoneNumber('123')).toBe(false);
      expect(isPhoneNumber('abc-def-ghij')).toBe(false);
      expect(isPhoneNumber('123-456-789a')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(isPhoneNumber('')).toBe(false);
      expect(isPhoneNumber(null)).toBe(false);
      expect(isPhoneNumber(undefined)).toBe(false);
    });
  });

  describe('isPostalCode', () => {
    it('validates US postal codes', () => {
      expect(isPostalCode('12345', 'US')).toBe(true);
      expect(isPostalCode('12345-6789', 'US')).toBe(true);
    });

    it('validates UK postal codes', () => {
      expect(isPostalCode('SW1A 1AA', 'UK')).toBe(true);
      expect(isPostalCode('M1 1AA', 'UK')).toBe(true);
      expect(isPostalCode('B33 8TH', 'UK')).toBe(true);
    });

    it('validates Canadian postal codes', () => {
      expect(isPostalCode('A1A 1A1', 'CA')).toBe(true);
      expect(isPostalCode('K1A 0B1', 'CA')).toBe(true);
    });

    it('invalidates incorrect postal codes', () => {
      expect(isPostalCode('1234', 'US')).toBe(false);
      expect(isPostalCode('ABCDEF', 'UK')).toBe(false);
      expect(isPostalCode('123456', 'CA')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(isPostalCode('', 'US')).toBe(false);
      expect(isPostalCode(null, 'US')).toBe(false);
      expect(isPostalCode(undefined, 'US')).toBe(false);
    });
  });

  describe('isIPAddress', () => {
    it('validates IPv4 addresses', () => {
      expect(isIPAddress('192.168.1.1')).toBe(true);
      expect(isIPAddress('127.0.0.1')).toBe(true);
      expect(isIPAddress('0.0.0.0')).toBe(true);
      expect(isIPAddress('255.255.255.255')).toBe(true);
    });

    it('validates IPv6 addresses', () => {
      expect(isIPAddress('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
      expect(isIPAddress('::1')).toBe(true);
      expect(isIPAddress('2001:db8::')).toBe(true);
    });

    it('invalidates incorrect IP addresses', () => {
      expect(isIPAddress('256.0.0.1')).toBe(false);
      expect(isIPAddress('192.168.1')).toBe(false);
      expect(isIPAddress('192.168.1.1.1')).toBe(false);
      expect(isIPAddress('2001:db8::g')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(isIPAddress('')).toBe(false);
      expect(isIPAddress(null)).toBe(false);
      expect(isIPAddress(undefined)).toBe(false);
    });
  });

  describe('isCreditCard', () => {
    it('validates credit card numbers', () => {
      expect(isCreditCard('4111111111111111')).toBe(true); // Visa
      expect(isCreditCard('5555555555554444')).toBe(true); // Mastercard
      expect(isCreditCard('378282246310005')).toBe(true); // American Express
      expect(isCreditCard('6011111111111117')).toBe(true); // Discover
    });

    it('invalidates incorrect credit card numbers', () => {
      expect(isCreditCard('1234567890123456')).toBe(false);
      expect(isCreditCard('4111111111111112')).toBe(false); // Invalid checksum
      expect(isCreditCard('411111111111111')).toBe(false); // Too short
      expect(isCreditCard('41111111111111111')).toBe(false); // Too long
    });

    it('handles edge cases', () => {
      expect(isCreditCard('')).toBe(false);
      expect(isCreditCard(null)).toBe(false);
      expect(isCreditCard(undefined)).toBe(false);
    });
  });

  describe('isStrongPassword', () => {
    it('validates strong passwords', () => {
      expect(isStrongPassword('Abc123!@#')).toBe(true);
      expect(isStrongPassword('P@ssw0rd')).toBe(true);
      expect(isStrongPassword('Complex1!')).toBe(true);
    });

    it('invalidates weak passwords', () => {
      expect(isStrongPassword('password')).toBe(false);
      expect(isStrongPassword('123456')).toBe(false);
      expect(isStrongPassword('abcdef')).toBe(false);
      expect(isStrongPassword('ABCDEF')).toBe(false);
      expect(isStrongPassword('Abcdef')).toBe(false);
      expect(isStrongPassword('Abc123')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(isStrongPassword('')).toBe(false);
      expect(isStrongPassword(null)).toBe(false);
      expect(isStrongPassword(undefined)).toBe(false);
    });
  });

  describe('isDate', () => {
    it('validates date strings', () => {
      expect(isDate('2023-06-15')).toBe(true);
      expect(isDate('06/15/2023')).toBe(true);
      expect(isDate('15/06/2023')).toBe(true);
      expect(isDate('June 15, 2023')).toBe(true);
    });

    it('invalidates incorrect date strings', () => {
      expect(isDate('2023-13-15')).toBe(false);
      expect(isDate('06/32/2023')).toBe(false);
      expect(isDate('not a date')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(isDate('')).toBe(false);
      expect(isDate(null)).toBe(false);
      expect(isDate(undefined)).toBe(false);
    });
  });

  describe('isHexColor', () => {
    it('validates hex color codes', () => {
      expect(isHexColor('#000')).toBe(true);
      expect(isHexColor('#000000')).toBe(true);
      expect(isHexColor('#fff')).toBe(true);
      expect(isHexColor('#FFFFFF')).toBe(true);
      expect(isHexColor('#123abc')).toBe(true);
    });

    it('invalidates incorrect hex color codes', () => {
      expect(isHexColor('000')).toBe(false);
      expect(isHexColor('#00')).toBe(false);
      expect(isHexColor('#0000')).toBe(false);
      expect(isHexColor('#00000')).toBe(false);
      expect(isHexColor('#0000000')).toBe(false);
      expect(isHexColor('#GGGGGG')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(isHexColor('')).toBe(false);
      expect(isHexColor(null)).toBe(false);
      expect(isHexColor(undefined)).toBe(false);
    });
  });

  describe('isJSON', () => {
    it('validates JSON strings', () => {
      expect(isJSON('{}')).toBe(true);
      expect(isJSON('[]')).toBe(true);
      expect(isJSON('{"name":"John","age":30}')).toBe(true);
      expect(isJSON('[1,2,3]')).toBe(true);
    });

    it('invalidates incorrect JSON strings', () => {
      expect(isJSON('{')).toBe(false);
      expect(isJSON('{"name":"John"')).toBe(false);
      expect(isJSON('name:John')).toBe(false);
      expect(isJSON('not json')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(isJSON('')).toBe(false);
      expect(isJSON(null)).toBe(false);
      expect(isJSON(undefined)).toBe(false);
    });
  });

  describe('isEthereumAddress', () => {
    it('validates Ethereum addresses', () => {
      expect(isEthereumAddress('0x1234567890123456789012345678901234567890')).toBe(true);
      expect(isEthereumAddress('0xabcdef1234567890abcdef1234567890abcdef12')).toBe(true);
      expect(isEthereumAddress('0xABCDEF1234567890ABCDEF1234567890ABCDEF12')).toBe(true);
    });

    it('invalidates incorrect Ethereum addresses', () => {
      expect(isEthereumAddress('1234567890123456789012345678901234567890')).toBe(false);
      expect(isEthereumAddress('0x12345678901234567890123456789012345678901')).toBe(false);
      expect(isEthereumAddress('0x123456789012345678901234567890123456789')).toBe(false);
      expect(isEthereumAddress('0xGHIJKL1234567890ABCDEF1234567890ABCDEF12')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(isEthereumAddress('')).toBe(false);
      expect(isEthereumAddress(null)).toBe(false);
      expect(isEthereumAddress(undefined)).toBe(false);
    });
  });

  describe('isBase64', () => {
    it('validates base64 strings', () => {
      expect(isBase64('SGVsbG8gV29ybGQ=')).toBe(true);
      expect(isBase64('dGVzdA==')).toBe(true);
      expect(isBase64('YWJjMTIzIT8kKiYoKSctPUB+')).toBe(true);
    });

    it('invalidates incorrect base64 strings', () => {
      expect(isBase64('SGVsbG8gV29ybGQ')).toBe(false);
      expect(isBase64('SGVsbG8gV29ybGQ===')).toBe(false);
      expect(isBase64('SGVsbG8gV29ybGQ=!')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(isBase64('')).toBe(false);
      expect(isBase64(null)).toBe(false);
      expect(isBase64(undefined)).toBe(false);
    });
  });
});
