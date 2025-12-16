/**
 * ContactForm Component
 * Form for visitors to send messages with validation and spam protection
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DOMPurify from 'dompurify';
import { contactSchema } from '../../validations/contact';
import type { ContactFormInput, ContactFormOutput } from '../../types/forms';
import { useContactSubmit } from '../../hooks/useContactSubmit';
import { cn } from '@/core/lib/utils';
import { Button } from '@/core/components/button';
import { Input } from '@/core/components/input';
import { Textarea } from '@/core/components/textarea';
import { Label } from '@/core/components/label';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { Send } from 'lucide-react';
import type { ContactFormProps } from './types';

function ContactForm({ className }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInput, unknown, ContactFormOutput>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: {
      nome_completo: '',
      email: '',
      telefone: '',
      mensagem: '',
      honeypot: '',
      recaptcha_token: '',
    },
  });

  const { mutate: submitContact, isPending } = useContactSubmit({
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = (data: ContactFormOutput) => {
    const sanitizedData = {
      ...data,
      mensagem: DOMPurify.sanitize(data.mensagem),
      recaptcha_token: 'mock_token_for_development',
    };

    submitContact(sanitizedData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('flex w-full max-w-[600px] flex-col gap-6', className)}
      noValidate
    >
      {/* Nome Completo */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="nome_completo">
          Nome Completo <span className="text-destructive">*</span>
        </Label>
        <Input
          id="nome_completo"
          type="text"
          placeholder="Seu nome completo"
          aria-invalid={!!errors.nome_completo}
          aria-describedby={errors.nome_completo ? 'nome_completo-error' : undefined}
          disabled={isPending}
          {...register('nome_completo')}
        />
        {errors.nome_completo && (
          <p id="nome_completo-error" className="text-destructive text-sm" role="alert">
            {errors.nome_completo.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          disabled={isPending}
          {...register('email')}
        />
        {errors.email && (
          <p id="email-error" className="text-destructive text-sm" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Telefone */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="telefone">Telefone / WhatsApp</Label>
        <Input
          id="telefone"
          type="tel"
          placeholder="(11) 99999-9999"
          aria-invalid={!!errors.telefone}
          aria-describedby={errors.telefone ? 'telefone-error' : undefined}
          disabled={isPending}
          {...register('telefone')}
        />
        {errors.telefone && (
          <p id="telefone-error" className="text-destructive text-sm" role="alert">
            {errors.telefone.message}
          </p>
        )}
      </div>

      {/* Mensagem */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="mensagem">
          Mensagem <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="mensagem"
          placeholder="Escreva sua mensagem, pergunta ou solicitação..."
          className="min-h-[100px] resize-none"
          aria-invalid={!!errors.mensagem}
          aria-describedby={errors.mensagem ? 'mensagem-error' : undefined}
          disabled={isPending}
          {...register('mensagem')}
        />
        {errors.mensagem && (
          <p id="mensagem-error" className="text-destructive text-sm" role="alert">
            {errors.mensagem.message}
          </p>
        )}
      </div>

      {/* Honeypot (hidden field for spam protection) */}
      <input
        type="text"
        {...register('honeypot')}
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
        }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Submit Button */}
      <Button type="submit" disabled={isPending} size="lg" className="w-full gap-2 sm:w-auto">
        {isPending ? (
          <>
            <LoadingSpinner className="size-5" />
            <span>Enviando...</span>
          </>
        ) : (
          <>
            <Send className="size-5" />
            <span>Enviar Mensagem</span>
          </>
        )}
      </Button>
    </form>
  );
}

export { ContactForm };
