/**
 * @summary
 * Validation schemas for Contact entity.
 * Centralizes all Zod validation logic for the service.
 *
 * @module services/contact/contactValidation
 */

import { z } from 'zod';
import { CONTACT_VALIDATION_LIMITS } from '@/constants';

/**
 * Schema for contact form submission validation
 */
export const contactCreateSchema = z.object({
  nome_completo: z
    .string()
    .min(CONTACT_VALIDATION_LIMITS.NAME_MIN_LENGTH, 'O nome deve ter pelo menos 3 caracteres')
    .max(CONTACT_VALIDATION_LIMITS.NAME_MAX_LENGTH)
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'O nome deve conter apenas letras e espaços'),
  email: z
    .string()
    .email('Por favor, informe um email válido')
    .max(CONTACT_VALIDATION_LIMITS.EMAIL_MAX_LENGTH),
  telefone: z
    .string()
    .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, 'Por favor, informe um número de telefone válido')
    .optional()
    .or(z.literal('')),
  mensagem: z
    .string()
    .min(
      CONTACT_VALIDATION_LIMITS.MESSAGE_MIN_LENGTH,
      'Sua mensagem deve ter pelo menos 10 caracteres'
    )
    .max(
      CONTACT_VALIDATION_LIMITS.MESSAGE_MAX_LENGTH,
      'Sua mensagem deve ter no máximo 1000 caracteres'
    ),
  honeypot: z.string().optional(),
  recaptcha_token: z.string().min(1, 'Token reCAPTCHA é obrigatório'),
});

/**
 * Inferred types from schemas
 */
export type ContactCreateInput = z.infer<typeof contactCreateSchema>;
