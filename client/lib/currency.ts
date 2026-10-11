/**
 * Centralized currency utilities.
 *
 * The "source of truth" for the user's preferred currency comes from:
 *   1. The AuthUser.preferences.currency stored in AuthContext (synced with backend).
 *   2. A localStorage fallback key so helpers that live outside React can read it.
 *
 * When the user changes their currency in Settings, the SettingsView already
 * calls `refreshUser()` which updates AuthContext. We also sync it into
 * localStorage so pure-JS helpers (e.g. formatCurrency in non-React contexts)
 * can access it.
 */

const CURRENCY_KEY = 'smartsplit_currency';
const DEFAULT_CURRENCY = 'INR';

export interface CurrencyInfo {
  code: string;
  symbol: string;
  locale: string;
}

const CURRENCY_MAP: Record<string, CurrencyInfo> = {
  INR: { code: 'INR', symbol: '₹', locale: 'en-IN' },
  USD: { code: 'USD', symbol: '$', locale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€', locale: 'de-DE' },
  GBP: { code: 'GBP', symbol: '£', locale: 'en-GB' },
};

/** Get the stored currency code (falls back to INR). */
export function getCurrencyCode(): string {
  if (typeof window === 'undefined') return DEFAULT_CURRENCY;
  return localStorage.getItem(CURRENCY_KEY) || DEFAULT_CURRENCY;
}

/** Persist a currency code both in localStorage. */
export function setCurrencyCode(code: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CURRENCY_KEY, code);
  }
}

/** Look up the symbol/locale info for a given currency code. */
export function getCurrencyInfo(code?: string): CurrencyInfo {
  const c = (code || getCurrencyCode()).toUpperCase();
  return CURRENCY_MAP[c] || CURRENCY_MAP[DEFAULT_CURRENCY];
}

/**
 * Format a numeric amount into the user's preferred currency string.
 * Uses the browser's Intl.NumberFormat for locale-aware formatting.
 */
export function formatCurrency(amount: number, currencyCode?: string): string {
  const info = getCurrencyInfo(currencyCode);
  return new Intl.NumberFormat(info.locale, {
    style: 'currency',
    currency: info.code,
  }).format(Math.abs(Number(amount) || 0));
}

/** Return just the currency symbol (e.g. "₹", "$"). */
export function getCurrencySymbol(currencyCode?: string): string {
  return getCurrencyInfo(currencyCode).symbol;
}
