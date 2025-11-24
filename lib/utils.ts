import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { addBusinessDays, isWeekend, parseISO, format } from "date-fns";

/**
 * Utility for merging Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculate business days (excluding weekends)
 * @param startDate - Starting date
 * @param days - Number of business days to add
 * @returns Date after adding business days
 */
export function addBusinessDaysCustom(startDate: Date, days: number): Date {
  return addBusinessDays(startDate, days);
}

/**
 * Check if a date is at least N business days in the future
 * @param targetDate - Date to check
 * @param minBusinessDays - Minimum required business days
 * @returns true if date meets requirement
 */
export function isMinBusinessDaysAhead(
  targetDate: Date,
  minBusinessDays: number
): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);
  
  let businessDaysCount = 0;
  let currentDate = new Date(today);
  
  while (currentDate < target) {
    currentDate.setDate(currentDate.getDate() + 1);
    if (!isWeekend(currentDate)) {
      businessDaysCount++;
    }
  }
  
  return businessDaysCount >= minBusinessDays;
}

/**
 * Format time string to HH:MM
 */
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':');
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
}

/**
 * Parse time string and validate format
 */
export function parseTime(timeString: string): { hours: number; minutes: number } | null {
  const match = timeString.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  
  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return null;
  }
  
  return { hours, minutes };
}

/**
 * Check if time is within hub operating hours
 */
export function isWithinOperatingHours(
  time: string,
  openTime: string = '09:00',
  closeTime: string = '20:00'
): boolean {
  const timeObj = parseTime(time);
  const openObj = parseTime(openTime);
  const closeObj = parseTime(closeTime);
  
  if (!timeObj || !openObj || !closeObj) return false;
  
  const timeMinutes = timeObj.hours * 60 + timeObj.minutes;
  const openMinutes = openObj.hours * 60 + openObj.minutes;
  const closeMinutes = closeObj.hours * 60 + closeObj.minutes;
  
  return timeMinutes >= openMinutes && timeMinutes <= closeMinutes;
}

/**
 * Generate unique reference ID for requests
 */
export function generateReferenceId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 7);
  return `ALX-${timestamp}-${randomStr}`.toUpperCase();
}

/**
 * Sanitize filename for safe storage
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_')
    .toLowerCase();
}

/**
 * Format file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (international format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/[\s()-]/g, ''));
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string, formatStr: string = 'PPP'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
}

/**
 * Get status color for UI display
 */
export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    NEW: 'bg-blue-100 text-blue-800',
    UNDER_REVIEW: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
    SCHEDULED: 'bg-purple-100 text-purple-800',
    COMPLETED: 'bg-gray-100 text-gray-800',
    CANCELLED: 'bg-gray-100 text-gray-600',
  };
  
  return statusColors[status] || 'bg-gray-100 text-gray-800';
}

/**
 * Get partnership type color
 */
export function getPartnershipTypeColor(type: string): string {
  const typeColors: Record<string, string> = {
    SPEAKER: '#3B82F6', // blue
    EVENT: '#10B981', // green
    RECRUITMENT: '#8B5CF6', // purple
    SPONSORSHIP: '#F59E0B', // amber
    OTHER: '#6B7280', // gray
  };
  
  return typeColors[type] || typeColors.OTHER;
}

/**
 * Sleep utility for async operations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Safely parse JSON with fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}
