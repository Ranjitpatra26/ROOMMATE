/**
 * Centralized Indian Localization Utilities for ROOMMATE
 * Standardizes INR currency, Indian number grouping, date/time formatting, and locality presentation.
 */

/**
 * Format currency in Indian Rupees (INR / ₹) with standard Indian numbering (lakhs/crores).
 * Example: 18500 -> "₹18,500", 125000 -> "₹1,25,000"
 */
export const formatINR = (amount: number, showDecimals: boolean = false): string => {
  if (isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: showDecimals ? 2 : 0,
    minimumFractionDigits: showDecimals ? 2 : 0,
  }).format(amount);
};

/**
 * Format plain number with Indian numbering grouping (e.g. 125000 -> "1,25,000").
 */
export const formatIndianNumber = (num: number): string => {
  if (isNaN(num)) return '0';
  return new Intl.NumberFormat('en-IN').format(num);
};

/**
 * Format date in Indian convention (DD/MM/YYYY or DD MMM YYYY).
 */
export const formatIndianDate = (
  dateInput: string | Date | number,
  format: 'numeric' | 'editorial' = 'editorial'
): string => {
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return '';

  if (format === 'numeric') {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'Asia/Kolkata',
    }).format(d);
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(d);
};

/**
 * Format time in 12-hour AM/PM format (Asia/Kolkata timezone).
 */
export const formatIndianTime = (dateInput: string | Date | number): string => {
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return '';

  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  }).format(d);
};

/**
 * Format standard Indian location (e.g. "Indiranagar, Bengaluru").
 */
export const formatIndianLocation = (locality: string, city: string, state?: string): string => {
  if (state) {
    return `${locality}, ${city}, ${state}`;
  }
  return `${locality}, ${city}`;
};
