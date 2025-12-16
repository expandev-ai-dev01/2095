/**
 * @summary
 * Type definitions for Contact entity.
 *
 * @module services/contact/contactTypes
 */

import { ContactStatus } from '@/constants/contact';

/**
 * @interface ContactEntity
 * @description Represents a contact message entity in the database
 */
export interface ContactEntity {
  id: number;
  nomeCompleto: string;
  email: string;
  telefone: string | null;
  mensagem: string;
  timestamp: string;
  status: ContactStatus;
  ipAddress: string | null;
  userAgent: string | null;
  recaptchaScore: number | null;
  dateCreated: string;
  dateModified: string;
}

/**
 * @interface ContactCreateRequest
 * @description Request payload for creating a contact message
 */
export interface ContactCreateRequest {
  nome_completo: string;
  email: string;
  telefone?: string;
  mensagem: string;
  honeypot?: string;
  recaptcha_token: string;
}

/**
 * @interface ContactResponse
 * @description Response structure for contact form submission
 */
export interface ContactResponse {
  message: string;
  messageId: number;
  autoReplyStatus: 'sent' | 'failed';
}

/**
 * @interface EmailData
 * @description Data structure for email sending
 */
export interface EmailData {
  to: string;
  from: string;
  subject: string;
  htmlContent: string;
  textContent: string;
}

/**
 * @interface RecaptchaVerificationResult
 * @description Result from reCAPTCHA verification
 */
export interface RecaptchaVerificationResult {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
}
