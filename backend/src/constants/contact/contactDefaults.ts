/**
 * @summary
 * Default values and constants for Contact entity.
 * Provides centralized configuration for contact form validation limits,
 * email settings, and anti-spam protection.
 *
 * @module constants/contact/contactDefaults
 */

/**
 * @interface ContactDefaultsType
 * @description Default configuration values for contact form
 *
 * @property {string} RECIPIENT_EMAIL - Email address to receive contact messages
 * @property {string} SENDER_EMAIL - Email address for sending automated responses
 * @property {string} EMAIL_SUBJECT_PREFIX - Prefix for email subjects
 * @property {string} AUTO_REPLY_SUBJECT - Subject for automated reply emails
 * @property {number} RESPONSE_TIME_HOURS - Expected response time in business hours
 */
export const CONTACT_DEFAULTS = {
  RECIPIENT_EMAIL: 'contato@chocolatudo.com.br',
  SENDER_EMAIL: 'noreply@chocolatudo.com.br',
  EMAIL_SUBJECT_PREFIX: 'Contato Chocolatudo',
  AUTO_REPLY_SUBJECT: 'Recebemos sua mensagem - Chocolatudo',
  RESPONSE_TIME_HOURS: 24,
} as const;

/** Type representing the CONTACT_DEFAULTS constant */
export type ContactDefaultsType = typeof CONTACT_DEFAULTS;

/**
 * @interface ContactValidationLimitsType
 * @description Validation constraints for contact form fields
 *
 * @property {number} NAME_MIN_LENGTH - Minimum characters for name field (3)
 * @property {number} NAME_MAX_LENGTH - Maximum characters for name field (100)
 * @property {number} EMAIL_MAX_LENGTH - Maximum characters for email field (100)
 * @property {number} PHONE_MIN_LENGTH - Minimum characters for phone field (10)
 * @property {number} PHONE_MAX_LENGTH - Maximum characters for phone field (15)
 * @property {number} MESSAGE_MIN_LENGTH - Minimum characters for message field (10)
 * @property {number} MESSAGE_MAX_LENGTH - Maximum characters for message field (1000)
 */
export const CONTACT_VALIDATION_LIMITS = {
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 100,
  PHONE_MIN_LENGTH: 10,
  PHONE_MAX_LENGTH: 15,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 1000,
} as const;

/** Type representing the CONTACT_VALIDATION_LIMITS constant */
export type ContactValidationLimitsType = typeof CONTACT_VALIDATION_LIMITS;

/**
 * @interface ContactSecurityType
 * @description Security and anti-spam configuration
 *
 * @property {number} RECAPTCHA_MIN_SCORE - Minimum reCAPTCHA score to accept (0.5)
 * @property {number} RATE_LIMIT_WINDOW_MS - Rate limiting window in milliseconds (15 minutes)
 * @property {number} RATE_LIMIT_MAX_REQUESTS - Maximum requests per window (5)
 */
export const CONTACT_SECURITY = {
  RECAPTCHA_MIN_SCORE: 0.5,
  RATE_LIMIT_WINDOW_MS: 900000, // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: 5,
} as const;

/** Type representing the CONTACT_SECURITY constant */
export type ContactSecurityType = typeof CONTACT_SECURITY;

/**
 * @interface ContactStatusType
 * @description Available status values for contact messages
 *
 * @property {string} NEW - New message status ('new')
 * @property {string} READ - Read message status ('read')
 * @property {string} REPLIED - Replied message status ('replied')
 */
export const CONTACT_STATUS = {
  NEW: 'new',
  READ: 'read',
  REPLIED: 'replied',
} as const;

/** Type representing the CONTACT_STATUS constant */
export type ContactStatusType = typeof CONTACT_STATUS;

/** Union type of all valid status values */
export type ContactStatus = (typeof CONTACT_STATUS)[keyof typeof CONTACT_STATUS];
