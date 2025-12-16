/**
 * @summary
 * API controller for Contact entity (external/public endpoints).
 * Thin layer that delegates all logic to service.
 *
 * @module api/external/contact/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import { contactCreate } from '@/services/contact';

/**
 * @api {post} /api/external/contact Submit Contact Form
 * @apiName SubmitContact
 * @apiGroup Contact
 *
 * @apiBody {String} nome_completo Full name (3-100 chars, letters and spaces only)
 * @apiBody {String} email Email address (valid format, max 100 chars)
 * @apiBody {String} [telefone] Phone number (optional, format: (XX) XXXXX-XXXX or (XX) XXXX-XXXX)
 * @apiBody {String} mensagem Message text (10-1000 chars)
 * @apiBody {String} [honeypot] Hidden field for spam protection (should be empty)
 * @apiBody {String} recaptcha_token reCAPTCHA v3 token
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.message Success message
 * @apiSuccess {Number} data.messageId Unique message identifier
 * @apiSuccess {String} data.autoReplyStatus Auto-reply email status (sent | failed)
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR | SPAM_DETECTED | EMAIL_SEND_FAILED)
 * @apiError {String} error.message Error message
 */
export async function submitHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const ipAddress = (req.ip || req.socket.remoteAddress || 'unknown').replace('::ffff:', '');
    const userAgent = req.get('user-agent') || 'unknown';

    const data = await contactCreate(req.body, ipAddress, userAgent);
    res.status(201).json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
