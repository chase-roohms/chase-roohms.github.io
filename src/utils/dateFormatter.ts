/**
 * Format a date string to a readable format
 * @param dateString - Date in YYYY-MM-DD format
 * @returns Formatted date string (e.g., "December 15, 2025")
 */
export function formatDate(dateString: string): string {
  // Parse date and assume it's noon CST (UTC-6, so 18:00 UTC)
  // This ensures the date displays correctly regardless of user's timezone
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day, 18, 0, 0));
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

/**
 * Format a date string to a short format
 * @param dateString - Date in YYYY-MM-DD format
 * @returns Short formatted date string (e.g., "Dec 15, 2025")
 */
export function formatDateShort(dateString: string): string {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day, 18, 0, 0));
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
}
