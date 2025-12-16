/**
 * Contact domain type definitions
 * Matches backend API response structure
 */

export interface ContactSubmitResponse {
  message: string;
  messageId: number;
  autoReplyStatus: 'sent' | 'failed';
}

export interface ContactSubmitRequest {
  nome_completo: string;
  email: string;
  telefone?: string;
  mensagem: string;
  honeypot?: string;
  recaptcha_token: string;
}
