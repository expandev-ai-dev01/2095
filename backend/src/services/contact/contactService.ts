/**
 * @summary
 * Business logic for Contact entity.
 * Handles contact form submission with validation, anti-spam protection,
 * email sending, and database storage.
 *
 * @module services/contact/contactService
 */

import { CONTACT_DEFAULTS, CONTACT_SECURITY, CONTACT_STATUS } from '@/constants';
import { contactStore } from '@/instances';
import { ServiceError } from '@/utils';
import { ContactResponse, ContactEntity, EmailData } from './contactTypes';
import { contactCreateSchema } from './contactValidation';

/**
 * @summary
 * Processes contact form submission with full validation and anti-spam protection.
 *
 * @function contactCreate
 * @module services/contact
 *
 * @param {unknown} body - Raw request body to validate against contactCreateSchema
 * @param {string} ipAddress - Client IP address for logging
 * @param {string} userAgent - Client user agent for logging
 * @returns {Promise<ContactResponse>} Confirmation response with message ID
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When body fails schema validation
 * @throws {ServiceError} SPAM_DETECTED (400) - When honeypot is filled or reCAPTCHA score is low
 * @throws {ServiceError} EMAIL_SEND_FAILED (500) - When email sending fails
 *
 * @example
 * const response = await contactCreate({
 *   nome_completo: 'João Silva',
 *   email: 'joao@example.com',
 *   telefone: '(11) 99999-9999',
 *   mensagem: 'Gostaria de saber mais sobre os bolos',
 *   recaptcha_token: 'token123'
 * }, '192.168.1.1', 'Mozilla/5.0...');
 * // Returns: { message: 'Sua mensagem foi enviada com sucesso!...', messageId: 1, autoReplyStatus: 'sent' }
 */
export async function contactCreate(
  body: unknown,
  ipAddress: string,
  userAgent: string
): Promise<ContactResponse> {
  // Validate request body
  const validation = contactCreateSchema.safeParse(body);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Validation failed', 400, validation.error.errors);
  }

  const params = validation.data;

  // Anti-spam: Check honeypot field
  if (params.honeypot && params.honeypot.trim() !== '') {
    // Silently reject spam without notifying the user
    throw new ServiceError('SPAM_DETECTED', 'Invalid request', 400);
  }

  // Verify reCAPTCHA token
  const recaptchaScore = await verifyRecaptcha(params.recaptcha_token);

  if (recaptchaScore < CONTACT_SECURITY.RECAPTCHA_MIN_SCORE) {
    throw new ServiceError(
      'SPAM_DETECTED',
      'Não foi possível verificar que você não é um robô. Por favor, tente novamente.',
      400
    );
  }

  // Create contact entity
  const now = new Date().toISOString();
  const contactEntity: ContactEntity = {
    id: contactStore.getNextId(),
    nomeCompleto: params.nome_completo,
    email: params.email,
    telefone: params.telefone || null,
    mensagem: params.mensagem,
    timestamp: now,
    status: CONTACT_STATUS.NEW,
    ipAddress,
    userAgent,
    recaptchaScore,
    dateCreated: now,
    dateModified: now,
  };

  // Store in database
  contactStore.add(contactEntity);

  // Send notification email to business
  try {
    await sendNotificationEmail(contactEntity);
  } catch (error) {
    console.error('Failed to send notification email:', error);
    // Continue processing even if notification fails
  }

  // Send auto-reply email to customer
  let autoReplyStatus: 'sent' | 'failed' = 'sent';
  try {
    await sendAutoReplyEmail(contactEntity);
  } catch (error) {
    console.error('Failed to send auto-reply email:', error);
    autoReplyStatus = 'failed';
  }

  return {
    message:
      'Sua mensagem foi enviada com sucesso! Enviamos uma confirmação para seu email. Entraremos em contato em breve.',
    messageId: contactEntity.id,
    autoReplyStatus,
  };
}

/**
 * Verifies reCAPTCHA token and returns score
 * @param {string} token - reCAPTCHA token
 * @returns {Promise<number>} reCAPTCHA score (0.0 to 1.0)
 */
async function verifyRecaptcha(token: string): Promise<number> {
  // TODO: Implement actual reCAPTCHA verification with Google API
  // For now, return a mock score for development
  // In production, this should call:
  // https://www.google.com/recaptcha/api/siteverify
  // with secret key and token

  console.log('reCAPTCHA verification (mock):', token);
  return 0.9; // Mock high score for development
}

/**
 * Sends notification email to business
 * @param {ContactEntity} contact - Contact entity
 */
async function sendNotificationEmail(contact: ContactEntity): Promise<void> {
  const emailData: EmailData = {
    to: CONTACT_DEFAULTS.RECIPIENT_EMAIL,
    from: CONTACT_DEFAULTS.SENDER_EMAIL,
    subject: `${CONTACT_DEFAULTS.EMAIL_SUBJECT_PREFIX} - ${contact.nomeCompleto}`,
    htmlContent: generateNotificationEmailHtml(contact),
    textContent: generateNotificationEmailText(contact),
  };

  await sendEmail(emailData);
}

/**
 * Sends auto-reply email to customer
 * @param {ContactEntity} contact - Contact entity
 */
async function sendAutoReplyEmail(contact: ContactEntity): Promise<void> {
  const emailData: EmailData = {
    to: contact.email,
    from: CONTACT_DEFAULTS.SENDER_EMAIL,
    subject: CONTACT_DEFAULTS.AUTO_REPLY_SUBJECT,
    htmlContent: generateAutoReplyEmailHtml(contact),
    textContent: generateAutoReplyEmailText(contact),
  };

  await sendEmail(emailData);
}

/**
 * Sends email using configured email service
 * @param {EmailData} emailData - Email data
 */
async function sendEmail(emailData: EmailData): Promise<void> {
  // TODO: Implement actual email sending with SMTP or email service API
  // For now, just log the email for development
  console.log('Sending email:', {
    to: emailData.to,
    from: emailData.from,
    subject: emailData.subject,
  });

  // Simulate email sending delay
  await new Promise((resolve) => setTimeout(resolve, 100));
}

/**
 * Generates HTML content for notification email
 */
function generateNotificationEmailHtml(contact: ContactEntity): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #8B4513; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #8B4513; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Nova Mensagem de Contato</h1>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Nome:</span> ${contact.nomeCompleto}
          </div>
          <div class="field">
            <span class="label">Email:</span> ${contact.email}
          </div>
          ${
            contact.telefone
              ? `<div class="field"><span class="label">Telefone:</span> ${contact.telefone}</div>`
              : ''
          }
          <div class="field">
            <span class="label">Mensagem:</span><br>
            ${contact.mensagem.replace(/\n/g, '<br>')}
          </div>
          <div class="field">
            <span class="label">Data/Hora:</span> ${new Date(contact.timestamp).toLocaleString(
              'pt-BR'
            )}
          </div>
        </div>
        <div class="footer">
          <p>Chocolatudo - Sistema de Contato</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generates plain text content for notification email
 */
function generateNotificationEmailText(contact: ContactEntity): string {
  return `
Nova Mensagem de Contato - Chocolatudo

Nome: ${contact.nomeCompleto}
Email: ${contact.email}
${contact.telefone ? `Telefone: ${contact.telefone}\n` : ''}Mensagem:
${contact.mensagem}

Data/Hora: ${new Date(contact.timestamp).toLocaleString('pt-BR')}
  `;
}

/**
 * Generates HTML content for auto-reply email
 */
function generateAutoReplyEmailHtml(contact: ContactEntity): string {
  const messageSummary =
    contact.mensagem.length > 100 ? contact.mensagem.substring(0, 100) + '...' : contact.mensagem;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #8B4513; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f9f9f9; padding: 20px; }
        .message-box { background-color: white; border-left: 4px solid #8B4513; padding: 15px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .contact-info { margin-top: 20px; padding: 15px; background-color: #fff; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Chocolatudo</h1>
          <p>Obrigado pelo seu contato!</p>
        </div>
        <div class="content">
          <p>Olá, ${contact.nomeCompleto}!</p>
          <p>Recebemos sua mensagem e agradecemos pelo interesse em nossos produtos.</p>
          <div class="message-box">
            <strong>Sua mensagem:</strong><br>
            ${messageSummary.replace(/\n/g, '<br>')}
          </div>
          <p>Nossa equipe analisará sua solicitação e retornaremos em até <strong>${
            CONTACT_DEFAULTS.RESPONSE_TIME_HOURS
          } horas úteis</strong>.</p>
          <div class="contact-info">
            <strong>Outras formas de contato:</strong><br>
            📧 Email: ${CONTACT_DEFAULTS.RECIPIENT_EMAIL}<br>
            📱 WhatsApp: (11) 99999-9999<br>
            📍 Endereço: Rua Exemplo, 123 - Bairro - São Paulo/SP
          </div>
        </div>
        <div class="footer">
          <p>Chocolatudo - Bolos Artesanais</p>
          <p>Este é um email automático, por favor não responda.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generates plain text content for auto-reply email
 */
function generateAutoReplyEmailText(contact: ContactEntity): string {
  const messageSummary =
    contact.mensagem.length > 100 ? contact.mensagem.substring(0, 100) + '...' : contact.mensagem;

  return `
Chocolatudo - Obrigado pelo seu contato!

Olá, ${contact.nomeCompleto}!

Recebemos sua mensagem e agradecemos pelo interesse em nossos produtos.

Sua mensagem:
${messageSummary}

Nossa equipe analisará sua solicitação e retornaremos em até ${CONTACT_DEFAULTS.RESPONSE_TIME_HOURS} horas úteis.

Outras formas de contato:
Email: ${CONTACT_DEFAULTS.RECIPIENT_EMAIL}
WhatsApp: (11) 99999-9999
Endereço: Rua Exemplo, 123 - Bairro - São Paulo/SP

Chocolatudo - Bolos Artesanais
Este é um email automático, por favor não responda.
  `;
}
