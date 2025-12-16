/**
 * @service Contact Service
 * @domain contact
 * @type REST API
 *
 * Handles contact form submission with backend API
 */

import { publicClient } from '@/core/lib/api';
import type { ContactSubmitRequest, ContactSubmitResponse } from '../types/models';

export const contactService = {
  /**
   * Submit contact form
   * @param request - Contact form data
   * @returns Promise<ContactSubmitResponse>
   */
  async submit(request: ContactSubmitRequest): Promise<ContactSubmitResponse> {
    const { data } = await publicClient.post<{ success: boolean; data: ContactSubmitResponse }>(
      '/contact',
      request
    );
    return data.data;
  },
};
