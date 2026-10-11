'use client';

import { useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  formatCurrency as rawFormatCurrency,
  getCurrencySymbol as rawGetCurrencySymbol,
  getCurrencyInfo,
  setCurrencyCode,
  type CurrencyInfo,
} from '@/lib/currency';

/**
 * React hook that provides currency helpers derived from the
 * logged-in user's preferences. If no user is logged in, falls
 * back to the localStorage value (defaults to INR).
 *
 * Usage:
 *   const { formatCurrency, currencySymbol, currencyCode } = useCurrency();
 *   <span>{currencySymbol}</span>
 *   <span>{formatCurrency(42.5)}</span>
 */
export function useCurrency() {
  const { user } = useAuth();

  const currencyCode = useMemo(() => {
    const code = user?.preferences?.currency || 'INR';
    // keep localStorage in sync so non-React helpers also see the latest value
    setCurrencyCode(code);
    return code;
  }, [user?.preferences?.currency]);

  const info: CurrencyInfo = useMemo(() => getCurrencyInfo(currencyCode), [currencyCode]);

  const formatCurrency = useMemo(
    () => (amount: number) => rawFormatCurrency(amount, currencyCode),
    [currencyCode],
  );

  const currencySymbol = useMemo(() => rawGetCurrencySymbol(currencyCode), [currencyCode]);

  return {
    /** e.g. "INR", "USD" */
    currencyCode,
    /** e.g. "₹", "$" */
    currencySymbol,
    /** Full info object { code, symbol, locale } */
    info,
    /** Format an amount into a locale-aware currency string */
    formatCurrency,
  };
}
