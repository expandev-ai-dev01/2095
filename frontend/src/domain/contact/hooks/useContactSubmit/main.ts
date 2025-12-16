/**
 * Custom hook for submitting contact form
 * Uses TanStack Query for mutation management
 */

import { useMutation } from '@tanstack/react-query';
import { contactService } from '../../services/contactService';
import type { UseContactSubmitOptions } from './types';
import { toast } from 'sonner';

export const useContactSubmit = (options?: UseContactSubmitOptions) => {
  const { onSuccess, onError } = options || {};

  return useMutation({
    mutationFn: contactService.submit,
    onSuccess: () => {
      toast.success('Mensagem enviada com sucesso!', {
        description: 'Enviamos uma confirmação para seu email. Entraremos em contato em breve.',
      });
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error('Erro ao enviar mensagem', {
        description: error.message || 'Por favor, tente novamente mais tarde.',
      });
      onError?.(error);
    },
  });
};
