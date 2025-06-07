import {
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
} from '..';

describe('formatters', () => {
  describe('formatNumber', () => {
    it('formats numbers with default options', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1000.5)).toBe('1,000.5');
      expect(formatNumber(1000000)).toBe('1,000,000');
    });

    it('formats numbers with custom decimal places', () => {
      expect(formatNumber(1000.5678, { decimals: 2 })).toBe('1,000.57');
      expect(formatNumber(1000, { decimals: 2 })).toBe('1,000.00');
    });

    it('formats numbers with custom separator', () => {
      expect(formatNumber(1000.5, { separator: '.' })).toBe('1.000,5');
      expect(formatNumber(1000000, { separator: ' ' })).toBe('1 000 000');
    });

    it('formats numbers with compact notation', () => {
      expect(formatNumber(1500, { compact: true })).toBe('1.5K');
      expect(formatNumber(1500000, { compact: true })).toBe('1.5M');
      expect(formatNumber(1500000000, { compact: true })).toBe('1.5B');
    });

    it('handles edge cases', () => {
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(-1000)).toBe('-1,000');
      expect(formatNumber(NaN)).toBe('NaN');
      expect(formatNumber(Infinity)).toBe('∞');
    });
  });

  describe('formatCurrency', () => {
    it('formats currency with default options', () => {
      expect(formatCurrency(1000)).toBe('$1,000.00');
      expect(formatCurrency(1000.5)).toBe('$1,000.50');
    });

    it('formats currency with custom currency code', () => {
      expect(formatCurrency(1000, { currency: 'EUR' })).toBe('€1,000.00');
      expect(formatCurrency(1000, { currency: 'GBP' })).toBe('£1,000.00');
      expect(formatCurrency(1000, { currency: 'JPY' })).toBe('¥1,000');
    });

    it('formats currency with custom locale', () => {
      expect(formatCurrency(1000, { locale: 'de-DE', currency: 'EUR' })).toBe('1.000,00 €');
      expect(formatCurrency(1000, { locale: 'ja-JP', currency: 'JPY' })).toBe('￥1,000');
    });

    it('formats currency with custom decimal places', () => {
      expect(formatCurrency(1000.5678, { decimals: 3 })).toBe('$1,000.568');
    });

    it('handles edge cases', () => {
      expect(formatCurrency(0)).toBe('$0.00');
      expect(formatCurrency(-1000)).toBe('-$1,000.00');
    });
  });

  describe('formatDate', () => {
    it('formats date with default options', () => {
      const date = new Date('2023-06-15');
      expect(formatDate(date)).toMatch(/Jun(e)? 15, 2023/);
    });

    it('formats date with custom format', () => {
      const date = new Date('2023-06-15');
      expect(formatDate(date, { format: 'yyyy-MM-dd' })).toBe('2023-06-15');
      expect(formatDate(date, { format: 'dd/MM/yyyy' })).toBe('15/06/2023');
      expect(formatDate(date, { format: 'MMMM d, yyyy' })).toMatch(/June 15, 2023/);
    });

    it('formats date with custom locale', () => {
      const date = new Date('2023-06-15');
      expect(formatDate(date, { locale: 'de-DE', format: 'MMMM d, yyyy' })).toMatch(
        /Juni 15, 2023/
      );
      expect(formatDate(date, { locale: 'fr-FR', format: 'MMMM d, yyyy' })).toMatch(
        /juin 15, 2023/
      );
    });

    it('handles edge cases', () => {
      expect(formatDate(null)).toBe('');
      expect(formatDate(undefined)).toBe('');
      expect(formatDate(new Date('invalid date'))).toBe('Invalid Date');
    });
  });

  describe('formatTime', () => {
    it('formats time with default options', () => {
      const date = new Date('2023-06-15T14:30:45');
      expect(formatTime(date)).toMatch(/2:30 PM/);
    });

    it('formats time with custom format', () => {
      const date = new Date('2023-06-15T14:30:45');
      expect(formatTime(date, { format: 'HH:mm:ss' })).toBe('14:30:45');
      expect(formatTime(date, { format: 'h:mm a' })).toMatch(/2:30 PM/);
    });

    it('formats time with custom locale', () => {
      const date = new Date('2023-06-15T14:30:45');
      expect(formatTime(date, { locale: 'de-DE', format: 'HH:mm:ss' })).toBe('14:30:45');
    });

    it('handles edge cases', () => {
      expect(formatTime(null)).toBe('');
      expect(formatTime(undefined)).toBe('');
      expect(formatTime(new Date('invalid date'))).toBe('Invalid Date');
    });
  });

  describe('formatDateTime', () => {
    it('formats date and time with default options', () => {
      const date = new Date('2023-06-15T14:30:45');
      expect(formatDateTime(date)).toMatch(/Jun(e)? 15, 2023, 2:30 PM/);
    });

    it('formats date and time with custom format', () => {
      const date = new Date('2023-06-15T14:30:45');
      expect(formatDateTime(date, { format: 'yyyy-MM-dd HH:mm:ss' })).toBe('2023-06-15 14:30:45');
    });

    it('formats date and time with custom locale', () => {
      const date = new Date('2023-06-15T14:30:45');
      expect(formatDateTime(date, { locale: 'de-DE', format: 'dd.MM.yyyy, HH:mm' })).toBe(
        '15.06.2023, 14:30'
      );
    });

    it('handles edge cases', () => {
      expect(formatDateTime(null)).toBe('');
      expect(formatDateTime(undefined)).toBe('');
      expect(formatDateTime(new Date('invalid date'))).toBe('Invalid Date');
    });
  });

  describe('formatDuration', () => {
    it('formats duration in seconds', () => {
      expect(formatDuration(30)).toBe('0:30');
      expect(formatDuration(90)).toBe('1:30');
      expect(formatDuration(3600)).toBe('1:00:00');
      expect(formatDuration(3661)).toBe('1:01:01');
    });

    it('formats duration with custom format', () => {
      expect(formatDuration(90, { format: 'minutes' })).toBe('1.5 minutes');
      expect(formatDuration(3600, { format: 'hours' })).toBe('1 hour');
      expect(formatDuration(7200, { format: 'hours' })).toBe('2 hours');
    });

    it('formats duration with custom separator', () => {
      expect(formatDuration(90, { separator: '.' })).toBe('1.30');
      expect(formatDuration(3661, { separator: '.' })).toBe('1.01.01');
    });

    it('handles edge cases', () => {
      expect(formatDuration(0)).toBe('0:00');
      expect(formatDuration(-30)).toBe('0:00');
      expect(formatDuration(NaN)).toBe('Invalid Duration');
    });
  });

  describe('formatFileSize', () => {
    it('formats file size in bytes', () => {
      expect(formatFileSize(500)).toBe('500 B');
      expect(formatFileSize(1024)).toBe('1.0 KB');
      expect(formatFileSize(1536)).toBe('1.5 KB');
      expect(formatFileSize(1048576)).toBe('1.0 MB');
      expect(formatFileSize(1073741824)).toBe('1.0 GB');
    });

    it('formats file size with custom decimal places', () => {
      expect(formatFileSize(1536, { decimals: 2 })).toBe('1.50 KB');
      expect(formatFileSize(1048576, { decimals: 3 })).toBe('1.000 MB');
    });

    it('formats file size with binary units', () => {
      expect(formatFileSize(1024, { binary: true })).toBe('1.0 KiB');
      expect(formatFileSize(1048576, { binary: true })).toBe('1.0 MiB');
      expect(formatFileSize(1073741824, { binary: true })).toBe('1.0 GiB');
    });

    it('handles edge cases', () => {
      expect(formatFileSize(0)).toBe('0 B');
      expect(formatFileSize(-1024)).toBe('0 B');
      expect(formatFileSize(NaN)).toBe('Invalid Size');
    });
  });

  describe('formatPercentage', () => {
    it('formats percentage with default options', () => {
      expect(formatPercentage(0.5)).toBe('50%');
      expect(formatPercentage(0.123)).toBe('12%');
      expect(formatPercentage(1)).toBe('100%');
    });

    it('formats percentage with custom decimal places', () => {
      expect(formatPercentage(0.123, { decimals: 1 })).toBe('12.3%');
      expect(formatPercentage(0.123, { decimals: 2 })).toBe('12.30%');
    });

    it('formats percentage with custom multiplier', () => {
      expect(formatPercentage(50, { multiplier: false })).toBe('50%');
      expect(formatPercentage(0.5, { multiplier: true })).toBe('50%');
    });

    it('handles edge cases', () => {
      expect(formatPercentage(0)).toBe('0%');
      expect(formatPercentage(-0.5)).toBe('-50%');
      expect(formatPercentage(NaN)).toBe('NaN%');
    });
  });

  describe('truncateText', () => {
    it('truncates text with default options', () => {
      expect(truncateText('This is a long text that should be truncated', 20)).toBe(
        'This is a long text...'
      );
    });

    it('truncates text with custom suffix', () => {
      expect(
        truncateText('This is a long text that should be truncated', 20, { suffix: ' [more]' })
      ).toBe('This is a long text [more]');
    });

    it('does not truncate text shorter than maxLength', () => {
      expect(truncateText('Short text', 20)).toBe('Short text');
    });

    it('handles edge cases', () => {
      expect(truncateText('', 20)).toBe('');
      expect(truncateText(null, 20)).toBe('');
      expect(truncateText(undefined, 20)).toBe('');
    });
  });

  describe('formatAddress', () => {
    it('formats blockchain address with default options', () => {
      expect(formatAddress('0x1234567890123456789012345678901234567890')).toBe('0x1234...7890');
    });

    it('formats blockchain address with custom prefix length', () => {
      expect(formatAddress('0x1234567890123456789012345678901234567890', { prefixLength: 6 })).toBe(
        '0x12345...7890'
      );
    });

    it('formats blockchain address with custom suffix length', () => {
      expect(formatAddress('0x1234567890123456789012345678901234567890', { suffixLength: 6 })).toBe(
        '0x1234...567890'
      );
    });

    it('formats blockchain address with custom separator', () => {
      expect(
        formatAddress('0x1234567890123456789012345678901234567890', { separator: '___' })
      ).toBe('0x1234___7890');
    });

    it('handles edge cases', () => {
      expect(formatAddress('')).toBe('');
      expect(formatAddress(null)).toBe('');
      expect(formatAddress(undefined)).toBe('');
      expect(formatAddress('0x123')).toBe('0x123');
    });
  });
});
