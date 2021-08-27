/**
 * Module containing utility functions for some UI functionality
 */

/**
 * Generates a random color string e.g. #aec675
 * @returns {string}
 */
export function generateRandomColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
