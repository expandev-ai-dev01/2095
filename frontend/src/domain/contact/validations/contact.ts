import { z } from 'zod';

const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

export const contactSchema = z.object({
  nome_completo: z
    .string('Por favor, informe seu nome completo')
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'O nome deve conter apenas letras e espaços'),

  email: z
    .string('Por favor, informe seu email')
    .email('Por favor, informe um email válido')
    .max(100, 'O email deve ter no máximo 100 caracteres'),

  telefone: z
    .string()
    .regex(phoneRegex, 'Por favor, informe um número de telefone válido')
    .optional()
    .or(z.literal('')),

  mensagem: z
    .string('Por favor, escreva sua mensagem')
    .min(10, 'Sua mensagem deve ter pelo menos 10 caracteres')
    .max(1000, 'Sua mensagem deve ter no máximo 1000 caracteres'),

  honeypot: z.string().optional(),

  recaptcha_token: z.string('Token de validação necessário'),
});
